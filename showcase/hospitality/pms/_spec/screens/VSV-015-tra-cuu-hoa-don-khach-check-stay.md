# VSV-015 — Phí điện của khách (Guest Power Charges)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::checkStay()` — mặc định `/villa-services/check-stay`; dữ liệu gợi ý bổ sung qua AJAX `getCheckStay` (không có view riêng)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Công cụ tra cứu nhanh dữ liệu điện của một villa theo khoảng ngày (chỉ số đầu/cuối kỳ, số tiền đã thu) hoặc theo ngày check-in cụ thể (chi tiết đầy đủ hóa đơn điện của một lượt lưu trú: số điện tiêu thụ, phí, giảm giá, số tiền đã thanh toán, phương thức thanh toán).

## Mô tả chi tiết

### Bộ lọc — Tab "Theo khoảng ngày" (`tab = villa`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select (select2) | Không | |
| 2 | Property | `villa` | Select (select2) | Có | Chỉ liệt kê villa có quản lý điện |
| 3 | Start Date | `start_date` | Text (datepicker) | Có | |
| 4 | End Date | `end_date` | Text (datepicker) | Có | |

Bảng kết quả: Date | Amount Paid | Check-out Meter | Check-in Meter (2 dòng: đầu kỳ và cuối kỳ khớp ngày lọc, hoặc lân cận ±1 ngày nếu không khớp chính xác).

### Bộ lọc — Tab "Theo ngày check-in" (`tab != villa`)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `villa_in` | Select | Có | |
| 2 | Check-in Date | `check_in_date` | Text (datepicker) | Có | |

Kết quả hiển thị dạng cặp nhãn/giá trị: Check In Date/Meter, Check Out Date/Meter, Units Consumed/Free Units, Charge/Discount, Amount Paid/Payment Means.

- Nếu không có dữ liệu khớp điều kiện lọc → hiển thị thông báo "No data available..." / "No Check in for property...".

## Chức năng/nút thao tác
- **Search** (mỗi tab): submit POST tìm kiếm theo bộ lọc tương ứng.

## Điều hướng
- Vào từ: Menu chính (mục Guest Power Charges).
- Điều hướng đến: không có trang con.
