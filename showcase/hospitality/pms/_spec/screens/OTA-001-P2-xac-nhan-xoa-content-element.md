# OTA-001-P2 — Xác nhận gỡ thành phần (Confirm Element Removal)

**Loại:** Popup (mở từ OTA-001)

**Route:** Modal tĩnh trong `listing.ctp`; xác nhận gọi AJAX `OtaContentController::removeAssignment()` — `POST /ota-content/remove-assignment`

**Module:** OTA = Nội dung kênh

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi gỡ bỏ một Content Element khỏi phần listing của OTA hiện tại (không xóa Content Element khỏi hệ thống, chỉ bỏ gán).

## Mô tả chi tiết
Không có field nhập liệu, chỉ hiển thị tên phần tử sắp gỡ và thông điệp xác nhận.

## Chức năng/nút thao tác
- **Delete/Xác nhận:** gửi AJAX `removeAssignment` với `platform_id` và `element_id`, đặt `is_assigned = false`, cập nhật lại bảng trên OTA-001.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: icon xóa trên từng dòng trong bảng của OTA-001.
- Sau khi xác nhận: đóng modal, cập nhật lại OTA-001.
