# OPR-007 — Danh sách dọn dẹp (Cleaning)

**Loại:** Trang đầy đủ
**Route:** operator/cleaning + route đẹp dạng dashed: operator/cleaning
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình cho nhân viên dọn dẹp (housekeeper) chọn đơn vị kinh doanh và villa để bắt đầu một lượt dọn dẹp (cleaning). Sau khi bấm Start, hệ thống tạo bản ghi `Cleaning` và điều hướng sang OPR-008 (thực hiện dọn dẹp theo từng điểm kiểm tra).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | Mặc định theo cookie/quyền user |
| 2 | Villa | `villa_id` | Select2 (nạp qua ajax theo BU) | Có | |
| 3 | Danh sách lượt dọn dẹp trước đó | — | Bảng (DataTable, dữ liệu ajax) | — | Villa, ngày, trạng thái, thao tác Xem/Tiếp tục |

## Chức năng/nút thao tác
- **Start**: tạo bản ghi `Cleaning` mới (key `cleaning_key`), điều hướng tới `operator/cleaningDetails?id=<cleaning_key>`.
- Đổi **Đơn vị kinh doanh**: nạp lại danh sách villa tương ứng.
- Bảng danh sách: xem/tiếp tục một lượt dọn dẹp dở dang bằng cách điều hướng `operator/cleaningDetails?id=` tương ứng.

## Điều hướng
- Vào từ: menu "Cleaning" trong sidebar.
- Đi tới: OPR-008 — Thực hiện dọn dẹp theo điểm kiểm tra.
