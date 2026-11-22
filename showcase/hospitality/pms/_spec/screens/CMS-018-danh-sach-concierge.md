# CMS-018 — Trưng bày concierge (Concierge Showcase)

**Loại:** Trang đầy đủ

**Route:** `CmsController::concierges($action, $id)` — mặc định `/cms/concierges/:action/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Danh sách các dịch vụ concierge hiển thị trên website. Không phân trang server-side (lấy toàn bộ `CmsConcierge->find('all')`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Tiêu đề | `CmsConcierge.title` | |
| 3 | Hành động | — | Nút Edit, Delete |

Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Thêm mới (nút "+"):** điều hướng đến CMS-019 – editConcierges (`/cms/edit-concierges`, nằm ngoài phạm vi tài liệu này, do agent khác phụ trách).
- **Edit:** điều hướng đến CMS-019 kèm `id` (`/cms/edit-concierges/:id`).
- **Delete:** gọi lại action này dạng `/cms/concierges/delete/:id` — xoá bản ghi `CmsConcierge` **và** xoá toàn bộ ảnh gallery liên quan trong `CmsImage` (điều kiện `villa_id = id`, `tag = 'Concierge'`), hiển thị flash message rồi redirect lại danh sách (dùng `['controller'=>'Cms','action'=>'concierges']`).

## Điều hướng
- Vào từ: CMS-005 (Khối nội dung dùng chung, nút "Concierge Showcase").
- Điều hướng đến: CMS-019 (thêm/sửa concierge — ngoài phạm vi tài liệu này).
