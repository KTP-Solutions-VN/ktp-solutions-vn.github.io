# BOOK-060 — Xem trước mẫu thư xác nhận (Confirmation Layout Preview)

**Loại:** Popup/Trang (mở từ BOOK-057)
**Route:** Booking/viewConfirmationTemplate/:id (id được base64_encode)
**Route đẹp:** `/booking/confirmation-template/view/:id`
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Xem chi tiết (chỉ đọc) thông tin một mẫu xác nhận đặt phòng: ngôn ngữ, tên mẫu, logo, thông tin công ty, đơn vị tiền tệ, các đơn vị kinh doanh áp dụng.

## Mô tả chi tiết

| # | Tên field | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngôn ngữ | `language_id` | Chỉ đọc |
| 2 | Tên mẫu | `template_name` | Chỉ đọc |
| 3 | Logo | `logo` | Ảnh |
| 4 | Tên công ty | `company_name` | |
| 5 | Địa chỉ 1/2/3 | `address_1/2/3` | |
| 6 | Điện thoại | `phone` | |
| 7 | Email | `email` | |
| 8 | Website | `website` | |
| 9 | Mã số thuế | `tax_id` | |
| 10 | Tên viết tắt công ty | `company_short_name` | |
| 11 | Tên người ký | `signatory_name` | |
| 12 | Đơn vị tiền tệ | `currency_id` | |
| 13 | Email trả lời | `reply_email` | |
| 14 | Đơn vị kinh doanh | `business_unit` | Danh sách BU áp dụng |

## Chức năng/nút thao tác
- Không có (chỉ xem)

## Điều hướng
- Mở từ: BOOK-057 > icon Xem
- Điều hướng tới: quay lại BOOK-057
