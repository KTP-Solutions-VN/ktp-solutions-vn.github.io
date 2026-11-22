# BU-022-P6 — Xác nhận lưu trữ thành phần (Confirm Element Archiving)

**Loại:** Popup (mở từ BU-022, tab Yếu tố nội dung — chỉ Superadmin)

**Route:** Modal Bootstrap (`#ota-archive-modal`) trong element `channel/content_elements.ctp`; submit AJAX tới `OtaContentController::archiveElement`.

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup xác nhận trước khi lưu trữ (archive/xóa) một Yếu tố nội dung, cảnh báo nếu yếu tố đang được gán cho nền tảng nào hoặc đang được dùng trong nội dung Text.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên yếu tố sắp xóa |
| 2 | Cảnh báo nền tảng đang dùng | — | Danh sách tĩnh | — | Chỉ hiện nếu có |
| 3 | Cảnh báo Texts đang dùng | — | Danh sách tĩnh | — | Chỉ hiện nếu có |

## Chức năng/nút thao tác
- **Delete/Archive:** gửi AJAX lưu trữ yếu tố nội dung, gỡ liên kết khỏi các nền tảng/Texts liên quan.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-022 (tab Yếu tố nội dung) — icon Xóa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `content-elements`).
