# VCS-003 — Danh sách Loại hình bất động sản (Property/Villa Type)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/villa-types (dashed mặc định: `/villa-common-setting/villa-types`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Loại hình bất động sản" (Villa Type), mỗi loại hình gắn với 1 Danh mục bất động sản (Property Category: Flat/House/Resort...). Khi thêm mới một Villa Type, hệ thống tự tạo bộ khu vực ảnh chuẩn (Photo Standard Areas) mặc định cho loại hình đó.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên loại hình) | `name` | Text | Không (chỉ hiển thị) | |
| 3 | Category (Danh mục) | `villa_categories_id` (hiển thị tên) | Text (map qua `villaCategory`) | Không (chỉ hiển thị) | Tên lấy từ bảng `VillaCategory`, thứ tự ưu tiên Flat/House/Resort |
| 4 | Updated (Cập nhật lúc/bởi) | `updated_at`/`updated_by` (fallback `created_at`/`created_by`) | Datetime (`d M y`) + tên người dùng | Không (chỉ hiển thị) | Qua contain `CreatedUser`/`UpdatedUser` |
| 5 | Action | — | Nút Edit/Delete | — | Mở popup VCS-003-P1 |

Danh sách sắp xếp theo `name`, không có ô tìm kiếm/lọc riêng.

## Chức năng/nút thao tác
- Nút "Add new" (`.add_villa_type`) → mở popup VCS-003-P1 ở chế độ Thêm mới; khi lưu thành công, hệ thống tự sinh 8 khu vực ảnh chuẩn (Drone, Exterior, Pool Day/Night, Living, Dining, Kitchen, Bedrooms & Bathrooms) kèm yêu cầu số lượng ảnh theo số phòng ngủ.
- Nút Edit (icon bút, `.edit_villa_type`) trên từng dòng → mở popup VCS-003-P1 ở chế độ Sửa (đổ `name` + `villa_categories_id`).
- Nút Delete (icon thùng rác, `.delete_villa_type`) trên từng dòng → mở popup VCS-003-P1 ở chế độ Xác nhận xóa.
- Submit form popup gửi `POST` về chính action `villaTypes`; lưu/xóa bảng `VillaType`, ghi Activity Log, hiển thị Flash message, redirect về trang trước.

## Điều hướng
- Mở từ: Menu Settings > "Properties" (Cấu hình chung villa) > submenu "Property Types".
- Điều hướng tới: không điều hướng sang trang khác.
- Popup con: VCS-003-P1 (Thêm/Sửa/Xóa Loại hình bất động sản).
