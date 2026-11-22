# VSV-026-P1 — Chi tiết tiến độ dọn chuyển khách (Turnover Progress Detail)

**Loại:** Popup (mở từ VSV-026, dạng trang riêng)

**Route:** `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/planning-teams-detail/<villa_clean_id>/<location>`

**Module:** Dịch vụ lưu trú — Dọn phòng

## Mô tả ngắn gọn
Trang xem chi tiết (chỉ đọc) một lượt dọn dẹp villa cụ thể: vị trí villa, hành trình bắt đầu/kết thúc (thời gian, địa điểm, khoảng cách), người thực hiện, và bộ ảnh + ghi chú (comment) đã upload trong quá trình dọn.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa + tọa độ | `Villas.name`, `VillaLocations.lat/lng` | Text (đọc) | — | |
| 2 | Time / Location / Distance | `VillasClean.start_time/end_time`, `start_location/end_location` | Bảng (đọc) | — | So sánh điểm bắt đầu và kết thúc dọn dẹp |
| 3 | Done by | `Users.usage_name/first_name/emoticon` | Text (đọc) | — | Người thực hiện dọn dẹp |
| 4 | Photos / Comments | `CleaningDetails.uploaded_cleaning_img`, `description` | Bảng ảnh + text (đọc) | — | Mỗi dòng là 1 hạng mục đã chụp/ghi chú |
| 5 | Done by Admin (nếu có) | `VillasClean.is_from_admin`, `Users` | Text (đọc) | — | Hiển thị khi bản ghi được tạo/đánh dấu hoàn tất bởi admin thay vì nhân viên hiện trường |

## Chức năng/nút thao tác
- Không có nút thao tác chỉnh sửa — trang chỉ hiển thị dữ liệu đã ghi nhận.

## Điều hướng
- Vào từ: VSV-026 — nút "Clean" trên villa đang có tiến trình dọn dẹp.
- Điều hướng đến: quay lại VSV-026.
