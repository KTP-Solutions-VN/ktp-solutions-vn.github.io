/* Trang dịch vụ "Tư vấn ứng dụng công nghệ" (CR-01, lớp AI ở CR-03) — song ngữ VI/EN.
   Hai cách hiển thị chữ do script vẽ:
   - Vẽ một lần (6 AI Agent mẫu, case "Đồng hành thực tế"): chữ VI + bản EN ở data-en (KTP.en), vẽ ngay khi script nạp
     (trước DOMContentLoaded) để global.js áp ngôn ngữ đã lưu và nút VI/EN đổi được.
   - Vẽ lại sau khi nạp (công cụ "Tìm điểm bắt đầu") và thuộc tính (aria-label, link sang Liên hệ): đọc <html data-lang>
     lúc vẽ, vẽ lại khi data-lang đổi (onLang — MutationObserver).
   1. AI Agent mẫu: "Request for demo" → Liên hệ ?yeu-cau-demo-agent=<tên agent theo ngôn ngữ đang xem>
   2. Stepper 4 bước (tablist, phím ←/→/Home/End)
   3. Công cụ "Tìm điểm bắt đầu": tick vấn đề → gợi ý bài toán nên bắt đầu → Liên hệ ?diem-bat-dau=<tóm tắt theo ngôn ngữ đang xem>
   4. Case "Đồng hành thực tế": dự án trong DATA_DU_AN có dich_vu_lien_quan = "tu-van-ung-dung-cong-nghe"; chưa có thì giữ ẩn section */
(function () {
  'use strict';
  var SLUG = 'tu-van-ung-dung-cong-nghe';
  var ROOT = '../../../';                       // tiền tố tới gốc website (ảnh / link trong DATA_DU_AN tính từ gốc)
  var CONTACT = '../../lien-he/index.html';
  var html = document.documentElement;
  var isEn = function () { return html.getAttribute('data-lang') === 'en'; };
  var tr = function (vi, en) { return isEn() ? en : vi; };
  var T = function (o, k) { return isEn() && o[k + '_en'] ? o[k + '_en'] : o[k]; };   // trường dữ liệu theo ngôn ngữ đang xem
  var h = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var SPARK = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>';
  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  /* ---------------- 0. Đổi ngôn ngữ ----------------
     global.js đặt <html data-lang> lúc DOMContentLoaded (theo localStorage ktp_lang) và khi bấm VI/EN.
     onLang(fn[, later]): chạy fn ngay (trừ khi later = true), rồi chạy lại mỗi khi ngôn ngữ thật sự đổi. */
  var langFns = [];
  var lastLang = html.getAttribute('data-lang');
  function onLang(fn, later) { langFns.push(fn); if (!later) fn(); }
  new MutationObserver(function () {
    var cur = html.getAttribute('data-lang');
    if (cur === lastLang) return;
    lastLang = cur;
    langFns.forEach(function (fn) { fn(); });
  }).observe(html, { attributes: true, attributeFilter: ['data-lang'] });

  // aria-label song ngữ cho markup tĩnh: <… aria-label="VI" data-aria-en="EN">
  onLang(function () {
    var en = isEn();
    document.querySelectorAll('[data-aria-en]').forEach(function (el) {
      if (!el.hasAttribute('data-aria-vi')) el.setAttribute('data-aria-vi', el.getAttribute('aria-label') || '');
      el.setAttribute('aria-label', el.getAttribute(en ? 'data-aria-en' : 'data-aria-vi'));
    });
  });

  /* ---------------- 1. AI Agent mẫu (CR-03) ----------------
     Mỗi agent: làm gì + khi nào con người duyệt. Chưa có demo thật → "Request for demo" → Liên hệ ?yeu-cau-demo-agent= */
  var I = function (p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var AGENTS = [
    { ten: 'Agent chăm sóc khách hàng', ten_en: 'Customer care agent',
      icon: I('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
      lam: 'Trả lời khách 24/7 trên website, Zalo, email — từ dữ liệu sản phẩm, bảng giá và chính sách thật của doanh nghiệp.',
      lam_en: 'Answers customers 24/7 on your website, Zalo and email — using your real product data, price lists and policies.',
      duyet: 'Khiếu nại, hoàn tiền, câu hỏi ngoài phạm vi → chuyển ngay cho nhân viên.',
      duyet_en: 'Complaints, refunds and out-of-scope questions → handed straight to your staff.' },
    { ten: 'Trợ lý bán hàng', ten_en: 'Sales assistant',
      icon: I('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
      lam: 'Soạn nháp báo giá từ bảng giá, nhắc lịch chăm sóc từ CRM, tóm tắt lịch sử trao đổi trước mỗi cuộc gọi.',
      lam_en: 'Drafts quotes from your price list, sends follow-up reminders from the CRM and sums up past conversations before every call.',
      duyet: 'Mọi báo giá được sales kiểm tra trước khi gửi khách.',
      duyet_en: 'Every quote is checked by sales before it goes to the customer.' },
    { ten: 'Trợ lý tri thức nội bộ', ten_en: 'Internal knowledge assistant',
      icon: I('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
      lam: 'Hỏi đáp quy trình, chính sách, tài liệu kỹ thuật của công ty bằng tiếng Việt — nhân viên mới tự tra cứu được.',
      lam_en: 'Answers questions about company processes, policies and technical documents in plain language — new staff can find answers on their own.',
      duyet: 'Chỉ đọc; phân quyền theo phòng ban, không trả lời ngoài tài liệu được cấp.',
      duyet_en: 'Read-only; access is set per department, and it never answers beyond the documents it has been given.' },
    { ten: 'Agent xử lý chứng từ', ten_en: 'Document processing agent',
      icon: I('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>'),
      lam: 'Đọc hóa đơn, đơn hàng, phiếu nhập/xuất rồi điền vào hệ thống — thay cho nhập tay.',
      lam_en: 'Reads invoices, orders and goods in/out slips and enters them into the system — no more manual data entry.',
      duyet: 'Chứng từ có sai lệch hoặc giá trị lớn được đưa vào hàng chờ duyệt.',
      duyet_en: 'Documents with discrepancies or high values go into an approval queue.' },
    { ten: 'Agent báo cáo', ten_en: 'Reporting agent',
      icon: I('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
      lam: 'Hỏi bằng câu tự nhiên — "doanh thu tháng này theo chi nhánh?" — nhận lại số liệu và biểu đồ từ dữ liệu vận hành.',
      lam_en: 'Ask in plain language — “this month\'s revenue by branch?” — and get figures and charts back from your operational data.',
      duyet: 'Chỉ đọc dữ liệu; số liệu dùng cho quyết định lớn được đối chiếu với báo cáo gốc.',
      duyet_en: 'Read-only; figures used for major decisions are cross-checked against the source reports.' },
    { ten: 'Agent theo dõi thị trường', ten_en: 'Market watch agent',
      icon: I('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
      lam: 'Theo dõi giá, sản phẩm và đánh giá công khai của đối thủ cùng ngành, tổng hợp định kỳ cho lãnh đạo.',
      lam_en: 'Tracks the public prices, products and reviews of competitors in your industry and sends leadership regular summaries.',
      duyet: 'Chỉ dùng thông tin công khai; kết luận được người kiểm chứng trước khi đưa vào quyết định giá.',
      duyet_en: 'Uses public information only; a person verifies the conclusions before they feed into pricing decisions.' }
  ];
  function initAgents() {
    var root = document.getElementById('tv-agents');
    if (!root) return;
    var HUMAN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    var REQ = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="14" rx="2"/><polygon points="10 8.5 15 11 10 13.5 10 8.5"/><line x1="8" y1="21" x2="16" y2="21"/></svg>';
    root.innerHTML = AGENTS.map(function (a, i) {
      return '<article class="card tv-agent">' +
        '<div class="tv-agent__head"><div class="tv-agent__icon">' + a.icon + '</div><h4' + KTP.en(a.ten_en) + '>' + a.ten + '</h4></div>' +
        '<p class="tv-agent__does"' + KTP.en(a.lam_en) + '>' + h(a.lam) + '</p>' +
        '<p class="tv-agent__human">' + HUMAN + '<span' + KTP.en('<b>Human approval:</b> ' + h(a.duyet_en)) + '><b>Con người duyệt:</b> ' + h(a.duyet) + '</span></p>' +
        // Nhãn nút giữ tiếng Anh ở cả 2 ngôn ngữ (như KTPCase.demo); href + aria-label đổi theo ngôn ngữ ở dưới
        '<div class="tv-agent__foot"><a class="btn btn-outline btn-sm btn-demo" data-agent="' + i + '" href="' + CONTACT + '">Request for demo ' + REQ + '</a></div>' +
      '</article>';
    }).join('');
    var links = root.querySelectorAll('[data-agent]');
    onLang(function () {
      links.forEach(function (link) {
        var name = T(AGENTS[+link.getAttribute('data-agent')], 'ten');
        link.href = CONTACT + '?yeu-cau-demo-agent=' + encodeURIComponent(name);
        link.setAttribute('aria-label', 'Request for demo: ' + name);
      });
    });
  }

  /* ---------------- 2. Stepper ---------------- */
  function initStepper() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tv-stepper__tab'));
    if (!tabs.length) return;
    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, to = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (i - 1 + n) % n;
        else if (e.key === 'Home') to = 0;
        else if (e.key === 'End') to = n - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
  }

  /* ---------------- 3. Tìm điểm bắt đầu ---------------- */
  // Thứ tự mảng = thứ tự ưu tiên khi hòa điểm (khâu "gốc dữ liệu" đứng trước)
  var GROUPS = [
    { id: 'kho', ten: 'Kho & vận hành', ten_en: 'Inventory & operations',
      van_de: ['Số tồn kho không khớp thực tế', 'Giao thiếu hoặc giao sai hàng', 'Quy trình phụ thuộc vào trí nhớ của vài người'],
      van_de_en: ['Stock levels don\'t match what\'s on the shelves', 'Short or wrong deliveries', 'Processes depend on a few people\'s memory'],
      ly_do: 'Đây là khâu có nhiều dấu hiệu nhất — và lỗi ở kho/vận hành thường kéo theo lỗi ở bán hàng, giao hàng và báo cáo phía sau.',
      ly_do_en: 'This area shows the most warning signs — and inventory/operations errors usually ripple into sales, delivery and reporting further down the line.',
      kpi: '% sai lệch tồn kho, % đơn giao sai', kpi_en: '% stock discrepancy, % wrong deliveries',
      tiep: ['ban-hang', 'bao-cao'],
      ai: 'Agent xử lý chứng từ nhập/xuất · AI cảnh báo sớm sai lệch tồn kho',
      ai_en: 'Document agent for goods in/out · AI early warnings on stock discrepancies' },
    { id: 'ban-hang', ten: 'Bán hàng', ten_en: 'Sales',
      van_de: ['Báo giá làm thủ công, mất nhiều thời gian', 'Đơn từ nhiều kênh (Facebook, Zalo, website) hay bị sót', 'Không biết sản phẩm nào bán chạy theo thời gian thực'],
      van_de_en: ['Quotes are done by hand and take a long time', 'Orders from multiple channels (Facebook, Zalo, website) get missed', 'No real-time view of which products are selling'],
      ly_do: 'Khâu bán hàng đang có nhiều điểm rơi nhất — gom đơn và báo giá về một nơi giúp thấy ngay doanh thu bị mất ở đâu.',
      ly_do_en: 'Sales is where the most is slipping through — bringing orders and quotes into one place shows right away where revenue is being lost.',
      kpi: 'Thời gian xử lý đơn, % đơn bị sót', kpi_en: 'Order processing time, % missed orders',
      tiep: ['khach-hang', 'bao-cao'],
      ai: 'Trợ lý bán hàng soạn nháp báo giá · Agent gom đơn từ Zalo, Facebook, website',
      ai_en: 'Sales assistant that drafts quotes · Agent that collects orders from Zalo, Facebook and your website' },
    { id: 'khach-hang', ten: 'Khách hàng & chăm sóc', ten_en: 'Customers & care',
      van_de: ['Thông tin khách nằm rải rác ở từng nhân viên', 'Không nhắc được lịch chăm sóc lại khách cũ', 'Nhân viên nghỉ việc là mất luôn khách'],
      van_de_en: ['Customer information is scattered across individual staff', 'No reminders to follow up with past customers', 'When a salesperson leaves, their customers leave too'],
      ly_do: 'Dữ liệu khách hàng đang phụ thuộc vào từng cá nhân — tập trung lại giúp giữ khách và không mất cơ hội bán lại.',
      ly_do_en: 'Customer data depends on individuals — centralizing it helps you keep customers and never miss a repeat sale.',
      kpi: '% khách được chăm sóc đúng hạn', kpi_en: '% of customers followed up on time',
      tiep: ['hau-mai', 'ban-hang'],
      ai: 'Agent chăm sóc khách hàng 24/7 · trợ lý nhắc lịch chăm sóc từ CRM',
      ai_en: '24/7 customer care agent · assistant that schedules follow-ups from the CRM' },
    { id: 'hau-mai', ten: 'Dịch vụ sau bán', ten_en: 'After-sales service',
      van_de: ['Lịch bảo dưỡng/bảo hành theo dõi bằng sổ', 'Không thu được đánh giá của khách sau dịch vụ', 'Không biết chi phí thật của mỗi lần sửa chữa'],
      van_de_en: ['Maintenance/warranty schedules are tracked on paper', 'No customer feedback collected after service', 'The real cost of each repair is unknown'],
      ly_do: 'Dịch vụ sau bán đang vận hành thủ công — số hóa lịch dịch vụ và đánh giá giúp tăng hài lòng và thấy rõ chi phí thật.',
      ly_do_en: 'After-sales still runs manually — digitizing service schedules and feedback lifts satisfaction and reveals the real costs.',
      kpi: 'Thời gian phản hồi, điểm hài lòng sau dịch vụ', kpi_en: 'Response time, post-service satisfaction score',
      tiep: ['khach-hang', 'bao-cao'],
      ai: 'Agent đặt lịch & nhắc bảo dưỡng · AI tổng hợp phản hồi khách sau dịch vụ',
      ai_en: 'Booking & maintenance reminder agent · AI summaries of customer feedback after service' },
    { id: 'bao-cao', ten: 'Tài chính & báo cáo', ten_en: 'Finance & reporting',
      van_de: ['Báo cáo cuối tháng phải gom tay từ nhiều file', 'Đối soát doanh thu, công nợ mất nhiều ngày', 'Lãnh đạo không có số liệu khi cần ra quyết định'],
      van_de_en: ['Month-end reports are pieced together by hand from many files', 'Reconciling revenue and receivables takes days', 'Leaders don\'t have the figures when they need to decide'],
      ly_do: 'Lãnh đạo đang thiếu số liệu đúng lúc — nối dữ liệu để báo cáo tự tổng hợp giúp ra quyết định nhanh hơn.',
      ly_do_en: 'Leaders lack timely figures — connecting the data so reports compile themselves speeds up decisions.',
      kpi: 'Thời gian lập báo cáo, thời gian đối soát', kpi_en: 'Report preparation time, reconciliation time',
      tiep: ['ban-hang', 'kho'],
      ai: 'Agent báo cáo hỏi–đáp bằng tiếng Việt · Agent đọc hóa đơn, chứng từ kế toán',
      ai_en: 'Reporting agent you can question in plain language · Agent that reads invoices and accounting documents' }
  ];
  var QUY_MO = [
    { id: 'lt10', ten: 'Dưới 10 người', ten_en: 'Under 10 people',
      pham_vi: 'Với quy mô này, có thể triển khai thử trực tiếp với cả đội ngay từ vòng đầu.',
      pham_vi_en: 'At this size, you can pilot directly with the whole team from the first round.' },
    { id: '10-30', ten: '10–30 người', ten_en: '10–30 people',
      pham_vi: 'Nên thử nghiệm với một bộ phận trước, có một người đầu mối.',
      pham_vi_en: 'Pilot with one department first, with one point person.' },
    { id: '30-100', ten: '30–100 người', ten_en: '30–100 people',
      pham_vi: 'Nên thử nghiệm tại một bộ phận hoặc chi nhánh, có người đầu mối được lãnh đạo ủng hộ.',
      pham_vi_en: 'Pilot in one department or branch, with a point person backed by leadership.' },
    { id: 'gt100', ten: 'Trên 100 người', ten_en: 'Over 100 people',
      pham_vi: 'Nên thử nghiệm tại một đơn vị, với nhóm nòng cốt liên phòng ban.',
      pham_vi_en: 'Pilot in one business unit, with a cross-department core team.' }
  ];
  var CONG_CU = [
    { id: 'excel', ten: 'Sổ sách / Excel', ten_en: 'Paper records / Excel',
      loi_khuyen: 'Vì dữ liệu đang chủ yếu ở sổ/Excel, vòng đầu nên ưu tiên chuẩn hóa dữ liệu gốc trước khi chọn công cụ.',
      loi_khuyen_en: 'Since your data lives mostly in paper records or Excel, the first round should focus on cleaning up the source data before choosing any tool.' },
    { id: 'roi-rac', ten: 'Vài phần mềm rời rạc', ten_en: 'Several disconnected apps',
      loi_khuyen: 'Vì đã có vài phần mềm rời rạc, nên xem việc nối dữ liệu giữa chúng trước khi thêm phần mềm mới.',
      loi_khuyen_en: 'Since you already use several disconnected apps, look at connecting their data before adding new software.' },
    { id: 'he-thong', ten: 'Đã có hệ thống chính', ten_en: 'A core system already in place',
      loi_khuyen: 'Vì đã có hệ thống chính, nên tận dụng nó và tập trung vào điểm nghẽn quy trình thay vì thay mới.',
      loi_khuyen_en: 'Since you already have a core system, build on it and focus on process bottlenecks rather than replacing it.' }
  ];

  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }

  function initTool() {
    var root = document.getElementById('tv-tool');
    if (!root) return;
    var state = { step: 1, picked: {}, quyMo: null, congCu: null };
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function countFor(gid) { return (state.picked[gid] || []).length; }
    function totalPicked() { return GROUPS.reduce(function (s, g) { return s + countFor(g.id); }, 0); }

    function progress(step, label) {
      return '<div class="tv-tool__progress"><span>' + tr('Bước ', 'Step ') + step + '/2 · ' + label + '</span>' +
        '<div class="tv-tool__bar"><i style="width:' + (step === 1 ? 50 : 100) + '%"></i></div></div>';
    }

    // refresh = vẽ lại vì đổi ngôn ngữ: giữ trạng thái, không dời focus / cuộn trang
    function render(refresh) {
      if (state.step === 1) renderStep1();
      else if (state.step === 2) renderStep2(refresh);
      else renderResult(refresh);
    }

    function renderStep1() {
      state.step = 1;
      root.innerHTML = progress(1, tr('Vấn đề đang gặp', 'Current problems')) +
        '<form id="tv-step1" novalidate><div class="tv-tool__groups">' +
        GROUPS.map(function (g) {
          return '<fieldset><legend>' + h(T(g, 'ten')) + '</legend>' +
            T(g, 'van_de').map(function (vd, k) {
              var id = 'tv-' + g.id + '-' + k;
              var checked = (state.picked[g.id] || []).indexOf(k) > -1 ? ' checked' : '';
              return '<label class="tv-check" for="' + id + '"><input type="checkbox" id="' + id + '" data-g="' + g.id + '" data-k="' + k + '"' + checked + '><span>' + h(vd) + '</span></label>';
            }).join('') + '</fieldset>';
        }).join('') +
        '</div><div class="tv-tool__actions">' +
        '<button type="submit" class="btn btn-primary" id="tv-next" disabled>' + tr('Tiếp tục', 'Continue') + '</button>' +
        '<span class="tv-tool__hint" id="tv-hint">' + tr('Tick ít nhất 1 vấn đề để tiếp tục.', 'Tick at least 1 problem to continue.') + '</span>' +
        '<span class="tv-tool__count" id="tv-count" aria-live="polite"></span>' +
        '</div></form>';

      var form = document.getElementById('tv-step1');
      function sync() {
        var n = totalPicked();
        document.getElementById('tv-count').innerHTML = isEn()
          ? '<b>' + n + '</b> ' + (n === 1 ? 'problem' : 'problems') + ' selected'
          : 'Đã chọn <b>' + n + '</b> vấn đề';
        document.getElementById('tv-next').disabled = n === 0;
        document.getElementById('tv-hint').hidden = n > 0;
      }
      form.addEventListener('change', function (e) {
        var cb = e.target; if (cb.type !== 'checkbox') return;
        var g = cb.dataset.g, k = parseInt(cb.dataset.k, 10);
        var arr = state.picked[g] || (state.picked[g] = []);
        var pos = arr.indexOf(k);
        if (cb.checked && pos < 0) arr.push(k);
        if (!cb.checked && pos > -1) arr.splice(pos, 1);
        sync();
      });
      form.addEventListener('submit', function (e) { e.preventDefault(); if (totalPicked()) renderStep2(false); });
      sync();
    }

    function radios(name, list, current, labelId) {
      return '<div class="tv-radios" role="radiogroup" aria-labelledby="' + labelId + '">' + list.map(function (o) {
        return '<label class="tv-radio"><input type="radio" name="' + name + '" value="' + o.id + '"' + (current === o.id ? ' checked' : '') + '><span>' + h(T(o, 'ten')) + '</span></label>';
      }).join('') + '</div>';
    }

    function renderStep2(refresh) {
      state.step = 2;
      var optional = ' <small>' + tr('(không bắt buộc)', '(optional)') + '</small>';
      root.innerHTML = progress(2, tr('Bối cảnh doanh nghiệp', 'Business context')) +
        '<form id="tv-step2">' +
        '<div class="tv-tool__q"><h4 id="tv-q-quy-mo">' + tr('Quy mô nhân sự', 'Team size') + optional + '</h4>' + radios('quy-mo', QUY_MO, state.quyMo, 'tv-q-quy-mo') + '</div>' +
        '<div class="tv-tool__q"><h4 id="tv-q-cong-cu">' + tr('Đang quản lý chủ yếu bằng', 'Mainly managed with') + optional + '</h4>' + radios('cong-cu', CONG_CU, state.congCu, 'tv-q-cong-cu') + '</div>' +
        '<div class="tv-tool__actions"><button type="submit" class="btn btn-primary">' + tr('Xem gợi ý', 'See my recommendation') + '</button>' +
        '<button type="button" class="btn btn-ghost" id="tv-back">' + tr('← Quay lại', '← Back') + '</button></div></form>';
      var form = document.getElementById('tv-step2');
      form.addEventListener('change', function (e) {
        if (e.target.name === 'quy-mo') state.quyMo = e.target.value;
        if (e.target.name === 'cong-cu') state.congCu = e.target.value;
      });
      document.getElementById('tv-back').addEventListener('click', function () {
        renderStep1();
        document.getElementById('tv-next').focus();
      });
      form.addEventListener('submit', function (e) { e.preventDefault(); renderResult(false); });
      if (!refresh) { var first = form.querySelector('input'); if (first) first.focus(); }
    }

    function computeResult() {
      var ranked = GROUPS.map(function (g, i) { return { g: g, n: countFor(g.id), order: i }; })
        .sort(function (a, b) { return b.n - a.n || a.order - b.order; });
      var top = ranked[0].g;
      // vòng sau: ưu tiên các khâu khách cũng tick, bổ sung bằng khâu "thường đi tiếp" của khâu đầu
      var next = ranked.slice(1).filter(function (r) { return r.n > 0; }).map(function (r) { return r.g.id; });
      top.tiep.forEach(function (id) { if (next.indexOf(id) < 0 && id !== top.id) next.push(id); });
      return { ranked: ranked, top: top, next: next.slice(0, 2).map(function (id) { return byId(GROUPS, id); }) };
    }

    // Nội dung điền sẵn ô "Nội dung" ở trang Liên hệ (?diem-bat-dau=), viết theo ngôn ngữ đang xem
    function contactText(res) {
      var parts = res.ranked.filter(function (r) { return r.n > 0; }).map(function (r) { return T(r.g, 'ten') + ' (' + r.n + ')'; });
      var qm = byId(QUY_MO, state.quyMo), cc = byId(CONG_CU, state.congCu);
      var s = tr('Kết quả "Tìm điểm bắt đầu": vấn đề đang gặp — ', '"Find your starting point" result: current problems — ') + parts.join(', ') + '.';
      if (qm) s += tr(' Quy mô: ', ' Team size: ') + T(qm, 'ten') + '.';
      if (cc) s += tr(' Đang quản lý chủ yếu bằng: ', ' Mainly managed with: ') + T(cc, 'ten') + '.';
      s += tr(' Gợi ý bắt đầu: ', ' Suggested starting point: ') + T(res.top, 'ten') + '.';
      s += tr(' Ứng dụng AI quan tâm: ', ' AI applications of interest: ') + T(res.top, 'ai') + '.';
      return s;
    }

    function renderResult(refresh) {
      state.step = 3;
      var res = computeResult();
      var max = res.ranked[0].n || 1;
      var qm = byId(QUY_MO, state.quyMo), cc = byId(CONG_CU, state.congCu);
      var href = CONTACT + '?diem-bat-dau=' + encodeURIComponent(contactText(res));

      root.innerHTML =
        '<div class="tv-result" aria-live="polite">' +
          '<div class="tv-result__main">' +
            '<span class="tv-result__eyebrow">' + tr('Bài toán nên bắt đầu', 'Where to start') + '</span>' +
            '<h3>' + h(T(res.top, 'ten')) + '</h3>' +
            '<p>' + h(T(res.top, 'ly_do')) + '</p>' +
            (cc ? '<p>' + h(T(cc, 'loi_khuyen')) + '</p>' : '') +
            (qm ? '<p>' + h(T(qm, 'pham_vi')) + '</p>' : '') +
            '<span class="tv-result__kpi">' + tr('Chỉ số có thể đo: ', 'Metrics to track: ') + h(T(res.top, 'kpi')) + '</span>' +
            '<div class="tv-result__ai"><span class="dx-ai-tag">' + SPARK + 'AI</span><p><b>' + tr('Ứng dụng AI phù hợp:', 'Suitable AI applications:') + '</b> ' + h(T(res.top, 'ai')) + '</p></div>' +
          '</div>' +
          '<div class="tv-result__bars" role="group" aria-label="' + tr('Số vấn đề theo từng khâu', 'Problems ticked per area') + '">' +
            res.ranked.map(function (r, i) {
              var w = Math.round(r.n / max * 100);
              return '<div class="tv-result__row' + (i === 0 ? ' is-top' : '') + '"><span>' + h(T(r.g, 'ten')) + '</span><div class="track"><i data-w="' + w + '"' + (refresh ? ' style="width:' + w + '%"' : '') + '></i></div><b>' + r.n + '</b></div>';
            }).join('') +
          '</div>' +
          '<div class="tv-result__next"><h4>' + tr('Hành trình đồng hành gợi ý', 'Suggested partnership journey') + '</h4><div class="tv-result__path">' +
            '<span class="is-now">' + tr('Vòng 1 · ', 'Round 1 · ') + h(T(res.top, 'ten')) + '</span>' +
            res.next.map(function (g, i) { return '<em aria-hidden="true">→</em><span>' + tr('Vòng ', 'Round ') + (i + 2) + ' · ' + h(T(g, 'ten')) + '</span>'; }).join('') +
          '</div></div>' +
          '<p class="tv-result__note">' + tr('Đây là gợi ý ban đầu. Bài toán chính thức sẽ được KTP và bạn cùng chọn sau buổi phỏng vấn.', 'This is an initial suggestion. You and KTP will choose the actual problem together after the interview.') + '</p>' +
          '<div class="tv-tool__actions">' +
            '<a class="btn btn-accent btn-lg" href="' + href + '">' + tr('Đặt lịch phỏng vấn miễn phí', 'Book a free discovery interview') + ' ' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>' +
            '<button type="button" class="btn btn-ghost" id="tv-reset">' + tr('Làm lại', 'Start over') + '</button>' +
          '</div>' +
        '</div>';

      // thanh số vấn đề chạy dài ra sau khi vẽ (lần vẽ lại vì đổi ngôn ngữ thì đặt sẵn độ dài)
      if (!refresh) requestAnimationFrame(function () {
        root.querySelectorAll('.track i').forEach(function (i) { i.style.width = i.dataset.w + '%'; });
      });
      document.getElementById('tv-reset').addEventListener('click', function () {
        state = { step: 1, picked: {}, quyMo: null, congCu: null };
        renderStep1();
        root.querySelector('input').focus({ preventScroll: true });
        root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
      if (!refresh) { var h3 = root.querySelector('h3'); if (h3) { h3.tabIndex = -1; h3.focus({ preventScroll: true }); } }
    }

    renderStep1();
    onLang(function () { render(true); }, true);
  }

  /* ---------------- 4. Case đồng hành thực tế ----------------
     Dự án gắn dịch vụ này (dich_vu_lien_quan). Thẻ lớn: dự án "Đang đồng hành" (hoặc dự án đầu tiên); các dự án còn lại: thẻ nhỏ.
     Section mặc định ẩn trong HTML; có dự án thì hiện ra và đảo nền các section phía sau để giữ nhịp nền xen kẽ. */
  function initCases() {
    var section = document.getElementById('dong-hanh-thuc-te');
    var root = document.getElementById('tv-cases');
    if (!section || !root) return;
    var list = typeof DATA_DU_AN === 'undefined' ? [] : DATA_DU_AN.filter(function (d) { return d.dich_vu_lien_quan === SLUG; });
    // Chưa có dự án: giữ ẩn section và mọi link trong trang trỏ tới nó
    document.querySelectorAll('a[href="#' + section.id + '"]').forEach(function (a) { a.hidden = !list.length; });
    if (!list.length) return;

    var K = window.KTPCase, en = KTP.en;
    var url = function (u) { return /^(https?:)?\//.test(u) ? u : ROOT + u; };
    var detail = function (d) { return '../../du-an/chi-tiet/index.html?slug=' + d.slug; };
    var plainEn = function (s) { return s ? K.plain(s) : ''; };
    var badges = function (d) { return '<div class="case-card__badges">' + KTP.domainBadge(d) + K.badges(d) + '</div>'; };
    var feature = list.filter(function (d) { return d.trang_thai === 'dang-dong-hanh'; })[0] || list[0];
    var minis = list.filter(function (d) { return d !== feature; });

    // Thẻ lớn: hành trình phạm vi (pham_vi) nếu có, không thì 3 giá trị kinh doanh (ket_qua)
    function scope(d) {
      if (d.pham_vi && d.pham_vi.length) {
        return '<div class="tv-case-feature__scope">' + d.pham_vi.map(function (p) {
          return '<span><em' + en(p.giai_doan_en) + '>' + p.giai_doan + '</em><span' + en(p.hang_muc_en) + '>' + p.hang_muc + '</span></span>';
        }).join('') + '</div>';
      }
      if (d.ket_qua && d.ket_qua.length) {
        return '<ul class="tv-case-feature__results">' + d.ket_qua.map(function (kq) {
          return '<li><strong' + en(kq.chi_so_en) + '>' + kq.chi_so + '</strong><span' + en(kq.mo_ta_en) + '>' + kq.mo_ta + '</span></li>';
        }).join('') + '</ul>';
      }
      return '';
    }

    var out = '';
    // Card là <article> (không bọc <a>) để chứa nút demo riêng
    out += '<article class="card tv-case-feature is-hoverable' + (feature.anh ? '' : ' tv-case-feature--noimg') + '">' +
      (feature.anh ? '<a class="tv-case-feature__img" href="' + detail(feature) + '" tabindex="-1" aria-hidden="true"><img src="' + url(feature.anh) + '" alt="" loading="lazy"></a>' : '') +
      '<div class="tv-case-feature__body">' +
        badges(feature) +
        '<h3><a class="case-card__title-link" href="' + detail(feature) + '"' + en(feature.ten_du_an_en) + '>' + feature.ten_du_an + '</a></h3>' +
        (feature.an_ten_khach_hang
          ? '<p class="case-confidential" style="margin:0;" data-en="Client name withheld under a confidentiality agreement.">Tên khách hàng được ẩn theo thỏa thuận bảo mật.</p>'
          : (feature.khach_hang ? '<p class="tv-case-feature__client"><span data-en="Client:">Khách hàng:</span> <strong' + en(feature.khach_hang_en) + '>' + feature.khach_hang + '</strong></p>' : '')) +
        '<p' + en(plainEn(feature.tom_tat_en)) + '>' + K.plain(feature.tom_tat) + '</p>' +
        scope(feature) +
        '<div class="case-card__actions">' +
          '<a class="service-card__link" href="' + detail(feature) + '"><span data-en="View partnership scope">Xem phạm vi đồng hành</span> ' + ARROW + '</a>' +
          K.demo(feature, ROOT, 'btn-sm') +
        '</div>' +
      '</div></article>';
    if (minis.length) {
      out += '<div class="grid-2">' + minis.map(function (d) {
        var kq = d.ket_qua && d.ket_qua[0];
        return '<article class="card tv-case-mini is-hoverable">' +
          badges(d) +
          '<h4><a class="case-card__title-link" href="' + detail(d) + '"' + en(d.ten_du_an_en) + '>' + d.ten_du_an + '</a></h4>' +
          '<p' + en(plainEn(d.tom_tat_en)) + '>' + K.plain(d.tom_tat) + '</p>' +
          (kq ? '<div class="case-card__metric"><strong' + en(kq.chi_so_en) + '>' + kq.chi_so + '</strong><span' + en(kq.mo_ta_en) + '>' + kq.mo_ta + '</span></div>' : '') +
          '<div class="case-card__actions">' +
            '<a class="service-card__link" href="' + detail(d) + '"><span data-en="View details">Xem chi tiết</span> ' + ARROW + '</a>' +
            K.demo(d, ROOT, 'btn-sm') +
          '</div>' +
        '</article>';
      }).join('') + '</div>';
    }
    root.innerHTML = out;
    section.hidden = false;
    for (var s = section.nextElementSibling; s; s = s.nextElementSibling) {
      if (s.tagName === 'SECTION' && !s.classList.contains('section-bg-solid')) s.classList.toggle('section-bg-surface');
    }
  }

  initAgents();
  initStepper();
  initTool();
  initCases();
})();
