# VSV-017-P1 — Chi tiết lượt chăm vườn (trung tâm) (Garden Care Visit Detail)

**Loại:** Popup (mở từ VSV-017, dạng trang riêng)

**Route:** `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>`

**Module:** Dịch vụ lưu trú — Chăm vườn

## Mô tả ngắn gọn
Trang xem chi tiết (chỉ đọc) một lượt làm vườn đã ghi nhận: dịch vụ, người thực hiện, thời gian, có nằm trong kế hoạch hay không, kèm bộ ảnh/mô tả trước và sau khi làm.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Garden Service | `GardenJobs.garden_service` | Text (đọc) | — | |
| 2 | Operators Name | `operators_name` | Text (đọc) | — | Ghép từ danh sách `gardener_ids` |
| 3 | Start Time | `GardenJobs.start_time` | Text (đọc) | — | |
| 4 | End Time | `GardenJobs.end_time` | Text (đọc) | — | |
| 5 | Cleaning Date | `GardenJobs.date` | Text (đọc) | — | |
| 6 | Planned | `is_planned` → `planned` | Text (đọc) | — | Yes/No |
| 7 | Bảng ảnh (trước/sau) | `GardenCleaning` | Bảng ảnh + mô tả (đọc) | — | Cột: STT, Image, Description |

## Chức năng/nút thao tác
- Không có nút chỉnh sửa — trang chỉ hiển thị dữ liệu đã ghi nhận.

## Điều hướng
- Vào từ: VSV-017 (tab Reports) — nút xem chi tiết trên từng dòng.
- Điều hướng đến: quay lại VSV-017.
