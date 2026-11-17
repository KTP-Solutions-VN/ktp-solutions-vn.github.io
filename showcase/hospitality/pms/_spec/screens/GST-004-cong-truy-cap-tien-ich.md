# GST-004 — Cổng truy cập tiện ích

**Loại:** Trang đầy đủ
**Route:** `Guest::accessPortal($booking_id = null)` — mặc định `/guest/access-portal/:booking_id`; route đẹp (fallback DashedRoute): `/guest/access-portal`
**Module:** Cổng thông tin Khách

## Mô tả ngắn gọn
Trang trung tâm (hub) gồm 4 icon điều hướng tới các nhóm chức năng tiện ích dành cho khách đang lưu trú: Đặt phòng của tôi, Nhà hàng, Hoạt động, Địa danh. Được mở khoá sau khi khách xác nhận xong giờ đến/giờ đi ở GST-003, hoặc được hệ thống bắt buộc chuyển tới khi tài khoản khách chưa có booking hợp lệ (`total_booking == 0`, kiểm tra ở `beforeFilter`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Icon "Đặt phòng của tôi" | Link → `Guest::bookings` | Icon liên kết | Không | Ảnh `Booking-Icon.jpg` |
| 2 | Icon "Nhà hàng" | Link → `Guest::restaurants($villa_id)` | Icon liên kết | Không | Ảnh `Restaurant2-Icon.jpg`; `villa_id` lấy từ booking đang xem |
| 3 | Icon "Hoạt động" | Link → `Guest::activities($booking_id)` | Icon liên kết | Không | Ảnh `Activities-Icon.jpg` |
| 4 | Icon "Địa danh" | Link → `Guest::landmark($booking_id)` | Icon liên kết | Không | Ảnh `Landmark-Icon.jpg` |

Nếu `booking_id` truyền vào không hợp lệ/không tìm thấy `Booking`, hệ thống tự động chuyển hướng về GST-002.

## Chức năng/nút thao tác
- Click từng icon để mở màn hình con tương ứng.
- Icon **Home** → theo `home_redirect`.
- Icon **Logout** → đăng xuất, về GST-001.

## Điều hướng
- → GST-002 (Đặt phòng của tôi), hoặc tự động khi `booking_id` không hợp lệ
- → GST-008 (Danh sách nhà hàng)
- → GST-011 (Hoạt động vui chơi)
- → GST-010 (Địa danh nổi bật)
- → GST-001 (đăng xuất)
