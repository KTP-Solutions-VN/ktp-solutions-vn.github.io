# VSV-022 — Phân loại kết quả kiểm tra (Inspection Triage)

**Loại:** Popup (mở từ VSV-021, dạng trang riêng)

**Route:** `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspection_key>`

**Module:** Dịch vụ lưu trú — Kiểm tra

## Mô tả ngắn gọn
Trang trung gian trước khi xử lý một báo cáo kiểm tra: tóm tắt villa/người kiểm tra/thời điểm/số lượng hạng mục, cho phép đặt hạn xử lý chung và gán người phụ trách theo từng bộ phận (Maintenance, Cleaning, Purchasing, Gardening, Renovation) tương ứng với các hạng mục phát hiện, trước khi bắt đầu (Start) vào màn hình xử lý chi tiết.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tóm tắt báo cáo | — | Text (đọc) | — | Villa, người kiểm tra, thời điểm, số lượng task; nếu đã duyệt thì thêm người duyệt/ngày duyệt |
| 2 | Set Global Due Date | `date_planning` | Text (datepicker) | Không | Chỉ hiện với người dùng không phải Team Leader |
| 3 | Maintenance | `maintenance[]` | Select (select2) | Có, nếu bộ phận này xuất hiện trong hạng mục kiểm tra | Chỉ hiện nếu báo cáo có hạng mục thuộc bộ phận này |
| 4 | Cleaning | `cleaners[]` | Select (select2) | Có, nếu tương ứng | |
| 5 | Purchasing | `purchasing[]` | Select (select2) | Có, nếu tương ứng | |
| 6 | Gardening | `gardening[]` | Select (select2) | Có, nếu tương ứng | |
| 7 | Renovation | `renovation[]` | Select (select2) | Có, nếu tương ứng | |

- Với Team Leader: không hiển thị phần đặt hạn xử lý/gán bộ phận — chỉ xem tóm tắt rồi bấm Start.
- Mỗi select bộ phận đều có label lỗi "Please Select the supervisor." nếu bỏ trống khi bộ phận đó bắt buộc.

## Chức năng/nút thao tác
- **Start**: nếu báo cáo đã có tiến trình dở dang → hiện modal xác nhận "Do you wish to continue the report?" (Yes tiếp tục, No làm lại); sau đó điều hướng sang VSV-022-P1 (`inspectionEditDetails`) để xử lý từng hạng mục.

## Điều hướng
- Vào từ: VSV-021 — nút "Edit" trên từng báo cáo.
- Điều hướng đến: VSV-022-P1 (Xử lý hạng mục kiểm tra).
