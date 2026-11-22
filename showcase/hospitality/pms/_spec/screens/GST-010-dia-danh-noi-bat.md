# GST-010 — Điểm tham quan quanh đây (Sights Nearby)

**Loại:** Trang đầy đủ
**Route:** `Guest::landmark($booking_id = null)` — mặc định `/guest/landmark/:booking_id`; route đẹp (fallback DashedRoute): `/guest/landmark`
**Module:** Không gian khách

## Mô tả ngắn gọn
Hiển thị hình ảnh các địa danh/điểm đến nổi bật quanh khu vực (quận/huyện) nơi villa của khách toạ lạc. Nếu `booking_id` rỗng, tự động chuyển hướng về GST-002.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Tên biệt thự | `Booking.villa.name` / `short_name` | Text hiển thị | Không | Dùng ghép câu mô tả khu vực |
| 2 | Tên quận/huyện | `VillaLocation.district.name` | Text hiển thị | Không | |
| 3 | Hình ảnh địa danh | `CmsDestination` (theo `district_id`) → `CmsImage` (tag=`Destination`) | Danh sách ảnh | Không | Sắp xếp theo `sort ASC`; link mở trang azurastays.example đã bị vô hiệu hoá (comment) trong code, ảnh hiện chỉ để xem |

## Chức năng/nút thao tác
- Chỉ xem ảnh, không có thao tác click chuyển trang trên từng ảnh (liên kết ngoài đã bị comment trong mã nguồn).
- Icon **Home** → theo `home_redirect`.
- Icon **Logout** → đăng xuất, về GST-001.

## Điều hướng
- → GST-002 (khi `booking_id` không hợp lệ)
- → GST-001 (đăng xuất)
