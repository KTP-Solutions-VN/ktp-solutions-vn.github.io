# BU-022 — Kênh (Channels — quản lý nền tảng, tài khoản kênh & yếu tố nội dung)

**Loại:** Trang đầy đủ (3 tab)

**Route:** `BusinessUnitController::channels($tab)` — mặc định `/business-unit/channels/{tab}` (tab: `platforms`, `accounts`, `content-elements`)

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Trang quản lý Kênh phân phối phiên bản mới, thay thế đường vào menu chính cho BU-005 (trang "Kênh" cũ dùng `chanels()`/`chanel.ctp` vẫn còn hoạt động qua URL trực tiếp nhưng không còn liên kết từ sidebar hiện tại). Gồm 3 tab: "Nền tảng đặt phòng" (`platforms`), "Tài khoản kênh" (`accounts`), "Yếu tố nội dung" (`content-elements`, chỉ dành cho Superadmin).

## Mô tả chi tiết

### Tab 1 — Nền tảng đặt phòng (`platforms`)
Danh sách `BookingPlatform`:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Nền tảng | `name` | |
| 3 | Logo | `logo` | |
| 4 | Nội dung Listing (chỉ Superadmin) | — | Link sang `OtaContent::listing`, tóm tắt số lượng nội dung đã cấu hình |
| 5 | Người tạo | `created_by` → tên nhân sự | |
| 6 | Ngày tạo | `created_at` | |
| 7 | Hành động | — | Sửa, Xóa, (Superadmin) Sửa nội dung Listing |

### Tab 2 — Tài khoản kênh (`accounts`)
Danh sách `Chanel` (tài khoản/kênh cụ thể thuộc một nền tảng):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tài khoản | `name` | |
| 3 | Nền tảng | `booking_platform_id` → tên | |
| 4 | Ownership | `ownership` | `Azura Stays` / `Partner` |
| 5 | Ngày tạo | `created_at` | |
| 6 | Hành động | — | Liên kết Villa theo kênh (BU-006), Sửa, Xóa |

### Tab 3 — Yếu tố nội dung (`content-elements`, chỉ Superadmin)
Bảng cấu hình các thành phần nội dung OTA (kéo-thả sắp xếp thứ tự):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT (kéo thả) | — | |
| 2 | Yếu tố | `name` | |
| 3 | Nhóm | `group_key` | |
| 4 | Phạm vi | `scope_key` | |
| 5 | Độ dài | `max_length` | "No limit" nếu trống |
| 6 | Có thể dịch | `translatable` | Có/Không |
| 7 | Áp dụng cho | `ota_content_element_platforms` | Danh sách nền tảng |
| 8 | Hành động | — | Sửa, Xóa (lưu trữ) |

## Chức năng/nút thao tác
- **Add new (tab Nền tảng):** mở popup BU-022-P1 ở chế độ Thêm mới.
- **Sửa nền tảng:** mở popup BU-022-P1 ở chế độ Sửa.
- **Xóa nền tảng:** mở popup BU-022-P2 xác nhận xóa (chặn xóa nếu còn tài khoản kênh đang dùng nền tảng đó).
- **Add new (tab Tài khoản kênh):** mở popup BU-022-P3 ở chế độ Thêm mới.
- **Sửa tài khoản kênh:** mở popup BU-022-P3 ở chế độ Sửa.
- **Xóa tài khoản kênh:** mở popup BU-022-P4 xác nhận xóa.
- **Liên kết (icon link):** điều hướng sang BU-006 (Liên kết Villa theo kênh), mở tab mới.
- **Add new (tab Yếu tố nội dung):** mở popup BU-022-P5 ở chế độ Thêm mới.
- **Sửa yếu tố nội dung:** mở popup BU-022-P5 ở chế độ Sửa.
- **Xóa (lưu trữ) yếu tố nội dung:** mở popup BU-022-P6 xác nhận xóa, cảnh báo nếu yếu tố đang gắn với nền tảng hoặc đang dùng trong Texts.
- **Kéo-thả (tab Yếu tố nội dung):** đổi thứ tự hiển thị, lưu ngay qua AJAX.

## Điều hướng
- Vào từ: menu chính > Kênh (sidebar hiện tại trỏ tới `channels`, tab mặc định `platforms`); hoặc từ `OtaContent::listing`.
- Điều hướng đến: BU-006 (Liên kết Villa theo kênh), BU-022-P1…P6 (các popup), `OtaContent::listing` (Superadmin).
