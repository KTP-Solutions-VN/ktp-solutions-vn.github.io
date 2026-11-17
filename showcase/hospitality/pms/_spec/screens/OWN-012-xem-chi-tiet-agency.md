# OWN-012 — Xem chi tiết Agency

**Loại:** Popup (mở từ OWN-009)

**Route:** `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Trang chi tiết (chỉ đọc) thông tin một Agency: tên, quốc gia, ngày bắt đầu, trạng thái, số điện thoại, website, email, logo và business unit phụ trách.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên Agency | `agency_name` | Text (readonly) | — | |
| 2 | Tên viết tắt | `short_name` | Text (readonly) | — | |
| 3 | Quốc gia | `country` | Text (readonly) | — | |
| 4 | Ngày bắt đầu | `start_date` | Date (readonly) | — | Định dạng `Y-m-d` |
| 5 | Trạng thái | `status` | Text (readonly) | — | |
| 6 | Số điện thoại | `phone_number` | Text (readonly) | — | |
| 7 | Website | `website` | Text (readonly) | — | |
| 8 | Email | `email` | Text (readonly) | — | |
| 9 | Logo | `logo` | Hình ảnh (readonly) | — | |
| 10 | Business Unit | `selected_user_business_unit` | Text (readonly) | — | Danh sách tên business unit, phân cách bởi dấu phẩy |

## Chức năng/nút thao tác

- Chỉ xem thông tin, không có nút chỉnh sửa.

## Điều hướng

- Mở từ: OWN-009 (icon con mắt "View Agency Details" trên từng dòng).
- Không điều hướng tiếp tới màn hình con nào khác.
