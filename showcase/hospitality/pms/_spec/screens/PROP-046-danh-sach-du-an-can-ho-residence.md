# PROP-046 — Khu căn hộ & dự án (Residences & Projects)

**Loại:** Trang đầy đủ
**Route:** property/residence-enquiry
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang liệt kê danh sách Dự án/Chung cư (Residence) có chứa ít nhất 1 Property đang mở, lọc theo Business Unit. Hiển thị thông tin quận/huyện, tên nội bộ/tên chính thức, mã Residence, và thông tin chủ nhà (Owner) có nhiều Property nhất trong Residence đó.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (có option "All", hỗ trợ Zone) | Có (class `required`) | Đổi giá trị → reload, lưu cookie |

### Cột hiển thị
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Text | — | |
| 2 | District | `district_name` | Text | — | Qua contain Residence→District |
| 3 | Internal (Name) | `name` | Text | — | Tên nội bộ Residence |
| 4 | Official (Name) | `official_name` | Text | — | Tên chính thức Residence |
| 5 | Code | `residence_code` | Text | — | |
| 6 | Owner | `owner_name` | Text | — | Owner có nhiều Property nhất trong Residence |
| 7 | Phone | `owner_phone_number` | Text | — | |
| 8 | Email | `owner_email` | Text | — | |
| 9 | Actions | — | Icon "Xem" | — | Mở PROP-047 |

## Chức năng/nút thao tác
- Đổi Business Unit → reload danh sách Residence.
- Icon "Xem" (`fa-eye`) → mở PROP-047 (Xem chi tiết Residence Enquiry) tại `viewResidenceEnquiry/:residence_id/:business_unit_id`.

## Điều hướng
- Mở từ: Menu Hồ sơ tài sản (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: PROP-047 (Hồ sơ khu căn hộ).
- Popup con: Không có.
