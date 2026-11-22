# BOOK-067 — Trạng thái gói giá (Rate Plan Status)

**Loại:** Trang đầy đủ
**Route:** Booking/ratesStatus (mặc định: `/booking/rates-status`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang tra cứu trạng thái giá thuê hiện tại (Monthly/Daily/Yearly) của villa theo đơn vị kinh doanh: xem danh sách tổng quan tất cả villa đang áp dụng giá thuê tháng (Monthly) cùng ngày đến hạn thanh toán tiếp theo, hoặc tra cứu lịch sử chuyển đổi trạng thái giá của một villa cụ thể.

## Mô tả chi tiết

### Bộ lọc / Form tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Không | Mặc định theo đơn vị kinh doanh đang chọn (cookie); khi đổi sẽ load lại danh sách villa qua ajax `getBusinessUnitVilla` |
| 2 | Villa | `villa` | Select | Có (để bấm Search) | Danh sách villa thuộc đơn vị kinh doanh đã chọn |
| 3 | Nút Search | `search` | Submit | | Khi bấm sẽ tự tạo bản ghi log "Daily" mặc định từ 2020-01-01 cho villa nếu chưa có log nào |

### Bảng 1 — Tổng quan giá Monthly toàn hệ thống (hiển thị khi chưa search hoặc chưa chọn villa)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Tên villa |
| 2 | Type | Loại giá (chỉ hiện dòng có type = Monthly) |
| 3 | Value | Giá thuê tháng (`monthly_rent`) |
| 4 | Starting Date | Ngày bắt đầu áp dụng |
| 5 | Next Due Date | Ngày đến hạn thanh toán tiếp theo; hiển thị màu đỏ nếu đã quá hạn |
| 6 | Actions | Icon "Payment" (mở BOOK-069 với action=payment) và icon "Finish" (mở BOOK-069 với action=finish) |

Danh sách được sắp xếp tăng dần theo `next_due_date`.

### Bảng 2 — Lịch sử trạng thái giá theo villa (hiển thị sau khi Search một villa cụ thể)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Since | Ngày bắt đầu áp dụng trạng thái |
| 2 | Till | Ngày kết thúc trạng thái (rỗng nếu đang áp dụng) |
| 3 | Status | Loại giá (Monthly/Daily/Yearly); nếu là Monthly là link mở BOOK-076 (Điều khoản thuê tháng) |
| 4 | Note | Ghi chú (ví dụ số tiền thuê/tháng hoặc ngày đến hạn) |

Phía trên bảng 2 có nút:
- **Payment** + **Change to Daily** (nếu bản ghi log gần nhất là Monthly) — mở BOOK-069 (payment) hoặc BOOK-075 (daily)
- **Change to Monthly** (nếu bản ghi log gần nhất không phải Monthly) — mở BOOK-075 (monthly)

## Chức năng/nút thao tác
- Tìm kiếm theo Đơn vị kinh doanh + Villa (submit form, POST)
- Icon Payment/Finish trên bảng tổng quan Monthly (mở BOOK-069 — ratesStatusEdit)
- Link "Monthly" trên cột Status (bảng 2) mở BOOK-076 — rentalMonthView
- Nút Payment/Change to Daily/Change to Monthly (bảng 2) điều hướng sang BOOK-069 hoặc BOOK-075 tuỳ theo action

## Điều hướng
- Mở từ: BOOK-066 (nút Status)
- Điều hướng tới: BOOK-069 (Popup xử lý tiền thuê tháng), BOOK-075 (Đổi cách tính giá), BOOK-076 (Điều khoản thuê tháng)
