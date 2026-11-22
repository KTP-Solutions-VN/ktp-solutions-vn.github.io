# REN-009 — Tải ảnh tiến độ (Upload Progress Photo)

**Loại:** Trang đầy đủ
**Route:** renovation/addPhoto/:renovation_id + route đẹp dạng dashed: renovation/add-photo/:renovation_id (id truyền base64)
**Module:** REN = Nâng cấp tài sản

## Mô tả ngắn gọn
Form tải lên một ảnh tiến độ cải tạo villa kèm chú thích, lưu vào thư viện ảnh của dự án (hiển thị lại tại REN-003).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ảnh | `photo` | Upload ảnh (jpg/jpeg/png) | Có | Lưu `RenovationPhoto.image_name` |
| 2 | Chú thích | `legend` | Text | Có | |

## Chức năng/nút thao tác
- **Save**: upload ảnh và lưu bản ghi `RenovationPhoto` gắn với `renovation_id`, `created_by` là user hiện tại.

## Điều hướng
- Vào từ: nút "+ Thêm ảnh" tại REN-003 — Tiến trình dự án.
- Đi tới: sau khi lưu thành công, quay về REN-003 — Tiến trình dự án.
