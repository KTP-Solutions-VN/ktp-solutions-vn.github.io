# OWP-007-P2 — Popup Chi tiết công việc làm vườn

**Loại:** Popup (mở từ OWP-007)

**Route:** `ExternalUserController::gardenView($id)` — không có route đẹp riêng, mở từ OWP-007 (tab "Garden") trong tab mới (mặc định `/external-user/garden-view/{id}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Xem chi tiết một công việc làm vườn (garden job) của biệt thự: dịch vụ vườn, người thực hiện, thời gian, trạng thái đã lên kế hoạch, và hình ảnh trước/sau khi làm vườn.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa.name | Text (hiển thị) | — | |
| 2 | Dịch vụ vườn | garden_service.name | Text (hiển thị) | — | |
| 3 | Người thực hiện | operators_name | Text (hiển thị) | — | Danh sách gardener, "N/A" nếu trống |
| 4 | Giờ bắt đầu thực tế | actual_start_time | Giờ (hiển thị) | — | |
| 5 | Giờ kết thúc thực tế | actual_end_time | Giờ (hiển thị) | — | |
| 6 | Ngày dọn vườn | date | Ngày (hiển thị) | — | |
| 7 | Đã lên kế hoạch | is_planned / planned | Text (hiển thị) | — | "Yes"/"No" |
| 8 | Hình ảnh vườn | garden_cleaning[].images | Danh sách hình ảnh (bảng) | — | Kèm mô tả |
| 9 | Mô tả hình ảnh | garden_cleaning[].description | Text (hiển thị) | — | "N/A" nếu trống |

## Chức năng/nút thao tác

- Xem toàn bộ thông tin chi tiết công việc làm vườn (không chỉnh sửa được)
- Quay lại (icon ảnh "close" → quay lại trang trước)

## Điều hướng

- Mở từ OWP-007 (tab "Garden", icon "View Details" trên từng công việc), mở trong tab trình duyệt mới
- Quay lại → OWP-007
