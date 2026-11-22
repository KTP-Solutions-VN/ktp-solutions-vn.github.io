# VID-001-P3 — Trình phát video (Video Guide Player)

**Loại:** Popup (mở từ VID-001)

**Route:** Modal tĩnh trong `index.ctp` (`#video-player-modal`); nội dung phát qua `VideosController::play($id)` — `GET /videos/play/:id` (stream file, có kiểm tra quyền truy cập theo scope BU/quốc gia)

**Module:** VID = Video hướng dẫn

## Mô tả ngắn gọn
Popup phát trực tiếp video đã chọn (HTML5 video player) mà không cần rời khỏi trang danh sách.

## Mô tả chi tiết
Không có field nhập liệu; chỉ hiển thị tiêu đề video và trình phát video HTML5 (controls mặc định của trình duyệt).

## Chức năng/nút thao tác
- **Play/Pause/Seek:** điều khiển phát video (chức năng gốc của thẻ `<video>`).
- **Đóng (x):** đóng modal, dừng phát.

## Điều hướng
- Mở từ: nút Play trên từng thẻ video tại VID-001.
- Đóng lại: quay về VID-001.
