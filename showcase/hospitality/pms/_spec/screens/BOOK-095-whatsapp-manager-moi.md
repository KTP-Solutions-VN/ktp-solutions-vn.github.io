# BOOK-095 — WhatsApp Manager (bản mới)

**Loại:** Trang đầy đủ (có tab)

**Route:** Booking/whatsAppManagerNew/:tab? (mặc định: `/booking/whats-app-manager-new`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Phiên bản nâng cấp của BOOK-094, gồm 2 tab: "WhatsApp Manager" (danh sách booking có kênh chat WhatsApp, tương tự BOOK-094 nhưng bổ sung cảnh báo đổi số điện thoại) và "Notifications" (cấu hình mức độ nhận thông báo WhatsApp cho từng nhân viên trong đơn vị kinh doanh).

## Mô tả chi tiết

**Tab 1 — WhatsApp Manager** (danh sách, lọc theo Đơn vị kinh doanh):

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày đặt/nhận/trả phòng | booking_date, check_in_date, check_out_date | |
| 2 | Villa, tên khách, SĐT | villa.name, guest.* | |
| 3 | Trạng thái WhatsApp/đổi số | guest.whatsapp_status, guest.is_number_change | Icon cảnh báo nếu số điện thoại khách đã đổi |
| 4 | Access code, trưởng nhóm, trạng thái | group_chat.* | |

**Tab 2 — Notifications:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Danh sách nhân viên theo đơn vị kinh doanh | notification_users | Danh sách (nhóm: Concierge/BU Manager/Admin/Superadmin) | — | |
| 2 | Mức độ nhận thông báo | notification_type | Select: Full / Ltd / Off | Có | Lưu qua AJAX `setUserNotification` |

## Chức năng/nút thao tác

- Chuyển tab qua thanh nav-tabs (`whatsapp_manager` / `notifications`).
- Nút "Chat" trên từng dòng (tab 1) → mở BOOK-095-P1 (whatsappChatNew).
- Nút kết thúc chat → `finishWhatsappChat`.
- Đổi mức độ thông báo (tab 2) → lưu ngay qua AJAX.
- Tạo lại token WhatsApp (nếu có quyền) → `regenrateWhatsappToken`.

## Điều hướng

- Vào từ menu WhatsApp (thay thế BOOK-094).
- → BOOK-095-P1 (Chat WhatsApp bản mới) khi bấm nút Chat.
- Có liên kết trợ giúp tới BOOK-096 (Trợ giúp WhatsApp).
