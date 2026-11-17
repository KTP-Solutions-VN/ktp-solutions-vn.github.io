# TRN-013 — Demo câu hỏi trắc nghiệm

**Loại:** Trang đầy đủ
**Route:** `TrainingController::quizQuestion()` — `/training/quiz-question`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Trang tĩnh minh họa giao diện một câu hỏi trắc nghiệm mẫu (hard-code "A VIP booking has a value"), không kết nối dữ liệu Quiz thực tế. Có dấu hiệu là màn hình demo/mẫu, không thấy liên kết trỏ tới từ nơi khác trong module.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Câu hỏi mẫu | — | Text tĩnh | — | Hard-code trong view |
| 2 | Đáp án A/B/C | — | Radio (tĩnh) | — | Không submit thực tế tới server |

## Chức năng/nút thao tác
- **Validate**: nút submit form nhưng không có action xử lý phía server (form không có action, chỉ để minh họa giao diện).

## Điều hướng
- **Vào từ:** Không tìm thấy liên kết trỏ tới trang này từ các màn hình khác trong module Training; chỉ truy cập được qua URL trực tiếp.
- **Đi tới:** Không có.
