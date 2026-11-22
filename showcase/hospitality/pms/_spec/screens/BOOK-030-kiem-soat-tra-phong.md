# BOOK-030 — Kiểm tra khi khách đi (Departure Audit)

**Loại:** Trang đầy đủ
**Route:** Booking/checkOutControl (mặc định: `/booking/check-out-control`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Danh sách các điểm kiểm soát villa cần thực hiện khi trả phòng, kèm ghi nhận hư hỏng (Damage) và mức độ hài lòng khách (Satisfaction), tương tự BOOK-029 nhưng cho quy trình trả phòng.

## Mô tả chi tiết
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Villa (icon nhà) | Tên villa |
| 2 | Nhân viên (icon người) | Nhân viên thực hiện |
| 3 | Start | Thời gian bắt đầu |
| 4 | End | Thời gian kết thúc |
| 5 | GPS | Toạ độ xác nhận |
| 6 | Damage | Ghi nhận hư hỏng phát sinh |
| 7 | Comments | Ghi chú |
| 8 | Satisfaction | Điểm hài lòng khách |
| 9 | Action | Nút thao tác (xem chi tiết) |

## Chức năng/nút thao tác
- Xem chi tiết từng điểm kiểm soát trả phòng (mở BOOK-030-P1)

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Departure Audit
- Điều hướng tới: BOOK-030-P1 (Chi tiết điểm kiểm tra khi đi)
