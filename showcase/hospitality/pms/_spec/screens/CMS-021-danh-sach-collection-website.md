# CMS-021 — Danh sách Collection Website

**Loại:** Trang đầy đủ

**Route:** `CmsController::collectionWebsites($action, $id)` — mặc định `/cms/collection-websites/:action/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Danh sách các "trang web bộ sưu tập villa" (Collection Website) — các mini-site giới thiệu một bộ sưu tập villa theo chủ đề, mỗi trang có tên hiển thị và URL riêng. Tham số `action`/`id` trên route dùng cho thao tác xóa (`/cms/collection-websites/delete/:id`); khi không truyền tham số, action chỉ hiển thị danh sách.

## Mô tả chi tiết

Danh sách (bảng dữ liệu, nguồn `GuestCollectionWebsite`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Đánh số thứ tự trong danh sách |
| 2 | Website Name | `title` | Tên hiển thị của collection website |
| 3 | Url | `url` | Đường dẫn công khai của trang |
| 4 | Created | `created_at` | Định dạng `d F Y H:i` |
| 5 | Action | — | Các nút Manage / Edit / Delete |

Không có filter/tìm kiếm; toàn bộ bản ghi `GuestCollectionWebsite` được liệt kê.

## Chức năng/nút thao tác
- **Add Collection (nút, đầu trang):** điều hướng tới CMS-022 (`collectionWebsiteEdit`, chế độ Thêm mới, không kèm `id`).
- **Manage (trên từng dòng):** điều hướng tới action `collectionTabs` (CMS-023, quản lý nội dung chi tiết các tab của collection website — không thuộc phạm vi tài liệu này), route dạng `/cms/collection-tabs/i-wish/:id`.
- **Edit (trên từng dòng):** điều hướng tới CMS-022 (`collectionWebsiteEdit`, chế độ Sửa, kèm `id` của bản ghi).
- **Delete (trên từng dòng):** gọi `collectionWebsites('delete', $id)` — xóa bản ghi `GuestCollectionWebsite` tương ứng (`_deleteData`), hiển thị thông báo thành công/lỗi rồi redirect quay lại chính danh sách CMS-021 (không có bước xác nhận riêng ở phía server; giao diện có sẵn 1 modal xác nhận dùng chung nhưng không thấy gắn sự kiện vào nút Delete trong view này).

## Điều hướng
- Vào từ: menu chính (mục Settings, mục "Collections Website").
- Điều hướng đến: CMS-022 (thêm/sửa Collection Website) qua nút Add/Edit; CMS-023 (`collectionTabs`, quản lý nội dung chi tiết) qua nút Manage.
