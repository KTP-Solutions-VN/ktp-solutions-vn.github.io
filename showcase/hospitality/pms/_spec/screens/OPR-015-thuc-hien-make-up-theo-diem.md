# OPR-015 — Danh mục chuẩn bị cuối (Final Prep Checklist)

**Loại:** Trang đầy đủ
**Route:** operator/makeupDetails?id=&last_id= + route đẹp dạng dashed: operator/makeup-details
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình wizard từng bước (point-by-point) cho nhân viên thực hiện các hạng mục make-up: mỗi điểm yêu cầu chụp ảnh minh chứng, có thể Next/Back/Reset/Update từng điểm, Finish để kết thúc toàn bộ lượt make-up. Cấu trúc/hành vi tương tự OPR-008 (Danh mục kiểm dọn phòng).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã lượt make-up | `url_id` | Query string `id` | Có | |
| 2 | Điểm hiện tại | "Point N" | Hiển thị | — | Tăng dần theo Next |
| 3 | Ảnh minh chứng | `uploaded_*_img` | Upload ảnh | Có | |
| 4 | Mô tả | `description` | Text | Không | |
| 5 | ID điểm trước | `last_id` | Query string | Không | Dùng khi Back |

## Chức năng/nút thao tác
- **Reset**: xóa dữ liệu điểm hiện tại.
- **Next**: lưu điểm hiện tại (ajax `saveMakeupDetails`/`setNextClickedMakeup`), sang điểm kế tiếp.
- **Back**: quay lại điểm trước (ajax `backMakeup`).
- **Update**: cập nhật lại điểm đã lưu (ajax `updateMakeupDetails`).
- **Finish**: kết thúc lượt make-up (ajax `finishMakeupDetails`).

## Điều hướng
- Vào từ: OPR-014 (bấm Start) hoặc tiếp tục lượt make-up dở dang.
- Đi tới: sau khi Finish, quay về OPR-014 — Lượt chuẩn bị cuối.
