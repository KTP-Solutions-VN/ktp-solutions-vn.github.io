# VSV-005-P1 — Ghi chỉ số lưu trú dài ngày (Record Extended-Stay Reading)

**Loại:** Popup (mở từ VSV-005, dạng trang riêng)

**Route:** `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-stay-meter/<booking_id>`; lưu qua `saveLongStayDiscount()` (POST, không có view riêng)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Form nhập chu kỳ đo điện định kỳ cho khách lưu trú dài hạn (bảng `IntermediaryPayment`, tách khỏi `ElectricalBill` một lần của luồng ngắn hạn). Mỗi lần lưu tạo một kỳ đo mới, chỉ số cuối kỳ trước tự động trở thành chỉ số đầu kỳ sau.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Start meter | `start_meter` | Số, đọc từ kỳ trước | — | Tự động điền = end meter của kỳ liền trước |
| 2 | End meter | `meter` | Số | Có | Xác nhận qua modal "Do you confirm the meter number?" |
| 3 | Ngày | `date` | Text + datepicker | Có | |
| 4 | Giờ ghi | `end_meter_time` | Time picker | Có | |
| 5 | Ảnh khu vực công tơ | `end_meter_area_photo` | File | Có | |
| 6 | Ảnh số công tơ | `end_meter_photo` | File | Có | |
| 7 | Ghi chú | `end_meter_comment` | Textarea | Không | |
| 8 | Số tiền phải thu | `amount` | Số | Có | So với `default_bill` tính tự động theo đơn giá villa |
| 9 | Lý do chênh lệch | `reason` | Text | Có nếu lệch | |
| 10 | Giảm giá | `discount` | Số | Không | |
| 11 | Người phê duyệt | `approved_by` | Select | Có nếu có giảm giá | |
| 12 | Người thanh toán | `paid_by` | Select (`PAYMERCHANT`) | Có | |
| 13 | Số tiền hoàn trả | `return_amount` | Số | Không | |
| 14 | Người trả thêm / Số tiền thêm | `additional_paid_by`, `additional_received` | Select + số | Không | |
| 15 | Villa ID / Booking ID | `villa_id` (hidden) | Hidden | — | |

## Chức năng/nút thao tác
- **Save:** POST tới `saveLongStayDiscount`; tạo bản ghi `IntermediaryPayment` mới cho kỳ đo, tính `default_bill` theo đơn giá villa, so khớp với `amount` nhập; nếu đã có kỳ trước thì đóng kỳ đó (end meter/end date) trước khi mở kỳ mới; sau khi lưu redirect về VSV-005 (`partial`).
- Modal xác nhận số công tơ trước khi submit (giống VSV-004-P1).

## Điều hướng
- Vào từ: VSV-005 — nút "Enter".
- Điều hướng đến: quay lại VSV-005 (Đo điện lưu trú dài ngày) sau khi lưu.
