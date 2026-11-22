# OPR-012 — Kết quả kiểm tra tình trạng (Condition Check Results)

**Loại:** Trang đầy đủ
**Route:** operator/inspectionView?id= + route đẹp dạng dashed: operator/inspection-view
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình chỉ xem (read-only) toàn bộ kết quả của một lượt kiểm tra villa đã hoàn thành: danh sách các điểm kiểm tra kèm ảnh minh chứng, hạng mục, khu vực và mô tả.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Mã lượt kiểm tra | `id` (`inspection_key`) | Query string | |
| 2 | Danh sách điểm kiểm tra | `InspectionDetails` (theo `inspection_key`) | Bảng/danh sách card | Mỗi điểm: hạng mục, khu vực, ảnh, mô tả |

## Chức năng/nút thao tác
- Chỉ xem; không có hành động chỉnh sửa dữ liệu trên màn hình này (dùng để xem lại lịch sử/tải báo cáo).

## Điều hướng
- Vào từ: icon "Xem" (mắt) tại OPR-010 — Kiểm tra tình trạng (áp dụng cho bản ghi đã hoàn thành).
- Đi tới: không có điều hướng tiếp; quay lại OPR-010 bằng nút back trình duyệt.
