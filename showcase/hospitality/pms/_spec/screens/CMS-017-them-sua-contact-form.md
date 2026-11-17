# CMS-017 — Thêm/Sửa Contact Form

**Loại:** Trang đầy đủ

**Route:** `CmsController::editContactForm($id)` — mặc định `/cms/edit-contact-form/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một cấu hình form liên hệ (dùng chung 1 action cho cả Add khi không truyền `id`, và Edit khi có `id`). Không có yếu tố đa ngôn ngữ.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text (mặc định lấy từ dữ liệu hiện tại khi Edit) | Có | |
| 2 | Email | `email` | Input `type=email` (mặc định lấy từ dữ liệu hiện tại khi Edit) | Có | Email nhận liên hệ từ form trên website |

## Chức năng/nút thao tác
- **Save:** lưu/cập nhật bản ghi `CmsContactUs`. Nếu có `id` → cập nhật, flash "update success/error"; nếu không có `id` → tạo mới, flash "save success/error". Thành công → redirect về CMS-016 (`contactForm`); thất bại → redirect quay lại chính form này (`editContactForm` kèm `id` nếu có).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-016 (nút "Thêm mới" hoặc "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-016 sau khi Save.
