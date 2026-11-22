# OPR-017 — Lập lịch lượt chăm vườn (Garden Round Planner)

**Loại:** Trang đầy đủ
**Route:** villa-services/gardenPlanning/:tab? + route đẹp dạng dashed: villa-services/garden-planning
**Module:** OPR = Công việc bảo dưỡng

> Lưu ý: file view `garden_planning.ctp` nằm trong thư mục theme `Operator` nhưng action thực thi thuộc `VillaServicesController::gardenPlanning()`, không phải `OperatorController`.

## Mô tả ngắn gọn
Bảng lập kế hoạch phân công công việc vườn theo ngày cho từng đội (team) đã cấu hình ở OPR-018: chọn villa cần làm vườn và gán vào 1 slot còn trống của 1 đội trong ngày kế hoạch; xem tổng hợp khối lượng công việc (man-hours) của từng đội và toàn bộ ("Team-Total").

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | |
| 2 | Ngày lập kế hoạch | `planning_date` | Datepicker | Có | Mặc định ngày hiện tại |
| 3 | Villa cần lập kế hoạch | `villa_id` (checkbox chọn) | Bảng chọn: Select, Villa, Due Date, Available, Man Hours, Slot | Có | Danh sách villa có lịch vườn chưa gán |

### Bảng theo từng Team (tab team-1, team-2, ... và Team-Total)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Slot | Thứ tự slot trong ngày của đội |
| 2 | Villa | Villa đã gán vào slot |
| 3 | Availability | Khung giờ villa sẵn sàng để vào làm |
| 4 | Start / End | Giờ bắt đầu/kết thúc dự kiến của slot |
| 5 | Hours | Số giờ công dự kiến |

## Chức năng/nút thao tác
- **Chọn business unit / ngày**: tải lại dữ liệu kế hoạch (POST) theo ngày và BU đã chọn.
- **Gán villa vào slot**: chọn villa ở bảng "chờ lập kế hoạch", chỉ định slot/đội để tạo `GardenJobs` gắn với `garden_teams_id` và `team_index_id`.
- **Chuyển tab đội (team-1, team-2, ..., Team-Total)**: xem lịch phân công riêng của từng đội hoặc tổng hợp.

## Điều hướng
- Vào từ: menu "Garden Round Planner" trong sidebar (nhóm công việc bảo dưỡng).
- Đi tới: không điều hướng sang trang khác; các gán/xóa slot xử lý ngay trên trang (ajax) và tạo dữ liệu hiển thị ở OPR-002 (Lượt chăm vườn).
