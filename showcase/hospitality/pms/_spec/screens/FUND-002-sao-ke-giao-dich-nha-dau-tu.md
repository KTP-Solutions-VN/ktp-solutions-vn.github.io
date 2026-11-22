# FUND-002 — Sổ giao dịch nhà đầu tư (Investor Ledger)

**Loại:** Trang đầy đủ

**Route:** `FundController::statements($in_id = null)` — `/fund/statements` hoặc `/fund/statements/:in_id` (tham số truyền khi đi từ FUND-001; ngoài ra lọc qua query `id` = business unit, `investors` = investor/fund id).

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Xem lịch sử giao dịch (đầu tư, rút vốn, chi trả lãi, vốn hóa lãi) của một nhà đầu tư cụ thể, số dư lũy kế theo từng khoản đầu tư, và khởi tạo giao dịch mới.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` (query `id`) | Select2 | Không | Đổi giá trị sẽ tải lại trang |
| 2 | Nhà đầu tư | `investors` | Select2 (danh sách Fund có `status = yes`) | Không | Mặc định là nhà đầu tư đầu tiên trong danh sách hoặc `in_id`/`investors` truyền vào |

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | Ngày | `StatementLog.transaction_date` | |
| 2 | Diễn giải | `StatementLog.description` | |
| 3 | Số tiền | `StatementLog.amount` | Với giao dịch `withdraw` cùng ngày, các dòng trùng ngày được gộp thành 1 dòng tổng số tiền rút trong ngày |
| 4 | Nguồn gốc | `StatementLog.origin` | Rental / Investment |
| 5 | Số dư | `StatementLog.balance` | |
| 6 | Lãi suất (%) | `Statement.rate` | Ẩn với giao dịch `withdraw` |
| 7 | Hành động | — | Icon xem (hiện chưa gắn chức năng cụ thể) |
| — | Dòng tổng | — | Tổng số tiền các giao dịch và Số dư ròng (net) cuối kỳ |

## Chức năng/nút thao tác
- **Invest**: mở popup FUND-002-P1 ở chế độ Đầu tư.
- **Withdraw**: mở popup FUND-002-P1 ở chế độ Rút vốn.
- **Payout**: mở popup FUND-002-P1 ở chế độ Chi trả lãi (tiêu đề modal hiển thị luôn số lãi khả dụng).
- **Capitalize**: mở popup FUND-002-P1 ở chế độ Vốn hóa lãi.

## Điều hướng
- Vào từ: FUND-001 (icon View trên dòng nhà đầu tư), hoặc chọn trực tiếp bộ lọc "Nhà đầu tư" ngay trên màn hình.
- Điều hướng đến: popup FUND-002-P1.
- Sau khi lưu giao dịch: tải lại chính FUND-002 (redirect referer).
