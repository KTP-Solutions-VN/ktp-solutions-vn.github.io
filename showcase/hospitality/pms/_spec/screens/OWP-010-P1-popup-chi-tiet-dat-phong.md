# OWP-010-P1 — Chi tiết đặt chỗ (Reservation Detail)

**Loại:** Popup (mở từ OWP-010 và OWP-008)

**Route:** `ExternalUserController::bookingDetails($id)` — không có route đẹp riêng (mặc định `/external-user/booking-details/{id_base64}`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Trang/popup xem chi tiết đầy đủ của một đặt phòng: thông tin đặt phòng, thông tin khách, thông tin trước khi đến, thông tin check-in/check-out, hình ảnh đặt phòng — chỉ xem, không chỉnh sửa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| **Thông tin đặt phòng** ||||| |
| 1 | Mã đặt phòng | booking_id | Text (hiển thị) | — | |
| 2 | Biệt thự | villa.name | Text (hiển thị) | — | |
| 3 | Chủ sở hữu | owner.name | Text (hiển thị) | — | |
| 4 | Nguồn đặt | referer | Text (hiển thị) | — | |
| 5 | Ngày đặt | booking_date | Ngày (hiển thị) | — | |
| 6 | Trạng thái | status | Text/badge | — | |
| 7 | Ngày nhận phòng | check_in_date | Ngày (hiển thị) | — | |
| 8 | Ngày trả phòng | check_out_date | Ngày (hiển thị) | — | |
| 9 | Số tiền | amount | Số (hiển thị) | — | |
| 10 | Hoa hồng | commission | Số (hiển thị) | — | |
| 11 | Thuế | tax | Số (hiển thị) | — | |
| 12 | Công nợ chưa thanh toán | outstanding_payment | Số (hiển thị) | — | |
| 13 | Trạng thái thanh toán | payment_status | Text (hiển thị) | — | |
| 14 | Tiền tệ thanh toán | payment_currency | Text (hiển thị) | — | |
| 15 | Mô tả thanh toán | payment_description | Text (hiển thị) | — | |
| 16 | Ghi chú | notes | Text (hiển thị) | — | |
| **Thông tin khách** ||||| |
| 17 | Tên khách | guest_first_name | Text (hiển thị) | — | |
| 18 | Họ khách | guest_family_name | Text (hiển thị) | — | |
| 19 | Email | email | Text (hiển thị) | — | |
| 20 | Quốc gia | country | Text (hiển thị) | — | |
| 21 | Số điện thoại | phone_number | Text (hiển thị) | — | |
| 22 | Số di động | mobile_number | Text (hiển thị) | — | |
| 23 | Ngôn ngữ | language | Text (hiển thị) | — | |
| 24 | Tổng số khách | total_guest | Số (hiển thị) | — | |
| 25 | Người lớn | adult | Số (hiển thị) | — | |
| 26 | Trẻ em | child | Số (hiển thị) | — | |
| 27 | Tỉnh/thành | state | Text (hiển thị) | — | |
| 28 | Thành phố | city | Text (hiển thị) | — | |
| 29 | Địa chỉ | address | Text (hiển thị) | — | |
| 30 | Mã bưu chính | postal_code | Text (hiển thị) | — | |
| **Thông tin trước khi đến (Pre-arrival)** ||||| |
| 31 | Concierge phụ trách | assigned_concierge | Text (hiển thị) | — | "Not assigned" nếu trống |
| 32 | Giờ đến dự kiến | estimated_arrival | Text (hiển thị) | — | |
| 33 | Có cần đưa đón | transfer_needed | Text (hiển thị) | — | |
| 34 | Thông tin đưa đón | transfer_data | Text (hiển thị) | — | |
| 35 | Yêu cầu đặc biệt | extra_requirement | Text (hiển thị) | — | |
| 36 | Trạng thái chat với khách | guest_chat_status | Text (hiển thị) | — | |
| **Thông tin Check-in / Check-out** ||||| |
| 37 | Giờ check-in | check_in_time | Text (hiển thị) | — | |
| 38 | Giờ check-out | check_out_time | Text (hiển thị) | — | |
| 39 | Nhân viên check-in | check_in_staff | Text (hiển thị) | — | |
| 40 | Nhân viên check-out | check_out_staff | Text (hiển thị) | — | |
| 41 | Chỉ số điện đầu | electricity_start_reading | Số (hiển thị) | — | |
| 42 | Chỉ số điện cuối | electricity_end_reading | Số (hiển thị) | — | |
| 43 | Thanh toán tiền điện | electricity_payment | Số (hiển thị) | — | |
| 44 | Đã nhận thanh toán | payment_received | Text (hiển thị) | — | |
| 45 | Đánh giá sau check-out | check_out_reviews | Text (hiển thị) | — | |
| 46 | Hình ảnh đặt phòng | booking_images | Danh sách hình ảnh | — | |

## Chức năng/nút thao tác

- Xem toàn bộ thông tin chi tiết đặt phòng (không chỉnh sửa được)

## Điều hướng

- Mở từ OWP-010 (icon xem chi tiết) hoặc OWP-008 (click ô lịch)
- Đóng popup → quay lại màn hình gốc
