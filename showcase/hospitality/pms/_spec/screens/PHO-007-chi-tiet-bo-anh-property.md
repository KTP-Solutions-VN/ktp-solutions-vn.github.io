# PHO-007 — Album ảnh tài sản (Property Album)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::detail($villaId, $setType = 'ota')` — route mặc định `/photos/detail/:id/:set_type` (không khai báo route đẹp); dùng chung view `detail.ctp` với PHO-005 nhưng gọi mặc định (`$isResidence` rỗng/false) nên hiển thị đầy đủ panel Quality Score và Completeness Against Standard.

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Hiển thị chi tiết một bộ ảnh (theo `set_type`) của villa/property: lưới ảnh có gắn cờ (Essential/Bird view/AI/Night), KPI tổng quan, chấm điểm chất lượng theo 3 tiêu chí, bảng đối chiếu độ hoàn thiện so với tiêu chuẩn (PHO-008), upload thêm ảnh vào bộ, xem/tải/xoá từng ảnh, xoá cả bộ.

## Mô tả chi tiết

| # | Tên field/cột | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Chọn bộ ảnh khác (dropdown chuyển set) | `packOptions` | Dropdown + nút Load | Điều hướng nhanh giữa các set type cùng villa |
| 2 | Common Areas (nếu villa thuộc residence) | `commonAreaResidence` | Nút liên kết | Sang PHO-004 |
| 3 | Property Page | - | Nút liên kết | Quay lại PHO-006 |
| 4 | Agent Link | `photoRow['has_agent_link']`, `photoRow['agent_link']` | Nút liên kết (nếu có) hoặc nút "chưa khả dụng" | Mở link chia sẻ ảnh cho agent, hoặc điều hướng sang màn hình OTA management nếu chưa có link |
| 5 | KPI: Photos in pack / Essential shots / Score / Missing / AI & Night | `packStats` | Số liệu tổng quan | KPI "Score" và "Missing" chỉ hiện ở property (ẩn ở residence) |
| 6 | Lưới ảnh | `photoCards` | Grid, mỗi ảnh có checkbox chọn, cờ trạng thái, tên file | Cờ: Essential/Bird view(Drone)/AI/Night; lọc theo category khi set = OTA |
| 7 | Bảng lọc theo category (chỉ set OTA) | `photoCategories` | Dropdown filter | |
| 8 | Upload thêm ảnh vào bộ | `photos[]` (+ hidden `set_type`, `source=Internal Team`, `preserve_set_metadata=1`) | Upload nhiều file | Giữ nguyên metadata bộ ảnh hiện có |
| 9 | Chấm điểm chất lượng (Quality Score) | `qualityScores` | 3 thẻ tiêu chí, mỗi thẻ chọn điểm 1–3 (`updateQualityScore`, AJAX) | Final Score = trung bình 3 tiêu chí |
| 10 | Flag Guide | - | Bảng chú giải 4 loại cờ | Essential/Bird view/AI/Night |
| 11 | Completeness Against Standard | `completenessRows` | Bảng: Category/Flag, Required, Current, Progress (thanh %) | Đối chiếu với tiêu chuẩn cấu hình ở PHO-008 theo loại villa & số phòng ngủ |
| 12 | Xoá cả bộ ảnh | hidden `action=delete` | Submit ẩn qua modal xác nhận (dùng chung ở PHO-006) | Chỉ hiện nếu `canDeletePhotoSet`; sau khi xoá quay về PHO-006 |

## Chức năng/nút thao tác
- **Chuyển bộ ảnh (Load)**: đổi `set_type` xem bộ khác của villa.
- **Chọn nhiều ảnh** (checkbox), gắn cờ hàng loạt (Essential/Bird view/AI/Night — `updateTags`, AJAX), xoá hàng loạt (`deletePhotos`, AJAX — không có view riêng).
- **Lọc theo category** (chỉ bộ OTA).
- **Xem ảnh** (preview modal, điều hướng ảnh trước/sau), **Tải ảnh** (`downloadPhoto`, AJAX/file — không có view riêng), **Xoá ảnh** (`deletePhoto`, AJAX — chỉ hiện nếu `canDeletePhotoSet`).
- **Upload thêm ảnh vào bộ hiện tại**.
- **Chấm điểm chất lượng theo từng tiêu chí** (1–3 điểm, `updateQualityScore`, AJAX, cập nhật Final Score theo thời gian thực).
- **Xoá cả bộ ảnh** — quay lại PHO-006 sau khi xoá.
- **Property Page / Common Areas / Agent Link**: điều hướng nhanh.

## Điều hướng
- Vào từ: PHO-006 (nút Open trên card bộ ảnh), PHO-002 (link nhanh tới bộ OTA).
- Điều hướng đến: PHO-006 (Thư viện ảnh tài sản, sau khi xoá bộ ảnh), PHO-004 (Common Areas của residence chứa villa), màn hình OTA management (khi chưa có Agent Link, thuộc module khác).
