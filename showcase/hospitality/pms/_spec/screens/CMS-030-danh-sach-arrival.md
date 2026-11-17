# CMS-030 — Danh sách nội dung Arrival (hướng dẫn khách đến villa)

**Loại:** Trang đầy đủ

**Route:** `CmsController::arrival($action, $id)` — mặc định `/cms/arrival` (danh sách); xoá dùng `/cms/arrival/delete/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Danh sách các bản ghi nội dung "Arrival" — nhóm nội dung hướng dẫn/thông tin dành cho khách khi đến villa (sân bay, bến tàu, thuê xe, phương thức di chuyển khác, check-in, lưu trú), hiển thị trên website. Cùng action `arrival` xử lý cả hiển thị danh sách và xoá bản ghi (khi có tham số `$action = 'delete'` và `$id`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu, id `zero_config` — dùng DataTable phía client hỗ trợ tìm kiếm/sắp xếp/phân trang):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự tăng dần, tính trên client (`$i`) |
| 2 | Tiêu đề | `CmsArrival.title` | |
| 3 | Thao tác | — | Nút Edit / Delete |

Dữ liệu lấy toàn bộ (`find('all')`, không điều kiện lọc/phân trang phía server) từ bảng `CmsArrival`.

## Chức năng/nút thao tác
- **Thêm mới (nút "+ Arrival" góc trên bảng):** link đến `cms-arrival` (không truyền `id`) → mở CMS-031 ở chế độ Thêm mới.
- **Edit (trên từng dòng):** link đến `CmsController::cmsArrival($id)` → mở CMS-031 ở chế độ Sửa, nạp sẵn dữ liệu bản ghi.
- **Delete (trên từng dòng):** link đến `CmsController::arrival('delete', $id)` — xoá thẳng bản ghi `CmsArrival` (không có popup xác nhận riêng, xoá ngay khi click link), sau đó redirect lại về danh sách kèm Flash message thành công/thất bại.

## Điều hướng
- Vào từ: menu Settings/Common Texts (active_menu = 181).
- Điều hướng đến: CMS-031 (form thêm/sửa nội dung Arrival) khi bấm "+ Arrival" hoặc "Edit".
