# ACC-058 — Danh mục hàng hóa (Goods Catalog)

**Loại:** Trang đầy đủ

**Route:** `AccountController::products($tab)` — mặc định `/account/products/<tab>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Trang 3 tab quản lý danh mục Sản phẩm: danh sách Product, phân bổ Product cho Nhà cung cấp (Product Allocation), và danh mục nhóm Sản phẩm (Product Categories).

## Mô tả chi tiết

Tab **Products** (mặc định, element `account/products`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Image | `image` | |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Price | `price` | |
| 6 | Status | `status` | Active/Inactive |
| 7 | Created On/By | `created_at`, `added_by` | |
| 8 | Action | — | Sửa (mở ACC-058-P1), Xoá (gọi `deleteProduct`) |

Tab **Product Allocation** (element `account/product_allocation`): danh sách gán Product ↔ Supplier (`ProductAllocation.type = product`), có popup thêm nhanh (chọn Product + Supplier) và xoá; cột chính: Product, Supplier, Created On/By, Action.

Tab **Product Categories** (element `account/product_categories`): danh sách nhóm sản phẩm (`ProductCategory.type = product`), popup thêm/sửa tên nhóm và xoá (chỉ xoá được nhóm chưa gán Product nào); cột chính: Name, Status (active nếu có Product active), Created On/By, Action.

## Chức năng/nút thao tác
- **Add new (tab Products):** điều hướng sang ACC-058-P1 (`addProduct`).
- **Sửa/Xoá (tab Products, trên từng dòng):** Sửa mở ACC-058-P1 ở chế độ sửa; Xoá gọi `deleteProduct/<id>`.
- **Add/Edit/Delete Product Allocation (tab Product Allocation):** popup submit POST về chính action `products` (`tab=product-allocation`), lưu/xoá bản ghi `ProductAllocation`.
- **Add/Edit/Delete Product Category (tab Product Categories):** popup submit POST về chính action `products`, lưu/xoá bản ghi `ProductCategory`; không cho xoá nếu nhóm còn Product.
- Chuyển tab cập nhật URL (`/account/products/<tab>`) mà không reload toàn trang.

## Điều hướng
- Vào từ: Sidebar > mục "Goods Catalog" trong Finance Preferences.
- Điều hướng đến: ACC-058-P1 (Form mặt hàng).
