# BOOK-063 — Đặt chỗ chưa đồng bộ (Unsynced Reservations)

**Loại:** Trang đầy đủ
**Route:** Booking/unlinkedBookings (mặc định: `/booking/unlinked-bookings`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Danh sách các đặt phòng chưa được kênh quản lý (channel manager) đánh dấu là đã chỉnh sửa/đồng bộ (`Booking.is_channel_modify = 0`), dùng để rà soát các booking có khả năng bị lệch dữ liệu giữa hệ thống và kênh OTA.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit`/`id` | Select2 | Không | |
| 2 | Sắp xếp theo | `sort_by` | Select | Không | Theo giá trị (amount) hoặc mặc định theo ngày check-in |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Check-in Date | |
| 2 | Villa | |
| 3 | OTA | Kênh đặt phòng (referer) |
| 4 | Confirmation Number | |
| 5 | Total Value | |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh, sắp xếp theo giá trị

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Unsynced Reservations
