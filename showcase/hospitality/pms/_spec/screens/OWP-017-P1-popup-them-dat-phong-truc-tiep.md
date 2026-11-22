# OWP-017-P1 — Tạo yêu cầu lưu trú (New Stay Request)

**Loại:** Popup (mở từ OWP-017)

**Route:** `ExternalUserController::addDirectBooking($id = null)` — không có route đẹp riêng, mở từ nút "Request New Booking" trên OWP-017 (mặc định `/external-user/add-direct-booking`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Form gửi yêu cầu đặt phòng trực tiếp (không qua OTA) cho một biệt thự, hệ thống kiểm tra trùng lịch trước khi lưu ở trạng thái "Add:Pending" và gửi email thông báo cho đơn vị kinh doanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại đặt phòng | booking_type | Select | Có | Owner Booking (non-paid) / Guest Booking (paid) / Booking Extension |
| 2 | Biệt thự | villa_id | Select | Có | Danh sách biệt thự thuộc chủ sở hữu |
| 3 | Tên khách | guest_first_name | Text | Không | |
| 4 | Họ khách | guest_family_name | Text | Không | |
| 5 | Số điện thoại khách | guest_phone_number | Text | Không | |
| 6 | Email khách | guest_email | Email | Không | |
| 7 | Khoảng ngày đặt phòng | booking_range | Date range picker | Có | Ẩn ngày đã có đặt phòng (booked_dates) |
| 8 | Số đêm | total_night | Number | Có | |
| 9 | Số khách | total_guest | Number | Có | |
| 10 | Hình thức thanh toán | paid_via | Select/Text | Có (nếu không phải Owner Booking non-paid) | Danh sách phương thức thanh toán |
| 11 | Số tiền đặt phòng | booking_amount | Text/Số | Có | |
| 12 | Thanh toán | payment | Text | Có | |
| 13 | Điều kiện đặc biệt | special_conditions | Textarea | Không | |

## Chức năng/nút thao tác

- Gửi yêu cầu đặt phòng (submit, kiểm tra trùng lịch, lưu trạng thái "Add:Pending", gửi email thông báo)
- Thông báo lỗi nếu biệt thự đã có đặt phòng trong khoảng ngày chọn

## Điều hướng

- Mở từ OWP-017 (nút "Request New Booking")
- Gửi thành công → quay lại OWP-017
