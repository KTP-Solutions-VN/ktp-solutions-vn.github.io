# GST-008 — Danh sách nhà hàng gần biệt thự

**Loại:** Trang đầy đủ
**Route:** `Guest::restaurants($villa_id = null)` — mặc định `/guest/restaurants/:villa_id`; route đẹp (fallback DashedRoute): `/guest/restaurants`
**Module:** Cổng thông tin Khách

## Mô tả ngắn gọn
Danh sách các nhà hàng nằm trong bán kính 200m tính từ toạ độ villa khách đang lưu trú, thuộc cùng business unit với villa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Logo nhà hàng | `Restaurant.logo` | Ảnh | Không | Mặc định `default.jpg` nếu chưa có logo |
| 2 | Tên nhà hàng | `Restaurant.name` | Text hiển thị | Không | |
| 3 | (Tính toán khoảng cách — không hiển thị) | `Restaurant.latitude` / `Restaurant.longitude` so với `VillaLocation.lat/lng` | Nội bộ | Không | Chỉ nhà hàng có khoảng cách ≤ 200m mới được liệt kê (hàm `_getDistance`) |

## Chức năng/nút thao tác
- Click vào thẻ nhà hàng → mở GST-009 (Chi tiết nhà hàng) theo `restaurant_id`.
- Icon **Home** → theo `home_redirect`.
- Icon **Logout** → đăng xuất, về GST-001.

## Điều hướng
- → GST-009 (Chi tiết nhà hàng)
- → GST-001 (đăng xuất)
