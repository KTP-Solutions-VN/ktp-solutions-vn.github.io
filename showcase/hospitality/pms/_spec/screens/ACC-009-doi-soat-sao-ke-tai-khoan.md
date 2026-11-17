# ACC-009 — Đối soát sao kê tài khoản (Statement Reconcile)

**Loại:** Trang đầy đủ

**Route:** `AccountController::statementReconcile()` — mặc định `/account/statement-reconcile`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Chọn một tài khoản (chỉ những account đang `is_statement_open = open`), nhập số dư đầu kỳ/ số dư cuối kỳ và ngày đối soát, sau đó chọn các bút toán chưa đối soát để đánh dấu là đã đối soát (`is_reconcile = 1`) sao cho chênh lệch (Difference) bằng 0. Nếu vẫn còn chênh lệch sau khi chọn hết, cho phép thêm bút toán điều chỉnh thủ công (Manual Adjustment).

## Mô tả chi tiết

Bộ lọc (form GET `#account_form`):

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (Account có `is_statement_open = open`) | Đổi giá trị sẽ tự submit form |
| 2 | Start Balance | `start_balance` | Text, readonly | = `amount` của bút toán chưa đối soát cũ nhất (`AccountStatement` đầu tiên `is_reconcile=0, is_deleted=0` theo `id ASC`) — chỉ hiện khi đã chọn Account |
| 3 | Ending Amount | `reconcile_amount` | Input number | Số dư cuối kỳ người dùng nhập để so khớp |
| 4 | Ending Date | `reconcile_date` | Text + datepicker (`dd-mm-yyyy`) | Khi có giá trị, hệ thống lấy toàn bộ bút toán `date <= reconcile_date, is_deleted=0, is_reconcile=0` (bỏ dòng đầu tiên vì đó là start balance) |
| — | Search | nút bấm | Submit lại `#account_form` | |

Danh sách bút toán chờ đối soát (DataTable `#zero_config_2`, không phân trang, không sort):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Ref | `ref` | |
| 3 | In | `amount` khi `payment_type = credit` | Có thể sửa nhanh (inline edit) |
| 4 | Out | `amount` khi `payment_type = debit` | Có thể sửa nhanh (inline edit) |
| 5 | Created At | `created_at` | |
| 6 | Actions | checkbox `is_reconcile[]` (value = statement id, kèm `data-payment_type`, `amount`) + nút Sửa nhanh | |

Khu vực tổng hợp (chỉ hiện khi có `data_array`): **Difference** (tính bằng `start_balance - reconcile_amount`, cộng/trừ tiếp theo các dòng được tick), nút **Finish**, và (ẩn mặc định) nút **Adjustment** khi đã tick hết mà vẫn còn chênh lệch.

Popup Adjustment (modal `#exampleModal`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `adjustment_date` | Text + datepicker, readonly, giới hạn `endDate` = reconcile_date | Có (`required`) | |
| 2 | Amount | `adjustment_amount` | Text, readonly | — | Tự điền = Difference hiện tại |
| 3 | Description | `adjustment_description` | Textarea | Không | |

## Chức năng/nút thao tác
- **Search:** load lại danh sách bút toán theo Account/Ending Date đã chọn (GET, reload trang).
- **Tick checkbox is_reconcile trên từng dòng:** JS tính lại Difference realtime (cộng nếu credit, trừ nếu debit).
- **Sửa nhanh số tiền (icon bút trên dòng):** chuyển ô In/Out thành input, khi bấm Save gọi AJAX `updateStatementAmount` (action `updateStatementAmount()`, POST `statement_id`, `amount`) để cập nhật `amount` của bút toán ngay lập tức.
- **Finish:** chỉ chạy khi Difference = 0; gọi AJAX `reconcileStatement` (action `reconcileStatement()`, POST mảng `statement_id`) đánh dấu `is_reconcile = 1` hàng loạt cho các dòng đã tick + dòng start balance, sau đó reload lại trang theo account đang chọn.
- **Adjustment (chỉ hiện khi đã tick hết mà Difference ≠ 0):** mở popup nhập bút toán điều chỉnh thủ công; submit POST về chính action `statementReconcile`, server tự tính `payment_type` (debit nếu amount ≥ 0, ngược lại credit), đánh dấu `is_manual_adjustment = 1`, sinh `ref` mới, lưu vào `AccountStatement`, ghi access log, rồi quay lại trang trước (`referer()`).

## Điều hướng
- Vào từ: Sidebar > nhóm "Statements" > "Reconcile" (`filterSidebar($user, 'Account-statementReconcile') == 1`).
- Điều hướng đến: không điều hướng sang trang khác — toàn bộ thao tác đối soát và điều chỉnh xử lý AJAX ngay trên trang.
