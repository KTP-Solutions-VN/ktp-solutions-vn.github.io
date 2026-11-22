# BOOK-110 — Chứng nhận sức khỏe (Health Certification)

**Loại:** Trang đầy đủ

**Route:** Booking/shaPlusEdit/:booking_id

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Xem thông tin đặt phòng và cập nhật trạng thái chứng nhận SHA+ (Safety and Health Administration) cùng ghi chú cho một booking cụ thể.

Lưu ý: liên kết dẫn tới màn hình này (nút "Edit" trong danh sách SHA+ và mục menu "SHA Plus") hiện đang bị comment/ẩn trong mã nguồn (`sha_plus.ctp`, `left-sidebar.ctp`), nên màn hình chỉ có thể truy cập trực tiếp bằng URL với `booking_id`, không có điểm vào chủ động trên giao diện hiện tại.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Booking Date | booking.booking_date | Hiển thị (chỉ đọc) | — | Định dạng d M Y |
| 2 | Check In Date | booking.check_in_date | Hiển thị (chỉ đọc) | — | |
| 3 | Check Out Date | booking.check_out_date | Hiển thị (chỉ đọc) | — | |
| 4 | Property Name | booking.villa.name | Hiển thị (chỉ đọc) | — | |
| 5 | Guest Name | booking.guest.first_name + family_name | Hiển thị (chỉ đọc) | — | |
| 6 | Guest Phone Number | booking.guest.phone_number | Hiển thị (chỉ đọc) | — | |
| 7 | SHA + | status | Select | Có | Danh sách trạng thái SHA lấy từ `CommonController::_getShaStatus()`; mặc định theo `sha_booking.status` hoặc "Unknown" |
| 8 | Comments | comments | Textarea | Có | |
| 9 | Business Unit ID | business_unit_id | Hidden | — | Lấy theo villa của booking |
| 10 | Villa ID | villa_id | Hidden | — | |
| 11 | Booking ID | booking_id | Hidden | — | |

## Chức năng/nút thao tác

- Nút "Submit" (hoặc "Update" nếu `chat_status = On`): lưu/cập nhật bản ghi `ShaBooking` (tạo mới nếu chưa có, cập nhật nếu đã tồn tại theo `booking_id`), hiển thị flash message thành công/lỗi, sau đó chuyển hướng về action `shaPlus` (màn hình danh sách SHA+ — hiện đã bị vô hiệu hoá trong menu).

## Điều hướng

- Không có điểm vào chủ động hiện tại trên giao diện (menu và nút "Edit" tương ứng đang bị comment); truy cập trực tiếp qua URL `/booking/sha-plus-edit/:booking_id`.
- Sau khi lưu → chuyển hướng tới action `shaPlus` (danh sách chứng nhận sức khỏe, hiện không có menu dẫn tới).
