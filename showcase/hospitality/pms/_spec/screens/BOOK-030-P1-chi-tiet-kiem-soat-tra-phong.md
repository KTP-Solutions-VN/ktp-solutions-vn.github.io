# BOOK-030-P1 — Chi tiết điểm kiểm soát trả phòng

**Loại:** Popup (mở từ BOOK-030)
**Route:** Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id
**Module:** Đặt phòng

## Mô tả ngắn gọn
Popup xem chi tiết một lượt kiểm soát trả phòng: thông tin villa, đánh giá mức hài lòng, ghi chú hư hỏng/comment và các hạng mục kiểm soát điểm.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa (Property) | `data_array.name` | Text (readonly) | - | |
| 2 | Điểm hài lòng | `satisfaction_text` | Text (readonly) | - | |
| 3 | Ghi chú/Comment | `comment_text` | Text (readonly) | - | |
| 4 | Điểm kiểm soát (point) | `point_text` | Bảng con | - | Danh sách hạng mục kiểm soát trả phòng |

## Chức năng/nút thao tác
- Xem chi tiết kết quả kiểm soát trả phòng theo từng hạng mục

## Điều hướng
- Mở từ: BOOK-030 (Kiểm soát trả phòng)
- Đóng popup quay lại BOOK-030
