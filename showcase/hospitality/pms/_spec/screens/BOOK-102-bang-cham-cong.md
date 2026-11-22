# BOOK-102 — Chấm công hiện trường (Field Attendance)

**Loại:** Trang đầy đủ

**Route:** Booking/timesheet (mặc định: `/booking/timesheet`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Bảng theo dõi giờ chấm công (clock-in/clock-out) hàng ngày của toàn bộ nhân viên nội bộ (Internal) theo đơn vị kinh doanh: giờ vào/ra, vị trí GPS, khoảng cách tới văn phòng/villa, trạng thái nghỉ phép/ốm, và cho phép trưởng nhóm/Superadmin xác nhận (validate) dữ liệu chấm công.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit | Select | Không | "All" + BU theo quyền/zone của user; ghi cookie `default_bu` khi đổi |
| 2 | Ngày | date | Text (date picker, readonly) | Không | Mặc định ngày hiện tại (`d-m-Y`) |

**Danh sách nhân viên (bảng):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Họ tên | usage_name / first_name / family_name | Kèm emoticon |
| 2 | Phòng ban | department | |
| 3 | Giờ vào (Clock in) | clock_in_time | Màu xanh nếu là clock-in thủ công (manual), kèm "(Updated by ...)"; nếu chưa có: link "No" cho phép nhập giờ thủ công |
| 4 | Vị trí vào | clock_in_location | Link mở Google Maps |
| 5 | Giờ ra (Clock out) | clock_out_time | "No" (đỏ) nếu chưa checkout |
| 6 | Vị trí ra | clock_out_location | Link mở Google Maps |
| 7 | Đã xác nhận (Validated) | is_validated | Nút "Validate" hiện khi đã có clock-out và user có quyền xác nhận (Superadmin hoặc `is_timesheet_validator = yes`) |
| 8 | Người xác nhận | validated_by → validator_name | |
| 9 | Ngày xác nhận | validated_on | |
| 10 | Ngày tạo | created_at | |
| 11 | Tracker | is_tracker | Nút "Track" mở modal bản đồ lộ trình; nếu nghỉ có phép (`is_sick_leave`) hiện link tải giấy chứng nhận; nếu nghỉ không lương/ngày nghỉ (`is_user_day_off`) gộp cột hiển thị "Day Off" |

Dòng có `is_sick_leave = yes` được tô nền cam.

## Chức năng/nút thao tác

- Đổi Đơn vị kinh doanh/Ngày → submit form tải lại trang với điều kiện lọc mới.
- Bấm vào ô "No" của giờ vào chưa có → hiện input giờ, lưu qua AJAX `addUserClockin` (cũng dùng để đặt "Day Off" qua nút riêng).
- Nút "Validate" trên từng dòng → gọi AJAX `validateUser`, cập nhật `is_validated=yes`, `validated_by`, `validated_on` ngay trên bảng.
- Nút "Track" → mở modal bản đồ hiển thị `tracking_location` (lộ trình di chuyển trong ngày dựng từ tọa độ văn phòng/villa).
- Link tải giấy chứng nhận nghỉ ốm (khi `is_certificate = yes`).

## Điều hướng

- Vào từ menu chính (icon Field Attendance, mục "Booking-timesheet"), hiển thị theo quyền `filterSidebar`.
- Không điều hướng sang trang khác trong module Đặt chỗ; toàn bộ thao tác xử lý bằng AJAX ngay tại trang.
