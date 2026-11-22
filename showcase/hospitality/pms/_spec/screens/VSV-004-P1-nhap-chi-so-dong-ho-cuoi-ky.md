# VSV-004-P1 — Ghi chỉ số khi đi (Record Departure Reading)

**Loại:** Popup (mở từ VSV-004, dạng trang riêng)

**Route:** `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_id>` (GET hiển thị form, POST cùng action để lưu)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Form nhập chỉ số công tơ điện tại thời điểm khách check-out, hệ thống tự tính tiền điện phải thu dựa trên đơn giá mặc định của villa, cho phép áp giảm giá/miễn giảm có phê duyệt, ghi nhận phương thức thanh toán và ảnh chứng minh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | End meter | `meter` | Số | Có | Xác nhận qua modal trước khi submit |
| 2 | Ngày kết thúc | `date` | Text + datepicker | Có | |
| 3 | Giờ ghi (end meter time) | `end_meter_time` | Time picker | Có | |
| 4 | Ảnh khu vực công tơ | `end_meter_area_photo` / `cropped_area_image` | File/ảnh crop base64 | Có (1 trong 2) | |
| 5 | Ảnh số công tơ | `end_meter_photo` / `cropped_meter_image` | File/ảnh crop base64 | Có (1 trong 2) | |
| 6 | Ghi chú | `end_meter_comment` | Textarea | Không | |
| 7 | Số tiền phải thu | `amount` | Số | Có | So sánh với `default_bill` tính tự động; nếu lệch thì bắt buộc nhập Reason/Discount/Approved by |
| 8 | Lý do chênh lệch | `reason` | Text | Có nếu số tiền ≠ tính toán mặc định | |
| 9 | Giảm giá | `discount` | Số | Không | |
| 10 | Loại giảm giá | `discount_type` | Hidden/select | Không | |
| 11 | Người phê duyệt | `approved_by` | Select (danh sách BU Manager cùng BU) | Có nếu có giảm giá/chênh lệch | |
| 12 | Loại hình thanh toán | `payment_type` | Hidden (single/multiple) | — | |
| 13 | Người thanh toán | `paid_by` | Select (`PAYMERCHANT`) | Có | |
| 14 | Đơn giá áp dụng | `charge`, `rate_types` | Số + select | Có | Loại giá: Price per kWh / Fixed Daily Price / Free Daily Quota |
| 15 | Số tiền hoàn trả | `return_amount` | Số | Không | |
| 16 | Người trả thêm / Số tiền thêm | `additional_paid_by`, `additional_received`, `additional_fees` | Select + số | Không | Phụ phí phát sinh khác |
| 17 | Villa ID | `villa_id` | Hidden | — | |
| 18 | Bill ID | `bill_id` | Hidden | — | |

Thông tin chỉ đọc: tên khách, villa, ngày check-in/check-out, chỉ số đầu kỳ (`start_meter`), giá mặc định villa.

## Chức năng/nút thao tác
- **Save:** POST tới chính `endMeter`; tính `default_bill = (meter - start_meter) × charge`, so khớp với `amount` nhập vào để quyết định `meter_status = Cleared` hay giữ trạng thái review; lưu `ElectricalBill`, cập nhật `CheckInDetail.check_out_time`, cập nhật ảnh khu vực công tơ vào `Villa`, gửi thông báo; nếu thanh toán online (`paid_by = 7`) thì lưu session để chuyển hướng cổng thanh toán. Sau khi lưu → redirect về VSV-004 (`checkOut`).
- Modal xác nhận số công tơ trước khi submit.
- Nếu `booking_id` không hợp lệ hoặc không tìm thấy dữ liệu → báo lỗi và quay lại VSV-004.

## Điều hướng
- Vào từ: VSV-004 — nút "Fill it now".
- Điều hướng đến: quay lại VSV-004 (Chỉ số điện khi đi) sau khi lưu.
