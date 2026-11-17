# PHO-006 — Trang ảnh property (Villa)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::property($villaId)` — route mặc định `/photos/property/:id` (không khai báo route đẹp trong `config/Routes.php`)

**Module:** PHO = Hình ảnh

## Mô tả ngắn gọn
Trang landing quản lý ảnh của một villa/property: ảnh panoramic (hero banner), 3 chỉ số tổng quan (số bộ ảnh, điểm OTA, ngày chụp gần nhất), form upload bộ ảnh mới, danh sách card các bộ ảnh hiện có (OTA/High Res/Extras/Owner's set/Raw-Temporary/Archive) và khối ảnh khu vực chung của residence chứa villa (nếu có).

## Mô tả chi tiết

Ảnh Panoramic (hero):
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ảnh panoramic hiện tại | `photoRow['panoramic_thumbnail']` | Ảnh nền (background-image) | - | Placeholder nếu chưa có ảnh |
| 2 | Upload panoramic | `panoramic_photo[]` (+ hidden `upload_mode=panoramic`, `set_type=panoramic`, `source`, `shoot_date`, `photo_shoot_id`) | Upload 1 file JPG | Có (khi bấm Upload) | Kích thước khuyến nghị 2100x900; tự submit ngay khi chọn file |

3 chỉ số tổng quan:
| # | Tên field | Field code | Ghi chú |
|---|---|---|---|
| 1 | Total sets | đếm `photoRow['sets']` (trừ panoramic) | Số bộ ảnh hiện có |
| 2 | OTA score | `photoRow['score']` | `-` nếu chưa có điểm |
| 3 | Last shoot | `lastShoot` | Ngày/tên đợt chụp gần nhất |

Form "Upload a new photo set":
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Set type | `set_type` | Dropdown | Có | OTA / High Res / Extras / Owner's set / Raw-Temporary / Archive |
| 2 | Source | `source` | Dropdown | Có | Photographer delivery / Internal team / Owner provided (`AppConstants::$photoSources`) |
| 3 | Shoot date | `shoot_date` | Date picker | Có (ẩn khi source = Internal team/Owner provided) | |
| 4 | Photo shoot reference | `photo_shoot_id` | Dropdown (`photoShootOptions`) | Bắt buộc khi source = Photographer delivery | Danh sách đợt chụp của villa |
| 5 | Photos | `photos[]` | Kéo-thả hoặc chọn nhiều file JPG | Có | Thông báo giới hạn thay đổi theo set type (VD: OTA tối đa 1MB/ảnh, 2100x1400; High Res tối đa 3MB, tỉ lệ 3:2...) |

Danh sách bộ ảnh hiện có (card), mỗi card gồm: icon theo loại set, tên set, yêu cầu (`set['required']`), số ảnh, điểm số, dung lượng (`size`), và 3 nút thao tác (Open/Download/Delete).

Khối "Residence Common Areas" (nếu villa thuộc residence có ảnh khu vực chung): tên residence, nút "Residence page" và danh sách nút mở nhanh từng bộ ảnh khu vực chung.

## Chức năng/nút thao tác
- **Upload ảnh panoramic**: chọn file → tự động submit form (mode `panoramic`).
- **Upload bộ ảnh mới**: chọn set type/source/ngày chụp/đợt chụp, kéo-thả hoặc chọn nhiều ảnh, bấm Upload (hoặc Remove All để xoá lựa chọn trước khi gửi).
- **Open** một bộ ảnh: sang PHO-007 (`detail`) theo `set_type`.
- **Download** một bộ ảnh: tải file (`download`, AJAX/file — không có view riêng).
- **Delete** một bộ ảnh: mở modal xác nhận, submit tới `detail` action với `action=delete` (chỉ hiện nếu `canDeletePhotoSet`).
- **Mở trang Residence** chứa khu vực chung của villa (nếu có).
- **Mở nhanh bộ ảnh khu vực chung** của residence: sang PHO-005 (`residenceDetail`).
- **Tab điều hướng**: Photo Sets (PHO-002), Common Areas (PHO-003), Settings (PHO-008).

## Điều hướng
- Vào từ: PHO-002 (click villa hoặc icon Upload trong danh sách).
- Điều hướng đến: PHO-007 (Open bộ ảnh), PHO-005 (mở nhanh bộ ảnh khu vực chung residence), PHO-004 (Residence page), PHO-002 (tab Photo Sets), PHO-003 (tab Common Areas), PHO-008 (tab Settings).
