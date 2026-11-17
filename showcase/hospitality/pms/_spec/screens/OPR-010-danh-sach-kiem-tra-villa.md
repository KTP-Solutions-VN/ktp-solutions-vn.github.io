# OPR-010 — Danh sách kiểm tra villa (Inspection)

**Loại:** Trang đầy đủ
**Route:** operator/inspection + route đẹp dạng dashed: operator/inspection
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình chọn đơn vị kinh doanh và villa để bắt đầu một lượt kiểm tra (inspection) villa, đồng thời hiển thị bảng lịch sử các lượt kiểm tra (đã hoàn thành/đang thực hiện/nháp) với các thao tác xem, quản lý tiếp, tải PDF và lưu trữ (archive).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | Mặc định theo cookie |
| 2 | Villa | `villa_id` | Select2 (nạp qua ajax theo BU) | Có | |
| 3 | Bảng lịch sử kiểm tra | `inspectionTable` (DataTable, ajax `inspectionAjax`) | Bảng | — | Cột: Villa, Ngày, Trạng thái (hoàn thành/nháp), Actions |

## Chức năng/nút thao tác
- **Start**: tạo bản ghi `Inspection` mới (ajax `saveInspection`, sinh `inspection_key`), điều hướng tới `operator/inspectionDetails?id=<inspection_key>` (OPR-011).
- **Xem (icon mắt, khi đã hoàn thành)**: điều hướng OPR-012 — Xem kết quả kiểm tra (`inspectionView`).
- **Quản lý/Manage (icon sửa, khi đang thực hiện/nháp)**: điều hướng OPR-013 — Quản lý kiểm tra đang thực hiện (`inspectionTaskView`).
- **Tải PDF**: mở file PDF báo cáo kiểm tra nếu đã có.
- **Archive (icon thùng rác)**: xóa/lưu trữ bản ghi kiểm tra (ajax `deleteInspection`).
- **Draft**: với bản ghi ở trạng thái nháp, bấm để tiếp tục nhập (`fetchDraftInspection`).

## Điều hướng
- Vào từ: menu "Inspection" trong sidebar.
- Đi tới: OPR-011 (bắt đầu kiểm tra mới), OPR-012 (xem kết quả), OPR-013 (quản lý kiểm tra dở dang).
