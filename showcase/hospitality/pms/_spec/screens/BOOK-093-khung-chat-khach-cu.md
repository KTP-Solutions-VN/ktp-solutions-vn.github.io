# BOOK-093 — Luồng chat khách – bản cổ điển (Guest Thread (Classic))

**Loại:** Trang đầy đủ (độc lập, hiện không có điểm truy cập trong menu/UI)

**Route:** Booking/chat/:booking_id (id được base64_encode)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Khung chat WhatsApp phiên bản cũ cho một booking cụ thể: hiển thị lịch sử tin nhắn (bảng WhatsappChat) và cho phép gửi tin nhắn dạng mẫu (template) hoặc tin nhắn tự do. Đây là phiên bản tiền nhiệm, hiện đã được thay thế bởi BOOK-094-P1/BOOK-095-P1 (whatsappChat/whatsappChatNew); không tìm thấy liên kết nào trong các view hiện hành trỏ tới action này, chỉ còn truy cập được qua URL trực tiếp.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên khách | guest_detail.first_name/family_name | Hiển thị | — | |
| 2 | Trạng thái WhatsApp | guest_detail.whatsapp_status | Hiển thị | — | null/waiting → cho chọn mẫu tin nhắn |
| 3 | Lịch sử tin nhắn | data_array (WhatsappChat) | Danh sách | — | Sắp xếp theo id tăng dần |
| 4 | Chọn mẫu tin nhắn | template_id | Select | Không | Chỉ hiện khi whatsapp_status là null/waiting |
| 5 | Nội dung tin nhắn tự do | text_message | Textarea | Không | |

## Chức năng/nút thao tác

- Gửi tin nhắn mẫu (gọi `WhatsAppUtility::sendTemplateMessage`) hoặc tin nhắn tự do (`WhatsAppUtility::sendMessage`), lưu log vào bảng WhatsappChat, hiển thị flash thông báo, redirect lại trang trước.

## Điều hướng

- Không có liên kết vào từ UI hiện tại (chức năng đã được thay thế); trước đây được mở từ danh sách quản lý WhatsApp.
- Chức năng tương đương hiện hành: BOOK-094-P1 (Luồng chat – bản cổ điển) và BOOK-095-P1 (Luồng chat).
