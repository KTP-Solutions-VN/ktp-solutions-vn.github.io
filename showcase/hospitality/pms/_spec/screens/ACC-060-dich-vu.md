# ACC-060 — Dịch vụ

**Loại:** Trang đầy đủ

**Route:** `AccountController::services($tab)` — mặc định `/account/services/<tab>`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Trang 3 tab quản lý danh mục Dịch vụ: danh sách Service, phân bổ Service cho Nhà cung cấp (Services Allocation), và danh mục nhóm Dịch vụ (Services Categories). Cấu trúc và hành vi tương tự ACC-058 (Sản phẩm) nhưng cho `Product.type = services`.

## Mô tả chi tiết

Tab **Services** (mặc định, element `account/services`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Image | `image` | |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Price | `price` | |
| 6 | Status | `status` | Active/Inactive |
| 7 | Created On/By | `created_at`, `added_by` | |
| 8 | Action | — | Sửa/Xoá (ghi chú: nút "Add new" trong menu Sidebar hiện dẫn tới action `addServices` đã bị comment/vô hiệu hoá trong controller — xem phần Điều hướng) |

Tab **Services Allocation** (element `account/services_allocation`): danh sách gán Service ↔ Supplier (`ProductAllocation.type = services`), popup thêm nhanh và xoá.

Tab **Services Categories** (element `account/services_categories`): danh sách nhóm dịch vụ (`ProductCategory.type = services`), popup thêm/sửa tên nhóm và xoá (chỉ xoá được nhóm chưa gán Service nào).

## Chức năng/nút thao tác
- **Add/Edit/Delete Services Allocation (tab Services Allocation):** popup submit POST về chính action `services` (`tab=services-allocation`), lưu/xoá `ProductAllocation`.
- **Add/Edit/Delete Services Category (tab Services Categories):** popup submit POST về chính action `services`, lưu/xoá `ProductCategory`; không cho xoá nếu nhóm còn Service.
- Chuyển tab cập nhật URL (`/account/services/<tab>`) mà không reload toàn trang.

## Điều hướng
- Vào từ: Sidebar > mục "Services" trong Account Settings.
- Điều hướng đến: KHÔNG có popup thêm/sửa Service riêng đang hoạt động — action `addServices()` trong `AccountController` đã bị comment toàn bộ (dead code) và view `add_services.ctp` không còn được action nào render; việc thêm mới/sửa Service tại tab này hiện không có chức năng UI tương ứng.
