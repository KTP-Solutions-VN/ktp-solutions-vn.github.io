# PROP-052 — Xuất PDF Hợp đồng khách (Guest Contract Assignment PDF)

**Loại:** Trang đầy đủ (đầu ra là file PDF tải trực tiếp, không phải trang HTML tương tác)
**Route:** property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_code=...&electricity_mode=...
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Action sinh và trả về file PDF hợp đồng khách (Guest Contract) hoàn chỉnh cho một Property, dựa trên phiên bản hợp đồng mẫu (`general_version_id`) đã gán, ngôn ngữ và chế độ tính điện (`electricity_mode`) được chọn. View `.ctp` chỉ là template HTML/CSS (khổ A4) dùng làm đầu vào cho thư viện Dompdf để render ra PDF, không phải màn hình tương tác.

## Mô tả chi tiết
| # | Tên field/khối nội dung | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa Id | `villa_id` | Query param | Có | |
| 2 | General Version Id | `general_version_id` | Query param | Có | Phiên bản hợp đồng mẫu |
| 3 | Language Code | `language_code` | Query param | Có | Ngôn ngữ nội dung hợp đồng |
| 4 | Electricity Mode | `electricity_mode` | Query param | Có | Chế độ tính phí điện áp dụng trong hợp đồng |
| 5 | Header — Logo/Property Code/Location | `pdfHeaderData` | Ảnh + text (render sẵn) | — | Lấy từ Business Unit logo, tên Property, District/Region |
| 6 | Nội dung hợp đồng (Sections) | `sections`/`replacements` | HTML block (render sẵn) | — | Nội dung theo template hợp đồng mẫu, thay thế biến (placeholder) bằng dữ liệu Property |
| 7 | Footer — Logo/Property Code/Location | `pdfHeaderData` (footer_*) | Ảnh + text (render sẵn) | — | |

## Chức năng/nút thao tác
- Không có nút thao tác trên chính file PDF; được kích hoạt từ nút "Preview"/"Download" ở PROP-051 hoặc tab Portal Contract của PROP-050.
- Nếu dữ liệu hợp đồng chưa đầy đủ/không hợp lệ → Flash lỗi và redirect về trang trước đó (`referer`) thay vì xuất PDF.
- Tên file PDF được sinh tự động dạng `Guest-Contract-{TenProperty}-{CheDoDien}.pdf`.

## Điều hướng
- Mở từ: PROP-051 (Tổng hợp gán Hợp đồng khách theo BU — nút Preview/Download), PROP-050 (tab Portal Contract).
- Điều hướng tới: Không có (kết thúc bằng tải file PDF hoặc redirect lỗi về trang trước).
- Popup con: Không có.
