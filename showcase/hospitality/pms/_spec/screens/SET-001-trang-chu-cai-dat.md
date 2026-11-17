# SET-001 — Trang chủ Cài đặt hệ thống (Setting Dashboard)

**Loại:** Trang đầy đủ

**Route:** `SettingController::dashboard()` — route đẹp `/setting` (khai báo tại `config/Routes.php` dòng 78); mặc định `/setting/dashboard`

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Trang chào/gateway khi vào khu vực "Cài đặt hệ thống", hiển thị banner/logo. Đóng vai trò trang gốc để mở menu con Cài đặt (General Settings, SMTP, Hostex Setup...).

## Mô tả chi tiết
Không có dữ liệu danh sách hay form nhập liệu. Nội dung:

| # | Thành phần | Ghi chú |
|---|---|---|
| 1 | Ảnh banner | Chỉ hiển thị nếu `user['user_type'] != 'Employee'` |

## Chức năng/nút thao tác
- Không có thao tác nghiệp vụ trên trang này; chỉ đóng vai trò điểm vào của menu Cài đặt hệ thống (menu con hiển thị ở sidebar do `active_menu = 1007`, `show_setting_menu = 1`).

## Điều hướng
- Vào từ: menu chính "Settings".
- Điều hướng đến: SET-002 (Cài đặt chung), SET-003 (Cài đặt SMTP), SET-004 (Thiết lập Hostex) qua menu con.
