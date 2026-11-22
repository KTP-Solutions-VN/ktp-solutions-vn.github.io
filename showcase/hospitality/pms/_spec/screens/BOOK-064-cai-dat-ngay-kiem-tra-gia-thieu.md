# BOOK-064 — Ngưỡng cảnh báo chưa có giá (Unpriced Alert Threshold)

**Loại:** Popup/Trang (mở từ BOOK-027)
**Route:** Booking/missingRateSetting (mặc định: `/booking/missing-rate-setting`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Cấu hình ngày kết thúc (end date) dùng làm mốc để màn hình "Tài sản chưa có giá" (BOOK-027) kiểm tra villa đã thiết lập đủ giá hàng ngày hay chưa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày | `date` | Date picker | Có | Mốc ngày dùng để tính khoảng kiểm tra giá thiếu (từ hôm nay đến ngày này) |

## Chức năng/nút thao tác
- Nút **Save** — lưu ngày cấu hình

## Điều hướng
- Mở từ: BOOK-027 (Tài sản chưa có giá) > nút cấu hình
- Điều hướng tới: quay lại BOOK-027
