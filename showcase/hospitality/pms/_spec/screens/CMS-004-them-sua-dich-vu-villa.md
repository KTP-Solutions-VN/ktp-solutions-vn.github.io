# CMS-004 — Thêm/Sửa dịch vụ villa (CMS Services)

**Loại:** Trang đầy đủ

**Route:** `CmsController::cmsServices($id)` — mặc định `/cms/cms-services/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa nội dung dịch vụ villa hiển thị trên website (Concierge, Maintenance, Cleaning, Transport), dùng chung 1 action cho cả Add (không truyền `id`) và Edit (có `id`). Mỗi nhóm dịch vụ gồm 1 đoạn text đa ngôn ngữ và 1 ảnh minh hoạ.

## Mô tả chi tiết

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language` | Dropdown (`Language`) | Có | Chọn ngôn ngữ đang nhập; đổi ngôn ngữ sẽ tự đổ lại nội dung text tương ứng đã lưu (qua JS, dữ liệu `cms_services` render sẵn) |
| 2 | Tiêu đề | `title` | Text | Có | Không đa ngôn ngữ |
| 3 | Nội dung Concierge | `concierge_text` | Textarea | Có | Đa ngôn ngữ — lưu dạng `serialize([lang => text])` |
| 4 | Ảnh Concierge | `concierge_image` | Upload ảnh | Không | Ảnh dùng chung cho mọi ngôn ngữ; khuyến nghị < 5MB |
| 5 | Nội dung Maintenance | `maintenance_text` | Textarea | Có | Đa ngôn ngữ |
| 6 | Ảnh Maintenance | `maintenance_image` | Upload ảnh | Không | |
| 7 | Nội dung Cleaning | `cleaning_text` | Textarea | Có | Đa ngôn ngữ |
| 8 | Ảnh Cleaning | `cleaning_image` | Upload ảnh | Không | |
| 9 | Nội dung Transport | `transport_text` | Textarea | Có | Đa ngôn ngữ |
| 10 | Ảnh Transport | `transport_image` | Upload ảnh | Không | |

Icon dấu tick màu xanh hiển thị cạnh nút Save khi cả 4 nội dung text (concierge/maintenance/cleaning/transport) của ngôn ngữ đang chọn đều đã có dữ liệu — chỉ mang tính báo hiệu hoàn thành, không phải field nhập liệu.

## Chức năng/nút thao tác
- **Chọn ngôn ngữ:** đổi dropdown `language` sẽ đổ lại (qua JS) nội dung 4 ô textarea theo ngôn ngữ tương ứng nếu đã có, không submit form.
- **Save:** lưu dữ liệu. Nếu là bản ghi mới, các text được serialize theo ngôn ngữ đang chọn; nếu bản ghi đã tồn tại, merge thêm bản dịch ngôn ngữ mới vào dữ liệu đã serialize sẵn. Ảnh chỉ được upload lại (ghi đè) khi người dùng chọn file mới, nếu không giữ nguyên ảnh cũ. Lưu xong quay về CMS-003.
- **Reset:** reset form về giá trị ban đầu (client-side).

## Điều hướng
- Vào từ: CMS-003 (nút "Thêm mới" hoặc "Edit" trên từng dòng).
- Điều hướng đến: quay lại CMS-003 sau khi Save thành công/thất bại.
