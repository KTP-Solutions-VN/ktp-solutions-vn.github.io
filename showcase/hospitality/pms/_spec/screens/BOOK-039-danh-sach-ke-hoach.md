# BOOK-039 — Danh sách kế hoạch (Planning List)

**Loại:** Trang đầy đủ
**Route:** Booking/planningList (mặc định: `/booking/planning-list`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các yêu cầu/kế hoạch liên quan đến check-in/check-out theo villa: kênh đặt, thời gian, người phụ trách concierge và trạng thái chat với khách. Hỗ trợ lọc theo đơn vị kinh doanh, khoảng ngày và xuất dữ liệu (export).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Không | |
| 2 | Chọn ngày | `select_date` | Datepicker | Không | |
| 3 | Xuất dữ liệu | `export` | Checkbox/nút | Không | Xuất danh sách hiện tại ra file |

### Cột hiển thị
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Sr No | STT |
| 2 | Check by | Loại kiểm tra (check-in/check-out) |
| 3 | Villa | |
| 4 | Channel | Kênh đặt phòng |
| 5 | Name | Tên khách |
| 6 | Country | Quốc tịch |
| 7 | Time | Giờ dự kiến |
| 8 | By | Người thực hiện |
| 9 | Request | Yêu cầu đặc biệt |
| 10 | Concierge | Concierge phụ trách |
| 11 | Chat Status | Trạng thái chat với khách |

## Chức năng/nút thao tác
- Lọc theo đơn vị kinh doanh và ngày
- Xuất dữ liệu (export)
- Xem chi tiết từng dòng kế hoạch

## Điều hướng
- Mở từ: Menu module Đặt phòng > Planning
- Điều hướng tới: BOOK-040 (Kế hoạch villa theo lịch)
