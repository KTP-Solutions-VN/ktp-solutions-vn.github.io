# PROP-035 — Hồ sơ tài sản (Property Profile)

**Loại:** Trang đầy đủ
**Route:** property/view-details/:villa_id (dashed mặc định CakePHP DashedRoute: `/property/view-details/:villa_id`)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang xem chi tiết read-only một Property (villa), tổng hợp thông tin từ nhiều bảng liên quan (Villa, VillaLocation, VillaImage, VillaDetail, VillaPool, VillaOtaManagement, VillaService...) thành các khối: Hình ảnh, Vị trí (kèm bản đồ Google Maps), Concierge phụ trách, Internet, Vệ sinh hồ bơi, Loại hình Property, Danh sách OTA/kênh phân phối. Nếu không tìm thấy `villa_id`, chuyển hướng về trang trước kèm flash lỗi.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | — | Text | — | "Property ID Card: {name} - {short_name}" |
| 2 | Front Image | — | Ảnh | — | Từ `VillaImage` (`image_type=Front`), mặc định `/img/no-image.gif` nếu không có |
| 3 | Gate Image | — | Ảnh | — | Từ `VillaImage` (`image_type=Back`) |
| 4 | Country | — | Text | — | Từ `VillaLocation.country_id` → `Country` |
| 5 | Region | — | Text | — | Từ `VillaLocation.region_id` → `Region` |
| 6 | District | — | Text | — | Từ `VillaLocation.district_id` → `District` |
| 7 | Area | — | Text | — | Từ `VillaLocation.area_id` → `Area` |
| 8 | Residence | — | Text | — | Từ `VillaLocation.residence_id`; mặc định "Independent" |
| 9 | Address | — | Text | — | Từ `VillaLocation.address` |
| 10 | Location Type | — | Text | — | Từ `VillaLocation.villa_location_type_id` → `VillaLocationType` |
| 11 | Google Map URL | — | Link | — | Mở tab mới |
| 12 | Bản đồ | `#mapCanvas` | Google Maps embed | — | Marker kéo-thả được (`draggable: true`), tuy nhiên đây là trang view-only nên phần cập nhật tọa độ trong JS không có tác dụng lưu (không có form submit) |
| 13 | Concierge phụ trách | — | Text | — | Từ `Concierge` (usage_name hoặc first_name + family_name), điều kiện `status=Active` |
| 14 | Key Set Image | — | Ảnh | — | Ảnh từ service settings (Concierge service, `used_by=Guest/Concierge`) |
| 15 | Internet Login | — | Text | — | Từ `VillaService` (service_name=Internet), giải serialize `service_settings` |
| 16 | Internet Password | — | Text | — | Tương tự |
| 17 | Pool company | — | Text | — | Từ `VillaService` (service Pool), chỉ có nếu `provider_type=pool company`, tra tên qua `ServiceProvider` |
| 18 | Frequency (chu kỳ vệ sinh hồ) | — | Text | — | Từ `service_settings['cleaning_period']` |
| 19 | Cleaning days | — | Text | — | Danh sách ngày vệ sinh, join bằng dấu phẩy |
| 20 | Number of bedrooms | — | Text | — | Từ `VillaDetail.number_of_beds` |
| 21 | Number of bathrooms | — | Text | — | Từ `VillaDetail.number_of_bathrooms` |
| 22 | Number of guests | — | Text | — | Từ `VillaDetail.number_of_guests` |
| 23 | Luxury Level | — | Text | — | Từ `VillaDetail.luxury_level`, tra nhãn qua `CommonController::_getLuxurylevel()` |
| 24 | Pool (có hồ bơi không) | — | Text | — | Yes/No, từ `VillaDetail.is_pool` |
| 25 | Pool Length/Width/Depth | — | Text | — | Từ `VillaPool`, đơn vị mét |
| 26 | Pool System | — | Text | — | Từ `VillaPool.pool_system` |
| 27 | Listing (danh sách OTA) | — | Bảng lặp: tên kênh + link (readonly, có nút copy) | — | Từ `VillaOtaManagement.links` (giải serialize), tên kênh tra qua `Chanel`; khối chỉ hiển thị khi có dữ liệu |

Ghi chú: các field `villa_usage`, `villa_activities`, `villa_transport`, `villa_accessible`, `owner`, `price_category`, `business_situation_array`, `business_unit_array`, `reference_currency`, `villa_contract_services` được controller truyền ra view nhưng KHÔNG được render trong `view_details.ctp` (view hiện tại chỉ hiển thị các khối liệt kê ở trên).

## Chức năng/nút thao tác
- Icon Copy (`.copy_text`) cạnh mỗi link OTA → copy link vào clipboard (JS thuần).
- Bản đồ Google Maps hiển thị vị trí villa (chỉ xem, marker kéo được nhưng không có nút Save để lưu lại thay đổi).
- Không có nút Edit/Save trên trang này (thuần xem chi tiết).

## Điều hướng
- Mở từ: PROP-033 (Sổ đăng ký tài sản) — icon "View Details" trên từng dòng.
- Điều hướng tới: Không điều hướng chủ động sang trang khác từ nội dung trang (chỉ có breadcrumb ẩn dẫn về PROP-033 qua JS, không hiển thị do bị comment).
- Popup con: Không có.
