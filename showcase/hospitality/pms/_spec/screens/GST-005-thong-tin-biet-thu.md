# GST-005 — Thông tin biệt thự

**Loại:** Trang đầy đủ
**Route:** `Guest::property()` — mặc định `/guest/property`; route đẹp (fallback DashedRoute): `/guest/property`
**Module:** Cổng thông tin Khách

## Mô tả ngắn gọn
Mục "Property" trong menu điều hướng dành cho khách (đặt `active_menu = 2`). Action chỉ set `title_for_layout` và `active_menu` rồi render view, **không có logic nghiệp vụ hay truy vấn dữ liệu nào khác**.

## Mô tả chi tiết
File view `plugins/Welcome/src/Template/Guest/property.ctp` hiện **rỗng (0 byte)** — trang chưa được triển khai nội dung, khi truy cập chỉ hiển thị khung layout mặc định (không có header/banner/nội dung như các trang khác trong module).

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| — | (chưa có trường dữ liệu nào) | — | — | — | View chưa được triển khai |

## Chức năng/nút thao tác
- Không có thao tác nào khả dụng do view chưa có nội dung.
- Ghi chú kỹ thuật: liên kết tới action này tồn tại trong element `plugins/Welcome/src/Template/Element/left-sidebar.ctp` (menu sidebar với 4 mục: Your Booking, Property, Your Holidays, Rules dựa trên `active_menu`), nhưng element này **không thấy được include** trong layout `Welcome/Layout/default.ctp` đang dùng cho Guest Portal hiện tại (giao diện mobile-first với icon Home/Logout) — nhiều khả năng là menu điều hướng cũ còn sót lại, chưa được dọn dẹp hoặc chưa gắn vào giao diện mới.

## Điều hướng
Không có điều hướng đi tiếp do trang chưa có nội dung/liên kết nào.
