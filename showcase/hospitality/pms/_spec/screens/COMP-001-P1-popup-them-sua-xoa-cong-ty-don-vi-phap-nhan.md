# COMP-001-P1 — Popup Thêm/Sửa/Xóa Công ty hoặc Đơn vị pháp nhân

**Loại:** Popup/Modal (mở từ COMP-001)
**Route:** Không có route riêng — dùng chung form POST về `company/list` (action ẩn `add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `company/checkCompany` và `company/checkSubsidiaryName`
**Module:** COMP = Công ty

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 4 kịch bản: Thêm công ty, Sửa công ty, Thêm đơn vị pháp nhân (subsidiary), Sửa đơn vị pháp nhân, và 1 kịch bản xác nhận xóa (dùng chung cho cả 2 loại). Nội dung form được ẩn/hiện linh động bằng JS tùy theo `data-button_name` của nút bấm kích hoạt (`company` hoặc `company_subsidiary`).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Legal Entity (công ty cha) | `company_id` | Select (dropdown Company) | Có (chỉ hiện khi thao tác Subsidiary) | Ẩn khi thao tác Company |
| 2 | Legal Entity (tên công ty) | `name` | Text | Có (chỉ hiện khi thao tác Company) | Validate remote trùng tên qua `checkCompany` |
| 3 | Subsidiary (tên đơn vị pháp nhân) | `subsidiary_name` | Text | Có (chỉ hiện khi thao tác Subsidiary) | Validate remote trùng tên qua `checkSubsidiaryName` |
| 4 | Short Name | `short_name` | Text | Có | Dùng chung cho cả 2 loại |
| 5 | Country | `country_id` | Select (dropdown Country) | Có (chỉ hiện khi thao tác Subsidiary) | Ẩn khi thao tác Company |
| 6 | Logo | `logo` / `cropped_logo` (hidden, base64) | File upload ảnh + canvas crop tỉ lệ 1:1 | Không | Chỉ hiện khi thao tác Subsidiary; giới hạn <1.2MB, tự động crop nếu sai tỉ lệ |
| 7 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 8 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |
| 9 | Tab (ẩn) | `tab` | Hidden | Có | Xác định đang thao tác trên tab nào (`company-list`/`subsidiaries-list`) |

Khi ở chế độ xóa: toàn bộ khối input ẩn đi, chỉ hiển thị đoạn text xác nhận xóa (`delete_confirm_help_text`).

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — text và hành vi đổi theo action; disable khi đang submit để tránh double-submit.
- Nút "Cancel" — đóng modal, không lưu.
- Validate jQuery Validate: bắt buộc các field theo loại, kiểm tra trùng tên qua remote AJAX.
- Upload logo: chọn file → kiểm tra kích thước & tỉ lệ ảnh, tự động crop nếu lệch tỉ lệ 1:1, lưu base64 vào `cropped_logo`.

## Điều hướng
- Mở từ: COMP-001 (nút Add new / Edit / Delete trên 2 tab Company và Subsidiaries).
- Điều hướng tới: không chuyển trang — submit xong reload lại COMP-001 (redirect `referer()`).
