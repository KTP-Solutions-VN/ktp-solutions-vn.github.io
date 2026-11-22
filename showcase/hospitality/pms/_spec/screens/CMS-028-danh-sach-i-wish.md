# CMS-028 — Danh sách trải nghiệm mong muốn (Experience Wishlist)

**Loại:** Trang đầy đủ

**Route:** `CmsController::iWish($action, $id)` — mặc định `/cms/i-wish/:action/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Màn hình danh sách các mục "Experience Wishlist" (nội dung dạng mong muốn/gợi ý trải nghiệm cho khách, global, không gắn theo villa cụ thể) thuộc mục Shared Content Blocks của CMS. Từ đây có thể thêm mới, sửa hoặc xoá từng mục.

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính toán, biến `$i` tăng dần) | |
| 2 | Tiêu đề | `GuestCollectionIwish.title` | |
| 3 | Thao tác | — | 2 nút: Edit, Delete |

Dữ liệu lấy toàn bộ (`find('all')`, không điều kiện, không sắp xếp, không phân trang, không filter) từ bảng `GuestCollectionIwish`.

## Chức năng/nút thao tác
- **Thêm mới:** nút "Add New" (`<a href="i-wish-edit">`) → mở CMS-029 (chế độ thêm mới).
- **Edit (từng dòng):** link `action => i-wish-edit, $id` → mở CMS-029 (chế độ sửa) cho mục tương ứng.
- **Delete (từng dòng):** link `action => i-wish, delete, $id` → gọi lại action `iWish` với `$action='delete'`, `$id`; controller xoá bản ghi (`_deleteData('GuestCollectionIwish', 'id', $id)`), hiện Flash message thành công/lỗi, sau đó redirect lại chính màn hình danh sách này.

## Điều hướng
- Vào từ: menu Settings → Shared Content Blocks (`CmsController::commonText`), nút/link "Experience Wishlist".
- Điều hướng đến: CMS-029 (Trình sửa mục mong muốn).
- Liên quan: tab "Wishlist" trong màn hình collection tabs của property CMS (CMS-023, `plugins/VillaManagement/src/Template/Cms/collection_tabs.ctp`) hiển thị danh sách các mục I Wish global này dưới dạng toggle On/Off để bật/tắt gán vào một villa cụ thể — tab đó dùng element riêng (`Element/cms/i_wish.ctp`) và action AJAX `CmsController::addIwish()` (bảng `GuestIwish`, liên kết `guest_collection_iwish_id` ↔ `guest_collection_website_id`) để lưu trạng thái bật/tắt, không phải action `iWish` của màn hình này — chỉ dùng chung dữ liệu gốc `GuestCollectionIwish`.
