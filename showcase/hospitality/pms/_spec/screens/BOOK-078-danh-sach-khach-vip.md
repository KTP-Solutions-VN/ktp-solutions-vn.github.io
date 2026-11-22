# BOOK-078 — Khách VIP sắp đến (VIP Arrivals)

**Loại:** Trang đầy đủ
**Route:** Booking/vipGuests/:id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (URL sử dụng dạng `/vip-guests?id=...` theo script trong view)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình cấu hình tiêu chí xác định khách VIP/VIP 5* (theo số đêm lưu trú và giá trị booking) cho từng đơn vị kinh doanh, đồng thời hiển thị danh sách các booking hiện tại đạt tiêu chí VIP để chuẩn bị đón tiếp đặc biệt.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Không | Đổi giá trị sẽ tải lại trang với `?id=` tương ứng |

### Bảng cấu hình tiêu chí VIP (form cập nhật)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Trạng thái | `data[key][name]` (ẩn) | Hidden text | - | "VIP" hoặc "VIP 5*" |
| 2 | Giá trị | `data[key][price]` | Number/Text | Có | Ngưỡng giá trị booking (SGD) |
| 3 | Liên kết điều kiện | `data[key][link]` | Select | Có | AND / OR — kết hợp điều kiện số đêm và giá trị |
| 4 | Số đêm | `data[key][duration]` | Number/Text | Có | Ngưỡng số đêm lưu trú (mặc định VIP=8, VIP 5*=15) |

### Bảng danh sách booking đạt tiêu chí VIP
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Check-in | Ngày nhận phòng |
| 2 | Check-out | Ngày trả phòng |
| 3 | Villa | Tên villa |
| 4 | Tên khách | Tên khách đặt phòng |
| 5 | Trạng thái | "VIP" hoặc "VIP 5*" |
| 6 | Tiêu chí | Diễn giải (VD: "2000 SGD-10 nights") |
| 7 | Hành động | Icon Ban (chặn theo dõi VIP), icon "Get Ready" theo màu: đỏ = chưa mở nhóm chat, xanh dương = đã mở nhóm chat nhưng chưa có công việc chuẩn bị, xanh lá = đã có công việc chuẩn bị (mở BOOK-079) |

## Chức năng/nút thao tác
- Chọn đơn vị kinh doanh — tải lại trang
- Nút **Update** — lưu cấu hình tiêu chí VIP (submit form, controller re-tính danh sách booking VIP theo tiêu chí mới)
- Icon **Ban** (chặn) trên từng booking — mở modal xác nhận, gọi `banVipBooking/:booking_id` khi xác nhận (ẩn booking khỏi danh sách VIP)
- Icon **Get Ready** màu đỏ — hiện cảnh báo "vui lòng mở nhóm chat trước"
- Icon **Get Ready** màu xanh dương/xanh lá — mở BOOK-079 (`preparationWork`) để ghi nhận công việc chuẩn bị đón khách

## Điều hướng
- Mở từ: Menu module Đặt chỗ > VIP Arrivals
- Điều hướng tới: BOOK-079 (Chuẩn bị đón khách VIP) khi bấm icon Get Ready
