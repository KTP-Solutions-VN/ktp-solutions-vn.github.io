# NOT-003-P1 — Xác nhận xóa thông báo (từ trang chi tiết)

**Loại:** Popup (mở từ NOT-003)

**Route:** Modal tĩnh trong `view_detail.ctp`; xác nhận gọi `NoticeController::delete($id)` qua `GET /notice/delete/:id`

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Hộp thoại xác nhận xóa thông báo ngay tại trang xem chi tiết.

## Mô tả chi tiết
Không có field nhập liệu, chỉ có thông điệp xác nhận.

## Chức năng/nút thao tác
- **Save (Xác nhận xóa):** điều hướng tới `notice/delete/:id`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: NOT-003 (Chi tiết thông báo).
- Sau khi xác nhận: quay về trang trước (`referer`).
