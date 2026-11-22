# TXT-001-P2 — Thêm ngôn ngữ mô tả (Add Description Languages)

**Loại:** Popup (mở từ TXT-001, tab Languages)

**Route:** Modal tĩnh trong `index.ctp` (`#texts-language-modal`); lưu qua AJAX `TextsController::saveLanguages()` — `POST /texts/save-languages`

**Module:** TXT = Kho mô tả

## Mô tả ngắn gọn
Cho phép bật thêm một hoặc nhiều ngôn ngữ khách (guest language) khả dụng cho một quốc gia đang có property hoạt động, phục vụ việc dịch nội dung OTA.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country_id` | Select (chỉ các quốc gia đang có property active) | Có | |
| 2 | Ngôn ngữ khách khả dụng | `language_ids[]` | Multi-select dạng lưới ô chọn | Có (tối thiểu 1) | Ẩn các ngôn ngữ đã được thêm cho quốc gia đó |

## Chức năng/nút thao tác
- **Add selected:** lưu các ngôn ngữ mới vào `OtaTextLanguages` cho quốc gia đã chọn, cập nhật lại danh sách trên tab Languages của TXT-001.
- **Cancel:** đóng modal không lưu.

## Điều hướng
- Mở từ: nút "Add language" trên tab Languages của TXT-001.
- Sau khi lưu: đóng modal, làm mới danh sách ngôn ngữ trên TXT-001.
