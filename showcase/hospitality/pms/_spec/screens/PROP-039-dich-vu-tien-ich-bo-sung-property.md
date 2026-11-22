# PROP-039 — Dịch vụ thêm cho khách (Guest Extras)

**Loại:** Trang đầy đủ
**Route:** property/villa-extras/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Villa Extra")
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang khai báo các mô tả dịch vụ/tiện ích bổ sung cho khách của Property theo từng ngôn ngữ: dịch vụ cho trẻ em (kids), thuê xe (vehicle rental), đầu bếp (chef), bữa sáng (breakfast), giao hàng (deliveries), tour tham quan (excursions) và các tiện ích khác (other extras). Dữ liệu lưu bảng `VillaExtra`, mỗi field serialize theo mã ngôn ngữ.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language`/`language_why_here` | Select (en/fr/zh) | Có (class `required`) | Đổi ngôn ngữ → JS load lại nội dung theo ngôn ngữ đã lưu |
| 2 | Kids | `kids` | Textarea (đa ngôn ngữ) | Không | |
| 3 | Vehicle Rental | `vehicle_rental` | Textarea (đa ngôn ngữ) | Không | |
| 4 | Chef | `chef` | Textarea (đa ngôn ngữ) | Không | |
| 5 | Breakfast | `breakfast` | Textarea (đa ngôn ngữ) | Không | |
| 6 | Deliveries | `deliveries` | Textarea (đa ngôn ngữ) | Không | |
| 7 | Excursions | `excursions` | Textarea (đa ngôn ngữ) | Không | |
| 8 | Other Extras | `other_extras` | Textarea (đa ngôn ngữ) | Không | |

## Chức năng/nút thao tác
- Nút "Save" (`why_here_form_1`) — submit form, lưu vào bảng `VillaExtra` (insert nếu chưa có bản ghi theo `villa_id`, update nếu đã có), hiện Flash message thành công/lỗi rồi redirect lại chính trang.
- Đổi ngôn ngữ — cập nhật các textarea theo nội dung đã lưu cho ngôn ngữ đó (JS, không reload trang).

## Điều hướng
- Mở từ: PROP-021 (Điểm chặn trước khi mở bán) — icon "Villa Extra".
- Điều hướng tới: Không có (chỉ lưu tại chỗ và redirect về chính nó).
- Popup con: Không có.
