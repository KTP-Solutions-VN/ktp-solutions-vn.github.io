# CMS-007 — Thêm lợi ích đặt trực tiếp (New Book-Direct Benefit)

**Loại:** Trang đầy đủ

**Route:** `CmsController::whyUsAdd()` — mặc định `/cms/why-us-add`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Form thêm mới một mục "Why Us" gồm tiêu đề, ảnh minh hoạ và đoạn mô tả ngắn đa ngôn ngữ.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text | Có | Không đa ngôn ngữ |
| 2 | Ảnh | `image` | Upload ảnh | Có | Tỉ lệ khuyến nghị 3:2, < 1MB |
| 3 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có | Chọn ngôn ngữ cho nội dung `short_text` sắp nhập |
| 4 | Mô tả ngắn | `short_text` | Textarea | Có | Đa ngôn ngữ — lưu dạng `serialize([lang => text])` |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi mới `CmsWhyUs`. Thành công → redirect về CMS-006 (`why-us`); thất bại → redirect quay lại chính form này (`why-us-add`).
- **Reset:** reset form về giá trị mặc định (client-side).

## Điều hướng
- Vào từ: CMS-006 (nút "Thêm mới").
- Điều hướng đến: quay lại CMS-006 sau khi Save.
