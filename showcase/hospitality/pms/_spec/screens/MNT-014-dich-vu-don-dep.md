# MNT-014 — Dịch vụ dọn dẹp (Cleaning Services)

**Loại:** Trang đầy đủ (kèm chỉnh sửa nội tuyến qua modal/khu vực ẩn-hiện trên cùng trang)
**Route:** maintenance/cleaningServices (ajax GET cùng route trả JSON tìm kiếm; `maintenance/getCleaningServiceData/:id` nạp dữ liệu sửa; `maintenance/updateCleaningService` lưu sửa)
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình quản lý các dịch vụ dọn dẹp (`GardenService.type = cleaning`) cùng bộ "tiêu chuẩn dọn dẹp" (Cleaning Service Standard) gắn với mỗi dịch vụ — mỗi tiêu chuẩn gồm tên (legend) và icon minh họa. Trang hiển thị thống kê tổng quan (số dịch vụ, tổng số tiêu chuẩn, số BU được phủ, số dịch vụ chưa có tiêu chuẩn) và cho phép sửa dịch vụ + quản lý tiêu chuẩn ngay tại chỗ (nạp dữ liệu qua ajax, không chuyển trang).

## Mô tả chi tiết

### Thống kê tổng quan
| # | Chỉ số | Field code | Ghi chú |
|---|---|---|---|
| 1 | Số dịch vụ đang hoạt động | `services_count` | |
| 2 | Tổng số tiêu chuẩn | `total_standards` | |
| 3 | Số BU được phủ / Tổng BU | `covered_bu_count` / `total_bu_count` | |
| 4 | Số dịch vụ chưa có tiêu chuẩn | `needs_attention` | |

### Bộ lọc/tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Từ khóa | `q` | Text (ajax) | Tìm theo tên dịch vụ hoặc tên tiêu chuẩn |

### Cột hiển thị (danh sách, phân trang 10 dòng)
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ảnh dịch vụ | `service_image` | |
| 2 | Tên dịch vụ | `name` | |
| 3 | Đơn vị kinh doanh | `business_unit`, `business_unit_count` | |
| 4 | Số tiêu chuẩn | `standards_count` | Danh sách `standards[]` (tiêu đề + icon) |
| 5 | Trạng thái | `status` | |
| 6 | Người tạo | `created_by` → `CreatedUser` | |
| 7 | Hành động | — | Sửa (mở khu vực sửa nội tuyến), Xóa |

### Khu vực sửa nội tuyến (nạp qua ajax `getCleaningServiceData`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | ID dịch vụ | `id` | Hidden | Có | |
| 2 | Tên dịch vụ | `name` | Text | Có | |
| 3 | Ảnh dịch vụ | `image`/`cropped_image` | Upload ảnh (crop) | Không | |
| 4 | Đơn vị kinh doanh | `business_unit[]` | Select2 multi | Có | |
| 5 | Trạng thái | `svc_status` | Select | Có | |
| 6 | Danh sách tiêu chuẩn | `standards_json` | Builder động (legend + icon từng dòng) | Không | Xóa toàn bộ tiêu chuẩn cũ và ghi lại theo danh sách mới khi submit |

## Chức năng/nút thao tác
- **Add New**: điều hướng sang MNT-014-P1 — Thêm dịch vụ dọn dẹp (trang riêng, không phải modal).
- **Sửa** (icon): nạp dữ liệu dịch vụ + tiêu chuẩn qua ajax vào khu vực form ẩn trên cùng trang; nút **Update Service** submit về `updateCleaningService` (xóa hết `CleaningServiceStandard` cũ, lưu lại theo `standards_json`).
- **Thêm tiêu chuẩn mới** (trong khu vực sửa): thêm dòng legend + icon vào danh sách trước khi Update.
- **Xóa dịch vụ**: mở modal xác nhận, xóa `GardenService` + toàn bộ `CleaningServiceStandard` liên quan (`deleteCleaningService`).
- **Tìm kiếm**: gọi lại chính route bằng ajax GET (`q`), trả JSON danh sách kết quả.

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: MNT-014-P1 (Thêm dịch vụ dọn dẹp).

## Ghi chú
- File `edit_cleaning_service.ctp` là view độc lập cũ, hiện không được liên kết tới từ giao diện (chức năng sửa đã chuyển thành khu vực nội tuyến trong chính trang này) — không tài liệu hoá thành màn hình riêng.
