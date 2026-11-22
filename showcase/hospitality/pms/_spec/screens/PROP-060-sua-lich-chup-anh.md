# PROP-060 — Sửa lịch chụp (Edit Shoot Schedule)

**Loại:** Trang đầy đủ
**Route:** property/edit-shooting/:req_id (req_id truyền dạng base64), mở từ PROP-059 (icon Edit)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang chỉnh sửa một lịch chụp ảnh (Photography) đã tồn tại: đổi Business Unit, cấp độ áp dụng (Property/Residence/Unit), Nhiếp ảnh gia (Service Provider), ngày chụp dự kiến, ghi chú. Dữ liệu lưu bảng `Photography` (liên kết `PhotographDetail` khi cấp độ là Property).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Có (class `required`) | |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Có | Điều khiển hiện field tương ứng bên dưới |
| 3 | Residence | `residence_id` | Select2 | Có (khi Entry Level = Residence) | |
| 4 | Unit | `unit_id` | Select2 | Có (khi Entry Level = Unit) | |
| 5 | Property | `villa_id` | Select2 | Có (khi Entry Level = Property) | |
| 6 | Service Provider (Photographer) | `service_provider_id` | Select2 | Có | Lọc theo Business Unit và loại dịch vụ Photography |
| 7 | Date | `date` | Datepicker | Không | Ngày dự kiến chụp |
| 8 | Comment | `comment` | Textarea | Có (class `required`) | |

## Chức năng/nút thao tác
- Nút "Save" — submit form, cập nhật bản ghi `Photography` theo `req_id`; nếu Entry Level = Property thì `residence_id`/`unit_id` reset về 0 và ghi `villa_id` vào `PhotographDetail`, ngược lại cập nhật `residence_id`/`unit_id` tương ứng.
- Đổi Entry Level → JS ẩn/hiện field Residence/Unit/Property tương ứng.

## Điều hướng
- Mở từ: PROP-059 (Buổi chụp sắp tới) — icon Edit.
- Điều hướng tới: Không có (redirect lại danh sách sau khi lưu thành công).
- Popup con: Không có.
