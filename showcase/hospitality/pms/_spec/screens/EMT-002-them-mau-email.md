# EMT-002 — Thêm mẫu email (Add Email Template)

**Loại:** Trang đầy đủ

**Route:** `EmailTemplateController::add()` — mặc định `/email-template/add`

**Module:** EMT = Mẫu email

## Mô tả ngắn gọn
Form tạo mới một mẫu nội dung email theo mục đích sử dụng (template for) và ngôn ngữ, nội dung soạn bằng trình soạn thảo TinyMCE, hỗ trợ các placeholder động (`##OWNER_NAME##`, `##NEWS_LETTER##`, `##VILLA_NAME##`, `##START_DATE##`, `##END_DATE##`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Dùng cho (Template For) | `template_for` | Select2 (danh sách mục đích sử dụng template) | Có | Khi thay đổi cùng ngôn ngữ, hệ thống AJAX kiểm tra `getEmailTemplate` để tự nạp lại nội dung nếu đã tồn tại bản ghi trùng (tránh trùng lặp) |
| 2 | Ngôn ngữ | `language_id` | Select2 (danh sách Language) | Có | |
| 3 | Tiêu đề | `title` | Text (min 2 ký tự) | Có | |
| 4 | Nội dung | `content` | Textarea + TinyMCE (rich text) | Có (min 2 ký tự) | |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `EmailTemplate` mới, ghi log hoạt động, hiển thị flash thành công, chuyển hướng tới EMT-001.
- **Cancel (reset):** xóa nội dung đã nhập trên form (reset, không điều hướng).

## Điều hướng
- Mở từ: nút "Add new" trên EMT-001 (Danh sách mẫu email).
- Sau khi lưu: chuyển tới EMT-001.
