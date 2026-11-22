# BOOK-069 — Xử lý tiền thuê tháng (Monthly Rent Action)

**Loại:** Trang đầy đủ (trang con, điều hướng từ BOOK-067 — không phải popup/modal)
**Route:** Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` hoặc `finish`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định, ví dụ `/booking/rates-status-edit/1/2/payment`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình xác nhận thao tác trên bản ghi giá thuê tháng (Monthly) đang áp dụng cho một villa: xác nhận đã thu tiền thuê tháng hiện tại (`action=payment`), hoặc xác nhận kết thúc hợp đồng thuê tháng để chuyển villa về giá thuê ngày (`action=finish`).

Điều kiện truy cập: cả 3 tham số `business_unit_id`, `villa_id`, `action` phải có trên URL và bản ghi `VillaRateStatus` (type=Monthly, status=active) tương ứng phải có `starting_date` ở quá khứ; nếu không hệ thống báo lỗi và chuyển hướng về BOOK-067.

## Mô tả chi tiết
Không có form nhập liệu — chỉ hiển thị 1 dòng thông tin xác nhận và 1 nút hành động:

| # | Trường hợp | Nội dung hiển thị | Nút |
|---|---|---|---|
| 1 | `action=payment` | "`<Tên villa>`, rent of `<monthly_rent>` SGD due on `<next_due_date>`" | Nút **Paid** |
| 2 | `action=finish` (mặc định) | "`<Tên villa>` goes back to daily rate. There is no outstanding monthly Rent due." | Nút **Confirm** |

## Chức năng/nút thao tác
- **Paid** (khi action=payment) — tạo bản ghi `VillaRatesStatusPayment` mới (tính `next_due_date` kế tiếp theo tháng), cập nhật `till_date` của log gần nhất và tạo bản ghi `VillaRatesStatusLog` mới, rồi chuyển hướng về BOOK-067
- **Confirm** (khi action=finish) — tạo bản ghi `VillaRateStatus` mới với type=Daily, đặt bản ghi Monthly cũ về `status=inactive`, tạo `VillaRatesStatusPayment` và `VillaRatesStatusLog` tương ứng, rồi chuyển hướng về BOOK-067

## Điều hướng
- Mở từ: BOOK-067 (icon Payment/Finish trên bảng tổng quan Monthly)
- Điều hướng tới: quay lại BOOK-067 sau khi xử lý
