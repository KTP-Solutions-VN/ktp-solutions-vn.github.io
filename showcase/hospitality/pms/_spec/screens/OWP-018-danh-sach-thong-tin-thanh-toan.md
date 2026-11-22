# OWP-018 — Tài khoản nhận tiền (Payout Accounts)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::paymentDetails()` — không có route đẹp riêng (mặc định `/external-user/payment-details`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách các tài khoản/thông tin thanh toán (ngân hàng, ví...) mà Chủ sở hữu đã khai báo để nhận tiền thanh toán từ đơn vị quản lý, gồm tài khoản chính (Primary) và phụ (Secondary).

## Mô tả chi tiết

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | sr_no | |
| 2 | Phương thức thanh toán | payment_method_id | Tên phương thức (map từ danh mục PaymentMethod) |
| 3 | Tên ngân hàng | bank_name | |
| 4 | Tên tài khoản | account_name | |
| 5 | Số tài khoản | account_number | |
| 6 | Mã Swift ngân hàng | bank_swift | |
| 7 | Quốc gia | country_id | |
| 8 | Tiền tệ | currency_id | |
| 9 | Ưu tiên thanh toán | payment_type | "Primary" (prefered) / "Secondary" (other) |
| 10 | Tài liệu đính kèm | document | Link "View" mở file (ảnh/PDF) trong tab mới, trống nếu không có |
| 11 | Thao tác | — | Sửa, Xoá |

## Chức năng/nút thao tác

- Thêm thông tin thanh toán (nút "+" → mở OWP-018-P1)
- Sửa thông tin thanh toán (icon bút → mở OWP-018-P2)
- Xoá thông tin thanh toán (icon thùng rác → mở popup xác nhận xoá, gọi `deletePaymentDetail($id)`, không có view riêng)

## Điều hướng

- Truy cập từ menu chính (Payouts)
- Nút "+" → OWP-018-P1 (popup thêm tài khoản nhận tiền)
- Icon sửa → OWP-018-P2 (popup sửa tài khoản nhận tiền)
- Icon xoá → popup xác nhận, sau khi xoá quay lại OWP-018
