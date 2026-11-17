# PROP-040 — Chất lượng Property (Quality)

**Loại:** Trang đầy đủ
**Route:** property/quality
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang theo dõi chất lượng niêm yết (listing) và đánh giá (reviews) của Property trên các kênh OTA, cùng theo dõi chất lượng cải tạo nhà (Home Improvement) và trạng thái yêu cầu làm lại listing (Redo). Có thể lọc theo Business Unit/Entry level (Property, Residence, Unit)/Property/kênh OTA, ghi log điểm số/nhận xét theo từng OTA, và tạo công việc To Do nhắc nhở xử lý.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Có (class `required`) | Đổi giá trị → cập nhật query string, lưu cookie |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Có | Điều khiển hiện field Residence/Unit/Villa tương ứng |
| 3 | Residence | `residence_id` | Select2 | Có (khi entry level = Residence/Unit) | |
| 4 | Unit | `unit_id` | Select2 | Có (khi entry level = Unit) | |
| 5 | Property | `villa_id` | Select2 | Có | Danh sách property theo BU đã chọn |
| 6 | OTA | `ota` | Select2 | Có | Ghi cookie `property_channel_id` |

### Khối "Listings" (theo từng OTA)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Date | `date` | Ngày ghi nhận |
| 2 | User | `user` | Người ghi nhận |
| 3 | Comment | `comment` | Nhận xét |
| 4 | Action | — | Icon Edit/Delete (mở modal `exampleModal1`/`exampleModal`) |

### Khối "Reviews" (theo từng OTA)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Nb of Reviews | `number_of_review` | |
| 3 | Score | `score` | |
| 4 | Comment | `comment` | |
| 5 | Action | — | Icon Edit/Delete |

### Khối "Home Improvement" và "Listings (Redo)"
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Property | `villa_name` | Chỉ ở bảng Redo |
| 3 | OTA | `ota_name` | Chỉ ở bảng Redo |
| 4 | User | `user` | |
| 5 | Comment | `comment` | |
| 6 | Action | — | Icon xem log yêu cầu Redo (nếu có), xem trạng thái "Be Redone" |

### Modal thêm/sửa Listing hoặc Review (`#exampleModal1`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text (readonly, mặc định hôm nay) | Có | |
| 2 | Nb of Reviews | `number_of_review` | Number | Có (khi loại Review) | Chỉ hiện với quality_type = review |
| 3 | Score | `score` | Number | Có (khi loại Review) | |
| 4 | Comment | `comment` | Textarea | Có | |

### Modal xác nhận xóa (`#exampleModal`)
Xóa 1 bản ghi Listing/Review/Home Improvement theo `villa_quality_id`, `villa_quality_type`.

### Modal thêm To Do (`#addToDoModal`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Notice | `notice` | Textarea | Có (min 2 ký tự) | |
| 2 | Deadline | `deadline` | Datepicker | Có | |
| 3 | To (Received by) | `received_by` | Select2 (danh sách user) | Có | |

Form submit tới `controller=ToDo, action=add` với `module=quality` và các id ngữ cảnh (villa/business_unit/residence/unit/channel/entry_level).

### Modal "Be Redone" (`#showBeRedone`)
Hiển thị trạng thái/ lịch sử yêu cầu làm lại listing, cho phép hủy yêu cầu (`cancel_request`).

## Chức năng/nút thao tác
- Đổi bộ lọc (Business Unit/Entry Level/Residence/Unit/Property/OTA) → tải lại dữ liệu tương ứng.
- Thêm/Sửa/Xóa bản ghi Listing, Review, Home Improvement (qua các modal AJAX).
- Thêm công việc To Do liên quan đến một bản ghi Quality.
- Xem/hủy yêu cầu "Be Redone" (yêu cầu làm lại listing OTA).
- Xem log (nếu có) của một yêu cầu Redo (liên kết PROP-031/redoLog).

## Điều hướng
- Mở từ: Menu Property/Quality (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác (toàn bộ thao tác qua modal AJAX tại chỗ); có liên hệ dữ liệu với PROP-031 (Yêu cầu làm lại Listing OTA).
- Popup con: Modal thêm/sửa Listing-Review, Modal xác nhận xóa, Modal thêm To Do, Modal "Be Redone" (không tách mã riêng do là thao tác phụ trợ tại chỗ).
