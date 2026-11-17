# BU-014 — Sửa vùng kinh doanh

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::editZoning($id)` — mặc định `/business-unit/edit-zoning/{id}` (id mã hoá base64)

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Biểu mẫu chỉnh sửa tên tùy chỉnh và danh sách Đơn vị kinh doanh thuộc một vùng đã tồn tại. Mã vùng (`zone_name`) chỉ đọc, không sửa được.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vùng | `zone_name` | Text (readonly) | — | Không cho sửa |
| 2 | Tên tùy chỉnh | `custom_name` | Text | Có | |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox (nhiều) | Có | Nạp sẵn theo `business_unit_ids` hiện có |

## Chức năng/nút thao tác
- **Save:** cập nhật bản ghi `BusinessUnitZone`, ghi log hoạt động.
- **Cancel:** quay lại BU-012, không lưu.

## Điều hướng
- Mở từ: BU-012 (danh sách vùng kinh doanh) — icon Sửa trên từng dòng.
- Sau khi lưu: redirect về BU-012.
