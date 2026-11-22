# CS-004 — Thiết lập khu vực (Area Setup)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::areas()` — mặc định `/common-setting/areas`

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Danh sách quản lý danh mục Khu vực (Area) — cấp thấp hơn District, thuộc cây phân cấp địa lý Country > Region > District > Area.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo Country > Region > District > Area):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Quốc gia | `country.name` | |
| 3 | Vùng | `region.name` | |
| 4 | Quận/Huyện | `district.name` | |
| 5 | Khu vực | `name` | |
| 6 | Ngày tạo | `created_at` | `d M Y H:i` |
| 7 | Hành động | — | Sửa, Xóa (mở popup CS-004-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-004-P1 (Thêm mới).
- **Sửa:** mở popup CS-004-P1, nạp sẵn Country/Region/District/Name (dropdown Region, District cascade tải qua AJAX `getData`).
- **Xóa:** mở popup CS-004-P1 ở chế độ xác nhận xóa.

## Điều hướng
- Vào từ: menu Cấu hình > Dữ liệu tham chiếu > Thiết lập khu vực.
- Điều hướng đến: CS-004-P1 (popup Form khu vực).
