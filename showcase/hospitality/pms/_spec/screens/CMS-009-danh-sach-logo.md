# CMS-009 — Huy hiệu báo chí & đối tác (Press & Partner Badges)

**Loại:** Trang đầy đủ

**Route:** `CmsController::logos($action, $id)` — mặc định `/cms/logos/:action/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Danh sách các logo đối tác/liên kết hiển thị trên website. Không phân trang server-side (lấy toàn bộ `CmsLogo->find('all')`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Tiêu đề | `CmsLogo.title` | |
| 3 | Link | `CmsLogo.link` | |
| 4 | Hành động | — | Nút Edit, Delete |

Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Thêm mới (nút "+"):** điều hướng đến CMS-010 (`/cms/logo-add`).
- **Edit:** điều hướng đến CMS-011 (`/cms/logo-edit/:id`).
- **Delete:** gọi lại action này dạng `/cms/logos/delete/:id` — xoá bản ghi `CmsLogo`, hiển thị flash message rồi redirect lại danh sách.

## Điều hướng
- Vào từ: CMS-005 (Khối nội dung dùng chung, nút "Partner Badges") hoặc breadcrumb từ CMS-010/CMS-011.
- Điều hướng đến: CMS-010 (thêm), CMS-011 (sửa).
