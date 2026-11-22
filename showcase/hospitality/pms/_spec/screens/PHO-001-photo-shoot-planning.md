# PHO-001 — Điều phối buổi chụp (Shoot Coordination)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::planning($shootId)` — mặc định `/photos/planning/:shootId`

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Màn hình lập và theo dõi kế hoạch chụp ảnh (shoot) cho villa/residence/unit: tạo lịch chụp, chọn nhiếp ảnh gia, theo dõi tiến độ giao ảnh và các mục cần follow-up. Có bảng điều khiển tổng hợp (dashboard) hiển thị các shoot đang chờ giao ảnh và các follow-up cần xử lý.

Ghi chú: tính năng phụ thuộc bảng lưu trữ "planning workflow" — nếu bảng chưa sẵn sàng (`planningReady = false`), trang chỉ hiển thị, chặn thao tác lưu (cảnh báo "Planning workflow storage is pending review").

## Mô tả chi tiết

Form tạo/sửa lịch chụp (`$shootId` > 0 = sửa, ngược lại = tạo mới):
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại đối tượng (Type) | `entry_level` | Dropdown | - | Villa / Residence / Unit |
| 2 | Property | `villa_id` | Dropdown | Có (khi Type = Villa) | |
| 3 | Residence | `residence_id` | Dropdown | Có (khi Type = Residence) | |
| 4 | Unit | `unit_id` | Dropdown | Có (khi Type = Unit) | |
| 5 | Photographer | `service_provider_id` | Dropdown | - | |
| 6 | Planned Date | `date` | Date picker | - | |
| 7 | Shoot Objective | `shoot_objective` | Dropdown | - | |
| 8 | Comment | `comment` | Textarea | - | |

Panel follow-up (theo dõi giao ảnh sau khi chụp):
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Photo set result | `photo_set_result` | Chọn nhanh (adequate/followup) | |
| 2 | Short log note | `short_log_note` | Text | |
| 3 | Follow-up type | `follow_up_type` | Dropdown | |
| 4 | Target resolution date | `target_resolution_date` | Date | |
| 5 | Action required | `action_required` | Textarea | |
| 6 | Expected delivery date | `expected_delivery_date` | Date | |
| 7 | Delivery note for follow-up | `delivery_note` | Textarea | |
| 8 | Corrective action | (nhãn "Corrective action") | Textarea | |
| 9 | Follow-up date | (nhãn "Follow-up date") | Date | |

Dashboard 2 bảng danh sách (không phân trang riêng, dữ liệu tổng hợp từ `getPlanningDashboardData`):
- Bảng "Follow-up Required": cột Sr. No., Property, Follow-up Required, Date, Actions.
- Bảng thứ hai (comment/log): cột Sr. No., Property, Comment, Date, Actions.

Filter: dropdown Business Unit/Zone (`id`, lưu cookie business unit khi đổi).

## Chức năng/nút thao tác
- **Lưu kế hoạch chụp** (tạo mới hoặc cập nhật `$shootId`): validate, lưu, redirect lại `planning` kèm business_unit_id.
- **Xoá kế hoạch chụp**: action `deleteShootPlan($shootId)` (POST, không có view riêng — xoá cả bản ghi `Photography` và chi tiết `PhotographDetail`), redirect lại `planning`.
- **Chọn Business Unit/Zone**: lọc lại toàn bộ dữ liệu villa/residence/unit và dashboard theo BU.
- **Ghi nhận follow-up / kết quả giao ảnh**: cập nhật trạng thái theo dõi cho từng shoot.

## Điều hướng
- Vào từ: menu Photo Library (active_menu = 185). Lưu ý: `PropertyController` cũng có action riêng render lại chính template này (`setTemplatePath('Photos')->setTemplate('planning')`) cho luồng "Property > Shoots" — nằm ngoài phạm vi PhotosController nên không tài liệu hoá tại đây.
- Điều hướng đến: không điều hướng sang màn khác trong luồng chính; có thể quay lại qua menu chính.
