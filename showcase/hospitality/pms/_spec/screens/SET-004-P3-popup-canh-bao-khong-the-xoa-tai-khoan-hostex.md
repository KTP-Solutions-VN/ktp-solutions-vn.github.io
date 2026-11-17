# SET-004-P3 — Popup cảnh báo không thể xóa tài khoản Hostex

**Loại:** Popup (mở từ SET-004)

**Route:** Modal Bootstrap `#warnModal` trong `hostex_setup.ctp`; xử lý hoàn toàn phía client (JavaScript), không gọi action nào của controller.

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Popup cảnh báo hiển thị khi người dùng bấm Xóa một tài khoản Hostex đang còn liên kết với ít nhất 1 property — chặn không cho xóa để tránh mất liên kết dữ liệu booking/property.

## Mô tả chi tiết

| # | Thành phần | Ghi chú |
|---|---|---|
| 1 | Tiêu đề popup | "Note" |
| 2 | Nội dung cảnh báo | "Cannot delete: {số lượng} properties still use this account." |

## Chức năng/nút thao tác
- **Cancel:** đóng popup, không thực hiện gì (không có nút xác nhận xóa trong popup này).

## Điều hướng
- Mở từ: SET-004 — icon "Xóa" trên dòng tài khoản đang có `props > 0` (thay thế cho SET-004-P2 trong trường hợp này).
- Không điều hướng tiếp; người dùng cần gỡ liên kết property khỏi tài khoản trước khi có thể xóa.
