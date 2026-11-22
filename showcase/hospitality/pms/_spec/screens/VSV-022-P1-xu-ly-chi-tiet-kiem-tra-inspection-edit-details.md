# VSV-022-P1 — Xử lý hạng mục kiểm tra (Resolve Inspection Items)

**Loại:** Popup (mở từ VSV-021 hoặc VSV-022, dạng trang riêng)

**Route:** `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDetails?id=<inspection_key>[&view=default|teamlead]`

**Module:** Dịch vụ lưu trú — Kiểm tra

## Mô tả ngắn gọn
Màn hình xử lý (kanban dạng thẻ) từng hạng mục phát hiện trong báo cáo kiểm tra: mỗi thẻ hiển thị ảnh "trước/sau", mô tả lỗi, dịch vụ/vị trí liên quan, người phụ trách xử lý, và các nút chuyển trạng thái xử lý (bắt đầu, tạm dừng, hoàn tất, yêu cầu duyệt lại...). Giao diện và quyền thao tác thay đổi tùy vai trò người dùng (Admin/BU Manager xem toàn bộ và gán việc; Team Leader/nhân viên xử lý xem phần việc được giao).

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa / Inspection by | `Villa.name`, `Users` | Text (đọc) | — | Header trang |
| 2 | Trạng thái duyệt scope | `InspectionManager` | Text (đọc) | — | "Confirm scope of work" hoặc đã xác nhận bởi ai/ngày nào |
| 3 | Supervisor theo bộ phận | `Cleaner/Maintenance/Purchasing/Renovation/Gardening` | Text (đọc) | — | Chỉ hiển thị bộ phận có phát sinh hạng mục |
| 4 | Ảnh Before | `InspectionDetails.uploaded_inspection_img` | Ảnh (đọc) | — | Mỗi thẻ hạng mục |
| 5 | Ảnh After | `InspectionDetails.agent_uploaded_img` | Ảnh (đọc) | — | Chỉ hiện khi Team Leader xem hạng mục đang/đã xử lý |
| 6 | Description | `description` | Textarea/Text | Có (khi trạng thái = Help, do Team Leader nhập) | Các trạng thái khác hiển thị chỉ đọc |
| 7 | Select Service | `id_inspection_service_<key>` | Select (select2) | Có (vai trò không phải Team Leader) | Đổi dịch vụ sẽ nạp lại danh sách người phụ trách tương ứng |
| 8 | Select Location | `id_location_service_<key>` | Select (select2) | Có (vai trò không phải Team Leader) | |
| 9 | Operator/Agent | `agent[]` | Select (select2) | Có (khi trạng thái cho phép gán) | Danh sách theo vai trò dịch vụ (Cleaning/Maintenance/Garden/Pool) hoặc theo đội dọn dẹp (Cleaning Team + ngày) |
| 10 | Operator Comment | — | Text (đọc) | — | Bình luận của người xử lý khi hoàn tất/yêu cầu hỗ trợ |

### Nút hành động theo trạng thái hạng mục (mỗi thẻ)
| # | Nút | Field code | Ghi chú |
|---|---|---|---|
| 1 | Update | `update-btn` (value=`update`) | Lưu thay đổi service/location/agent cho hạng mục |
| 2 | Ready | `update-btn` (value=`ready`) | Đánh dấu sẵn sàng xử lý |
| 3 | Pause / Unpause | `pause-btn` / `unpause-btn` | Tạm dừng/tiếp tục xử lý hạng mục |
| 4 | Validate | `update-btn` (value=`validate`) | Xác nhận hạng mục đã xử lý đúng |
| 5 | Rework | `delete-btn` (value=`rework`) | Yêu cầu làm lại |
| 6 | Delete | `delete-btn` (value=`delete`) | Xóa hạng mục khỏi báo cáo (`deleteInspectionPoint`) |
| 7 | Launch | `finish-btn` (value=`launch`) | Đưa hạng mục vào hàng chờ khởi chạy xử lý |
| 8 | Approve (toàn báo cáo) | `finish-btn` (value=`launch_approve`) | Chỉ hiện khi mọi hạng mục đã hoàn tất — duyệt và đóng báo cáo |

## Chức năng/nút thao tác
- Xem chi tiết đã liệt kê ở bảng trên; mọi thay đổi phải bấm **Update** để lưu (có cảnh báo "Please remember to click the update button...").
- Điều hướng quay lại bằng nút mũi tên (Back) → về VSV-021.
- Tham số `view=default`/`view=teamlead` đổi góc nhìn hiển thị (toàn bộ hạng mục theo vai trò mặc định hoặc theo góc nhìn Team Leader).

## Điều hướng
- Vào từ: VSV-021 (Edit Progress) hoặc VSV-022 (sau khi bấm Start).
- Điều hướng đến: quay lại VSV-021 sau khi Back/Approve.
