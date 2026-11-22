# ACC-007-P2 — Sửa bút toán (Edit Ledger Entry)

**Loại:** Popup (mở từ ACC-007)

**Route:** `AccountController::editStatement($id)` — mặc định `/account/edit-statement/<id>` (`id` truyền dạng base64)

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form sửa một bút toán sao kê đã tồn tại. Nếu bút toán đã được đối soát (`is_reconcile = 1`) thì toàn bộ field bị khóa (chỉ xem, không sửa được).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text + datepicker (`dd-mm-yyyy`) | Có (`required`) | Readonly nếu `is_reconcile = 1` |
| 2 | Ref | `ref` | Text, luôn readonly | — | |
| 3 | Business Unit | `business_unit_id` | Select2 | Có (`required`) | `disabled` nếu `is_reconcile = 1` |
| 4 | Category | `category_id` | Select2 (`AccountCategory`) | Có (`required`) | `disabled` nếu `is_reconcile = 1` |
| 5 | Description | `description` | Textarea | Không | |
| 6 | Property | `villa_id` | Select2 (Villa theo BU) | Không | `disabled` nếu `is_reconcile = 1` |
| 7 | Payment Type | `payment_type` | Select2: Credit / Debit | Có (`required`) | `disabled` nếu `is_reconcile = 1` |
| 8 | Amount | `amount` | Input number | Có (`required`) | Readonly nếu `is_reconcile = 1` |

Dữ liệu nạp sẵn từ `AccountStatement` theo `id`; danh sách Business Unit lấy theo `account.business_unit_ids`, Property lọc theo BU hiện tại của bút toán (hoặc BU đầu tiên nếu chưa gán).

## Chức năng/nút thao tác
- **Update:** submit POST tới chính action `editStatement`; server format lại `date`, gọi `_saveData('AccountStatement', ...)`, ghi access log, rồi redirect về ACC-007 (`statements`) của account tương ứng.
- **Cancel:** quay lại ACC-007 (`statements`) của account.
- Khi đổi Business Unit: AJAX `/VM/common/getBusinessUnitVilla` để nạp lại danh sách Property.
- Nếu `id` không hợp lệ: báo lỗi "Invalid URL" và quay lại trang trước.

## Điều hướng
- Vào từ: ACC-007 (Sổ cái tài khoản) — nút Sửa trên từng dòng (chỉ hiện khi bút toán không phải `is_opening_statement`).
- Điều hướng đến: quay lại ACC-007 sau khi lưu hoặc hủy.
