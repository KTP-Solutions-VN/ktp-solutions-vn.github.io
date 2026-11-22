# VSV-012 — Kiểm tra chỉ số khi đi (Departure Reading Audit)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::electricityCheckOutControl()` — mặc định `/villa-services/electricity-check-out-control`; bộ lọc đọc/ghi qua query string (GET)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Màn hình vận hành để kiểm tra việc thu tiền điện check-out: chỉ số cuối kỳ, số tiền tính được, số tiền khách đã trả, minh chứng thanh toán, và các khoản giảm giá (discount) cần phê duyệt.

## Mô tả chi tiết

### Bộ lọc (GET)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Không | Theo phân quyền BU/zone |
| 2 | Date selector | `date_selector` | Select | Không | Today / Yesterday / Last 3 days / Pick a past date |
| 3 | Date | `checkout_date` | Date picker | Có, khi chọn "Pick a past date" | |
| 4 | Status | `status` | Select | Không | All / Blocked / Pending / Collected / Done Late |
| 5 | Check-in status | `check_in_status` | Select | Không | All / Done / Done Late / Not Done |
| 6 | Concierge | `concierge` | Select | Không | Danh sách concierge theo BU |

### KPI (thẻ tổng quan)
| # | Tên KPI | Ghi chú |
|---|---|---|
| 1 | Blocked | Booking bị chặn (thiếu điều kiện xử lý, ví dụ chưa có start meter) |
| 2 | Pending Collection | Chưa thu tiền |
| 3 | Discounts | Số khoản giảm giá đang chờ/đã áp dụng |
| 4 | Collected | Đã thu tiền |
| 5 | Amount Collected | Tổng số tiền đã thu |

### Danh sách (mỗi dòng là 1 booking)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Trạng thái + ngày check-out | Nhãn theo Blocked/Pending/Collected/Done Late |
| 2 | Villa · Guest | Kênh, mã booking |
| 3 | Method | Phương thức tính điện |
| 4 | Meter | Chỉ số cuối kỳ, ảnh đồng hồ |
| 5 | Payment | Số tiền tính được / đã thu, minh chứng thanh toán |
| 6 | Account | Tài khoản nhận tiền |
| 7 | Hành động | Nút theo trạng thái, ví dụ View, Correct Meter-out |

## Chức năng/nút thao tác
- **Apply**: submit bộ lọc GET.
- **Send reminder** (hàng loạt): nhắc concierge hoàn tất check-out điện (AJAX `sendConciergeReminder`).
- **Confirm payment received** (hàng loạt): xác nhận đã nhận tiền cho các booking đã chọn (AJAX `confirmMoneyReceived`).
- **Validate discounts**: xác nhận/phê duyệt các khoản giảm giá điện đang chờ.
- **View** (từng dòng): mở VSV-012-P1 (`viewCheckOutControl`) — xem chi tiết.
- **Correct Meter-out** (từng dòng): mở modal sửa chỉ số/ảnh đồng hồ cuối kỳ, submit POST về chính `electricityCheckOutControl`.
- Phân trang danh sách.

## Điều hướng
- Vào từ: VSV-001 (tile "Departure Reading Audit" trong khối Controls) hoặc menu chính.
- Điều hướng đến: VSV-012-P1 (Chi tiết chỉ số khi đi).
