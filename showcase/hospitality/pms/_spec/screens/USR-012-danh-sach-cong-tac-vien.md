# USR-012 — Danh sách Cộng tác viên/Đại lý bán hàng (Agents)

**Loại:** Trang đầy đủ

**Route:** `UserController::agents()` — mặc định `user/agents`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Danh sách các cộng tác viên bán hàng (Agent) — một loại tài khoản `User` đặc biệt với `employment = Agent`, dùng để giới thiệu/bán villa và được trả hoa hồng. Trang liệt kê agent kèm công ty, ngày liên hệ gần nhất và cho phép thêm/sửa/xoá.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên | `name` (first_name + family_name) | |
| 2 | Công ty | `company_name` | |
| 3 | Ngày liên hệ gần nhất | `contact_date` | |
| 4 | Thao tác | — | Sửa, Xoá |

Không có filter/tìm kiếm riêng; sắp xếp theo `first_name` tăng dần.

## Chức năng/nút thao tác
- **Thêm mới:** mở USR-013 (Thêm Cộng tác viên).
- **Sửa:** mở USR-014 (Sửa Cộng tác viên).
- **Xoá:** gọi `user/deleteAgents/:id` (xoá cả bản ghi `User` và `Agent` liên kết), có xác nhận trước khi xoá.

## Điều hướng
- Vào từ: menu Users → Agents.
- Điều hướng đến: USR-013 (Thêm), USR-014 (Sửa).
