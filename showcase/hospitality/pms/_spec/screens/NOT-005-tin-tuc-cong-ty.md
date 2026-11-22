# NOT-005 — Bản tin nội bộ (Newsroom)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::companyNews()` — mặc định `/notice/company-news`

**Module:** NOT = Thông báo nội bộ

## Mô tả ngắn gọn
Danh sách tin tức nội bộ công ty đã đăng, được lọc theo đơn vị kinh doanh (business unit) mà người dùng hiện tại thuộc về.

## Mô tả chi tiết

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày đăng | `created_at` | Định dạng d M y |
| 2 | Người đăng | `senders` | Tên người tạo (`created_by`) |
| 3 | Đơn vị kinh doanh | `business_units` | Danh sách tên BU, join bằng dấu phẩy; nếu tin không giới hạn BU thì hiển thị mọi user thấy được |
| 4 | Tiêu đề | `title` | |
| 5 | Thao tác | — | Tải file đính kèm, Xóa (nếu là người tạo hoặc Superadmin/Admin) |

Không có filter tìm kiếm riêng ngoài phân trang DataTable mặc định.

## Chức năng/nút thao tác
- **Add new:** mở NOT-006 (Thêm bài bản tin) — chỉ hiện với Superadmin/Admin/Business Unit Manager hoặc Team Leader thuộc phòng Content/Marketing.
- **Download:** tải file đính kèm (PDF) từ thư mục `company-news-attachment`.
- **Delete:** mở popup xác nhận NOT-005-P1, sau đó gọi `notice/delete-company-news/:id`.

## Điều hướng
- Vào từ: menu chính (Newsroom) hoặc từ NOT-002.
- Điều hướng đến: NOT-006 (Thêm mới), NOT-005-P1 (xác nhận xóa).
