# BOOK-053 — Đối soát đặt phòng đối tác (Partner Bookings)

**Loại:** Trang đầy đủ
**Route:** Booking/partnerBookings (mặc định: `/booking/partner-bookings`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các đặt phòng thuộc villa có hợp đồng partnership (`VillaContract.ownership_type = partnership`), dùng để chủ nhà/quản lý xác nhận (confirm) hoặc từ chối (reject) từng booking trước khi đưa vào luồng thanh toán đối tác (BOOK-052).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | |
| 2 | Trạng thái | `status` | Select | Không | New / Sent / Confirmed / Paid / Rejected / All Future / All |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Sr No | |
| 2 | Property | |
| 3 | Received | |
| 4 | Booking Number | |
| 5 | Check-in | |
| 6 | Check-out | |
| 7 | Status | Trạng thái PartnerBooking |
| 8 | Actions | Confirm/Reject |
| 9 | Last Action By | |

## Chức năng/nút thao tác
- Lọc theo BU/trạng thái
- Xác nhận booking đối tác (`confirmPartnerBooking`) — chuyển trạng thái sang confirmed
- Từ chối booking đối tác (`rejectPartnerBooking`) — chuyển trạng thái sang rejected
- Gửi email xác nhận đặt phòng cho chủ nhà kèm PDF (`sendEmailToBookingConfirmation`)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Partner Bookings
- Điều hướng tới: BOOK-052 (Partner Payments) khi booking được confirm
