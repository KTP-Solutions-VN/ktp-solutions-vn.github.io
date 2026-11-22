# EMT-003 — Trình sửa mẫu email (Email Template Editor)

**Loại:** Trang đầy đủ

**Route:** `EmailTemplateController::edit($id)` — mặc định `/email-template/edit/:id` (id mã hóa base64)

**Module:** EMT = Thư viện email

## Mô tả ngắn gọn
Form chỉnh sửa tiêu đề và nội dung một mẫu email đã tồn tại. Mục đích sử dụng (Template For) và Ngôn ngữ chỉ hiển thị, không cho sửa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Dùng cho (Template For) | `template_for` | Text (readonly) | — | Không cho chỉnh sửa |
| 2 | Ngôn ngữ | `language_id` | Text (readonly) | — | Không cho chỉnh sửa |
| 3 | Tiêu đề | `title` | Text (min 2 ký tự) | Có | |
| 4 | Nội dung | `content` | Textarea + TinyMCE (rich text) | Có (min 2 ký tự) | |

## Chức năng/nút thao tác
- **Save:** cập nhật `title` và `content` của `EmailTemplate`, ghi log hoạt động, chuyển hướng tới EMT-001.
- **Cancel (reset):** khôi phục giá trị ban đầu trên form (reset, không điều hướng).

## Điều hướng
- Mở từ: icon Edit trên EMT-001 (Thư viện email).
- Sau khi lưu: chuyển tới EMT-001. Nếu id không hợp lệ: quay lại trang trước (`referer`).
