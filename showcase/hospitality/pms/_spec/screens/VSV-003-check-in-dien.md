# VSV-003 — Chỉ số điện khi đến (Arrival Meter Reading)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::checkIn()` — mặc định `/villa-services/check-in`

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Liệt kê các booking check-in trong ngày (theo villa có quản lý điện = yes) để nhân viên nhập chỉ số đồng hồ điện đầu kỳ (start meter) khi khách nhận phòng.

## Mô tả chi tiết

Bộ lọc: Business Unit (`business_unit`, select có "All"), Property/Villa (`villa`, select có "All"), Ngày check-in (`check_in_date`, datepicker, mặc định hôm nay).

Bảng danh sách booking check-in ngày đã chọn:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Khách | `guest_name` (= `Guest.first_name` + `last_name`) | Loại trừ các tên nằm trong danh mục `Exception` (type=complete) |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 ngày so với giá trị lưu |
| 5 | Số đêm | `nights` | Tính runtime |
| 6 | Người cập nhật cuối | `last_updated_by` | Từ `ElectricalBill.modified_by` |
| 7 | Hành động | — | Nút "Enter" → mở VSV-003-P1 (Ghi chỉ số khi đến), mở tab mới |

Điều kiện lấy dữ liệu: `Booking.check_in_date = <ngày lọc>`, `status != Cancelled`, `Villa.status = Open`, villa phải có `VillaService.service_settings.electricity_management = yes`.

## Chức năng/nút thao tác
- **Lọc theo Business Unit / Property / Ngày check-in** (submit POST, cùng action).
- **Enter** (từng dòng): mở VSV-003-P1 (`startMeter`) để nhập chỉ số điện đầu kỳ cho booking đó.
- Nếu chọn villa cụ thể và không có booking check-in trong ngày → chuyển thẳng sang VSV-003-P1 luôn (redirect tự động khi chỉ có đúng 1 booking khớp điều kiện lọc villa/ngày).

## Điều hướng
- Vào từ: Menu chính (mục Arrival Meter Reading) hoặc sau khi lưu VSV-003-P1/VSV-004-P1 (redirect quay lại).
- Điều hướng đến: VSV-003-P1 (Ghi chỉ số khi đến).
