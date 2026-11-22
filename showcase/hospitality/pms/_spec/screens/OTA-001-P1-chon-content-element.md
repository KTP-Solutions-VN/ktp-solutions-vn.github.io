# OTA-001-P1 — Chọn thành phần listing (Pick Listing Elements)

**Loại:** Popup (mở từ OTA-001)

**Route:** Modal tĩnh trong `listing.ctp`; lưu lựa chọn qua AJAX `OtaContentController::assignElements($platformId)` — `POST /ota-content/assign-elements/:platformId`

**Module:** OTA = Nội dung kênh

## Mô tả ngắn gọn
Hộp thoại liệt kê toàn bộ Content Element đang khả dụng ("Available for") với OTA hiện tại, nhóm theo scope, cho phép tick chọn để đưa vào (hoặc bỏ khỏi) phần listing.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Content Element được chọn | `assignment_element[]` | Checkbox (mỗi dòng: tên, nhóm, độ dài) | Không | Đã tick sẵn các phần tử đang được gán (assigned) |

Nếu không có Content Element nào khả dụng, hiển thị thông báo hướng dẫn bật "Available for" ở tab Content Elements.

## Chức năng/nút thao tác
- **Save:** gửi AJAX `assign_elements`, đồng bộ trạng thái gán (is_assigned) và thứ tự cho từng scope, cập nhật lại bảng trên OTA-001, hiển thị toast thành công.
- **Cancel/Close (x):** đóng modal không lưu.

## Điều hướng
- Mở từ: nút "Select Content Elements" trên OTA-001.
- Sau khi lưu: đóng modal, cập nhật lại nội dung OTA-001.
