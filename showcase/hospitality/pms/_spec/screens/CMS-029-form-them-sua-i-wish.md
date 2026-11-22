# CMS-029 — Trình sửa mục mong muốn (Wishlist Item Editor)

**Loại:** Trang đầy đủ

**Route:** `CmsController::iWishEdit($id)` — mặc định `/cms/i-wish-edit/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một mục "I Wish": tiêu đề, hai đoạn nội dung theo từng ngôn ngữ và tối đa 3 ảnh minh hoạ. Không có `$id` → chế độ thêm mới (tiêu đề trang "Add"); có `$id` → chế độ sửa (tiêu đề trang "Edit").

## Mô tả chi tiết

Bảng field trên form:

| # | Field | Field code | Loại input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Có (`required` client-side) | Không đa ngôn ngữ — dùng chung 1 giá trị |
| 2 | Language | `language` | Dropdown (`Language.language_code` → `Language.name`, sort theo tên) | Có | Chọn ngôn ngữ đang nhập cho Text 1/Text 2; đổi dropdown sẽ JS load lại nội dung tương ứng ngôn ngữ đó từ biến `destination`, không reload trang |
| 3 | Text 1 | `text_1` | Textarea | Có | Nội dung đa ngôn ngữ, lưu dạng PHP `serialize()` mảng `[language_code => text]` trong cột `text_1` |
| 4 | Text 2 | `text_2` | Textarea | Có | Tương tự Text 1, lưu vào cột `text_2` |
| 5 | Image | `image_1` (file) | Upload ảnh, preview | Không bắt buộc lại khi sửa (giữ ảnh cũ nếu không chọn file mới) | |
| 6 | Image 2 | `image_2` (file) | Upload ảnh, preview | Không bắt buộc lại khi sửa | |
| 7 | Image 3 | `image_3` (file) | Upload ảnh, preview | Không bắt buộc lại khi sửa | |

Cả 3 ảnh: giới hạn > 5MB bị chặn phía JS; server dùng `_imageUpload($request_data['image_x'], 'CmsLogo', 'villas')` cho từng ảnh (server có `sleep(1)` giữa các lần upload ảnh 1/2/3 — có thể là workaround tránh trùng tên file do timestamp, không ảnh hưởng UI); ghi chú UI: "Photo must be less than 1MB in size and respect the 3:2 ratio".

Khi sửa (`$id` khác null), dữ liệu cũ được load và `unserialize()` cột `text_1`, `text_2` để đổ vào form.

Không đa ngôn ngữ cho `title` — chỉ `text_1`/`text_2` là field đa ngôn ngữ (theo `language`).

## Chức năng/nút thao tác
- **Save:** submit form (POST). Server xử lý:
  - Nếu đang sửa (`$id != null`): merge nội dung `text_1`/`text_2` mới vào đúng key ngôn ngữ đang chọn (giữ nguyên nội dung các ngôn ngữ khác), upload ảnh mới cho ảnh nào có chọn file (giữ ảnh cũ cho ảnh không đổi), gọi `_saveData('GuestCollectionIwish', ...)`. Thành công → Flash success, redirect về CMS-028 (`action => i-wish`). Lỗi → Flash error, redirect về CMS-028 nếu `$id == null` (không xảy ra ở nhánh này) hoặc redirect lại CMS-029 với `$id`.
  - Nếu thêm mới (`$id == null`): tạo `text_1`/`text_2` chỉ với ngôn ngữ đang chọn, lưu mới. Thành công → Flash success, redirect về CMS-028. Lỗi → Flash error, redirect về CMS-029 (không id).
- **Reset:** nút reset form (client-side, không gọi server).
- **Đổi Language dropdown:** JS tự động đổi nội dung Text 1/Text 2 theo ngôn ngữ đã có sẵn trong dữ liệu (không mất dữ liệu ngôn ngữ khác, không submit).

## Điều hướng
- Vào từ: CMS-028 (nút "Add New" hoặc link "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-028 sau khi Save (thành công hoặc lỗi).
- Liên quan: breadcrumb trên trang link ngược về Settings và Shared Content Blocks/Experience Wishlist (CMS-028); dữ liệu mục I Wish tạo/sửa ở đây được dùng làm nguồn cho danh sách toggle On/Off trong tab "Wishlist" của CMS-023 (collection tabs của villa) và action AJAX `addIwish()` — không điều hướng trực tiếp qua lại nhưng dùng chung bảng dữ liệu `GuestCollectionIwish`.
