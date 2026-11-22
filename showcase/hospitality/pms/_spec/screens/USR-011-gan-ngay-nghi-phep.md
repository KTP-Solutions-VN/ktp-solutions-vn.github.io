# USR-011 — Cấp ngày nghỉ (Grant Time Off)

**Loại:** Trang đầy đủ

**Route:** `UserController::assignLeaves($id, $role)` — mặc định `user/assignLeaves/:id/:role`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang chi tiết cho phép cấp thêm một đợt nghỉ phép (ngày bắt đầu - kết thúc) cho một nhân viên cụ thể, đồng thời hiển thị lịch sử 2 lần nghỉ phép gần nhất và danh sách nhân viên khác cùng phòng ban có lịch nghỉ trùng khoảng thời gian (để tránh trùng lịch nghỉ trong cùng bộ phận).

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Khoảng ngày nghỉ | `leave` | Text (date-range picker) | Có | Định dạng "dd/mm/yyyy - dd/mm/yyyy" |
| 2 | Nhân viên (ẩn) | `user_id` | Hidden | — | `id` nhân viên (base64) truyền từ USR-010 |

**Bảng hiển thị (không sửa):** tên nhân viên + 2 lần nghỉ phép gần nhất (start_date/end_date/total_days).

**Bảng phụ (ajax `getDepLeaveList`):** danh sách nhân viên cùng phòng ban có lịch nghỉ trùng khoảng ngày vừa chọn, để tránh cấp phép trùng lịch.

## Chức năng/nút thao tác
- **Submit:** tính số ngày nghỉ (`total_days`), lưu bản ghi `GrantedOff` mới cho nhân viên, hiển thị flash thành công, quay lại USR-010.
- Tự động kiểm tra trùng lịch nghỉ trong cùng phòng ban khi chọn khoảng ngày (ajax).

## Điều hướng
- Mở từ: USR-010 (nút "Thêm ngày nghỉ phép" của từng nhân viên).
- Điều hướng đến: USR-010 (Leave History) sau khi lưu thành công.
