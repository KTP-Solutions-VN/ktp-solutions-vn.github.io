# PAGE-001 — Trang chào mặc định CakePHP (Default Home / Scaffold Page)

**Loại:** Trang đầy đủ

**Route:** `PagesController::display(...$path)` — mặc định `/pages/*` (route được comment tắt trong `config/Routes.php`, dòng `//$routes->connect('/pages/*', ...)`). View duy nhất trong `src/Template/Pages/` là `home.ctp`.

**Module:** PAGE = Trang tĩnh

## Mô tả ngắn gọn
Đây là trang chào mặc định (scaffold) do CakePHP sinh ra khi khởi tạo dự án, hiển thị thông tin kiểm tra môi trường (PHP version, extension, quyền ghi thư mục, kết nối database, DebugKit) và các liên kết tài liệu CakePHP. Trang chỉ hiển thị khi `debug = true`; nếu tắt debug sẽ trả lỗi 404 (`NotFoundException`).

**Lưu ý quan trọng:** route `/` thực tế của ứng dụng được trỏ tới `LoginController::index` (xem `config/Routes.php`), và route `/pages/*` đang bị comment tắt. Vì vậy màn hình này hiện **không được sử dụng/không thể truy cập** trong luồng nghiệp vụ thực tế của Azura Manager PMS — nó chỉ còn tồn tại như mã nguồn mặc định chưa dọn dẹp của CakePHP.

## Mô tả chi tiết
Không có field nhập liệu hay dữ liệu nghiệp vụ nào; toàn bộ nội dung là thông tin chẩn đoán môi trường kỹ thuật tĩnh (đọc từ `PHP_VERSION`, `extension_loaded()`, `is_writable()`, `ConnectionManager`, `Plugin::isLoaded('DebugKit')`).

## Chức năng/nút thao tác
Không có; chỉ có các liên kết ngoài (external link) tới tài liệu/diễn đàn CakePHP.

## Điều hướng
- Không có điều hướng nội bộ nào tới/từ màn hình này trong ứng dụng thực tế (route không được kích hoạt).
