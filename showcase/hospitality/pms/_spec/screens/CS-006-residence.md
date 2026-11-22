# CS-006 — Thiết lập khu căn hộ (Residence Setup)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::residences()` — mặc định `/common-setting/residences`

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Danh sách quản lý danh mục Residence (khu/cụm bất động sản) — cấp con của Area, có ảnh đại diện, thông tin liên hệ và mã riêng, dùng làm cha cho danh mục Unit (CS-008).

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo Country > Region > District > Area > Residence):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Photo | `image` | Ảnh thu nhỏ (tỉ lệ 3:2), placeholder nếu chưa có ảnh |
| 3 | Quốc gia | `country.name` | |
| 4 | Vùng | `region.name` | |
| 5 | Quận/Huyện | `district.name` | |
| 6 | Khu vực | `area.name` | |
| 7 | Residence | `name` | |
| 8 | Ngày tạo | `created_at` | `d M Y H:i` |
| 9 | Hành động | — | Sửa, Xóa (mở popup CS-006-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-006-P1 (Thêm mới).
- **Sửa:** mở popup CS-006-P1, nạp sẵn toàn bộ thông tin + ảnh hiện tại (cascade Region/District/Area qua AJAX `getData`).
- **Xóa:** mở popup CS-006-P1 ở chế độ xác nhận xóa; khi xóa thành công sẽ xóa luôn file ảnh vật lý đính kèm (nếu có).
- Kiểm tra trùng lặp: khi Thêm/Sửa, hệ thống kiểm tra server-side tổ hợp (`country_id`,`region_id`,`district_id`,`area_id`,`name`) đã tồn tại chưa (`checkResidence`), nếu trùng sẽ báo lỗi và không lưu.

## Điều hướng
- Vào từ: menu Cấu hình > Dữ liệu tham chiếu > Residence Setup.
- Điều hướng đến: CS-006-P1 (popup Form khu căn hộ); dữ liệu Residence được dùng làm dropdown cha ở CS-008 (Thiết lập căn).
