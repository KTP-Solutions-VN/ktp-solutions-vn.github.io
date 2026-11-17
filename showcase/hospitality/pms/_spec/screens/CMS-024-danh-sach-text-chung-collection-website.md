# CMS-024 — Danh sách text chung Collection Website

**Loại:** Trang đầy đủ

**Route:** `CmsController::collectionCommonText($action, $id)` — mặc định `/cms/collection-common-text/:action/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Danh sách các đoạn text dùng chung (bản dịch theo `type`) áp dụng cho các collection website — dữ liệu bảng `CollectionTranslation`. Đây là kho text nguồn cho 5 dropdown ở tab **Footer** của CMS-023 (Book with confidence, Terms & Condition, Personal data policy, Why work with us, Guarantee). Cùng 1 action `collectionCommonText` xử lý cả hiển thị danh sách và xoá bản ghi (khi truyền `$action`/`$id`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu, lọc theo ngôn ngữ):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tiêu đề | `CollectionTranslation.title` | |
| 2 | Loại | `CollectionTranslation.type` | Một trong 5 loại cố định: `book_with_confidence`, `terms_&_condition`, `guarantee`, `why_work_with_us`, `personal_data_policy` (xem CMS-025) |
| 3 | Nội dung | `CollectionTranslation.text` | |
| 4 | Ngôn ngữ | `CollectionTranslation.language` | Ẩn khỏi bảng lọc — toàn bộ danh sách chỉ hiển thị theo 1 ngôn ngữ đang chọn |

Filter: dropdown `language` (danh mục `Language`) + nút Search (`language_filter=Search`), mặc định ngôn ngữ `en`. Chọn ngôn ngữ khác sẽ load lại danh sách `data_array` lọc theo `CollectionTranslation.language = <ngôn ngữ chọn>`.

## Chức năng/nút thao tác
- **Lọc theo ngôn ngữ:** đổi dropdown + Search để xem danh sách text theo ngôn ngữ tương ứng.
- **Thêm mới:** điều hướng sang CMS-025 (`editCollectionCommonText`, không truyền `id`).
- **Sửa (click dòng/nút Edit):** điều hướng sang CMS-025 (`editCollectionCommonText/:id`).
- **Xoá:** gọi lại chính action này với `$action` + `$id` (route `/cms/collection-common-text/<action>/<id>`) → xoá bản ghi `CollectionTranslation` theo `id`, sau đó redirect về danh sách (không truyền lại tham số) kèm flash thành công/lỗi.

## Điều hướng
- Vào từ: có thể truy cập độc lập trong module CMS (menu Settings/CMS); được tham chiếu như kho dữ liệu nguồn từ tab Footer của CMS-023.
- Điều hướng đến: CMS-025 (form thêm/sửa 1 bản ghi text chung).
