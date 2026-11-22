# BU-009-P2 — Xác nhận xóa ứng dụng (Confirm App Deletion)

**Loại:** Popup (mở từ BU-009)

**Route:** Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `chat_platform.ctp`; submit POST cùng action `BusinessUnitController::chatPlatform()` với `action=delete`.

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một nền tảng chat.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên nền tảng sắp xóa |
| 2 | ID (ẩn) | `id` | Hidden | Có | |
| 3 | Hành động (ẩn) | `action` | Hidden (`delete`) | — | |

## Chức năng/nút thao tác
- **Delete:** gửi POST xóa bản ghi `ChatPlatform`.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-009 (danh sách nền tảng chat) — icon Xóa trên từng dòng.
- Sau khi submit: redirect quay lại BU-009 (`referer()`).
