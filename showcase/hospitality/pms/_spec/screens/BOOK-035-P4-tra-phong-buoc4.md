# BOOK-035-P4 — Trả phòng tại chỗ · Bước 4: Hoàn tất (On-site Check-out · Step 4: Wrap-up)

**Loại:** Popup (bước cuối quy trình trả phòng, mở từ BOOK-035-P3)
**Route:** Booking/checkOutStep4/:check_out_id (mặc định: `/booking/check-out-step4/:check_out_id`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Bước xác nhận cuối cùng hoàn tất quy trình trả phòng, xác nhận lại vị trí GPS trước khi ghi nhận kết thúc.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vĩ độ/Kinh độ | `lat`, `lon` | Hidden | - | GPS thiết bị xác nhận hoàn tất |

## Chức năng/nút thao tác
- Nút xác nhận hoàn tất quy trình trả phòng — ghi nhận kết quả vào BOOK-030 (Kiểm tra khi khách đi)

## Điều hướng
- Mở từ: BOOK-035-P3 (Trả phòng tại chỗ · Bước 3: Đánh giá của khách)
- Điều hướng tới: kết quả được ghi vào BOOK-030 (Kiểm tra khi khách đi) / BOOK-030-P1
