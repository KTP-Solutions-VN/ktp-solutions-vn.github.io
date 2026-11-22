/* CR-02 — Bộ hiệu ứng portfolio (JS thuần, không thư viện), dùng chung cho trang Dự án và Chi tiết dự án.
   Lấy cảm hứng chuyển động từ mẫu "3D portfolio" (motionsites.ai) nhưng viết lại hoàn toàn, theo token KTP.
   - magnet(el)        : vật thể nhích theo chuột khi con trỏ ở gần (desktop)
   - scrollMarquee()   : 2 hàng ảnh chạy ngược chiều nhau theo vị trí cuộn trang
   - charReveal(el)    : chữ sáng dần từng ký tự theo tiến độ cuộn (opacity 0.2 → 1)
   - stickyStack()     : card dự án xếp chồng, card phía dưới thu nhỏ dần khi card sau trượt lên
   - parallax(el)      : ảnh trôi chậm hơn trang
   Tất cả tắt khi prefers-reduced-motion; magnet + stickyStack tắt dưới 768px. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 768px)');
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* Một vòng rAF dùng chung cho mọi hiệu ứng theo cuộn */
  var jobs = [], ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; jobs.forEach(function (fn) { fn(); }); });
  }
  function addJob(fn) {
    jobs.push(fn);
    if (jobs.length === 1) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
    fn();
  }

  function magnet(el, opts) {
    if (!el || reduce) return;
    opts = opts || {};
    var padding = opts.padding || 150, strength = opts.strength || 3;
    var active = false;
    window.addEventListener('mousemove', function (e) {
      if (!desktop.matches) return;
      var r = el.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var inside = Math.abs(cx - e.clientX) < r.width / 2 + padding && Math.abs(cy - e.clientY) < r.height / 2 + padding;
      if (inside) {
        if (!active) { active = true; el.style.transition = 'transform 0.3s ease-out'; }
        el.style.transform = 'translate3d(' + ((e.clientX - cx) / strength).toFixed(1) + 'px,' + ((e.clientY - cy) / strength).toFixed(1) + 'px,0)';
      } else if (active) {
        active = false; el.style.transition = 'transform 0.6s ease-in-out'; el.style.transform = 'translate3d(0,0,0)';
      }
    }, { passive: true });
    el.style.willChange = 'transform';
  }

  /* rows: [track1, track2] — mỗi track chứa nội dung đã nhân 3 để chạy liền mạch.
     Vị trí = trôi nhẹ theo cuộn trang + phần "tự chạy" khi hover lên hàng đó (infinite, hàng 1 sang phải, hàng 2 sang trái).
     Vận tốc tăng/giảm mượt khi vào/rời hover. Thiết bị không có hover (cảm ứng): tự chạy chậm liên tục.
     Reduced-motion: không tự chạy — mỗi hàng cuộn ngang bằng tay được (class pf-marquee--manual). */
  function scrollMarquee(section, rows, opts) {
    if (!section || !rows.length) return;
    opts = opts || {};
    if (reduce) { section.classList.add('pf-marquee--manual'); return; }
    var SPEED = opts.speed || 100;             // px/giây khi hover (~4s mỗi ảnh 432px)
    var IDLE = opts.idleSpeed || 28;           // px/giây trên thiết bị cảm ứng
    var touch = window.matchMedia('(hover: none)').matches;
    var state = rows.map(function () { return { auto: 0, vel: 0, target: touch ? IDLE : 0 }; });
    var loopOn = false, last = 0;

    function render() {
      var top = section.getBoundingClientRect().top + window.scrollY;
      var base = (window.scrollY - top + window.innerHeight) * 0.3;
      rows.forEach(function (t, i) {
        var set = t.scrollWidth / 3 || 1;
        var v = base + state[i].auto;
        var o = ((v % set) + set) % set;
        var x = i === 0 ? (-set + o) : -o; // luôn nằm trong [-set, 0] → không bao giờ lộ khoảng trống
        t.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      });
    }
    function frame(ts) {
      var dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      var moving = false;
      state.forEach(function (s) {
        // ease vào ~0.25s; khi rời hover giảm tốc nhanh hơn và dừng hẳn dưới 3px/s (~0.6s) để không "trôi lê thê"
        s.vel += (s.target - s.vel) * Math.min(1, dt * (s.target ? 4 : 5));
        if (Math.abs(s.vel) < 3 && s.target === 0) s.vel = 0;
        s.auto += s.vel * dt;
        if (s.vel !== 0 || s.target !== 0) moving = true;
      });
      render();
      if (moving) requestAnimationFrame(frame); else { loopOn = false; last = 0; }
    }
    function kick() { if (!loopOn) { loopOn = true; last = 0; requestAnimationFrame(frame); } }

    rows.forEach(function (t, i) {
      t.style.willChange = 'transform';
      var row = t.parentElement;
      row.addEventListener('mouseenter', function () { state[i].target = SPEED; row.classList.add('is-running'); kick(); });
      row.addEventListener('mouseleave', function () { state[i].target = touch ? IDLE : 0; row.classList.remove('is-running'); kick(); });
    });
    addJob(render);
    if (touch) kick();
  }

  /* Tách chữ thành span theo từ (giữ xuống dòng tự nhiên) → span theo ký tự.
     Gọi lại được (đổi ngôn ngữ VI/EN: đặt lại textContent rồi gọi lại) — chỉ đăng ký 1 job cuộn cho mỗi phần tử. */
  function charReveal(el) {
    if (!el) return;
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(' ').map(function (w) {
      return '<span class="pf-word" aria-hidden="true">' + Array.prototype.map.call(w, function (c) {
        return '<span class="pf-char">' + c + '</span>';
      }).join('') + '</span>';
    }).join(' ');
    el._chars = el.querySelectorAll('.pf-char');
    if (reduce) return;
    if (el._crJob) { el._crJob(); return; }
    el._crJob = function () {
      var chars = el._chars, n = chars.length;
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      // offset ['start 0.8', 'end 0.2']: 0 khi đầu đoạn chạm 80% màn hình, 1 khi cuối đoạn chạm 20%
      var p = clamp((vh * 0.8 - r.top) / (r.height + vh * 0.6), 0, 1);
      var lit = p * n;
      for (var i = 0; i < n; i++) chars[i].style.opacity = (0.2 + 0.8 * clamp(lit - i, 0, 1)).toFixed(2);
    };
    addJob(el._crJob);
  }

  /* list: phần tử chứa các .pf-card-wrap (sticky); card thu nhỏ tới 1 - (n-1-i)*0.03 */
  function stickyStack(list) {
    if (!list) return;
    var cards = Array.prototype.slice.call(list.querySelectorAll('.pf-card'));
    var n = cards.length;
    if (!n) return;
    addJob(function () {
      if (reduce || !desktop.matches) { cards.forEach(function (c) { c.style.transform = ''; }); return; }
      var r = list.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = clamp(-r.top / (total || 1), 0, 1);
      cards.forEach(function (c, i) {
        var target = 1 - (n - 1 - i) * 0.03;
        var start = i / n;
        var local = clamp((p - start) / (1 - start || 1), 0, 1);
        c.style.transform = 'scale(' + (1 - (1 - target) * local).toFixed(4) + ')';
      });
    });
  }

  function parallax(el, speed) {
    if (!el || reduce) return;
    speed = speed || 0.08;
    addJob(function () {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      el.style.transform = 'translate3d(0,' + (r.top * -speed).toFixed(1) + 'px,0) scale(1.08)';
    });
  }

  window.KTPMotion = { magnet: magnet, scrollMarquee: scrollMarquee, charReveal: charReveal, stickyStack: stickyStack, parallax: parallax, reduce: reduce };
})();
