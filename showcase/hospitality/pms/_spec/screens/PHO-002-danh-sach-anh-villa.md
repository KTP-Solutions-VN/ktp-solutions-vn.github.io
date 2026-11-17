# PHO-002 — Danh sách villa quản lý ảnh (Photo Sets)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::index()` — mặc định `/photos/index` (hoặc `/photos/`)

**Module:** PHO = Hình ảnh

## Mô tả ngắn gọn
Trang chủ (landing page) của module Photos: liệt kê tất cả villa theo phân quyền Business Unit, hiển thị bộ ảnh (photo set) hiện có của từng villa, điểm chất lượng (score), trạng thái agent link, cho phép tìm kiếm/lọc nhanh và có KPI tổng hợp toàn hệ thống.

## Mô tả chi tiết

KPI (status strip): Properties (tổng số villa), OTA ready (số villa có bộ ảnh OTA), No agent link (số villa chưa có link cho agent), Average score (điểm trung bình).

Danh sách (dạng thẻ/card, không phải bảng truyền thống):
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property (thumbnail + tên villa) | `villa.name`, `thumbnail` | Click mở PHO-006 (property) |
| 2 | Available sets | `sets` | Danh sách nút mở nhanh từng bộ ảnh (OTA/High-res/Extras/...), trỏ tới PHO-007 (detail) |
| 3 | Score | `score` | Màu theo ngưỡng: xanh ≥2.5, vàng ≥2, đỏ <2 |
| 4 | Agent link | `has_agent_link`, `agent_link` | Nút Copy (nếu đã có link) hoặc Create (nếu chưa) |
| 5 | Quick actions | - | Download bộ OTA, Open (mở bộ ảnh hoặc trang property), Upload (mở property kèm anchor upload) |

Filter/tìm kiếm:
- Business Unit/Zone: dropdown `id` (lưu cookie khi đổi).
- Quick filter: `quick_filter` = All properties / OTA ready / No agent link.
- Tìm kiếm text: `q` (theo tên villa).
- Phân trang: `page`, `per_page` (10/25/50/100, mặc định 25).

## Chức năng/nút thao tác
- **Lọc theo Business Unit/Zone**, **Quick filter**, **Tìm kiếm theo tên**, **Đổi số dòng/trang (per_page)**, **Chuyển trang**.
- **Mở property** (click card): sang PHO-006.
- **Mở bộ ảnh cụ thể** (click nút set): sang PHO-007 (detail) theo `set_type`.
- **Download bộ ảnh OTA**: tải file (action `download`, không có view riêng).
- **Copy/Create agent link**: sao chép liên kết chia sẻ ảnh cho agent (dữ liệu lấy sẵn, không mở màn hình mới).
- **Upload nhanh**: mở PHO-006 với neo cuộn tới khu upload.

## Điều hướng
- Vào từ: menu Photography/Photos (active_menu = 185) — đây là màn hình gốc của module Photos.
- Điều hướng đến: PHO-006 (property), PHO-007 (detail).
