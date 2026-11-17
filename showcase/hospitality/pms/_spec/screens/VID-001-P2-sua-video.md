# VID-001-P2 — Sửa video

**Loại:** Popup (mở từ VID-001)

**Route:** Modal tĩnh trong `index.ctp` (`#video-edit-modal`); lưu qua `VideosController::edit($id)` — `POST /videos/edit/:id` (multipart/form-data)

**Module:** VID = Video

## Mô tả ngắn gọn
Chỉnh sửa metadata một video đã có trong thư viện, có thể thay thế file video, không đổi được danh mục/property/loại video đã gán ban đầu (Property video), nhưng có thể sửa lại danh sách quốc gia (Country video).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text (tối đa 255 ký tự) | Có | |
| 2 | Mô tả | `description` | Textarea | Không | |
| 3 | Ngôn ngữ | `language_id` | Select | Không | |
| 4 | Giọng điệu (Tone) | `tone` | Segmented control: Factual / Humoristic | Không | |
| 5 | Quốc gia | `country_ids[]` | Checkbox nhiều lựa chọn | Có (nếu Country video) | Chỉ hiện với video loại Country |
| 6 | Thay thế video | `video_file` | Upload file (tùy chọn) | Không | Nếu để trống giữ nguyên file cũ |
| 7 | Ngày | `video_date` | Date picker | Không | |

Các field ẩn giữ nguyên giá trị gốc: `category`, `villa_id`, `video_type`, `duration_seconds`.

## Chức năng/nút thao tác
- **Save changes:** cập nhật bản ghi `Videos`, nếu có upload mới thì lưu file thay thế và xóa file cũ, đồng bộ lại `VideoCountries` nếu là video Country.
- **Cancel:** đóng modal không lưu.

## Điều hướng
- Mở từ: icon Edit trên từng thẻ video (chỉ hiện nếu người dùng có quyền quản lý) tại VID-001.
- Sau khi lưu: đóng modal, làm mới lưới video VID-001.
