# TRN-004 — Xem chi tiết Tutorial

**Loại:** Trang đầy đủ
**Route:** `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Trang chỉ đọc, hiển thị toàn bộ thông tin của một Tutorial cùng danh sách Slide và câu hỏi Quiz (nếu có) bên trong.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Tiêu đề | `title` | Text (readonly) | — | |
| 2 | Hình ảnh | `image` | Ảnh (readonly) | — | |
| 3 | Cấp độ | `access_level` | Text (readonly) | — | |
| 4 | Đối tượng áp dụng | `role` | Text (readonly) | — | Danh sách role ghép chuỗi |
| 5 | Có Quiz | `is_quiz` | Text (readonly) | — | |
| 6 | Tần suất Quiz | `quiz_frequency` | Text (readonly) | — | |
| 7 | Danh sách Slide | `tutorial_slide[]` | Danh sách lặp | — | Mỗi slide: title, media_type, text, ảnh hoặc video |
| 8 | Câu hỏi Quiz của từng slide | `quiz_question` | Danh sách lặp | — | question, image, options 1-3, đáp án đúng, số điểm, giải thích |

## Chức năng/nút thao tác
- Không có nút chỉnh sửa/thao tác trên trang; chỉ xem.

## Điều hướng
- **Vào từ:** TRN-002 (icon xem/con mắt), TRN-005 (liên kết "....Read more" khi nội dung slide dài hơn 100 ký tự, mở tab mới).
- **Đi tới:** Không có điều hướng tiếp; người dùng quay lại bằng nút back trình duyệt.
