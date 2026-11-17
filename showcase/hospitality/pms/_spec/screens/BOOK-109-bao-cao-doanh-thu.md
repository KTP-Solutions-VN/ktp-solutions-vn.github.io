# BOOK-109 — Báo cáo doanh thu (Revenue Report)

**Loại:** Trang đầy đủ

**Route:** Booking/revenueReport (mặc định: `/booking/revenue-report`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt phòng

## Mô tả ngắn gọn

Báo cáo doanh thu hàng tháng tổng hợp theo Công ty (Company) → Chi nhánh (Subsidiary) → Villa, dựa trên dữ liệu `MonthlyReport`, quy đổi theo loại tiền tệ được chọn, cho phép chọn nhiều tháng để so sánh và tải xuống báo cáo Excel.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Công ty | company_id | Select | Không | |
| 2 | Chi nhánh (Subsidiary) | subsidiary_id | Select | Không | |
| 3 | Đơn vị kinh doanh | business_unit_id | Select | Không | "All" (0) áp dụng theo `selected_business` của user; hỗ trợ business unit zone |
| 4 | Chọn tháng | selected_months | Custom picker (dialog chọn nhiều tháng, lưu vào hidden `monthValues`) | Có | Bắt buộc để hiển thị dữ liệu; nếu không chọn bảng sẽ rỗng |
| 5 | Loại tiền tệ | currency_code | Select | Không | Dùng để quy đổi số liệu (`currency_convert`) |

Nút "Calculate" submit form để tải lại báo cáo theo bộ lọc (GET).

Nếu các tháng đã chọn chưa có bảng giá (`Rate`) tương ứng → hiển thị cảnh báo thiếu giá và có thể trỏ tới BOOK-027 (Villa thiếu giá thuê) / BOOK-... (Missing Rate Setting).

**Bảng báo cáo (nhóm theo Company/Subsidiary, có thể mở rộng xem theo từng Villa):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Company | company_name | |
| 2 | Subsidiary | subsidiary_name | |
| 3 | Property | property | "All" ở dòng tổng, tên villa ở dòng con |
| 4 | Currency | currency_name / selected_currency_name | |
| 5 | (các cột theo từng tháng đã chọn) | months_array | Tổng tiền theo tháng, đánh dấu "Converted Amount" nếu có quy đổi tiền tệ |
| 6 | Total | month_total | Tổng cộng tất cả tháng |
| 7 | Currency | — | |
| 8 | Owner | owner_total | Tổng chi trả chủ nhà |
| 9 | Bookings | bookings | Số lượt đặt phòng |
| 10 | Ops | ops | |
| 11 | Status | status | |

Bấm vào dòng Company/Subsidiary sẽ mở rộng hiển thị chi tiết theo từng Villa bên dưới.

## Chức năng/nút thao tác

- "Calculate": tải lại báo cáo theo bộ lọc đã chọn.
- Icon Download (màu đỏ): tải file Excel báo cáo qua `downloadRevenueReport/:company_id/:subsidiary_id/:business_unit_id/:currency_id/:selectedMonths`.
- Mở rộng/thu gọn dòng Company/Subsidiary để xem chi tiết theo Villa.
- Cảnh báo thiếu giá thuê (nếu có) dẫn hướng người dùng đi cấu hình giá trước khi xem báo cáo chính xác.

## Điều hướng

- Vào từ menu quản lý (icon Revenue, active_menu = 1018), quyền `Booking-revenueReport`.
- → Tải file Excel (download, không chuyển trang) khi bấm icon Download.
- Có thể liên kết tới màn hình cấu hình giá còn thiếu khi hệ thống cảnh báo thiếu rate cho tháng đã chọn.
