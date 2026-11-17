# CS-008 — Đơn vị (Units)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::units()` — mặc định `/common-setting/units`

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Danh sách quản lý danh mục Unit (căn hộ/đơn vị cho thuê) — cấp con của Residence, thấp nhất trong cây phân cấp địa lý Country > Region > District > Area > Residence > Unit.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo Country > Region > District > Area > Residence > Unit):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Quốc gia | `country.name` | |
| 3 | Vùng | `region.name` | |
| 4 | Quận/Huyện | `district.name` | |
| 5 | Khu vực | `area.name` | |
| 6 | Residence | `residence.name` | |
| 7 | Unit | `name` | |
| 8 | Ngày tạo | `created_at` | `d M Y H:i` |
| 9 | Hành động | — | Sửa, Xóa (mở popup CS-008-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-008-P1 ở chế độ Thêm mới, hỗ trợ nhập/thêm nhiều Unit cùng lúc dưới dạng danh sách "chip".
- **Sửa:** mở popup CS-008-P1 ở chế độ Sửa (chỉ 1 Unit, cascade Region/District/Area/Residence qua AJAX `getData`).
- **Xóa:** mở popup CS-008-P1 ở chế độ xác nhận xóa.

## Điều hướng
- Vào từ: menu Cài đặt hệ thống > Danh mục dùng chung > Unit.
- Điều hướng đến: CS-008-P1 (popup Thêm/Sửa/Xóa unit).
