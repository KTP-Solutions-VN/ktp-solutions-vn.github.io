# ACC-032 — Quản lý xe (Vehicles)

**Loại:** Trang đầy đủ (danh sách + modal thêm/sửa/xóa ngay trong trang, không có view popup riêng)

**Route:**
- Trang chính: `AccountController::vehicles()` — mặc định `/account/vehicles` (GET để xem danh sách; POST cùng URL để add/edit/delete, xử lý theo tham số `action` trong request rồi redirect lại `referer()`)
- AJAX nạp danh sách nhân sự theo Business Unit/Team (dùng cho select "Used by" trong modal): `AccountController::getBusinessUsers()` — mặc định `/account/get-business-users` (POST, trả JSON)
- AJAX kiểm tra trùng tên xe: `AccountController::getUniqueName()` — mặc định `/account/get-unique-name` (POST, trả JSON) — được gọi qua jQuery Validate `remote` khi nhập field "Name"
- (Ngoài phạm vi, chỉ ghi nhận): validate trùng biển số dùng action `checkSerialNumber` (không thuộc phạm vi tài liệu này)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Quản lý danh sách xe (tài sản công ty loại `vehicle`) theo Business Unit: xem danh sách xe đang hoạt động/đã bán, thêm mới, sửa, xóa xe qua modal ngay trong trang; khi gán "Used by" (nhân viên sử dụng xe) hệ thống đồng thời tạo/cập nhật bản ghi `UserCompanyAsset` (loại `car`) để theo dõi tài sản được cấp cho nhân viên.

## Mô tả chi tiết

### Bộ lọc trên trang
| # | Tên field | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query `id`) | Select2 | Option "All" (`id=0`) + danh sách BU theo quyền user; khi đổi thì reload trang với `?id=<bu>` |
| 2 | Nút Active/Sold | ẩn trong `action=nothing` (submit form filter) | Toggle button | Hiện "Sold" khi đang xem Active (`Vehicle.sale_date = ''`); hiện "Active" khi đang xem Sold (`Vehicle.sale_date != ''`) |

### Bảng danh sách (DataTable `#zero_config`)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Sr No | — | Số thứ tự |
| 2 | First Name | `user.first_name` | Tên người sử dụng xe (join qua `used_by` → `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Vehicle | `name` | Tên/mã xe |
| 5 | Plate | `licence_plate` | Biển số |
| 6 | Insured till | `insured_till` | Định dạng `d M Y` |
| 7 | Vehicle mod | `updated_at` | Ngày cập nhật gần nhất, định dạng `d M Y` |
| 8 | Mod user | `modified_by` | Tên người cập nhật gần nhất |
| 9 | Action | — | Sửa, Xóa — cột này **ẩn** nếu `user_type` là `Business Unit Manager` hoặc `Employee` |

Điều kiện lấy dữ liệu: `Vehicle.assets_type = 'vehicle'`, lọc theo `business_unit_id` (theo BU chọn hoặc theo `selected_business` của user), và `sale_date = ''` (Active) hoặc `sale_date != ''` (Sold) tùy trạng thái đang xem; contain `User`; sắp xếp theo `Vehicle.name ASC`.

### Form modal "Add/Edit Vehicle" (`#addVehicle`, cùng 1 modal dùng chung cho Add và Edit)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (BU theo quyền user) | Có | |
| 2 | Vehicle type | `vtype` | Select2: Car / Lorry / Pick-up / Samlo / Motorcycle | Có | |
| 3 | Name | `name` | Text | Có | Validate remote trùng tên qua `getUniqueName` (loại trừ chính nó khi edit) |
| 4 | Brand | `brand` | Text | Có | |
| 5 | Color | `color` | Text | Có | |
| 6 | Team | `team` | Select2: Cleaning / Maintenance / Garden / Pool / Back Office | Có | Đổi giá trị sẽ AJAX `getBusinessUsers` để nạp lại "Used by" |
| 7 | Used by (staff) | `staff` | Select2 (nhân sự Active, `user_type = Employee`, thuộc BU/Team đã chọn, loại trừ user đã được gán tài sản `car` khác — trừ chính xe đang sửa) | Không | Nạp qua AJAX `getBusinessUsers`; nếu chọn thì ghi/cập nhật `UserCompanyAsset` |
| 8 | License plate | `lplate` | Text | Có | Validate remote trùng biển số qua `checkSerialNumber` |
| 9 | Sale date | `sdate` | Text + datepicker `dd-mm-yyyy` | Không | Chỉ hiện khi Edit (`#srow`) |
| 10 | Acquisition date | `adate` | Text + datepicker `dd-mm-yyyy` | Không | |
| 11 | Price | `price` | Text (format số khi gõ) | Không | Field `acquisition_price` |
| 12 | Insurance | `insurance` | Text | Không | |
| 13 | Insurance till | `insurance-till` | Text + datepicker `dd-mm-yyyy` (`startDate: '-0d'`) | Không | |

## Chức năng/nút thao tác
- **Add new (nút "Add new", ẩn nếu `user_type` là Business Unit Manager/Employee):** mở modal `#addVehicle` ở chế độ thêm mới, submit POST `action=add` tới `vehicles`; server tạo bản ghi `Vehicle` (`status='active'`, `assets_type` mặc định), nếu có chọn "Used by" thì tạo thêm `UserCompanyAsset` (`assets='car'`, `received_on=now`, `approved_by=user hiện tại`); ghi access log; redirect về trang trước.
- **Sửa (icon bút, ẩn nếu Business Unit Manager/Employee):** mở modal ở chế độ sửa (nạp sẵn dữ liệu từ `data-*` attribute của nút), submit POST `action=edit`; cập nhật `Vehicle`, nếu có "Used by" thì cập nhật/tạo lại `UserCompanyAsset` tương ứng theo `serial_number = id xe`.
- **Xóa (icon thùng rác, chỉ hiện với `user_type = Superadmin`):** mở modal ở chế độ xác nhận xóa, submit POST `action=delete`; server xóa `UserCompanyAsset` liên kết (theo `serial_number`) rồi xóa `Vehicle`; ghi access log; redirect về trang trước.
- **Nạp lại "Used by" theo Business Unit/Team/Loại xe:** AJAX `getBusinessUsers` (`form_name=vehical`) mỗi khi đổi `business_unit`, `team`, hoặc `vtype` trong modal — loại trừ nhân sự đã được gán xe khác (giữ lại nhân sự đang gán cho chính xe đang sửa).
- **Kiểm tra trùng tên xe:** AJAX `getUniqueName` khi rời khỏi field "Name" (jQuery Validate remote).
- **Toggle Active/Sold:** nút submit form filter (`#filter`), chuyển điều kiện `Vehicle.sale_date` để xem xe đang hoạt động hay đã bán.
- **Đổi Business Unit:** reload trang với query `?id=<business_unit>`.

## Điều hướng
- Vào từ: Sidebar > Account & HR > Settings (submenu) > **Assets > Vehicles**.
- Điều hướng đến: không có trang con dạng URL riêng — toàn bộ thao tác thêm/sửa/xóa xử lý qua modal JS (`#addVehicle`) ngay trên trang này, không phải các view `.ctp` popup riêng biệt (không tồn tại `add_vehicle.ctp`/`edit_vehicle.ctp`). Sau khi lưu/xóa, trang tự redirect lại chính nó (`referer()`).
