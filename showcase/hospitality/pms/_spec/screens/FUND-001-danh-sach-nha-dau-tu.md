# FUND-001 — Tài khoản nhà đầu tư (Investor Accounts)

**Loại:** Trang đầy đủ

**Route:** `FundController::investors()` — `/fund/investors` (GET, lọc qua query string `id`, `show_investor`; POST dùng để gán dự án hoặc tải báo cáo Excel). Không có route đẹp riêng trong `config/Routes.php`, dùng fallback DashedRoute. Trong môi trường triển khai, ứng dụng chạy dưới base path `/VM` (ví dụ `/VM/fund/investors`).

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Danh sách các chủ sở hữu (Owner) được đánh dấu là nhà đầu tư của quỹ, hiển thị vốn góp, lãi dự kiến và các dự án đã gán; cho phép bật/tắt trạng thái "nhà đầu tư", gán dự án cho nhà đầu tư, và xuất báo cáo Excel.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` (query `id`) | Select2 | Không | Danh sách BU theo quyền của user đăng nhập; đổi giá trị sẽ tải lại trang với query mới |
| 2 | Hiển thị | `show_investors` (query `show_investor`) | Select2: All / Investors | Không | "Investors": chỉ hiện Owner có `Fund.status = yes`; mặc định "All" |

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | Chủ sở hữu | `Owner.first_name` + `Owner.family_name` | |
| 2 | Trạng thái | `Fund.status` (yes/no) | Hiển thị dạng toggle switch; nếu `Fund.capital > 0` mà bấm tắt sẽ hiện cảnh báo "This Owner invest more than Zero capital" thay vì đổi trạng thái |
| 3 | Vốn góp | `Fund.capital` | Định dạng số 2 chữ số thập phân |
| 4 | Lãi dự kiến | `Fund.interest_due` | Định dạng số 2 chữ số thập phân; được tính tự động hằng ngày vào ngày cuối tháng (hàm `interest()`) |
| 5 | Dự án | `Fund.project_id` (unserialize) | Nối tên các dự án đang mở (`ProjectFund.status = open`) bằng dấu phẩy |
| 6 | Hành động | — | Chỉ hiện khi `Fund.status = yes`: icon Rate, icon View (Statements), icon Project |
| — | Dòng tổng | — | Tổng số nhà đầu tư đang bật trạng thái, tổng vốn góp, tổng lãi dự kiến |

## Chức năng/nút thao tác
- **Toggle bật/tắt trạng thái nhà đầu tư** (AJAX `fund/update-investor-status`): nếu Owner chưa có bản ghi `Fund`, hệ thống tự tạo mới với bậc lãi suất mặc định (1–24 tháng: 6%, 25–48 tháng: 7%, 49–99 tháng: 8%).
- **Icon Rate (€)**: mở màn hình FUND-007 (Lợi suất nhà đầu tư) cho nhà đầu tư tương ứng.
- **Icon View (mắt)**: mở màn hình FUND-002 (Sổ giao dịch nhà đầu tư) của nhà đầu tư.
- **Icon Project (bánh răng)**: mở popup FUND-001-P1 để gán dự án cho nhà đầu tư.
- **Download**: xuất báo cáo Excel (`Investor-fund-report-<ngày>.xlsx`) theo bộ lọc hiện tại — hành động tải file, không có giao diện riêng.

## Điều hướng
- Vào từ: menu Vốn nhà đầu tư (mục "Investor Accounts", `active_menu = 301`).
- Điều hướng đến: FUND-007 (Lợi suất nhà đầu tư), FUND-002 (Sổ giao dịch nhà đầu tư), popup FUND-001-P1 (Gắn nhà đầu tư vào dự án).
