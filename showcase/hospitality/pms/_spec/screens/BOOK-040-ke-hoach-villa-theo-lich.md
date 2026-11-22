# BOOK-040 — Lịch bàn giao dạng lịch (Handover Calendar)

**Loại:** Trang đầy đủ
**Route:** Booking/planning/:date? (mặc định: `/booking/planning`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình lịch (calendar) trực quan thể hiện kế hoạch nhận/trả phòng và lịch làm việc của concierge theo villa/đơn vị kinh doanh và theo ngày, cho phép xem nhanh tình trạng sẵn sàng của đội ngũ (Team Availability).

## Mô tả chi tiết

### Bộ lọc/điều khiển
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày | `date` | Datepicker (nút chọn ngày) | Không | Truyền qua route/query `date` |
| 2 | Đơn vị kinh doanh | `business_unit`/`id` | Nút chọn (dropdown) | Không | |
| 3 | Team Availability | nút `#team-avail` | Nút chuyển chế độ xem | Không | Hiển thị tình trạng sẵn sàng của team |
| 4 | Planning | nút `#team-plan` | Nút chuyển chế độ xem | Không | Hiển thị chế độ lịch kế hoạch |

### Bảng dữ liệu (tải AJAX theo villa/ngày)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Name | Tên khách/nhân viên |
| 2 | Avatar | Ảnh đại diện |
| 3 | Check-in | Ngày/giờ nhận phòng |
| 4 | Check-out | Ngày/giờ trả phòng |
| 5 | Start | Giờ bắt đầu ca/nhiệm vụ |
| 6 | End | Giờ kết thúc ca/nhiệm vụ |

## Chức năng/nút thao tác
- Chuyển đổi giữa chế độ xem "Team Availability" và "Planning"
- Điều hướng theo ngày, lọc theo đơn vị kinh doanh
- Cập nhật kế hoạch (liên kết action `savePlanning`, `updateBookingPlan`)

## Điều hướng
- Mở từ: BOOK-039 (Lịch bàn giao), Menu module Đặt chỗ > Handover Calendar
- Điều hướng tới: BOOK-041 (Lịch trực concierge)
