# ACC-056-P2 — Sửa khoản tính lại (Edit Owner Recharge)

**Loại:** Popup (mở từ ACC-056)

**Route:** `AccountController::editRebill($id)` — mặc định `/account/edit-rebill/<id>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form sửa bản ghi Rebill đã có — cùng cấu trúc field với ACC-056-P1, dữ liệu được nạp sẵn từ bản ghi `VillaExpense` (giải mã JSON cột `data` thành các dòng chi phí).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + BU theo quyền user) | Không | |
| 2 | Property | `villa_id` | Select2 (Property theo BU) | Không | Có sẵn giá trị của bản ghi |
| 3 | Rebill Month | `rebill_month` | Text + datepicker chọn tháng | Có (`required`) | Có sẵn giá trị |
| 4 | Expense Month | `expense_month` | Text + datepicker chọn tháng | Có (`required`) | Có sẵn giá trị |
| 5 | Expense Name (dòng 1..n) | `expense_data[n][expense_type_id]` | Select2 (`ExpenseType`) | Có (`required`) | Nạp sẵn từng dòng đã lưu |
| 6 | Amount (dòng 1..n) | `expense_data[n][amount]` | Input number | Có (`required`) | |
| 7 | Description (dòng 1..n) | `expense_data[n][description]` | Textarea | Có (`required`) | |

## Chức năng/nút thao tác
- **Add More / Xoá dòng chi phí:** tương tự ACC-056-P1.
- **Save:** submit POST tới chính action `editRebill`; server cập nhật lại bản ghi `VillaExpense` theo `id`, lưu `data` = JSON của `expense_data`, rồi redirect về ACC-056 (`rebill`).
- **Cancel:** quay lại ACC-056 (`rebill`).
- Nếu `id` không hợp lệ: báo lỗi "Invalid URL" và quay lại ACC-056.

## Điều hướng
- Vào từ: ACC-056 (Khoản tính lại cho chủ nhà) — nút Sửa trên từng dòng.
- Điều hướng đến: quay lại ACC-056 sau khi lưu hoặc hủy.
