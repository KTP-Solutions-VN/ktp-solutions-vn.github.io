# USR-010 — Lịch sử nghỉ phép (Leave History)

**Loại:** Trang đầy đủ

**Route:** `UserController::grantedLeaves()` — mặc định `user/grantedLeaves`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Màn hình liệt kê theo phòng ban các nhân viên cùng lịch sử 2 lần nghỉ phép được cấp gần nhất, và cho phép mở màn hình gán thêm ngày nghỉ phép mới cho từng nhân viên (USR-011).

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Phòng ban | `department` | Select2 | Nguồn: `Role` (is_show=1) |

**Bảng dữ liệu (ajax `getUserLeaves` theo phòng ban đã chọn):**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên nhân viên | `first_name` | |
| 2 | 2 lần nghỉ phép gần nhất | `leaves` (start_date - end_date) | 2 cột, "No Leaves" nếu chưa có |
| 3 | Thêm ngày nghỉ phép | — | Nút/link mở USR-011 cho nhân viên tương ứng |

## Chức năng/nút thao tác
- **Chọn phòng ban:** tải lại danh sách nhân viên bằng ajax.
- **Thêm ngày nghỉ phép (Add Leaves):** mở USR-011 (Cấp ngày nghỉ) cho nhân viên được chọn.

## Điều hướng
- Vào từ: menu Workforce → Leave History, hoặc từ USR-004.
- Điều hướng đến: USR-011 (Cấp ngày nghỉ).
