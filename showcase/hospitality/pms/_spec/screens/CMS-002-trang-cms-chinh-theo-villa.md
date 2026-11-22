# CMS-002 — Trang web của tài sản (Property Web Page)

**Loại:** Trang đầy đủ

**Route:** `CmsController::cms($tab, $villa_id, $lang1)` — mặc định `/cms/cms/:tab/:villa_id/:lang1` (tab mặc định `welcome` khi trống hoặc `main`)

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Màn hình trung tâm của module CMS: quản lý toàn bộ nội dung hiển thị trên trang website (mini-website) của một villa cụ thể. Gồm 8 tab nội dung (Welcome, Why Here, Daily Life, Comfort, Booking, Menu, Services, SEO), mỗi tab có 1 hoặc nhiều form con độc lập với nút Save riêng. Toàn bộ 8 tab được render sẵn cùng lúc trên 1 trang (dữ liệu từng tab được controller nạp đầy đủ trong 1 lần load); việc chuyển tab chỉ là hiệu ứng ẩn/hiện (Bootstrap tab) và cập nhật URL bằng `history.replaceState`, KHÔNG phải AJAX load riêng — mỗi form con khi bấm Save vẫn submit POST bình thường (full-page) về lại action `cms` với cùng `$tab`, `$villa_id`, `$lang1` rồi redirect lại chính tab đó.

Được vào từ CMS-001 (chọn villa từ danh sách).

## Mô tả chi tiết

Toàn bộ field dưới đây (trừ ảnh) đều là **đa ngôn ngữ**: dữ liệu lưu dạng mảng theo `language_code` (dropdown "Language" ở đầu mỗi form con, giá trị lấy từ bảng `Language`), khi đổi ngôn ngữ trên dropdown thì các field text sẽ được nạp lại bằng JS từ dữ liệu đã tải sẵn (`welcome_array`, `why_here_array`... đã chứa dữ liệu tất cả ngôn ngữ) rồi mới submit form riêng cho ngôn ngữ đang chọn.

### Tab 1 — Welcome (mặc định khi mở trang)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown | - | Áp dụng chung cho các field text bên dưới |
| 2 | Moment (short text) | `moment_text` | Textarea | Có | Form con `welcome_form_1` |
| 3 | Disclosure | `disclosure_text` | Textarea | Có | Form con `welcome_form_1` |
| 4 | Interior one-liner | `interior[]` | Danh sách text (nhiều dòng, thêm/xoá động bằng JS) | Dòng đầu bắt buộc | Form con `welcome_form_2` |
| 5 | Exterior one-liner | `exterior[]` | Danh sách text (nhiều dòng, thêm/xoá động) | Dòng đầu bắt buộc | Form con `welcome_form_3` |
| 6 | Feature icon | `image[]` / ảnh cũ có `id[]` | Upload ảnh (nhiều icon, thêm/xoá động) | Icon đầu bắt buộc | Form con `welcome_form_4`, tối đa 1MB, tỉ lệ 1:1, lưu qua model `CmsImage` (tag `feature-icon`) |
| 7 | Legend (chú thích icon) | `legend` | Text | - | Đi kèm mỗi feature icon |

### Tab 2 — Why Here
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown | - | |
| 2 | Short text | `why_here_text` | Textarea | Có | |
| 3 | Points of interest | `points_of_interest` | Text/danh sách | Có | Form `why_here_form_1` |

### Tab 3 — Daily Life
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language_daily_life` | Dropdown | - | |
| 2 | Kitchen description | `kitchen_description` | Textarea | - | Form `daily_life_form_1` |
| 3 | Convenience Store 1/2/3 | `convenience_store` (x3) | Text | - | Form `daily_life_form_2` |
| 4 | Shop 1/2/3 | `shops` (x3) | Text | - | |
| 5 | Supermarket 1/2/3 | `supermarket` (x3) | Text | - | |
| 6 | Restaurant 1..6 | `restraunts` (x6) | Text | - | |
| 7 | Kitchen image | `daily_life_image` | Upload ảnh | - | Tối đa 1MB, model `CmsImage` |

### Tab 4 — Comfort
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown | - | |
| 2 | Bedroom description (theo từng phòng ngủ) | `bedroom_text[]` | Danh sách text, số dòng = số phòng ngủ villa (`bedroom_count`, lấy từ `VillaDetail.number_of_beds`) | - | Form `comfort_form_1` |
| 3 | Wifi description | `wifi_description` | Textarea | - | Xuất hiện ở cả `comfort_form_1` và `comfort_form_2` |
| 4 | Wifi upload speed | (label "Wifi Uploading Speed") | Text | - | Form `comfort_form_2` |
| 5 | Wifi download speed | (label "Wifi Downloading Speed") | Text | - | |
| 6 | Comfort image(s) | `image[]`, `id[]` | Upload ảnh (nhiều, thêm/xoá động) | - | Form `comfort_form_3`, tối đa 1MB, model `CmsImage` |

### Tab 5 — Booking
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Instant Booking | `instant_booking` | Toggle/checkbox | - | Form `booking_form` |
| 2 | Airbnb Link | `airbnb_link` | Dropdown | - | Danh sách lấy từ `VillaOtaManagement.links` lọc theo channel có tên chứa "Airbnb" (bảng `Chanel`) |
| 3 | Other OTA | `other_ota` | Dropdown | - | Lọc channel KHÔNG chứa "Airbnb" và khác "MiniSite" |
| 4 | Other OTA link | `other_ota_link` | Text | - | |
| 5 | Expedia link | (label "Expedia link", field name trùng `other_ota_link`) | Text | - | |

### Tab 6 — Menu (bật/tắt & liên kết các khối nội dung khác của villa lên menu website)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Why Here | `cms_why_us_id` | Dropdown | - | Liên kết tới bản ghi Book-Direct Benefits (CMS-006/007/008) |
| 2 | Concierge | `cms_concierge_id` | Dropdown | - | Liên kết Concierge (CMS-018/019) |
| 3 | Logo | field id `cms_destination_id` (label "Logo") | Dropdown | - | *Ghi chú kỹ thuật:* field này dùng chung `id`/name với field "Destination" bên dưới trong view — nghi vấn lỗi copy-paste trong code gốc, cần QA xác nhận khi làm lại UI |
| 4 | Destination | `cms_destination_id` | Dropdown | - | Liên kết Destination theo villa (CMS-012/013) |
| 5 | Talk To Us | `cms_contact_us_id` | Dropdown | - | Liên kết Contact Form (CMS-016/017) |
| 6 | Arrival | `cms_arrival_id` | Dropdown | - | Liên kết Arrival (CMS-030/031) |

### Tab 7 — Services
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Services | `cms_services_id` | Dropdown (multi?) | - | Chọn dịch vụ villa hiển thị trên web, liên kết CMS-003/004 |

### Tab 8 — SEO
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown | - | |
| 2-16 | SEO Title / SEO Description / SEO Keywords (lặp lại 5 nhóm, tương ứng 5 trang: Home/Welcome/Why Here/Daily Life/Comfort) | `seo_title_text`, `seo_description_text`, `seo_keywords_text` | Text/Textarea | Có (đánh dấu đỏ) | Form `seo_form` |
| 17 | Airport Arrival | `airport_text` | Textarea | Có | |
| 18 | Harbour/Pier Arrival | `pier_text` | Textarea | Có | |
| 19 | Car Rental | `car_rental_text` | Textarea | Có | |
| 20 | Other Transfer | `other_text` | Textarea | Có | |
| 21 | Check-in Description | `check_in_text` | Textarea | Có | |
| 22 | Stay Description | `stay_text` | Textarea | Có | |

## Chức năng/nút thao tác
- **Chuyển tab** (Welcome/Why Here/Daily Life/Comfort/Booking/Menu/Services/SEO): chỉ đổi hiển thị phía client, không tải lại dữ liệu.
- **Save theo từng form con** (mỗi tab có 1-4 nút Save riêng, ví dụ `welcome_form_1`..`welcome_form_4`, `comfort_form_1`..`comfort_form_3`...): submit POST về chính action `cms`, server xác định form nào được gửi qua tên field submit, lưu dữ liệu tương ứng (nhiều field serialize theo ngôn ngữ), rồi redirect lại đúng tab.
- **Thêm/xoá dòng động** (Interior/Exterior one-liner, Feature icon, Comfort image, Bedroom description): xử lý bằng JavaScript phía client trước khi submit.
- **Upload ảnh** (Feature icon, Kitchen image, Comfort image): giới hạn 1MB/ảnh, một số có yêu cầu tỉ lệ (1:1 với feature icon); lưu qua model `CmsImage` dùng chung toàn hệ thống CMS.
- **Xoá ảnh phụ** (multi-image gallery villa, `tag NOT IN [Main, undefined, feature-icon, Destination, Concierge]`): dùng action `deleteMulti` (AJAX, không có màn hình riêng) — được gọi từ danh sách ảnh phụ hiển thị trong trang.
- **Chọn ngôn ngữ nội dung**: đổi dropdown "Language" ở đầu mỗi tab để soạn nội dung cho ngôn ngữ khác (không tải lại trang, JS tự điền dữ liệu đã có sẵn).

## Điều hướng
- Vào từ: CMS-001 (chọn villa từ danh sách) → mở tab Welcome mặc định.
- Điều hướng đến: không điều hướng sang màn khác trong luồng bình thường — các dropdown ở tab Menu/Services chỉ chọn liên kết dữ liệu (không có link click-through trực tiếp tới CMS-003…031 từ đây).
