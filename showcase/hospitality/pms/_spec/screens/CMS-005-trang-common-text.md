# CMS-005 — Trang Common Text (menu điều hướng nội dung CMS chung)

**Loại:** Trang đầy đủ

**Route:** `CmsController::commonText()` — mặc định `/cms/common-text`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Trang trung gian dạng menu, gồm các nút bấm dẫn đến từng nhóm màn hình quản lý nội dung website dùng chung (không gắn riêng theo villa) như Why Us, Concierge, Logo, Destination, Contact Form, Services, I Wish, Insights, Destination Global, Common Texts (Collection), Arrival. Bản thân màn hình không có dữ liệu hay form nhập liệu nào.

## Mô tả chi tiết
Không có bảng dữ liệu/form. Nội dung chỉ gồm 11 nút liên kết (button-link) bố trí dạng lưới:

| # | Tên nút | Điều hướng đến (URL) | Ghi chú |
|---|---|---|---|
| 1 | Why Us | `why-us` | CMS-006 |
| 2 | Concierge | `concierges` | CMS-018 |
| 3 | Logo | `logos` | CMS-009 |
| 4 | Destination | `destination` | CMS-012 |
| 5 | Contact Form | `contact-form` | CMS-016 |
| 6 | Services | `cms-services-list` | CMS-003 |
| 7 | I Wish | `i-wish` | CMS-028 (ngoài phạm vi tài liệu này) |
| 8 | Insights | `insights` | CMS-026 (ngoài phạm vi tài liệu này) |
| 9 | Destination Global | `destination-global` | CMS-014 |
| 10 | Common Texts | `collection-common-text` | CMS-024 (ngoài phạm vi tài liệu này) |
| 11 | Arrival | `arrival` | CMS-030 (ngoài phạm vi tài liệu này) |

## Chức năng/nút thao tác
- **Click từng nút:** điều hướng full-page sang màn hình quản lý nội dung tương ứng (không phải popup/AJAX).

## Điều hướng
- Vào từ: menu Settings (breadcrumb "Settings").
- Điều hướng đến: CMS-006, CMS-009, CMS-012, CMS-016, CMS-003, CMS-014 và các màn hình khác nằm ngoài phạm vi tài liệu này (I Wish, Insights, Collection Common Text, Arrival).
