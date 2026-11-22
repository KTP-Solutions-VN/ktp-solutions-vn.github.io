# OWP-016 — Tổng hợp chi trả hằng tháng (Monthly Payout Summary)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::paymentReport($villa_id)` — không có route đẹp riêng, mở từ OWP-005 (icon $), dạng `.../payment-report/{villa_id_base64}`

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách các báo cáo thanh toán hàng tháng (Monthly Owner Payment Reports) đã gửi cho một biệt thự, hiển thị ngày dự kiến thanh toán tiếp theo và cho phép tải file báo cáo.

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa_id | Select2 | Có | |

Thông báo: "Kỳ thanh toán tiếp theo dự kiến vào ngày..." (payment_date, tính từ báo cáo gần nhất)

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên biệt thự | property_name | |
| 2 | Tên báo cáo | report_name | |
| 3 | Ngày bắt đầu | start | |
| 4 | Ngày kết thúc | end | |
| 5 | Ngày gửi | sent_on | |
| 6 | Thao tác | actions | Tải file báo cáo (.pdf) |

## Chức năng/nút thao tác

- Tìm kiếm/lọc theo biệt thự
- Tải file báo cáo thanh toán (icon download, liên kết tới file tĩnh trên server)

## Điều hướng

- Vào từ OWP-005 (icon $ "Payment History")
- Không điều hướng sang màn hình khác
