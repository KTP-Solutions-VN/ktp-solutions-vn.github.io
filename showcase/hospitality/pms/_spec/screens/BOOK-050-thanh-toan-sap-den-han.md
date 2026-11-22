# BOOK-050 — Khoản chi trả sắp tới (Upcoming Payouts)

**Loại:** Trang đầy đủ (mở từ BOOK-052)
**Route:** Booking/dueLater (mặc định: `/booking/due-later`)
**Route đẹp:** `/booking/partner-payments/due-later`
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Danh sách các khoản thanh toán đối tác (chủ villa partnership) đã được xác nhận (`PartnerBooking.status = confirmed`) nhưng CHƯA đến hạn thanh toán theo tần suất thanh toán cấu hình trên hợp đồng villa. Dùng để theo dõi trước các khoản sẽ phải chi trả.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | STT | |
| 2 | Property | Tên villa |
| 3 | Booking Number | |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | |
| 7 | Actions | Xem chi tiết thanh toán (`paymentModule`) |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh
- Xem chi tiết khoản thanh toán (popup lấy dữ liệu qua `paymentModule`, gồm thông tin tài khoản ngân hàng chủ villa)

## Điều hướng
- Mở từ: BOOK-052 (Partner Payouts) > nút "Due Later"
- Điều hướng tới: không (khoản sẽ tự chuyển sang BOOK-049 khi đến hạn)
