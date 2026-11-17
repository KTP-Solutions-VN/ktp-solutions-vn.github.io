# OPR-004 — Xem chi tiết công việc hồ bơi

**Loại:** Trang đầy đủ
**Route:** operator/poolView/:id + route đẹp dạng dashed: operator/pool-view/:id
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình chỉ xem (read-only) chi tiết một công việc hồ bơi đã thực hiện: thông tin villa, dịch vụ, người thực hiện, thời gian, trạng thái kế hoạch và danh sách ảnh/mô tả minh chứng công việc.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Text hiển thị | |
| 2 | Dịch vụ | `data_array.garden_service.name` | Text hiển thị | |
| 3 | Người thực hiện | `data_array.operators_name` | Text hiển thị | Ghép tên từ `pool_worker_ids` |
| 4 | Giờ bắt đầu/kết thúc | `start_time`, `end_time` | Text hiển thị (H:i) | |
| 5 | Ngày | `start_time` | Text hiển thị (d M y) | |
| 6 | Kế hoạch (Plan) | `is_planned` (Yes/No) | Text hiển thị | |
| 7 | Bảng ảnh minh chứng | `pool_cleaning_detail` | Bảng: STT, Ảnh, Mô tả | Nguồn `PoolCleaningDetail` |

## Chức năng/nút thao tác
- Chỉ xem, không có hành động chỉnh sửa trên màn hình này.

## Điều hướng
- Vào từ: icon "Xem" (mắt) tại OPR-003 — Danh sách công việc hồ bơi.
- Đi tới: không có điều hướng tiếp; dùng nút back của trình duyệt để quay lại OPR-003.
