# VID-001-P1 — Thêm video mới

**Loại:** Popup (mở từ VID-001)

**Route:** Modal tĩnh trong `index.ctp` (`#video-add-modal`); lưu qua `VideosController::add()` — `POST /videos/add` (multipart/form-data)

**Module:** VID = Video

## Mô tả ngắn gọn
Form tải lên một video mới vào thư viện, gắn cho một property cụ thể hoặc cho một/nhiều quốc gia, kèm phân loại và metadata mô tả.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Danh mục | `category` | Segmented control: Property video / Country video | Có | |
| 2 | Đơn vị kinh doanh | (chọn để lọc property) | Select | Có (nếu Property) | Không gửi trực tiếp lên server |
| 3 | Property | `villa_id` | Select (phụ thuộc BU) | Có (nếu Property) | |
| 4 | Quốc gia | `country_ids[]` | Checkbox nhiều lựa chọn | Có (nếu Country, tối thiểu 1) | |
| 5 | Loại video | `video_type` | Chọn 1 trong danh sách pill (khác nhau theo danh mục) | Có | Property: Discover the villa/Arrival/Departure/Equipment/Troubleshooting; Country: Marketing/Rules/Local Guide/Training |
| 6 | Video Guest Portal | `guest_portal` | Checkbox | Không | Chỉ áp dụng Property; mỗi property chỉ 1 video, bật video mới sẽ thay video cũ |
| 7 | File video | `video_file` | Upload file (kéo-thả hoặc chọn) | Có | Định dạng MP4/MOV/WEBM, tối đa 500MB |
| 8 | Tiêu đề | `title` | Text (tối đa 255 ký tự) | Có | |
| 9 | Mô tả | `description` | Textarea | Không | |
| 10 | Ngôn ngữ | `language_id` | Select | Không | |
| 11 | Giọng điệu (Tone) | `tone` | Segmented control: Factual / Humoristic | Không | Mặc định Factual |
| 12 | Ngày | `video_date` | Date picker | Không | Mặc định ngày hiện tại |

## Chức năng/nút thao tác
- **Add to library:** upload file vào `webroot/files/videos/{id}`, lưu bản ghi `Videos`, đồng bộ gán quốc gia (`VideoCountries`) hoặc gán Guest Portal (`VillaGuestPortalVideos`), cập nhật lại lưới video trên VID-001.
- **Cancel:** đóng modal không lưu.

## Điều hướng
- Mở từ: nút "New video" trên VID-001.
- Sau khi lưu: đóng modal, làm mới lưới video VID-001.
