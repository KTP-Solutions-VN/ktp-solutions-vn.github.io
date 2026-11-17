# TRN-005-P1 — Popup xác nhận xóa Slide

**Loại:** Popup (mở từ TRN-005)
**Route:** Modal Bootstrap trong `edit_tutorial.ctp`; hành động xóa gọi `TrainingController::deleteSlide($id)` — `/training/delete-slide/{id_base64}`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi xóa một Slide (và câu hỏi Quiz gắn với slide đó nếu có).

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Thông báo xác nhận xóa chung |

## Chức năng/nút thao tác
- **Save/Delete**: điều hướng JS tới `/training/delete-slide/{base64(id)}`.
- **Cancel**: đóng modal.

## Điều hướng
- **Mở từ:** TRN-005 (icon thùng rác trên từng dòng slide).
- **Đi tới:** Sau khi xóa, quay lại TRN-005 (editTutorial) kèm flash message.
