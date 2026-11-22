# PROP-019 — Lên lịch buổi chụp (Schedule a Shoot)

**Loại:** Trang đầy đủ
**Route:** property/new-shooting
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Form tạo mới một lịch chụp ảnh (Photography) cho Property/Residence/Unit, chọn nhiếp ảnh gia (Service Provider loại chụp ảnh), ngày chụp và ghi chú. Đây là phiên bản chức năng cũ, độc lập với luồng "Shoot Scheduler" mới (PROP-026).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Có (class `required`) | Khi đổi, load lại Residence/Unit/Property/Photographer theo BU qua AJAX |
| 2 | Mức độ nhập liệu (Entry Level) | `entry_level` | Select2 (Residence/Unit/Property) | Có | Điều khiển field nào hiển thị bên dưới |
| 3 | Residence | `residence_id` | Select2 | Có (khi entry_level=residence) | Ẩn/hiện theo entry_level |
| 4 | Unit | `unit_id` | Select2 | Có (khi entry_level=unit) | Ẩn/hiện theo entry_level |
| 5 | Property | `villa_id` | Select2 | Có (khi entry_level=property) | Ẩn/hiện theo entry_level |
| 6 | Nhiếp ảnh gia (Photographer) | `service_provider_id` | Select2 (ServiceProvider loại villa_services_id=6) | Có | Danh sách lọc theo Business Unit |
| 7 | Ngày chụp | `date` | Text (datepicker) | Không | Convert `Y-m-d` khi submit |
| 8 | Ghi chú | `comment` | Textarea | Có (class `required`) | |

## Chức năng/nút thao tác
- Nút "Save" — submit form, lưu vào bảng `Photography` (và `PhotographDetail` nếu entry_level=property); tự động set `created_by` theo tên user đăng nhập.
- Nút "Cancel" (`type=reset`) — reset form.
- Sau khi lưu thành công/thất bại, hiển thị Flash message rồi redirect về `Property::shootings`.
- Đổi Business Unit tự động gọi 3 AJAX: `common/getBusinessUnitVilla`, `property/getResidence`, `common/getUnits`, `property/getPhotographer` để nạp lại các dropdown phụ thuộc.

## Điều hướng
- Mở từ: PROP-026 (Shoot Scheduler) — nút "New Photo Shoot"; cũng có thể mở trực tiếp từ menu Shoots cũ.
- Điều hướng tới: `Property::shootings` (danh sách lịch chụp — ngoài phạm vi mã hiện tại) sau khi lưu.
- Popup con: Không có.
