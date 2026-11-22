# ACC-059 — Đơn vị cung ứng dịch vụ (Service Vendors)

**Loại:** Trang đầy đủ

**Route:** `AccountController::servicesSupplier()` — mặc định `/account/services-supplier`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Danh sách nhà cung cấp thuộc nhóm "Dịch vụ" (`Supplier.type = services`) — tương tự ACC-057 nhưng cho loại Services.

## Mô tả chi tiết

Danh sách (bảng `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Code | `code` | Mã tự sinh 8 chữ số |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Country | `country` | |
| 6 | Created On | `created_at` (định dạng `d M y H:i`) | |
| 7 | Created By | `added_by.usage_name` hoặc họ tên | |
| 8 | Action | — | Sửa (mở ACC-059-P1), Xoá (popup xác nhận, gọi `deleteServicesSupplier`) |

## Chức năng/nút thao tác
- **Add new:** điều hướng sang ACC-059-P1 (`addServicesSupplier`) ở chế độ thêm mới.
- **Sửa (icon bút, trên từng dòng):** điều hướng sang ACC-059-P1 (`addServicesSupplier/suppliers/<base64 id>/list`) ở chế độ sửa.
- **Xoá (icon thùng rác, trên từng dòng):** mở popup xác nhận; bấm Save điều hướng tới `deleteServicesSupplier/<base64 id>`.

## Điều hướng
- Vào từ: Sidebar > mục "Service Vendors" trong Finance Preferences.
- Điều hướng đến: ACC-059-P1 (Form đơn vị cung ứng dịch vụ), ACC-060 (Dịch vụ tính phí, cùng khu vực Finance Preferences).
