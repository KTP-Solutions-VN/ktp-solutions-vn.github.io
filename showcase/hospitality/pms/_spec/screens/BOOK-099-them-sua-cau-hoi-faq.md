# BOOK-099 — Thêm bài viết tri thức (New Knowledge Article)

**Loại:** Trang đầy đủ (mở từ BOOK-098)

**Route:** Booking/faq/:id? (mặc định: `/booking/faq` khi thêm mới, `/booking/faq/:id` khi sửa)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Form thêm mới hoặc chỉnh sửa một câu hỏi FAQ cùng nội dung câu trả lời, gồm việc gán câu hỏi cho một hoặc nhiều đơn vị kinh doanh, chọn danh mục và ngôn ngữ.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh áp dụng | business_unit_ids[] | Checkbox nhiều lựa chọn | Không | Nếu để trống áp dụng "All Business Units" |
| 2 | Danh mục FAQ | faq_category_id | Select | Có | Lấy từ BOOK-097 |
| 3 | Ngôn ngữ | language_id | Select | Không | |
| 4 | Câu hỏi | question | Text | Có | |
| 5 | Nội dung trả lời | answer | Rich text/nhiều đoạn (mảng, lưu serialize) | Có | Lưu vào bảng FaqAnswer riêng, liên kết qua `faq_question_id` |

## Chức năng/nút thao tác

- Nút Lưu: nếu thêm mới → tạo bản ghi FaqQuestion + FaqAnswer, redirect về BOOK-098; nếu sửa → cập nhật tại chỗ, ở lại trang.
- Kiểm tra trùng câu hỏi cùng danh mục/ngôn ngữ qua AJAX `checkfaqquestion` (chỉ khi thêm mới).

## Điều hướng

- Mở từ BOOK-098 (nút Thêm mới / Sửa).
- Sau khi lưu (thêm mới) → quay lại BOOK-098.
