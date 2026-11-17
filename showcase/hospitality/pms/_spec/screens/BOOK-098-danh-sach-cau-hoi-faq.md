# BOOK-098 — Danh sách câu hỏi FAQ (Wiki)

**Loại:** Trang đầy đủ

**Route:** Booking/faqQuestion (mặc định: `/booking/faq-question`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Danh sách câu hỏi thường gặp (FAQ) dùng làm cơ sở tri thức nội bộ, lọc theo ngôn ngữ và đơn vị kinh doanh, phân quyền hiển thị theo BU được gán cho câu hỏi (business_unit_ids) và BU mà người dùng được phép xem.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | language | Select | Có | Mặc định id = 1 (English); lưu cookie `language_id` |
| 2 | Đơn vị kinh doanh | business_unit | Select ("All" + danh sách BU) | Có | Lưu cookie `business_unit_id` |

**Danh sách (bảng), sắp xếp theo Danh mục rồi Câu hỏi:**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Danh mục FAQ | faq_category.name | |
| 3 | Ngôn ngữ | language_id | |
| 4 | Câu hỏi | question | |
| 5 | Ngày tạo | created_at | |
| 6 | Thao tác | — | Xem / Sửa / Xóa |

## Chức năng/nút thao tác

- Nút "Add New" → BOOK-099 (faq, thêm mới).
- Xem chi tiết câu hỏi → BOOK-100 (viewFaq).
- Sửa câu hỏi → BOOK-099 (faq, chế độ sửa).
- Xóa câu hỏi (và toàn bộ câu trả lời liên quan trong bảng FaqAnswer) → xác nhận rồi submit `action = delete`.
- Nút "Search" áp dụng bộ lọc ngôn ngữ/BU.

## Điều hướng

- Vào từ menu FAQ/Wiki.
- → BOOK-099 khi Thêm mới/Sửa.
- → BOOK-100 khi Xem chi tiết.
- Danh mục hiển thị lấy từ BOOK-097 (Danh mục FAQ).
