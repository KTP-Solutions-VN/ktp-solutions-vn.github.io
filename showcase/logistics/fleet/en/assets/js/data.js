/* Mock data — Chi nhánh TP.HCM, ngày làm việc 12/11/2026. Dữ liệu mẫu, không phải dữ liệu thật.
   Các màn hình dùng chung danh sách này; ví dụ riêng trong spec của từng màn được ưu tiên khi hiển thị chi tiết. */
window.FM = {
  today: '12/11/2026',
  branch: 'TP.HCM',
  drivers: [
    { id: 'TX01', name: 'Nguyễn Văn Tuấn', gplx: 'CE', freeFrom: 'Available now', today: 0, week: 31.33, status: 'ok', usual: '51C-123.45', advanceHeld: 1200000 },
    { id: 'TX02', name: 'Trần Minh Đức', gplx: 'CE', freeFrom: '04:50 12/11', today: 2.17, week: 44.5, status: 'warn', note: '3h30 left this week, trip needs 6h10' },
    { id: 'TX03', name: 'Lê Hoàng Phúc', gplx: 'CE', freeFrom: 'Available now', today: 0, week: 22.0, status: 'ok' },
    { id: 'TX04', name: 'Phạm Quốc Bảo', gplx: 'C', freeFrom: 'Available now', today: 0, week: 18.5, status: 'block', note: 'Class C driver\'s license, can\'t drive tractor units' },
    { id: 'TX05', name: 'Võ Thành Nhân', gplx: 'CE', freeFrom: '13:20 12/11', today: 7.5, week: 38.0, status: 'warn', note: '2h30 left today, trip needs 6h10' },
    { id: 'TX06', name: 'Đặng Văn Hiếu', gplx: 'FC', freeFrom: 'Available now', today: 0, week: 12.0, status: 'block', note: 'Driver\'s license expired 05/11/2026' }
  ],
  vehicles: [
    { plate: '51C-123.45', type: 'Tractor unit', cap: 30.0, freeFrom: 'Available now', where: 'Thủ Đức yard', km: 9, status: 'ok' },
    { plate: '51D-456.78', type: 'Tractor unit', cap: 30.0, freeFrom: '04:50 12/11', where: 'after CH-0452 at Cát Lái', km: 6, status: 'ok' },
    { plate: '51C-099.21', type: 'Tractor unit', cap: 30.0, freeFrom: 'Available now', where: 'Thủ Đức yard', km: 9, status: 'block', note: 'Inspection expired 02/11/2026' },
    { plate: '51C-310.66', type: 'Tractor unit', cap: 30.0, freeFrom: '—', where: 'Linh Trung workshop', km: 14, status: 'block', note: 'In maintenance until 14/11' },
    { plate: '61C-220.14', type: 'Tractor unit', cap: 30.0, freeFrom: '07:00 12/11', where: 'Bình Dương', km: 31, status: 'warn', note: '1h30 late for pickup', branch: 'Bình Dương' },
    { plate: '51C-456.78', type: 'Tractor unit', cap: 30.0, freeFrom: 'On trip CH-0472', where: 'Cát Lái', km: 4, status: 'busy' },
    { plate: '51D-702.33', type: 'Box truck', cap: 15.0, freeFrom: 'Available now', where: 'Thủ Đức yard', km: 9, status: 'block', note: 'Capacity 15.0 t < 24.5 t' }
  ],
  trailers: [
    { plate: '51R-123.45', type: 'Semi-trailer 40\'', cap: 32.0, where: 'Thủ Đức yard', status: 'ok' },
    { plate: '51R-204.90', type: 'Semi-trailer 40\'', cap: 32.0, where: 'Cát Lái', status: 'ok' },
    { plate: '51R-088.12', type: 'Semi-trailer 40\'', cap: 32.0, where: 'Thủ Đức yard', status: 'block', note: 'Insurance expired 28/10/2026' },
    { plate: '51R-077.30', type: 'Semi-trailer 20\'', cap: 25.0, where: 'Thủ Đức yard', status: 'block', note: 'Doesn\'t fit 40\' containers' }
  ],
  pendingOrders: [
    { id: 'DH-1125', customer: 'Tân Cảng Logistics', route: 'Tân Uyên Industrial Park → Cát Lái', cargo: "1×40' · 24.5 t", tons: 24.5, pickup: '07:30 12/11', type: 'Container', partial: true },
    { id: 'DH-1131', customer: 'Gỗ Minh Long', route: 'Mỹ Phước 3 Industrial Park → Cát Lái', cargo: "1×40' · 22.0 t", tons: 22.0, pickup: '13:00 12/11', type: 'Container' },
    { id: 'DH-1133', customer: 'Bao bì Phương Nam', route: 'Sóng Thần Industrial Park → Long An', cargo: 'LTL · 4.0 t · 18 packages', tons: 4.0, pickup: '09:00 12/11', type: 'Standard' },
    { id: 'DH-1134', customer: 'Thép Hòa Phát Bình Dương', route: 'Đồng An Industrial Park → Cát Lái', cargo: "2×20' · 2×21.0 t", tons: 21.0, pickup: '14:30 12/11', type: 'Container' },
    { id: 'DH-1136', customer: 'Nhựa Duy Tân', route: 'Bình Tân → Mỹ Tho', cargo: 'LTL · 12.0 t', tons: 12.0, pickup: '15:00 12/11', type: 'Standard' },
    { id: 'DH-1138', customer: 'Thủy sản Vĩnh Hoàn', route: 'Cát Lái → Sa Đéc', cargo: "1×40' reefer · 26.0 t", tons: 26.0, pickup: '16:00 12/11', type: 'Container' },
    { id: 'DH-1140', customer: 'Bao bì Phương Nam', route: 'Sóng Thần Industrial Park → Bến Lức', cargo: 'LTL · 3.5 t · 12 packages', tons: 3.5, pickup: '09:30 12/11', type: 'Standard' }
  ],
  /* status: wait | assigned | accepted | running | done | settled | incident | cancelled */
  trips: [
    { id: 'CH-0458', customer: 'Tân Cảng Logistics', type: 'Container', route: 'Tân Uyên Industrial Park → Cát Lái', pick: '05:30', drop: '11:30', vehicle: '51C-123.45', trailer: '51R-123.45', driver: 'Nguyễn Văn Tuấn', load: 24.5, cap: 30, status: 'running', last: 'Empty picked up · 06:12', src: 'App', cutoff: 18, cont: 'TCLU 4421087', warn: null },
    { id: 'CH-0461', customer: 'Tân Cảng Logistics', type: 'Container', route: 'ICD Phước Long → Phước Đông Industrial Park → Cát Lái', pick: '05:30', drop: '15:30', vehicle: null, trailer: null, driver: null, load: 24.5, cap: null, status: 'wait', last: '—', cutoff: 30, cont: 'TCLU 4421102', warn: null },
    { id: 'CH-0462', customer: 'Gỗ Minh Long', type: 'Container', route: 'Mỹ Phước 3 Industrial Park → Cát Lái', pick: '06:00', drop: '12:00', vehicle: '51D-456.78', trailer: '51R-204.90', driver: 'Trần Minh Đức', load: 22.0, cap: 30, status: 'accepted', last: 'Driver accepted · 05:41', src: 'App', cutoff: 20, cont: 'MSKU 7731045', warn: { k: 'warn', t: 'Weekly driving: 3h30 left' } },
    { id: 'CH-0463', customer: 'Bao bì Phương Nam', type: 'Standard', route: 'Sóng Thần Industrial Park → Long An', pick: '07:00', drop: '10:30', vehicle: '51D-702.33', trailer: null, driver: 'Lê Hoàng Phúc', load: 7.5, cap: 15, status: 'running', last: 'Delivering stop 1/2 · 08:05', src: 'GPS', cutoff: null, multi: 2, warn: null },
    { id: 'CH-0464', customer: 'Thủy sản Vĩnh Hoàn', type: 'Container', route: 'Cát Lái → Sa Đéc', pick: '07:30', drop: '13:30', vehicle: '61C-220.14', trailer: '51R-088.12', driver: 'Võ Thành Nhân', load: 26.0, cap: 30, status: 'assigned', last: 'Sent to driver · 06:58', src: 'Dispatcher', cutoff: 9, cont: 'SEGU 9012334', warn: { k: 'danger', t: 'Trailer insurance expired' } },
    { id: 'CH-0457', customer: 'Thép Hòa Phát Bình Dương', type: 'Container', route: 'Đồng An Industrial Park → Cát Lái', pick: '04:00', drop: '08:30', vehicle: '51C-456.78', trailer: '51R-204.90', driver: 'Đặng Quang Vinh', load: 21.0, cap: 30, status: 'incident', last: 'Incident: Port congestion · 07:40', src: 'App', cutoff: 6, cont: 'HLXU 2210983', warn: { k: 'danger', t: 'Incident: Port congestion 1h20' } },
    { id: 'CH-0455', customer: 'Nhựa Duy Tân', type: 'Standard', route: 'Bình Tân → Mỹ Tho', pick: '03:30', drop: '07:00', vehicle: '51C-588.02', trailer: null, driver: 'Huỳnh Tấn Lộc', load: 12.0, cap: 15, status: 'done', last: 'Completed · 07:05', src: 'App', cutoff: null, warn: null },
    { id: 'CH-0452', customer: 'Tân Cảng Logistics', type: 'Container', route: 'Cát Lái → VSIP 1 Industrial Park', pick: '01:00', drop: '04:50', vehicle: '51D-456.78', trailer: '51R-204.90', driver: 'Trần Minh Đức', load: 23.0, cap: 30, status: 'done', last: 'Completed · 04:52', src: 'App', cutoff: null, cont: 'TCLU 4419920', warn: null },
    { id: 'CH-0431', customer: 'Gỗ Minh Long', type: 'Container', route: 'Mỹ Phước 3 Industrial Park → Cát Lái', pick: '05:00 10/11', drop: '11:40 10/11', vehicle: '51C-123.45', trailer: '51R-123.45', driver: 'Nguyễn Văn Tuấn', load: 22.0, cap: 30, status: 'done', last: 'Completed 10/11 · awaiting settlement', src: 'Accountant', cutoff: null, cont: 'MSKU 7730011', warn: null },
    { id: 'CH-0466', customer: 'Bao bì Phương Nam', type: 'Standard', route: 'Sóng Thần Industrial Park → Bến Lức', pick: '13:00', drop: '15:30', vehicle: null, trailer: null, driver: null, load: 3.5, cap: null, status: 'wait', last: '—', cutoff: null, warn: null },
    { id: 'CH-0459', customer: 'Gỗ Minh Long', type: 'Container', route: 'Mỹ Phước 3 Industrial Park → Cát Lái', pick: '08:00', drop: '14:00', vehicle: '51C-731.80', trailer: '51R-310.41', driver: 'Ngô Đức Trí', load: 22.0, cap: 30, status: 'running', last: 'Loaded · 08:44', src: 'GPS', cutoff: 26, cont: 'MSKU 7731052', warn: null, delay: true },
    { id: 'CH-0460', customer: 'Thép Hòa Phát Bình Dương', type: 'Container', route: 'Đồng An Industrial Park → Cát Lái', pick: '09:00', drop: '13:30', vehicle: null, trailer: null, driver: null, load: 21.0, cap: null, status: 'cancelled', last: 'Cancelled · customer rescheduled', cutoff: null, cont: 'HLXU 2211004', warn: null }
  ],
  statusMeta: {
    wait: ['Unassigned', 'b-neutral', 'dot'], assigned: ['Sent to driver', 'b-info', 'user'], accepted: ['Driver accepted', 'b-info', 'check'],
    running: ['En route', 'b-info', 'pulse'], done: ['Completed', 'b-success', 'check'], settled: ['Settled', 'b-success', 'lock'],
    incident: ['Incident', 'b-danger', 'warn'], cancelled: ['Cancelled', 'b-neutral', 'x']
  }
};
window.FM.statusBadge = function (s) {
  const m = FM.statusMeta[s]; const ic = m[2] === 'pulse' ? '<span class="pulse" aria-hidden="true"></span>' : Shell.icon(m[2]);
  return `<span class="badge ${m[1]}" ${s === 'cancelled' ? 'style="text-decoration:line-through"' : ''}>${ic}${m[0]}</span>`;
};
