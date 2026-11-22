# BOOK-077 — Bảng khách đến (Arrivals Board)

**Loại:** Trang đầy đủ
**Route:** Booking/guestArrival
**Route đẹp:** `/booking/guest-arrival`
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang trung tâm theo dõi khách đến (thay thế màn hình "Pre Arrival Information" cũ), hiển thị danh sách booking dưới dạng 5 tab (Đến theo ngày, Check-in online mới, Cảnh báo, Chưa trả phòng, Lưu trữ) với bộ lọc theo đơn vị kinh doanh, ngày, trạng thái check-in online và tìm kiếm. Dữ liệu bảng được tải qua AJAX (không phải server-render truyền thống).

## Mô tả chi tiết

### Tab hiển thị (kèm số đếm)
| # | Tab | Field code | Ghi chú |
|---|---|---|---|
| 1 | Đến theo ngày | `arrivals` | Booking có ngày check-in >= ngày được chọn |
| 2 | Check-in online mới | `online` | Booking đã nộp thông tin qua cổng portal nhưng chưa được nhân viên duyệt (`portal_submitted_at` có giá trị, `portal_reviewed_at` chưa có) |
| 3 | Cảnh báo | `alerts` | Booking cận giờ đến (trong 48h), yêu cầu check-in sớm/check-out muộn chưa duyệt, hoặc quá hạn check-in online, và chưa bị người dùng "bỏ qua" cảnh báo |
| 4 | Chưa trả phòng | `missing_checkout` | Đã check-in xong nhưng chưa ghi nhận giờ khởi hành dự kiến |
| 5 | Lưu trữ | `archive` | Booking đã hoàn tất check-out |

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select | Không | Mặc định "Tất cả BU được phân quyền"; lưu cookie khi đổi |
| 2 | Từ ngày | `date` | Date picker | Không | Mặc định hôm nay, không cho chọn ngày quá khứ |
| 3 | Trạng thái check-in online | `status` | Select | Không | Tất cả / Chưa bắt đầu / Đang xử lý / Hoàn tất |
| 4 | Chỉ yêu cầu | `requests_only` | Toggle | Không | Chỉ hiện booking có yêu cầu check-in/check-out sớm/muộn đang chờ duyệt |
| 5 | Tìm kiếm | `search` | Text | Không | Tìm theo mã booking, mã Beds24, mã xác nhận, kênh OTA (referer), tên villa, tên/họ khách, số hiệu chuyến bay |

### Cột hiển thị (mỗi dòng booking)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Villa & khách | Tên villa, ảnh, tên khách |
| 2 | Đến & đi | Ngày/giờ check-in, check-out; số khách đi cùng (companion) và trạng thái hộ chiếu đã upload |
| 3 | Nhóm & tài liệu | Trạng thái nhóm chat Azura Mobi, hợp đồng khách đã ký |
| 4 | Check-in online | Trạng thái hoàn thành form check-in online của khách (not_started/in_progress/complete) |
| 5 | Quyết định yêu cầu | Yêu cầu check-in sớm/check-out muộn: duyệt/từ chối, giờ đã thống nhất |
| 6 | (ẩn) | Nút hành động nhanh |

## Chức năng/nút thao tác
- Chuyển tab (Arrivals/Online/Alerts/Missing check-out/Archive) — gọi `guestArrivalList` (AJAX)
- Nạp số đếm badge từng tab — gọi `guestArrivalCounts` (AJAX)
- Nút "Load 25 more bookings" — phân trang tải thêm
- Xem "5-day occupancy" (lịch trống 5 ngày villa) trong modal — gọi `guestArrivalOccupancy` (AJAX)
- Cập nhật giờ đến/đi thống nhất với khách (modal "Update guest time") — gọi `decideGuestArrivalTime` (AJAX)
- Xác nhận số khách khi số khách thực tế khác với booking (modal xác nhận) — gọi `confirmGuestArrivalGuestCount` (AJAX)
- Duyệt yêu cầu check-in online của khách — gọi `reviewGuestArrivalCheckin` (AJAX)
- Bỏ qua (dismiss) một cảnh báo — gọi `dismissGuestArrivalAlert` (AJAX)
- Tải hộ chiếu khách (`downloadGuestArrivalPassports`), hợp đồng (`downloadGuestArrivalContract`), trang concierge (`downloadGuestArrivalConciergePage`) — các link tải file, không phải màn hình riêng

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Arrivals Board
- Điều hướng tới: không có trang con riêng, mọi thao tác chi tiết thực hiện qua modal/drawer trong cùng trang

**Ghi chú bổ sung:** Các action `guestArrivalList`, `guestArrivalCounts`, `guestArrivalOccupancy`, `decideGuestArrivalTime`, `reviewGuestArrivalCheckin`, `confirmGuestArrivalGuestCount`, `dismissGuestArrivalAlert` đều trả JSON thuần (không có view .ctp riêng) và chỉ là API hỗ trợ cho màn `guest_arrival.ctp` — không tách file riêng theo đúng yêu cầu.
