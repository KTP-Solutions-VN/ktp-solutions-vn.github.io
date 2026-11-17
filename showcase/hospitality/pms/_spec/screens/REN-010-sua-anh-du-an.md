# REN-010 — Sửa ảnh dự án

**Loại:** Trang đầy đủ
**Route:** renovation/editPhoto/:id + route đẹp dạng dashed: renovation/edit-photo/:id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Form chỉnh sửa một ảnh tiến độ đã có trong thư viện ảnh dự án: có thể thay ảnh khác hoặc chỉ cập nhật lại chú thích.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ảnh | `photo` | Upload ảnh (jpg/jpeg/png) | Không | Nếu không chọn ảnh mới, giữ nguyên `image_name` cũ |
| 2 | Chú thích | `legend` | Text | Có | Nạp sẵn giá trị hiện tại |

## Chức năng/nút thao tác
- **Update**: lưu lại `RenovationPhoto` (ảnh mới nếu có, hoặc giữ ảnh cũ) và chú thích.

## Điều hướng
- Vào từ: icon "Sửa" tại thư viện ảnh trong REN-003 — Theo dõi dự án cải tạo.
- Đi tới: sau khi lưu thành công, quay về REN-003 — Theo dõi dự án cải tạo.
