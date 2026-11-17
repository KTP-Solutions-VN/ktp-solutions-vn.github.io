# BOOK-049 — Thanh toán đến hạn (Due Now)

**Loại:** Trang đầy đủ (mở từ BOOK-052)
**Route:** Booking/dueNow (mặc định: `/booking/due-now`)
**Route đẹp:** `/booking/partner-payments/due-now`
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các khoản thanh toán đối tác (chủ villa theo mô hình partnership) đã đến hạn thanh toán (dựa theo tần suất thanh toán cấu hình trên hợp đồng villa: trước ngày nhận phòng, đúng ngày nhận phòng, trước 1 tháng, khi đặt phòng, hoặc thứ 2 tuần trước). Cho phép chọn nhiều dòng và xác nhận đã thanh toán.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | Mặc định theo cookie/BU của user |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | STT | |
| 2 | Property | Tên villa |
| 3 | Booking Number | Mã đặt phòng |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | Số tiền cần thanh toán cho chủ |
| 7 | Actions | Checkbox chọn dòng để xác nhận thanh toán |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh
- Chọn (checkbox) một/nhiều dòng
- Nút xác nhận **Paid** — gọi `addPartnerPayment` để đánh dấu các khoản đã chọn là đã thanh toán (chuyển sang BOOK-051 Paid)

## Điều hướng
- Mở từ: BOOK-052 (Partner Payments) > nút "Due Now"
- Điều hướng tới: BOOK-051 (Paid) sau khi xác nhận thanh toán
