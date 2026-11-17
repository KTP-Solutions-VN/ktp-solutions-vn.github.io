# EMT-001-P1 — Xác nhận xóa mẫu email

**Loại:** Popup (mở từ EMT-001)

**Route:** Modal tĩnh trong `list.ctp`; xác nhận điều hướng tới `EmailTemplateController::delete($id)` — `GET /email-template/delete/:id`

**Module:** EMT = Mẫu email

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi xóa một mẫu email.

## Mô tả chi tiết
Không có field nhập liệu, chỉ có thông điệp xác nhận và tên mẫu email sắp xóa hiển thị trên tiêu đề modal.

## Chức năng/nút thao tác
- **Save (Xác nhận xóa):** điều hướng tới `email-template/delete/:id` (id được mã hóa base64), xóa bản ghi `EmailTemplate` và ghi log hoạt động.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: EMT-001 (Danh sách mẫu email).
- Sau khi xác nhận: quay lại EMT-001.
