# PROP-048 — Nhập dịch vụ hàng loạt (Bulk Service Import)

**Loại:** Trang đầy đủ
**Route:** property/services/:tab (dashed mặc định, hỗ trợ thêm query `?tab=`, `?electricity_tab=`)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang quản lý hàng loạt (bulk) các cấu hình dịch vụ Internet, hồ bơi (Pool) và Điện (Electricity — Provider/Guest) cho toàn bộ Property trong một Business Unit thông qua import file Excel (.xlsx). Có thêm tab "Portal Contract Recap" hiển thị bảng tổng hợp trạng thái gán hợp đồng cổng thông tin cho từng Property (giống chức năng ở PROP-051 Guest Contract BU Recap).

## Mô tả chi tiết

### Bộ lọc chung
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | Có (class `required`) | Đổi giá trị → reload, lưu cookie |

### Tab "Internet" / "Pool" / "Electricity" (Provider, Guest)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | File Excel | `internet_data`/`pool_data`/... | File (.xlsx) | Có (class `required`) | Import theo cột chuẩn: Internet = `id, code, property, provider, login, password, charge`; Pool = `id, code, property, pool, company, mon..sun` |
| 2 | Tab (ẩn) | `tab` | Hidden | — | Giữ tab hiện tại khi submit |

Sau khi upload, hệ thống hiển thị 3 bảng kết quả: **Updated Properties** (cập nhật thành công), **Unavailable Properties** (không khớp dữ liệu), tuỳ theo tab đang chọn (Internet/Pool). Cột hiển thị: Property, Provider/Pool, Login/Company, Password/Frequency, Charge/Days.

Tab "Electricity" có 2 tab con: **Provider** (thông tin nhà cung cấp điện) và **Guest** (cấu hình hiển thị cho khách), mỗi tab con cũng có bảng dữ liệu tương tự dạng Property/Provider/Login/Password/Charge.

### Tab "Portal Contract" (Recap)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `property` | |
| 2 | Assigned Contract | `assigned_contract` | |
| 3 | Languages | `languages` | |
| 4 | Missing Information | `missing_information` | |
| 5 | Action | — | |

Có bộ lọc nhanh (quick filter chips), ô tìm kiếm theo tên/ID Property, và 4 chỉ số KPI: Total Properties, Ready for Signature, No Contract Assigned, Missing Required Information.

## Chức năng/nút thao tác
- Đổi Business Unit → reload toàn bộ dữ liệu các tab theo BU mới.
- Chuyển tab Internet/Pool/Electricity/Portal Contract (URL param `tab`, `electricity_tab`).
- Nút "Upload" (từng tab Internet/Pool) → submit file Excel, đọc bằng `PHPExcel_IOFactory`, validate định dạng cột, cập nhật dữ liệu dịch vụ hàng loạt cho các Property khớp mã.
- Tab Portal Contract: nút "Refresh" (tải lại), nút "Export Excel" (điều hướng `guestContractBuRecap?export=1`), các chip lọc nhanh, ô tìm kiếm.

## Điều hướng
- Mở từ: Menu dịch vụ tài sản (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: PROP-051 (Mức sẵn sàng hợp đồng) khi bấm "Export Excel" ở tab Portal Contract.
- Popup con: Không có (kết quả upload hiển thị dạng bảng ngay trong trang, không phải modal).
