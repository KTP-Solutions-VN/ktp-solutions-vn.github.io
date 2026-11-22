# OPR-018 — Thiết lập tổ chăm vườn (Garden Crew Setup)

**Loại:** Trang đầy đủ
**Route:** villa-services/gardenTeams + route đẹp dạng dashed: villa-services/garden-teams
**Module:** OPR = Công việc bảo dưỡng

> Lưu ý: file view `garden_teams.ctp` nằm trong thư mục theme `Operator` nhưng action thực thi thuộc `VillaServicesController::gardenTeams()`, không phải `OperatorController`.

## Mô tả ngắn gọn
Màn hình khai báo các đội (team) làm vườn cho một ngày và đơn vị kinh doanh cụ thể: mỗi đội có khung giờ làm việc (start/end time) và danh sách thành viên (gardener) được thêm vào; dữ liệu này là đầu vào cho OPR-017 (Lập lịch lượt chăm vườn).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | |
| 2 | Ngày | `date_planning` | Datepicker | Có | |
| 3 | Giờ bắt đầu đội | `starttime_<n>` | Timepicker | Có | Mỗi đội một cặp start/end |
| 4 | Giờ kết thúc đội | `endtime_<n>` | Timepicker | Có | |
| 5 | Thành viên đội | `member_id` (chọn rồi Add) | Select + danh sách thành viên đã thêm | Có (tối thiểu 1 người/đội) | Chỉ hiển thị user có role "Garden", chưa được gán ở đội khác cùng ngày |

## Chức năng/nút thao tác
- **Add Teams (+)**: thêm một đội mới (khung giờ + danh sách thành viên trống) vào form.
- **Thêm thành viên vào đội**: chọn user từ select rồi thêm vào danh sách thành viên của đội đó.
- **Xóa thành viên (icon thùng rác)**: gỡ một thành viên khỏi đội.
- **Save**: gửi ajax `saveGardenTeams` lưu toàn bộ cấu hình đội/khung giờ/thành viên cho ngày + BU đã chọn (bảng `GardenTeams`, cột `members` serialize).

## Điều hướng
- Vào từ: menu "Garden Crew Setup" trong sidebar (nhóm công việc bảo dưỡng).
- Đi tới: không điều hướng sang trang khác; dữ liệu lưu tại đây được OPR-017 (Lập lịch lượt chăm vườn) sử dụng để gán villa vào từng slot của đội.
