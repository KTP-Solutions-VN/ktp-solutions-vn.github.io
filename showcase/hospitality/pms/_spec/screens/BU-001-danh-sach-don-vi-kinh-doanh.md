# BU-001 — Đơn vị vận hành (Operating Units)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::list()` — mặc định `/business-unit/list`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Danh sách toàn bộ đơn vị kinh doanh (Business Unit) trong hệ thống, sắp xếp theo tên quốc gia rồi theo tên đơn vị. Cho phép lọc theo trạng thái Đang hoạt động/Tạm dừng, xem chi tiết, sửa, xóa và bật/tắt trạng thái hoạt động ngay trên danh sách.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự tăng dần |
| 2 | Quốc gia | `country_id` → `country_name` | |
| 3 | Tên đơn vị kinh doanh | `name` | |
| 4 | Tên viết tắt | `short_name` | |
| 5 | Logo | `logo` | Ảnh thumbnail 100x100, mặc định `no-image.gif` nếu trống |
| 6 | Đơn vị pháp nhân | `company_id` → tên công ty, kèm tên chi nhánh `company_subsidiary.short_name` | |
| 7 | Ngày tạo | `created_at` | Định dạng `d M y` |
| 8 | Hành động | — | Xem, Sửa, Xóa, Bật/tắt trạng thái |

Bộ lọc: nút "Show Active" / "Show Paused" (toggle qua field ẩn `paused_stop_show`, lưu tuỳ chọn hiển thị theo user đang đăng nhập).

## Chức năng/nút thao tác
- **Add new:** điều hướng sang BU-002 (Thêm đơn vị vận hành).
- **Xem (icon mắt):** điều hướng sang BU-004 (Xem chi tiết) — `action=viewDetails`.
- **Sửa (icon bút):** điều hướng sang BU-003 (Sửa) — `action=edit`, id được `base64_encode`.
- **Xóa (icon thùng rác):** mở popup BU-001-P1 xác nhận xóa; xác nhận sẽ điều hướng tới `delete/{id}` (id mã hoá base64 bằng JS `btoa`).
- **Toggle bật/tắt (icon toggle):** gọi AJAX ẩn tới action `updateBusinessUnitStatus` để chuyển trạng thái Active ⇄ Paused; nếu chuyển sang Paused sẽ đồng thời cập nhật trạng thái các Villa liên quan (chuyển Villa đang Open sang Paused, gỡ villa khỏi vị trí "business_unit_id_2" nếu trùng).
- **Show Active/Show Paused:** đổi điều kiện lọc danh sách theo `BusinessUnit.status`.

## Điều hướng
- Vào từ: menu chính > Đơn vị vận hành.
- Điều hướng đến: BU-002 (Thêm mới), BU-003 (Sửa), BU-004 (Xem chi tiết), BU-001-P1 (popup xác nhận xóa).
