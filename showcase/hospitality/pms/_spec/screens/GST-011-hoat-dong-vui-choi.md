# GST-011 — Hoạt động quanh đây (Things to Do Nearby)

**Loại:** Trang đầy đủ
**Route:** `Guest::activities($booking_id = null)` — mặc định `/guest/activities/:booking_id`; route đẹp (fallback DashedRoute): `/guest/activities`
**Module:** Không gian khách

## Mô tả ngắn gọn
Trang gợi ý hoạt động vui chơi/giải trí quanh khu vực villa. Nếu `booking_id` rỗng, tự động chuyển hướng về GST-002. **Lưu ý:** toàn bộ logic lấy dữ liệu theo booking (tên villa, quận/huyện, ảnh điểm đến) trong action đã bị **comment (vô hiệu hoá)** trong controller — nội dung hiển thị hiện là nội dung tĩnh, không phụ thuộc booking.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Ảnh hero | Ảnh tĩnh (hard-code trong view) | Ảnh | Không | `green-season-activities/img2.jpg` |
| 2 | Link "Fitness & Wellness" | URL tĩnh `azurastays.example/.../fitness-wellness.html` | Link ngoài (mở tab mới) | Không | |
| 3 | Link "Shopping & Entertainment" | URL tĩnh `azurastays.example/.../shopping-entertainment.html` | Link ngoài (mở tab mới) | Không | |
| 4 | Link "Indoor/Outdoor Activities" | URL tĩnh `azurastays.example/.../indoor-outdoor-activities.html` | Link ngoài (mở tab mới) | Không | |
| 5 | Đoạn văn bản gợi ý mùa mưa | Text tĩnh (hard-code) | Text hiển thị | Không | Nội dung tiếng Anh cố định trong view, chưa qua cơ chế đa ngôn ngữ `staticText` |

## Chức năng/nút thao tác
- Click từng ảnh/khối nội dung → mở liên kết ngoài (trang azurastays.example) ở tab mới.
- Icon **Home** → theo `home_redirect`.

## Điều hướng
- → GST-002 (khi `booking_id` không hợp lệ)
- → Trang ngoài azurastays.example (không thuộc phạm vi hệ thống PMS)
