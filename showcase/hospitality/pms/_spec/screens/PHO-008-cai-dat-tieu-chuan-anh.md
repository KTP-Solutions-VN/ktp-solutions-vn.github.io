# PHO-008 — Yêu cầu ảnh (Photo Requirements)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::settings()` — route mặc định `/photos/settings`

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Cấu hình số lượng ảnh yêu cầu cho từng khu vực (area/flag) theo từng loại villa (Property Type) và số phòng ngủ (1–8 BR). Dữ liệu này là nguồn tham chiếu cho bảng "Completeness Against Standard" ở PHO-007.

## Mô tả chi tiết

Bộ lọc:
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Type | `villa_type_id` | Dropdown (`villaTypes`) | Có | Chọn loại villa để load/lưu tiêu chuẩn tương ứng; mặc định loại đầu tiên |

Bảng tiêu chuẩn (`standardAreas`), mỗi dòng là một khu vực:
| # | Tên cột | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Area / Flag (icon + tên + ghi chú) | `areas[i][area_code]` (hidden), `areas[i][area_name]`, `areas[i][area_note]` | Text input (icon tự nhận diện theo tên/mã khu vực); các khu vực chuẩn (drone, exterior, pool_day, pool_night, living, dining, kitchen, bedrooms_bathrooms) không cho sửa tên/ghi chú (`readonly`) | Có (tên) | Khu vực tự thêm có thể sửa/xoá tự do |
| 2 | Số ảnh yêu cầu theo 1BR–8BR | `areas[i][requirements][1..8]` | Number input (0–999) | Không | Dòng "Total Required Photos" tự tính tổng theo cột (readonly) |

## Chức năng/nút thao tác
- **Load**: chọn Property Type khác rồi tải lại bảng tiêu chuẩn tương ứng (GET).
- **Add Area**: thêm dòng khu vực mới (client-side, chưa lưu cho tới khi bấm Save).
- **Xoá một khu vực tự thêm**: chỉ áp dụng cho khu vực không thuộc danh sách chuẩn.
- **Reset**: tải lại trang, huỷ thay đổi chưa lưu.
- **Save Photo Standard**: lưu toàn bộ bảng qua AJAX (`settings`, submit POST); hiển thị thông báo thành công/lỗi tại chỗ, không rời trang.
- **Tab điều hướng**: Photo Albums (PHO-002), Shared Spaces (PHO-003), Requirements (đang ở đây).

## Điều hướng
- Vào từ: PHO-002 / PHO-003 / PHO-004 / PHO-006 / PHO-007 (tab "Settings" trên thanh điều hướng chung của module Thư viện ảnh).
- Điều hướng đến: không có điều hướng tiếp theo (màn hình cấu hình độc lập); dữ liệu lưu tại đây được PHO-007 sử dụng để tính Completeness Against Standard.
