# OPR-009 — Bảng điều phối dọn phòng (Housekeeping Console)

**Loại:** Trang đầy đủ
**Route:** operator/cleaningOperator + route đẹp dạng dashed: operator/cleaning-operator
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Dashboard quản lý dọn dẹp dành cho quản lý vận hành: theo dõi các lượt dọn dẹp đang thực hiện (in-progress) và đã hoàn thành (completed) trong ngày/khoảng thời gian, theo 2 tab "By Date" và "By Property"; cho phép chấm điểm chất lượng (rating), duyệt/giao lại cho chủ nhà (release to owner), và xóa lượt dọn dẹp/điểm dọn dẹp.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Set cookie BU |
| 2 | Ngày / Tháng-Năm (tab By Date) | `date`, `month`, `year` | Datepicker/lịch | Mặc định ngày hiện tại |
| 3 | Villa (tab By Property) | `property_id` | Select2 | |
| 4 | Dịch vụ dọn dẹp | `cleaning_service_id` | Select2 (`GardenService` type=cleaning) | |
| 5 | Trạng thái bàn giao | `release_status_id` | Select (Not reviewed / Released to owner / Internal only) | |

### Khối dữ liệu hiển thị
| # | Khối | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | Danh sách đang thực hiện (In-progress) | `Cleaning` theo ngày | Có tổng số lượt |
| 2 | Danh sách đã hoàn thành (Completed) | `CompletedCleaning` theo ngày | Có tổng số lượt, điểm đánh giá trung bình supervisor |
| 3 | Thống kê villa (ảnh, team) | `Villa` + `VillaImage`, `GardenTeams` | Card hiển thị theo villa |

## Chức năng/nút thao tác
- **Tab By Date / By Property**: chuyển chế độ xem.
- **Xóa lượt dọn dẹp / điểm dọn dẹp**: submit `page_action = cleaning_delete` hoặc `point_delete` để xóa `Cleaning`/`CleaningDetails`.
- **Chấm điểm (Rating)**: ajax `saveRating` chấm điểm chất lượng cho lượt dọn dẹp.
- **Giao lại cho chủ nhà (Release to Owner)**: ajax `releaseToOwner`, đổi trạng thái bàn giao.
- **Xem điểm dọn dẹp/team**: ajax `getCleaningPointData`, `getStandardData`, `getTeam` nạp dữ liệu chi tiết vào các panel/khối trên dashboard.

## Điều hướng
- Vào từ: menu "Housekeeping Console" (dành cho quản lý) trong sidebar.
- Đi tới: không điều hướng sang trang khác cố định; các thao tác cập nhật trạng thái/điểm số xử lý ajax ngay trên trang.
