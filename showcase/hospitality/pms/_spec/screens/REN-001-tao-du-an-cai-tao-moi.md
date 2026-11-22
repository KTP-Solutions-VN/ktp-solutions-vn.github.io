# REN-001 — Tạo dự án nâng cấp (New Refurbishment Project)

**Loại:** Trang đầy đủ
**Route:** renovation/new-project
**Module:** REN = Nâng cấp tài sản

## Mô tả ngắn gọn
Màn hình tạo mới một dự án cải tạo (renovation project) cho một villa: chọn đơn vị kinh doanh (business unit) và villa, nhập thông tin dự án (tiêu đề, ngày bắt đầu/kết thúc dự kiến) và khai báo danh sách hạng mục cải tạo cùng ngân sách dự kiến cho từng hạng mục.

## Mô tả chi tiết

Form tạo dự án (action `newProject`, POST về chính route này):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 (danh sách business unit theo quyền user) | Không | Mặc định lấy theo business unit đang chọn (cookie); khi đổi sẽ gọi ajax `/VM/common/getBusinessUnitVilla` để nạp lại danh sách villa tương ứng |
| 2 | Villa | `villa_id` | Select2 (danh sách villa thuộc BU, status = Open) | Có | Khi đổi villa sẽ gọi ajax `getNewProjectData` kiểm tra villa đã có dự án cải tạo chưa (nếu có và chưa Completed thì hiển thị cảnh báo kèm liên kết tới màn hình theo dõi dự án REN-003) |
| 3 | Tên trưởng dự án | `leader_name` | Text, readonly | — | Hiển thị tên user đang đăng nhập, chỉ để tham khảo; hệ thống tự gán `leader_id` = user hiện tại khi lưu |
| 4 | Tiêu đề dự án | `title` | Text | Có | |
| 5 | Ngày bắt đầu (dự kiến) | `start_date` | Datepicker (dd-mm-yyyy) | Có | Mặc định là ngày hiện tại |
| 6 | Ngày hoàn thành (dự kiến) | `end_date` | Datepicker (dd-mm-yyyy) | Có | Mặc định = start_date + 1 ngày; không cho chọn trước ngày bắt đầu |
| 7 | Hạng mục | `item[]` | Text (nhiều dòng, thêm động) | Có | Không được trùng tên hạng mục giữa các dòng (kiểm tra JS) |
| 8 | Ngân sách hạng mục | `budget[]` | Text số (định dạng có dấu phẩy ngăn cách) | Có | Ứng với từng dòng `item[]` |
| 9 | Tổng ngân sách | `total` | Text, readonly | — | Tự tính tổng các `budget[]` |

## Chức năng/nút thao tác
- **Create**: submit form, lưu bản ghi `Renovation` + các `RenovationItem` (item/budget), sau đó chuyển hướng tới màn hình Theo dõi nâng cấp (REN-002).
- **Thêm hạng mục mới (add-more)**: thêm một dòng `item[]`/`budget[]` mới vào bảng hạng mục.
- Đổi **Đơn vị kinh doanh**: nạp lại danh sách villa tương ứng qua ajax.
- Đổi **Villa**: kiểm tra villa đã có dự án cải tạo hay chưa qua ajax `getNewProjectData`.

## Điều hướng
- Vào từ: nút "+ Tạo dự án mới" trên màn hình Theo dõi nâng cấp (REN-002).
- Đi tới: sau khi lưu thành công, chuyển tới REN-002 (Theo dõi nâng cấp); nếu villa đã có dự án dở dang, có liên kết nhanh sang REN-003 (Tiến trình dự án).
