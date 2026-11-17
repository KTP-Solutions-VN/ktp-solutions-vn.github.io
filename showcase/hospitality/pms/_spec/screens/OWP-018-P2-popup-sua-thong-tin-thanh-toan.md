# OWP-018-P2 — Popup Sửa thông tin thanh toán

**Loại:** Popup (mở từ OWP-018)

**Route:** `ExternalUserController::editPaymentDetail($id)` — không có route đẹp riêng, mở từ icon sửa trên OWP-018 (mặc định `/external-user/edit-payment-detail/{id}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Form chỉnh sửa một thông tin/tài khoản thanh toán đã có của Chủ sở hữu.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Phương thức thanh toán | payment_method_id | Select (có giá trị mặc định) | Có | |
| 2 | Tên ngân hàng | bank_name | Text (có giá trị mặc định) | Có | |
| 3 | Mã Swift ngân hàng | bank_swift | Text (có giá trị mặc định) | Có | |
| 4 | Quốc gia | country_id | Select (có giá trị mặc định) | Có | |
| 5 | Tiền tệ | currency_id | Select (có giá trị mặc định) | Có | |
| 6 | Tên tài khoản | account_name | Text (có giá trị mặc định) | Có | |
| 7 | Số tài khoản | account_number | Text (có giá trị mặc định) | Có | |
| 8 | Tài liệu đính kèm | document | File upload (ảnh/PDF) | Không | Hiển thị ảnh/nút "View PDF" hiện có, có thể xoá (nút "Remove") và tải file mới |
| 9 | Ưu tiên thanh toán | payment_type | Checkbox (Primary/Secondary) | Có | Nếu đổi loại, tài khoản cùng loại cũ (nếu có) sẽ tự chuyển sang loại còn lại |

## Chức năng/nút thao tác

- Cập nhật thông tin thanh toán (submit form → validate → lưu → quay về OWP-018)
- Huỷ (quay về OWP-018)

## Điều hướng

- Mở từ OWP-018 (icon sửa trên từng dòng)
- Sau khi lưu hoặc huỷ → quay lại OWP-018
