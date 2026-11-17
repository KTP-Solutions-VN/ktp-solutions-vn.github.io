# TRN-002-P1 — Popup xác nhận xóa Tutorial

**Loại:** Popup (mở từ TRN-002)
**Route:** Modal Bootstrap trong `create_tutorial.ctp`; hành động xóa gọi `TrainingController::deleteTutorial($id)` — `/training/delete-tutorial/{id_base64}`
**Module:** TRN = Đào tạo

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi xóa vĩnh viễn một Tutorial (kèm toàn bộ Slide và câu hỏi Quiz liên quan).

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Tên tutorial cần xóa | hiển thị trong tiêu đề modal | Text (readonly) | — | Lấy từ `data-title` của dòng được chọn |

## Chức năng/nút thao tác
- **Delete/Save**: xác nhận xóa, điều hướng bằng JS tới `/training/delete-tutorial/{base64(id)}`.
- **Cancel**: đóng modal, không thực hiện gì.

## Điều hướng
- **Mở từ:** TRN-002 (icon thùng rác trên từng dòng).
- **Đi tới:** Sau khi xóa thành công/thất bại, quay lại TRN-002 (createTutorial) kèm flash message.
