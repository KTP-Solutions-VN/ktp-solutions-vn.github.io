# OWP-005 — Danh mục của tôi (My Portfolio)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::list()` — route đẹp: `/external-user/property/list` (config/Routes.php dòng 107)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách các biệt thự (property) thuộc quyền sở hữu/quản lý của Chủ sở hữu hoặc nhân viên đại lý đang đăng nhập, lọc theo đơn vị kinh doanh (business unit) và trạng thái hoạt động/tạm dừng.

## Mô tả chi tiết

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên biệt thự | Villa.name | Link tới OWP-006 |
| 3 | Hoạt động gần nhất | latest_activity | Từ bảng Maintenance liên kết |
| 4 | Ngày trống tiếp theo | next_available_date | |
| 5 | Trạng thái | Villa.status | Open / Paused / Closed |
| 6 | Thao tác | — | Xem chi tiết |

Bộ lọc/nút điều khiển:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Hiện biệt thự đang hoạt động/không hoạt động | paused_stop_show | Toggle button (ẩn dạng hidden input) | Không | Chuyển đổi lọc giữa "Open" và "Paused/Closed", lưu vào session user |

## Chức năng/nút thao tác

- Chuyển đổi hiển thị biệt thự đang hoạt động / tạm dừng-đóng
- Xem chi tiết biệt thự (click vào dòng → OWP-006)

## Điều hướng

- Truy cập từ menu chính (My Portfolio) hoặc redirect sau đăng nhập (OWP-001)
- Click một dòng → OWP-006 Tóm tắt tài sản
