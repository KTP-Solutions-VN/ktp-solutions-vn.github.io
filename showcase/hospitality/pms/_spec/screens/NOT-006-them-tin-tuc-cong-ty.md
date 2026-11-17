# NOT-006 — Thêm tin tức công ty (Add Company News)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::addCompanyNews()` — mặc định `/notice/add-company-news`

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Form đăng một tin tức nội bộ mới, có thể đính kèm file PDF, giới hạn hiển thị theo các đơn vị kinh doanh được chọn.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Lưu dạng JSON vào cột `business_units` |
| 2 | Tiêu đề | `title` | Textarea | Có | |
| 3 | File đính kèm | `news_attachment` | File upload (accept `application/pdf`) | Có (theo class `required` trên input) | Lưu vào thư mục `company-news-attachment` |

## Chức năng/nút thao tác
- **Gửi (Send):** upload file, lưu bản ghi `CompanyNews`, chuyển hướng tới NOT-005.
- **Hủy (Cancel):** quay lại NOT-005.

## Điều hướng
- Mở từ: nút "Add new" trên NOT-005 (Tin tức công ty).
- Sau khi gửi/hủy: chuyển tới NOT-005.
