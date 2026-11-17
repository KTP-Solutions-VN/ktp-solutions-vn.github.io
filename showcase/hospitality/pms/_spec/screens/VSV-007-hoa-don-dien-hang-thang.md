# VSV-007 — Hóa đơn điện hàng tháng (Monthly Bill)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::monthlyBill()` — mặc định `/villa-services/monthly-bill` (POST cùng action để tìm kiếm/cập nhật)

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Trang quản lý hóa đơn tiền điện hàng tháng (dành cho villa quản lý điện theo hình thức trả tiền điện lưới/nhà cung cấp — ví dụ villa cho khách thuê dài hạn). Cho phép xem theo villa (liệt kê các tháng kể từ ngày bắt đầu hợp đồng điện) hoặc xem theo tháng (liệt kê tất cả villa), nhập chỉ số cuối kỳ và số tiền hóa đơn cho từng kỳ.

## Mô tả chi tiết

### Bộ lọc tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Month | `month` | Select | Không | Chỉ có tác dụng khi KHÔNG chọn villa; mặc định tháng hiện tại |
| 2 | Business Unit | `business_unit` | Select | Không | Lọc villa theo BU/zone được phân quyền |
| 3 | Villa | `villa` | Select (select2) | Không | Khi chọn villa → chuyển sang xem theo tháng (tab "month"), tính từ ngày bắt đầu hợp đồng điện của villa |

### Bảng dữ liệu (2 chế độ hiển thị theo `tab`)
| # | Cột | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property/Month | `villa_id[]` (ẩn) | Text (đọc) | — | Tên villa (tab villa) hoặc tên tháng (tab month) |
| 2 | End Date | `end_date[]` | Text (datepicker) | Có (khi nhập) | Bị khóa (disabled) nếu kỳ đã có dữ liệu (end_date/end_meter/bill khác rỗng) |
| 3 | End Meter | `end_meter[]` | Text (số) | Có (khi nhập) | Chỉ số công tơ cuối kỳ; khóa cùng điều kiện với End Date |
| 4 | Amount | `bill[]` | Text (số) | Có (khi nhập) | Số tiền hóa đơn; khóa cùng điều kiện |
| 5 | Hành động | — | Button "Reset" | — | Chỉ bật khi dòng đã có dữ liệu (mở khóa lại 3 ô để sửa) |

- Nếu villa được chọn chưa thiết lập ngày/ chỉ số bắt đầu điện (`is_data = 0`) → hiển thị link "Set up start meter" dẫn sang trang thiết lập dịch vụ điện của villa (`Property::ServiceSetting`).

## Chức năng/nút thao tác
- **Search**: submit GET/POST tìm theo Month/Business Unit/Villa.
- **Reset** (từng dòng): mở khóa lại 3 ô End Date/End Meter/Amount để sửa dữ liệu đã lưu.
- **Update**: submit toàn bộ bảng (POST `action=update`) → lưu từng dòng vào `ElectricalMonthlyBill` (tạo mới hoặc cập nhật theo villa_id + tháng/năm suy ra từ end_date), qua action `addMonthlyBill` (AJAX nội bộ, không có view riêng).

## Điều hướng
- Vào từ: Menu chính (mục Electricity/Monthly Bill).
- Điều hướng đến: trang thiết lập dịch vụ điện villa (`Property::ServiceSetting`) khi villa chưa có chỉ số bắt đầu.
