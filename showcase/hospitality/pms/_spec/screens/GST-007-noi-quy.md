# GST-007 — Nội quy

**Loại:** Trang đầy đủ
**Route:** `Guest::rules()` — mặc định `/guest/rules`; route đẹp (fallback DashedRoute): `/guest/rules`
**Module:** Cổng thông tin Khách

## Mô tả ngắn gọn
Mục "Rules" trong menu điều hướng dành cho khách (đặt `active_menu = 4`). Action chỉ set `title_for_layout` và `active_menu` rồi render view, **không có logic nghiệp vụ hay truy vấn dữ liệu nào khác**.

## Mô tả chi tiết
File view `plugins/Welcome/src/Template/Guest/rules.ctp` hiện **rỗng (0 byte)** — trang chưa được triển khai nội dung, khi truy cập chỉ hiển thị khung layout mặc định.

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| — | (chưa có trường dữ liệu nào) | — | — | — | View chưa được triển khai |

## Chức năng/nút thao tác
- Không có thao tác nào khả dụng do view chưa có nội dung.
- Ghi chú kỹ thuật: giá trị `title_for_layout` của action này (`staticText['rules_text']`) đang được tái sử dụng (có vẻ do sao chép code) làm tiêu đề cho nhiều action khác cùng controller (`bookings`, `accessPortal`, `restaurants`, `restaurant`, `landmark`) — không ảnh hưởng tới nội dung hiển thị vì các view đó tự dựng banner riêng, nhưng là điểm cần lưu ý khi rà soát/refactor code.

## Điều hướng
Không có điều hướng đi tiếp do trang chưa có nội dung/liên kết nào.
