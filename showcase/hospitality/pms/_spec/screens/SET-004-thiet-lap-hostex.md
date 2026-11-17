# SET-004 — Thiết lập Hostex (Hostex Set-up)

**Loại:** Trang đầy đủ

**Route:** `SettingController::hostexSetup()` — mặc định `/setting/hostex-setup`; dữ liệu tải qua AJAX GET `getHostexData()` (`/setting/get-hostex-data`)

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Màn hình cấu hình tích hợp kênh phân phối Hostex: với mỗi kênh OTA (Booking.com, Airbnb, Agoda, Expedia, Trip.com...) khai báo các tài khoản Hostex (email/tên tài khoản) đang nắm giữ listing, gắn tài khoản đó với OTA Account tương ứng và xác định tài khoản thuộc **Azura Stays** hay một **Agency** đối tác bên ngoài. Số lượng bất động sản (property) đang liên kết với từng tài khoản được tính tự động từ dữ liệu OTA lưu trên Villa và hiển thị dạng danh sách property mở rộng khi bấm vào.

## Mô tả chi tiết

Trang render động 100% bằng JavaScript từ dữ liệu AJAX `getHostexData` (danh sách kênh `BookingPlatform`, tài khoản `HostexAccount` kèm `Agency`, danh sách OTA Account theo kênh từ `Chanel`, số property khớp theo email/kênh từ dữ liệu OTA JSON lưu trên `Villa`).

Mỗi kênh (channel) hiển thị 1 khối (section) gồm bảng tài khoản:

| # | Tên cột | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Account Email or Name | `email` | Text (hiển thị) | |
| 2 | OTA Account | `ota_account_id` | Select (đổi là lưu ngay qua AJAX `saveHostexOtaAccount`) | Danh sách OTA Account (bảng `Chanel`) thuộc kênh tương ứng |
| 3 | Owner | `owner` | Badge hiển thị | "Azura Stays" hoặc "Agency · {agency_name}" |
| 4 | Properties linked | `props` | Số + link mở rộng | Bấm vào để load danh sách property qua AJAX `getHostexAccountProperties`; "None yet" nếu = 0 |
| 5 | Actions | — | Icon Sửa / Xóa | Sửa mở lại form thêm tài khoản ở chế độ edit (inline, không phải modal); Xóa mở popup SET-004-P2 |

Mỗi kênh không có tài khoản nào hiển thị trạng thái rỗng: "No account mapped — {channel} bookings arriving from Hostex cannot be matched to a property."

Form thêm/sửa tài khoản (ẩn/hiện inline dưới bảng của từng kênh, không phải modal) — xem chi tiết field tại SET-004-P1.

## Chức năng/nút thao tác
- **Add account (mỗi kênh):** mở/đóng form thêm tài khoản inline (SET-004-P1) ngay dưới bảng của kênh đó.
- **Sửa (icon bút, từng dòng tài khoản):** nạp dữ liệu dòng đó vào form inline (SET-004-P1) ở chế độ sửa.
- **Xóa (icon thùng rác, từng dòng tài khoản):**
  - Nếu tài khoản đang liên kết với property (`props > 0`): mở popup cảnh báo SET-004-P3, không cho xóa.
  - Nếu không liên kết property nào: mở popup xác nhận xóa SET-004-P2.
- **Đổi OTA Account (dropdown):** lưu ngay lập tức qua AJAX `saveHostexOtaAccount`, hiển thị icon dấu tích khi lưu xong, sau đó reload trang.
- **Xem Properties linked:** mở rộng dòng con hiển thị danh sách property (ảnh + tên, link tới trang OTA management của villa) qua AJAX `getHostexAccountProperties`.

## Điều hướng
- Vào từ: SET-001, hoặc menu Cài đặt hệ thống > Hostex Set-up.
- Điều hướng đến: SET-004-P1 (form thêm/sửa tài khoản, inline), SET-004-P2 (popup xác nhận xóa), SET-004-P3 (popup cảnh báo không thể xóa).
- Link ra ngoài: từ danh sách property liên kết, mở trang OTA management của Villa (`/property/villa/ota management/:id`) ở tab mới.
