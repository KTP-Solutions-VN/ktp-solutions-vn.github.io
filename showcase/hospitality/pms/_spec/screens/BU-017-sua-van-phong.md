# BU-017 — Sửa văn phòng

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::editOffice($id)` — mặc định `/business-unit/edit-office/{id}` (id mã hoá base64)

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Biểu mẫu chỉnh sửa thông tin một văn phòng đã tồn tại — cùng bộ field với BU-016 (Thêm văn phòng), nạp sẵn dữ liệu hiện có.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên văn phòng | `name` | Text | Có | |
| 2 | Đơn vị kinh doanh | `business_unit_id` | Select (select2) | Có | |
| 3 | Phòng ban | `department_id[]` | Checkbox (nhiều) | Có | Nạp sẵn theo `department_id` hiện có |
| 4 | Địa chỉ | `address` | Text | Có | |
| 5 | Vĩ độ (Latitude) | `latitude` | Text | Có | |
| 6 | Kinh độ (Longitude) | `longitude` | Text | Có | |
| 7 | URL Google Map | `map_url` | Text | Có | |
| 8 | Ảnh | `image` / `cropped_image` | File ảnh (crop tỉ lệ 3:2, ≤1MB) | Không | Giữ ảnh cũ nếu không chọn ảnh mới |

## Chức năng/nút thao tác
- **Save:** cập nhật bản ghi `Office`, ghi log hoạt động.
- **Cancel:** quay lại BU-015, không lưu.

## Điều hướng
- Mở từ: BU-015 (danh sách văn phòng) — icon Sửa trên từng dòng.
- Sau khi lưu: redirect về BU-015.
