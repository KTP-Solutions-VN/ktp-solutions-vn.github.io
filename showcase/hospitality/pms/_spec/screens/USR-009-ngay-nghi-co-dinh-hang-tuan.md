# USR-009 — Ngày nghỉ hằng tuần (Weekly Rest Days)

**Loại:** Trang đầy đủ

**Route:** `UserController::weeklyOff()` — mặc định `user/weeklyOff`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Màn hình quản lý ngày nghỉ cố định trong tuần (Chủ nhật → Thứ bảy) cho từng nhân viên theo phòng ban. Người quản lý chọn phòng ban, hệ thống tải danh sách nhân viên thuộc phòng ban đó (ajax `filterUser`) và cho phép chọn/đổi ngày nghỉ cố định của từng người (ajax `changeOff`).

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Phòng ban | `department` | Select2 | Nguồn: `Role` (is_show=1) |

**Bảng dữ liệu (sau khi chọn phòng ban, load bằng ajax):**

| # | Tên cột | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Tên nhân viên | `first_name` | Text (readonly) | |
| 2 | Chủ nhật … Thứ bảy | `day-<id>` | Radio (7 cột, mỗi nhân viên 1 dòng) | Chọn 1 ngày nghỉ cố định/tuần cho mỗi nhân viên |

## Chức năng/nút thao tác
- **Chọn phòng ban:** tải lại danh sách nhân viên (ajax, không chuyển trang).
- **Chọn radio ngày nghỉ:** lưu ngay lập tức qua ajax `changeOff`, hiển thị flash thành công.

## Điều hướng
- Vào từ: menu Workforce → Weekly Rest Days, hoặc từ USR-004.
- Điều hướng đến: không có điều hướng con (là màn hình thao tác trực tiếp qua ajax).
