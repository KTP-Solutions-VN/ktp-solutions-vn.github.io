# TRN-001 — Học viện nhân viên (Staff Academy)

**Loại:** Trang đầy đủ
**Route:** `TrainingController::index()` — `/training/index` (mặc định, DashedRoute)
**Module:** TRN = Học viện nhân viên

## Mô tả ngắn gọn
Trang chủ/landing của module Học viện nhân viên. Hiển thị banner logo hệ thống (chỉ với người dùng không phải Employee) và không có dữ liệu nghiệp vụ; hoạt động như điểm vào khi người dùng chọn menu "Staff Academy".

## Mô tả chi tiết
Không có form hay danh sách dữ liệu trên trang này.

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Ảnh banner | `logo-dashboard.png` | Hình ảnh tĩnh | Không | Chỉ hiển thị khi `user_type != Employee` |

## Chức năng/nút thao tác
- Không có nút thao tác nghiệp vụ trên trang này (chỉ hiển thị banner).

## Điều hướng
- **Vào từ:** Menu chính của hệ thống, mục "Staff Academy".
- **Đi tới:** Không có liên kết điều hướng trực tiếp trong trang; các màn hình con khác của module (TRN-002, TRN-007, TRN-008, TRN-010, TRN-011) được truy cập qua menu điều hướng chung, không phải từ trang này.
