# BOOK-094-P1 — Luồng chat – bản cổ điển (Chat Thread (Classic))

**Loại:** Trang đầy đủ (mở từ BOOK-094, mở tab mới)

**Route:** Booking/whatsappChat/:booking_id (id được base64_encode)

**Route đẹp:** `/VM/booking/whatsapp-chat/:booking_id` (dùng trực tiếp trong link tại view, không khai báo trong config/Routes.php)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Cửa sổ chat WhatsApp trực tiếp với khách của một booking, hiển thị thông tin khách/villa và access code nhóm chat, cho phép nhân viên concierge được phân công gửi/nhận tin nhắn qua API WhatsApp.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | guest_detail.villa.name | Hiển thị | — | |
| 2 | Tên khách, SĐT | guest_detail.guest.* | Hiển thị | — | |
| 3 | Trạng thái WhatsApp | guest_detail.guest.whatsapp_status | Hiển thị | — | |
| 4 | Access code nhóm chat | access_code | Hiển thị | — | Dùng để tra cứu lịch sử chat qua AJAX |
| 5 | Danh sách access code được phép xem (Concierge) | concierge_access_code | Ẩn (dùng cho JS) | — | Giới hạn quyền xem chat nếu user có vai trò Concierge |
| 6 | Danh sách mẫu tin nhắn | template_list | Select | Không | Mặc định 1 mẫu "Welcome to azurastays" |

## Chức năng/nút thao tác

- Gửi/nhận tin nhắn realtime qua AJAX (`getWhatsappChatData`, `saveWhatsappChat`).
- Xem trạng thái đã đọc/đã gửi của từng tin nhắn.
- Kết thúc phiên chat (liên kết tới `finishWhatsappChat`).

## Điều hướng

- Mở từ BOOK-094 (Hộp thư chat – bản cổ điển) bằng nút Chat, mở trong tab trình duyệt mới.
- Không có điều hướng tiếp; đóng tab để quay lại BOOK-094.
