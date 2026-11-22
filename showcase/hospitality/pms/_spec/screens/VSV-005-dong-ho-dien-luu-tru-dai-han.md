# VSV-005 — Đo điện lưu trú dài ngày (Extended-Stay Metering)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::partial()` — mặc định `/villa-services/partial`; các bộ lọc đọc qua query string (`?villa=&guest_name=&check_in_date=&check_out_date=`)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Danh sách các booking lưu trú dài hạn (long stay) đang có đồng hồ điện cần theo dõi/nhập định kỳ, tách biệt khỏi luồng check-in/check-out ngắn hạn thông thường.

## Mô tả chi tiết

Bộ lọc: Business Unit (`business_unit`), Property (`villa`), Tên khách (`guest_name`), Ngày check-in (`check_in_date`), Ngày check-out (`check_out_date`).

Bảng danh sách booking:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Khách | `Guest.first_name` | |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 ngày |
| 5 | Số đêm | `nights` | Tính runtime |
| 6 | Người nhập | `check_in_by` | `ElectricalBill.modified_by` |
| 7 | Người cập nhật cuối | `last_updated_by` | `ElectricalBill.end_meter_modified_by` |
| 8 | Hành động | — | "Enter" → mở VSV-005-P1 (Ghi chỉ số lưu trú dài ngày) |

## Chức năng/nút thao tác
- **Lọc theo Business Unit / Property / Tên khách / khoảng ngày check-in–check-out.**
- **Enter** (từng dòng): mở VSV-005-P1 (`addLongStayMeter`).

## Điều hướng
- Vào từ: Menu chính (mục Extended-Stay Metering) hoặc sau khi lưu VSV-005-P1 (redirect quay lại).
- Điều hướng đến: VSV-005-P1 (Ghi chỉ số lưu trú dài ngày).
