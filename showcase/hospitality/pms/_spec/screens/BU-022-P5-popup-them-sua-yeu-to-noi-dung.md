# BU-022-P5 — Popup Thêm/Sửa yếu tố nội dung

**Loại:** Popup (mở từ BU-022, tab Yếu tố nội dung — chỉ Superadmin)

**Route:** Modal Bootstrap (`#ota-element-modal`) trong element `channel/content_elements.ctp`; submit AJAX tới `OtaContentController::createElement` / `editElement`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một Yếu tố nội dung OTA (Content Element) dùng khi soạn nội dung Listing cho từng nền tảng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên yếu tố nội dung | `name` | Text | Có | |
| 2 | Nhóm | `group_key` | Select | Có | |
| 3 | Phạm vi | `scope_key` | Select | Có | |
| 4 | Độ dài văn bản | `length_type` | Select (`No limit` / `Maximum`) | Không | |
| 5 | Số ký tự tối đa | `max_length` | Number | Có (khi chọn Maximum) | |
| 6 | Có thể dịch | `translatable` | Select (`Yes` / `No`) | Không | |
| 7 | Áp dụng cho | `platform_ids[]` | Checkbox (nhiều) | Có | Danh sách nền tảng đặt phòng |
| 8 | ID (ẩn) | `element_id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save:** gửi AJAX lưu yếu tố nội dung, tải lại bảng không reload trang.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-022 (tab Yếu tố nội dung) — nút "Add New", icon Sửa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `content-elements`).
