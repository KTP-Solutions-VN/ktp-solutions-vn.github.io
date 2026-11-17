# BU-015 — Danh sách văn phòng (Offices)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::offices()` — mặc định `/business-unit/offices`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Danh sách các văn phòng vật lý gắn với từng Đơn vị kinh doanh, kèm phòng ban trực thuộc.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên văn phòng | `name` | |
| 2 | Đơn vị kinh doanh | `business_unit_id` → `business_unit.name` | |
| 3 | Phòng ban | `department_id` (JSON) → tên vai trò | Nối bằng dấu phẩy |
| 4 | Ngày tạo | `created_at` | Định dạng `d M Y H:i` |
| 5 | Hành động | — | Xem, Sửa, Xóa |

## Chức năng/nút thao tác
- **Add new:** điều hướng sang BU-016 (Thêm văn phòng).
- **Xem (icon mắt):** điều hướng sang BU-018 (Xem chi tiết văn phòng).
- **Sửa (icon bút):** điều hướng sang BU-017 (Sửa văn phòng).
- **Xóa (icon thùng rác):** mở popup BU-015-P1 xác nhận xóa; xác nhận điều hướng tới `delete-office/{id}` (id mã hoá base64 qua JS `btoa`).

## Điều hướng
- Vào từ: menu Settings.
- Điều hướng đến: BU-016 (Thêm), BU-017 (Sửa), BU-018 (Xem chi tiết), BU-015-P1 (popup xác nhận xóa).
