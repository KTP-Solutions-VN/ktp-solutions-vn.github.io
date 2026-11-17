# MNT-014-P1 — Thêm dịch vụ dọn dẹp

**Loại:** Trang đầy đủ (mở từ MNT-014)
**Route:** maintenance/addCleaningService
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ dọn dẹp: tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái, và danh sách "tiêu chuẩn dọn dẹp" (mỗi tiêu chuẩn gồm tên/legend + icon minh họa, thêm động).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh dịch vụ | `image`/`cropped_image` | Upload ảnh, crop | Có | |
| 3 | Đơn vị kinh doanh | `business_unit[]` | Select2 multi | Có | |
| 4 | Trạng thái | `status` | Select (active/inactive) | Có | |
| 5 | Tiêu chuẩn — Tên (legend) | `standards_json[].legend` | Text (tối đa 60 ký tự) | Có (mỗi dòng) | |
| 6 | Tiêu chuẩn — Icon | `standards_json[].imgKey` → ảnh base64 | Upload ảnh (JPG/PNG, tối đa 1MB) | Không | |

## Chức năng/nút thao tác
- **Thêm tiêu chuẩn** ("+ Standard"): mở khối nhập legend + icon, nút "Save Standard" thêm vào danh sách hiển thị (client-side), "Cancel" hủy dòng đang nhập.
- **Update Service** (submit chính): lưu `GardenService` (`type = cleaning`) và toàn bộ `CleaningServiceStandard` theo `standards_json`, ghi log hoạt động, chuyển về MNT-014.
- **Cancel**: quay về MNT-014.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-014 — Dịch vụ dọn dẹp.
- Đi tới: sau khi lưu, quay về MNT-014.
