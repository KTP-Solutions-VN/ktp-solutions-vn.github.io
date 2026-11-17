# BOOK-101 — Trạng thái villa (Property Status)

**Loại:** Trang đầy đủ

**Route:** Booking/propertyStatus (mặc định: `/booking/property-status`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt phòng

## Mô tả ngắn gọn

Bảng theo dõi realtime trạng thái dọn dẹp (cleaning/makeup) và trạng thái khách của từng villa theo đơn vị kinh doanh, giúp điều phối viên nắm nhanh villa nào cần dọn, villa nào đã sẵn sàng đón khách.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit_id | Select | Có | Mặc định BU đầu tiên trong danh sách được phép |
| 2 | Phạm vi dọn dẹp | radio (option) | Radio: "Cleaning By Azura" / "Cleaning By Azura & Owner" | Có | Mặc định "Cleaning By Azura" (giá trị 1) |

**Danh sách (bảng tải qua AJAX `propertystatusAjax`):**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Villa | — | Icon nhà |
| 2 | Khách (trạng thái) | guest status | Trạng thái khách hiện tại (đang ở/đã trả phòng...) |
| 3 | Dọn dẹp | cleaning status | Trạng thái dọn phòng/dọn makeup, so sánh với ngày hôm qua |
| 4 | Thao tác | — | Mở popup chi tiết nhân viên (BOOK-101-P1) |

## Chức năng/nút thao tác

- Đổi Đơn vị kinh doanh hoặc phạm vi dọn dẹp → tải lại bảng qua AJAX (`fetchpropertystatus`).
- Cập nhật nhanh trạng thái dọn dẹp/khách/makeup qua các AJAX `updateCleaningstatus`, `updateGueststatus`, `updateMakeupstatus` (thao tác trực tiếp trên bảng, không chuyển trang).
- Bấm vào một dòng villa → mở popup BOOK-101-P1 (Chi tiết nhân viên villa).

## Điều hướng

- Vào từ menu vận hành/quản lý villa.
- → BOOK-101-P1 (Chi tiết nhân viên villa) khi bấm vào dòng villa.
