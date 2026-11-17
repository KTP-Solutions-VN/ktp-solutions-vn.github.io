# OWP-006 — Chi tiết biệt thự (Property ID Card)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::viewDetails($villa_id)` — không có route đẹp riêng, truy cập từ OWP-005 (mặc định `/external-user/view-details/{villa_id}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Trang "thẻ định danh" (ID Card) hiển thị đầy đủ thông tin chi tiết của một biệt thự — chỉ xem, không có form chỉnh sửa. Gồm các khối thông tin: Định danh, OTA, Tình trạng hợp đồng kinh doanh, Vị trí, Loại hình bất động sản.

## Mô tả chi tiết

Bảng field (chỉ đọc), nhóm theo khối thông tin:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| **Định danh (Identification)** ||||| |
| 1 | Tên biệt thự | name | Text (hiển thị) | — | |
| 2 | Tên viết tắt | short_name | Text (hiển thị) | — | |
| 3 | Chủ sở hữu | owner | Text (hiển thị) | — | |
| 4 | Loại hình dịch vụ | type_of_services | Text (hiển thị) | — | |
| 5 | Hạng giá | price_category | Text (hiển thị) | — | |
| 6 | Trạng thái | status | Text/badge | — | Open/Paused/Closed |
| 7 | Tiền tệ tham chiếu | reference_currency | Text (hiển thị) | — | |
| 8 | Ảnh mặt tiền | front_image | Hình ảnh | — | |
| 9 | Ảnh cổng | gate_image | Hình ảnh | — | |
| **OTA** ||||| |
| 10 | Danh sách liên kết OTA | ota links | Danh sách link | — | Tên kênh OTA + link (mở tab mới) |
| **Tình trạng hợp đồng kinh doanh (Business Situation)** ||||| |
| 11 | Ngày ký hợp đồng | contact_signing_date | Ngày (hiển thị) | — | |
| 12 | Ngày gia hạn hợp đồng tiếp theo | next_contact_renewal_date | Ngày (hiển thị) | — | |
| 13 | % Hoa hồng cho thuê | percentage_rental_commission | Số (hiển thị) | — | |
| **Vị trí (Location)** ||||| |
| 14 | Địa chỉ | address | Text (hiển thị) | — | |
| 15 | Quốc gia | country | Text (hiển thị) | — | |
| 16 | Vùng | region | Text (hiển thị) | — | |
| 17 | Quận/Huyện | district | Text (hiển thị) | — | |
| 18 | Khu vực | area | Text (hiển thị) | — | |
| 19 | Loại vị trí | location_type | Text (hiển thị) | — | |
| 20 | Khu dân cư | residence | Text (hiển thị) | — | |
| 21 | URL Google Map | google_map_url | Link | — | |
| **Loại hình bất động sản (Property Type)** ||||| |
| 22 | Số phòng ngủ | number_of_bedrooms | Số (hiển thị) | — | |
| 23 | Số phòng tắm | number_of_bathrooms | Số (hiển thị) | — | |
| 24 | Số khách tối đa | number_of_guests | Số (hiển thị) | — | |
| 25 | Cấp độ sang trọng | luxury_level | Text (hiển thị) | — | |
| 26 | Mục đích sử dụng | property_usage | Danh sách tag | — | |
| 27 | Tiện ích tiếp cận | property_accessible | Text (hiển thị) | — | |
| 28 | Hoạt động | property_activities | Danh sách tag | — | |
| 29 | Phương tiện di chuyển | property_transport | Danh sách tag | — | |
| 30 | Có hồ bơi | is_pool | Text (hiển thị) | — | |
| 31 | Chiều dài hồ bơi | pool_length | Số (hiển thị) | — | Hiện khi có hồ bơi |
| 32 | Chiều rộng hồ bơi | pool_width | Số (hiển thị) | — | Hiện khi có hồ bơi |
| 33 | Độ sâu hồ bơi | pool_depth | Số (hiển thị) | — | Hiện khi có hồ bơi |
| 34 | Hệ thống lọc hồ bơi | pool_system | Text (hiển thị) | — | Hiện khi có hồ bơi |

## Chức năng/nút thao tác

- Xem chi tiết thông tin biệt thự (không có chức năng chỉnh sửa)
- Mở link OTA (mở tab mới)

## Điều hướng

- Vào từ OWP-005 Danh sách biệt thự (click tên biệt thự hoặc icon xem)
- Không điều hướng tiếp tới màn hình khác trong trang này (breadcrumb quay lại OWP-005)
