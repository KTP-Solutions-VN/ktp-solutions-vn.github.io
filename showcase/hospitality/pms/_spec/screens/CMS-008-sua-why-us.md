# CMS-008 — Sửa "Why Us"

**Loại:** Trang đầy đủ

**Route:** `CmsController::whyUsEdit($id)` — mặc định `/cms/why-us-edit/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form chỉnh sửa một mục "Why Us" đã có, cho phép cập nhật tiêu đề, ảnh và bổ sung/chỉnh bản dịch mô tả ngắn theo từng ngôn ngữ. Yêu cầu `id` hợp lệ (nếu `id` rỗng, action không xử lý form/không set dữ liệu).

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text (có giá trị mặc định từ dữ liệu hiện tại) | Có | Không đa ngôn ngữ |
| 2 | Ảnh | `image` | Upload ảnh | Không | Nếu không chọn ảnh mới, giữ nguyên ảnh cũ; tỉ lệ khuyến nghị 3:2, < 1MB |
| 3 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có | Đổi ngôn ngữ sẽ tự đổ lại nội dung `short_text` theo ngôn ngữ đó (qua JS) và cập nhật icon tick báo hoàn thành |
| 4 | Mô tả ngắn | `short_text` | Textarea | Có | Đa ngôn ngữ — merge thêm bản dịch của ngôn ngữ đang chọn vào dữ liệu đã serialize |

Icon tick màu xanh hiển thị khi cả `title`, `image` và `short_text` (theo ngôn ngữ đang chọn) đều có dữ liệu.

## Chức năng/nút thao tác
- **Chọn ngôn ngữ:** đổ lại nội dung `short_text` tương ứng (client-side, không submit).
- **Save:** cập nhật bản ghi `CmsWhyUs`. Thành công → redirect về CMS-006 (`why-us`); thất bại → redirect quay lại chính form này (`why-us-edit/:id`).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-006 (nút "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-006 sau khi Save.
