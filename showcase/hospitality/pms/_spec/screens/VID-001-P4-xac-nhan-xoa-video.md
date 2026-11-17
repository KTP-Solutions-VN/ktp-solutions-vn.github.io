# VID-001-P4 — Xác nhận xóa video

**Loại:** Popup (mở từ VID-001)

**Route:** Modal tĩnh trong `index.ctp` (`#video-confirm-modal`); xác nhận gọi AJAX `VideosController::delete($id)` — `POST /videos/delete/:id`

**Module:** VID = Video

## Mô tả ngắn gọn
Hộp thoại xác nhận dùng chung trước khi xóa vĩnh viễn một video khỏi thư viện (bao gồm xóa file vật lý và các gán Guest Portal/quốc gia liên quan).

## Mô tả chi tiết
Không có field nhập liệu, chỉ hiển thị tên video sắp xóa và thông điệp xác nhận.

## Chức năng/nút thao tác
- **Delete:** gửi AJAX xóa video, xóa file vật lý trên server, xóa các bản ghi `VideoCountries`/`VillaGuestPortalVideos` liên quan, cập nhật lại lưới video trên VID-001.
- **Cancel:** đóng modal không thực hiện.

## Điều hướng
- Mở từ: icon Delete trên từng thẻ video tại VID-001.
- Sau khi xác nhận: đóng modal, làm mới lưới video VID-001.
