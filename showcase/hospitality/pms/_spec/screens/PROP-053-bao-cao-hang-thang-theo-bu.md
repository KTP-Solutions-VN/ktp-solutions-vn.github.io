# PROP-053 — Báo cáo chủ nhà theo đơn vị (Owner Reports by Unit)

**Loại:** Trang đầy đủ
**Route:** property/bu-reports
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang tra cứu danh sách bản tin/báo cáo hàng tháng (Monthly Report) đã gửi cho chủ nhà, lọc theo Business Unit và Tháng. Dữ liệu lấy từ bảng `MonthlyReport` (contain Villa, Owner).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (có option "All", hỗ trợ Zone) | Có (class `required`) | Đổi giá trị → submit, lưu cookie |
| 2 | Month | `month` | Select2 (Jan-Dec) | Có (class `required`) | Ghép với năm hiện tại thành `month-yy` để truy vấn |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property Name | `villa.name` | Qua contain Villa |
| 2 | Owner | `villa.owner.first_name`/`family_name` | Qua contain Villa→Owner |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | Icon xem/tải báo cáo |

## Chức năng/nút thao tác
- Chọn Business Unit + Month rồi submit (POST) → tải danh sách báo cáo hàng tháng đã gửi tương ứng.
- Icon Action trên từng dòng → xem/tải file báo cáo tương ứng (liên quan PROP-018 Monthly Report, PROP-024 Payment Report).

## Điều hướng
- Mở từ: Menu báo cáo chủ nhà (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác (chỉ lọc dữ liệu tại chỗ); có liên hệ dữ liệu với PROP-018 (Bản tin chủ nhà).
- Popup con: Không có.
