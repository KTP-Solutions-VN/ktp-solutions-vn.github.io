# REN-005 — Sổ quỹ thanh toán dự án cải tạo

**Loại:** Trang đầy đủ
**Route:** renovation/paymentList/:renovation_id + route đẹp dạng dashed: renovation/payment-list/:renovation_id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Sổ quỹ (ledger) ghi nhận toàn bộ giao dịch thu/chi (`RenovationPayment`) liên quan tới dự án cải tạo: mỗi hóa đơn phát sinh, mỗi khoản tạm ứng/hoàn ứng đều được ghi thành một hoặc nhiều dòng thu/chi ở đây.

## Mô tả chi tiết

### Cột hiển thị
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Post | `post` | Diễn giải bút toán (tên phiếu chi, "Company", "Advance", "Reimbursement") |
| 3 | Paid by | `paid_by` | |
| 4 | Paid to | `paid_to` | |
| 5 | Payment method | `payment_method` | |
| 6 | In (Credit) | `credit` | |
| 7 | Out (Debit) | `debit` | |
| 8 | Balance | Tính lũy kế | Chạy dồn qua các dòng |

## Chức năng/nút thao tác
- **+ Payment**: mở REN-006 — Thêm khoản thanh toán (`addPayment`).

## Điều hướng
- Vào từ: icon "Wallet" tại REN-003 — Theo dõi dự án cải tạo.
- Đi tới: REN-006 — Thêm khoản thanh toán.
