# BU-003 — Sửa đơn vị vận hành (Edit Operating Unit)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::edit($id)` — mặc định `/business-unit/edit/{id_base64}`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Form chỉnh sửa thông tin một đơn vị kinh doanh đã tồn tại — cùng bộ field với BU-002 (Thêm mới), dữ liệu được nạp sẵn từ bản ghi hiện có.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đơn vị kinh doanh | `name` | Text | Có | |
| 2 | Tên viết tắt | `short_name` | Text | Có | |
| 3 | Số điện thoại | `phone_number` | Text | Không | |
| 4 | Email | `email` | Email | Có | |
| 5 | Địa chỉ | `address` | Text | Không | |
| 6 | Beds24 API Key | `beds_24_api_key` | Text | Không | |
| 7 | Quốc gia | `country_id` | Select | Có | Giá trị mặc định = quốc gia hiện tại |
| 8 | Khu vực/Bang | `region_id` | Select | Có | Danh sách Region được truy vấn sẵn theo `country_id` hiện tại |
| 9 | Tiền tệ mặc định | `currency_id` | Select | Có | |
| 10 | Đơn vị pháp nhân | `company_id` | Select | Không | |
| 11 | Chi nhánh pháp nhân | `subsidiary_id` | Select | Không | Danh sách chi nhánh truy vấn sẵn theo `company_id` hiện tại |
| 12 | Airbnb mặc định | `default_airbnb` | Select | Có | |
| 13 | Loại sở hữu (Ownership) | `ownership` | Select (`Azura Stays` / `Partner`) | Có | |
| 14 | Ảnh đại diện | `image` / `cropped_image` | File ảnh (crop) | Không | Nếu không chọn ảnh mới, giữ nguyên ảnh cũ |
| 15 | Logo | `logo` | File ảnh | Không | Nếu không chọn ảnh mới, giữ nguyên logo cũ |

## Chức năng/nút thao tác
- **Save:** cập nhật bản ghi `BusinessUnit`, ghi log hoạt động, hiển thị flash thành công và điều hướng về BU-001.
- **Cancel/Back:** quay lại BU-001 không lưu.
- Nếu `id` không hợp lệ hoặc không tìm thấy dữ liệu: hiển thị lỗi và quay lại trang trước.

## Điều hướng
- Mở từ: BU-001 (icon Sửa trên từng dòng).
- Sau khi lưu: quay về BU-001.
