# REN-011 — Báo cáo tiến độ & chi phí dự án

**Loại:** Trang đầy đủ
**Route:** renovation/report/:id + route đẹp dạng dashed: renovation/report/:id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Màn hình chỉ xem (read-only) báo cáo tổng hợp so sánh kế hoạch (plan) và thực tế (actual) của một dự án cải tạo trên 4 tiêu chí: ngày bắt đầu, ngày hoàn thành, thời lượng thi công và tổng chi phí, kèm độ lệch (variation).

## Mô tả chi tiết

### Cột hiển thị
| # | Cột | Ghi chú |
|---|---|---|
| 1 | (Tên chỉ tiêu) | Starting Date / Completion Date / Duration / Expenses |
| 2 | Plan | Giá trị kế hoạch (`start_date`, `end_date`, số ngày dự kiến, `total_budget_amount`) |
| 3 | Actual | Giá trị thực tế (`actual_start_date`, `actual_end_date`, số ngày thực tế, `total_real_amount`) |
| 4 | Variation | Chênh lệch actual so với plan (số ngày trễ/sớm, chênh lệch chi phí) |

## Chức năng/nút thao tác
- Chỉ xem; không có thao tác chỉnh sửa trên màn hình này.

## Điều hướng
- Vào từ: REN-003 — Theo dõi dự án cải tạo.
- Đi tới: không có điều hướng tiếp; quay lại REN-003 bằng nút back trình duyệt.
