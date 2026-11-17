# BU-012 — Vùng kinh doanh (Zoning)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::zoning()` — mặc định `/business-unit/zoning`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Danh sách các "vùng" (zone) do người dùng hiện tại tạo, dùng để nhóm nhiều Đơn vị kinh doanh lại với nhau theo khu vực địa lý/quản lý tùy chỉnh.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config0`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Vùng | `zone_name` | Tự sinh dạng `<usage_name>-01`, `-02`... |
| 2 | Đơn vị kinh doanh | `business_unit_ids` (JSON) → tên | Danh sách các đơn vị thuộc vùng, nối bằng dấu phẩy |
| 3 | Tên tùy chỉnh | `custom_name` | |
| 4 | Ngày tạo | `created_at` | Định dạng `d M y H:i` |
| 5 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add new:** điều hướng sang BU-013 (Thêm vùng kinh doanh).
- **Sửa (icon bút):** điều hướng sang BU-014 (Sửa vùng kinh doanh).
- **Xóa (icon thùng rác):** mở popup BU-012-P1 xác nhận xóa (đánh dấu `is_deleted=1`, không xóa cứng — số vùng có thể tái sử dụng khi tạo vùng mới, tối đa 99 vùng/người dùng).

## Điều hướng
- Vào từ: menu Settings.
- Điều hướng đến: BU-013 (Thêm), BU-014 (Sửa), BU-012-P1 (popup xác nhận xóa).
