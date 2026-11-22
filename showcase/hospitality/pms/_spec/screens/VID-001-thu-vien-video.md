# VID-001 — Video hướng dẫn (Video Guides)

**Loại:** Trang đầy đủ

**Route:** `VideosController::index()` — mặc định `/videos`

**Module:** VID = Video hướng dẫn

## Mô tả ngắn gọn
Trang quản lý toàn bộ video phục vụ nghiệp vụ (video hướng dẫn theo property hoặc theo quốc gia), hiển thị dạng lưới thẻ (card) với preview, có thể lọc theo tab, đơn vị kinh doanh/property hoặc quốc gia, loại video, và đánh dấu video hiển thị trên Guest Hub.

## Mô tả chi tiết

Bộ lọc & tab:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tab | `category` | Tab: Property videos / Country videos | — | Đổi tab đổi luôn bộ lọc bên dưới |
| 2 | Đơn vị kinh doanh | `video-bu-filter` | Select | Không | Chỉ hiện ở tab Property |
| 3 | Property | `video-property-filter` | Select (phụ thuộc BU) | Không | Chỉ hiện ở tab Property |
| 4 | Quốc gia | `video-country-filter` | Select | Không | Chỉ hiện ở tab Country |
| 5 | Loại video | `video-type-chips` | Chip lựa chọn nhiều (Discover the villa/Arrival/Departure/Equipment/Troubleshooting hoặc Marketing/Rules/Local Guide/Training) | Không | Danh mục khác nhau theo tab |
| 6 | Tìm kiếm | `video-search-input` | Text search | Không | Tìm theo tiêu đề/mô tả |

Thông tin hiển thị trên mỗi thẻ video: preview, ngôn ngữ, thời lượng, loại video, tiêu đề, mô tả, property/quốc gia áp dụng, tone (Factual/Humoristic), trạng thái Guest Hub, tác giả & ngày, các nút Download/Edit/Delete (Edit/Delete chỉ hiện nếu `can_manage`).

## Chức năng/nút thao tác
- **New video:** mở popup VID-001-P1 (Thêm video).
- **Edit (icon bút):** mở popup VID-001-P2 (Sửa video hướng dẫn) với dữ liệu video tương ứng.
- **Delete (icon thùng rác):** mở popup VID-001-P4 xác nhận xóa.
- **Play (icon play trên thẻ):** mở popup VID-001-P3 (Trình phát video) phát video trực tiếp trong modal (stream qua action `play`).
- **Download:** tải file video (action `download`, không có view).
- **Guest Hub toggle (chỉ video Property):** bật/tắt trực tiếp video đại diện Guest Hub cho property đó qua AJAX `toggleGuestPortal` (mỗi property chỉ có 1 video Guest Hub).

## Điều hướng
- Vào từ: menu Web & Media → Video Guides.
- Điều hướng đến: VID-001-P1 (Thêm), VID-001-P2 (Sửa), VID-001-P3 (Xem), VID-001-P4 (Xác nhận xóa).
