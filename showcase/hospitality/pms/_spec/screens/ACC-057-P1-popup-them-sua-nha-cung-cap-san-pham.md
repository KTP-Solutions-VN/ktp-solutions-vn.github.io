# ACC-057-P1 — Form đơn vị cung ứng hàng hóa (Goods Vendor Form)

**Loại:** Popup (mở từ ACC-057)

**Route:** `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — mặc định `/account/add-supplier/<tab>/<id>/<show_page>/<payment_detail_id>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form nhiều tab dùng chung cho cả thêm mới và sửa nhà cung cấp loại "Sản phẩm": thông tin nhà cung cấp, danh sách sản phẩm đã phân bổ (Product Allocation) và chi tiết tài khoản ngân hàng — chỉ hiện đủ 3 tab khi đã có `id` (đang sửa); khi thêm mới chỉ có tab "Suppliers".

## Mô tả chi tiết

Tab **Suppliers** (thông tin chính, element `account/suppliers`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Supplier Code | `supplier_code` | Text, readonly | — | Tự sinh 8 chữ số, tăng dần theo `MAX(code)` của nhà cung cấp loại product |
| 2 | Supplier Name | `supplier_name` | Text | Có (`required`, min 2 ký tự) | |
| 3 | Supplier Category | `supplier_category` | Select2 (`ProductCategory` loại product) | Có (`required`) | |
| 4 | Contact Person | `contact_person` | Text | Có (`required`, min 2 ký tự) | |
| 5 | Address | `address` | Text | Có (`required`, min 2 ký tự) | |
| 6 | Country | `country` | Select2 | Có (`required`) | |
| 7 | Latitude / Longitude | `latitude` / `longitude` | Input number | Không | |
| 8 | Google Map Link | `google_map_link` | Input url | Không | |
| 9 | Phone Number | `phone_number` | Text | Có (`required`) | |
| 10 | Email | `email` | Text | Có (`required`) | |
| 11 | Messenger / Messenger ID | `messenger` / `messenger_id` | Text | Không | |
| 12 | Currency | `currency` | Select2 | Không hiển thị bắt buộc rõ | |
| 13 | GST (%) | `vat` | Input number (0–100, step 0.01) | Không | |
| 14 | Status | `status` | Select: Active/Inactive | Có (`required`) | |
| 15 | Business Units | `business_units[]` | Checkbox nhiều lựa chọn | Có (`required`, validate JS) | |

Tab **Products** (element `account/supplier_products`): danh sách Product Allocation của nhà cung cấp — chọn Product để gán/gỡ.

Tab **Bank Account Detail** (element `account/bank_account_detail`, chỉ hiện khi đã có `id`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Payment Method | `payment_method_id` | Select | Có (`required`) | Mặc định "Bank Transfer" |
| 2 | Bank Name | `bank_name` | Text | Có (`required`) | |
| 3 | Bank Swift | `bank_swift` | Text | Có (`required`) | |
| 4 | Currency | `currency_id` | Select | Có (`required`) | |
| 5 | Account Name | `account_name` | Text | Có (`required`) | |
| 6 | Account Number | `account_number` | Text | Có (`required`) | |
| 7 | Document | `document` | File (ảnh/PDF, tối đa 5 MB) | Không | Xem trước ảnh hoặc nút "View PDF"; có nút Remove |
| 8 | Preference (Preferred/Other) | `payment_type[]` | Checkbox loại radio (chỉ chọn 1) | Không | Đánh dấu tài khoản ưu tiên thanh toán |

## Chức năng/nút thao tác
- **Save (tab Suppliers):** submit POST tới chính action `addSupplier`; server lưu/tạo `Supplier` (`type=product`), ghi access log, redirect sang chính popup này với `id` vừa lưu (chuyển sang chế độ sửa, tab `list`).
- **Save (tab Bank Account Detail):** submit POST, lưu `SupplierBankAccount` (nếu đánh dấu Preferred thì bỏ Preferred của tài khoản khác cùng nhà cung cấp), redirect lại tab hiện tại.
- **Cancel:** quay lại ACC-057.

## Điều hướng
- Vào từ: ACC-057 (Đơn vị cung ứng hàng hóa) — nút "Add new" hoặc nút Sửa trên từng dòng.
- Điều hướng đến: quay lại chính nó (tab `list`) sau khi lưu thành công, hoặc về ACC-057 khi Cancel.
