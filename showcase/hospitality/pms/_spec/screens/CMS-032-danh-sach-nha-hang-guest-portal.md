# CMS-032 — Danh sách nhà hàng Guest Portal

**Loại:** Trang đầy đủ

**Route:** `CmsController::guestPortal()` — mặc định `/cms/guest-portal`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Danh sách các nhà hàng (Restaurant) hiển thị trên Guest Portal, lọc theo Business Unit/Zone mà user đang đăng nhập được phân quyền. Từ đây có thể thêm mới, sửa hoặc xoá nhà hàng.

## Mô tả chi tiết

Danh sách (bảng dữ liệu, id `zero_config` — dùng DataTable phía client hỗ trợ tìm kiếm/sắp xếp; phân trang trên URL không có, dữ liệu tải toàn bộ theo điều kiện lọc rồi phân trang phía client qua DataTable):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Logo | `Restaurant.logo` | Ảnh thumbnail 100x100; nếu chưa có logo hiển thị ảnh mặc định `no-image.gif` |
| 2 | Business Unit | `BusinessUnit.name` | Lấy qua `contain(['BusinessUnit'])` |
| 3 | Tên nhà hàng | `Restaurant.name` | |
| 4 | Thao tác | — | Nút Edit / Delete |

Sắp xếp mặc định: theo tên nhà hàng tăng dần (`Restaurant.name ASC`).

Filter: dropdown "Business Unit" (`business_unit` — GET), mặc định lấy theo Business Unit/Zone được phân quyền của user (`_getAuthBasedBuVilla`); có thêm lựa chọn "All" (value = 0). Khi đổi lựa chọn, form filter (GET, id `filter_form`) tự động submit và lưu cookie business unit đã chọn.

## Chức năng/nút thao tác
- **Chọn Business Unit (filter):** lọc lại danh sách nhà hàng theo Business Unit/Zone đã chọn (hoặc tất cả các business unit nếu chọn "All").
- **Thêm mới (nút "+ Add New" góc trên bảng):** link đến `CmsController::restaurants()` (không truyền tab/id) → mở CMS-033 ở tab "Restaurant", chế độ Thêm mới.
- **Edit (icon bút trên từng dòng):** link đến `CmsController::restaurants('restaurant', $id)` → mở CMS-033 ở tab "Restaurant", chế độ Sửa, nạp sẵn dữ liệu nhà hàng.
- **Delete (icon thùng rác trên từng dòng):** mở popup xác nhận (modal Bootstrap) hiển thị tên nhà hàng cần xoá; bấm "Save" trong popup sẽ điều hướng trình duyệt (JS `window.location.href`) tới `deleteRestaurant($id)` (id encode base64) — action này KHÔNG có route/view riêng, xử lý xoá luôn nhà hàng (`Restaurant`) và toàn bộ ảnh banner liên quan trong `RestaurantImage` (kèm xoá file vật lý trong `webroot/files/restaurants/`), ghi access log, rồi redirect quay lại CMS-032 kèm Flash message thành công/thất bại (`something_went_wrong_text` nếu xoá lỗi, `data_not_found_text` nếu không tìm thấy nhà hàng).

## Điều hướng
- Vào từ: menu Settings (active_menu = 182).
- Điều hướng đến: CMS-033 (form thêm/sửa nhà hàng) khi bấm "+ Add New" hoặc icon Edit.
