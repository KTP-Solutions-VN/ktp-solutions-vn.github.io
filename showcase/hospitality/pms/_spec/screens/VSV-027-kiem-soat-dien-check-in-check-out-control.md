# VSV-027 — Kiểm soát điện check-in/check-out (bản cũ — Control)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::control()` — mặc định `/villa-services/control`; dữ liệu điều hướng theo ngày tải qua AJAX `getElecricutyControlAjax`

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Phiên bản kiểm soát điện check-in/check-out kiểu cũ, gộp chung trong một trang: liệt kê villa check-out trong ngày còn thiếu chỉ số/thanh toán điện (dải màu đỏ) và villa check-in trong ngày còn thiếu chỉ số điện đầu kỳ (dải màu xanh), điều hướng qua lại giữa các ngày bằng nút mũi tên/lịch. Chức năng này đã được thay thế bằng hai màn hình chi tiết hơn là VSV-011 (`electricityCheckInControl`) và VSV-012 (`electricityCheckOutControl`) nhưng route/action vẫn còn tồn tại trong hệ thống.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | Không | |
| 2 | Ngày Check-out | date picker trong dải "CHECK-OUT-<ngày>" | Date | Không | Điều hướng lùi/tiến ngày bằng mũi tên hoặc chọn lịch |
| 3 | Ngày Check-in | date picker trong dải "CHECK-IN-<ngày>" | Date | Không | Tương tự, độc lập với ngày check-out |

### Bảng Check-out trong ngày
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Villa có check-out trong ngày còn thiếu chỉ số/hóa đơn/tiền thu |
| 2 | Check-out by | Người thực hiện (hiện chưa gán dữ liệu — luôn rỗng) |
| 3 | Check-in information | "OK" nếu đã có chỉ số đầu kỳ, "Missing" nếu chưa |

### Bảng Check-in trong ngày
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Villa có check-in trong ngày còn thiếu chỉ số đầu kỳ |
| 2 | Check-in by | Người thực hiện (hiện chưa gán dữ liệu — luôn rỗng) |

## Chức năng/nút thao tác
- Đổi Business Unit → tải lại cả 2 bảng qua AJAX.
- Điều hướng ngày (mũi tên trái/phải hoặc chọn lịch) cho từng bảng độc lập.
- Không có nút thao tác thêm/sửa/xóa trực tiếp trên trang này.

## Điều hướng
- Vào từ: Menu chính (đường dẫn cũ, có thể không còn liên kết trực tiếp từ UI hiện hành do đã có VSV-011/VSV-012 thay thế).
- Điều hướng đến: không có trang con.
