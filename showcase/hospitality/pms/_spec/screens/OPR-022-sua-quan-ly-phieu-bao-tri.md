# OPR-022 — Quản lý sửa chữa hiện trường (Manage Field Repair)

**Loại:** Trang đầy đủ
**Route:** operator/editMaintenanceTicket/:id + route đẹp dạng dashed: operator/edit-maintenance-ticket/:id (id truyền dạng base64/btoa)
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Form chỉnh sửa một phiếu bảo trì đã tồn tại: hiển thị lại toàn bộ dữ liệu đã nhập ở OPR-021 (villa, tình trạng khách, phân loại vấn đề, mức ưu tiên, mô tả, ảnh, cách vào villa, hành động yêu cầu...) cho phép cập nhật lại.

## Mô tả chi tiết

Cấu trúc field giống OPR-021 — Báo sửa chữa hiện trường, khác biệt là các trường được nạp sẵn giá trị từ `ticket_data` (bản ghi `MaintenanceTicket` theo `id`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã phiếu / Trạng thái | `ticket_data.ticket_number`, `ticket_status` | Text hiển thị (tiêu đề trang) | — | Hiển thị dạng "Status #ticket_number" |
| 2 | Villa, vị trí | `property_id`, `location` | Select, Text | Có/Không | Nạp sẵn giá trị hiện tại |
| 3 | Tình trạng khách, người báo | `guest_status`, `reported_by`, `reported_name` | Radio, Select | Có | |
| 4 | Phân loại vấn đề | `category_id`, `subcategory_id`, `problem_option_id` | Radio cascading | Có | |
| 5 | Mức ưu tiên | `base_priority_id`, `final_priority_id` | Hidden, tự tính | — | |
| 6 | Mô tả, đã thử/kiểm tra | `description`, `tried_checked` | Textarea | Có/Không | |
| 7 | Ảnh minh chứng | `cropped_image` | Upload ảnh | Không | Ảnh cũ hiển thị sẵn nếu có |
| 8 | Cách vào villa, chìa khóa | `access`, `key_availability` | Radio | Có | |
| 9 | Hạn xử lý, hành động yêu cầu | `deadline`, `action_requested` | Text/Radio | Không/Có | |

## Chức năng/nút thao tác
- **Update**: gọi ajax `updateMaintenanceTicket` lưu lại toàn bộ thay đổi.
- **Start Over (modal)**: tương tự OPR-021, xác nhận nhập lại từ đầu.
- Các cascading Category/Subcategory/Problem hoạt động như OPR-021.

## Điều hướng
- Vào từ: icon "Sửa/Quản lý" tại OPR-020 — Báo cáo sửa chữa hiện trường.
- Đi tới: sau khi Update thành công, quay về OPR-020 — Báo cáo sửa chữa hiện trường.
