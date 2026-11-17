# MNT-002 — Thêm nhật ký bảo trì mới

**Loại:** Trang đầy đủ
**Route:** maintenance/add
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình tạo mới một nhật ký bảo trì (Maintenance log/task): chọn villa, danh mục bảo trì (mức ưu tiên tự gán theo danh mục), nhập mô tả sự cố và đính kèm ảnh minh chứng (nhiều ảnh, thêm động).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `villa` | Select2 | Có | Danh sách villa theo quyền business unit của user |
| 2 | Danh mục bảo trì | `maintenance_category_id` | Select2 | Có | Khi đổi, tự động chọn radio mức ưu tiên tương ứng (map `data_c_p`) |
| 3 | Mức ưu tiên | `maintenance_priority_id` | Radio (readonly, tự chọn theo danh mục) | Có | Không cho người dùng tự chọn tay, phụ thuộc danh mục |
| 4 | Mô tả | `description` | Textarea | Có | |
| 5 | Ảnh minh chứng | `files[]` | Upload ảnh (nhiều ảnh, nút "+" thêm ô ảnh mới) | Không | Lưu vào bảng `MaintenanceMedia` |

## Chức năng/nút thao tác
- **Save**: lưu bản ghi `Maintenance` (status mặc định `Pending`, `due_date` tính theo `response_time` của mức ưu tiên, `availability` = ngày hiện tại + 3 ngày), upload ảnh vào `MaintenanceMedia`, ghi log hoạt động, hiển thị thông báo thành công và chuyển về MNT-001.
- **Thêm ảnh** (icon +): thêm một ô upload ảnh mới.
- **Cancel**: quay lại MNT-001.

## Điều hướng
- Vào từ: nút "+" trên màn hình MNT-001 — Danh sách nhật ký bảo trì.
- Đi tới: sau khi Save, quay về MNT-001.
