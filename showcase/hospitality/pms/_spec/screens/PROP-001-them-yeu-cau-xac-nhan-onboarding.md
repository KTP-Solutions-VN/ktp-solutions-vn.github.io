# PROP-001 — Tạo yêu cầu tiếp nhận (New Intake Request)
**Loại:** Trang đầy đủ
**Route:** property/add-onboarding (tham số tùy chọn `$id` – id bản ghi Villa Onboarding hiện có)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Màn hình khởi tạo hồ sơ Onboarding cho một bất động sản mới (độc lập hoặc dạng Residence nhiều Unit). Người dùng chọn người xác nhận (validator), sau đó nhập từng trường thông tin cơ bản (Property Name, Short Name, Beds24 Name, Owner on VM, Location on VM...) — mỗi lần rời khỏi ô nhập (blur) hệ thống lưu ngay qua AJAX. Cuối cùng gửi yêu cầu validate tới người được chọn (tạo thông báo trong NoticeBoard).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Choose Validator | `validator_id` | Select2 (danh sách User theo phân quyền) | Có | Options phụ thuộc `user_type` người đang đăng nhập (Employee → Superadmin/Admin/BU Manager/Team Leader; Team Leader → Superadmin/Admin/BU Manager; BU Manager/Admin/Superadmin → Superadmin/Admin) |
| 2 | Project Type | `project_type` | Radio (`independent`/`residence`) | Có | Đổi loại sẽ render lại bảng field bên dưới bằng JS |
| 3 | Number of Unit | `number_of_unit` | Number (chỉ hiện khi Project Type = residence) | Có (khi residence) | Giới hạn 1–20, mỗi unit sinh thêm 4 dòng field |
| 4 | Property Name / Recedence Name | `property_name` | Text (maxlength 20 hoặc 25) | Có | Lưu AJAX khi blur |
| 5 | Short Name | `short_name` / `short_name_{i}` | Text (maxlength 5) | Có | |
| 6 | Beds24 Name | `beds24_name` / `beds24_name_{i}` | Text (maxlength 20/25) | Có | |
| 7 | Unit Type {i} | `unit_type_{i}` | Text (maxlength 25, chỉ khi residence) | Có | Lặp theo số lượng unit |
| 8 | Unit {i} | `unit_{i}` | Text (maxlength 25, chỉ khi residence) | Có | |
| 9 | Owner on VM | `owner_vm` | Radio (Yes/No) | Có | |
| 10 | Location on VM | `location_vm` | Radio (Yes/No) | Có | |
| 11 | Project Leader (hiển thị) | — | Text tĩnh | — | = user hiện tại |
| 12 | Project Validator (hiển thị) | — | Text tĩnh | — | = validator đã chọn |
| 13 | Initiated Date / Last Updated Date (hiển thị) | — | Text tĩnh (ngày hiện tại) | — | |

## Chức năng/nút thao tác
- Nút "Confirm" (`#save_button`): ẩn form chọn validator, hiện block thông tin dự án + bảng nhập liệu onboarding.
- Mỗi ô input onboarding (`.input_field`) khi blur, mỗi radio Owner/Location khi change → gọi AJAX `POST /VM/property/saveOnboardingData` để lưu tăng dần từng field vào bảng `VillaOnboarding` (JSON `data`).
- Đổi Project Type / Number of Unit → dựng lại HTML bảng field tương ứng (JS `setHtml`).
- Nút "Request Validation" (`#request_validation`): validate rồi submit form, gọi action `addOnboarding` (POST) để tạo bản ghi `NoticeBoard` + `NoticeBoardDetail` gửi thông báo cho validator, sau đó redirect về `onBoardings`.
- Nút "Cancel": quay lại danh sách Onboarding (`onBoardings`).

## Điều hướng
- Mở từ: Menu Hồ sơ tài sản, mục Tiếp nhận (danh sách `onBoardings`, nút "Add").
- Điều hướng tới: sau khi gửi yêu cầu, redirect về `property/onBoardings` (không thuộc phạm vi PROP-001..016).
- Popup con: không có.
