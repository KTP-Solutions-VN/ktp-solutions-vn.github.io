# CMS-027 — Trình sửa bài nhật ký (Journal Article Editor)

**Loại:** Trang đầy đủ

**Route:** `CmsController::insightsEdit($id)` — mặc định `/cms/insights-edit/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một bài viết "Insight": tiêu đề, nội dung theo từng ngôn ngữ, ảnh minh hoạ và danh sách điểm đến (Global Destinations) liên kết. Không có `$id` → chế độ thêm mới (tiêu đề trang "Add"); có `$id` → chế độ sửa (tiêu đề trang "Edit").

## Mô tả chi tiết

Bảng field trên form:

| # | Field | Field code | Loại input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Có (`required` client-side) | Không đa ngôn ngữ — dùng chung 1 giá trị |
| 2 | Language | `language` | Dropdown (`Language.language_code` → `Language.name`, sort theo tên) | Có | Chọn ngôn ngữ đang nhập cho field Text; đổi dropdown sẽ JS load lại nội dung Text tương ứng ngôn ngữ đó từ biến `destination` (dữ liệu đã load sẵn), không reload trang |
| 3 | Text | `text` | Textarea | Có | Nội dung đa ngôn ngữ, lưu dạng PHP `serialize()` mảng `[language_code => text]` trong cột `text` |
| 4 | Global Destinations | `guest_collection_destination_ids[]` | Checkbox list (nguồn: `GuestCollectionDestination.title`) | Có (tối thiểu 1, tối đa 3 — validate JS `required` + `maxlength: 3`) | Lưu dạng `serialize()` mảng ID đã chọn |
| 5 | Image | `image` (file) | Upload ảnh, hiển thị preview | Không bắt buộc lại khi sửa (giữ ảnh cũ nếu không chọn file mới) | Ảnh > 5MB bị chặn phía JS (đọc size qua `FileReader`); server dùng `_imageUpload($request_data['image'], 'CmsLogo', 'villas')`; ghi chú UI: "Photo must be less than 1MB in size and respect the 3:2 ratio" |

Khi sửa (`$id` khác null), dữ liệu cũ được load và `unserialize()` cột `text` và `guest_collection_destination_ids` để đổ vào form.

Không đa ngôn ngữ cho `title` — chỉ `text` là field đa ngôn ngữ (theo `language`).

## Chức năng/nút thao tác
- **Save:** submit form (POST). Server xử lý:
  - Nếu đang sửa (`$id != null`): merge nội dung `text` mới vào đúng key ngôn ngữ đang chọn (giữ nguyên nội dung các ngôn ngữ khác), upload ảnh mới nếu có chọn file, gọi `_saveData('GuestCollectionInsight', ...)`. Thành công → Flash success, redirect về CMS-026 (`action => insights`). Lỗi → Flash error, redirect lại CMS-027 với `$id`.
  - Nếu thêm mới (`$id == null`): tạo `text` chỉ với ngôn ngữ đang chọn, lưu mới. Thành công → Flash success, redirect về CMS-026. Lỗi → Flash error, redirect lại CMS-027 (không id).
- **Reset:** nút reset form (client-side, không gọi server).
- **Đổi Language dropdown:** JS tự động đổi nội dung ô Text theo ngôn ngữ đã có sẵn trong dữ liệu (không mất dữ liệu ngôn ngữ khác, không submit).

## Điều hướng
- Vào từ: CMS-026 (nút "Add New" hoặc link "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-026 sau khi Save (thành công hoặc lỗi).
- Liên quan: breadcrumb trên trang link ngược về Settings và Shared Content Blocks/Travel Journal (CMS-026); dữ liệu bài Insight tạo/sửa ở đây được dùng làm nguồn lựa chọn cho tab "Journal" trong CMS-023 (collection tabs của villa) và action AJAX `updateInsightAjax()` — không điều hướng trực tiếp qua lại nhưng dùng chung bảng dữ liệu `GuestCollectionInsight`.
