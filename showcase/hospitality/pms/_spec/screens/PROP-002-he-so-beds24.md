# PROP-002 — Hệ số giá Beds24 theo kênh OTA
**Loại:** Trang đầy đủ
**Route:** property/beds24-coefficient
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Màn hình tra cứu hệ số (coefficient) giá áp dụng cho từng property khi đồng bộ với kênh OTA qua Beds24, lọc theo Đơn vị kinh doanh (Business Unit) và Kênh (Channel/Chanel). Hiển thị 2 bảng: bảng property đã có hệ số và bảng property đang kết nối kênh đó nhưng chưa có hệ số.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit (filter) | `business_unit` | Select2 (danh sách BU theo quyền, có "All") | Có | Submit form GET, set cookie `property_business_unit_id` |
| 2 | Channel (filter) | `chanel_id` | Select2 (danh sách Chanel) | Có | Mặc định kênh đầu tiên |
| 3 | Property (cột bảng 1) | `villa.name` | Text | — | |
| 4 | Coefficient (cột bảng 1) | `coefficient` (giải mã từ JSON field `data`) | Số | — | |
| 5 | Last Update By (cột bảng 1) | `updated_by` | Text (tên user) | — | |
| 6 | On (cột bảng 1) | `updated_on` | Ngày (`d M y`) | — | |
| 7 | Property (bảng 2 - "properties without coefficient") | `name` | Text | — | Villa có kênh OTA khớp `chanel_id` nhưng chưa có `VillaCoefficient` type=coefficient |

## Chức năng/nút thao tác
- Đổi Business Unit hoặc Channel → tự động submit `#filter_form` (GET), tải lại trang với query mới.
- Bảng 1 (`#zero_config`): DataTable tĩnh, không sort.
- Bảng 2 (`#zero_config1`): DataTable, ghi nhớ pageLength qua cookie `datatable-length`.
- Không có thao tác thêm/sửa/xóa trực tiếp trên trang này (chỉ tra cứu); việc set hệ số coefficient được thực hiện ở nơi khác (action `saveCoefficient`, không thuộc phạm vi PROP-001..016).

## Điều hướng
- Mở từ: Menu quản lý Bất động sản, mục Quality/Beds24.
- Điều hướng tới: không có link điều hướng sang trang khác trong nội dung trang (breadcrumb link về `property/quality`, ngoài phạm vi phụ trách).
- Popup con: không có.
