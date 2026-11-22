# BOOK-100 — Chi tiết bài viết tri thức (Knowledge Article)

**Loại:** Trang đầy đủ / xem (mở từ BOOK-098)

**Route:** Booking/viewFaq/:id

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Xem chi tiết (chỉ đọc, các trường bị khóa `disabled`) một câu hỏi FAQ cùng câu trả lời và danh sách đơn vị kinh doanh được áp dụng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh áp dụng | business_unit_ids | Hiển thị dạng tag, nối bằng "\|" | — | |
| 2 | Danh mục FAQ | faq_category_id | Select (disabled) | — | |
| 3 | Ngôn ngữ | language_id | Select (disabled) | — | |
| 4 | Câu hỏi | question | Text (disabled) | — | |
| 5 | Nội dung trả lời | answer | Hiển thị (disabled) | — | |

## Chức năng/nút thao tác

- Chỉ xem; không có nút lưu/sửa trên màn hình này (sửa thực hiện qua BOOK-099).

## Điều hướng

- Mở từ BOOK-098 (nút Xem trên từng dòng).
- Không có điều hướng tiếp theo; dùng nút back để quay lại BOOK-098.
