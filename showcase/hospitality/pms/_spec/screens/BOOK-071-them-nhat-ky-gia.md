# BOOK-071 — Thêm ghi chú giá (New Price Note)

**Loại:** Trang đầy đủ (trang con độc lập — không phải popup/modal)
**Route:** Booking/ratesLogAdd (mặc định: `/booking/rates-log-add`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Form thêm mới một bản ghi nhật ký giá (`VillaRateLog`) ở cấp villa, gồm đơn vị kinh doanh, villa và nội dung ghi chú.

**Lưu ý quan trọng:** action và view này vẫn tồn tại và hoạt động được, nhưng không còn được liên kết (link) từ bất kỳ trang nào trong module — BOOK-070 (`rates_logs.ctp`) hiện dùng popup thêm log ngay trên trang thay vì điều hướng tới trang này. Đây có thể là màn hình cũ (legacy) còn sót lại, chỉ truy cập được qua URL trực tiếp.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Có | Khi đổi sẽ load lại danh sách villa qua ajax `getBusinessUnitVilla` |
| 2 | Villa | `villa` | Select | Có | Rỗng ban đầu, chỉ có dữ liệu sau khi chọn đơn vị kinh doanh |
| 3 | Nội dung (Action) | `action` | Textarea | Có | Ghi chú nội dung thay đổi giá |

## Chức năng/nút thao tác
- **Save** — lưu bản ghi `VillaRateLog` mới (villa_id, business_unit_id, action, action_by = người dùng hiện tại), sau đó chuyển hướng về BOOK-070
- **Reset** — xoá dữ liệu đã nhập trên form

## Điều hướng
- Mở từ: không còn liên kết nào trong UI hiện tại dẫn tới trang này (trước đây có thể mở từ BOOK-070)
- Điều hướng tới: quay lại BOOK-070 sau khi lưu thành công/thất bại
