# BOOK-094 — WhatsApp Manager (bản cũ)

**Loại:** Trang đầy đủ

**Route:** Booking/whatsAppManager (mặc định: `/booking/whats-app-manager`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Danh sách các booking đang có kênh chat qua WhatsApp (chat_platform_id = 14), cho phép nhân viên/concierge mở cửa sổ chat trực tiếp hoặc kết thúc (finish) một phiên chat. Đây là phiên bản trước của BOOK-095 (whatsAppManagerNew, có thêm tab Notifications).

## Mô tả chi tiết

**Danh sách (bảng), lọc theo Đơn vị kinh doanh (business_unit, mặc định theo BU đăng nhập/quyền):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày đặt/nhận/trả phòng | booking_date, check_in_date, check_out_date | |
| 2 | Villa | villa.name | |
| 3 | Tên khách | guest.first_name/family_name | |
| 4 | Số điện thoại | guest.phone_number, phone_number_type | Đánh dấu SĐT giả |
| 5 | OTA | referer | |
| 6 | Access code | group_chat.access_code | Copy nhanh |
| 7 | Trưởng nhóm | group_chat.leader_name | |
| 8 | Trạng thái | group_chat.status | |
| 9 | Concierge được gán | group_chat.members | Dùng để giới hạn quyền xem access code với user role Concierge |

## Chức năng/nút thao tác

- Nút "Chat" (biểu tượng bong bóng chat) mở tab mới → BOOK-094-P1 (whatsappChat).
- Nút kết thúc chat → gọi `finishWhatsappChat` (điều hướng `/booking/finish-whatsapp-chat/...`).
- Lọc theo đơn vị kinh doanh (đổi BU qua query `?id=`).

## Điều hướng

- Vào từ menu WhatsApp.
- → BOOK-094-P1 (Chat WhatsApp) khi bấm nút Chat trên từng dòng.
- Phiên bản thay thế hiện hành: BOOK-095 (WhatsApp Manager bản mới, có thêm tab Notifications).
