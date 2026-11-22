# BOOK-086 — Đã nhận yêu cầu (Enquiry Received)

**Loại:** Trang con (mở từ BOOK-085, dạng trang xác nhận sau submit chứ không phải popup)
**Route:** Booking/requestSuccess/:array
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang xác nhận hiển thị sau khi khách gửi thành công yêu cầu đặt phòng ở BOOK-085, tóm tắt lại tên khách, villa và khoảng ngày đã yêu cầu, đồng thời thông báo khách sẽ nhận được email xác nhận booking sau đó.

## Mô tả chi tiết
Không có form nhập liệu — chỉ hiển thị thông tin đã được mã hoá (serialize + urlencode) truyền qua tham số `$array` từ BOOK-085.

| # | Nội dung hiển thị | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | Lời cảm ơn kèm tên khách và tên villa | `data['guest_name']`, `data['villa']` | Template "Dear {NAME}, thank you for booking with us at {PROPERTY_NAME}" |
| 2 | Khoảng ngày đã yêu cầu | `data['arrival']`, `data['departure']` | Định dạng "From {ngày đến} to {ngày đi}" |
| 3 | Thông báo sẽ nhận email xác nhận | Tĩnh | "You will receive a booking confirmation shortly" |

## Chức năng/nút thao tác
- Nút **Back** — quay lại BOOK-085 (`bookingEnquiry`) với `villa_id` tương ứng

## Điều hướng
- Mở từ: BOOK-085 (Yêu cầu lưu trú (form công khai)) — tự động điều hướng tới sau khi submit thành công
- Điều hướng tới: BOOK-085 khi bấm Back
