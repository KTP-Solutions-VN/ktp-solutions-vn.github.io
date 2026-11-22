# BOOK-095-P1 — Luồng chat (Chat Thread)

**Loại:** Trang đầy đủ (mở từ BOOK-095, mở tab mới)

**Route:** Booking/whatsappChatNew/:booking_id (id được base64_encode)

**Route đẹp:** `/VM/booking/whatsapp-chat-new/:booking_id` (dùng trực tiếp trong link tại view, không khai báo trong config/Routes.php)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Bản nâng cấp của BOOK-094-P1: cửa sổ chat WhatsApp với khách, có bổ sung tính toán giờ nhận phòng tiêu chuẩn (ưu tiên: giờ khai báo checkin thực tế → giờ chuẩn villa → giờ chuẩn đơn vị kinh doanh → hằng số mặc định hệ thống) để hiển thị/nhắc trong chat, cùng danh sách villa theo BU/zone để lọc nhanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa, tên khách, SĐT | guest_detail.villa/guest | Hiển thị | — | |
| 2 | Giờ nhận phòng áp dụng | check_in_time | Hiển thị | — | Tính theo thứ tự ưu tiên: check-in thực tế → giờ chuẩn villa → giờ chuẩn BU (BOOK-107) → mặc định hệ thống |
| 3 | Access code nhóm chat | access_code | Hiển thị | — | |
| 4 | Danh sách access code được phép xem (Concierge) | concierge_access_code | Ẩn (dùng cho JS) | — | |
| 5 | Đơn vị kinh doanh (lọc phụ) | business_unit | Select | Không | Gồm cả zone gộp nhiều BU |
| 6 | Danh sách villa theo BU (dùng lọc client-side) | business_unit_villa | Dữ liệu ẩn (JS) | — | |

## Chức năng/nút thao tác

- Gửi/nhận tin nhắn realtime qua AJAX (`getWhatsappChatData`, `saveWhatsappChat`).
- Kết thúc phiên chat (`finishWhatsappChat`).
- Đổi tên hiển thị người chat (`updateChatName`).

## Điều hướng

- Mở từ BOOK-095 (Chat Inbox) bằng nút Chat, mở trong tab trình duyệt mới.
- Không có điều hướng tiếp; đóng tab để quay lại BOOK-095.
