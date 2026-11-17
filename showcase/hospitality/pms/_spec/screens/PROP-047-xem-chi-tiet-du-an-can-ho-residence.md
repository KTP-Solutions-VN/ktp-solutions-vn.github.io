# PROP-047 — Xem chi tiết Dự án/Chung cư (View Residence Enquiry)

**Loại:** Trang đầy đủ
**Route:** property/view-residence-enquiry/:residence_id/:business_unit_id
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang xem chi tiết một Dự án/Chung cư (Residence): tên nội bộ/tên chính thức, vị trí (Country-Region-District-Area), danh sách toàn bộ Property thuộc Residence, và danh sách chủ nhà (Owner)/quản lý (Manager) cùng thông tin liên hệ, gom nhóm theo từng Owner.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Internal Residence Name | `name` | Text (readonly) | — | |
| 2 | Official Residence Name | `official_name` | Text (readonly) | — | |
| 3 | Country-Region-District-Area | `country_name`/`region_name`/`district_name`/`area_name` | Text (readonly) | — | Ghép chuỗi |
| 4 | List of Properties | `owners[].villa[]` | Text list (readonly) | — | Danh sách tên Property theo từng Owner |
| 5 | Owner N – Phone – Email | `owners[].name`/`phone_number`/`email` | Text (readonly) | — | Lặp lại theo số lượng Owner (N = 1, 2, ...) |
| 6 | Manager N – Phone – Email | `owners[].manager[]` | Text (readonly) | — | Chỉ hiện nếu Property có gán Manager (`manager_id` json) |

## Chức năng/nút thao tác
- Chỉ xem thông tin (read-only), không có form nhập liệu hoặc nút lưu.
- Nếu `residence_id` không hợp lệ hoặc không tìm thấy dữ liệu → Flash lỗi và redirect về PROP-046.

## Điều hướng
- Mở từ: PROP-046 (Danh sách Dự án/Chung cư) — icon "Xem".
- Điều hướng tới: Không có (trang chỉ xem).
- Popup con: Không có.
