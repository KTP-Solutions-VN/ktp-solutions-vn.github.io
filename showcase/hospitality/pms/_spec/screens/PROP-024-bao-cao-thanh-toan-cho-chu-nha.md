# PROP-024 — Báo cáo thanh toán hàng tháng cho Chủ nhà (Payment/Owner Report)

**Loại:** Trang đầy đủ
**Route:** property/payment-report
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Màn hình tra cứu và tải về các báo cáo hàng tháng (Monthly Report) đã gửi cho chủ nhà của một Property cụ thể, lọc theo Business Unit và Property, hiển thị ngày thanh toán kế tiếp dự kiến.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Có (class `required`) | Đổi giá trị load lại danh sách Property qua AJAX `common/getBusinessUnitVilla` |
| 2 | Property | `villa_id` | Select2 | Có | Danh sách Property (status Open) thuộc Business Unit đã chọn |
| 3 | Nút Search | — | Submit button (`name="search"`) | — | |

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Name | `villas[villa_id]` | Text | Không | |
| 2 | Owner | `last_name` | Text | Không | |
| 3 | Report Name | `name` | Text | Không | |
| 4 | Start | `start_date` | Datetime (`d M y`) | Không | |
| 5 | End | `end_date` | Datetime (`d M y`) | Không | |
| 6 | Sent On | `sent_on` | Datetime (`d M y`, chỉ hiện nếu `sent = 'True'`) | Không | |
| 7 | Action | — | Nút Download | — | Tải file report từ `/files/monthly-report/{url}` |

Phía trên bảng hiển thị dòng thông báo "Your Next Payment is scheduled on: {payment_date}" khi có dữ liệu.

## Chức năng/nút thao tác
- Nút "Search" — submit filter Business Unit + Property, truy vấn `MonthlyReport` theo `villa_id`, tính ngày thanh toán kế tiếp qua `paymentDate()`.
- Nút "Download Report" trên từng dòng — tải file report tương ứng.

## Điều hướng
- Mở từ: Menu Property Reports/Payment (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: file tải về `/files/monthly-report/{url}` (không phải điều hướng trang).
- Popup con: Không có.
