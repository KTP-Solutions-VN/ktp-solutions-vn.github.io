# EMT-001 — Danh sách mẫu email (Email Template List)

**Loại:** Trang đầy đủ

**Route:** `EmailTemplateController::list()` — mặc định `/email-template/list`

**Module:** EMT = Mẫu email

## Mô tả ngắn gọn
Danh sách các mẫu email được cấu hình sẵn trong hệ thống (theo mục đích sử dụng và ngôn ngữ), dùng để soạn sẵn nội dung gửi email tự động (ví dụ: mail newsletter cho chủ nhà).

## Mô tả chi tiết

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự |
| 2 | Tiêu đề | `title` | |
| 3 | Ngôn ngữ | `language_id` | Hiển thị tên ngôn ngữ tương ứng |
| 4 | Ngày tạo | `created_at` | Định dạng d M Y H:i |
| 5 | Thao tác | — | Sửa, Xóa |

Không có filter/tìm kiếm riêng; sắp xếp mặc định theo `title` tăng dần.

## Chức năng/nút thao tác
- **Add new:** mở EMT-002 (Thêm mẫu email).
- **Edit (icon):** mở EMT-003 (Sửa mẫu email) với id đã mã hóa base64.
- **Delete (icon):** mở popup xác nhận EMT-001-P1, khi đồng ý điều hướng tới `email-template/delete/:id`.

## Điều hướng
- Vào từ: menu cấu hình hệ thống (Email Template).
- Điều hướng đến: EMT-002 (Thêm mới), EMT-003 (Sửa), EMT-001-P1 (Xác nhận xóa).
