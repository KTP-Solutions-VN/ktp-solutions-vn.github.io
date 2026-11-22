# FUND-003 — Dự án được tài trợ (Funded Projects)

**Loại:** Trang đầy đủ

**Route:** `FundController::projects()` — `/fund/projects`

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Danh sách các dự án huy động vốn (Project Fund) đang mở và đã đóng, dùng làm căn cứ để gán vào từng nhà đầu tư ở FUND-001.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | Dự án | `ProjectFund.project_name` | |
| 2 | Ngày thêm | `ProjectFund.created_at` | |
| 3 | Người tạo | `User.usage_name` | |
| 4 | Cập nhật lần cuối | `ProjectLog` mới nhất hoặc `ProjectFund.updated_at` | Hiển thị "Closed" nếu `status = close` |
| 5 | Hành động | — | View (luôn có); Update, Close (chỉ khi `status` đang mở) |

Không có bộ lọc riêng — hiển thị toàn bộ dự án mở rồi đến dự án đã đóng.

## Chức năng/nút thao tác
- **Add New**: chuyển sang FUND-004 (Thêm dự án được tài trợ).
- **View (mắt)**: chuyển sang FUND-006 (Hồ sơ dự án được tài trợ).
- **Update (bút)**: chuyển sang FUND-005 (Sửa dự án được tài trợ) — chỉ hiện khi dự án đang mở.
- **Close (dấu X)**: AJAX `fund/close-project` — gỡ dự án khỏi `Fund.project_id` của mọi nhà đầu tư đang tham chiếu, đặt `ProjectFund.status = close`.

## Điều hướng
- Vào từ: menu Vốn nhà đầu tư (`active_menu = 303`).
- Điều hướng đến: FUND-004, FUND-005, FUND-006.
