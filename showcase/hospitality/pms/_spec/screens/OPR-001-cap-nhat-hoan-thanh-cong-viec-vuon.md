# OPR-001 — Công việc sân vườn & hồ bơi (Grounds & Pool Jobs)

**Loại:** Trang đầy đủ
**Route:** operator/gardenJobStatus (query `?id=`) + route đẹp dạng dashed: operator/garden-job-status
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình dành cho nhân viên vườn (gardener) khi đang thực hiện một công việc vườn (garden job): chụp/tải ảnh minh chứng công việc đã hoàn thành, sau đó bấm Finish để ghi nhận vị trí GPS, thời gian kết thúc và chuyển trạng thái công việc sang "Cleaned"; hoặc bấm Stop để dừng công việc giữa chừng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa / thời gian bắt đầu - kết thúc | `garden_jobs.villa.name`, `start_time`, `end_time` | Text hiển thị (readonly) | — | Lấy từ bản ghi `GardenJobs` theo `id` truyền qua query string |
| 2 | Ảnh hoàn thành công việc | `file` (dropzone, nhiều ảnh) | Upload ảnh (Dropzone, resize 1000x500, crop) | Có (bắt buộc khi bấm Finish) | Lưu vào `GardenCleaning.images` (JSON danh sách tên file) |
| 3 | Vĩ độ / kinh độ hiện tại | `lat`, `lon` | Hidden, tự lấy qua `navigator.geolocation` | Có | Nếu trình duyệt không chia sẻ vị trí sẽ hiện modal cảnh báo (`operator/location_allow_error`) và chặn Finish |
| 4 | ID công việc vườn | `id` | Hidden | Có | Lấy từ query string `id` |

## Chức năng/nút thao tác
- **Camera/upload ảnh**: mở Dropzone để chọn/chụp ảnh minh chứng.
- **Finish**: nếu chưa có ảnh trong hàng đợi thì gửi thẳng AJAX POST tới `garden-job-status?id=` với `lat`, `lon`, `id`; nếu có ảnh thì Dropzone tự động tải file lên (multipart) trước. Sau khi thành công, cập nhật `GardenCleaning.images`, `end_time`, `latlng_end`, `status = Cleaned` và điều hướng về OPR-002 (Lượt chăm vườn) đúng ngày của công việc.
- **Stop** (link): gọi action `stopStatus/:id`, đổi `GardenCleaning.status = Stopped` rồi quay lại OPR-002.

## Điều hướng
- Vào từ: nút xem/bắt đầu công việc trong danh sách công việc vườn OPR-002 (hoặc luồng bắt đầu công việc vườn phía mobile).
- Đi tới: sau khi Finish/Stop, quay về OPR-002 — Lượt chăm vườn (lọc theo ngày của công việc).
