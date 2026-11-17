# ACC-059-P1 — Popup thêm/sửa nhà cung cấp dịch vụ

**Loại:** Popup (mở từ ACC-059)

**Route:** `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — mặc định `/account/add-services-supplier/<tab>/<id>/<show_page>/<payment_detail_id>`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Form nhiều tab dùng chung cho cả thêm mới và sửa nhà cung cấp loại "Dịch vụ": thông tin nhà cung cấp, danh sách dịch vụ đã phân bổ, và chi tiết tài khoản ngân hàng. Cấu trúc field và hành vi giống hệt ACC-057-P1, chỉ khác `Supplier.type = services`.

## Mô tả chi tiết

Tab **Suppliers** (element `account/services_supplier`) — field giống ACC-057-P1: Supplier Code (readonly, tự sinh), Supplier Name, Supplier Category (`ProductCategory` loại services), Contact Person, Address, Country, Latitude/Longitude, Google Map Link, Phone Number, Email, Messenger/Messenger ID, Currency, VAT (%), Status, Business Units.

Tab **Services** (element `account/supplier_service`, chỉ hiện khi đã có `id`): danh sách Service Allocation của nhà cung cấp.

Tab **Bank Account Detail** (element `account/service_supplier_bank_detail`, chỉ hiện khi đã có `id`) — field giống ACC-057-P1: Payment Method, Bank Name, Bank Swift, Currency, Account Name, Account Number, Document (upload), Preference (Preferred/Other).

## Chức năng/nút thao tác
- **Save (tab Suppliers):** submit POST tới chính action `addServicesSupplier`; lưu/tạo `Supplier` (`type=services`), ghi access log, redirect sang chính popup với `id` vừa lưu.
- **Save (tab Bank Account Detail):** submit POST, lưu `SupplierBankAccount`, redirect lại tab hiện tại.
- **Cancel:** quay lại ACC-059.

## Điều hướng
- Vào từ: ACC-059 (Nhà cung cấp dịch vụ) — nút "Add new" hoặc nút Sửa trên từng dòng.
- Điều hướng đến: quay lại chính nó (tab `list`) sau khi lưu thành công, hoặc về ACC-059 khi Cancel.
