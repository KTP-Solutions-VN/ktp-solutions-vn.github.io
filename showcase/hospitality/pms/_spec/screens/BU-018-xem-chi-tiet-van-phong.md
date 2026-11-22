# BU-018 — Hồ sơ văn phòng (Office Profile)

**Loại:** Trang đầy đủ (chỉ đọc)

**Route:** `BusinessUnitController::viewOffice($id)` — mặc định `/business-unit/view-office/{id}` (id mã hoá base64)

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Trang xem chi tiết (read-only) thông tin một văn phòng: tên, Đơn vị kinh doanh, phòng ban, địa chỉ, tọa độ và ảnh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên văn phòng | `name` | Text tĩnh | — | |
| 2 | Đơn vị kinh doanh | `business_unit_id` → `business_unit.name` | Text tĩnh | — | |
| 3 | Phòng ban | `department_id` (JSON) → tên vai trò | Text tĩnh | — | Nối bằng dấu phẩy |
| 4 | Địa chỉ | `address` | Text tĩnh | — | |
| 5 | Vĩ độ (Latitude) | `latitude` | Text tĩnh | — | |
| 6 | Kinh độ (Longitude) | `longitude` | Text tĩnh | — | |
| 7 | URL Google Map | `map_url` | Link (mở tab mới) | — | Hiển thị "N/A" nếu trống |
| 8 | Ảnh | `image` | Ảnh 250x250 | — | Mặc định `no-image.gif` nếu trống |

## Chức năng/nút thao tác
- Không có nút thao tác chỉnh sửa trên trang này (chỉ xem).

## Điều hướng
- Mở từ: BU-015 (danh sách văn phòng) — icon Xem.
