# BU-009-P1 — Popup Thêm/Sửa nền tảng chat

**Loại:** Popup (mở từ BU-009)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `chat_platform.ctp`; submit POST cùng action `BusinessUnitController::chatPlatform()`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một nền tảng chat.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên nền tảng | `name` | Text | Có | Validate trùng tên qua AJAX `checkChatPlatform` |
| 2 | Ảnh | `image` / `cropped_image` | File ảnh (crop tỉ lệ 1:1, ≤1MB) | Không | Upload thư mục `villas` |
| 3 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`) | — | |
| 4 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save/Update:** lưu bản ghi `ChatPlatform`.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-009 (danh sách nền tảng chat) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: redirect quay lại BU-009 (`referer()`).
