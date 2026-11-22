# BOOK-031 — Điểm kiểm tra (Audit Checkpoints)

**Loại:** Trang đầy đủ
**Route:** Booking/checkControlPoint (mặc định: `/booking/check-control-point`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Danh sách villa theo đơn vị kinh doanh, hiển thị số lượng điểm kiểm soát (control point) và số lượng nhắc việc (reminder) đã cấu hình cho từng villa. Là màn hình quản trị/cấu hình gốc cho quy trình kiểm soát nhận/trả phòng (BOOK-029, BOOK-030).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Không | "All" + danh sách BU theo quyền user; chọn sẽ POST lại và lưu cookie |

### Cột hiển thị danh sách villa
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property (tên villa) | |
| 2 | Control Points | Số lượng điểm kiểm soát đã cấu hình (đếm từ VillaControl) |
| 3 | Reminders | Số lượng nhắc việc (đếm từ VillaReminder) |
| 4 | Actions | Thao tác |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh
- Xem/quản lý điểm kiểm soát và nhắc việc theo từng villa

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Audit Checkpoints
- Điều hướng tới: cấu hình chi tiết control point/reminder theo villa (thuộc phạm vi module Villa)
