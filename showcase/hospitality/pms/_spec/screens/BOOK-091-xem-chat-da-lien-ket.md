# BOOK-091 — Hội thoại đã gộp (Merged Conversation)

**Loại:** Trang đầy đủ / xem (mở từ BOOK-089)

**Route:** Booking/viewLinkedChat/:booking_id (id được base64_encode)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Màn hình chỉ đọc, hiển thị thông tin booking hiện tại cùng với thông tin booking gốc mà chat của nó đã được liên kết tới (xem BOOK-090), giúp nhân viên tra cứu nhanh nguồn gốc của một chat đã gộp.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Booking hiện tại: ngày đặt/nhận/trả phòng | booking_date, check_in_date, check_out_date | Hiển thị | — | |
| 2 | Booking hiện tại: villa, tên khách, SĐT, quốc tịch | villa.name, guest.* | Hiển thị | — | |
| 3 | Booking đã liên kết tới (link_id): ngày đặt/nhận/trả phòng, villa, tên khách, SĐT, quốc tịch | linked_booking.* | Hiển thị | — | Lấy qua GroupChat.link_id → booking gốc |

## Chức năng/nút thao tác

- Chỉ xem, không có thao tác chỉnh sửa/lưu trên màn hình này.

## Điều hướng

- Mở từ BOOK-089 (biểu tượng mắt trên dòng có `GroupChat.status = Link`).
- Không có điều hướng tiếp theo; dùng nút back trình duyệt để quay lại BOOK-089.
