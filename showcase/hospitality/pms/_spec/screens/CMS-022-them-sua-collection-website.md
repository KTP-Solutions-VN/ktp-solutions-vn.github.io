# CMS-022 — Thêm/Sửa Collection Website

**Loại:** Trang đầy đủ

**Route:** `CmsController::collectionWebsiteEdit($id)` — mặc định `/cms/collection-website-edit/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một Collection Website (`GuestCollectionWebsite`), gồm tên hiển thị và URL công khai của trang bộ sưu tập villa.

## Mô tả chi tiết

Trường dữ liệu (form):

| # | Tên trường | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | Title | `title` | Text | Bắt buộc (class `required`). Tên hiển thị của collection website. |
| 2 | Url | `url` | Text (type url) | Bắt buộc (class `required`). Giá trị mặc định gợi ý `https://azurastays.example/themes/`; có ghi chú hướng dẫn: thêm tên (title) của collection website vào sau dấu `/` cuối cùng, ví dụ `https://azurastays.example/themes/Testing`. |

Khi có `id` (chế độ Sửa): tải bản ghi `GuestCollectionWebsite` theo `id`, đổ sẵn giá trị `title`/`url` hiện tại vào form.

Khi không có `id` (chế độ Thêm mới): form trống, `url` hiển thị mặc định gợi ý nêu trên.

## Chức năng/nút thao tác
- **Save:**
  - Chế độ Thêm mới: tạo mới bản ghi `GuestCollectionWebsite` với `title`, `url`.
  - Chế độ Sửa: cập nhật bản ghi `GuestCollectionWebsite` theo `id` với `title`, `url` mới.
  - Lưu thành công → thông báo thành công, redirect về CMS-021 (danh sách, action `collection-websites`).
  - Lưu lỗi → thông báo lỗi, redirect quay lại chính CMS-022 (`collection-website-edit/:id`).
- **Reset:** đưa form về trạng thái mặc định (HTML reset, không gọi server).

## Điều hướng
- Vào từ: CMS-021 (danh sách Collection Website) — nút "Add Collection" (thêm mới, không kèm `id`) hoặc link "Edit" trên từng dòng (kèm `id`).
- Điều hướng đến: sau khi Save (thành công hoặc lỗi) đều quay lại CMS-021 (danh sách Collection Website).
