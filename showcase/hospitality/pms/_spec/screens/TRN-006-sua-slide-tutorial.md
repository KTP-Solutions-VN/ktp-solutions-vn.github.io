# TRN-006 — Sửa slide bài học (Edit Lesson Slide)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::editSlide($id)` — `/training/edit-slide/{id}`
**Module:** TRN = Học viện nhân viên

## Mô tả ngắn gọn
Sửa nội dung của một Slide riêng lẻ trong Tutorial: media (ảnh/video), nội dung text và câu hỏi Quiz tùy chọn.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Tiêu đề slide | `title` | Text | Có | |
| 2 | Loại media | `media_type` | Radio (Image/Video) | Có | |
| 3 | Hình ảnh slide | `slide_image` | File (tối đa 3MB) | Có điều kiện | Giữ ảnh cũ nếu không đổi |
| 4 | Video slide | `slide_video` | File (tối đa 30MB) | Có điều kiện | Upload AJAX trước khi submit |
| 5 | Nội dung | `text` | Textarea TinyMCE | Có | |
| 6 | Có trang Quiz | `is_quiz_page` | Radio (Yes/No) | Có | |
| 7 | Câu hỏi, đáp án 1-3, đáp án đúng, số điểm, giải thích | `question`, `option1-3`, `correct_answer`, `number_of_point`, `explanation` | Text/Textarea/Radio | Có điều kiện | Hiện khi is_quiz_page=Yes |
| 8 | Hình ảnh câu hỏi | `question_image` | File (tối đa 1MB) | Không | |

## Chức năng/nút thao tác
- **Update** (`finish_button`): lưu thay đổi slide, quay về TRN-005.
- **Cancel**: quay về TRN-005 mà không lưu.

## Điều hướng
- **Vào từ:** TRN-005 (icon sửa trên từng dòng slide).
- **Đi tới:** TRN-005 (sau khi lưu hoặc hủy).
