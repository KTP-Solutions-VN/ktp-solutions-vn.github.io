# CMS-025 — Thêm/Sửa text chung Collection Website

**Loại:** Trang đầy đủ

**Route:** `CmsController::editCollectionCommonText($id)` — mặc định `/cms/edit-collection-common-text/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa 1 bản ghi text chung (`CollectionTranslation`) dùng chung cho action Add (không truyền `id`, tiêu đề "Add") và Edit (có `id`, tiêu đề "Edit"). Mỗi bản ghi gắn với 1 `type` cố định và 1 ngôn ngữ cụ thể — **có đa ngôn ngữ nhưng theo kiểu mỗi bản ghi = 1 ngôn ngữ** (khác với các tab khác của CMS-023 lưu dạng serialize nhiều ngôn ngữ trong 1 field); muốn có bản dịch cho ngôn ngữ khác phải tạo thêm 1 bản ghi mới cùng `type`, `title` nhưng khác `language`.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có (theo validate client-side thông thường) | Mặc định `en` khi thêm mới; khi Edit lấy theo ngôn ngữ của bản ghi đang sửa |
| 2 | Loại (Type) | `type` | Dropdown, danh sách cố định trong code | Có | 5 giá trị: `book_with_confidence` → "Book With Confidence", `terms_&_condition` → "Terms & Condition", `guarantee` → "Guarantee", `why_work_with_us` → "Why Work with Us", `personal_data_policy` → "Personal Data Policy" |
| 3 | Tiêu đề | `title` | Text | Có | Lưu xuống DB: khoảng trắng được thay bằng `_` (`str_replace(' ', '_', $title)`) — dùng làm khoá hiển thị (value) ở các dropdown chọn text tại tab Footer của CMS-023 |
| 4 | Nội dung | `text` | Textarea | Có | Nội dung đoạn text |

Khi Edit: nạp dữ liệu từ `CollectionTranslation.find(['id' => $id])`.

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `CollectionTranslation` (thêm mới nếu không có `id`, cập nhật nếu có `id`). Lưu xong quay về CMS-024 (danh sách) kèm flash thành công/lỗi.
- **Cancel/Reset (nếu có):** quay lại hoặc reset form — theo pattern chung của các form trong module (client-side).

## Điều hướng
- Vào từ: CMS-024 (nút "Thêm mới" hoặc "Edit" trên từng dòng danh sách).
- Điều hướng đến: quay lại CMS-024 sau khi Save thành công/thất bại. Dữ liệu tạo/sửa ở đây là nguồn cho các dropdown chọn text tại tab Footer của CMS-023.
