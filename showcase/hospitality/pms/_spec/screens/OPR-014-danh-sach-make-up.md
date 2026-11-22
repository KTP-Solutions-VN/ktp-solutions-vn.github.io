# OPR-014 — Lượt chuẩn bị cuối (Final Prep Rounds)

**Loại:** Trang đầy đủ
**Route:** operator/makeUp + route đẹp dạng dashed: operator/make-up
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình cho nhân viên chọn đơn vị kinh doanh và villa để bắt đầu một lượt "Make Up" (dọn dẹp hoàn thiện/chuẩn bị villa). Cấu trúc và luồng tương tự OPR-007 (Lượt dọn phòng) nhưng dành riêng cho quy trình make-up.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Có | |
| 2 | Villa | `villa_id` | Select2 (nạp qua ajax theo BU) | Có | |
| 3 | Danh sách lượt make-up trước đó | — | Bảng (ajax) | — | Villa, ngày, trạng thái, thao tác xem/tiếp tục |

## Chức năng/nút thao tác
- **Start**: tạo bản ghi `Cleaning`/make-up mới, điều hướng tới `operator/makeupDetails?id=` (OPR-015).
- Đổi **Đơn vị kinh doanh**: nạp lại danh sách villa.

## Điều hướng
- Vào từ: menu "Final Prep Rounds" trong sidebar.
- Đi tới: OPR-015 — Danh mục chuẩn bị cuối.
