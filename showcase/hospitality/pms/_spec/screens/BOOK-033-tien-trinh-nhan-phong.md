# BOOK-033 — Theo dõi nhận phòng (Check-in Tracker)

**Loại:** Trang đầy đủ (mở tiếp theo từ BOOK-032)
**Route:** Booking/checkinProgress/:id/:date/:villa_id (mặc định: `/booking/checkin-progress/:id/:date/:villa_id`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình theo dõi tiến trình thực hiện quy trình nhận phòng tại villa theo thời gian thực, cho phép nhân viên huỷ (Cancel) hoặc hoàn tất (Finish) quy trình nhận phòng.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vĩ độ | `lat` | Hidden | - | GPS thiết bị |
| 2 | Kinh độ | `lon` | Hidden | - | GPS thiết bị |
| 3 | ID bản ghi kiểm soát | `id` | Hidden | - | |

## Chức năng/nút thao tác
- Nút **Cancel** — huỷ tiến trình nhận phòng đang thực hiện
- Nút **Finish** — hoàn tất tiến trình nhận phòng, ghi nhận kết quả vào BOOK-029

## Điều hướng
- Mở từ: BOOK-032 (Nhận phòng tại chỗ)
- Điều hướng tới: kết quả được ghi vào BOOK-029 (Kiểm tra khi khách đến) / BOOK-029-P1
