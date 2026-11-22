# CMS-026 — Nhật ký du lịch (Travel Journal)

**Loại:** Trang đầy đủ

**Route:** `CmsController::insights($action, $id)` — mặc định `/cms/insights/:action/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Màn hình danh sách các bài viết "Travel Journal" (nội dung dạng bài viết/tin tức global, không gắn theo villa cụ thể) thuộc mục Shared Content Blocks của CMS. Từ đây có thể thêm mới, sửa hoặc xoá từng bài viết.

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính toán, biến `$i` tăng dần) | |
| 2 | Tiêu đề | `GuestCollectionInsight.title` | |
| 3 | Thao tác | — | 2 nút: Edit, Delete |

Dữ liệu lấy toàn bộ (`find('all')`, không điều kiện, không sắp xếp, không phân trang, không filter) từ bảng `GuestCollectionInsight`.

## Chức năng/nút thao tác
- **Thêm mới:** nút "Add New" (`<a href="insights-edit">`) → mở CMS-027 (chế độ thêm mới).
- **Edit (từng dòng):** link `action => insights-edit, $id` → mở CMS-027 (chế độ sửa) cho bài viết tương ứng.
- **Delete (từng dòng):** link `action => insights, delete, $id` → gọi lại action `insights` với `$action='delete'`, `$id`; controller xoá bản ghi (`_deleteData('GuestCollectionInsight', 'id', $id)`), hiện Flash message thành công/lỗi, sau đó redirect lại chính màn hình danh sách này.

## Điều hướng
- Vào từ: menu Settings → Shared Content Blocks (`CmsController::commonText`), nút/link "Travel Journal".
- Điều hướng đến: CMS-027 (Trình sửa bài nhật ký).
- Liên quan: tab "Journal" trong màn hình collection tabs của property CMS (CMS-023, `plugins/VillaManagement/src/Template/Cms/collection_tabs.ctp`) hiển thị danh sách các Insight global này để gán/gỡ vào một villa cụ thể — tab đó dùng element riêng (`Element/cms/insights.ctp`) và action AJAX `CmsController::updateInsightAjax()` để lưu lựa chọn (không phải action `insights` của màn hình này, chỉ đọc chung dữ liệu `GuestCollectionInsight`).
