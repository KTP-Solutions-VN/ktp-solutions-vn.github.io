# BOOK-034 — Kiểm soát chất lượng nhận phòng

**Loại:** Trang đầy đủ (mở tiếp theo từ BOOK-029/BOOK-029-P1)
**Route:** Booking/qualityControl/:checkin_detail_id/:date/:villa_id (mặc định: `/booking/quality-control/...`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Màn hình đối chiếu chất lượng thực hiện nhận phòng: so sánh nhân viên thực hiện với nhân viên được phân công (concierge), so sánh vị trí GPS thực tế với vị trí villa (cùng vị trí hay lệch), và so sánh giờ nhận phòng dự kiến (planned) với giờ thực tế (actual).

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `data_array.villa_name` | Text (readonly) | - | |
| 2 | Nhân viên thực hiện | `data_array.user_name` | Text (readonly) | - | Màu đỏ nếu khác concierge được phân công |
| 3 | Nhân viên được phân công | `data_array.planning_name` | Text (readonly) | - | Chỉ hiện khi khác nhân viên thực hiện |
| 4 | Vị trí | `data_array.location` | Text (readonly: same/differ) | - | So khoảng cách GPS villa vs vị trí thực hiện (ngưỡng 200m) |
| 5 | Giờ dự kiến | `data_array.planned_time` | Text (readonly) | - | |
| 6 | Giờ thực tế | (actual time) | Text (readonly) | - | |

## Chức năng/nút thao tác
- Đối chiếu tự động, không có thao tác chỉnh sửa — dùng để giám sát chất lượng thực hiện

## Điều hướng
- Mở từ: BOOK-029 (Kiểm soát nhận phòng) / BOOK-029-P1
- Không điều hướng tiếp — màn hình xem kết quả cuối
