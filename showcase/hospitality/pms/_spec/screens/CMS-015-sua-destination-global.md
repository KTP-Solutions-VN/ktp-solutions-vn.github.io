# CMS-015 — Sửa nội dung Destination Global

**Loại:** Trang đầy đủ

**Route:** `CmsController::destinationGlobalEdit($district_id)` — mặc định `/cms/destination-global-edit/:district_id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form chỉnh nội dung giới thiệu điểm đến (`district_id`) trong phạm vi Guest Collection (website tổng hợp). Dữ liệu lưu ở model `GuestCollectionDestination` — 1 bản ghi/1 district, gồm tiêu đề (heading), ảnh và đoạn mô tả đa ngôn ngữ. Yêu cầu `district_id` hợp lệ.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tiêu đề | `title` | Text, `readonly` | — | Hiển thị tên District, không cho sửa (`$title = $district['name']`) |
| 2 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có | Đổi ngôn ngữ sẽ đổ lại nội dung `text` theo ngôn ngữ đó (qua JS) |
| 3 | Heading | `heading` | Text | Có | Không đa ngôn ngữ |
| 4 | Nội dung mô tả | `text` | Textarea | Có | Đa ngôn ngữ — `serialize([lang => text])` |
| 5 | Ảnh | `image` | Upload ảnh | Không | Tỉ lệ khuyến nghị 3:1, < 1MB. **Lưu ý:** ở luồng cập nhật bản ghi đã tồn tại, code luôn lấy lại ảnh cũ (`$image = $data_array['image']`) sau khi upload, nên việc đổi ảnh khi Edit trên bản ghi đã có thực chất không được lưu (chỉ áp dụng khi tạo mới) |

## Chức năng/nút thao tác
- **Chọn ngôn ngữ:** đổ lại nội dung `text` tương ứng (client-side).
- **Save:** lưu/cập nhật bản ghi `GuestCollectionDestination` theo `district_id`. Thành công → redirect về CMS-014 (`destinationGlobal`); thất bại → redirect quay lại chính form này (`destinationGlobalEdit/:district_id`).
- **Reset:** reset form (client-side).

## Điều hướng
- Vào từ: CMS-014 (nút "Edit" trên từng dòng District).
- Điều hướng đến: quay lại CMS-014 sau khi Save.
