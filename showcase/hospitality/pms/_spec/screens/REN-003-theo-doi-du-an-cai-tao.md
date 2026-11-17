# REN-003 — Theo dõi dự án cải tạo

**Loại:** Trang đầy đủ
**Route:** renovation/projectFollowUp/:id + route đẹp dạng dashed: renovation/project-follow-up/:id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Màn hình trung tâm quản lý một dự án cải tạo cụ thể: cập nhật ngày bắt đầu/hoàn thành thực tế, theo dõi ngân sách và chi phí thực tế theo từng hạng mục (item), quản lý danh sách hóa đơn/phiếu chi (receipt), quản lý thư viện ảnh tiến độ, và là điểm điều hướng trung tâm tới các popup/màn hình con (thanh toán, hóa đơn, ảnh, báo cáo).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa / Tiêu đề dự án | `data_array.villa.name`, `title` | Text hiển thị | — | |
| 2 | Ngày bắt đầu/hoàn thành thực tế | `actual_start_date`, `actual_end_date` | Datepicker | Có | |
| 3 | Danh sách hạng mục & ngân sách/thực chi | `item[]`, `budget[]` (readonly), `real_amount[]` | Bảng, input số | Có | Ứng với từng `RenovationItem`; có thể đính kèm tài liệu (`document[]`) theo hạng mục |
| 4 | Danh sách hóa đơn/phiếu chi | `renovation_receipts` | Bảng: ngày, mã phiếu, số tiền | — | Nguồn `RenovationReceipt` |
| 5 | Danh sách ảnh tiến độ | `renovation_photos` | Bảng/lưới ảnh + chú thích | — | Nguồn `RenovationPhoto` |

## Chức năng/nút thao tác
- **Save**: cập nhật ngày bắt đầu/hoàn thành thực tế và số tiền thực chi (`real_amount`) từng hạng mục; nếu có tài liệu đính kèm thì upload và lưu `RenovationDocument`.
- **Wallet (icon ví)**: mở REN-005 — Sổ quỹ thanh toán dự án (`paymentList`).
- **+ Thêm hóa đơn mới**: mở REN-007 — Thêm hóa đơn/phiếu chi (`addNewReceipt`).
- **Sửa hóa đơn (icon bút, theo dòng)**: mở REN-008 — Sửa hóa đơn/phiếu chi (`editRenovationReceipt`).
- **Xóa hóa đơn**: xóa `RenovationReceipt`, hoàn tác `real_amount` tương ứng của các hạng mục, xóa `RenovationPayment` liên quan.
- **+ Thêm ảnh**: mở REN-009 — Thêm ảnh dự án (`addPhoto`).
- **Sửa ảnh (icon bút, theo dòng)**: mở REN-010 — Sửa ảnh dự án (`editPhoto`).
- **Xóa ảnh**: xóa `RenovationPhoto`.
- **Xuất báo cáo chi phí (CSV)**: ajax `getExpenseReport` xuất file Excel/CSV tổng hợp ngân sách/thực chi.
- **Tải toàn bộ tài liệu (zip)**: `documentZipFile` nén toàn bộ `RenovationDocument` của dự án.
- **Cập nhật trạng thái nhanh**: ajax `updateStatus` chuyển tuần tự Not Started → Under Progress → Completed.
- **Xem báo cáo tiến độ**: mở REN-011 — Báo cáo tiến độ & chi phí dự án (`report`).

## Điều hướng
- Vào từ: icon "Theo dõi dự án" tại REN-002 — Theo dõi cải tạo; hoặc liên kết nhanh từ REN-001 khi villa đã có dự án dở dang.
- Đi tới: REN-005, REN-007, REN-008, REN-009, REN-010, REN-011.
