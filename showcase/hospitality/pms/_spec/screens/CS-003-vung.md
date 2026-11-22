# CS-003 — Thiết lập vùng (Region Setup)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::regions()` — mặc định `/common-setting/regions`

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Danh sách quản lý danh mục Vùng (Region) trực thuộc một Quốc gia, kèm số lượng villa đang hoạt động/ngừng hoạt động thuộc vùng đó.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo `Country.name`, `Region.name`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Quốc gia | `country.name` | |
| 3 | Vùng | `name` | Kèm 2 số trong ngoặc: số villa Active / số villa Inactive thuộc vùng (tooltip) |
| 4 | Ngày tạo | `created_at` | Định dạng `d M Y H:i` |
| 5 | Hành động | — | Sửa, Xóa (mở popup CS-003-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-003-P1 (Thêm mới).
- **Sửa:** mở popup CS-003-P1, nạp sẵn `country`, `name`.
- **Xóa:** mở popup CS-003-P1 ở chế độ xác nhận xóa; xóa cascade toàn bộ `District`, `Area` có `region_id` tương ứng.

## Điều hướng
- Vào từ: menu Cấu hình > Dữ liệu tham chiếu > Thiết lập vùng.
- Điều hướng đến: CS-003-P1 (popup Form vùng).
