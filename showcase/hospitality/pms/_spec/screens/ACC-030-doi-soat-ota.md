# ACC-030 — Khớp chi trả theo kênh (Channel Payout Matching)

**Loại:** Trang đầy đủ

**Route:**
- Trang chính: `AccountController::ota($ota_id = null)` — mặc định `/account/ota` hoặc `/account/ota/<key>` (tham số `$ota_id` được truyền từ sidebar nhưng **không được action sử dụng** — chỉ set tiêu đề/`active_menu`, không dùng để lọc dữ liệu)
- AJAX lấy dữ liệu bảng: `AccountController::getOtaData()` — mặc định `/account/get-ota-data` (GET/POST, trả JSON, `autoRender = false`)
- AJAX cập nhật trạng thái thanh toán: `AccountController::updatePaymentRecon()` — mặc định `/account/update-payment-recon` (POST, trả JSON)

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Màn hình đối soát thanh toán OTA (hiện chỉ áp dụng cho `Booking.com`): tổng hợp toàn bộ booking cần đối soát tiền/hoa hồng, phân loại theo trạng thái thanh toán (Locked/Pending/In transit/Charged/Received/No payment), cho phép nhân viên đánh dấu đã nhận tiền, đã trả hoa hồng, hoặc đã charge thẻ ảo — khi đánh dấu "đã nhận tiền" hệ thống tự sinh 1 bút toán credit vào sao kê (Account Statement) của tài khoản tương ứng.

## Mô tả chi tiết

### Điều kiện lấy dữ liệu (trong `getOtaData`)
Lấy `Booking` với điều kiện: `referer = 'Booking.com'`, `Villa.business_unit_id IN (BU đang chọn của user)`, `check_out_date >= (hôm nay - 1 tháng)`, `status != 'Cancelled'`, `Villa.status = 'Open'`, `is_paid_commission = 'no'`. Contain thêm Guest, Villa (BusinessUnit, Agency, Owner, VillaOtaManagement.Log lọc `meta_key = 8`, `module = 'villa_ota_management'`).

### Khối thống kê (tab "Total" / "By month")
| # | Chỉ số | Field code | Ghi chú |
|---|---|---|---|
| 1 | Amount expected | `totals.expected` | Tổng gross amount (quy đổi SGD nếu currency khác SGD, qua bảng `Rate` theo tháng booking, mặc định rate 1.35 nếu không có bản ghi Rate) |
| 2 | Commission due | `totals.commission_due` | Tổng hoa hồng của các booking đã "Received" nhưng `is_paid_commission = no` |
| 3 | Pending to charge | `totals.pending` | Số booking đang ở trạng thái "Charge Now" |
| 4 | By month (card trượt ngang) | `totals.monthly` | Nhóm theo tháng của `fund_availability` (hoặc `check_out_date`/`created_at` nếu chưa có), mỗi card gồm expected + commission của tháng đó |

### Tabs trạng thái (đếm số lượng bên cạnh tên tab)
All / Locked / Pending / In transit / Charged / Received / No payment — đếm theo `recon_status` tính từ `getReconciliationStatus()` (xem quy tắc bên dưới).

### Bộ lọc & sắp xếp
- **Sort by:** — none — / Booking date / Check-in date / Check-out date / Funds availability.
- **Hướng sort:** nút toggle "Oldest first" ↔ mới nhất trước (icon mũi tên).
- Phân trang phía server: `limit = 10`, tham số `page`.

### Bảng danh sách (cột)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property / Guest | `villa.name`, `guest.first_name/family_name`, `villa.business_unit.name` | Dòng 1: tên villa (đậm); dòng 2: tên khách; dòng 3: tên business unit |
| 2 | Dates | `booking_date`, `check_in_date`, `check_out_date` | 3 dòng con: Book / In / Out (định dạng `dd Mon yy`) |
| 3 | Refund | tính từ `api_message` (regex "cancel free of charge until N days before arrival") | Badge "Non" (đỏ) nếu không có, hoặc "N Days" (xanh) |
| 4 | Payment | `payment_method` (Bank Transfer/Manual VC/Auto VC/Third party) + `bank_account` | Badge màu theo phương thức; suy ra từ log `VillaOtaManagement` mới nhất có `from <= hôm nay` |
| 5 | Amount | `amount` (gross, đã quy đổi) + `commission` | Dòng phụ hiển thị "Com S$x" hoặc "No Com" |
| 6 | Funds availability | `fund_availability` | Ngày dự kiến có tiền, tính theo `getReconciliationStatus` |
| 7 | Status | `recon_status` | Locked / Pending / In Transit / Charged / Received / To Verify / Charge Now / No payment — badge màu tương ứng |
| 8 | Action | tùy trạng thái | Xem mục Chức năng bên dưới |

### Quy tắc tính trạng thái đối soát (`getReconciliationStatus`, hàm private)
- **Bank Transfer:** ngày gửi tiền (`payment_send_date`) tính theo thứ trong tuần của `check_out_date` (Mon +3, Tue +2, Wed +1, Thu +7, Fri +6, Sat +5, Sun +4 ngày); ngày nhận (`payment_received_date`/`fund_availability`) = ngày gửi + 5 ngày. Trạng thái: `Received` nếu `is_received_payment = yes`; `Pending` nếu chưa tới ngày gửi; `In Transit` nếu trong khoảng gửi→nhận; `To Verify` nếu quá hạn mà chưa nhận.
- **Manual VC / Auto VC:** ngày có thể charge (`vc_charge_date`) = ngày booking + 1 (nếu không có refund policy) hoặc ngày check-in − số ngày refund. Trạng thái: `Received` nếu đã nhận; `Charged` nếu `is_charge_virtual_card = yes`; `Locked` nếu chưa tới ngày charge; ngược lại `Charged` (Auto VC tự động) hoặc `Charge Now` (Manual VC cần thao tác tay).
- **Third party:** trạng thái cố định `No payment`.

## Chức năng/nút thao tác
Nút action hiển thị theo điều kiện của từng dòng (JS `renderTable`, gọi `AccountController::updatePaymentRecon`):

| Điều kiện | Nút | `action` gửi lên | Xử lý phía server |
|---|---|---|---|
| `payment_method = 'Third party'` và `is_paid_commission = 'no'` | **Mark as seen** | `mark-seen` | Set `Booking.is_paid_commission = 'yes'` |
| `payment_method = 'Manual VC'`, `is_charge_virtual_card = 'no'`, `recon_status != 'Locked'` | **Mark charged** | `charge` | Set `Booking.is_charge_virtual_card = 'yes'` |
| `is_received_payment = 'no'` (và không rơi vào 2 trường hợp trên) | **Mark received** | `receive` | Set `Booking.is_received_payment = 'yes'`; nếu có `account_id` + `amount` (đính kèm từ `payment_method`/log) thì tự sinh 1 bút toán mới trong `AccountStatement` (Ref tự tăng `<account.name>-00001`, `category_id = 3`, `payment_type = credit`, `description = 'booking reconcile'`, quy đổi tiền tệ theo `Rate` nếu account không dùng SGD) |
| `is_received_payment = 'yes'` và `is_paid_commission = 'no'` | **Pay commission** | `pay-commission` | Set `Booking.is_paid_commission = 'yes'` |
| Còn lại (đã Received & đã trả hoa hồng, hoặc Locked/No payment không đủ điều kiện) | — (dấu gạch ngang) | — | Không thao tác |

Trước khi gọi AJAX, mỗi thao tác đều hiện popup xác nhận (confirm dialog) với thông điệp tương ứng ("Do you really want to mark this booking as received/charged...?").

- **Đổi tab (All/Locked/Pending/In transit/Charged/Received/No payment):** gọi lại `getOtaData` với tham số `tab`, không reload trang.
- **Đổi Sort by / hướng sort:** gọi lại `getOtaData` với `sort` + `direction`.
- **Chuyển trang (pagination):** gọi lại `getOtaData` với `page`.

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > **Payouts > Channels** > tên nền tảng OTA (hiện chỉ có "Booking.com", lấy từ `BookingPlatform` có `name = 'Booking.com'`) — `filterSidebar($user, 'acc-ota')` phải cho phép mới hiện mục này.
- Điều hướng đến: không có trang con/popup riêng — mọi thao tác đều xử lý AJAX tại chỗ, không chuyển trang. Bút toán tự sinh khi "Mark received" chỉ ghi vào bảng `AccountStatement`, không mở màn hình ACC-007 (Account Ledger) tương ứng.
