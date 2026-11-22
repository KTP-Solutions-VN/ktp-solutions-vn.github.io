# CMS-019 — Trình sửa dịch vụ concierge (Concierge Service Editor)

**Loại:** Trang đầy đủ

**Route:** `CmsController::editConcierges($id)` — mặc định `/cms/edit-concierges/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một mục "Concierge" (dịch vụ concierge hiển thị ở trang chủ/mini-website). Mỗi Concierge gồm một tiêu đề (`title`) và một danh sách ảnh minh họa có thể thêm/xóa động, mỗi ảnh có chú thích (`legend`) được nhập/hiển thị theo từng ngôn ngữ đang chọn.

## Mô tả chi tiết

Trường dữ liệu (form):

| # | Tên trường | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | Tiêu đề (Title) | `title` | Text | Bắt buộc. Lưu trực tiếp vào bảng `CmsConcierge` (không theo ngôn ngữ). |
| 2 | Ngôn ngữ (Language) | `language` | Dropdown | Danh sách lấy từ bảng `Language` (`language_code` → `name`), mặc định `en`. Đổi ngôn ngữ sẽ đổ lại nội dung chú thích ảnh (`legend`) tương ứng ngôn ngữ đó bằng JS, không load lại trang. |
| 3 | Ảnh (Image) — lặp lại nhiều dòng | `image[]` | File upload | Mỗi dòng ảnh có 1 ô chọn file (giới hạn < 1MB, tỉ lệ 3:2). Ảnh cũ hiển thị thumbnail, click vào thumbnail để mở lại ô chọn file thay ảnh. |
| 4 | Chú thích ảnh (Legend) — theo từng dòng ảnh | `legend[]` | Text | Bắt buộc. Lưu dạng `serialize()` theo mảng `[language_code => text]` trong cột `legend` của `CmsImage`; chỉ hiển thị/sửa được giá trị của ngôn ngữ đang chọn ở dropdown. |
| 5 | (ẩn) ID ảnh | `id[]` | Hidden | ID của từng bản ghi `CmsImage` đã tồn tại, dùng để đối chiếu khi lưu/xóa. |

Khi có `id` (chế độ Sửa): tải `CmsConcierge` theo `id`, và tải toàn bộ ảnh liên quan từ `CmsImage` với điều kiện `tag = 'Concierge'`, `villa_id = <id của Concierge>` (trường `villa_id` được dùng lại để lưu ID cha), sắp xếp theo `sort` tăng dần. Cột `legend` của mỗi ảnh được `unserialize()` để lấy mảng chú thích theo ngôn ngữ.

Khi không có `id` (chế độ Thêm mới): form trống, không có ảnh nào sẵn có; các dòng ảnh được thêm bằng nút "Add More".

## Chức năng/nút thao tác
- **Add More:** thêm động một dòng ảnh + ô chú thích mới vào form (JS, không gọi server).
- **Nút xóa dòng ảnh (icon dấu trừ):** xóa dòng ảnh khỏi form (chỉ dòng thứ 2 trở đi mới có nút xóa; dòng ảnh đầu tiên không thể xóa). Chỉ xóa trên giao diện — ảnh thực sự bị xóa khỏi CSDL khi bấm Save, nếu `id` của ảnh đó không còn nằm trong danh sách `id[]` gửi lên.
- **Đổi Language (dropdown):** đổ lại nội dung ô "Legend" của từng ảnh theo ngôn ngữ mới chọn (dựa vào mảng `legend` đã tải sẵn ở client, JS thuần, không gọi server).
- **Save:**
  - Chế độ Thêm mới: tạo mới bản ghi `CmsConcierge` với `title`; với mỗi ảnh có file upload, upload ảnh (thư mục `villas`) rồi tạo bản ghi `CmsImage` (`tag = 'Concierge'`, `villa_id = <id Concierge vừa tạo>`, `sort` theo thứ tự dòng, `legend` = serialize mảng chỉ có ngôn ngữ hiện tại). Ảnh không chọn file thì lưu `image = ''`.
  - Chế độ Sửa: cập nhật `title` của `CmsConcierge`; với các ảnh cũ không còn trong danh sách `id[]` gửi lên → xóa bản ghi `CmsImage` tương ứng; với ảnh có upload file mới → upload thay ảnh và merge thêm ngôn ngữ hiện tại vào mảng `legend` cũ rồi serialize lại; với ảnh không đổi file → chỉ cập nhật `legend` (merge thêm ngôn ngữ hiện tại); với dòng ảnh mới hoàn toàn (chưa có `id` cũ) → tạo bản ghi `CmsImage` mới tương tự chế độ Thêm mới.
  - Lưu thành công → thông báo thành công, quay về danh sách Concierge (CMS-018, action `concierges`).
  - Lưu lỗi → thông báo lỗi, ở lại trang (chế độ Sửa quay lại chính `editConcierges/:id`; chế độ Thêm mới quay lại `editConcierges` trống).
- **Reset:** đưa form về trạng thái mặc định (HTML reset, không gọi server).

## Điều hướng
- Vào từ: CMS-018 (Trưng bày concierge, action `concierges`) — nút "Add New" (thêm mới, không kèm `id`) hoặc link "Edit" trên từng dòng (kèm `id`).
- Điều hướng đến: sau khi Save (thành công hoặc lỗi) đều quay lại CMS-018 (Trưng bày concierge, action `concierges`), trừ trường hợp lỗi ở chế độ Sửa/Thêm thì có thể ở lại chính màn hình CMS-019.
