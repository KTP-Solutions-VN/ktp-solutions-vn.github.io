# BU-009 — Nền tảng chat (Chat Platforms)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::chatPlatform()` — mặc định `/business-unit/chat-platform`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Danh sách các nền tảng chat (Zalo, WhatsApp, Messenger…) dùng để liên hệ với khách hàng, có thể thêm/sửa/xóa ngay trên trang qua popup.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên nền tảng | `name` | |
| 3 | Ngày tạo | `created_at` | Định dạng `d M Y h:i A` |
| 4 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add new:** mở popup BU-009-P1 ở chế độ Thêm mới.
- **Sửa (icon bút):** mở popup BU-009-P1 ở chế độ Sửa.
- **Xóa (icon thùng rác):** mở popup BU-009-P2 xác nhận xóa.

## Điều hướng
- Vào từ: menu Settings.
- Điều hướng đến: BU-009-P1 (popup thêm/sửa), BU-009-P2 (popup xác nhận xóa).
