# CMS-005 — Khối nội dung dùng chung (Shared Content Blocks)

**Loại:** Trang đầy đủ

**Route:** `CmsController::commonText()` — mặc định `/cms/common-text`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Trang trung gian dạng menu, gồm các nút bấm dẫn đến từng nhóm màn hình quản lý nội dung website dùng chung (không gắn riêng theo villa) như Book-Direct Benefits, Concierge Showcase, Partner Badges, Destination Guides, Enquiry Forms, Service Showcase, Experience Wishlist, Travel Journal, Aggregator Destinations, Themed Site Snippets, Getting-There Guides. Bản thân màn hình không có dữ liệu hay form nhập liệu nào.

## Mô tả chi tiết
Không có bảng dữ liệu/form. Nội dung chỉ gồm 11 nút liên kết (button-link) bố trí dạng lưới:

| # | Tên nút | Điều hướng đến (URL) | Ghi chú |
|---|---|---|---|
| 1 | Book-Direct Benefits | `why-us` | CMS-006 |
| 2 | Concierge Showcase | `concierges` | CMS-018 |
| 3 | Partner Badges | `logos` | CMS-009 |
| 4 | Destination Guides | `destination` | CMS-012 |
| 5 | Enquiry Forms | `contact-form` | CMS-016 |
| 6 | Service Showcase | `cms-services-list` | CMS-003 |
| 7 | Experience Wishlist | `i-wish` | CMS-028 (ngoài phạm vi tài liệu này) |
| 8 | Travel Journal | `insights` | CMS-026 (ngoài phạm vi tài liệu này) |
| 9 | Aggregator Destinations | `destination-global` | CMS-014 |
| 10 | Themed Site Snippets | `collection-common-text` | CMS-024 (ngoài phạm vi tài liệu này) |
| 11 | Getting-There Guides | `arrival` | CMS-030 (ngoài phạm vi tài liệu này) |

## Chức năng/nút thao tác
- **Click từng nút:** điều hướng full-page sang màn hình quản lý nội dung tương ứng (không phải popup/AJAX).

## Điều hướng
- Vào từ: menu Settings (breadcrumb "Settings").
- Điều hướng đến: CMS-006, CMS-009, CMS-012, CMS-016, CMS-003, CMS-014 và các màn hình khác nằm ngoài phạm vi tài liệu này (Experience Wishlist, Travel Journal, Themed Site Snippets, Getting-There Guides).
