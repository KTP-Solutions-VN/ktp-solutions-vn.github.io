# GST-009 — Thông tin nhà hàng (Restaurant Profile)

**Loại:** Trang đầy đủ
**Route:** `Guest::restaurant($restaurant_id = null)` — mặc định `/guest/restaurant/:restaurant_id`; route đẹp (fallback DashedRoute): `/guest/restaurant`
**Module:** Không gian khách

## Mô tả ngắn gọn
Trang chi tiết một nhà hàng: ảnh, địa chỉ, bản đồ, đánh giá, mô tả, thực đơn, giờ mở cửa và số điện thoại liên hệ. Được mở từ danh sách nhà hàng GST-008 bằng liên kết trang đầy đủ (không phải popup/modal).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Ảnh nhà hàng (carousel) | `Restaurant.restaurant_image[].image` | Ảnh (Bootstrap carousel) | Không | Nhiều ảnh, ảnh đầu tiên active mặc định |
| 2 | Logo nhà hàng | `Restaurant.logo` | Ảnh | Không | |
| 3 | Tên nhà hàng | `Restaurant.name` | Text hiển thị | Không | |
| 4 | Địa chỉ | `Restaurant.address` | Text hiển thị | Không | |
| 5 | Link bản đồ | `Restaurant.google_map_link` | Link (mở tab mới) | Không | |
| 6 | Đánh giá | `Restaurant.rating` | Thang sao 1–5 (hỗ trợ nửa sao) | Không | |
| 7 | Mô tả | `Restaurant.description` | Text/HTML hiển thị | Không | |
| 8 | Link thực đơn | `Restaurant.food_menu_link` | Link (mở tab mới) | Không | |
| 9 | Giờ mở cửa | `Restaurant.hours` | Text hiển thị | Không | |
| 10 | Số điện thoại | `Restaurant.phone_number` | Link `tel:` | Không | Chỉ hiển thị khi có giá trị |

## Chức năng/nút thao tác
- Click **"Location"** → mở Google Maps ở tab mới.
- Click **"Food Menu"** → mở link thực đơn ở tab mới.
- Click **số điện thoại** → gọi điện trực tiếp (`tel:`).
- Icon **Home** → theo `home_redirect`.

## Điều hướng
- Không có link quay lại GST-008 trực tiếp trong trang (dùng nút back trình duyệt hoặc icon Home).
- Icon Home → GST-002/GST-004 tuỳ `home_redirect`.
