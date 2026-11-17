# OPR-005 — Cập nhật hoàn thành công việc hồ bơi

**Loại:** Trang đầy đủ
**Route:** operator/poolJob/:id + route đẹp dạng dashed: operator/pool-job/:id
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình dành cho nhân viên hồ bơi khi đang thực hiện một công việc: chụp/tải ảnh minh chứng hoàn thành rồi submit để ghi nhận vị trí GPS, thời gian kết thúc và chuyển trạng thái `PoolCleaning.status = Cleaned`. Chức năng tương tự OPR-001 (garden job) nhưng áp dụng cho hồ bơi.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa / thời gian bắt đầu | `pool_cleaning.villa.name`, `start_time` | Text hiển thị (readonly) | — | Lấy từ `PoolCleaning` theo `id` |
| 2 | Ảnh hoàn thành công việc | `file` (dropzone, nhiều ảnh) | Upload ảnh (Dropzone) | Có | Lưu vào `PoolCleaning.images` (JSON) qua `_imageUpload` |
| 3 | Vĩ độ / kinh độ hiện tại | `lat`, `lon` | Hidden, lấy qua `navigator.geolocation` | Có | Dùng tính khoảng cách tới `villa.villa_location`, > 200m thì `gps = NOK` |
| 4 | ID công việc hồ bơi | `id` | Hidden | Có | |

## Chức năng/nút thao tác
- **Camera/upload ảnh**: mở Dropzone chọn/chụp ảnh.
- **Submit/Finish**: POST ảnh + `lat`/`lon` lên chính route này; server tính khoảng cách GPS, cập nhật `images`, `end_time`, `latlng_end`, `status = Cleaned`, `gps = OK/NOK`, trả JSON `{status, url: 'operator/pools'}` để JS điều hướng.

## Điều hướng
- Vào từ: luồng bắt đầu công việc hồ bơi (mobile/villa-services) khi nhân viên nhận job.
- Đi tới: sau khi submit thành công, chuyển về OPR-003 — Danh sách công việc hồ bơi.
