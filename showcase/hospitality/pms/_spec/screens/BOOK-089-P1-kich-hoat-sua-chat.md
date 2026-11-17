# BOOK-089-P1 — Kích hoạt / Sửa chat khách

**Loại:** Trang đầy đủ (mở từ BOOK-089)

**Route:** Booking/activateChat/:booking_id (id được base64_encode)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định, ví dụ `/booking/activate-chat/<base64_id>`)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Form kích hoạt nhóm chat (GroupChat) cho một booking cụ thể: chọn nền tảng chat, phân công trưởng nhóm/concierge/quản lý chủ villa, gửi tin nhắn chào mừng theo ngôn ngữ khách. Nếu chọn nền tảng "Whatsapp AI", hệ thống tự gửi tin nhắn mẫu qua WhatsApp API trước khi lưu.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày đặt phòng | booking_date | Hiển thị | — | Chỉ đọc |
| 2 | Ngày nhận/trả phòng | check_in_date / check_out_date | Hiển thị | — | check_out_date +1 ngày |
| 3 | Villa | villa.name | Hiển thị | — | |
| 4 | Tên khách | guest.first_name/family_name | Hiển thị | — | |
| 5 | Số điện thoại | phone_number | Text | Không | Có icon đánh dấu SĐT giả (fake) |
| 6 | Email cá nhân | personal_email | Text | Không | |
| 7 | Email OTA | guest_email | Text (readonly) | — | |
| 8 | Quốc tịch khách | country | Select | Không | Danh sách quốc gia |
| 9 | OTA | referer/confirmation_number | Hiển thị | — | Icon theo kênh OTA |
| 10 | Nền tảng chat | chat_platform_id | Select | Có | Danh sách ChatPlatform, mặc định id=2; nếu chọn "Whatsapp AI" sẽ gửi tin chào mừng tự động qua API |
| 11 | Người mở | opened_by / opened_by_user | Hidden + hiển thị | — | Mặc định người dùng hiện tại |
| 12 | Ngày mở | opened_on | Hiển thị | — | Chỉ hiện nếu đã có |
| 13 | Trưởng nhóm | leader_id | Select | Có | Danh sách theo BU + ngôn ngữ khách |
| 14 | Concierge | concierge_id[] | Select multiple | Không | Ưu tiên concierge cùng ngôn ngữ (tô nền) |
| 15 | Chủ/Quản lý villa | owner_manager_id[] | Select multiple | Không | |
| 16 | Gửi tin chào mừng | welcome | Select Yes/No | Không | Disable nếu đã gửi trước đó |
| 17 | Tiêu đề tin chào mừng | welcome_title_id | Select | Không | Theo villa/ngôn ngữ |

## Chức năng/nút thao tác

- Nút Lưu/Xác nhận (submit form) → gọi `activateGroupChat` để tạo/cập nhật GroupChat, ghi log firebase khi dùng Whatsapp AI, redirect về BOOK-089.
- Icon gọi giả (fake call) cạnh số điện thoại.

## Điều hướng

- Mở từ BOOK-089 (nút Mở/Sửa trên từng dòng).
- Sau khi lưu → quay lại BOOK-089 (danh sách chat villa).
