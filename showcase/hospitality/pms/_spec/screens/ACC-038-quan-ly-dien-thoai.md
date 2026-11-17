# ACC-038 — Quản lý điện thoại (Phones)

**Loại:** Trang đầy đủ

**Route:** `AccountController::phones()` — mặc định `/account/phones`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Quản lý danh sách điện thoại (tài sản công ty, bảng `Vehicle` với `assets_type = 'phone'`) theo từng Business Unit: xem danh sách, thêm mới, sửa, xóa qua modal trên cùng trang.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, lọc theo Business Unit đang chọn):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr. No | — | Số thứ tự |
| 2 | First Name | `user.first_name` | Tên người đang sử dụng (`used_by` → join `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Brand | `brand` | Nhãn hiệu |
| 5 | Model | `name` | Tên model điện thoại |
| 6 | Serial Number | `licence_plate` | Lưu chung field `licence_plate` của bảng `Vehicle` |
| 7 | Acquisition Date | `acquisition_date` | Định dạng `d M Y` |
| 8 | Acquisition Price | `acquisition_price` | |
| 9 | Vehicle Modified (ngày sửa) | `updated_at` | Định dạng `d M Y` |
| 10 | Modified By | `modified_by` | |
| 11 | Hành động | — | Sửa, Xóa — chỉ hiện với user không phải Business Unit Manager/Employee (nút Xóa chỉ hiện với Superadmin) |

Bộ lọc:
- **Business Unit** (`business_unit1`, select2): chọn BU → reload trang `phones?id=<business_unit_id>`. Danh sách BU lấy theo quyền user (`_getAuthBasedBuVilla`), có option "All" (id = 0).

Điều kiện query: `Vehicle.assets_type = 'phone'` và `Vehicle.business_unit_id` theo BU đang chọn (hoặc theo `selected_business` của user nếu không truyền `id`), contain `User` (người dùng qua bảng liên kết `UserCompanyAsset.serial_number = Vehicle.id`).

## Chức năng/nút thao tác
- **Add new:** mở modal `#addVehicle` (cùng trang, không có view riêng) ở chế độ thêm mới — nhập Business Unit, Brand, Model, Serial Number, Used By, Acquisition Date, Acquisition Price.
  - Submit POST về chính action `phones()` với `action = add`: lưu bản ghi mới vào `Vehicle` (`assets_type = 'phone'`, `status = active`), nếu có chọn `used_by` thì tạo thêm bản ghi `UserCompanyAsset` (gán tài sản cho nhân viên).
- **Sửa (icon bút):** mở modal `#addVehicle` cùng trang ở chế độ sửa, nạp sẵn dữ liệu từ `data-*` attribute của dòng. Submit với `action = edit`: cập nhật `Vehicle` theo `id`, đồng bộ lại `UserCompanyAsset` nếu có `used_by`.
- **Xóa (icon thùng rác, chỉ Superadmin):** mở modal `#addVehicle` ở chế độ xác nhận xóa. Submit với `action = delete`: xóa mềm `UserCompanyAsset` liên quan rồi xóa mềm `Vehicle` theo `id`.
- Modal dùng chung 1 form (`#popup_form`) cho cả 3 thao tác, phân biệt qua field ẩn `action`.
- Validate: Serial Number bắt buộc, kiểm tra trùng qua AJAX `account/checkSerialNumber` (type = `phone`); Business Unit, Model, Brand bắt buộc.
- Khi đổi Business Unit trong modal: AJAX `account/getBusinessUsers` để nạp lại danh sách nhân viên (Used By) theo BU.

## Điều hướng
- Vào từ: Sidebar > Account & HR > Phones (`active_menu = 'acc-phones'`).
- Không điều hướng sang trang khác — toàn bộ thao tác thêm/sửa/xóa thực hiện qua modal ngay trên trang này.
