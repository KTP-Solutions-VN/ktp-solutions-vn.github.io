# BOOK-057 — Danh sách mẫu xác nhận đặt phòng (Confirmation Template)

**Loại:** Trang đầy đủ
**Route:** Booking/confirmationTemplate (mặc định: `/booking/confirmation-template`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các mẫu (template) PDF xác nhận đặt phòng gửi cho chủ villa, cấu hình theo ngôn ngữ và áp dụng cho các đơn vị kinh doanh cụ thể. Mỗi ngôn ngữ chỉ có 1 mẫu.

## Mô tả chi tiết

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Sr No | |
| 2 | Template | Tên mẫu |
| 3 | Business Unit | Các BU áp dụng |
| 4 | Created By | |
| 5 | On | Ngày tạo |
| 6 | Actions | Xem/Sửa/Xoá |

## Chức năng/nút thao tác
- Nút **Translation** — mở BOOK-061 (Bản dịch mẫu)
- Nút **Add New** — mở BOOK-058
- Xem chi tiết mẫu — mở BOOK-060
- Sửa mẫu — mở BOOK-059
- Xoá mẫu (`deleteComfirmationTemplate`)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Confirmation Template
- Điều hướng tới: BOOK-058 (Thêm), BOOK-059 (Sửa), BOOK-060 (Xem), BOOK-061 (Dịch)
