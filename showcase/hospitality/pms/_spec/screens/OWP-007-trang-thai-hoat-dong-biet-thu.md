# OWP-007 — Trạng thái hoạt động biệt thự

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::status($tab, $villa_id)` — không có route đẹp riêng, mở từ OWP-005 (icon "Xem hoạt động"), dạng `.../status/rental/{villa_id_base64}`

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Trang tổng hợp các hoạt động hiện tại của một biệt thự theo dạng tab: Cho thuê (rental), Dọn phòng nhanh (make-up), Bảo trì (maintenance), Chăm sóc vườn (garden), Hồ bơi (pool), Lịch sử giá (rates-logs), Vệ sinh (cleaning), Hóa đơn/chứng từ (receipts). Các tab hiện/ẩn tuỳ theo cấu hình `OwnerVillaExtraSetting` của từng biệt thự. Dữ liệu từng tab tải qua AJAX.

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa | Select2 | Có | Danh sách biệt thự đang mở (Open) thuộc chủ sở hữu |

Danh sách tab (nội dung tải AJAX riêng cho từng tab):

| # | Tab | Field code | Nguồn dữ liệu AJAX | Ghi chú |
|---|---|---|---|---|
| 1 | Cho thuê | rental | (dữ liệu server-side `getVillaStatusAjax`) | Tab mặc định |
| 2 | Dọn phòng nhanh | make-up | getMakeUp | Ẩn/hiện theo cấu hình |
| 3 | Bảo trì | maintenance | getMaintenanceLog | Ẩn/hiện theo cấu hình |
| 4 | Chăm sóc vườn | garden | getGardenCleanings, getGardenData | Ẩn/hiện theo cấu hình; có thể gửi bình luận (comment) |
| 5 | Hồ bơi | pool | getPoolCleanings | Ẩn/hiện theo cấu hình |
| 6 | Lịch sử giá | rates-logs | getRatesLogs | |
| 7 | Vệ sinh | cleaning | getCleaningData | Ẩn/hiện theo cấu hình |
| 8 | Hóa đơn/chứng từ | receipts | getClaimExpenseData | |

## Chức năng/nút thao tác

- Chọn biệt thự để xem trạng thái (select2, tự tải lại trang)
- Chuyển tab xem từng loại hoạt động
- Gửi bình luận về lịch chăm sóc vườn (form ẩn, POST cùng action `status`, gửi email thông báo tới đơn vị kinh doanh)
- Xem ảnh phóng to (lightbox) cho các minh chứng công việc

## Điều hướng

- Vào từ OWP-005 (icon "Xem hoạt động" trên từng dòng biệt thự)
- Không điều hướng sang trang khác (thao tác tại chỗ qua AJAX)
