# OPR-006 — Báo cáo sự cố hồ bơi

**Loại:** Trang đầy đủ
**Route:** operator/poolReport/:id + route đẹp dạng dashed: operator/pool-report/:id
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình cho nhân viên hồ bơi báo cáo sự cố phát sinh trong công việc: mô tả vấn đề kèm ảnh minh chứng; hệ thống lưu `PoolCleaningProblem`, chuyển `PoolCleaning.status = Problem` và gửi email cảnh báo cho business unit phụ trách villa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa / thời gian bắt đầu | `pool_cleaning.villa.name`, `start_time` | Text hiển thị (readonly) | — | |
| 2 | Ảnh sự cố | `file` (dropzone, nhiều ảnh) | Upload ảnh (Dropzone) | Có | Lưu vào `PoolCleaningProblem.image` (JSON) |
| 3 | Mô tả sự cố | `text` | Textarea | Có | Lưu vào `PoolCleaningProblem.text`, đồng thời là nội dung email gửi cho business unit |
| 4 | ID công việc hồ bơi | `id` | Hidden | Có | |

## Chức năng/nút thao tác
- **Camera/upload ảnh**: mở Dropzone chọn/chụp ảnh minh chứng sự cố.
- **Submit**: POST dữ liệu; nếu đã có báo cáo sự cố trước đó cho job này thì cập nhật (upsert theo `pool_cleaning_id`); sau khi lưu, đổi `PoolCleaning.status = Problem` và gửi email (template `pool_cleaning_problem_email`) kèm ảnh đính kèm tới email của `Villa.business_unit`.

## Điều hướng
- Vào từ: luồng xử lý công việc hồ bơi khi phát hiện sự cố (thường liên kết với OPR-005).
- Đi tới: không điều hướng tự động cụ thể (trả JSON `{status:1}`); quay lại luồng vận hành hồ bơi.
