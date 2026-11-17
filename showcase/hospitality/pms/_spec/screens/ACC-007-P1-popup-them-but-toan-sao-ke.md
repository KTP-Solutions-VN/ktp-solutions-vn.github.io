# ACC-007-P1 — Popup thêm bút toán sao kê

**Loại:** Popup (mở từ ACC-007)

**Route:** `AccountController::addStatement($account_id)` — mặc định `/account/add-statement/<account_id>`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Form thêm mới một bút toán (statement entry) vào sao kê của tài khoản đang mở, tự sinh số Ref tăng dần theo tên account.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text + datepicker (`dd-mm-yyyy`) | Có (`required`) | Lưu chuyển đổi sang `Y-m-d` khi submit |
| 2 | Ref | `ref` | Text, readonly | — | Tự sinh: `<account.name>-00001`, tăng dần dựa trên bút toán mới nhất của account (tách số cuối chuỗi `ref`, +1, pad 5 số) |
| 3 | Business Unit | `business_unit_id` | Select2 (danh sách BU thuộc `account.business_unit_ids`) | Có (`required`) | Khi đổi sẽ AJAX `/VM/common/getBusinessUnitVilla` để nạp lại danh sách Property tương ứng |
| 4 | Category | `category_id` | Select2 (danh sách `AccountCategory`) | Có (`required`) | |
| 5 | Description | `description` | Textarea | Không | |
| 6 | Property | `villa_id` | Select2 (danh sách Villa theo BU đã chọn, status = Open) | Không | Có option "(Select Property)" |
| 7 | Payment Type | `payment_type` | Select2: Credit / Debit | Có (`required`) | |
| 8 | Amount | `amount` | Input number | Có (`required`) | |

## Chức năng/nút thao tác
- **Save:** submit form POST tới chính action `addStatement`; server gán thêm `account_id`, format lại `date`, lưu vào bảng `AccountStatement`, ghi access log, rồi redirect về ACC-007 (`statements`) của account đó.
- **Cancel:** quay lại ACC-007 (`statements`) của account.
- Nếu `account_id` không hợp lệ: báo lỗi "Invalid URL" và quay lại trang trước.

## Điều hướng
- Vào từ: ACC-007 (Sao kê tài khoản) — nút "Add new".
- Điều hướng đến: quay lại ACC-007 sau khi lưu hoặc hủy.
