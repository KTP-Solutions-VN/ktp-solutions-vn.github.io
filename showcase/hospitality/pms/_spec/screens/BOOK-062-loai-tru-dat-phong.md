# BOOK-062 — Loại trừ khỏi báo cáo (Report Exclusions)

**Loại:** Trang đầy đủ
**Route:** Booking/exception/:tab? (mặc định: `/booking/exception`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Quản lý danh sách từ khoá (keyword — thường là tên khách) được loại trừ khỏi các báo cáo/thống kê đặt phòng theo 4 nhóm: loại trừ toàn phần (Complete), giá trị bằng 0 (Nill Value), loại trừ sớm (Early), loại trừ muộn (Late). Dùng để lọc các booking nội bộ/chủ nhà tự ở ra khỏi số liệu kinh doanh.

## Mô tả chi tiết

### Tab
| # | Tab | Field code |
|---|---|---|
| 1 | Complete | `complete` |
| 2 | Nill Value | `nill_value` |
| 3 | Early | `early` |
| 4 | Late | `late` |

### Field (mỗi tab)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Từ khoá | `keyword` | Text | Có | Thường là tên/họ khách cần loại trừ |

### Danh sách mỗi tab
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Keyword | |
| 2 | Actions | Sửa/Xoá |

## Chức năng/nút thao tác
- Thêm từ khoá loại trừ theo tab đang chọn
- Sửa từ khoá
- Xoá từ khoá (ghi log hoạt động)
- Kiểm tra trùng từ khoá trước khi lưu (`keywordCheck`)

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Report Exclusions
