# BOOK-029 — Kiểm soát nhận phòng (Check-in Control)

**Loại:** Trang đầy đủ
**Route:** Booking/checkInControl (mặc định: `/booking/check-in-control`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các điểm kiểm soát (control point) villa cần thực hiện khi nhận phòng, cho từng villa/nhân viên phụ trách, kèm thời gian bắt đầu/kết thúc, vị trí GPS xác nhận và ghi chú (comments).

## Mô tả chi tiết
Danh sách hiển thị dạng bảng, cột:
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Villa (icon nhà) | Tên villa |
| 2 | Nhân viên (icon người) | Nhân viên thực hiện |
| 3 | Start | Thời gian bắt đầu |
| 4 | End | Thời gian kết thúc |
| 5 | GPS | Toạ độ xác nhận vị trí thực hiện |
| 6 | Comments | Ghi chú (rộng 25%) |
| 7 | Actions | Nút thao tác (xem chi tiết) |

## Chức năng/nút thao tác
- Xem chi tiết từng điểm kiểm soát (mở BOOK-029-P1)
- Lọc/thu gọn nhóm theo villa (nút đóng nhóm "closeBtn")

## Điều hướng
- Mở từ: Menu module Đặt phòng > Check-in Control
- Điều hướng tới: BOOK-029-P1 (Chi tiết điểm kiểm soát nhận phòng)
