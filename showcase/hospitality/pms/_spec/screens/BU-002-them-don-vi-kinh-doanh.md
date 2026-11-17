# BU-002 — Thêm đơn vị kinh doanh

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::add()` — mặc định `/business-unit/add`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Form thêm mới một đơn vị kinh doanh (Business Unit), gồm thông tin liên hệ, vị trí địa lý, cấu hình pháp nhân, tiền tệ mặc định và ảnh đại diện/logo.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đơn vị kinh doanh | `name` | Text | Có | Tối thiểu 2 ký tự |
| 2 | Tên viết tắt | `short_name` | Text | Có | Tối thiểu 2 ký tự |
| 3 | Số điện thoại | `phone_number` | Text | Không | |
| 4 | Email | `email` | Email | Có | |
| 5 | Địa chỉ | `address` | Text | Không | |
| 6 | Beds24 API Key | `beds_24_api_key` | Text | Không | Khóa kết nối OTA Beds24 |
| 7 | Quốc gia | `country_id` | Select | Có | Load động danh sách Region theo quốc gia đã chọn (AJAX) |
| 8 | Khu vực/Bang | `region_id` | Select | Có | Phụ thuộc quốc gia đã chọn |
| 9 | Tiền tệ mặc định | `currency_id` | Select | Có | |
| 10 | Đơn vị pháp nhân | `company_id` | Select | Không | |
| 11 | Chi nhánh pháp nhân | `subsidiary_id` | Select | Không | Load động theo đơn vị pháp nhân đã chọn (AJAX) |
| 12 | Airbnb mặc định | `default_airbnb` | Select | Có | Danh sách các kênh có tên chứa "Airbnb" |
| 13 | Loại sở hữu (Ownership) | `ownership` | Select (`Azura Stays` / `Partner`) | Có | |
| 14 | Ảnh đại diện | `image` / `cropped_image` | File ảnh (crop) | Không | Upload thư mục `villas`, hỗ trợ cắt ảnh trước khi lưu |
| 15 | Logo | `logo` | File ảnh | Không | Upload thư mục `business-unit-logo` |

## Chức năng/nút thao tác
- **Save:** kiểm tra dữ liệu, upload ảnh/logo, lưu bản ghi `BusinessUnit`, ghi log hoạt động, hiển thị flash thành công và điều hướng về BU-001.
- **Cancel/Back:** quay lại BU-001 không lưu.
- Trùng tên đơn vị kinh doanh được kiểm tra qua action `checkBusinessUnit` (AJAX, không phải giao diện riêng).

## Điều hướng
- Mở từ: BU-001 (nút "Add new").
- Sau khi lưu: quay về BU-001.
