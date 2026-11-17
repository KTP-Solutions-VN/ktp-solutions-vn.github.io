# OWP-017-P2 — Popup Sửa đặt phòng trực tiếp

**Loại:** Popup (mở từ OWP-017)

**Route:** `ExternalUserController::editDirectBooking($id)` — không có route đẹp riêng, mở từ icon sửa trên OWP-017 (mặc định `/external-user/edit-direct-booking/{id_base64}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Form chỉnh sửa một yêu cầu đặt phòng trực tiếp đang ở trạng thái chờ duyệt (Add:Pending), gửi lại yêu cầu thay đổi tới đơn vị quản lý.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại đặt phòng | booking_type | Select (có giá trị mặc định) | Có | "Owner Booking (non-paid)" / "Guest Booking (paid)" / "Booking Extension"; nếu chọn Owner Booking thì ẩn nhóm field thông tin khách và thanh toán |
| 2 | Biệt thự | villa_id | Select (có giá trị mặc định) | Có | |
| 3 | Tên khách | guest_first_name | Text (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 4 | Họ khách | guest_family_name | Text (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 5 | Số điện thoại khách | guest_phone_number | Text (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 6 | Email khách | guest_email | Email (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 7 | Ngày nhận/trả phòng | booking_range | Date range picker (có giá trị mặc định) | Có | Kiểm tra trùng lịch với các Booking hiện có của villa |
| 8 | Tổng số đêm | total_night | Số (readonly) | — | Tự tính từ booking_range |
| 9 | Tổng số khách | total_guest | Số (có giá trị mặc định) | Có | |
| 10 | Số tiền đặt phòng | booking_amount | Text/số (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 11 | Số tiền đã nhận | payment | Text/số (có giá trị mặc định) | Có (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 12 | Hình thức thanh toán | paid_via | Select (có giá trị mặc định) | Không (điều kiện) | Ẩn khi booking_type = Owner Booking |
| 13 | Điều kiện đặc biệt | special_conditions | Text (có giá trị mặc định) | Không | |

## Chức năng/nút thao tác

- Gửi yêu cầu thay đổi (nút "Request Changes" → validate trùng lịch → lưu, đặt lại trạng thái Add:Pending → quay về OWP-017)
- Huỷ (quay về OWP-017)

## Điều hướng

- Mở từ OWP-017 (icon sửa, chỉ hiển thị với booking đang chờ duyệt)
- Sau khi gửi hoặc huỷ → quay lại OWP-017
