# MNT-006 — Chi phí sửa chữa (Repair Expenses)

**Loại:** Trang đầy đủ
**Route:** maintenance/cost/:id (id base64)
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Màn hình khai báo chi phí phát sinh cho một nhật ký bảo trì: danh sách các khoản chi (vật tư hoàn ứng, nhân công, vật tư sẵn có), mỗi khoản có loại, tên vật tư/nhân công, chi phí, hóa đơn đính kèm; tự tính tổng chi phí.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại khoản chi | `type[]` | Select (mỗi dòng) | Có | Giá trị: `reimbursement_material` (vật tư hoàn ứng), `labour` (nhân công), `available_material` (vật tư sẵn có) |
| 2 | Tên vật tư/nhân công | `material[]` | Text | Có | |
| 3 | Chi phí | `cost[]` | Text số | Có | Readonly (=0) nếu loại là `available_material` |
| 4 | Hóa đơn | `files[]` | Upload ảnh (mỗi dòng) | Không | Lưu vào `MaintenanceCost` (serialize theo loại) |
| 5 | Tổng chi phí | `total` | Text readonly (tự tính) | — | Tổng các `cost[]`, hoặc nhập tay nếu có |

## Chức năng/nút thao tác
- **Thêm dòng** (icon +): thêm một dòng khoản chi mới.
- **Xóa dòng**: loại khoản chi khỏi danh sách trước khi lưu.
- **Save** (submit `cost_form`): lưu/cập nhật bản ghi `MaintenanceCost` (dữ liệu serialize theo 3 nhóm loại), ghi log hoạt động, quay lại trang trước.

## Điều hướng
- Vào từ: MNT-005 — Hồ sơ yêu cầu sửa chữa (hoặc trực tiếp từ MNT-001).
- Đi tới: sau khi Save, quay lại trang gọi tới (referer).
