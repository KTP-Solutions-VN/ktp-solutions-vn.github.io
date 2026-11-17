# VSV-012-P1 — Xem chi tiết kiểm soát check-out điện

**Loại:** Popup (mở từ VSV-012, dạng trang riêng)

**Route:** `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-control/<booking_id>`

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Trang chi tiết chỉ đọc, gộp thông tin điện của cả check-in lẫn check-out cho một booking: chỉ số đầu/cuối kỳ, ảnh đồng hồ, phương thức và số tiền thanh toán mỗi chiều, trạng thái xác nhận thu tiền.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Check-In Date / Check-Out Date | `booking.check_in_date` / `check_out_date` | Text (đọc) | — | |
| 2 | Guest Name / Channel | `booking.guest`, `booking.referer` | Text (đọc) | — | |
| 3 | Payment Method & Options (check-in) | `check_in_payment_method` | Text (đọc) | — | Từ `getPaymentMethodString()` với `checkin_rate_type` |
| 4 | Start Meter / Meter Photo (check-in) | `electrical_bill.start_meter/meter_photo` | Text/Ảnh (đọc) | — | Click ảnh để phóng to |
| 5 | Done On / By (check-in) | `electrical_bill.start_date`, `user.usage_name` | Text (đọc) | — | |
| 6 | Payment / Account (check-in) | tính từ `checkin_rate_type` | Text (đọc) | — | |
| 7 | End Meter / Meter Photo (check-out) | `electrical_bill.end_meter/meter_photo` | Text/Ảnh (đọc) | — | |
| 8 | Done On / By (check-out) | `electrical_bill.end_date`, `check_out_by_user.usage_name` | Text (đọc) | — | |
| 9 | Payment / Account (check-out) | tính từ `rate_type` | Text (đọc) | — | |
| 10 | Payment Method & Options (check-out) | `check_out_payment_method` | Text (đọc) | — | Từ `getPaymentMethodString()` với `rate_type` |
| 11 | Reception Confirmed | `electrical_bill.is_amount_received` | Text (đọc) | — | Yes/No |

## Chức năng/nút thao tác
- Click ảnh đồng hồ (check-in hoặc check-out) để phóng to trong modal.
- Không có nút lưu/sửa — trang xem thuần túy.
- Nếu `id` không hợp lệ → Flash lỗi "Invalid booking ID." và redirect về VSV-012.

## Điều hướng
- Vào từ: VSV-012 — nút "View" trên từng dòng booking.
- Điều hướng đến: quay lại VSV-012.
