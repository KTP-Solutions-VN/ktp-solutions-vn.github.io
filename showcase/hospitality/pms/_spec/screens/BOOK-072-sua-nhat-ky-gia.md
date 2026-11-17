# BOOK-072 — Sửa nhật ký giá (trang riêng)

**Loại:** Trang đầy đủ (trang con độc lập — không phải popup/modal)
**Route:** Booking/ratesLogEdit/:id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định, ví dụ `/booking/rates-log-edit/12`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form chỉnh sửa một bản ghi nhật ký giá (`VillaRateLog`) theo `id` truyền trên URL, gồm đơn vị kinh doanh, villa và nội dung ghi chú.

**Lưu ý quan trọng:** tương tự BOOK-071, action và view này vẫn hoạt động được nhưng không còn được liên kết từ BOOK-070 trong giao diện hiện tại (BOOK-070 dùng popup sửa log ngay trên trang). Có thể là màn hình cũ (legacy) còn sót lại, chỉ truy cập được qua URL trực tiếp kèm `id` hợp lệ.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Có | Giá trị mặc định lấy theo `business_unit_id` của bản ghi đang sửa |
| 2 | Villa | `villa` | Select | Có | Giá trị mặc định lấy theo `villa_id` của bản ghi đang sửa; danh sách villa lấy theo phạm vi phân quyền người dùng |
| 3 | Nội dung (Action) | `action` | Textarea | Có | Prefill nội dung ghi chú hiện có |

## Chức năng/nút thao tác
- **Save** — cập nhật bản ghi `VillaRateLog` (id, villa_id, business_unit_id, action, action_by = người dùng hiện tại), sau đó chuyển hướng về BOOK-070
- **Reset** — khôi phục lại giá trị ban đầu trên form

## Điều hướng
- Mở từ: không còn liên kết nào trong UI hiện tại dẫn tới trang này (trước đây có thể mở từ BOOK-070, cần `id` bản ghi)
- Điều hướng tới: quay lại BOOK-070 sau khi lưu thành công/thất bại
