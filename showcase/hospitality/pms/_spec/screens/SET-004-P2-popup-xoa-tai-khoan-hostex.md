# SET-004-P2 — Popup Xóa tài khoản Hostex

**Loại:** Popup (mở từ SET-004)

**Route:** Modal Bootstrap `#exampleModal` trong `hostex_setup.ctp`; xác nhận gửi AJAX POST tới `deleteHostexAccount()` — `/setting/delete-hostex-account`.

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa một tài khoản Hostex, chỉ hiển thị khi tài khoản đó chưa liên kết với property nào (`props = 0`); nếu còn liên kết property, hệ thống sẽ hiện SET-004-P3 thay vì popup này.

## Mô tả chi tiết

| # | Thành phần | Ghi chú |
|---|---|---|
| 1 | Tiêu đề popup | "Delete Account: {email}" |
| 2 | Nội dung xác nhận | Thông báo xác nhận xóa tài khoản |

## Chức năng/nút thao tác
- **Delete:** gửi AJAX POST `deleteHostexAccount` (kèm `id`) → xóa bản ghi `HostexAccount`, ghi log hoạt động, hiện Flash message, reload trang khi thành công.
- **Cancel:** đóng modal, không thực hiện gì.

## Điều hướng
- Mở từ: SET-004 — icon "Xóa" trên dòng tài khoản không có property liên kết.
- Sau khi xóa: reload lại SET-004, dòng tài khoản đã xóa biến mất khỏi bảng kênh tương ứng.
