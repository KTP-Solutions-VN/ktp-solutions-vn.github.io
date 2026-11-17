# ACC-057 — Nhà cung cấp sản phẩm

**Loại:** Trang đầy đủ

**Route:** `AccountController::suppliers()` — mặc định `/account/suppliers`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Danh sách nhà cung cấp thuộc nhóm "Sản phẩm" (`Supplier.type = product`), dùng để lựa chọn khi tạo Product Allocation hoặc Payment Request loại Product.

## Mô tả chi tiết

Danh sách (bảng `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | Số thứ tự |
| 2 | Code | `code` | Mã nhà cung cấp (tự sinh, 8 chữ số) |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Country | `country` | Tra cứu tên quốc gia theo danh sách country |
| 6 | Created On | `created_at` (định dạng `d M y`) | |
| 7 | Created By | `added_by.usage_name` hoặc họ tên | |
| 8 | Action | — | Sửa (mở ACC-057-P1) và Xoá (popup xác nhận, gọi `deleteProductSupplier`) |

## Chức năng/nút thao tác
- **Add new:** điều hướng sang ACC-057-P1 (`addSupplier`) ở chế độ thêm mới.
- **Sửa (icon bút, trên từng dòng):** điều hướng sang ACC-057-P1 (`addSupplier/suppliers/<base64 id>/list`) ở chế độ sửa.
- **Xoá (icon thùng rác, trên từng dòng):** mở popup xác nhận; bấm Save điều hướng tới `deleteProductSupplier/<base64 id>` để xoá nhà cung cấp.

## Điều hướng
- Vào từ: Sidebar > mục "Suppliers" (nhóm Product) trong Account Settings.
- Điều hướng đến: ACC-057-P1 (Popup thêm/sửa nhà cung cấp sản phẩm), ACC-058 (Sản phẩm, cùng khu vực Settings).
