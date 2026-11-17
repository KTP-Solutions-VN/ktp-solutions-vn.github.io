# PROP-033 — Danh sách Property

**Loại:** Trang đầy đủ
**Route:** property/list/:id (dashed mặc định CakePHP DashedRoute: `/property/list`, tham số `id` là business unit id, cũng nhận qua query string `?id=`)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang danh sách chính (entry point) của module Property — liệt kê toàn bộ villa/property theo Business Unit đang chọn, kèm bộ lọc, các nút thao tác thêm/sửa/xóa/nhân bản/xem chi tiết/xem kho vật dụng và tải guest contract. Đây là trang trung tâm điều hướng sang các trang khác của module (villa, view_details, inventories...).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | Không | `{0: 'All'} + business_unit`; đổi giá trị → redirect `list?id=<bu>` và lưu cookie `default_bu`/`property_business_unit_id` |
| 2 | Show active/inactive (ẩn) | `paused_stop_show` | Hidden + nút submit `#paused_stop_show` | — | Toggle "Show Active"/"Show Inactive" (Paused/Closed) — POST về chính action `list`, lưu vào `User.paused_stop_show` |
| Cột bảng | Property Type | — | Text (từ `villa_type_id`) | — | Lấy tên từ bảng `VillaType` |
| Cột bảng | Area | — | Text (từ `area_id`) | — | Lấy tên từ bảng `Area` (qua `VillaLocation`) |
| Cột bảng | Name | `name` | Text | — | Tên villa |
| Cột bảng | Owner | — | Text/Link | — | `Owner.family_name`; là link mở `Owner::edit` (tab mới) nếu user có quyền, ngược lại chỉ hiển thị text |
| Cột bảng | Concierge | — | Text | — | Ghép `emoticon - usage_name - first_name family_name` |
| Cột bảng | Status | `status` | Text | — | Open/Paused/Closed |
| Cột bảng | Actions | — | Nhóm nút (xem bên dưới) | — | |

Bảng dùng DataTable client-side `#zero_config`. Không có ô search riêng ngoài DataTable mặc định.

## Chức năng/nút thao tác
- Nút "+ Properties" (`.add_country`) → điều hướng sang **PROP-034 — trang Thêm/Sửa Property** ở chế độ Thêm mới (`action=villa, identification`). Chỉ hiện khi user không phải `external_user` và có quyền (Superadmin/Admin/Business Unit Manager, hoặc Employee/Team Leader có role Content/Accounting).
- Nút "Territories" (`.residencesBtn`/link `territories`) → điều hướng sang trang Territories (ngoài phạm vi 3 action được giao); bị disable (`grey_button`) nếu `is_concierge` = false.
- Nút toggle "Show Active"/"Show Inactive" → submit form POST cùng trang, đổi field `paused_stop_show`.
- Nút "Residences" (link `residenceEnquiry`) → điều hướng trang Residence Enquiry.
- Nút "Reports" (link `propertyReports/contract`) → điều hướng PROP-029 (Property Reports).
- Icon "Copy Code" (`.copy_text`) trên từng dòng → copy `short_name` villa vào clipboard (JS, không gọi server).
- Icon "View Details" (mắt, class `btn-success`) → điều hướng sang **PROP-035 — Xem chi tiết Property** (`action=viewDetails, $id`). Chỉ hiện với role phù hợp (Superadmin/Admin/Business Unit Manager, hoặc Employee/Team Leader có role Concierge/Planner).
- Icon "Download Guest Contract" (`.guest-contract-download`) → mở popup con `#guestContractDownloadModal` (chọn Language + Electricity payment option qua AJAX `guestContractDownloadOptions`, validate qua `guestContractAssignmentValidation`, tải PDF qua `guestContractAssignmentPdf`). Chỉ hiện với Superadmin hoặc Employee/Team Leader có role Concierge.
- Icon "Duplicate" (`.btn-warning`, hàm `copyProperty()`) → mở popup con `#exampleModal1` "Duplicate Property" (chọn villa nguồn + nhập tên mới), kiểm tra trùng tên qua AJAX `checkVillaName`, submit AJAX `duplicateProperty`, sau đó reload trang.
- Icon "View Inventory" (`ti-layout-grid3-alt`) → điều hướng action `inventories/$id` (ngoài phạm vi 3 action được giao).
- Icon "Service Settings" (`fa-cogs`) → mở **PROP-034** ở tab "service and utilities" (`action=villa, service and utilities, $id`), chỉ hiện khi `is_show_service_button` = true (không phải hợp đồng partnership).
- Icon "Edit Details" (`fa-edit`, `.edit_country`) → điều hướng sang **PROP-034 — trang Thêm/Sửa Property** ở chế độ Sửa (`action=villa, identification, $id`).
- Icon "Delete" (`fa-trash`, `.delete`) → mở popup con `#exampleModal` xác nhận xóa; nút Save trong popup gọi `window.location.href = '/VM/property/delete/' + btoa(id)` (điều hướng sang action `delete`, ngoài phạm vi 3 action được giao).
- Icon "Download" (cuối bảng) → link tải file `downloadPropertyData/$id/$paused_stop_show` (export dữ liệu, ngoài phạm vi được giao — chỉ ghi chú điều hướng).
- Với `external_user == 'agency-staff'`: icon Edit riêng điều hướng `villa/business situation/$id`, bị disable nếu hợp đồng villa không ở trạng thái `open`.

## Điều hướng
- Mở từ: Menu chính (mục Property/Properties, `active_menu = '7'`).
- Điều hướng tới: PROP-034 (trang Thêm/Sửa Property, các bước identification/service and utilities/business situation), PROP-035 (Xem chi tiết Property), PROP-029 (Property Reports), action `territories`, `residenceEnquiry`, `inventories`, `delete`, `downloadPropertyData` (các action ngoài phạm vi được giao).
- Popup con: Popup xác nhận Delete (`#exampleModal`), Popup Duplicate Property (`#exampleModal1`), Popup Download Guest Contract (`#guestContractDownloadModal`).
