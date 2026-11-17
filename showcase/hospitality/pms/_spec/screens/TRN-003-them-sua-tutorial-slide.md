# TRN-003 — Thêm mới Tutorial và Slide

**Loại:** Trang đầy đủ
**Route:** `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/add-tutorial/{tutorial_id}/{slide_id}`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Màn hình dạng wizard 2 bước: (1) tạo/khai báo thông tin chung của Tutorial; sau khi lưu, (2) form thêm từng Slide nội dung (ảnh/video + text + quiz tùy chọn) nối tiếp nhau cho tới khi bấm Finish.

## Mô tả chi tiết

**Form 1 — Thông tin Tutorial (`tutorial_form`)**
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | Theo BU mà user được phân quyền |
| 2 | Tiêu đề | `title` | Text | Có | |
| 3 | Hình ảnh | `image` | File upload (ảnh, tối đa 1MB) | Không | |
| 4 | Cấp độ | `access_level` | Select (staff/manager/admin) | Có | |
| 5 | Đối tượng áp dụng (Module Access) | `user_role[]` | Checkbox nhiều lựa chọn | Có | Lưu dạng JSON vào `role_id` |
| 6 | Có Quiz | `is_quiz` | Radio (Yes/No) | Có | |
| 7 | Tần suất Quiz tối đa | `max_quiz_frequency` | Number | Có | Số ngày |
| 8 | Tần suất Quiz tối thiểu | `min_quiz_frequency` | Number | Có | Số ngày |
| 9 | Sẵn sàng phát hành | `is_ready_release` | Toggle switch (Yes/No, hidden input) | Không | Nếu Yes, set `release_date` = hôm nay |

**Form 2 — Slide (`slide_form`, chỉ hiện sau khi Tutorial đã có id)**
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Tiêu đề slide | `title` | Text | Có | |
| 2 | Loại media | `media_type` | Radio (Image/Video) | Có | |
| 3 | Hình ảnh slide | `slide_image` | File (tối đa 3MB) | Có nếu media=Image | |
| 4 | Video slide | `slide_video` | File (tối đa 30MB) | Có nếu media=Video | Upload AJAX riêng trước khi submit (`uploadSlideVideo`) |
| 5 | Nội dung | `text` | Textarea WYSIWYG (TinyMCE) | Có | |
| 6 | Có trang Quiz | `is_quiz_page` | Radio (Yes/No) | Có | |
| 7 | Câu hỏi | `question` | Text | Có nếu is_quiz_page=Yes | |
| 8 | Hình ảnh câu hỏi | `question_image` | File (tối đa 1MB) | Không | |
| 9 | Đáp án 1/2/3 | `option1`, `option2`, `option3` | Text | Có nếu is_quiz_page=Yes | |
| 10 | Đáp án đúng | `correct_answer` | Radio (1/2/3) | Có nếu is_quiz_page=Yes | |
| 11 | Số điểm | `number_of_point` | Text/Number | Có nếu is_quiz_page=Yes | |
| 12 | Giải thích | `explanation` | Textarea | Có nếu is_quiz_page=Yes | |

## Chức năng/nút thao tác
- **Add Slide/Update** (form Tutorial): lưu thông tin Tutorial; nếu là tạo mới, redirect lại chính trang này kèm `tutorial_id` vừa tạo để mở form Slide.
- **Upload** (video): AJAX upload video slide riêng, trả về tên file trước khi submit form chính.
- **Next**: lưu slide hiện tại, quay lại trang này để nhập slide tiếp theo.
- **Back**: quay lại chỉnh sửa slide liền trước.
- **Finish**: lưu slide hiện tại và kết thúc, chuyển về TRN-002.

## Điều hướng
- **Vào từ:** TRN-002 (nút "Add New"), TRN-005 (nút "Add New" slide, gọi `addTutorial($id)`), hoặc tự lặp lại (Next/Back) trong chính flow này.
- **Đi tới:** Khi bấm Finish hoặc lưu lỗi → quay về TRN-002 (createTutorial).
