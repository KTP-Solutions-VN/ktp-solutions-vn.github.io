# GST-006 — Ngày lễ địa phương (Local Holidays)

**Loại:** Trang đầy đủ
**Route:** `Guest::yourHolidays()` — mặc định `/guest/your-holidays`; route đẹp (fallback DashedRoute): `/guest/your-holidays`
**Module:** Không gian khách

## Mô tả ngắn gọn
Mục "Local Holidays" trong menu điều hướng dành cho khách (đặt `active_menu = 3`). Action chỉ set `title_for_layout` và `active_menu` rồi render view, **không có logic nghiệp vụ hay truy vấn dữ liệu nào khác**.

## Mô tả chi tiết
File view `plugins/Welcome/src/Template/Guest/your_holidays.ctp` hiện **rỗng (0 byte)** — trang chưa được triển khai nội dung, khi truy cập chỉ hiển thị khung layout mặc định.

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| — | (chưa có trường dữ liệu nào) | — | — | — | View chưa được triển khai |

## Chức năng/nút thao tác
- Không có thao tác nào khả dụng do view chưa có nội dung.
- Liên kết tới action này tồn tại trong element sidebar cũ (`left-sidebar.ctp`) nhưng element này không thấy được nhúng vào layout hiện tại của Guest Hub (xem ghi chú tương tự tại GST-005).

## Điều hướng
Không có điều hướng đi tiếp do trang chưa có nội dung/liên kết nào.
