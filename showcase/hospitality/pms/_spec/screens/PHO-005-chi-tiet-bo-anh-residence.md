# PHO-005 — Chi tiết album khu vực chung (Shared Space Album)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — route đẹp `/photos/residence/:id/:set_type` (khai báo tường minh); dùng chung view `detail.ctp` với PHO-007 nhưng gọi tường minh qua `$this->render('detail')` với `$isResidence = true` (ẩn bớt panel Quality Score/Completeness so với PHO-007).

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Hiển thị chi tiết một bộ ảnh (theo `set_type`, ví dụ OTA/High Res) thuộc khu vực chung của residence: lưới ảnh, gắn cờ (Essential/Bird view/AI/Night), tải thêm ảnh vào bộ, xem/tải/xoá từng ảnh.

## Mô tả chi tiết

| # | Tên field/cột | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Chọn bộ ảnh khác (dropdown chuyển set) | `packOptions` | Dropdown + nút Load | Điều hướng nhanh giữa các set type cùng residence |
| 2 | Lưới ảnh | `photoCards` | Grid, mỗi ảnh có checkbox chọn, cờ trạng thái, tên file | Cờ: Essential/Bird view(Drone)/AI/Night |
| 3 | Upload thêm ảnh vào bộ | `photos[]` (+ hidden `set_type`, `source`, `preserve_set_metadata=1`) | Upload nhiều file | Giữ nguyên metadata bộ ảnh hiện có |

Không có panel Quality Score / Completeness Against Standard (chỉ áp dụng cho property villa ở PHO-007).

## Chức năng/nút thao tác
- **Chuyển bộ ảnh (Load)**: đổi `set_type` xem bộ khác của residence.
- **Chọn nhiều ảnh** (checkbox) để thao tác hàng loạt (xoá — dùng action `deletePhotos`, AJAX, không có view riêng).
- **Xem ảnh** (preview), **Tải ảnh** (`downloadPhoto`, AJAX/file download — không có view riêng), **Xoá ảnh** (`deletePhoto`, AJAX — chỉ hiện nếu có quyền xoá bộ ảnh, `canDeletePhotoSet`).
- **Upload thêm ảnh vào bộ hiện tại**.
- **Xoá cả bộ ảnh** (`action=delete` submit ẩn) — quay lại PHO-004 sau khi xoá.
- **Common Areas / Residence Page**: quay lại PHO-003/PHO-004.

## Điều hướng
- Vào từ: PHO-004 (chọn set) hoặc PHO-003 (nút mở nhanh set).
- Điều hướng đến: PHO-004 (Khu vực chung theo khu căn hộ), PHO-003 (Shared Space Albums).
