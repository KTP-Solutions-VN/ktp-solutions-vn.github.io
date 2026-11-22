# USR-021 — Thêm quy tắc tính công (New Wage Rule)

**Loại:** Trang đầy đủ

**Route:** `UserController::addPayrollRules()` — mặc định `user/addPayrollRules`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Form tạo mới một quy tắc tính lương ngày theo pháp nhân, quốc tịch và số tháng thâm niên.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Pháp nhân | `company_id` | Select2 | Có | |
| 2 | Loại quốc tịch | `nationality_type` | Select2 | Có | All/Equal To/Different From |
| 3 | Quốc tịch | `nationality[]` | Select2 multiple | Có nếu loại quốc tịch khác "All" | Ẩn khi chọn "All" |
| 4 | Loại thâm niên | `seniority_type` | Select2 | Có | Less than/Equal to or More than/Between |
| 5 | Số tháng (từ) | `seniority_value1` | Number | Có | |
| 6 | Số tháng (đến) | `seniority_value2` | Number | Có nếu loại = Between | Chỉ hiện khi chọn "Between" |
| 7 | Mức lương (SGD) | `wage_amount` | Text (number, có định dạng phân cách nghìn) | Có | |

## Chức năng/nút thao tác
- **Lưu (Save):** tạo bản ghi `PayrollRule` mới, ghi người tạo.
- **Huỷ:** quay về USR-020.

## Điều hướng
- Mở từ: USR-020 (nút "Thêm mới").
- Điều hướng đến: USR-020 (Quy tắc tính công) sau khi lưu thành công.
