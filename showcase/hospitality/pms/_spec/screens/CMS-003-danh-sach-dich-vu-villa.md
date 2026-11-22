# CMS-003 — Trưng bày dịch vụ (Service Showcase)

**Loại:** Trang đầy đủ

**Route:** `CmsController::cmsServicesList($action, $id)` — mặc định `/cms/cms-services-list/:action/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Danh sách các "dịch vụ villa" (Concierge/Maintenance/Cleaning/Transport) đã cấu hình để hiển thị trên website villa. Không phân trang server-side (lấy toàn bộ `CmsService->find('all')`, phân trang/lọc/sắp xếp chỉ ở client qua DataTable `#zero_config`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Tiêu đề | `CmsService.title` | |
| 3 | Hành động | — | Nút Edit, Delete |

Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Thêm mới (nút "+"):** điều hướng đến CMS-004 (`/cms/cms-services`, không truyền `id`).
- **Edit:** điều hướng đến CMS-004 kèm `id` (`/cms/cms-services/:id`).
- **Delete:** gọi lại chính action này với `$action`/`$id` (dạng `/cms/cms-services-list/delete/:id`) — xoá bản ghi `CmsService` theo `id`, hiển thị flash message rồi redirect lại danh sách.
- Ghi chú backend: action `duplicateProperty` (AJAX, không có view riêng) cho phép nhân bản nội dung dịch vụ từ villa này sang villa khác (`business_unit_id`, `villa`, `to`); tuy nhiên trong view hiện tại của CMS-003/CMS-004 không thấy nút/khối UI gọi action này (có 1 dòng JS gọi `#duplicate-form` bị comment sẵn trong `cms_services.ctp`), nên chức năng này hiện chưa được kích hoạt qua giao diện đang hiển thị.

## Điều hướng
- Vào từ: CMS-005 (Khối nội dung dùng chung, nút "Service Showcase") hoặc breadcrumb từ CMS-004.
- Điều hướng đến: CMS-004 (thêm/sửa dịch vụ villa).
