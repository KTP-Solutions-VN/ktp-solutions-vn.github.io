# BOOK-003 — Danh sách khách hàng
**Loại:** Trang đầy đủ
**Route:** Booking/customerList (mặc định: `/booking/customer-list`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Màn hình dự kiến hiển thị danh sách khách hàng (customer) trong hệ thống. Tại thời điểm khảo sát mã nguồn, tính năng CHƯA được triển khai: controller `customerList()` chỉ set tiêu đề trang và active menu, view chỉ hiển thị thông báo tạm "Exciting new feature available soon." — không có bảng dữ liệu, không có field, không có bộ lọc.

## Mô tả chi tiết
Không có field/cột dữ liệu nào được cài đặt. Nội dung hiện tại của trang chỉ gồm:
- Tiêu đề breadcrumb: Trang chủ > Thông tin trước khi đến (Pre-arrival Information) > Danh sách khách hàng (Customer List)
- Thông báo: "Exciting new feature available soon." (Tính năng hấp dẫn sắp ra mắt)

## Chức năng/nút thao tác
- Không có nút thao tác nào được cài đặt (tính năng chưa phát triển).

## Điều hướng
- Mở từ: Menu module Đặt phòng (mục "Customer List")
- Điều hướng tới: không có
- Popup con: không có

## Ghi chú
Đây là màn hình placeholder/chưa phát triển (coming soon). Cần làm rõ với BA/khách hàng về phạm vi thực tế mong muốn (danh sách khách hàng dự kiến sẽ lấy dữ liệu từ bảng Guest liên kết Booking) trước khi đặc tả chi tiết field.
