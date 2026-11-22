# BOOK-061 — Bản dịch mẫu thư (Layout Translations)

**Loại:** Trang đầy đủ (mở từ BOOK-057)
**Route:** Booking/transalateConfirmationTemplate
**Route đẹp:** `/booking/confirmation-template/transalations`
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Quản lý bản dịch các đoạn text cố định (label) hiển thị trên PDF xác nhận đặt phòng theo từng ngôn ngữ (trừ tiếng Anh mặc định).

## Mô tả chi tiết

### Bảng dịch
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Text gốc (tiếng Anh) | `text`/`label` |
| 2 | Cột động theo ngôn ngữ | Mỗi ngôn ngữ 1 cột, có thể sửa inline |
| 3 | Edit/Delete | Sửa hoặc xoá bản dịch của dòng |
| 4 | Add New | Thêm text mới cần dịch |

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language_code` | Select | Có | Chọn ngôn ngữ cần nhập bản dịch |

## Chức năng/nút thao tác
- Sửa nội dung dịch từng dòng (inline edit)
- Xoá bản dịch của một ngôn ngữ (`deleteTranslation`)
- Thêm mới text cần dịch (`add_new`)
- Lưu tất cả bản dịch

## Điều hướng
- Mở từ: BOOK-057 > nút "Translation"
- Điều hướng tới: quay lại BOOK-057
