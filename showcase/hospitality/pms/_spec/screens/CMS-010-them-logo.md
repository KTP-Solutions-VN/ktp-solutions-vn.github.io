# CMS-010 — Thêm Logo đối tác

**Loại:** Trang đầy đủ

**Route:** `CmsController::logoAdd()` — mặc định `/cms/logo-add`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form thêm mới một logo đối tác gồm tiêu đề, ảnh logo và link liên kết. Không có yếu tố đa ngôn ngữ.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text | Có | |
| 2 | Ảnh | `image` | Upload ảnh | Có | Tỉ lệ khuyến nghị 3:2, < 1MB |
| 3 | Link | `link` | Text | Có | URL liên kết khi click logo trên website |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi mới `CmsLogo`. Thành công → redirect về CMS-009 (`logos`); thất bại → redirect quay lại chính form này (`logo-add`). Lưu ý: nếu người dùng không chọn ảnh, form sẽ không submit được dữ liệu (điều kiện `if (isset($request_data['image'])...)` bao toàn bộ khối lưu).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-009 (nút "Thêm mới").
- Điều hướng đến: quay lại CMS-009 sau khi Save.
