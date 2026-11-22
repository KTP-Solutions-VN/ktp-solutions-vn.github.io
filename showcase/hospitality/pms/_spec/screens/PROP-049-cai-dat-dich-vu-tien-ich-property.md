# PROP-049 — Thiết lập tiện ích (Utilities Setup)

**Loại:** Trang đầy đủ
**Route:** property/service-setting/:tab/:villa_id (villa_id truyền dạng base64), cũng được nhúng làm tab "Service and Utilities" trong màn hình Villa Detail (PROP-050)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang tổng hợp cài đặt các dịch vụ/tiện ích vận hành cho một Property qua 10 tab: Concierge, Common Area, Electricity, Cleaning, Water, Internet, Television, Pool, Garden, Pest Control. Mỗi tab lưu vào bảng dữ liệu riêng tương ứng (qua các hàm `_saveXxxSetting`), một số tab chỉ khả dụng khi đã chọn Property (`villa_id`). Nội dung này được dùng chung (element `property/*`) với tab "Service and Utilities" trong màn hình Villa Detail (PROP-050).

## Mô tả chi tiết

### Tab Concierge
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Used By | `used_by` | Select | Có | Cách thức bàn giao chìa khóa |
| 2 | Primary Method | `primary_method` | Select | Có | |
| 3 | Other Primary Method | `other_primary_method` | Text | Không | Hiện khi Primary Method = Other |
| 4 | Nb of Keys | `nb_of_keys` / `key_nb_of_keys-1_` | Number (nhiều dòng) | Không | Có thể thêm nhiều loại chìa khóa |
| 5 | Key Image | `key_image` | Upload ảnh | Không | |
| 6 | Check-in Time | `check_in_time` | Time picker | Có | |
| 7 | Check-out Time | `check_out_time` | Time picker | Có | |
| 8 | Ownership | `ownership` | Select | Không | |
| 9 | Full Name / Nickname | `full_name`/`nick_name` | Text | Không | |
| 10 | Bed Linen / Bed Sheet / Towels | `bed_linen`/`bed_sheet`/`towels` | Number | Không | |
| 11 | Access Code | `access_code` | Text | Không | |
| 12 | Rental Fee / Security Deposit | `rental_fee`/`security_deposit_amount` | Number | Không | |
| 13 | Icon | `icon` | Select/Upload | Không | |

### Tab Common Area
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Fee | `fee` | Text/Select | Không | Loại phí |
| 2 | Amount | `amount` | Number | Không | |
| 3 | Payable By | `payable_by` | Select | Không | |
| 4 | Billing Period | `billing_period` | Select | Không | |
| 5 | Due By | `due_by` | Select/Datepicker | Không | |

### Tab Electricity (chỉ khả dụng khi đã có `villa_id`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Có | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 3 | Currency | `currency_id` | Select | Không | |
| 4 | Price | `price` | Number | Không | |
| 5 | Free Quota | `free_quota` | Number | Không | |
| 6 | Fixed Daily | `fixed_daily` | Number | Không | |
| 7 | Starting Date / Starting Meter | `starting_date`/`starting_meter` | Datepicker/Number | Không | |
| 8 | Payment Date | `payment_date` | Datepicker | Không | |
| 9 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |
| 10 | Inclusion | `inclusion` | Textarea/Checkbox | Không | |
| 11 | Electricity Management | `electricity_management` | Select | Không | Cách quản lý điện (đồng hồ chung/riêng...) |

### Tab Cleaning
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Make Up Frequency | `make_up_frequency` | Select | Không | |
| 2 | Makeup Man Hour | `makeup_man_hour` | Number | Không | |
| 3 | Cleaning Man Hour | `cleaning_man_hour` | Number | Không | |

### Tab Water
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Có | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 3 | Price / Free Quota | `price`/`free_quota` | Number | Không | |
| 4 | Payment Date | `payment_date` | Datepicker | Không | |
| 5 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |
| 6 | Inclusion | `inclusion` | Textarea/Checkbox | Không | |

### Tab Internet
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Có | Danh sách amenity provider |
| 2 | Login / Password | `login`/`password` | Text | Không | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 4 | Price | `price` | Number | Không | |
| 5 | Billing Period | `billing_period` | Select | Không | |
| 6 | Payment Date | `payment_date`/`payment_date_date` | Datepicker | Không | |
| 7 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |

### Tab Television
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Có | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 3 | Price | `price` | Number | Không | |
| 4 | Billing Period | `billing_period` | Select | Không | |
| 5 | Payment Date | `payment_date`/`payment_date_date` | Datepicker | Không | |
| 6 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |

### Tab Pool
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider Type | `provider_type` | Select | Có | |
| 2 | Provider | `provider` | Select2 | Có | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 4 | Price | `price` | Number | Không | |
| 5 | Cleaning Period | `cleaning_period` | Select | Không | |
| 6 | Service Days | `service_days` | Checkbox (nhiều ngày) | Không | Mon-Sun |
| 7 | Payment Date | `payment_date` | Datepicker | Không | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |

### Tab Garden
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider Garden Type | `provider_garden_type` | Select | Có | |
| 2 | Provider | `provider` | Select2 | Có | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 4 | Price / Amount | `price`/`amount` | Number | Không | |
| 5 | Man Hours | `man_hours` | Number | Không | |
| 6 | Cleaning Period | `cleaning_period` | Select | Không | |
| 7 | Payment System / Payment Date | `payment_system`/`payment_date` | Select/Datepicker | Không | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |

### Tab Pest Control
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Provider Pest Control Type | `provider_pest_control_type` | Select | Có | |
| 2 | Provider | `provider` | Select2 | Có | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | Không | |
| 4 | Price | `price` | Number | Không | |
| 5 | Scope of Service | `scope_of_ser` | Textarea | Không | |
| 6 | Cleaning Period | `cleaning_period` | Select | Không | |
| 7 | Payment System / Payment Date | `payment_system`/`payment_date` | Select/Datepicker | Không | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | Không | |

## Chức năng/nút thao tác
- Chuyển tab (Concierge/Common Area/Electricity/Cleaning/Water/Internet/Television/Pool/Garden/Pest Control) — các tab từ Electricity trở đi bị disable nếu chưa chọn Property.
- Nút "Save" trên mỗi tab — submit form của tab đó, gọi hàm lưu tương ứng phía Controller (`_saveConciergeSetting`, `_saveCommonAreaSetting`, `_saveElecticitySetting`, `_saveCleaningMakeUp`, `_saveWaterSetting`, `_saveInternetSetting`, `_saveTelevisionSetting`, `_savePoolSetting`, `_saveGardenSetting`, `_savePestControlSetting`), hiện Flash message rồi redirect lại tab hiện tại.

## Điều hướng
- Mở từ: PROP-041 (Sổ phí dịch vụ — nút "Add Settings"), hoặc từ tab "Service and Utilities" của PROP-050 (Trình chỉnh sửa tài sản).
- Điều hướng tới: Không điều hướng sang trang khác (chỉ đổi tab và lưu tại chỗ).
- Popup con: Không có.
