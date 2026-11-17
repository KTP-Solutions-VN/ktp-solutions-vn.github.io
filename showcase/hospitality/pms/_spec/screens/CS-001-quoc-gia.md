# CS-001 — Quốc gia (Countries)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::countries()` — mặc định `/common-setting/countries` (không có route đẹp riêng, route `/countries/list` trong `config/Routes.php` dòng 140 đang bị comment)

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Danh sách quản lý danh mục Quốc gia dùng chung cho toàn hệ thống (Region, District, Area, Residence... đều tham chiếu tới Country). Cho phép thêm/sửa/xóa quốc gia qua một popup dùng chung.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, không có bộ lọc riêng, sắp xếp theo `name` giảm dần):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự tăng dần |
| 2 | Tên quốc gia | `name` | |
| 3 | Ngày tạo | `created_at` | Định dạng `d M y` |
| 4 | Hành động | — | Nút Sửa, Xóa (mở popup CS-001-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-001-P1 ở chế độ Thêm mới.
- **Sửa (icon bút):** mở popup CS-001-P1 ở chế độ Sửa, nạp sẵn `name`, `id`.
- **Xóa (icon thùng rác):** mở lại cùng popup CS-001-P1 nhưng ẩn phần nhập liệu, chỉ hiện xác nhận xóa; khi xóa sẽ cascade xóa luôn các `Region`, `District`, `Area` có `country_id` tương ứng.
- Ghi log hoạt động (`_generateAccessLogs`) cho cả 3 thao tác thêm/sửa/xóa.

## Điều hướng
- Vào từ: menu Cài đặt hệ thống > Danh mục dùng chung > Quốc gia.
- Điều hướng đến: CS-001-P1 (popup Thêm/Sửa/Xóa quốc gia).
