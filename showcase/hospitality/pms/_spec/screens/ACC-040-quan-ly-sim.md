# ACC-040 — Thuê bao di động (Mobile Lines)

**Loại:** Trang đầy đủ

**Route:** `AccountController::simCards()` — mặc định `/account/sim-cards`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Quản lý danh sách SIM điện thoại (tài sản công ty, bảng `Vehicle` với `assets_type = 'sim_card'`) theo từng Business Unit: xem danh sách, thêm mới, sửa, xóa qua modal trên cùng trang.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, lọc theo Business Unit đang chọn):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr. No | — | Số thứ tự |
| 2 | First Name | `user.first_name` | Tên người đang sử dụng (`used_by` → join `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Provider | `name` | Nhà mạng cung cấp SIM |
| 5 | SIM Number | `licence_plate` | Lưu ở field `licence_plate`, nhập từ `phone_number` |
| 6 | Starting Date | `acquisition_date` | Định dạng `d M Y` |
| 7 | Monthly Fees | `acquisition_price` | |
| 8 | Vehicle Modified (ngày sửa) | `updated_at` | Định dạng `d M Y` |
| 9 | Modified By | `modified_by` | |
| 10 | Hành động | — | Sửa, Xóa — chỉ hiện với user không phải Business Unit Manager/Employee (nút Xóa chỉ hiện với Superadmin) |

Bộ lọc:
- **Business Unit** (`business_unit1`, select2): chọn BU → reload trang `sim-cards?id=<business_unit_id>`. Danh sách BU lấy theo quyền user (`_getAuthBasedBuVilla`), có option "All" (id = 0).

Điều kiện query: `Vehicle.assets_type = 'sim_card'` và `Vehicle.business_unit_id` theo BU đang chọn (hoặc theo `selected_business` của user nếu không truyền `id`), contain `User`.

## Chức năng/nút thao tác
- **Add new:** mở modal `#addVehicle` (cùng trang, không có view riêng) ở chế độ thêm mới — nhập Business Unit, Provider (`name`), SIM Number (`phone_number`), Used By, Starting Date, Monthly Fees.
  - Submit POST về chính action `simCards()` với `action = add`: lưu bản ghi mới vào `Vehicle` (`assets_type = 'sim_card'`, `status = active`), nếu có chọn `used_by` thì tạo thêm bản ghi `UserCompanyAsset`.
- **Sửa (icon bút):** mở modal `#addVehicle` cùng trang ở chế độ sửa, nạp sẵn dữ liệu từ `data-*` attribute của dòng. Submit với `action = edit`: cập nhật `Vehicle` theo `id`, đồng bộ lại `UserCompanyAsset` nếu có `used_by`.
- **Xóa (icon thùng rác, chỉ Superadmin):** mở modal `#addVehicle` ở chế độ xác nhận xóa. Submit với `action = delete`: xóa mềm `UserCompanyAsset` liên quan rồi xóa mềm `Vehicle` theo `id`.
- Modal dùng chung 1 form (`#popup_form`) cho cả 3 thao tác, phân biệt qua field ẩn `action`.
- Validate: SIM Number (`phone_number`) bắt buộc, kiểm tra trùng qua AJAX `account/checkSerialNumber` (type = `sim_card`); Business Unit bắt buộc.
- Khi đổi Business Unit trong modal: AJAX `account/getBusinessUsers` để nạp lại danh sách nhân viên (Used By) theo BU.

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > Mobile Lines (`active_menu = 'acc-simCards'`).
- Không điều hướng sang trang khác — toàn bộ thao tác thêm/sửa/xóa thực hiện qua modal ngay trên trang này.
