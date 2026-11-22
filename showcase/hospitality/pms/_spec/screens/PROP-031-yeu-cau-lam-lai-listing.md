# PROP-031 — Yêu cầu làm mới listing (Listing Refresh Request)

**Loại:** Trang đầy đủ
**Route:** property/redo/:villa_id/:chanel_id
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Form gửi yêu cầu "làm lại" (redo) một listing OTA của Property tới một nhân viên phụ trách, kèm hạn chót (deadline). Khi gửi, hệ thống tạo bản ghi `VillaCoefficient` (type `redo_list`) và một `NoticeBoard` (thông báo công việc) gán cho người nhận.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Redo (tên Property, chỉ hiển thị) | — | Text | — | Hiển thị `villa.name` |
| 2 | Send to (người nhận) | `user_id` | Select2 (danh sách User đủ điều kiện — Superadmin, Admin cùng BU, Employee/Team Leader có role_id=2 cùng BU) | Có (class `required`) | |
| 3 | Deadline | `deadline` | Text (datepicker, readonly, không cho chọn hôm nay trở về trước) | Có | |

## Chức năng/nút thao tác
- Nút "Save" — submit form: tạo `VillaCoefficient` (type=`redo_list`, trạng thái `redo_action=pending`, lưu JSON `requested_by/requested_date/requested_to`), tạo `NoticeBoard` (status=pending, nội dung "Request to redo {villa} on {channel} ...") và `NoticeBoardDetail`; sau đó redirect về PROP-030 (Quality) kèm query để mở đúng Property/kênh vừa redo.
- Nút "Cancel" — quay lại PROP-030 (Quality) với đúng context Property đang thao tác (không lưu gì).

## Điều hướng
- Mở từ: PROP-030 (Quality) — nút "Redo" ở mỗi kênh OTA khi listing ở trạng thái cần làm lại lần đầu.
- Điều hướng tới: PROP-030 (`Property::quality`) sau khi lưu hoặc khi Cancel, kèm `message` (success/fail) hiển thị dạng banner trên PROP-030.
- Popup con: Không có (đây là trang riêng, không phải modal).
