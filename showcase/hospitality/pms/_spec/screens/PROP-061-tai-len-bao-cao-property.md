# PROP-061 — Thêm báo cáo tháng (Add Monthly Report)

**Loại:** Trang đầy đủ
**Route:** property/upload-report
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang tìm kiếm và tải lên báo cáo (Monthly Report) dưới dạng file cho một Property cụ thể, đồng thời hiển thị danh sách báo cáo đã tải lên trước đó để có thể gửi email cho chủ nhà.

## Mô tả chi tiết

### Bộ lọc tìm kiếm
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Có (class `required`) | |
| 2 | Property | `villa_id` | Select2 | Có (class `required`) | Danh sách Property theo BU đã chọn |

### Form tải lên báo cáo mới
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Report Name | `name` | Text | Có (class `required`) | |
| 2 | Start Date | `start_date` | Datepicker | Có | |
| 3 | End Date | `end_date` | Datepicker | Có | |
| 4 | File | `url` | Upload file | Có | |

### Cột hiển thị danh sách báo cáo đã tải
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property Name | `villa_name` | |
| 2 | Owner | `owner_name` | |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | Tải/xem file |
| 8 | Post | — | Gửi email báo cáo cho chủ nhà (`email_owner`) |

## Chức năng/nút thao tác
- Chọn Business Unit + Property → "Search" tải danh sách báo cáo đã có của Property đó.
- Nút "Upload"/"Save" — submit form tải lên file báo cáo mới, tạo bản ghi `MonthlyReport`.
- Nút "Post" trên từng dòng — gửi email báo cáo tới chủ nhà tương ứng.

## Điều hướng
- Mở từ: Menu báo cáo chủ nhà (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác; liên hệ dữ liệu với PROP-018 (Bản tin chủ nhà), PROP-053/054/055 (BU Reports/Report Status/Report Ready).
- Popup con: Không có.
