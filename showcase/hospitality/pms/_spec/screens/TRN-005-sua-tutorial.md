# TRN-005 — Sửa Tutorial

**Loại:** Trang đầy đủ
**Route:** `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Sửa thông tin chung của một Tutorial và quản lý danh sách Slide bên trong nó (xem/sửa/xóa từng slide, thêm slide mới).

## Mô tả chi tiết

**Form sửa Tutorial**
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | |
| 2 | Tiêu đề | `title` | Text | Có | |
| 3 | Hình ảnh | `image` | File upload (tối đa 1MB) | Không | Giữ ảnh cũ nếu không chọn ảnh mới |
| 4 | Cấp độ | `access_level` | Select | Có | |
| 5 | Đối tượng áp dụng | `user_role[]` | Checkbox nhiều lựa chọn | Có | |
| 6 | Có Quiz | `is_quiz` | Radio (Yes/No) | Có | |
| 7 | Tần suất Quiz tối đa/tối thiểu | `max_quiz_frequency`, `min_quiz_frequency` | Number | Có | |
| 8 | Sẵn sàng phát hành | `is_ready_release` | Toggle switch | Không | |

**Danh sách Slide con** (bảng)
| # | Cột | Ghi chú |
|---|-----|---------|
| 1 | Tiêu đề slide | |
| 2 | Nội dung (rút gọn 100 ký tự) | Có link "Read more" mở TRN-004 |
| 3 | Hành động | Sửa / Xóa |

## Chức năng/nút thao tác
- **Update**: lưu thay đổi Tutorial, quay lại trang trước đó (`referer`).
- **Cancel**: quay về TRN-002.
- **Add New** (slide): mở TRN-003 (`addTutorial($id)`) để thêm slide mới cho Tutorial này.
- **Sửa slide** (icon bút, từng dòng): → TRN-006 (editSlide).
- **Xóa slide** (icon thùng rác, từng dòng): mở popup xác nhận **TRN-005-P1**.

## Điều hướng
- **Vào từ:** TRN-002 (icon sửa).
- **Đi tới:** TRN-003 (thêm slide), TRN-006 (sửa slide), TRN-005-P1 (popup xóa slide), TRN-002 (Cancel/sau khi cập nhật), TRN-004 (Read more).
