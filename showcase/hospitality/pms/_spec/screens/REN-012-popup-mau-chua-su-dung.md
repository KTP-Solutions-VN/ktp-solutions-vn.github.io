# REN-012 — Popup giữ chỗ chưa dùng (Unused Placeholder Popup)

**Loại:** Popup
**Route:** renovation/startPopup + route đẹp dạng dashed: renovation/start-popup
**Module:** REN = Nâng cấp tài sản

## Mô tả ngắn gọn
Đây là một modal mẫu do CakePHP bake sinh sẵn (copy từ boilerplate "Add Business Unit" xuất hiện lặp lại ở nhiều controller khác như Operator/Maintenance, Operator/Pools, Renovation/ProjectFollowUp...). Action `startPopup()` trong `RenovationController` chỉ set `active_menu` và không xử lý logic nghiệp vụ; không tìm thấy link/nút nào trong các view của module Renovation trỏ tới action này.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — (`delete_confirm_help_text`) | Text tĩnh | — | Nội dung là text xác nhận xóa mẫu, không khớp tiêu đề modal ("Add Business Unit") — dấu hiệu code scaffold chưa được tùy biến |

## Chức năng/nút thao tác
- **Save** (`submit_button`): không gắn xử lý JS/ajax cụ thể trong file.
- **Cancel**: đóng modal (`data-dismiss="modal"`).

## Điều hướng
- Vào từ: không xác định được điểm gọi trong giao diện hiện tại (có thể là code thừa/chưa dọn dẹp).
- Đi tới: không có.
