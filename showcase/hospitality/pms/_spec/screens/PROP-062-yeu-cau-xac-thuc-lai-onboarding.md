# PROP-062 — Xác thực lại hồ sơ tiếp nhận (Intake Revalidation)

**Loại:** Trang đầy đủ
**Route:** property/edit-on-boarding/:id, mở từ PROP-020 (Tiếp nhận tài sản)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang xem lại chi tiết dữ liệu Onboarding đã nhập (Property/Unit) theo dạng bảng Field/Entry/Prepared by/Validated by, cho phép chọn người xác thực (Validator) khác và gửi lại yêu cầu xác thực (tạo thông báo `NoticeBoard` mới) cho bản ghi Villa Onboarding.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Validator | `validator_id` | Hidden/Select (chọn qua UI) | Có | Người được gửi yêu cầu xác thực mới |
| 2 | Bảng dữ liệu Field/Entry | `data[<field>]` | Text (hiển thị, có thể sửa) | Không | Mỗi dòng: tên field, giá trị đã nhập, người nhập + ngày, người xác thực + ngày (readonly nếu đã xác thực) |
| 3 | Number of Unit | `number_of_unit` | Hidden | — | Số lượng Unit (nếu Property có nhiều unit) |

## Chức năng/nút thao tác
- Nút "Save"/"Send" — submit form, tạo bản ghi `NoticeBoard` + `NoticeBoardDetail` gửi yêu cầu xác thực tới Validator đã chọn (deadline mặc định +5 ngày), hiện Flash message rồi redirect về PROP-020 (Tiếp nhận tài sản).
- Xác thực từng field riêng lẻ (AJAX `validateOnBoarding`) — đánh dấu field đã được duyệt bởi user hiện tại; khi tất cả field đã duyệt, trạng thái bản ghi Onboarding chuyển thành "completed".

## Điều hướng
- Mở từ: PROP-020 (Tiếp nhận tài sản).
- Điều hướng tới: PROP-020 (Tiếp nhận tài sản) sau khi lưu.
- Popup con: Không có.
