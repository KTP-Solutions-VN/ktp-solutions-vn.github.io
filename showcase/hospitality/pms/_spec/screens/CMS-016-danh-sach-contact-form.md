# CMS-016 — Danh sách Contact Form

**Loại:** Trang đầy đủ

**Route:** `CmsController::contactForm($action, $id)` — mặc định `/cms/contact-form/:action/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Danh sách các cấu hình form liên hệ (tiêu đề + email nhận liên hệ) hiển thị/kết nối trên website. Không phân trang server-side (lấy toàn bộ `CmsContactUs->find('all')`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Tiêu đề | `CmsContactUs.title` | |
| 3 | Email | `CmsContactUs.email` | |
| 4 | Hành động | — | Nút Edit, Delete |

Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Thêm mới (nút "+"):** điều hướng đến CMS-017 (`/cms/edit-contact-form`, không truyền `id`).
- **Edit:** điều hướng đến CMS-017 kèm `id` (`/cms/edit-contact-form/:id`).
- **Delete:** gọi lại action này dạng `/cms/contact-form/delete/:id` — xoá bản ghi `CmsContactUs`, hiển thị flash message rồi redirect lại danh sách.

## Điều hướng
- Vào từ: CMS-005 (Common Text, nút "Contact Form") hoặc breadcrumb từ CMS-017.
- Điều hướng đến: CMS-017 (thêm/sửa contact form).
