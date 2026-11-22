# SET-004-P1 — Form ánh xạ tài khoản kênh (Channel Account Mapping Form)

**Loại:** Popup (thực chất là form inline mở/đóng dưới mỗi bảng kênh trong SET-004, không phải modal Bootstrap)

**Route:** Render động trong `SettingController::hostexSetup()` (`hostex_setup.ctp`); submit AJAX POST tới `saveHostexAccount()` — `/setting/save-hostex-account`; kiểm tra trùng email trong cùng kênh qua AJAX `checkHostexEmail()` — `/setting/check-hostex-email` (jQuery Validate `remote`).

**Module:** SET = Cài đặt nền tảng

## Mô tả ngắn gọn
Form thêm mới hoặc sửa một tài khoản Hostex (OTA account) thuộc một kênh phân phối cụ thể, gồm email/tên tài khoản, OTA Account liên kết, và chủ sở hữu tài khoản (Azura Stays hoặc Agency).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Account Email or Name | `email` (gửi lên là `account_email`) | Text | Có | Kiểm tra trùng trong cùng kênh (`channel_id`) qua AJAX `checkHostexEmail`, loại trừ chính bản ghi đang sửa |
| 2 | OTA Account | `ota_account_id` | Select | Không | Danh sách OTA Account (bảng `Chanel`) thuộc kênh đang thao tác |
| 3 | Owner | `owner` | Select: `azurastays` / `agency` | Có | Mặc định "Azura Stays" |
| 4 | Agency | `agency` (gửi lên là `agency_id`) | Select danh sách Agency | Có, nếu Owner = `agency` | Disable khi Owner = "Azura Stays" |

## Chức năng/nút thao tác
- **Save:** validate (jQuery Validate) rồi gửi AJAX `saveHostexAccount` (kèm `id` nếu là sửa, `channel_id`, `account_email`, `ota_account_id`, `owner`, `agency_id`); lưu `HostexAccount`, ghi log hoạt động, hiện Flash message, reload trang khi thành công.
- **Cancel:** đóng form inline, không lưu.
- **Add account (mở form ở chế độ thêm mới):** reset form trống.
- **Sửa (mở form ở chế độ sửa):** nạp sẵn dữ liệu dòng tài khoản đã chọn vào form (kèm `editId` để phân biệt thêm/sửa khi submit).

## Điều hướng
- Mở từ: SET-004 — nút "Add account" của từng kênh, hoặc icon "Sửa" trên từng dòng tài khoản.
- Sau khi lưu: reload lại SET-004, bảng tài khoản của kênh tương ứng cập nhật.
