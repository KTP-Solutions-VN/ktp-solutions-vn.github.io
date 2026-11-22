# VSV-011 — Kiểm tra chỉ số khi đến (Arrival Reading Audit)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::electricityCheckInControl()` — mặc định `/villa-services/electricity-check-in-control`; toàn bộ bộ lọc đọc/ghi qua query string (GET)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Màn hình vận hành (back-office) để nhân viên kiểm tra xem concierge đã ghi nhận chỉ số/ảnh đồng hồ điện check-in đúng hạn hay chưa cho từng booking, theo dõi KPI tổng quan và thực hiện các thao tác sửa/nhắc nhở/xác nhận thu tiền hàng loạt.

## Mô tả chi tiết

### Bộ lọc (GET)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Không | Mặc định theo BU/zone được phân quyền cho user; có tùy chọn "All" |
| 2 | Date selector | `date_selector` | Select | Không | Today / Yesterday / Last 3 days / Pick a past date |
| 3 | Date | `checkin_date` | Date picker | Có, khi `date_selector = pick_a_date` | Ẩn/hiện theo lựa chọn Date selector |
| 4 | Status | `status` | Select | Không | All / Pending / Done / Not Done / Done Late |
| 5 | Concierge | `concierge` | Select | Không | Danh sách concierge theo BU (Team Leader, Employee, usage "Concierge") |

### KPI (thẻ tổng quan)
| # | Tên KPI | Ghi chú |
|---|---|---|
| 1 | Pending | Số booking chưa được concierge xử lý |
| 2 | Done Late | Số booking hoàn tất nhưng sau ngày check-in |
| 3 | Done | Số booking hoàn tất đúng hạn |
| 4 | Fixed Collected | Tổng tiền đã thu theo phương thức Collect-Fixed |
| 5 | Meters Recorded | Số booking đã ghi chỉ số đồng hồ (phục vụ tính tiền check-out) |

### Danh sách (mỗi dòng là 1 booking)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Trạng thái + Ngày check-in | Nhãn màu theo trạng thái (Pending/Done/Done Late/Not Done) kèm người xử lý/thời gian |
| 2 | Villa · Guest | Kèm kênh đặt phòng (channel), mã booking, ngày check-out |
| 3 | Method | Phương thức tính điện: Collect-Fixed / Collect-Quota / Collect-kWh / Combined / Platform... |
| 4 | Meter | Chỉ số đồng hồ đã ghi + trạng thái ảnh đồng hồ |
| 5 | Payment | Số tiền đã/ sẽ thu |
| 6 | Account | Tài khoản/quỹ nhận tiền, trạng thái "Confirmed" nếu đã xác nhận |
| 7 | Hành động | Nút theo trạng thái: View, Correct Meter-in, Confirm, Flag |

## Chức năng/nút thao tác
- **Apply**: submit bộ lọc GET, tải lại danh sách + KPI.
- **Chọn dòng (checkbox ngầm)**: cập nhật số lượng "n check-in selected" phục vụ thao tác hàng loạt.
- **Send reminder** (hàng loạt): mở modal xác nhận, gọi AJAX `sendConciergeReminder` gửi nhắc nhở tới concierge phụ trách các booking đã chọn.
- **Confirm money received** (hàng loạt): mở modal xác nhận, gọi AJAX `confirmMoneyReceived` đánh dấu đã nhận tiền cho các booking đã chọn.
- **View** (từng dòng): mở VSV-011-P1 (`viewCheckinControl`) — xem chi tiết chỉ số/ảnh/thanh toán của booking.
- **Correct Meter-in** (từng dòng, khi Pending/Done Late/Not Done): mở modal nhập lại chỉ số đồng hồ + ảnh (submit POST về chính `electricityCheckInControl`, lưu `ElectricalBill`).
- **Confirm** (từng dòng, khi Done + Collect-Fixed): xác nhận đã thu tiền cố định.
- **Flag** (từng dòng, khi Not Done): đánh dấu cảnh báo cho booking chưa xử lý.
- Phân trang danh sách (Paginator).

## Điều hướng
- Vào từ: VSV-001 (tile "Arrival Reading Audit" trong khối Controls) hoặc menu chính.
- Điều hướng đến: VSV-011-P1 (Chi tiết chỉ số khi đến).
