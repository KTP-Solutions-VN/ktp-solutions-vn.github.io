# PROP-059 — Buổi chụp sắp tới (Upcoming Shoots)

**Loại:** Trang đầy đủ
**Route:** property/shootings
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang liệt kê toàn bộ lịch chụp ảnh (Photography) đang ở trạng thái "Pending" (chưa hoàn thành), lọc theo Business Unit, áp dụng cho cả 3 cấp Property/Residence/Unit. Cho phép sửa hoặc xóa lịch chụp.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Không | Đổi giá trị → redirect lại trang, lưu cookie |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Type | `type` | Property/Residence/Unit |
| 3 | Name | `name` | Tên Property/Residence/Unit tương ứng |
| 4 | Photographer | `photographer_name` | Qua contain ServiceProvider |
| 5 | Plan | `plan` | Ngày dự kiến chụp, "Not Assigned" nếu chưa có ngày |
| 6 | Created | `created_by` | Người tạo + ngày tạo |
| 7 | Comment | `comment` | |
| 8 | Actions | — | Icon Edit (mở PROP-060), icon Delete (mở modal xác nhận) |

## Chức năng/nút thao tác
- Đổi Business Unit → reload danh sách theo BU.
- Icon Edit → mở PROP-060 (Sửa lịch chụp) tại `editShooting/{base64(id)}`.
- Icon Delete → mở modal xác nhận, gọi `deleteShooting/{base64(id)}`.

## Điều hướng
- Mở từ: PROP-019 (Lên lịch buổi chụp) hoặc menu Shoots (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: PROP-060 (Sửa lịch chụp — editShooting).
- Popup con: Modal xác nhận xóa (không tách mã riêng, thao tác phụ trợ tại chỗ).
