# BU-007 — Thiết lập tiền tệ (Currency Setup)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::currency()` — mặc định `/business-unit/currency`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Danh sách các loại tiền tệ (Currency) được cấu hình trong hệ thống, dùng làm cơ sở cho tỷ giá quy đổi (BU-008) và các đơn vị kinh doanh/tài khoản. Cho phép thêm, sửa, xóa ngay trên trang qua popup.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự tăng dần |
| 2 | Tên tiền tệ | `name` | |
| 3 | Quốc gia | `country_id` → `country.name` | |
| 4 | Mã | `code` | Mã ISO tiền tệ |
| 5 | Ký hiệu | `sign` | |
| 6 | Ngày tạo | `created_at` | Định dạng `d M y` |
| 7 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Rates:** điều hướng sang BU-008 (Tỷ giá ngoại tệ).
- **Add new** (chỉ hiển thị với user `Superadmin`): mở popup BU-007-P1 ở chế độ Thêm mới.
- **Sửa (icon bút):** mở popup BU-007-P1 ở chế độ Sửa, nạp sẵn dữ liệu dòng đã chọn.
- **Xóa (icon thùng rác):** mở popup BU-007-P2 xác nhận xóa.

## Điều hướng
- Vào từ: menu Settings.
- Điều hướng đến: BU-008 (Tỷ giá ngoại tệ), BU-007-P1 (popup thêm/sửa), BU-007-P2 (popup xác nhận xóa).
