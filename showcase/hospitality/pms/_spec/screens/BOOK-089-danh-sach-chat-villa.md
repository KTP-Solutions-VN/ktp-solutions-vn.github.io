# BOOK-089 — Danh sách chat villa (Villa Chat)

**Loại:** Trang đầy đủ

**Route:** Booking/villaChats (mặc định: `/booking/villa-chats`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Danh sách toàn bộ booking đang trong giai đoạn nhắn tin/chăm sóc khách (5 ngày trước ngày đặt tới hiện tại, chưa hủy) kèm trạng thái nhóm chat (GroupChat) theo từng booking, cho phép nhân viên mở/kích hoạt chat, liên kết chat với booking khác, hoặc xem chat đã liên kết. Đây là màn hình trung tâm quản lý kênh nhắn tin khách (Messenger/Zalo/WhatsApp AI...) theo villa.

## Mô tả chi tiết

**Bộ lọc/tìm kiếm:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit | Select (danh sách BU + "All") | Có | Mặc định theo BU đăng nhập/cookie `property_business_unit_id`; hỗ trợ nhóm BU (zone) |
| 2 | Sắp xếp theo | sort_by | Select: Newest First / Check In Date / Status / Property Name | Có | Mặc định "Newest First" |

**Danh sách (bảng):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày đặt phòng | booking_date | Format d M y; tô nền cam nếu trùng ngày check-in |
| 2 | Ngày nhận phòng | check_in_date | |
| 3 | Ngày trả phòng | check_out_date | check_out_date thực tế = check_out_date DB + 1 ngày |
| 4 | Villa | villa.name | |
| 5 | Tên khách | guest.first_name + guest.family_name | |
| 6 | Quốc tịch | country_icon | Cờ quốc gia theo số điện thoại/khai báo |
| 7 | OTA | referer | Icon Booking.com/Agoda/Expedia/Airbnb/khác |
| 8 | Portal | (mã QR/copy code) | Copy access code cổng thông tin khách |
| 9 | TDAC | beds_24_booking_id | Link copy TDAC + nút gửi email TDAC tự động (sendTdacEmail) |
| 10 | Trưởng nhóm chat | group_chat.leader_name | |
| 11 | Trạng thái | status/status_name | New / Active / Archived / Not required / To Open; icon cảnh báo SĐT giả, chặn WhatsApp... |
| 12 | Thao tác | — | Xem chat đã liên kết / Mở (activate) / Liên kết / Sửa |

## Chức năng/nút thao tác

- Lọc theo BU và sắp xếp, submit form để tải lại danh sách.
- Nút "Retrieve Booking" (góc phải) → mở BOOK-038 (Khôi phục đặt phòng, action `retrieveBooking`).
- Với mỗi dòng có `GroupChat.status = Link`: nút xem (👁) → BOOK-091 (viewLinkedChat).
- Với dòng trạng thái "New": nút mở (🔗 external) → BOOK-089-P1 (activateChat); nút liên kết (🔗) → BOOK-090 (linkChat).
- Với dòng trạng thái Active/Archived/Not required: nút sửa (✏️) → BOOK-089-P1 (activateChat, chế độ sửa).
- Toggle hàng để mở nhanh form xác nhận nhóm chat inline (chọn ngôn ngữ, trưởng nhóm, thêm thành viên, gửi tin chào mừng) — gọi AJAX `updateGroupChat`.
- Copy access code, copy link TDAC bằng icon.
- Toggle chặn liên lạc (Mobile/WhatsApp/Không làm phiền) qua AJAX `banCommunication`.

## Điều hướng

- Vào từ menu "Chat" / "Nhắn tin khách" trong sidebar.
- → BOOK-089-P1 (Kích hoạt/Sửa chat) khi bấm Mở hoặc Sửa.
- → BOOK-090 (Liên kết chat) khi bấm Liên kết.
- → BOOK-091 (Xem chat đã liên kết) khi bấm biểu tượng mắt.
- → BOOK-038 (Khôi phục đặt phòng) khi bấm "Retrieve Booking".
