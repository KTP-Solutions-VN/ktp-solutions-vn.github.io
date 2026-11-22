# SET-001 — Cài đặt nền tảng (Platform Settings)

**Loại:** Trang đầy đủ

**Route:** `SettingController::dashboard()` — route đẹp `/setting` (khai báo tại `config/Routes.php` dòng 78); mặc định `/setting/dashboard`

**Module:** SET = Cài đặt nền tảng

## Mô tả ngắn gọn
Trang chào/gateway khi vào khu vực "Cài đặt nền tảng" (Platform Settings), hiển thị banner/logo. Đóng vai trò trang gốc để mở menu con Cài đặt (Core Preferences, Outgoing Mail Server, Channel Account Mapping...).

## Mô tả chi tiết
Không có dữ liệu danh sách hay form nhập liệu. Nội dung:

| # | Thành phần | Ghi chú |
|---|---|---|
| 1 | Ảnh banner | Chỉ hiển thị nếu `user['user_type'] != 'Employee'` |

## Chức năng/nút thao tác
- Không có thao tác nghiệp vụ trên trang này; chỉ đóng vai trò điểm vào của menu Cài đặt nền tảng (menu con hiển thị ở sidebar do `active_menu = 1007`, `show_setting_menu = 1`).

## Điều hướng
- Vào từ: menu chính "Platform Settings".
- Điều hướng đến: SET-002 (Tùy chọn cốt lõi), SET-003 (Máy chủ gửi thư), SET-004 (Ánh xạ tài khoản kênh) qua menu con.
