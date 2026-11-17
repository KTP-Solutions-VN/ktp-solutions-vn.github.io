# CMS-031 — Thêm/Sửa nội dung Arrival

**Loại:** Trang đầy đủ

**Route:** `CmsController::cmsArrival($id)` — mặc định `/cms/cms-arrival/:id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa một bản ghi nội dung Arrival, dùng chung 1 action cho cả Add (không truyền `id`) và Edit (có `id`). Mỗi bản ghi gồm 1 tiêu đề (không đa ngôn ngữ) và 6 đoạn nội dung text đa ngôn ngữ (sân bay, bến tàu, thuê xe, di chuyển khác, mô tả check-in, mô tả lưu trú).

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown (`Language`, key = `language_code`) | Có | Chọn ngôn ngữ đang nhập; đổi ngôn ngữ sẽ tự đổ lại (qua JS) 6 ô textarea theo ngôn ngữ tương ứng nếu đã có dữ liệu, không submit form |
| 2 | Tiêu đề | `title` | Text | Có | Không đa ngôn ngữ, dùng chung cho mọi ngôn ngữ |
| 3 | Nội dung sân bay (Airport) | `airport_text` | Textarea | Có | Đa ngôn ngữ — lưu dạng `serialize([lang => text])` |
| 4 | Nội dung bến tàu (Harbour/Pier) | `pier_text` | Textarea | Có | Đa ngôn ngữ |
| 5 | Nội dung thuê xe (Car Rental) | `car_rental_text` | Textarea | Có | Đa ngôn ngữ |
| 6 | Nội dung di chuyển khác (Other Transfer) | `other_text` | Textarea | Có | Đa ngôn ngữ |
| 7 | Mô tả Check-in | `check_in_text` | Textarea | Có | Đa ngôn ngữ |
| 8 | Mô tả lưu trú (Stay) | `stay_text` | Textarea | Có | Đa ngôn ngữ |

Icon dấu tick màu xanh hiển thị cạnh nút Save khi cả 6 nội dung text nêu trên của ngôn ngữ đang chọn đều đã có dữ liệu — chỉ mang tính báo hiệu hoàn thành, không phải field nhập liệu.

## Chức năng/nút thao tác
- **Chọn ngôn ngữ:** đổi dropdown `language` sẽ đổ lại (qua JS, dữ liệu bản ghi hiện tại được render sẵn dạng JSON) nội dung 6 ô textarea theo ngôn ngữ tương ứng nếu đã có, không submit form.
- **Save:** lưu dữ liệu. Nếu là bản ghi mới, 6 text được serialize theo ngôn ngữ đang chọn; nếu bản ghi đã tồn tại, merge thêm bản dịch ngôn ngữ mới vào dữ liệu đã serialize sẵn (không mất bản dịch ngôn ngữ khác). Lưu thành công/thất bại đều có Flash message; thành công thì redirect về CMS-030, thất bại thì quay lại trang trước đó (`referer`).
- **Reset:** reset form về giá trị ban đầu (client-side).

## Điều hướng
- Vào từ: CMS-030 (nút "+ Arrival" hoặc "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-030 sau khi Save thành công.
