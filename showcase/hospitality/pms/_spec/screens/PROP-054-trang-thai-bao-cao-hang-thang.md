# PROP-054 — Trạng thái gửi báo cáo (Report Dispatch Status)

**Loại:** Trang đầy đủ
**Route:** property/report-status
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang theo dõi trạng thái gửi báo cáo hàng tháng (Monthly Report) cho từng Property theo Business Unit: đã gửi hay chưa, cho phép đánh dấu "Không cần thiết" (tạo bản ghi báo cáo với `sent=True` mà không cần file), xóa bản ghi báo cáo, và gửi email báo cáo/newsletter cho chủ nhà.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (có option "All") | Có (class `required`) | Đổi giá trị → reload |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property Name | `villa.name` | |
| 2 | Owner | `owner_name` | |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | Icon Delete, nút "Not Necessary" (ẩn `action=not_necessary`) |
| 8 | Post | — | Nút gửi email cho chủ nhà (`email_owner`) |

### Modal xác nhận xóa
Xác nhận xóa bản ghi `MonthlyReport` theo `report_id`.

## Chức năng/nút thao tác
- Đổi Business Unit → reload danh sách theo BU.
- Nút "Not Necessary" — tạo/đánh dấu bản ghi `MonthlyReport` là đã gửi (`sent = True`) dù không có file báo cáo thực tế, dùng cho Property không cần gửi báo cáo tháng đó.
- Icon Delete — mở modal xác nhận, xóa bản ghi `MonthlyReport`.
- Nút "Post"/gửi email (`email_owner`) — gửi email báo cáo/newsletter hàng tháng cho chủ nhà theo ngôn ngữ của Owner (dùng `EmailTemplate` + `MonthlyNewsLetter`).

## Điều hướng
- Mở từ: Menu báo cáo chủ nhà (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác; liên hệ dữ liệu với PROP-018 (Bản tin chủ nhà), PROP-053 (Owner Reports by Unit).
- Popup con: Modal xác nhận xóa (không tách mã riêng, thao tác phụ trợ tại chỗ).
