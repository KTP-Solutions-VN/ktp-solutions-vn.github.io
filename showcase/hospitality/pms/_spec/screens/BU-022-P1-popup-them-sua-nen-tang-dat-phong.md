# BU-022-P1 — Popup Thêm/Sửa nền tảng đặt phòng

**Loại:** Popup (mở từ BU-022, tab Nền tảng đặt phòng)

**Route:** Modal Bootstrap (`#platformModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUnitController::channels('platforms')`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một nền tảng đặt phòng (Booking Platform), gồm tên, ảnh minh họa và logo.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên nền tảng | `platform_name` | Text | Có | |
| 2 | Ảnh | `image` / `cropped_image` | File ảnh (crop tỉ lệ 2:1, ≤1MB) | Không | Upload thư mục `villas` |
| 3 | Logo | `logo` / `cropped_logo` | File ảnh (crop 1:1, ≤1MB) | Không | Upload thư mục `chanels-logo` |
| 4 | Hành động (ẩn) | `platform_action` | Hidden (`add`/`edit`) | — | |
| 5 | ID (ẩn) | `platform_id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `BookingPlatform`, ghi log hoạt động.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-022 (tab Nền tảng đặt phòng) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `platforms`).
