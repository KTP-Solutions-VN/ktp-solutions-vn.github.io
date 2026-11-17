# CMS-011 — Sửa Logo đối tác

**Loại:** Trang đầy đủ

**Route:** `CmsController::logoEdit($id)` — mặc định `/cms/logo-edit/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form chỉnh sửa một logo đối tác đã có. Yêu cầu `id` hợp lệ (nếu `id` rỗng, action không xử lý form/không set dữ liệu).

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text (có giá trị mặc định từ dữ liệu hiện tại) | Có | |
| 2 | Ảnh | `image` | Upload ảnh | Không | Nếu không chọn ảnh mới, giữ nguyên ảnh cũ |
| 3 | Link | `link` | Text (có giá trị mặc định) | Có | |

## Chức năng/nút thao tác
- **Save:** cập nhật bản ghi `CmsLogo`. Thành công → redirect về CMS-009 (`logos`); thất bại → redirect quay lại chính form này (`logo-edit/:id`).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-009 (nút "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-009 sau khi Save.
