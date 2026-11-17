# PROP-043 — Lãnh thổ phụ trách Concierge (Territories)

**Loại:** Trang đầy đủ
**Route:** property/territories/:id
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang liệt kê danh sách Property (trạng thái Open) theo khu vực (Area), hiển thị Concierge phụ trách và cho phép gán/đổi nhanh Concierge cho từng Property. Lọc theo Business Unit, theo Concierge phụ trách, sắp xếp theo Area/Property/Concierge. Có nút xuất CSV danh sách.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (có option "All", hỗ trợ Zone) | Có (class `required`) | Đổi giá trị → reload với query `id`, lưu cookie |
| 2 | Concierge | `show_concierge` | Select2 (All/Unassigned/danh sách concierge) | Có | Lọc theo Concierge phụ trách |
| 3 | Sắp xếp theo (Sort by) | `sort_by` | Select2 (Area/Property/Concierge) | Có | |

### Cột hiển thị
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Text | — | |
| 2 | Area | `villa_location.area.name` | Text | — | Qua contain VillaLocation→Area |
| 3 | Property | `name` | Text | — | |
| 4 | Concierge (Name) | `concierge_id` | Text hiển thị + icon Edit | — | Icon Edit chỉ hiện với Superadmin/Admin/BU Manager/Team Leader (role Planner/Content) |

## Chức năng/nút thao tác
- Đổi Business Unit/Concierge/Sort by → reload danh sách theo điều kiện lọc.
- Icon Edit trên cột Concierge → mở dropdown chọn Concierge mới tại chỗ (data-villa_id, data-user_id), submit AJAX `assignConciergeToVilla` để gán Concierge cho Property, cập nhật lại tên hiển thị.
- Nút Download (icon) → tải file CSV qua `downloadConciergeTerritories/:id/:sort_by/:show_concierge`.

## Điều hướng
- Mở từ: Menu Property/Concierge (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng trang khác (gán Concierge xử lý AJAX tại chỗ); tải file CSV qua `downloadConciergeTerritories`.
- Popup con: Dropdown gán Concierge tại chỗ (không tách mã riêng, là thao tác inline nhỏ).
