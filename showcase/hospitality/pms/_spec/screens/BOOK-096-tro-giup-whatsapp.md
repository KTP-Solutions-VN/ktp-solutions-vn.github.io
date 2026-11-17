# BOOK-096 — Trợ giúp / Trạng thái hệ thống WhatsApp

**Loại:** Trang đầy đủ

**Route:** Booking/whatsAppHelp (mặc định: `/booking/whats-app-help`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Trang kiểm tra/chẩn đoán tình trạng kết nối các dịch vụ nền phục vụ chatbot/WhatsApp: token WhatsApp Business API, Gemini AI, Firebase, và tra cứu log phản hồi từ WhatsApp API theo ngày, phục vụ đội kỹ thuật/vận hành xử lý sự cố.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Trạng thái token WhatsApp | data_array.access_token_response | Hiển thị (Ok = xanh, lỗi = đỏ) | — | |
| 2 | Trạng thái Gemini AI | data_array.gemeni_response | Hiển thị (Ok = xanh, lỗi = đỏ) | — | Gọi thử API `gemini-2.0-flash:generateContent` |
| 3 | Trạng thái Firebase | data_array.firebase_response | Hiển thị (Ok = xanh, lỗi = đỏ) | — | |
| 4 | Ngày tra cứu log API WhatsApp | date | Date input | Có | Dùng cho form tìm kiếm log phản hồi WhatsApp API |

## Chức năng/nút thao tác

- Nút Search (tìm kiếm) trong form log: tải danh sách phản hồi API WhatsApp theo ngày đã chọn.

## Điều hướng

- Vào từ menu WhatsApp / liên kết trợ giúp trên BOOK-095 (WhatsApp Manager bản mới).
- Không có điều hướng tiếp theo (trang tra cứu/chẩn đoán độc lập).
