# VSV-011-P1 — Chi tiết chỉ số khi đến (Arrival Reading Detail)

**Loại:** Popup (mở từ VSV-011, dạng trang riêng)

**Route:** `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-control/<booking_id>`

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Trang chi tiết chỉ đọc (read-only), hiển thị đầy đủ thông tin chỉ số/ảnh đồng hồ điện, phương thức và tình trạng thanh toán check-in của một booking cụ thể, phục vụ nhân viên kiểm soát đối chiếu.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `booking.villa.name` | Text (đọc) | — | Tiêu đề card |
| 2 | Check-In Date | `booking.check_in_date` | Text (đọc) | — | Định dạng d M y |
| 3 | Check-Out Date | `booking.check_out_date` | Text (đọc) | — | |
| 4 | Guest Name | `booking.guest.first_name/last_name` | Text (đọc) | — | |
| 5 | Channel | `booking.referer` | Text (đọc) | — | Kênh đặt phòng |
| 6 | Payment Method & Options | `booking.payment_method_option` | Text (đọc) | — | Lấy từ `CommonController::getVillaElectricityRate()` |
| 7 | Start Meter | `booking.electrical_bill.start_meter` | Text (đọc) | — | N/A nếu chưa có |
| 8 | Meter Photo | `booking.electrical_bill.meter_photo` | Ảnh (đọc, click để phóng to) | — | Modal xem ảnh lớn |
| 9 | Done On | `booking.electrical_bill.start_date` + `meter_time` | Text (đọc) | — | Ngày giờ concierge hoàn tất |
| 10 | By | `booking.electrical_bill.user.usage_name` | Text (đọc) | — | Người thực hiện |
| 11 | Payment | tính từ `checkin_rate_type` + `electricity_rate_data_checkin` | Text (đọc) | — | Số tiền đã/ sẽ thu tùy phương thức |
| 12 | Account | tính từ phương thức thanh toán | Text (đọc) | — | Tài khoản/quỹ nhận, hoặc "Collected by platform" |
| 13 | Reception Confirmed | `booking.electrical_bill.is_amount_received` | Text (đọc) | — | Yes/No |

## Chức năng/nút thao tác
- Click ảnh đồng hồ để phóng to trong modal (Image Preview Modal).
- Không có nút lưu/sửa — đây là trang xem thuần túy.
- Nếu `id` không hợp lệ → Flash lỗi "Invalid booking ID." và redirect về VSV-011.

## Điều hướng
- Vào từ: VSV-011 — nút "View" trên từng dòng booking.
- Điều hướng đến: quay lại VSV-011 qua breadcrumb/back link.
