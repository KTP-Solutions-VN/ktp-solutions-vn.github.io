# BU-019 — Danh sách ngân hàng (Banks)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::banks()` — mặc định `/business-unit/banks`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Danh sách các ngân hàng được cấu hình sẵn trong hệ thống, dùng khi tạo tài khoản (Account) tại BU-010.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config0`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên ngân hàng | `name` | |
| 2 | Tên viết tắt | `short_name` | |
| 3 | Logo | `logo` | Ảnh thumbnail 100x100, mặc định `no-image.gif` |
| 4 | Quốc gia | `country_name` | |
| 5 | Địa chỉ | `address` | |
| 6 | Ngày tạo | `created_at` | Định dạng `d M y` |
| 7 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add new:** điều hướng sang BU-020 (Thêm ngân hàng).
- **Sửa (icon bút):** điều hướng sang BU-021 (Sửa ngân hàng).
- **Xóa (icon thùng rác):** mở popup BU-019-P1 xác nhận xóa.

## Điều hướng
- Vào từ: menu Settings.
- Điều hướng đến: BU-020 (Thêm), BU-021 (Sửa), BU-019-P1 (popup xác nhận xóa).
