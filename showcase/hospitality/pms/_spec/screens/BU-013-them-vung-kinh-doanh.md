# BU-013 — Thêm vùng báo cáo (New Reporting Zone)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::addZoning()` — mặc định `/business-unit/add-zoning`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Biểu mẫu thêm mới một vùng kinh doanh, gán tên tùy chỉnh và chọn các Đơn vị kinh doanh thuộc vùng. Mã vùng (`zone_name`) được hệ thống tự sinh, không nhập tay.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tùy chỉnh | `custom_name` | Text | Có | |
| 2 | Đơn vị kinh doanh | `business_units[]` | Checkbox (nhiều) | Có | Chỉ hiển thị đơn vị kinh doanh mà người dùng hiện tại có quyền |

## Chức năng/nút thao tác
- **Save:** tự sinh `zone_name` (tái sử dụng số vùng đã xóa nếu đã đạt tối đa 99 vùng), lưu bản ghi `BusinessUnitZone`, ghi log hoạt động.
- **Cancel:** quay lại BU-012, không lưu.

## Điều hướng
- Mở từ: BU-012 (danh sách vùng kinh doanh) — nút "Add new".
- Sau khi lưu: redirect về BU-012.
