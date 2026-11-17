# SET-002-P3 — Popup Xóa Owner Portal URL

**Loại:** Popup (mở từ SET-002, tab Owner Portal URL)

**Route:** Modal Bootstrap `#exampleModal` trong element `technical-settings/owner_portal_url.ctp`; xác nhận điều hướng tới `SettingController::deleteOwnerPortalUrl($id)` — `/setting/delete-owner-portal-url/:id` (id được `base64_encode`/`btoa` khi truyền lên URL).

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa một Owner Portal URL (không áp dụng cho URL mặc định — nút xóa bị ẩn với dòng có `is_default = 1`).

## Mô tả chi tiết

| # | Thành phần | Ghi chú |
|---|---|---|
| 1 | Tiêu đề popup | "Delete Owner Portal URL : {title}" — tên URL đang chọn |
| 2 | Nội dung cảnh báo | Thông báo Business Unit đang gán cho URL này sẽ tự động chuyển về dùng URL mặc định sau khi xóa |

## Chức năng/nút thao tác
- **Delete:** điều hướng trình duyệt tới `deleteOwnerPortalUrl/{id}` (base64) → server xóa bản ghi `OwnerPortalUrl` và toàn bộ `OwnerPortalUrlAccess` liên quan, ghi log hoạt động, hiện Flash message, redirect về SET-002 (tab Owner Portal URL).
- **Cancel:** đóng modal, không thực hiện gì.

## Điều hướng
- Mở từ: SET-002 (tab Owner Portal URL) — icon "Xóa" (thùng rác) trên từng dòng URL không phải mặc định.
- Sau khi xóa: quay lại SET-002 (tab Owner Portal URL), dòng URL đã xóa biến mất; các Business Unit từng gán cho URL đó chuyển về phạm vi của URL mặc định.
