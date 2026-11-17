# VSV-004 — Check-out điện (danh sách)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::checkOut()` — mặc định `/villa-services/check-out`

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Liệt kê các booking check-out trong ngày để nhân viên nhập chỉ số đồng hồ điện cuối kỳ (end meter), tính tiền điện phải thu và ghi nhận thanh toán.

## Mô tả chi tiết

Bộ lọc: Business Unit (`business_unit`, select có "All"), Property/Villa (`villa`, select có "All"), Ngày check-out (`check_out_date`, datepicker, mặc định hôm nay).

Bảng danh sách booking check-out ngày đã chọn:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Khách | `Guest.first_name` | Loại trừ tên trong danh mục `Exception` |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 ngày so với giá trị lưu |
| 5 | Số đêm | `nights` | Tính runtime |
| 6 | Người nhập đầu kỳ | `check_in_by` | Từ `ElectricalBill.modified_by` |
| 7 | Người cập nhật cuối kỳ | `last_updated_by` | Từ `ElectricalBill.end_meter_modified_by` |
| 8 | Số tiền đã thu | `received` | `ElectricalBill.recieved` |
| 9 | Phụ phí | `additional_fees` | `ElectricalBill.additional_fees` |
| 10 | Ghi chú | `note` | `ElectricalBill.note` |
| 11 | Hành động | — | "Fill it now" → mở VSV-004-P1 (Nhập chỉ số đồng hồ cuối kỳ) |

Nếu chọn villa cụ thể mà booking đó **chưa có start meter** → cảnh báo "No Start Meter" (không cho vào end meter), ghi nhận noticeboard nhắc nhở nhân viên đã bỏ sót bước check-in.

## Chức năng/nút thao tác
- **Lọc theo Business Unit / Property / Ngày check-out** (submit POST).
- **Fill it now** (từng dòng): mở VSV-004-P1 (`endMeter`) để nhập chỉ số điện cuối kỳ, tính tiền, ghi nhận thanh toán.
- Nếu villa được chọn có đúng 1 booking khớp và đã có start meter → tự động redirect thẳng sang VSV-004-P1.

## Điều hướng
- Vào từ: Menu chính (mục Electricity/Check-out) hoặc sau khi lưu VSV-004-P1 (redirect quay lại).
- Điều hướng đến: VSV-004-P1 (Nhập chỉ số đồng hồ cuối kỳ).
