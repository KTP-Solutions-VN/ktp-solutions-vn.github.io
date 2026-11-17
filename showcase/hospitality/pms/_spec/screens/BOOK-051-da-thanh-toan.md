# BOOK-051 — Đã thanh toán (Paid)

**Loại:** Trang đầy đủ (mở từ BOOK-052)
**Route:** Booking/paid (mặc định: `/booking/paid`)
**Route đẹp:** `/booking/partner-payments/paid`
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các khoản thanh toán đối tác (chủ villa partnership) đã được xác nhận thanh toán xong (`PartnerBooking.status = paid`), kèm ngày thanh toán, người thanh toán và phương thức thanh toán.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | STT | |
| 2 | Property | |
| 3 | Booking Number | |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | |
| 7 | Paid On | Ngày thanh toán |
| 8 | Paid By | Người xác nhận thanh toán |
| 9 | Paid Through | Phương thức thanh toán |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh

## Điều hướng
- Mở từ: BOOK-052 (Partner Payments) > nút "Paid", hoặc từ BOOK-049 sau khi xác nhận thanh toán
