# USR-015 — Phân tích đặt chỗ (Reservation Analytics)

**Loại:** Trang đầy đủ

**Route:** `UserController::statistics()` — mặc định `user/statistics`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang báo cáo/thống kê tổng hợp về đặt phòng (booking) theo khoảng thời gian, đơn vị kinh doanh (business unit) và kênh bán (channel): tổng số booking, tổng số đêm, độ dài lưu trú trung bình, thời gian đặt trước trung bình (lead time), phân bổ theo thời gian đặt trước, phân bổ theo ngày trong tháng/tuần và báo cáo theo quốc tịch khách.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field (label) | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Khoảng thời gian (tháng) | `selected_months` | Date range/tháng picker | Không | Mặc định là tháng trước; gửi kèm POST |
| 2 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | Lấy theo `business_units` mà user có quyền truy cập |
| 3 | Kênh bán (channel) | `channel_name` | Select2 | Không | Lọc `Booking.referer LIKE` |

**Số liệu/khối hiển thị:**

| # | Khối | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tổng số booking | `data_arr.total_arr.total_booking` | KPI |
| 2 | Tổng số đêm | `data_arr.total_arr.total_night` | KPI |
| 3 | Độ dài lưu trú TB | `data_arr.total_arr.average_length_of_stay` | KPI |
| 4 | Thời gian đặt trước TB (ngày) | `data_arr.total_arr.average_lead_time` | KPI |
| 5 | Phân bổ theo thời gian đặt trước | `data_arr.lead_time_distribution` | Bảng/biểu đồ |
| 6 | Giá trung bình theo lead time | `data_arr.average_price_by_lead_time` | Bảng |
| 7 | Tỷ lệ đặt theo đầu/giữa/cuối tháng | `data_arr.total_arr.booking_day_of_month` | 3 khối % |
| 8 | Xu hướng theo ngày trong tuần | `data_arr.day_of_week_pattern` | Bảng (ngày đặt / ngày check-in) |
| 9 | Báo cáo theo quốc tịch | `data_arr.nationality_report` | Bảng, kèm badge màu theo avg lead time |

## Chức năng/nút thao tác
- **Lọc (submit form GET/POST):** tính lại toàn bộ số liệu theo bộ lọc đã chọn.

## Điều hướng
- Vào từ: menu Workforce → Reservation Analytics.
- Không điều hướng tiếp sang màn hình khác.
