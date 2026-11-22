# OPR-011 — Thực hiện kiểm tra tình trạng (Run Condition Check)

**Loại:** Trang đầy đủ
**Route:** operator/inspectionDetails?id=&last_id= + route đẹp dạng dashed: operator/inspection-details
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình wizard từng bước (point-by-point) cho nhân viên thực hiện các điểm kiểm tra (inspection point) của một lượt `Inspection`: chọn hạng mục kiểm tra (Inspection Service), khu vực (Location Service), chụp ảnh minh chứng, có thể Next/Back/Reset/Update từng điểm, và Finish để kết thúc toàn bộ lượt kiểm tra.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã lượt kiểm tra | `url_id` (`Inspection.inspection_key`) | Query string `id` | Có | |
| 2 | Hạng mục kiểm tra | `id_inspection_service` | Select (danh sách `InspectionService`) | Có | |
| 3 | Khu vực | `id_location_service` | Select (danh sách `LocationService`) | Có | |
| 4 | Điểm hiện tại | "Point N" (`inspection_point`) | Hiển thị | — | Tăng dần theo Next |
| 5 | Ảnh minh chứng | `uploaded_inspection_img` | Upload ảnh | Có | Lưu `InspectionDetails.uploaded_inspection_img` |
| 6 | Mô tả | `description` | Text | Không | |
| 7 | ID điểm trước (điều hướng lùi) | `last_id` | Query string | Không | Dùng khi Back |

## Chức năng/nút thao tác
- **Reset**: xóa dữ liệu điểm hiện tại.
- **Next**: lưu `InspectionDetails` (ajax `saveInspectionDetails`/`setNextClicked`), sang điểm kế tiếp.
- **Back**: quay lại điểm trước (ajax `backInspection`), chỉ hiện khi `ShowBackButton` = true.
- **Update**: cập nhật lại điểm đã lưu (ajax `updateInspectionDetails`).
- **Finish**: kết thúc lượt kiểm tra (ajax `finishInspectionDetails`).

## Điều hướng
- Vào từ: OPR-010 (bấm Start) hoặc tiếp tục nháp (`fetchDraftInspection`).
- Đi tới: sau khi Finish, quay về OPR-010 — Kiểm tra tình trạng.
