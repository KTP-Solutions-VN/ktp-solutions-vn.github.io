# ACC-064 — Danh sách yêu cầu thanh toán (Payment Requests)

**Loại:** Trang đầy đủ

**Route:** `AccountController::paymentRequestList()` — mặc định `/account/payment-request-list`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Danh sách toàn bộ yêu cầu thanh toán (Payment Request) đã tạo cho nhà cung cấp sản phẩm/dịch vụ, kèm thao tác Thêm mới, Sửa, In và Xoá từng yêu cầu.

## Mô tả chi tiết

Bảng danh sách (không phân trang server-side, dùng DataTable `zero_config` phía client), sắp xếp theo `id` giảm dần:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | No | — | Số thứ tự |
| 2 | Invoice Number | `invoice_number` | Số hoá đơn |
| 3 | Invoice Due Date | `invoice_due_date` | Định dạng `j M y` |
| 4 | Supplier Name | `supplier.name` | Tên nhà cung cấp (quan hệ `Suppliers`) |
| 5 | Category Type | `category_type` | `product` / `service` |
| 6 | Actions | — | Edit / Delete / Print |

Không có bộ lọc/tìm kiếm riêng ngoài tìm kiếm mặc định của DataTable.

## Chức năng/nút thao tác
- **Add New:** mở ACC-064-P1 (Tạo yêu cầu thanh toán).
- **Edit (icon bút):** mở ACC-064-P2 (`editPaymentRequest`) với id được mã hoá base64.
- **Print (icon máy in):** mở tab mới `printPaymentRequest/<id đã encode>` để xem/in phiếu yêu cầu thanh toán.
- **Delete (icon thùng rác):** mở popup xác nhận xoá, khi đồng ý điều hướng tới `deletePaymentRequest/<id đã encode>` — xoá bản ghi `ExpensePaymentRequest` và toàn bộ dòng chi tiết `ExpensePaymentRequestSupplier` liên quan, ghi access log.

## Điều hướng
- Vào từ: Sidebar > nhóm "Expenses" > mục "Payment Request" (cùng nhóm với ACC-062 Petty Cash và ACC-063 Payments).
- Điều hướng đến: ACC-064-P1 (Add), ACC-064-P2 (Edit); trang in phiếu (`printPaymentRequest`, không có mã ACC riêng — thuộc nhóm hành động download/print).
