# CS-006-P1 — Popup Thêm/Sửa/Xóa Residence

**Loại:** Popup (mở từ CS-006)

**Route:** Modal Bootstrap (`#exampleModal`, form `multipart/form-data`) trong `residences.ctp`; submit cùng action `CommonSettingController::residences()`; nạp Region/District/Area theo cấp cha qua AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một Residence, gồm 4 cấp chọn địa lý cascade, thông tin liên hệ và upload ảnh đại diện.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country` | Select | Có | Cascade nạp Vùng |
| 2 | Vùng | `region` | Select (phụ thuộc Quốc gia) | Có | Cascade nạp Quận/Huyện |
| 3 | Quận/Huyện | `district` | Select (phụ thuộc Vùng) | Có | Cascade nạp Khu vực |
| 4 | Khu vực | `area` | Select (phụ thuộc Quận/Huyện) | Có | |
| 5 | Tên nội bộ Residence | `name` | Text | Có | |
| 6 | Tên chính thức | `official_name` | Text | Không | |
| 7 | Số điện thoại Residence | `residence_phone_number` | Text | Có | |
| 8 | Email Residence | `residence_email` | Email | Có | Validate định dạng email |
| 9 | Mã Residence | `residence_code` | Text, tối đa 3 ký tự | Không | `maxlength="3"` |
| 10 | Ảnh Residence | `image` | File upload (kéo-thả hoặc chọn file), JPG/PNG, tỉ lệ khuyến nghị 3:2 | Không | Có nút xóa ảnh đã chọn/ảnh hiện có (`remove_image`); server kiểm tra MIME type thực tế trước khi lưu |
| 11 | Hành động (ẩn) | `action` | Hidden | — | |
| 12 | ID (ẩn) | `id` | Hidden | — | |

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form` (multipart, hỗ trợ file); nếu trùng tổ hợp Quốc gia+Vùng+Quận/Huyện+Khu vực+Tên với bản ghi khác → báo lỗi, không lưu.
- **Remove selected/existing photo:** xóa ảnh đã chọn trong popup hoặc đánh dấu xóa ảnh hiện có khi Sửa.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-006 (danh sách Residence).
- Sau khi submit: quay lại CS-006 kèm flash message.
