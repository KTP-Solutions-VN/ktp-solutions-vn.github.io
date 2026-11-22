# TRN-007 — Danh mục bài học (Lesson Catalog)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::library()` — `/training/library`
**Module:** TRN = Học viện nhân viên

## Mô tả ngắn gọn
Danh sách các Tutorial đã phát hành (active) mà người dùng hiện tại được phép xem, dùng để tra cứu và bắt đầu học/đọc bài.

## Mô tả chi tiết
Bộ lọc:
| # | Tên filter | Field code | Loại input | Ghi chú |
|---|-----------|-----------|------------|---------|
| 1 | Đơn vị kinh doanh | `business_unit` (GET) | Select2 | Lưu cookie khi thay đổi |
| 2 | Sắp xếp theo | `sort_by` (GET) | Select (title/level/due) | |
| 3 | Ẩn/Hiện mục đã ẩn | `list_data` (GET, hide/show) | Nút bấm | Đổi điều kiện `Tutorial.status` |

Cột hiển thị:
| # | Cột | Field code | Ghi chú |
|---|-----|-----------|---------|
| 1 | Tiêu đề | `title` | |
| 2 | Đối tượng/Module | `role` | |
| 3 | Cấp độ | `access_level` | |
| 4 | Số Slide | `slide_number` | |
| 5 | Ngày phát hành | `release_date` | |
| 6 | Trạng thái Due | `due` | New / Due Now / Overdue / From {ngày} |
| 7 | Ngày tạo | `created_at` | |
| 8 | Hành động | — | Đọc, Ẩn/Hiện |

Dữ liệu tự động lọc theo `user_type` (Employee chỉ thấy access_level=staff; Team Leader/BU Manager thấy staff+manager) và theo vai trò (`user_roles`) của người dùng.

## Chức năng/nút thao tác
- **Đọc** (icon sách): → TRN-009 (readTutorial).
- **Ẩn/Hiện** (icon con mắt gạch): gọi `trainingStatus` đổi trạng thái active/inactive, tải lại trang này.

## Điều hướng
- **Vào từ:** Menu chính "Staff Academy" → "Lesson Catalog".
- **Đi tới:** TRN-009 (đọc bài).
