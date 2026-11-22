# PROP-050 — Trình chỉnh sửa tài sản (Property Editor)

**Loại:** Trang đầy đủ
**Route:** property/villa/:tab/:villa_id (dashed mặc định; `$villa_id` rỗng khi thêm mới)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Màn hình trung tâm để tạo mới/chỉnh sửa toàn bộ thông tin của một Property (Villa), tổ chức theo 11 tab lớn: Identification (Thông tin định danh), Business Situation (Tình trạng kinh doanh), Location (Vị trí), Property Type (Loại hình BĐS), OTA Management (Quản lý kênh OTA), Service and Utilities (Dịch vụ & Tiện ích — nhúng lại nội dung PROP-049), Document (Tài liệu), Language Management (Quản lý ngôn ngữ), Control (Điểm kiểm soát/Nhắc nhở khi Check-out), Finance (Tài chính), Portal Contract (Hợp đồng cổng thông tin khách). Mỗi tab có form lưu riêng, dữ liệu tổng hợp từ nhiều bảng liên quan tới Villa.

## Mô tả chi tiết

### Tab Identification (Thông tin định danh)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Name | `name` | Text | Có | Kiểm tra trùng tên qua AJAX `checkVillaName` |
| 2 | Short Name | `short_name` | Text | Không | |
| 3 | Business Unit | `business_unit_id` | Select2 | Có | |
| 4 | Company Subsidiary | `company_subsidiary_name` | Select2 | Không | |
| 5 | Owner | `owner_id` | Select2 | Có | |
| 6 | Owner Staff | `owner_staff_id` | Select2 | Không | |
| 7 | Manager | `manager_id` | Select2 (multi) | Không | |
| 8 | Agency | `agency_id` | Select2 | Không | |
| 9 | Property Type | `villa_type_id` | Select2 | Có | |
| 10 | Price Category | `price_category_id` | Select2 | Không | |
| 11 | Price 1 / Price 2 | `price_1`/`price_2` | Number | Không | |
| 12 | Reference Currency | `reference_currency` | Select2 | Không | |
| 13 | Room ID 1-4 | `room_id_1..4` | Text | Không | Liên kết PROP-017 (Mã phòng chưa ánh xạ) |
| 14 | Beds24 Villa ID (chính, phụ, thứ 2) | `beds_24_villa_id`/`additional_beds_24_id`/`secondary_beds_24_villa_id_1` | Text | Không | Kiểm tra trùng qua AJAX `checkVillaBeds24Id` |
| 15 | Hostex Villa ID | `hostex_villa_id` | Text | Không | |
| 16 | Channel Manager | `channel_manager` | Select | Không | |
| 17 | OTA Listing Data | `ota_listing_data` | Textarea | Không | |
| 18 | Villa Front/Back Image | `villa_front`/`villa_back` | Upload ảnh | Không | |

### Tab Business Situation (Tình trạng kinh doanh)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Status | `status` | Select | Có | Trạng thái Property (Open/Closed/...) |
| 2 | Ownership Type | `ownership_type` | Select | Có | Management/Partnership/Sub-lease/Ownership — đổi giá trị hiện form con tương ứng |
| 3 | Document Title/Type | `document_title`/`document` | Text/Upload | Không | Tài liệu hợp đồng đính kèm |
| 4a | (Management) Signing/Renewal Date | `signing_date`/`renewal_date` | Datepicker | Có (khi Management) | Trong element `situation_management` |
| 4b | (Management) Payment Frequency/After/Date/Fees | `payment_frequency`/`payment_after`/`payment_date`/`payment_fees[]`/`after`/`other_data[]` | Select/Number/Checkbox | Không | Checkbox nhóm dịch vụ do Agency/Owner đảm nhiệm |
| 5a | (Partnership) Signing/Renewal Date, Payment Frequency/Fees | tương tự Management | | Không | Trong element `situation_partnership` |
| 5b | (Ownership) Payment Fees | `payment_fees[]`/`other_data[]` | Checkbox | Không | Trong element `situation_ownership` |
| 5c | (Sub-lease) First Day Rental/Next Renewal/Rental Amount/Deposit Amount/Payment Frequency/Fees | `first_day_rental`/`next_renewal`/`rental_amount`/`deposit_amount`/`payment_frequency`/`payment_fees[]` | Datepicker/Number/Select/Checkbox | Không | Trong element `situation_sub_lease` |

### Tab Location (Vị trí)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 | Có | |
| 2 | Region | `region_id` | Select2 | Có | |
| 3 | District | `district_id` | Select2 | Không | |
| 4 | Area | `area_id` | Select2 | Có | |
| 5 | Residence | `residence_id` | Select2 | Không | Liên kết PROP-046/047 |
| 6 | Unit | `unit_id` | Select2 | Không | |
| 7 | Villa Location Type | `villa_location_type_id` | Select | Không | |
| 8 | Address | `address` | Textarea | Có | |
| 9 | Latitude/Longitude | `lat`/`lng` | Text/Number | Không | |
| 10 | Google Map URL | `google_map_url` | Text | Không | |

### Tab Property Type (Loại hình BĐS)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Number of Guests | `number_of_guests` | Number | Có | |
| 2 | Number of Beds | `number_of_beds` | Number | Có | |
| 3 | Number of Bathrooms | `number_of_bathrooms` | Number | Có | |
| 4 | Luxury Level | `luxury_level` | Select | Không | |
| 5 | Villa Accessible | `villa_accessible` | Checkbox/Select | Không | |
| 6 | Is Pool | `is_pool` | Checkbox | Không | Bật/tắt hiện form Pool (Length/Width/Depth) |
| 7 | Pool Length/Width/Depth | `pool_length`/`pool_width`/`pool_depth` | Number | Không (bắt buộc nếu Is Pool = có) | |
| 8 | Villa Pool ID | `villa_pool_id` | Select | Không | |

### Tab OTA Management (Quản lý kênh OTA)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Account Email | `account_email` | Select | Có | Danh sách tài khoản OTA đã cấu hình |
| 2 | Listing ID | `listing_id` | Text (readonly, có thể sinh tự động) | Có | |
| 3 | Link | `link` | Text | Có | Link listing trên kênh OTA |
| 4 | OTA ID | `ota_id` | Text | Không | |
| 5 | GST | `vat` | Text | Không | |

Danh sách các link OTA đã gán hiển thị dạng bảng, có nút Thêm/Sửa/Xóa (modal `addOtaModal`).

### Tab Service and Utilities (Dịch vụ & Tiện ích)
Nhúng lại toàn bộ 10 tab con Concierge/Common Area/Electricity/Cleaning/Water/Internet/Television/Pool/Garden/Pest Control — xem chi tiết tại **PROP-049 (Thiết lập tiện ích)**, dùng chung element `property/*`.

### Tab Document (Tài liệu)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Có | |
| 2 | Type | `type` | Select (Contract/Land Title/Property Title/Other) | Có | |
| 3 | File | `uses` | Upload file | Có (khi thêm mới) | |
| 4 | Edit Id (ẩn) | `edit_id` | Hidden | — | |

Danh sách tài liệu đã tải lên hiển thị dạng bảng, cho phép xem/tải/xóa.

### Tab Language Management (Quản lý ngôn ngữ)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ hỗ trợ | `language[]` | Checkbox (danh sách ngôn ngữ hệ thống) | Không | Áp dụng cho listing đa ngôn ngữ của Property |

### Tab Control (Điểm kiểm soát/Nhắc nhở Check-out)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Copy control points từ Property khác | — | Select2 Property + nút Copy | Không | |
| 2 | Check-Out Control Point — Image | `image[n]` | Upload ảnh | Có (dòng đầu) | Max 1MB, tỉ lệ 1:1, có thể thêm nhiều dòng |
| 3 | Check-Out Control Point — Legend | `text[n]` | Text | Có (dòng đầu) | Mô tả điểm kiểm soát |
| 4 | Check-Out Reminders | `reminder_id[]` | Checkbox (danh sách Reminder có sẵn) | Không | |
| 5 | Custom Reminder | `reminder[n]` | Text (nhiều dòng, nút "+") | Không | |

### Tab Finance (Tài chính)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Estimated Value | `estimated_value` | Number | Không | |
| 2 | Expected Return | `expected_return` | Number/% | Không | |
| 3 | For Sale | `for_sale` | Checkbox/Select | Không | |
| 4 | Selling Price | `selling_price` | Number | Không (bắt buộc nếu For Sale) | |
| 5 | Starting Rental Date | `starting_rental_date` | Datepicker | Không | |

### Tab Portal Contract (Hợp đồng cổng thông tin khách)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Guest Contract General Version | `guest_contract_general_version_id` | Select2 | Có | Chọn phiên bản hợp đồng mẫu áp dụng cho Property |
| 2 | Contract Language | `contract_language` | Select2 (multi) | Không | |
| 3 | Contract Electricity Mode | `contract_electricity_mode` | Select | Không | |

Lưu qua hàm `_saveGuestContractAssignment`/`_savePortalContract`; liên quan tới PROP-051/052 (Mức sẵn sàng hợp đồng / In hợp đồng khách).

## Chức năng/nút thao tác
- Chuyển tab (URL param `$tab`, giữ nguyên `$villa_id`).
- Mỗi tab có nút "Save" riêng — submit form của tab đó, lưu vào bảng dữ liệu tương ứng, hiện Flash message, thường redirect lại đúng tab.
- Kiểm tra trùng tên Property / Beds24 ID qua AJAX (`checkVillaName`, `checkVillaBeds24Id`) trước khi lưu tab Identification.
- Thêm/Sửa/Xóa link OTA (tab OTA Management, modal AJAX).
- Thêm/Xóa dòng Control Point, Reminder tùy chỉnh (tab Control, JS dynamic row).
- Upload/Xóa tài liệu (tab Document).
- Xóa Property (nút Delete, gọi action `delete`).

## Điều hướng
- Mở từ: PROP-033 (Sổ đăng ký tài sản — thêm mới/sửa), PROP-032 (Sức khỏe danh mục), PROP-042 (Cài đặt đặt ngay — icon Edit mở tab OTA Management).
- Điều hướng tới: PROP-049 (Service and Utilities — cùng nội dung nhúng), PROP-017 (Mã phòng chưa ánh xạ, liên kết dữ liệu Room ID), PROP-046/047 (Residence liên kết dữ liệu Location), PROP-051/052 (Mức sẵn sàng hợp đồng / In hợp đồng khách liên kết dữ liệu tab Portal Contract).
- Popup con: Modal thêm/sửa OTA Link (không tách mã riêng vì là thao tác phụ trợ trong tab OTA Management).
