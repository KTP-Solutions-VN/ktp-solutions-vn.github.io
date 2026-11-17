# CS-007 — Loại địa điểm (Location Types)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::locationTypes()` — mặc định `/common-setting/location-types`

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Danh sách quản lý danh mục Loại địa điểm villa (`VillaLocationType`) — ví dụ: Beachfront, Hillside, City center...

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo `name` giảm dần):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên loại địa điểm | `name` | |
| 3 | Ngày tạo | `created_at` | `d M Y H:i` |
| 4 | Hành động | — | Sửa, Xóa (mở popup CS-007-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-007-P1 (Thêm mới).
- **Sửa:** mở popup CS-007-P1, nạp sẵn `name`.
- **Xóa:** mở popup CS-007-P1 ở chế độ xác nhận xóa.

## Điều hướng
- Vào từ: menu Cài đặt hệ thống > Danh mục dùng chung > Loại địa điểm.
- Điều hướng đến: CS-007-P1 (popup Thêm/Sửa/Xóa loại địa điểm).
