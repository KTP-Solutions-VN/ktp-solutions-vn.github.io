# BU-016 — Thêm địa điểm văn phòng (New Office Location)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::addOffice()` — mặc định `/business-unit/add-office`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Biểu mẫu thêm mới một văn phòng: tên, Đơn vị kinh doanh, phòng ban trực thuộc, địa chỉ, tọa độ bản đồ và ảnh minh họa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên văn phòng | `name` | Text | Có | |
| 2 | Đơn vị kinh doanh | `business_unit_id` | Select (select2) | Có | Chỉ hiển thị đơn vị kinh doanh mà người dùng hiện tại có quyền |
| 3 | Phòng ban | `department_id[]` | Checkbox (nhiều) | Có | Danh sách vai trò nhân viên (loại trừ một số vai trò hệ thống) |
| 4 | Địa chỉ | `address` | Text | Có | |
| 5 | Vĩ độ (Latitude) | `latitude` | Text | Có | |
| 6 | Kinh độ (Longitude) | `longitude` | Text | Có | |
| 7 | URL Google Map | `map_url` | Text | Có | |
| 8 | Ảnh | `image` / `cropped_image` | File ảnh (crop tỉ lệ 3:2, ≤1MB) | Không | Upload thư mục `office-image` |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `Office`, ghi log hoạt động.
- **Cancel:** quay lại BU-015, không lưu.

## Điều hướng
- Mở từ: BU-015 (danh sách văn phòng) — nút "Add new".
- Sau khi lưu: redirect về BU-015.
