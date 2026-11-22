# ACC-064-P1 — Lập yêu cầu thanh toán (New Payment Request)

**Loại:** Popup (mở từ ACC-064)

**Route:** `AccountController::paymentRequest()` (hiển thị form) + `AccountController::addPaymentRequest()` (lưu, POST) — mặc định `/account/payment-request`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form tạo mới một yêu cầu thanh toán cho nhà cung cấp: chọn Business Unit, loại nhà cung cấp (Product/Service), nhà cung cấp, khai báo nhiều dòng chi tiết (sản phẩm/dịch vụ, số lượng, đơn giá, GST) và phân bổ chi phí theo Company hoặc Property, đính kèm hoá đơn.

## Mô tả chi tiết

**Thông tin chung:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select (danh sách BU theo quyền user) | Có | Đổi BU sẽ AJAX `getBuData` nạp lại danh sách Company (theo `subsidiary_id`) và Property |
| 2 | Loại nhà cung cấp | `category_type` | Lựa chọn thẻ: Product / Service | Có | Quyết định danh sách Supplier và Product/Service tương ứng tải qua `getSuppliersByType` |
| 3 | Select Supplier | `supplier` | Select (theo `category_type` đã chọn) | Có | Có nút "+ Add supplier" (mở ACC-057-P1/ACC-059-P1 tuỳ loại) và "Refresh" để nạp lại danh sách sau khi thêm supplier mới |
| 4 | GST from Supplier Profile | — | Hiển thị (readonly) | — | Lấy từ `vat_percent` của Supplier đã chọn |

**Payment Lines (khai báo nhiều dòng, tối thiểu 1 dòng, thêm bằng nút "+ Add Payment Line"):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Product / Service | `items[].product` hoặc `items[].service` | Select (nạp qua `getAllocations` theo supplier + type), có option "Free entry..." | Có (trừ khi Free entry) | Chọn "Free entry" → hiện input `items[].other_product`/`items[].other_service` để nhập tên tự do |
| 2 | Description | `items[].description` | Text | Không | |
| 3 | Qty | `items[].quantity` | Number | Có | |
| 4 | Unit Price | `items[].price_unit` | Number | Có | |
| 5 | GST | `items[].vat` | Select (%) | Không | |
| 6 | Phân loại phân bổ | `items[].type` | Segmented: Company / Property | Có | Quyết định các field bên dưới |
| 7 | Business Unit (phân bổ) | — | Select | Có | Theo phân bổ Company hoặc Property |
| 8 | Company | `items[].company_id` | Select (khi `type=company`) | Có nếu `type=company` | |
| 9 | Property | `items[].property_id` | Select (khi `type=property`) | Có nếu `type=property` | |
| 10 | Recharge Owner? | `items[].recharge_owner` | Switch Yes/No | Chỉ áp dụng khi `type=property` | Giá trị `yes`/`no` |

**Invoice:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Upload supplier invoice | `invoice_file` | File (PDF) | Không | Upload qua `_fileUpload`, lưu vào thư mục `expense-payment-request` |
| 2 | Invoice Number | `invoice_number` | Text | Không | |
| 3 | Invoice Issue Date | `issue_date` | Date picker | Không | Convert `Y-m-d` khi lưu |
| 4 | Invoice Due Date | `due_date` | Date picker | Không | Convert `Y-m-d` khi lưu |

Panel tóm tắt bên phải (Payment Request Summary): hiển thị realtime BU, Supplier, Invoice, số dòng, Subtotal, GST, Total to Pay, và breakdown theo Company/Property/Owner recharge — tính toán phía client, không phải field nhập.

## Chức năng/nút thao tác
- **+ Add supplier:** mở nhanh popup thêm Supplier (ACC-057-P1 hoặc ACC-059-P1 tuỳ `category_type`) không rời trang.
- **Refresh:** tải lại danh sách Supplier sau khi thêm mới.
- **+ Add Payment Line:** thêm một dòng chi tiết mới vào form.
- **Submit Payment Request / Preview Request:** submit POST tới `addPaymentRequest`; server lưu bản ghi `ExpensePaymentRequest` (business_unit_id, invoice_number, invoice_issue_date, invoice_due_date, supplier_id, category_type, invoice_file), sau đó lưu từng dòng vào `ExpensePaymentRequestSupplier` (product_id/extra_product_field, quantity, price_unit, type, company_id hoặc property_id + owner_recharge); Flash thành công/lỗi rồi redirect về ACC-064 (`paymentRequestList`) hoặc quay lại form nếu lỗi.

## Điều hướng
- Vào từ: ACC-064 (Phê duyệt thanh toán) — nút "Add New".
- Điều hướng đến: quay lại ACC-064 sau khi lưu thành công hoặc lỗi.
