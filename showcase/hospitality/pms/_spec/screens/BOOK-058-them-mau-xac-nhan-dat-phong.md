# BOOK-058 — Thêm mẫu xác nhận đặt phòng

**Loại:** Popup/Trang (mở từ BOOK-057)
**Route:** Booking/addConfirmationTemplate
**Route đẹp:** `/booking/confirmation-template/add`
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form tạo mới mẫu PDF xác nhận đặt phòng: thông tin công ty/thương hiệu (logo, địa chỉ, liên hệ), ngôn ngữ áp dụng và các đơn vị kinh doanh sử dụng mẫu.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language_id` | Select2 | Có | Mỗi ngôn ngữ chỉ có 1 mẫu (nếu đã tồn tại sẽ ghi đè) |
| 2 | Tên mẫu | `template_name` | Text | Có | |
| 3 | Logo | `logo`/`cropped_image` | File upload (có crop ảnh) | Có | Tối đa 1MB, tỉ lệ 1:1 |
| 4 | Tên công ty | `company_name` | Text | Có | |
| 5 | Địa chỉ 1 | `address_1` | Text | Có | |
| 6 | Địa chỉ 2 | `address_2` | Text | Không | |
| 7 | Địa chỉ 3 | `address_3` | Text | Không | |
| 8 | Điện thoại | `phone` | Số | Có | |
| 9 | Email | `email` | Email | Có | |
| 10 | Website | `website` | Text | Có | |
| 11 | Mã số thuế | `tax_id` | Text | Có | |
| 12 | Tên viết tắt công ty | `company_short_name` | Text | Có | |
| 13 | Tên người ký | `signatory_name` | Text | Có | |
| 14 | Đơn vị tiền tệ | `currency_id` | Select2 | Có | |
| 15 | Email trả lời (Reply-to) | `reply_email` | Email | Có | |
| 16 | Đơn vị kinh doanh áp dụng | `business_unit` | Checkbox nhiều lựa chọn | Có | |

## Chức năng/nút thao tác
- Nút **Save** — lưu mẫu, quay lại BOOK-057

## Điều hướng
- Mở từ: BOOK-057 > nút "Add New"
- Điều hướng tới: BOOK-057 sau khi lưu
