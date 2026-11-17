# BOOK-092 — Cài đặt tin nhắn chào mừng

**Loại:** Trang đầy đủ

**Route:** Booking/messageSettings (mặc định: `/booking/message-settings`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Quản lý các mẫu tin nhắn chào mừng (welcome message) gửi cho khách khi mở chat, có thể cấu hình theo Quốc gia/Vùng (Region) chung hoặc gán riêng theo từng Villa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | country | Select | Có | Chỉ liệt kê quốc gia có Region hợp lệ gắn Villa đang mở & có BU active |
| 2 | Vùng (Region) | region_id | Select | Có | Load theo quốc gia đã chọn (AJAX `getRegions`) |
| 3 | Bảng danh sách tin nhắn theo vùng | (khung `#welcome-table`) | Bảng AJAX | — | Liệt kê các tin chào mừng theo ngôn ngữ đã cấu hình cho vùng |
| 4 | Bảng danh sách tin nhắn gán riêng theo villa | (khung `#villa-message-table`) | Bảng AJAX | — | Ẩn mặc định, hiện khi bấm "Gán tin nhắn cho villa" |

## Chức năng/nút thao tác

- Nút "Add Message" (Thêm tin nhắn): mở form thêm tin nhắn chào mừng theo Region + ngôn ngữ (lưu qua AJAX `saveWelcomeMessages`).
- Nút "Assign Message to Villa" (Gán tin nhắn cho villa): mở form gán một mẫu tin nhắn có sẵn cho villa cụ thể (lưu qua AJAX `saveWelcomeVillaMessage`).
- Chọn quốc gia/vùng để tải lại danh sách tin nhắn tương ứng.
- Xóa tin nhắn (qua `deleteWelcomeMessage`).

## Điều hướng

- Vào từ menu quản lý chat/wiki.
- Tin nhắn chào mừng được sử dụng khi kích hoạt chat tại BOOK-089-P1 (Kích hoạt/Sửa chat).
