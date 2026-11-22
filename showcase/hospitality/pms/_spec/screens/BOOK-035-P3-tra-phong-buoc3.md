# BOOK-035-P3 — Trả phòng tại chỗ · Bước 3: Đánh giá của khách (On-site Check-out · Step 3: Guest Rating)

**Loại:** Popup (bước 3 của quy trình trả phòng, mở từ BOOK-035-P2)
**Route:** Booking/checkOutStep3/:check_out_id (mặc định: `/booking/check-out-step3/:check_out_id`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Bước ghi nhận đánh giá mức độ hài lòng của khách khi trả phòng (thang điểm sao) kèm nhận xét, và xác nhận GPS vị trí thực hiện.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | ID trả phòng | `check_out_id` | Hidden | - | |
| 2 | Điểm đánh giá | `ratings` | Hidden (mặc định 5) | - | Chọn qua UI sao (star rating) |
| 3 | Nhận xét | `review` | Hidden/Textarea | - | |
| 4 | Cờ chuyển đổi | `is_toggle` | Hidden (mặc định no) | - | |
| 5 | Vĩ độ/Kinh độ | `lat`, `lon` | Hidden | - | GPS thiết bị |

## Chức năng/nút thao tác
- Chọn số sao đánh giá hài lòng khách
- Nhập nhận xét
- Nút tiếp tục sang Bước 4

## Điều hướng
- Mở từ: BOOK-035-P2 (Trả phòng tại chỗ · Bước 2: Kiểm tra hư hỏng)
- Điều hướng tới: BOOK-035-P4 (Bước 4: Hoàn tất)
