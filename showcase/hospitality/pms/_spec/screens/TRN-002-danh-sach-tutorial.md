# TRN-002 — Danh sách Tutorial (Quản trị)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::createTutorial()` — `/training/create-tutorial`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Danh sách toàn bộ tutorial (bài đào tạo) trong hệ thống dành cho quản trị viên tạo/sửa/xóa nội dung đào tạo.

## Mô tả chi tiết
Danh sách (bảng), không có bộ lọc riêng trên trang này. Sắp xếp mặc định theo `Tutorial.id DESC`.

Cột hiển thị:
| # | Tên cột | Field code | Ghi chú |
|---|---------|-----------|---------|
| 1 | Tiêu đề | `title` | |
| 2 | Đối tượng/Module | `role` (join từ `role_id`, danh sách role) | Danh sách vai trò được phép truy cập |
| 3 | Cấp độ | `access_level` | staff / manager / admin |
| 4 | Người tạo | `user.usage_name` | Join bảng User |
| 5 | Ngày tạo | `created_at` | Định dạng d M y, H:i |
| 6 | Hành động | — | Xem / Sửa / Xóa |

## Chức năng/nút thao tác
- **Thêm mới**: nút "Add New" → mở TRN-003 (addTutorial, không truyền id).
- **Xem** (icon con mắt): → TRN-004 (viewTutorial).
- **Sửa** (icon bút): → TRN-005 (editTutorial).
- **Xóa** (icon thùng rác): mở popup xác nhận **TRN-002-P1**; xác nhận sẽ gọi `deleteTutorial` (xóa cascade Tutorial, TutorialSlide, QuizQuestion liên quan) và tải lại danh sách này.

## Điều hướng
- **Vào từ:** Menu chính "Training" → "Create Tutorial".
- **Đi tới:** TRN-003 (thêm mới), TRN-004 (xem), TRN-005 (sửa), TRN-002-P1 (popup xóa).
