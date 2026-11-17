# MNT-012 — Ma trận dịch vụ bảo trì (Danh mục / Hạng mục / Vấn đề)

**Loại:** Trang đầy đủ (chứa nhiều popup/modal thao tác nội tuyến)
**Route:** maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` phân trang/tìm kiếm)
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình quản lý cấu trúc phân loại sự cố bảo trì theo 3 cấp: **Danh mục** (category, `GardenService.type = maintenance`) → **Hạng mục** (subcategory, `MaintenanceSubcategory`) → **Vấn đề/Lỗi** (problem option, `MaintenanceProblemOption`, gắn mức ưu tiên). Hỗ trợ kéo-thả sắp xếp thứ tự danh mục/hạng mục, tìm kiếm/lọc và thêm-sửa-xóa cả 3 cấp ngay trên trang qua modal.

## Mô tả chi tiết

### Bảng ma trận (load qua ajax `maintenanceMatrix`)
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Danh mục | `cat_name`, `cat_icon` | `GardenService` loại maintenance |
| 2 | Hạng mục | `sub_name`, `sub_icon` | `MaintenanceSubcategory` |
| 3 | Vấn đề/Lỗi | `option` | `MaintenanceProblemOption.problem_option` |
| 4 | Mức ưu tiên | `priority_name`, `priority_color`, `priority_heading` | Có thể đổi nhanh ngay trên bảng (`option_priority`) |
| 5 | Trạng thái | `status` | active/inactive |

### Bộ lọc/tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Từ khóa | `search` | Text | Tìm theo tên vấn đề, hạng mục, danh mục |
| 2 | Danh mục | `category` | Select | Lọc theo `GardenService.id` |
| 3 | Mức ưu tiên | `priority` | Select | Lọc theo `MaintenancePriority.id` |
| 4 | Trang | `page` | Phân trang (limit 10) | |

### Popup 1 — Thêm/Sửa Danh mục (`form_type = category`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên danh mục | `name` | Text | Có | Kiểm tra trùng qua ajax `checkMaintenanceDuplicate` |
| 2 | Mô tả | `description` | Textarea | Không | |
| 3 | Ảnh | `image`/`cropped_image` | Upload ảnh (crop) | Không | |
| 4 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | |
| 5 | Trạng thái | `status` | Select (active/inactive) | Có | |

### Popup 2 — Thêm/Sửa Hạng mục (`form_type = subcategory`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Danh mục cha | `category_id` | Select/context | Có | |
| 2 | Tên hạng mục | `name` | Text | Có | `slug` tự sinh; kiểm tra trùng trong cùng danh mục |
| 3 | Icon | `image`/`cropped_image` | Upload ảnh (crop) | Không | |
| 4 | Trạng thái | `status` | Select (active/inactive) | Có | |

### Popup 3 — Thêm/Sửa Vấn đề/Lỗi (`form_type = option`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Danh mục / Hạng mục cha | `category_id`, `subcategory_id` | Context | Có | |
| 2 | Tên vấn đề | `name` (→ `problem_option`) | Text | Có | Kiểm tra trùng trong cùng hạng mục |
| 3 | Mức ưu tiên | `priority` | Select | Có | |
| 4 | Trạng thái | `status` | Select (active/inactive) | Có | |

## Chức năng/nút thao tác
- **Thêm Danh mục/Hạng mục/Vấn đề**: mở modal tương ứng, submit ajax về `addMaintenanceService` (phân biệt bằng `form_type`).
- **Sửa**: mở modal với dữ liệu có sẵn (`record_id`), submit cùng action `addMaintenanceService`.
- **Xóa Vấn đề**: `deleteMaintenanceService`.
- **Xóa Hạng mục**: `deleteSubCategory` (xóa kèm toàn bộ vấn đề con).
- **Kéo-thả sắp xếp Danh mục**: ajax `upadteCategoryPosition`.
- **Kéo-thả sắp xếp Hạng mục**: ajax `upadteSubCategoryPosition`.
- **Đổi nhanh mức ưu tiên** trên bảng: `form_type = option_priority`.
- **Tìm kiếm/Lọc/Phân trang**: gọi lại `maintenanceMatrix` (ajax, trả JSON).

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: không điều hướng sang trang khác — toàn bộ thao tác CRUD 3 cấp thực hiện tại chỗ qua modal/ajax.

## Ghi chú
- Hai file `add_maintenance_service.ctp` và `edit_maintenance_service.ctp` (action `addMaintenanceService` GET, `editMaintenanceService`) là view độc lập cũ, hiện không còn liên kết nào trong giao diện trỏ tới (đã được thay thế hoàn toàn bằng modal trong màn hình này) — không tài liệu hoá thành màn hình riêng.
