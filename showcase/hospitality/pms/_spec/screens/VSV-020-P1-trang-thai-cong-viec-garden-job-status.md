# VSV-020-P1 — Tiến độ việc chăm vườn (Garden Job Progress)

**Loại:** Popup (mở từ VSV-020, dạng trang riêng — hiện chỉ là bản mẫu tĩnh)

**Route:** `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status`

**Module:** Dịch vụ lưu trú — Chăm vườn

## Mô tả ngắn gọn
Màn hình bản mẫu (mockup) chưa hoàn thiện, mô phỏng giao diện di động cho nhân viên vận hành xem tiến trình một ca làm việc (villa, giờ bắt đầu/kết thúc) và chụp ảnh, với nút Dừng/Hoàn tất. Toàn bộ nội dung là dữ liệu tĩnh (hard-code), action chỉ set tiêu đề trang (lấy nhầm `pool_text`).

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Thông tin ca (villa, giờ) | — | Text tĩnh ("Villa a – Start: 8:25 – End: 10:30") | — | Hard-code, không đọc dữ liệu thật |
| 2 | Chụp ảnh | — | Icon camera (chưa gắn hành động) | — | |
| 3 | Ảnh minh họa | — | 4 ảnh icon tĩnh | — | |

## Chức năng/nút thao tác
- **Stop**: chưa gắn hành động thực (href rỗng).
- **Finish**: chưa gắn hành động thực (href rỗng).

## Điều hướng
- Vào từ: VSV-020 (nhúng cùng trang trong bản mẫu hiện tại).
- Điều hướng đến: không có (bản mẫu tĩnh).
