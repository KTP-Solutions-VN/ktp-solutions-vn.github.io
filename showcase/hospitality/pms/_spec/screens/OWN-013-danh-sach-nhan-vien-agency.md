# OWN-013 — Danh sách nhân viên Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Màn hình liệt kê toàn bộ nhân viên (staff) của các Agency đang ở trạng thái Active. Đây là menu cấp 1 trong sidebar (mục "Agency Staff").

## Mô tả chi tiết

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | STT | — | Số | |
| 2 | Tên Agency | `agency.agency_name` | Text | |
| 3 | Họ tên | `first_name` + `family_name` | Text | |
| 4 | Vai trò (Roles) | `user_role` | Text | Ghép danh sách role, hoặc "All Access" nếu không gán role riêng |
| 5 | Loại user | `user_type` | Text | |
| 6 | Trạng thái | `status` | Text | |
| 7 | Ngày tạo | `created_at` | Datetime | Định dạng `d M Y H:i` |
| 8 | Thao tác | — | Sửa / Xoá | |

## Chức năng/nút thao tác

- **+ Add New**: mở OWN-014 (Thêm mới nhân viên Agency).
- **Sửa** (icon bút): mở OWN-015 (Chỉnh sửa nhân viên Agency).
- **Xoá** (icon thùng rác): xác nhận qua popup modal, sau đó gọi `delete-agency-staff/{id}` (không có giao diện riêng).

## Điều hướng

- Mở từ: Menu sidebar "Agency Staff" (`active_menu` 106).
- Đi tới:
  - OWN-014 — Thêm mới nhân viên Agency
  - OWN-015 — Chỉnh sửa nhân viên Agency
