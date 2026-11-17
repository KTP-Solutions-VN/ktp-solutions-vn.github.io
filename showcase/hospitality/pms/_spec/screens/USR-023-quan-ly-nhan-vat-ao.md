# USR-023 — Quản lý Nhân vật ảo (Virtual Users)

**Loại:** Trang đầy đủ

**Route:** `UserController::virtualUsers()` — mặc định `user/virtualUsers`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Trang quản lý thư viện "nhân vật ảo" (avatar đại diện theo giới tính/bộ phận/quốc gia) dùng cho các bộ phận vận hành (concierge, dọn phòng, bảo trì, cải tạo, làm vườn, hồ bơi...). Chỉ Superadmin được truy cập. Cho phép lọc theo quốc gia/giới tính/bộ phận, thêm mới hoặc sửa một nhân vật ảo qua panel (drawer) ngay trên trang.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `search[country][]` | Multi-select dạng nút chọn | Không | Mặc định "All countries" |
| 2 | Giới tính | `search[gender]` | Select dạng nút chọn | Không | Mr/Mrs |
| 3 | Bộ phận | `search[department][]` | Multi-select dạng checkbox | Không | concierge/cleaning/maintenance/renovation/garden/pool |

**Danh sách hiển thị:** dạng thẻ (card) ảnh đại diện, mỗi thẻ gồm: ảnh icon, danh xưng (Mr./Mrs.) + tên bộ phận, cờ quốc gia áp dụng.

**Form thêm/sửa (drawer/panel trong cùng trang):**

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Giới tính (danh xưng) | `gender` | Radio | Có | Mr/Mrs |
| 2 | Bộ phận | `department` | Radio | Có | concierge/cleaning/maintenance/renovation/garden/pool |
| 3 | Quốc gia áp dụng | `country[]` | Checkbox nhiều lựa chọn | Có | |
| 4 | Ảnh đại diện | `icon` | Ảnh cắt (crop) base64 | Không | Upload/cắt ảnh, mặc định dùng ảnh placeholder theo giới tính/bộ phận |
| 5 | ID bản ghi (khi sửa) | `edit_id` | Hidden | Không | |

## Chức năng/nút thao tác
- **Lọc:** submit ajax, danh sách card cập nhật theo điều kiện lọc, không tải lại trang.
- **Thêm mới:** mở panel thêm (ô "+" trên lưới thẻ), nhập giới tính/bộ phận/quốc gia/ảnh, gửi ajax tới `user/virtualUserSave`.
- **Sửa:** bấm vào thẻ để mở panel sửa với dữ liệu nạp sẵn, gửi ajax tới `user/virtualUserSave` kèm `edit_id`.
- **Xoá:** gọi `user/deleteVirtualUser/:id`.

## Điều hướng
- Vào từ: menu Users → Virtual Users (chỉ hiển thị/khả dụng với Superadmin).
- Không điều hướng sang trang khác (thao tác thêm/sửa thực hiện ngay trên trang qua ajax).
