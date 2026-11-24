/* Mock data — Chi nhánh TP.HCM, ngày làm việc 12/11/2026. Dữ liệu mẫu, không phải dữ liệu thật.
   Các màn hình dùng chung danh sách này; ví dụ riêng trong spec của từng màn được ưu tiên khi hiển thị chi tiết. */
window.FM = {
  today: '12/11/2026',
  branch: 'TP.HCM',
  drivers: [
    { id: 'TX01', name: 'Nguyễn Văn Tuấn', gplx: 'CE', freeFrom: 'Rảnh ngay', today: 0, week: 31.33, status: 'ok', usual: '51C-123.45', advanceHeld: 1200000 },
    { id: 'TX02', name: 'Trần Minh Đức', gplx: 'CE', freeFrom: '04:50 12/11', today: 2.17, week: 44.5, status: 'warn', note: 'Tuần còn 3h30, chuyến cần 6h10' },
    { id: 'TX03', name: 'Lê Hoàng Phúc', gplx: 'CE', freeFrom: 'Rảnh ngay', today: 0, week: 22.0, status: 'ok' },
    { id: 'TX04', name: 'Phạm Quốc Bảo', gplx: 'C', freeFrom: 'Rảnh ngay', today: 0, week: 18.5, status: 'block', note: 'GPLX hạng C, không lái được đầu kéo' },
    { id: 'TX05', name: 'Võ Thành Nhân', gplx: 'CE', freeFrom: '13:20 12/11', today: 7.5, week: 38.0, status: 'warn', note: 'Hôm nay còn 2h30, chuyến cần 6h10' },
    { id: 'TX06', name: 'Đặng Văn Hiếu', gplx: 'FC', freeFrom: 'Rảnh ngay', today: 0, week: 12.0, status: 'block', note: 'GPLX hết hạn 05/11/2026' }
  ],
  vehicles: [
    { plate: '51C-123.45', type: 'Đầu kéo', cap: 30.0, freeFrom: 'Rảnh ngay', where: 'Bãi Thủ Đức', km: 9, status: 'ok' },
    { plate: '51D-456.78', type: 'Đầu kéo', cap: 30.0, freeFrom: '04:50 12/11', where: 'xong CH-0452 tại Cát Lái', km: 6, status: 'ok' },
    { plate: '51C-099.21', type: 'Đầu kéo', cap: 30.0, freeFrom: 'Rảnh ngay', where: 'Bãi Thủ Đức', km: 9, status: 'block', note: 'Đăng kiểm quá hạn 02/11/2026' },
    { plate: '51C-310.66', type: 'Đầu kéo', cap: 30.0, freeFrom: '—', where: 'Xưởng Linh Trung', km: 14, status: 'block', note: 'Đang bảo dưỡng đến 14/11' },
    { plate: '61C-220.14', type: 'Đầu kéo', cap: 30.0, freeFrom: '07:00 12/11', where: 'Bình Dương', km: 31, status: 'warn', note: 'Trễ 1h30 so với giờ lấy', branch: 'Bình Dương' },
    { plate: '51C-456.78', type: 'Đầu kéo', cap: 30.0, freeFrom: 'Đang chạy CH-0472', where: 'Cát Lái', km: 4, status: 'busy' },
    { plate: '51D-702.33', type: 'Xe tải thùng', cap: 15.0, freeFrom: 'Rảnh ngay', where: 'Bãi Thủ Đức', km: 9, status: 'block', note: 'Tải trọng 15,0 tấn < 24,5 tấn' }
  ],
  trailers: [
    { plate: '51R-123.45', type: 'Sơ mi rơ-moóc 40\'', cap: 32.0, where: 'Bãi Thủ Đức', status: 'ok' },
    { plate: '51R-204.90', type: 'Sơ mi rơ-moóc 40\'', cap: 32.0, where: 'Cát Lái', status: 'ok' },
    { plate: '51R-088.12', type: 'Sơ mi rơ-moóc 40\'', cap: 32.0, where: 'Bãi Thủ Đức', status: 'block', note: 'Bảo hiểm quá hạn 28/10/2026' },
    { plate: '51R-077.30', type: 'Sơ mi rơ-moóc 20\'', cap: 25.0, where: 'Bãi Thủ Đức', status: 'block', note: 'Không phù hợp cont 40\'' }
  ],
  pendingOrders: [
    { id: 'DH-1125', customer: 'Tân Cảng Logistics', route: 'KCN Tân Uyên → Cát Lái', cargo: "1×40' · 24,5 tấn", tons: 24.5, pickup: '07:30 12/11', type: 'Container', partial: true },
    { id: 'DH-1131', customer: 'Gỗ Minh Long', route: 'KCN Mỹ Phước 3 → Cát Lái', cargo: "1×40' · 22,0 tấn", tons: 22.0, pickup: '13:00 12/11', type: 'Container' },
    { id: 'DH-1133', customer: 'Bao bì Phương Nam', route: 'KCN Sóng Thần → Long An', cargo: 'Hàng lẻ · 4,0 tấn · 18 kiện', tons: 4.0, pickup: '09:00 12/11', type: 'Thường' },
    { id: 'DH-1134', customer: 'Thép Hòa Phát Bình Dương', route: 'KCN Đồng An → Cát Lái', cargo: "2×20' · 2×21,0 tấn", tons: 21.0, pickup: '14:30 12/11', type: 'Container' },
    { id: 'DH-1136', customer: 'Nhựa Duy Tân', route: 'Bình Tân → Mỹ Tho', cargo: 'Hàng lẻ · 12,0 tấn', tons: 12.0, pickup: '15:00 12/11', type: 'Thường' },
    { id: 'DH-1138', customer: 'Thủy sản Vĩnh Hoàn', route: 'Cát Lái → Sa Đéc', cargo: "1×40' lạnh · 26,0 tấn", tons: 26.0, pickup: '16:00 12/11', type: 'Container' },
    { id: 'DH-1140', customer: 'Bao bì Phương Nam', route: 'KCN Sóng Thần → Bến Lức', cargo: 'Hàng lẻ · 3,5 tấn · 12 kiện', tons: 3.5, pickup: '09:30 12/11', type: 'Thường' }
  ],
  /* status: wait | assigned | accepted | running | done | settled | incident | cancelled */
  trips: [
    { id: 'CH-0458', customer: 'Tân Cảng Logistics', type: 'Container', route: 'KCN Tân Uyên → Cát Lái', pick: '05:30', drop: '11:30', vehicle: '51C-123.45', trailer: '51R-123.45', driver: 'Nguyễn Văn Tuấn', load: 24.5, cap: 30, status: 'running', last: 'Đã lấy rỗng · 06:12', src: 'App', cutoff: 18, cont: 'TCLU 4421087', warn: null },
    { id: 'CH-0461', customer: 'Tân Cảng Logistics', type: 'Container', route: 'ICD Phước Long → KCN Phước Đông → Cát Lái', pick: '05:30', drop: '15:30', vehicle: null, trailer: null, driver: null, load: 24.5, cap: null, status: 'wait', last: '—', cutoff: 30, cont: 'TCLU 4421102', warn: null },
    { id: 'CH-0462', customer: 'Gỗ Minh Long', type: 'Container', route: 'KCN Mỹ Phước 3 → Cát Lái', pick: '06:00', drop: '12:00', vehicle: '51D-456.78', trailer: '51R-204.90', driver: 'Trần Minh Đức', load: 22.0, cap: 30, status: 'accepted', last: 'Tài xế đã nhận · 05:41', src: 'App', cutoff: 20, cont: 'MSKU 7731045', warn: { k: 'warn', t: 'Giờ lái tuần còn 3h30' } },
    { id: 'CH-0463', customer: 'Bao bì Phương Nam', type: 'Thường', route: 'KCN Sóng Thần → Long An', pick: '07:00', drop: '10:30', vehicle: '51D-702.33', trailer: null, driver: 'Lê Hoàng Phúc', load: 7.5, cap: 15, status: 'running', last: 'Đang giao điểm 1/2 · 08:05', src: 'GSHT', cutoff: null, multi: 2, warn: null },
    { id: 'CH-0464', customer: 'Thủy sản Vĩnh Hoàn', type: 'Container', route: 'Cát Lái → Sa Đéc', pick: '07:30', drop: '13:30', vehicle: '61C-220.14', trailer: '51R-088.12', driver: 'Võ Thành Nhân', load: 26.0, cap: 30, status: 'assigned', last: 'Đã giao tài xế · 06:58', src: 'Điều độ', cutoff: 9, cont: 'SEGU 9012334', warn: { k: 'danger', t: 'Bảo hiểm rơ-moóc quá hạn' } },
    { id: 'CH-0457', customer: 'Thép Hòa Phát Bình Dương', type: 'Container', route: 'KCN Đồng An → Cát Lái', pick: '04:00', drop: '08:30', vehicle: '51C-456.78', trailer: '51R-204.90', driver: 'Đặng Quang Vinh', load: 21.0, cap: 30, status: 'incident', last: 'Sự cố: Kẹt cảng · 07:40', src: 'App', cutoff: 6, cont: 'HLXU 2210983', warn: { k: 'danger', t: 'Sự cố: Kẹt cảng 1h20' } },
    { id: 'CH-0455', customer: 'Nhựa Duy Tân', type: 'Thường', route: 'Bình Tân → Mỹ Tho', pick: '03:30', drop: '07:00', vehicle: '51C-588.02', trailer: null, driver: 'Huỳnh Tấn Lộc', load: 12.0, cap: 15, status: 'done', last: 'Hoàn thành · 07:05', src: 'App', cutoff: null, warn: null },
    { id: 'CH-0452', customer: 'Tân Cảng Logistics', type: 'Container', route: 'Cát Lái → KCN VSIP 1', pick: '01:00', drop: '04:50', vehicle: '51D-456.78', trailer: '51R-204.90', driver: 'Trần Minh Đức', load: 23.0, cap: 30, status: 'done', last: 'Hoàn thành · 04:52', src: 'App', cutoff: null, cont: 'TCLU 4419920', warn: null },
    { id: 'CH-0431', customer: 'Gỗ Minh Long', type: 'Container', route: 'KCN Mỹ Phước 3 → Cát Lái', pick: '05:00 10/11', drop: '11:40 10/11', vehicle: '51C-123.45', trailer: '51R-123.45', driver: 'Nguyễn Văn Tuấn', load: 22.0, cap: 30, status: 'done', last: 'Hoàn thành 10/11 · chờ quyết toán', src: 'Kế toán', cutoff: null, cont: 'MSKU 7730011', warn: null },
    { id: 'CH-0466', customer: 'Bao bì Phương Nam', type: 'Thường', route: 'KCN Sóng Thần → Bến Lức', pick: '13:00', drop: '15:30', vehicle: null, trailer: null, driver: null, load: 3.5, cap: null, status: 'wait', last: '—', cutoff: null, warn: null },
    { id: 'CH-0459', customer: 'Gỗ Minh Long', type: 'Container', route: 'KCN Mỹ Phước 3 → Cát Lái', pick: '08:00', drop: '14:00', vehicle: '51C-731.80', trailer: '51R-310.41', driver: 'Ngô Đức Trí', load: 22.0, cap: 30, status: 'running', last: 'Đã đóng hàng · 08:44', src: 'GSHT', cutoff: 26, cont: 'MSKU 7731052', warn: null, delay: true },
    { id: 'CH-0460', customer: 'Thép Hòa Phát Bình Dương', type: 'Container', route: 'KCN Đồng An → Cát Lái', pick: '09:00', drop: '13:30', vehicle: null, trailer: null, driver: null, load: 21.0, cap: null, status: 'cancelled', last: 'Huỷ · khách dời lịch', cutoff: null, cont: 'HLXU 2211004', warn: null }
  ],
  statusMeta: {
    wait: ['Chờ gán', 'b-neutral', 'dot'], assigned: ['Đã giao tài xế', 'b-info', 'user'], accepted: ['Tài xế đã nhận', 'b-info', 'check'],
    running: ['Đang chạy', 'b-info', 'pulse'], done: ['Hoàn thành', 'b-success', 'check'], settled: ['Đã quyết toán', 'b-success', 'lock'],
    incident: ['Sự cố', 'b-danger', 'warn'], cancelled: ['Huỷ', 'b-neutral', 'x']
  }
};
window.FM.statusBadge = function (s) {
  const m = FM.statusMeta[s]; const ic = m[2] === 'pulse' ? '<span class="pulse" aria-hidden="true"></span>' : Shell.icon(m[2]);
  return `<span class="badge ${m[1]}" ${s === 'cancelled' ? 'style="text-decoration:line-through"' : ''}>${ic}${m[0]}</span>`;
};
