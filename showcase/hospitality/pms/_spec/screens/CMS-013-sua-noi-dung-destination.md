# CMS-013 — Trình sửa cẩm nang điểm đến (Destination Guide Editor)

**Loại:** Trang đầy đủ

**Route:** `CmsController::destinationEdit($district_id)` — mặc định `/cms/destination-edit/:district_id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Form quản lý bộ ảnh (gallery) giới thiệu cho một điểm đến (`district_id`), mỗi ảnh có chú thích (legend) đa ngôn ngữ. Dữ liệu lưu ở model `CmsDestination` (thông tin điểm đến) và `CmsImage` (tag = `Destination`) cho từng ảnh trong gallery. Yêu cầu `district_id` hợp lệ — nếu rỗng, action không set biến/không render nội dung form.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text, `readonly` | — | Chỉ hiển thị, không cho sửa |
| 2 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có | Đổi ngôn ngữ sẽ đổ lại toàn bộ chú thích (`legend`) của các ảnh theo ngôn ngữ đó (qua JS) |
| 3 | Ảnh (lặp lại nhiều dòng) | `image[]` | Upload ảnh (nhiều dòng, "Add More"/"Remove") | Có ở dòng đầu | Tỉ lệ khuyến nghị 3:2, < 1MB/ảnh |
| 4 | Chú thích ảnh (lặp lại theo từng ảnh) | `legend.` (mảng theo vị trí ảnh) | Text | Có ở dòng đầu | Đa ngôn ngữ — mỗi ảnh có `legend` riêng dạng `serialize([lang => text])` |
| 5 | ID ảnh ẩn (khi sửa) | `id[]` | Hidden | — | Dùng để xác định ảnh nào giữ lại/xoá khi submit |

Gallery ảnh được nạp sẵn từ `CmsImage` (điều kiện `tag = 'Destination'`, `villa_id = <id của bản ghi CmsDestination>`), sắp xếp theo `sort`.

## Chức năng/nút thao tác
- **Add More:** thêm 1 dòng ảnh + chú thích mới vào form (client-side, chưa lưu DB).
- **Remove (icon dấu trừ):** xoá 1 dòng ảnh khỏi form hiện tại (client-side; nếu ảnh đã tồn tại trong DB và bị bỏ khỏi danh sách `id[]` khi submit, sẽ bị xoá khỏi `CmsImage` khi Save).
- **Chọn ngôn ngữ:** đổ lại các ô chú thích (`legend-N`) theo ngôn ngữ đã chọn (client-side).
- **Save:** với mỗi dòng ảnh — nếu ảnh nằm trong danh sách `id[]` gửi lên thì cập nhật (upload ảnh mới nếu có chọn file, luôn cập nhật `legend` theo ngôn ngữ đang chọn); ảnh cũ không còn trong `id[]` bị xoá khỏi `CmsImage`; dòng ảnh mới (chưa có `id`) sẽ được tạo mới. Thành công → redirect về CMS-012 (`destination`); thất bại → redirect quay lại chính form này (`destinationEdit/:district_id`).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-012 (nút "Edit" trên từng dòng District).
- Điều hướng đến: quay lại CMS-012 sau khi Save.
