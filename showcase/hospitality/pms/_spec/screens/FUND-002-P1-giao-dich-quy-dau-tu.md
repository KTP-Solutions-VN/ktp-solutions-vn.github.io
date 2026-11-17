# FUND-002-P1 — Giao dịch quỹ đầu tư (Đầu tư / Rút vốn / Chi trả lãi / Vốn hóa lãi)

**Loại:** Popup (mở từ FUND-002)

**Route:** Submit POST tới `FundController::statements()` (`/fund/statements`, field `action` = `invest` | `withdraw` | `payout` | `capitalize`). Dùng chung một modal cho cả 4 loại giao dịch, ẩn/hiện field theo loại.

**Module:** FUND = Quỹ đầu tư

## Mô tả ngắn gọn
Modal tạo giao dịch mới cho một nhà đầu tư: nạp thêm vốn (Invest), rút vốn (Withdraw), chi trả lãi bằng tiền mặt (Payout), hoặc cộng dồn lãi vào vốn góp (Capitalize).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Số tiền | `amount` | Text/number | Có | Ở Payout/Capitalize, giới hạn `max` = lãi dự kiến hiện có (`Fund.interest_due`) |
| 2 | Ngày | `date` | Datepicker (`yyyy-mm-dd`) | Có (Invest, Withdraw) | Ẩn ở Payout, Capitalize (server tự lấy ngày hiện tại) |
| 3 | Nguồn gốc | `origin` | Radio: Rental / Investment | Có (chỉ ở Invest) | Ẩn ở các chế độ khác |
| 4 | Lý do | `reason` | Text | Có (chỉ ở Withdraw) | Ẩn ở các chế độ khác |
| 5 | (ẩn) Hành động | `action` | Hidden | — | `invest` / `withdraw` / `payout` / `capitalize` |
| 6 | (ẩn) ID | `id` | Hidden | — | Không dùng trực tiếp (investor lấy theo query của trang cha) |

## Chức năng/nút thao tác
- **Invest**: cộng vốn góp (`Fund.capital`), tạo `Statement` + `StatementLog` (loại `invest`); lãi suất áp dụng được tính theo bậc (`Fund.rates`) dựa trên số tháng kể từ lần đầu tư đầu tiên.
- **Withdraw**: trừ dần số dư từ các `Statement` theo thứ tự thời gian tăng dần (FIFO) cho tới khi đủ số tiền rút; tạo `StatementLog` loại `withdraw`; báo lỗi nếu số dư không đủ.
- **Payout**: trừ trực tiếp vào `Fund.interest_due`, tạo `StatementLog` loại `payout` (không ảnh hưởng vốn góp).
- **Capitalize**: cộng số tiền vào khoản đầu tư đầu tiên còn số dư, giảm `Fund.interest_due` tương ứng, tạo `StatementLog` loại `capitalize` (chuyển lãi thành vốn góp).
- **Cancel**: đóng modal, không lưu.

## Điều hướng
- Mở từ: FUND-002 (nút Invest / Withdraw / Payout / Capitalize).
- Sau khi lưu (thành công hoặc lỗi): tải lại FUND-002.
