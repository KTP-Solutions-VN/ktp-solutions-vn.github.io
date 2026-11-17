# BOOK-059 — Sửa mẫu xác nhận đặt phòng

**Loại:** Popup/Trang (mở từ BOOK-057)
**Route:** Booking/editConfirmationTemplate/:id (id được base64_encode)
**Route đẹp:** `/booking/confirmation-template/edit/:id`
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form chỉnh sửa mẫu xác nhận đặt phòng đã tạo. Các field giống hệt màn thêm mới (BOOK-058), có giá trị mặc định lấy từ dữ liệu hiện có.

## Mô tả chi tiết
Xem bảng field tại BOOK-058 (các field: language_id, template_name, logo/cropped_image, company_name, address_1/2/3, phone, email, website, tax_id, company_short_name, signatory_name, currency_id, reply_email, business_unit).

## Chức năng/nút thao tác
- Nút **Save/Update** — cập nhật mẫu, ghi log hoạt động, quay lại BOOK-057

## Điều hướng
- Mở từ: BOOK-057 > icon Sửa
- Điều hướng tới: BOOK-057 sau khi lưu
