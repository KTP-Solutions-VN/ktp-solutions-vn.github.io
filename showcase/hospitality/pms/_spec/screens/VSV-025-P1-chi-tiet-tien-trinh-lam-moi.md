# VSV-025-P1 — Chi tiết tiến trình làm mới phòng (Makeup Detail View)

**Loại:** Popup (mở từ VSV-025, dạng trang riêng)

**Route:** `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-teams-detail/<villa_clean_id>/makeup`

**Module:** Dịch vụ villa — Dọn dẹp (Make-up)

## Mô tả ngắn gọn
Trang xem chi tiết (chỉ đọc) một lượt làm mới phòng cụ thể: hành trình bắt đầu/kết thúc, người thực hiện, và bộ ảnh + ghi chú đã ghi nhận — cấu trúc tương tự VSV-026-P1 nhưng áp dụng cho nghiệp vụ Make-up.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa + tọa độ | `Villas.name`, `VillaLocations.lat/lng` | Text (đọc) | — | |
| 2 | Time / Location / Distance | `VillasClean.start_time/end_time`, `start_location/end_location` | Bảng (đọc) | — | |
| 3 | Done by | `Users.usage_name/first_name/emoticon` | Text (đọc) | — | |
| 4 | Photos / Comments | `CleaningDetails.uploaded_cleaning_img`, `description` | Bảng ảnh + text (đọc) | — | |

## Chức năng/nút thao tác
- Không có nút chỉnh sửa — trang chỉ hiển thị dữ liệu đã ghi nhận.

## Điều hướng
- Vào từ: VSV-025 — nút xem chi tiết trên villa đang làm mới.
- Điều hướng đến: quay lại VSV-025.
