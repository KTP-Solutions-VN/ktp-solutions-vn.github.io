# MNT-008 — Mức độ ưu tiên bảo trì (Priorities)

**Loại:** Trang đầy đủ
**Route:** maintenance/priorities
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình quản lý các mức độ ưu tiên bảo trì (`MaintenancePriority`): danh sách, thêm/sửa qua modal, xóa. Mỗi mức ưu tiên có thời gian phản hồi (response time) và màu hiển thị.

## Mô tả chi tiết

### Danh sách
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên mức ưu tiên | `name` | |
| 3 | Response Time | `response_time` | Đơn vị giờ |
| 4 | Màu | `color` | Ô màu (input type=color, disabled) |
| 5 | Ngày tạo | `created` | |
| 6 | Hành động | — | Sửa, Xóa |

### Form thêm/sửa (modal)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên | `name` | Text | Có | Kiểm tra trùng qua ajax `checkMaintenancePriority` |
| 2 | Response Time | `response_time` | Text số (giờ) | Có | Dùng để tính `due_date` khi tạo nhật ký bảo trì |
| 3 | Màu | `color` | Color picker | Có | |
| 4 | ID (khi sửa) | `id` | Hidden | — | |
| 5 | Action | `action` | Hidden (`add`/`edit`) | — | |

## Chức năng/nút thao tác
- **Add New / Sửa** (modal): lưu bản ghi `MaintenancePriority`, `slug` tự sinh từ tên.
- **Xóa**: xóa mức ưu tiên (`action=delete`).

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: không điều hướng trang khác (thao tác tại chỗ qua modal).
