# VSV-003-P1 — Nhập chỉ số đồng hồ điện đầu kỳ (Start Meter)

**Loại:** Popup (mở từ VSV-003, dạng trang riêng — mở tab mới khi bấm "Enter")

**Route:** Xem `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<booking_id>`; lưu qua `VillaServicesController::saveMeter()` — `/villa-services/save-meter` (POST, không có view riêng, luôn redirect)

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Form nhập chỉ số công tơ điện tại thời điểm khách check-in cho một booking cụ thể: chỉ số đồng hồ, ảnh khu vực công tơ, ảnh cận cảnh số công tơ, giờ ghi, và (tuỳ chọn) thu tiền đặt cọc điện ngay lúc check-in.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Start meter | `start_meter` | Số | Có | Xác nhận lại qua modal "Do you confirm the meter number?" trước khi submit |
| 2 | Ngày bắt đầu | `start_date` | Text + datepicker | Có | |
| 3 | Giờ ghi (meter time) | `meter_time` | Time picker | Có | |
| 4 | Ảnh khu vực công tơ | `area_photo` / `cropped_area_image` | File ảnh hoặc ảnh crop (base64) từ camera | Có (1 trong 2) | Nếu không chụp mới thì giữ ảnh cũ của villa |
| 5 | Ảnh số công tơ | `meter_photo` / `cropped_meter_image` | File ảnh hoặc ảnh crop (base64) từ camera | Có (1 trong 2) | |
| 6 | Ghi chú khu vực công tơ | `comment` | Textarea | Không | Lưu vào `Villa.comment` |
| 7 | Có thu tiền đặt cọc điện không | `payment_collection` | Select (yes/no) | Có | |
| 8 | Số tiền đặt cọc | `deposit_received` | Số | Có nếu `payment_collection = yes` | |
| 9 | Loại tiền | `currency_id` | Select (danh mục `Currency`) | Có nếu thu tiền | |
| 10 | Phương thức thanh toán check-in | `check_in_payment_method` | Select (`PaymentMethod`) | Có nếu thu tiền | |
| 11 | Booking ID | `booking_id` | Hidden | — | |

Thông tin chỉ đọc hiển thị kèm: tên khách, villa, ngày check-in/check-out, mức giá điện mặc định của villa (`ElectricalDefault`: Price per kWh / Fixed Daily Price / Free Daily Quota), người cập nhật gần nhất (nếu đã có dữ liệu trước đó).

## Chức năng/nút thao tác
- **Save:** submit POST tới `saveMeter`; ghi `CheckInDetail.electricity_reading_start`, tạo/cập nhật `ElectricalBill` (status = Pending), cập nhật ảnh khu vực công tơ vào `Villa`, gửi thông báo cho quản lý BU; sau đó redirect về VSV-003 (`checkIn`).
- Modal xác nhận số công tơ ("Do you confirm the meter number?") trước khi lưu, tránh nhập nhầm.
- **Cancel/Back:** quay lại VSV-003.

## Điều hướng
- Vào từ: VSV-003 — nút "Enter" trên từng dòng booking.
- Điều hướng đến: quay lại VSV-003 (Check-in điện) sau khi lưu.
