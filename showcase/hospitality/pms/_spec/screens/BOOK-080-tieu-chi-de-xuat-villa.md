# BOOK-080 — Tiêu chí đề xuất villa (Criteria)

**Loại:** Trang đầy đủ
**Route:** Booking/criteria
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các bộ tiêu chí (Criteria) dùng để đánh giá tỷ lệ lấp đầy villa theo từng mốc thời gian (Last Minute/Regular/Early Bird), phục vụ cho tính năng "Kiểm tra đề xuất" (BOOK-084). Mỗi tiêu chí có thể được thêm/sửa/xoá.

## Mô tả chi tiết

### Cột hiển thị
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Criteria (Tên tiêu chí) | Tên bộ tiêu chí, ví dụ "Standard Occupancy" |
| 2 | Actions | Sửa (mở BOOK-082), Xoá |

## Chức năng/nút thao tác
- Nút **Add new** — mở popup BOOK-081 (Thêm tiêu chí)
- Icon **Sửa** trên từng dòng — mở popup BOOK-082 (Sửa tiêu chí), truyền `id` mã hoá base64
- Icon **Xoá** trên từng dòng — mở modal xác nhận, gọi `deleteCriteria/:id` khi xác nhận (xoá bản ghi `Recommendation`)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Recommendations (BOOK-083) > Criteria
- Điều hướng tới: BOOK-081 (Thêm tiêu chí), BOOK-082 (Sửa tiêu chí)

**Ghi chú:** `deleteCriteria($id)` (dòng ~16425) chỉ là hành động xoá kèm redirect, không phải màn hình riêng nên không tách file.
