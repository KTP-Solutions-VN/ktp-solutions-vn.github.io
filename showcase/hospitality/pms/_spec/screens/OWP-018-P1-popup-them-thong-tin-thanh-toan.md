# OWP-018-P1 — Thêm tài khoản nhận tiền (New Payout Account)

**Loại:** Popup (mở từ OWP-018)

**Route:** `ExternalUserController::addPaymentDetail()` — không có route đẹp riêng, mở từ nút "+" trên OWP-018 (mặc định `/external-user/add-payment-detail`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Form thêm mới một thông tin/tài khoản thanh toán cho Chủ sở hữu.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Phương thức thanh toán | payment_method_id | Select | Có | Nếu chọn phương thức là ngân hàng (id=1) thì hiện thêm field "Tên ngân hàng" |
| 2 | Tên ngân hàng | bank_name | Text | Có (điều kiện) | Chỉ hiện khi payment_method_id = 1 |
| 3 | Mã Swift ngân hàng | bank_swift | Text | Có | |
| 4 | Quốc gia | country_id | Select | Có | |
| 5 | Tiền tệ | currency_id | Select | Có | |
| 6 | Tên tài khoản | account_name | Text | Có | |
| 7 | Số tài khoản | account_number | Text | Có | |
| 8 | Tài liệu đính kèm | document | File upload (ảnh/PDF) | Không | Giới hạn dung lượng ~5MB, xem trước ảnh hoặc nút "View PDF" |
| 9 | Ưu tiên thanh toán | payment_type | Checkbox (Primary/Secondary) | Có | Chọn "prefered" (chính) hoặc "other" (phụ); nếu đã có tài khoản cùng loại, hệ thống sẽ ghi đè (update) tài khoản đó |

## Chức năng/nút thao tác

- Lưu thông tin thanh toán (submit form → validate → lưu → quay về OWP-018)
- Huỷ (nút "Cancel" → quay về OWP-018)

## Điều hướng

- Mở từ OWP-018 (nút "+")
- Sau khi lưu hoặc huỷ → quay lại OWP-018
