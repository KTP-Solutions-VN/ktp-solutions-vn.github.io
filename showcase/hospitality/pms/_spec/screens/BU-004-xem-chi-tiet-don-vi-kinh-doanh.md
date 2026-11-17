# BU-004 — Xem chi tiết đơn vị kinh doanh

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::viewDetails($id)` — mặc định `/business-unit/view-details/{id}`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Trang chỉ xem (read-only) toàn bộ thông tin của một đơn vị kinh doanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đơn vị kinh doanh | `name` | Text (readonly) | — | |
| 2 | Số điện thoại | `phone_number` | Text (readonly) | — | |
| 3 | Email | `email` | Text (readonly) | — | |
| 4 | Địa chỉ | `address` | Text (readonly) | — | |
| 5 | Thành phố | `city` | Text (readonly) | — | |
| 6 | Quốc gia | `country_id` → tên quốc gia | Text (readonly) | — | |
| 7 | Khu vực/Bang | `region_id` → tên khu vực | Text (readonly) | — | |
| 8 | Đơn vị pháp nhân | `company_id` → tên công ty | Text (readonly) | — | |
| 9 | Mã bưu điện | `postal_code` | Text (readonly) | — | |

## Chức năng/nút thao tác
- Không có thao tác chỉnh sửa trên trang này (chỉ xem).
- Nếu không tìm thấy dữ liệu hoặc thiếu `id`: hiển thị flash lỗi và quay lại trang trước.

## Điều hướng
- Mở từ: BU-001 (icon Xem trên từng dòng).
- Điều hướng đến: không có (trang cuối, dùng nút Back/Breadcrumb để quay lại BU-001).
