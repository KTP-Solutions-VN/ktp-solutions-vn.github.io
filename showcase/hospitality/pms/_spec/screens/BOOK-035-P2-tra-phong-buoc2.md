# BOOK-035-P2 — Trả phòng — Bước 2: Kiểm tra điểm kiểm soát/hư hỏng

**Loại:** Popup (bước 2 của quy trình trả phòng, mở từ BOOK-035)
**Route:** Booking/checkOutStep2/:check_out_id (mặc định: `/booking/check-out-step2/:check_out_id`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Bước kiểm tra từng điểm kiểm soát villa khi trả phòng, ghi nhận hư hỏng (issue) phát sinh kèm mô tả, người chịu trách nhiệm, số tiền bồi thường và ảnh chụp hiện trạng.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | ID trả phòng | `check_out_id` | Hidden | - | |
| 2 | ID điểm kiểm soát villa | `villa_control_id` | Hidden | - | |
| 3 | Có phát sinh hư hỏng không | `issue` | Hidden (Yes/No, mặc định No) | - | Cập nhật qua thao tác chọn trên giao diện |
| 4 | Người chịu trách nhiệm | `issued_to` | Hidden (mặc định None) | - | |
| 5 | Mô tả hư hỏng | `issue_description` | Hidden/Textarea | - | |
| 6 | Theo dõi thanh toán bồi thường | `issue_payment_track` | Hidden (mặc định None) | - | |
| 7 | Số tiền bồi thường | `issue_amount` | Hidden | - | |
| 8 | Số tiền đã thanh toán | `amount_paid` | Hidden | - | |
| 9 | Ảnh chụp hiện trạng | `cropped_image` | File/Canvas (chụp và cắt ảnh) | Không | |

## Chức năng/nút thao tác
- Đánh dấu từng điểm kiểm soát: đạt / có hư hỏng
- Nhập mô tả hư hỏng, người chịu trách nhiệm, số tiền bồi thường/đã thanh toán
- Chụp và đính kèm ảnh hiện trạng villa
- Nút tiếp tục sang Bước 3

## Điều hướng
- Mở từ: BOOK-035 (Trả phòng — Bước 1)
- Điều hướng tới: BOOK-035-P3 (Bước 3: Đánh giá hài lòng)
