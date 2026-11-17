# CS-008-P1 — Popup Thêm/Sửa/Xóa Unit

**Loại:** Popup (mở từ CS-008)

**Route:** Modal Bootstrap (`#exampleModal`) trong `units.ctp`; submit cùng action `CommonSettingController::units()`; kiểm tra trùng tên qua AJAX `checkUnit()` — `/common-setting/check-unit`; nạp Region/District/Area/Residence theo cấp cha qua AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới (hỗ trợ nhập nhiều Unit cùng lúc), Sửa (1 Unit) và Xóa Unit — có 5 cấp chọn cha cascade (Quốc gia → Vùng → Quận/Huyện → Khu vực → Residence).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country` | Select | Có | Cascade nạp Vùng |
| 2 | Vùng | `region` | Select (phụ thuộc Quốc gia) | Có | Cascade nạp Quận/Huyện |
| 3 | Quận/Huyện | `district` | Select (phụ thuộc Vùng) | Có | Cascade nạp Khu vực |
| 4 | Khu vực | `area` | Select (phụ thuộc Quận/Huyện) | Có | Cascade nạp Residence |
| 5 | Residence | `residence` | Select (phụ thuộc Khu vực) | Có | |
| 6 | Tên Unit (chế độ Sửa) | `name` | Text | Có | Validate remote `checkUnit` theo tổ hợp đủ 5 cấp cha + tên |
| 7 | Tên Unit (chế độ Thêm mới) | `units` + nút "Add" | Text + danh sách chip | Có (ít nhất 1) | Mỗi lần bấm "Add" sẽ kiểm tra trùng qua AJAX `checkUnit` rồi thêm vào danh sách chip (`units_val`, phân tách bằng dấu phẩy); khi Save sẽ tạo nhiều bản ghi Unit cùng lúc cho mỗi tên trong danh sách |
| 8 | Hành động (ẩn) | `action` | Hidden | — | |
| 9 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa/xóa |

## Chức năng/nút thao tác
- **Add (trong form Thêm mới):** thêm 1 tên Unit vào danh sách chip sau khi kiểm tra không trùng.
- **Xóa 1 chip:** loại bỏ tên Unit khỏi danh sách chờ lưu.
- **Save/Update/Delete:** submit `popup_form`; ở chế độ Thêm mới sẽ lặp qua từng tên trong danh sách để tạo nhiều bản ghi `Unit`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-008 (danh sách Unit).
- Sau khi submit: quay lại CS-008 kèm flash message.
