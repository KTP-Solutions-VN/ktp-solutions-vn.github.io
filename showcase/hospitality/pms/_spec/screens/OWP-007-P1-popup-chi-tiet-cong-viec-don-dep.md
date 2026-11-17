# OWP-007-P1 — Popup Chi tiết công việc dọn dẹp

**Loại:** Popup (mở từ OWP-007)

**Route:** `ExternalUserController::planningTeamsDetail($id, $location)` — route dạng `.../planning-teams-detail/{villas_clean_id}/owner`, mở từ OWP-007 (tab "Cleaning") trong tab mới

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Xem chi tiết một lượt dọn dẹp (cleaning) của biệt thự: thời gian, vị trí bắt đầu/kết thúc của nhân viên, khoảng cách tới biệt thự, hình ảnh và ghi chú kiểm tra sau khi dọn.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên biệt thự & toạ độ | Villas.name + VillaLocations.lat/lng | Text (hiển thị) | — | |
| 2 | Giờ bắt đầu | start_time | Giờ (hiển thị) | — | |
| 3 | Vị trí bắt đầu | start_location | Toạ độ (hiển thị) | — | |
| 4 | Khoảng cách (bắt đầu) | (tính toán) | Số (hiển thị) | — | Khoảng cách từ vị trí bắt đầu tới biệt thự (mét) |
| 5 | Giờ kết thúc | end_time | Giờ (hiển thị) | — | |
| 6 | Vị trí kết thúc | end_location | Toạ độ (hiển thị) | — | |
| 7 | Khoảng cách (kết thúc) | (tính toán) | Số (hiển thị) | — | Khoảng cách từ vị trí kết thúc tới biệt thự (mét) |
| 8 | Người thực hiện | Users.emoticon + usage_name + first_name | Text (hiển thị) | — | |
| 9 | Hình ảnh kiểm tra | CleaningDetails.uploaded_cleaning_img | Danh sách hình ảnh | — | |
| 10 | Ghi chú kiểm tra | CleaningDetails.description | Text (hiển thị) | — | |
| 11 | Thời lượng | (tính từ start_time/end_time) | Text (hiển thị) | — | |
| 12 | Ngày dọn dẹp | cleaned_date | Ngày (hiển thị) | — | |

## Chức năng/nút thao tác

- Xem toàn bộ thông tin chi tiết lượt dọn dẹp (không chỉnh sửa được)
- Đóng (icon ảnh "close" → quay lại OWP-007, tab Cleaning)

## Điều hướng

- Mở từ OWP-007 (tab "Cleaning", icon mắt trên từng lượt dọn dẹp), mở trong tab trình duyệt mới
- Đóng → quay lại OWP-007
