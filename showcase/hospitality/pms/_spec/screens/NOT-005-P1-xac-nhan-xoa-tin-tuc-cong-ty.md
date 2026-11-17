# NOT-005-P1 — Xác nhận xóa tin tức công ty

**Loại:** Popup (mở từ NOT-005)

**Route:** Modal tĩnh trong `company_news.ctp`; xác nhận gọi `NoticeController::deleteCompanyNews($id)` qua `GET /notice/delete-company-news/:id`

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi xóa một tin tức công ty.

## Mô tả chi tiết
Không có field nhập liệu, chỉ có thông điệp xác nhận.

## Chức năng/nút thao tác
- **Delete:** điều hướng tới `notice/delete-company-news/:id`, xóa bản ghi `CompanyNews`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: NOT-005 (Tin tức công ty).
- Sau khi xác nhận: quay lại NOT-005.
