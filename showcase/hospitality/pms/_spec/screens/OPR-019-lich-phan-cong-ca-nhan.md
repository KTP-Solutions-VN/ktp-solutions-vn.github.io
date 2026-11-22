# OPR-019 — Phân công của tôi (My Assignments)

**Loại:** Trang đầy đủ
**Route:** operator/roster + route đẹp dạng dashed: operator/roster
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình cho nhân viên dọn dẹp (cleaner) tự tra cứu lịch phân công đội (team) của bản thân cho hôm nay và ngày mai: hiển thị trạng thái đã được xếp đội (assigned, kèm tên đội/số thành viên/xe), đang chờ xếp (pending), nghỉ theo lịch tuần (weekoff), hoặc chưa có dữ liệu (empty).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Ngày (hôm nay/ngày mai) | `dates` | Text hiển thị (d M Y) | Cố định 2 ngày: hôm nay, ngày mai |
| 2 | Trạng thái phân công | `status` (assigned/pending/weekoff/empty) | Text hiển thị + màu | Suy ra từ `CleanerTeams`, `CleanerMembers`, `InspectionDetails`, `WeeklyOff` của user đang đăng nhập |
| 3 | Tên đội | `team_name` | Text hiển thị | Chỉ khi có phân công |
| 4 | Số thành viên | `tota_members` | Text hiển thị | Chỉ khi `assigned` |
| 5 | Xe (Vehicle) | `vehicle` (biển số) | Text hiển thị | Chỉ khi đội có gán xe |

## Chức năng/nút thao tác
- Chỉ xem, không có thao tác chỉnh sửa; đây là màn hình tra cứu cá nhân.

## Điều hướng
- Vào từ: menu "My Assignments" trong sidebar (dành cho nhân viên dọn dẹp).
- Đi tới: không có điều hướng tiếp.
