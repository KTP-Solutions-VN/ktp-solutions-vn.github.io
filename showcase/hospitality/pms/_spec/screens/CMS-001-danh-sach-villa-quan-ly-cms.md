# CMS-001 — Danh sách villa quản lý nội dung trang chủ (CMS Property List)

**Loại:** Trang đầy đủ

**Route:** `CmsController::list($id)` — mặc định `/cms/list/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Màn hình chọn villa để vào chỉnh sửa nội dung hiển thị trên trang chủ/website villa (CMS). Danh sách villa được lọc theo phân quyền Business Unit/Zone của user đăng nhập, hiển thị villa đang mở (`status = Open`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên villa | `Villa.name` | |
| 2 | Trạng thái | `Villa.status` | Luôn là "Open" do điều kiện lọc cứng |
| 3 | Loại villa | `villa_type_id` | Map sang tên từ bảng `VillaType` |
| 4 | Chủ sở hữu | `Owner.family_name` | |
| 5 | Khu vực | `area_id` | Map sang tên từ bảng `Area` (lấy qua `VillaLocation`) |

Sắp xếp mặc định: theo loại villa → khu vực → tên villa (tăng dần, dùng `array_multisort`).

Filter: dropdown chọn Business Unit/Zone (`id` — tham số GET/POST), khi chọn sẽ lưu cookie business unit và load lại danh sách villa/khu vực tương ứng theo phân quyền (`_getAuthBasedBuVilla`).

## Chức năng/nút thao tác
- **Chọn Business Unit/Zone:** lọc lại danh sách villa theo BU đã chọn.
- **Chọn villa (click dòng/tên villa):** mở màn hình CMS-002 (tab Welcome mặc định) của villa đó.

## Điều hướng
- Vào từ: menu chính (mục "Properties"/CMS, active_menu = 18).
- Điều hướng đến: CMS-002 (màn hình CMS chính theo villa, tab welcome mặc định).
