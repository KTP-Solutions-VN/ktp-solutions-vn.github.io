# OPR-021 — Tạo phiếu bảo trì mới

**Loại:** Trang đầy đủ
**Route:** operator/addMaintenanceTicket + route đẹp dạng dashed: operator/add-maintenance-ticket
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Form nhiều bước tạo mới một phiếu báo bảo trì (maintenance ticket) cho một villa: chọn villa, tình trạng khách, người báo, phân loại vấn đề (category → subcategory → problem), các yếu tố ảnh hưởng mức độ khẩn cấp, mô tả, ảnh minh chứng, thông tin ra vào villa và hành động yêu cầu xử lý. Ticket được lưu ở trạng thái `draft` ngay khi mở form (theo `session_id`) và chuyển `publish` khi submit hoàn chỉnh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Radio/chọn thẻ | Có | |
| 2 | Villa | `property_id` | Select | Có | |
| 3 | Vị trí cụ thể | `location` | Text | Không | Vd: Master bedroom, pool deck... |
| 4 | Tình trạng khách | `guest_status` | Radio: guest_in_house/arriving_today/vacant_no_guest | Có | |
| 5 | Người báo cáo | `reported_by`, `reported_name` | Select (role) + Select (tên) | Có | |
| 6 | Danh mục / Danh mục con / Vấn đề | `category_id`, `subcategory_id`, `problem_option_id` | Radio dạng thẻ, cascading (ajax) | Có | `problem_option_id` mang kèm `data-priority-id` để tính `base_priority_id` |
| 7 | Yếu tố làm nặng thêm | `factor[makes_it_worse][]` | Checkbox nhiều lựa chọn | Không | Ảnh hưởng tính `final_priority_id` |
| 8 | Yếu tố giảm khẩn cấp | `factor[makes_it_less_urgent][]` | Checkbox nhiều lựa chọn | Không | |
| 9 | Mức ưu tiên cơ sở/cuối | `base_priority_id`, `final_priority_id` | Hidden, tự tính | — | Tính từ vấn đề + các yếu tố |
| 10 | Mô tả sự cố | `description` | Textarea | Có | |
| 11 | Đã thử/kiểm tra gì | `tried_checked` | Textarea | Không | |
| 12 | Ảnh minh chứng | `cropped_image` | Upload ảnh (crop) | Không | |
| 13 | Cách vào villa | `access` | Radio: vacant_villa/ask_concierge_to_call/access_ring_bell | Có | |
| 14 | Chìa khóa hiện ở đâu | `key_availability` | Radio: ask_guest/maintenance/concierge/housekeeping | Có | |
| 15 | Hạn xử lý | `deadline` | Text/Datepicker | Không | |
| 16 | Hành động yêu cầu | `action_requested` | Radio: repair_on_site/replace_item/inspect_and_advise/temporary_fix_now_permanent_later/order_part_or_book_contractor/other | Có | |

## Chức năng/nút thao tác
- **Submit (Create Ticket)**: validate đầy đủ các trường bắt buộc rồi gọi ajax `saveMaintenanceTicket`, chuyển `MaintenanceTicket.status` từ `draft` sang `publish`.
- **Start Over (modal)**: xác nhận huỷ bỏ dữ liệu đang nhập, tạo lại phiếu nháp mới.
- Các cascading chọn Category → Subcategory → Problem: ajax `getMaintenanceSubcategories`, `getMaintenanceProblems` nạp lựa chọn kế tiếp.
- Chọn Reported by: ajax `getReporterList` nạp danh sách tên theo vai trò.

## Điều hướng
- Vào từ: nút "+ New Ticket" tại OPR-020 — Danh sách phiếu bảo trì.
- Đi tới: sau khi submit thành công, quay về OPR-020 — Danh sách phiếu bảo trì.
