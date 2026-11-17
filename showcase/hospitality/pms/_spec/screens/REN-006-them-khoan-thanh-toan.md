# REN-006 — Thêm khoản thanh toán

**Loại:** Trang đầy đủ
**Route:** renovation/addPayment/:renovation_id + route đẹp dạng dashed: renovation/add-payment/:renovation_id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Form ghi nhận một khoản thanh toán độc lập (không gắn với hóa đơn cụ thể) vào sổ quỹ dự án cải tạo: tạm ứng (advance) hoặc hoàn ứng (reimbursement) giữa các bên liên quan.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại bút toán | `post` | Radio: advance / reimbursement | Có | Lưu thành `post = "Advance"`/`"Reimbursement"` |
| 2 | Hình thức thanh toán | `payment_method` | Select2 (`PaymentMethod`) | Có | |
| 3 | Người trả (Paid by) | `payment_by` | Select2 (danh sách user) | Có | |
| 4 | Người nhận (Paid to) | `payment_to` | Select2 (danh sách user) | Có | |
| 5 | Số tiền | `amount` | Text số | Có | Ghi vào cột `credit` của `RenovationPayment`, `debit = 0` |

## Chức năng/nút thao tác
- **Save**: lưu `RenovationPayment` mới với ngày hiện tại.

## Điều hướng
- Vào từ: nút "+ Payment" tại REN-005 — Sổ quỹ thanh toán dự án cải tạo.
- Đi tới: sau khi lưu thành công, quay về REN-005 — Sổ quỹ thanh toán dự án cải tạo.
