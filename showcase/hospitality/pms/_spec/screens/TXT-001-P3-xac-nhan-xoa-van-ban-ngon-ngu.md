# TXT-001-P3 — Xác nhận xóa mô tả (Confirm Description Deletion)

**Loại:** Popup (mở từ TXT-001)

**Route:** Modal tĩnh dùng chung trong `index.ctp` (`#texts-delete-modal`); xác nhận gọi AJAX `TextsController::deleteText()` (`POST /texts/delete-text`) hoặc `TextsController::deleteLanguage()` (`POST /texts/delete-language`) tùy ngữ cảnh mở popup.

**Module:** TXT = Kho mô tả

## Mô tả ngắn gọn
Hộp thoại xác nhận dùng chung cho hai thao tác xóa: xóa một văn bản dùng lại (Shared/Profile) hoặc gỡ một ngôn ngữ khỏi quốc gia (chỉ khi ngôn ngữ đó chưa được sử dụng).

## Mô tả chi tiết
Không có field nhập liệu; nội dung thông điệp và cảnh báo (ví dụ liệt kê các nơi đang gán văn bản) được sinh động bằng JS tùy ngữ cảnh.

## Chức năng/nút thao tác
- **Delete:** gửi AJAX tương ứng (`deleteText` hoặc `deleteLanguage`), cập nhật lại danh sách trên TXT-001.
- **Cancel:** đóng modal không thực hiện.

## Điều hướng
- Mở từ: icon xóa trên các dòng dữ liệu Shared/Profiles, hoặc icon xóa ngôn ngữ trên tab Languages của TXT-001.
- Sau khi xác nhận: đóng modal, làm mới dữ liệu TXT-001.
