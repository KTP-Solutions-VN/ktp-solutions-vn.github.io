# BOOK-097 — Danh mục FAQ (Wiki)

**Loại:** Trang đầy đủ

**Route:** Booking/faqCategory (mặc định: `/booking/faq-category`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Quản lý danh mục (category) của bộ câu hỏi thường gặp (FAQ/Wiki nội bộ), dùng để phân loại câu hỏi tại BOOK-098. Thao tác thêm/sửa/xóa qua popup modal.

## Mô tả chi tiết

**Danh sách (bảng):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên danh mục | name | |
| 3 | Ngày tạo | created_at | Format d M Y H:i |
| 4 | Thao tác | — | Sửa / Xóa |

**Form thêm/sửa (popup modal):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên danh mục | name | Text | Có | Kiểm tra trùng tên qua AJAX `checkfaqcategory`; tự sinh `slug` từ tên (thay khoảng trắng bằng "-") |

## Chức năng/nút thao tác

- Nút "Add New" mở popup thêm danh mục.
- Nút Sửa (✏️) mở popup sửa, nút Xóa (🗑) xác nhận xóa danh mục — cả hai đều submit về cùng action `faqCategory` với field `action` = add/edit/delete.
- Ghi log hoạt động (access log) cho mỗi thao tác thêm/sửa/xóa.

## Điều hướng

- Vào từ menu FAQ/Wiki.
- Danh mục được dùng làm bộ lọc/chọn tại BOOK-098 (Danh sách câu hỏi FAQ) và BOOK-099 (Thêm/sửa câu hỏi FAQ).
