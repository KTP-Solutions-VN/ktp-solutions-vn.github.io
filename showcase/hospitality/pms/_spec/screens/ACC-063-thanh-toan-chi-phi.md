# ACC-063 — Thanh toán chi phí (Payments)

**Loại:** Trang đầy đủ

**Route:** `AccountController::expensePayment($tab)` — mặc định `/account/expense-payment/<tab>`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Bước thanh toán thực tế cho các Claim Expense (của nhân viên khác, không phải người xem) đã được duyệt (`status=approved`) ở ACC-062 — chọn tài khoản chi tiền, xác nhận thanh toán để tạo bút toán sao kê tương ứng.

## Mô tả chi tiết

2 tab:

| Tab | Mã | Nội dung |
|---|---|---|
| To Pay | `to-pay` (mặc định) | Claim `status=approved, payment_status=pending`, gom nhóm theo Company + `payment_batch_id` |
| Paid | `paid` | Claim `status=approved, payment_status=complete`, đã thanh toán, kèm số tham chiếu sao kê |

Cột dữ liệu chính (theo nhóm claim): Company, Payee, Approved By/Date, Total Claims, Total Claim Amount, Actions. Tab Paid có thêm: Paid By, Payment Date, Account, Payment Proof.

Popup **Make Payment** (mở từ nút thanh toán trên nhóm claim ở tab To Pay):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (danh sách `Account`) | Có (`required`) | Tài khoản dùng để ghi bút toán chi trả |

## Chức năng/nút thao tác
- **Make Payment (tab To Pay):** chọn `account_id`, submit POST về chính action `expensePayment`; server: tự sinh `ref` sao kê mới theo tài khoản đã chọn, quy đổi tiền `claim_amount` từ THB sang currency của Account, tạo bút toán Debit trong `AccountStatement` (category "Staff Expenses"), sau đó cập nhật toàn bộ claim đã chọn (`payment_status=complete`, `paid_by`, `payment_date`, `account_id`, `account_statement_reference`), ghi access log, Flash message, `redirect($this->referer())`.
- **Download PDF / Download Excel:** xuất phiếu chi cho nhóm claim đã chọn (dùng chung `downloadClaimPdf`/`downloadClaimExcel` với ACC-062).
- **Upload Payment Proof (tab Paid):** AJAX `uploadPaymentProof` đính kèm chứng từ thanh toán cho nhóm claim.
- Chuyển tab cập nhật URL `/account/expense-payment/<tab>`.

## Điều hướng
- Vào từ: Sidebar > mục "Payments" trong nhóm Account/Expenses; dữ liệu tiếp nối từ ACC-062 (Petty Cash) sau khi claim được Approve.
- Điều hướng đến: tạo bút toán mới trong ACC-007 (Sao kê tài khoản) của Account được chọn khi thanh toán (không có link trực tiếp, chỉ liên quan qua dữ liệu `AccountStatement`).
