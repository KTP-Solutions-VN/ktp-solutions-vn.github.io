# TRN-008 — Tiến độ học của tôi (My Learning Progress)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::myRecord()` — `/training/my-record`
**Module:** TRN = Học viện nhân viên

## Mô tả ngắn gọn
Danh sách các Tutorial mà người dùng hiện tại đã từng đọc, kèm số lần xem, ngày đọc gần nhất và trạng thái đến hạn đọc lại (theo tần suất quiz).

## Mô tả chi tiết
Bộ lọc:
| # | Tên filter | Field code | Loại input | Ghi chú |
|---|-----------|-----------|------------|---------|
| 1 | Đơn vị kinh doanh | `business_unit` (GET) | Select2 | |
| 2 | Sắp xếp theo | `sort_by` (GET) | Select (title/level/due) | |

Cột hiển thị:
| # | Cột | Field code | Ghi chú |
|---|-----|-----------|---------|
| 1 | Tiêu đề | `tutorial_data.title` | |
| 2 | Cấp độ | `tutorial_data.access_level` | |
| 3 | Module | `tutorial_data.role` | |
| 4 | Số lượt xem | `view_count` | Đếm số bản ghi UserTraining |
| 5 | Ngày đọc gần nhất | `reading_date` | |
| 6 | Trạng thái | `status` | Due on {ngày} / Due Now / Overdue |
| 7 | Hành động | — | Đọc |

## Chức năng/nút thao tác
- **Đọc** (icon sách): → TRN-009 (readTutorial), bắt đầu một lượt đọc mới.

## Điều hướng
- **Vào từ:** Menu chính "Staff Academy" → "My Learning Progress"; đích đến sau khi hoàn tất/dừng đọc bài (TRN-009).
- **Đi tới:** TRN-009 (đọc bài).
