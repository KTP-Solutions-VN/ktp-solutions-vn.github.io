# PROP-029 — Báo cáo hợp đồng (Contract Reports)

**Loại:** Trang đầy đủ
**Route:** property/property-reports/:tab/:villa_id
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang khung chứa các tab báo cáo liên quan tới Property, hiện chỉ có 1 tab hoạt động là "Contracts" (báo cáo hợp đồng), lọc theo Business Unit. Nội dung chi tiết của tab được render qua element `property/contract_report`.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tab (ẩn) | `tab` | Hidden | Có | Giá trị mặc định `contract` |
| 2 | Business Unit | `business_unit`/`id` | Select2 | Có (class `required`) | Đổi giá trị → cập nhật query string `?bu=...` |
| 3 | Tab "Contracts" | — | Tab link | — | Chỉ hiện khi user không phải `external_user` |

Nội dung bảng báo cáo hợp đồng nằm trong element `element/property/contract_report.ctp` (ngoài phạm vi file `.ctp` được giao đọc), dữ liệu lấy từ `getPropertyContractReport($conditions)`.

## Chức năng/nút thao tác
- Đổi Business Unit → cập nhật URL với query `bu` và reload trang.
- Chuyển tab (hiện chỉ có 1 tab "Contracts" khả dụng).

## Điều hướng
- Mở từ: Menu Reports (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác (chỉ đổi Business Unit tại chỗ).
- Popup con: Không có.
