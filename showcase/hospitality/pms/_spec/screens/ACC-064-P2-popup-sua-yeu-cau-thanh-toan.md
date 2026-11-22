# ACC-064-P2 — Sửa yêu cầu thanh toán (Edit Payment Request)

**Loại:** Popup (mở từ ACC-064)

**Route:** `AccountController::editPaymentRequest($id)` (hiển thị form) + `AccountController::updatePaymentRequest()` (lưu, POST) — mặc định `/account/edit-payment-request/<id đã base64>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form dạng wizard cho phép chỉnh sửa một yêu cầu thanh toán đã tạo (thông tin chung, các dòng chi tiết Product/Service, hoá đơn), nạp lại toàn bộ dữ liệu hiện có từ `ExpensePaymentRequest` và `ExpensePaymentRequestSupplier`.

## Mô tả chi tiết

Cùng bộ field như ACC-064-P1 (Business Unit, Category Type, Supplier, danh sách Payment Lines với Product/Service — Free entry, Quantity, Price Unit, phân bổ Company/Property, Recharge Owner, và khối Invoice: Invoice Number/Issue Date/Due Date/Invoice File), khác biệt:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Payment Request Id | `payment_id` | Hidden | Có | Id đã mã hoá dùng để xác định bản ghi cần cập nhật khi gọi `updatePaymentRequest` |
| 2 | Invoice File hiện có | `is_owner_remove_doc` | Hidden + link xoá | Không | Cho phép xoá file hoá đơn đã upload trước đó (hiển thị file hiện tại nếu có) |

Toàn bộ Payment Lines được nạp sẵn từ `payment->expense_payment_request_supplier`: nếu `product_id = 0` thì hiển thị ở chế độ "Free entry" với giá trị `extra_product_field`; nếu `type=company` hiển thị `company_id`, nếu `type=property` hiển thị `property_id` + `recharge_owner`.

## Chức năng/nút thao tác
- **Wizard từng bước (steps):** điều hướng qua các block Thông tin chung → Payment Lines → Invoice → Summary trước khi lưu.
- **+ Add Payment Line / xoá dòng:** thêm/bớt dòng chi tiết như ACC-064-P1.
- **Xoá file hoá đơn hiện tại:** đánh dấu `is_owner_remove_doc`, xoá liên kết file khi lưu.
- **Save/Update:** submit POST tới `updatePaymentRequest`; nếu thiếu `payment_id` báo lỗi "Invalid Request" và quay lại ACC-064-P1; ngược lại cập nhật bản ghi `ExpensePaymentRequest` và đồng bộ lại toàn bộ dòng `ExpensePaymentRequestSupplier` (thêm/sửa/xoá theo dữ liệu submit), Flash kết quả, redirect về ACC-064.
- Nếu không tìm thấy dữ liệu (`id` không hợp lệ): Flash lỗi "Data not found" và redirect về ACC-064.

## Điều hướng
- Vào từ: ACC-064 (Phê duyệt thanh toán) — icon "Edit" trên từng dòng.
- Điều hướng đến: quay lại ACC-064 sau khi lưu hoặc khi dữ liệu không hợp lệ.
