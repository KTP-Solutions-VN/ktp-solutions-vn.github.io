# TXT-001-P1 — Thêm/Sửa văn bản

**Loại:** Popup (mở từ TXT-001)

**Route:** Modal tĩnh trong `index.ctp` (`#texts-editor-modal`); lưu qua AJAX `TextsController::saveText()` — `POST /texts/save-text`

**Module:** TXT = Văn bản

## Mô tả ngắn gọn
Form soạn nội dung văn bản cho một Content Element, áp dụng cho một property/unit/residence cụ thể (direct context) hoặc là một văn bản dùng lại (Shared/Profile) áp dụng cho nhiều Business Unit.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Content Element | `content_element_id` | Select/nhóm lựa chọn theo scope | Có | Chỉ hiển thị các element đã được gán (assigned) cho scope tương ứng |
| 2 | Ngôn ngữ | `language_id` | Select | Có | Danh sách ngôn ngữ đã cấu hình cho quốc gia liên quan |
| 3 | Yêu cầu OTA (OTA requirements) | — | Select hiển thị thông tin | Không | Chỉ hiện với scope property/unit/residence |
| 4 | Tiêu đề | `title` | Text (chỉ hiện với văn bản dùng lại Shared/Profile) | Có (nếu Shared/Profile) | Tối đa 255 ký tự |
| 5 | Nội dung | `content` | Textarea | Có | Giới hạn ký tự theo `max_length` của Content Element |
| 6 | Business Unit áp dụng | `business_unit_ids[]` | Multi-select dạng popover tick chọn | Có (nếu Shared/Profile) | Chỉ hiện với văn bản dùng lại |
| 7 | Gán văn bản dùng lại (assignment) | `assignment_text_ids[]` | Multi-select | Không | Chỉ hiện ở tab Property/Unit/Residence, để gắn thêm Shared/Profile text đã có |
| 8 | Nội dung theo từng ngôn ngữ khác (translation_contents) | `translation_contents[lang_id]` | Textarea theo từng ngôn ngữ | Có nếu là văn bản dùng lại và áp dụng nhiều ngôn ngữ | |

## Chức năng/nút thao tác
- **Save changes:** validate độ dài nội dung, ngôn ngữ hợp lệ theo quốc gia, lưu bản ghi `OtaTexts` + `OtaTextTranslations`, đồng bộ `OtaTextBusinessUnits` hoặc `OtaTextAssignments` tùy loại, hiển thị toast và cập nhật lại bảng trên TXT-001.
- **Cancel:** đóng modal không lưu.

## Điều hướng
- Mở từ: nút "New text" hoặc icon sửa trên các dòng dữ liệu trong TXT-001.
- Sau khi lưu: đóng modal, làm mới dữ liệu TXT-001.
