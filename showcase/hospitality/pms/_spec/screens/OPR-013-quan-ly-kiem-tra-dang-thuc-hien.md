# OPR-013 — Quản lý kiểm tra đang thực hiện

**Loại:** Trang đầy đủ
**Route:** operator/inspectionTaskView?id= + route đẹp dạng dashed: operator/inspection-task-view
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình quản lý (manage) cho một lượt kiểm tra villa đang thực hiện/chưa hoàn thành: xem lại các điểm kiểm tra đã ghi nhận, tiếp tục nhập thêm điểm hoặc chỉnh sửa điểm đã có trước khi kết thúc lượt kiểm tra.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Mã lượt kiểm tra | `id` (`inspection_key`) | Query string | |
| 2 | Danh sách điểm kiểm tra hiện có | `InspectionDetails` | Danh sách/card, mỗi điểm có thể bấm sửa | |

## Chức năng/nút thao tác
- **Xem/sửa từng điểm**: chỉnh sửa hạng mục/khu vực/ảnh/mô tả của một điểm đã ghi nhận.
- **Tiếp tục kiểm tra**: điều hướng sang OPR-011 (`inspectionDetails`) để thêm điểm mới hoặc hoàn tất lượt kiểm tra.

## Điều hướng
- Vào từ: icon "Manage" (bút sửa) tại OPR-010 — Danh sách kiểm tra villa (áp dụng cho bản ghi đang thực hiện/nháp).
- Đi tới: OPR-011 — Thực hiện kiểm tra villa theo điểm (để tiếp tục/hoàn tất).
