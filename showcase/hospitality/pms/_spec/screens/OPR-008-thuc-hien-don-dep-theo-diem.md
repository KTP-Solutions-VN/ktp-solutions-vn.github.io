# OPR-008 — Danh mục kiểm dọn phòng (Housekeeping Checklist)

**Loại:** Trang đầy đủ
**Route:** operator/cleaningDetails?id=&last_id= + route đẹp dạng dashed: operator/cleaning-details
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình wizard từng bước (point-by-point) cho nhân viên dọn dẹp thực hiện các hạng mục vệ sinh của một lượt `Cleaning`: mỗi điểm kiểm tra yêu cầu chụp ảnh minh chứng, có thể Next sang điểm kế tiếp, Back về điểm trước, Reset lại điểm hiện tại, hoặc Finish để kết thúc toàn bộ lượt dọn dẹp.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã lượt dọn dẹp | `url_id` (`Cleaning.cleaning_key`) | Query string `id` | Có | Xác định lượt dọn dẹp đang thực hiện |
| 2 | Điểm hiện tại | "Point N" (`cleaning_point`) | Hiển thị (heading) | — | Tăng dần theo từng bước Next |
| 3 | Ảnh minh chứng điểm dọn dẹp | `uploaded_cleaning_img` | Upload ảnh | Có (để bấm Next/Finish) | Lưu vào `CleaningDetails.uploaded_cleaning_img` |
| 4 | Mô tả (nếu có) | `description` | Text | Không | |
| 5 | ID điểm trước (điều hướng lùi) | `last_id` | Query string | Không | Dùng khi bấm Back |

## Chức năng/nút thao tác
- **Reset**: xóa dữ liệu đã nhập cho điểm hiện tại.
- **Next**: lưu `CleaningDetails` cho điểm hiện tại (ajax `saveCleaningDetails`/`setNextClickedCleaning`), chuyển sang điểm kế tiếp.
- **Back**: quay lại điểm trước đó (ajax `backCleaning`), chỉ hiện khi `ShowBackButton_cleaning` = true.
- **Update**: cập nhật lại dữ liệu điểm đã lưu (ajax `updateCleaningDetails`), dùng khi sửa lại một điểm đã hoàn thành.
- **Finish**: kết thúc lượt dọn dẹp (ajax `finishCleaningDetails`), chuyển `Cleaning` sang trạng thái hoàn thành.

## Điều hướng
- Vào từ: OPR-007 (bấm Start) hoặc tiếp tục một lượt dọn dẹp dở dang từ danh sách.
- Đi tới: sau khi Finish, quay về OPR-007 — Lượt dọn phòng.
