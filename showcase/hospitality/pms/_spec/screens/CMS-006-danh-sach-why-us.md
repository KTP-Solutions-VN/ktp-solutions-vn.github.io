# CMS-006 — Danh sách "Why Us" (lý do chọn chúng tôi)

**Loại:** Trang đầy đủ

**Route:** `CmsController::whyUs($action, $id)` — mặc định `/cms/why-us/:action/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Danh sách các mục "Why Us" (lý do khách nên chọn dịch vụ) hiển thị trên website. Không phân trang server-side (lấy toàn bộ `CmsWhyUs->find('all')`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Tiêu đề | `CmsWhyUs.title` | |
| 3 | Hành động | — | Nút Edit, Delete |

Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Thêm mới (nút "+"):** điều hướng đến CMS-007 (`/cms/why-us-add`).
- **Edit:** điều hướng đến CMS-008 (`/cms/why-us-edit/:id`).
- **Delete:** gọi lại action này dạng `/cms/why-us/delete/:id` — xoá bản ghi `CmsWhyUs`, hiển thị flash message rồi redirect lại danh sách.

## Điều hướng
- Vào từ: CMS-005 (Common Text, nút "Why Us") hoặc breadcrumb từ CMS-007/CMS-008.
- Điều hướng đến: CMS-007 (thêm), CMS-008 (sửa).
