# BU-010-P3 — Form tài khoản ngân hàng (Bank Account Form)

**Loại:** Trang con (mở từ BU-010, tab Tài khoản — thay thế bảng danh sách khi có tham số `page_action=add|edit`)

**Route:** `BusinessUnitController::paymentMethod('accounts', 'add')` hoặc `paymentMethod('accounts', 'edit', $id)` — mặc định `/business-unit/payment-method/accounts/add` hoặc `/business-unit/payment-method/accounts/edit/{id}`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Biểu mẫu đầy đủ để thêm mới hoặc chỉnh sửa một Tài khoản (Account) dùng để nhận/chi tiền, gồm loại tài khoản, thông tin ngân hàng, Đơn vị kinh doanh phục vụ và các phương thức thanh toán được chấp nhận.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tài khoản | `account_name` | Text | Có | Validate trùng tên qua AJAX `checkAccountName` |
| 2 | Loại tài khoản | `account_type` | Radio (`Cash Account` / `Bank Account`) | Có | |
| 3 | Chủ tài khoản | `owner` | Text | Có | |
| 4 | Số tài khoản | `number` | Text | Có | |
| 5 | Quốc gia | `country` | Select (select2) | Có | |
| 6 | Tiền tệ | `currency_id` | Select (select2) | Có | |
| 7 | Đơn vị kinh doanh phục vụ | `business_units[]` | Checkbox (nhiều), có tùy chọn "All" | Không | |
| 8 | Phương thức thanh toán chấp nhận | `payment_means_ids[]` | Select multiple (select2) | Không | Danh sách được lọc động theo Đơn vị kinh doanh đã chọn (AJAX `ajaxGetPaymentMeans`) |
| 9 | Tab (ẩn) | `tab` | Hidden | — | `accounts` |
| 10 | Hành động trang (ẩn) | `page_action` | Hidden | — | `add`/`edit` |
| 11 | ID tài khoản (ẩn) | `account_id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `Account`, đồng bộ danh sách phương thức thanh toán liên kết (`_syncAccountIntoPaymentMethods`).
- **Cancel:** quay lại danh sách tài khoản (BU-010, tab Tài khoản).

## Điều hướng
- Mở từ: BU-010 (tab Tài khoản) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: quay lại BU-010 (tab Tài khoản).
