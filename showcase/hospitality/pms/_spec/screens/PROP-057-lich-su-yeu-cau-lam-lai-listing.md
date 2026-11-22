# PROP-057 — Lịch sử làm mới listing (Listing Refresh History)

**Loại:** Popup (mở từ PROP-040 hoặc PROP-058)
**Route:** property/redo-log/:villa_id/:channel_id
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Popup/trang hiển thị lịch sử các lần yêu cầu làm lại (redo) listing OTA của một Property trên một kênh cụ thể, gồm ngày hoàn thành, người thực hiện, người yêu cầu (lấy từ bảng `VillaCoefficient` loại `redo_list`, kèm thông tin `NoticeBoard`/`ReceivedUser`/`SendUser`).

## Mô tả chi tiết
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Redone On | `done_date` | Ngày hoàn thành yêu cầu redo |
| 2 | By | `done_by` | Người thực hiện |
| 3 | Requested By | `requested_by` | Người yêu cầu ban đầu |

## Chức năng/nút thao tác
- Chỉ xem lịch sử (read-only), không có thao tác chỉnh sửa.

## Điều hướng
- Mở từ: PROP-040 (Chất lượng listing — icon xem log yêu cầu Redo), PROP-058 (Listing Refresh Queue).
- Điều hướng tới: Không có.
- Popup con: Không có.
