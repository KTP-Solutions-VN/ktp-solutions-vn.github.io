# USR-020 — Danh sách Quy tắc lương (Payroll Rules)

**Loại:** Trang đầy đủ

**Route:** `UserController::payrollRules()` — mặc định `user/payrollRules`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Danh sách các quy tắc tính lương theo pháp nhân (legal entity), quốc tịch và thâm niên (seniority), dùng làm cơ sở tính mức lương ngày (daily wage) cho nhân sự.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Pháp nhân | `legal_entity_id` | Select2 (auto-submit) | Không | Mặc định "All" |
| 2 | Loại quốc tịch | `nationality_type` | Select2 (auto-submit) | Không | All/Equal To/Different From |
| 3 | Quốc tịch | `nationality` | Select2 (auto-submit) | Không | Chỉ áp dụng khi loại quốc tịch khác "All" |

**Cột hiển thị:**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Pháp nhân | `company.name` | |
| 3 | Loại quốc tịch | `nationality_type` | |
| 4 | Quốc tịch | `nationality` | Danh sách quốc gia (JSON) |
| 5 | Thâm niên | `seniority_type` | Less than/Equal to or More than/Between |
| 6 | Số tháng | `seniority_value1`/`seniority_value2` | |
| 7 | Mức lương (THB) | `wage_amount` | |
| 8 | Ngày tạo | `created_at` | |
| 9 | Thao tác | — | Xoá |

## Chức năng/nút thao tác
- **Thêm mới:** mở USR-021 (Thêm Quy tắc lương).
- **Xoá:** popup xác nhận, gọi `user/delete-payroll-rule/:base64(id)`.

## Điều hướng
- Vào từ: menu Settings/Users → Payroll Rules.
- Điều hướng đến: USR-021 (Thêm Quy tắc lương).
