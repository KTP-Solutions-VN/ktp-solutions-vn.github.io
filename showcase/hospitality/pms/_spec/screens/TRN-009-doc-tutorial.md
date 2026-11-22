# TRN-009 — Trình đọc bài học (Lesson Reader)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-tutorial/{tutorial_id}/{reading_id}`
**Module:** TRN = Học viện nhân viên

## Mô tả ngắn gọn
Trình chiếu (slideshow) nội dung các Slide của một Tutorial, cho phép người dùng lật qua từng slide (ảnh/video + text) bằng mũi tên trái/phải, tự động ghi nhận lượt đọc.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Slide hiện tại | `data_array[]` (title, text, image/video) | Hiển thị tuần tự (readonly) | — | Chuyển bằng nút mũi tên trái/phải, mỗi slide tự ẩn sau 10s hiện lại nút Next |
| 2 | Mã lượt đọc | `reading_id` | Hidden/URL param | — | Sinh tự động (`uniqid()`) khi bắt đầu đọc, dùng để tránh tạo trùng bản ghi UserTraining |

Ghi chú: giao diện đọc hiện không hiển thị lại phần câu hỏi Quiz (`quiz_question`) của slide dù dữ liệu này tồn tại — chỉ hiển thị tiêu đề, media và text.

## Chức năng/nút thao tác
- **Mũi tên phải**: sang slide tiếp theo.
- **Mũi tên trái**: quay lại slide trước.
- **Stop** (khi chưa đọc hết): thoát, chuyển về TRN-008 mà không đánh dấu hoàn thành.
- **Stop → "End"** (khi đã tới slide cuối "The End"): submit form, đánh dấu `is_complete_read=1` cho bản ghi UserTraining, chuyển về TRN-008.

## Điều hướng
- **Vào từ:** TRN-007 (Danh mục bài học) hoặc TRN-008 (Tiến độ học của tôi), qua icon "Đọc".
- **Đi tới:** TRN-008 (khi Stop hoặc hoàn thành đọc).
