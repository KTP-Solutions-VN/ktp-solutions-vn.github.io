# OPR-003 — Danh sách công việc hồ bơi

**Loại:** Trang đầy đủ
**Route:** operator/pools/:tab? + route đẹp dạng dashed: operator/pools
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình danh sách các công việc vệ sinh/bảo dưỡng hồ bơi (pool cleaning) đã thực hiện, xem theo 2 tab: "By Date" (theo ngày) và "By Property" (theo villa), có bộ lọc business unit + ngày/villa. Cấu trúc và hành vi tương tự OPR-002 (Danh sách công việc vườn) nhưng áp dụng cho hồ bơi.

## Mô tả chi tiết

### Bộ lọc chung
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select2 | Áp dụng cho cả 2 tab; đổi sẽ load lại trang với query `business_unit`, đồng thời set cookie business unit |
| 2 | Ngày (tab "By Date") | `date` | Datepicker, nút mũi tên trái/phải | Mặc định ngày hiện tại; lọc theo `PoolCleaning.start_time` |
| 3 | Villa (tab "By Property") | `villa` | Select2 (villa có `VillaDetail.is_pool = yes`, status Open) | Lọc `PoolCleaning.villa_id` |

### Cột hiển thị (cả 2 tab, tab "By Property" có thêm cột Date)
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Property (villa) | `villa.name` | |
| 2 | Service | `garden_service.name` | |
| 3 | Operator | `operators_name` | Ghép từ `pool_worker_ids` |
| 4 | Start | `start_time` | |
| 5 | End | `end_time` | |
| 6 | GPS | `gps` (OK/NOK) | Bấm mở modal khoảng cách start/end tới tọa độ villa |
| 7 | Plan | `is_planned` (Yes/No) | |
| 8 | Actions | — | Xem chi tiết, Tải PDF, Xóa |

## Chức năng/nút thao tác
- **Tab By Date / By Property**: chuyển view (dữ liệu render sẵn ở cả 2 bảng qua element `operator/pool/by_date` và `operator/pool/by_property`).
- **Xem chi tiết (icon mắt)**: mở OPR-004 — Xem chi tiết công việc hồ bơi (`poolView`).
- **Tải PDF (icon download)**: tải file báo cáo nếu đã có.
- **Xóa (icon thùng rác)**: submit ẩn `is_delete=yes` qua form `action_form`, xóa `PoolCleaning` liên quan (có modal xác nhận `exampleModal`).
- **GPS badge**: mở modal `gps_modal` hiển thị bảng Thời gian / Khoảng cách tới villa.

## Điều hướng
- Vào từ: menu "Pool" (vận hành hồ bơi) trong sidebar.
- Đi tới: OPR-004 — Xem chi tiết công việc hồ bơi.
