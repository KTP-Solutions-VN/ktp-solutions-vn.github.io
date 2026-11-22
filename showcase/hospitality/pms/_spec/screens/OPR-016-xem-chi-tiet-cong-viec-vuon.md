# OPR-016 — Hồ sơ lượt chăm vườn (Garden Round Record)

**Loại:** Trang đầy đủ
**Route:** operator/gardenView/:id + route đẹp dạng dashed: operator/garden-view/:id
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình chỉ xem (read-only) chi tiết một công việc vườn (garden job) đã thực hiện: thông tin villa, dịch vụ vườn, người thực hiện (gardener), thời gian, trạng thái kế hoạch. Tương tự OPR-004 (Hồ sơ lượt hồ bơi) nhưng áp dụng cho công việc vườn.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Text hiển thị | |
| 2 | Dịch vụ vườn | `data_array.garden_service.name` | Text hiển thị | |
| 3 | Người thực hiện | `data_array.operators_name` | Text hiển thị | Ghép tên từ `gardener_ids` |
| 4 | Giờ bắt đầu/kết thúc | `start_time`, `end_time` | Text hiển thị | |
| 5 | Kế hoạch (Plan) | `is_planned` (Yes/No) | Text hiển thị | |
| 6 | Bảng ảnh minh chứng | `garden_cleaning` | Bảng: STT, Ảnh, Mô tả | Nguồn `GardenCleaning` |

## Chức năng/nút thao tác
- Chỉ xem, không có hành động chỉnh sửa trên màn hình này.

## Điều hướng
- Vào từ: icon "Xem" (mắt) tại OPR-002 — Lượt chăm vườn.
- Đi tới: không có điều hướng tiếp; quay lại OPR-002 bằng nút back trình duyệt.
