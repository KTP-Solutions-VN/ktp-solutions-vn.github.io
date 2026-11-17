# ACC-056-P1 — Popup thêm Rebill

**Loại:** Popup (mở từ ACC-056)

**Route:** `AccountController::addRebill()` — mặc định `/account/add-rebill`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Form thêm mới một bản ghi Rebill cho một Property theo tháng Rebill/tháng chi phí, cho phép nhập nhiều dòng chi phí (loại chi phí, số tiền, mô tả).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + BU theo quyền user) | Không | Đổi giá trị sẽ AJAX `/VM/common/getBusinessUnitVilla` để nạp lại danh sách Property |
| 2 | Property | `villa_id` | Select2 (Property theo BU đã chọn) | Không | |
| 3 | Rebill Month | `rebill_month` | Text + datepicker chọn tháng (`MM`), giới hạn trong năm hiện tại | Có (`required`) | |
| 4 | Expense Month | `expense_month` | Text + datepicker chọn tháng (`MM`), giới hạn trong năm hiện tại | Có (`required`) | |
| 5 | Expense Name (dòng 1..n) | `expense_data[n][expense_type_id]` | Select2 (danh sách `ExpenseType`) | Có (`required`) | Có thể thêm nhiều dòng |
| 6 | Amount (dòng 1..n) | `expense_data[n][amount]` | Input number | Có (`required`) | |
| 7 | Description (dòng 1..n) | `expense_data[n][description]` | Textarea | Có (`required`) | |

## Chức năng/nút thao tác
- **Add More (icon +):** thêm động một dòng chi phí mới (Expense Name/Amount/Description) vào form.
- **Xoá dòng chi phí (icon -, trên các dòng thêm sau dòng đầu):** gỡ dòng khỏi form.
- **Save:** submit POST tới chính action `addRebill`; server tìm bản ghi `VillaExpense` (`expense_type=rebill`) đã tồn tại theo `villa_id` + `rebill_month` + năm hiện tại để cập nhật, nếu chưa có thì tạo mới, lưu `data` = JSON của toàn bộ `expense_data`, rồi redirect về ACC-056 (`rebill`).
- **Cancel:** quay lại ACC-056 (`rebill`).

## Điều hướng
- Vào từ: ACC-056 (Rebill) — nút "Add new".
- Điều hướng đến: quay lại ACC-056 sau khi lưu hoặc hủy.
