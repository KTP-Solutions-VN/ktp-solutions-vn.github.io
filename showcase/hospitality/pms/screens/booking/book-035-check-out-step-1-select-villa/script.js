document.addEventListener('DOMContentLoaded', function () {
  var COMPLETIONS_KEY = 'mm_checkout_completions';
  var CONTROL_POINTS = ['Living Room', 'Master Bedroom', 'Kitchen', 'Bathroom', 'Pool Area', 'Garden/Exterior'];
  var TODAY = '2026-09-02';

  function safeParse(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }
  function getCompletions() { return safeParse(COMPLETIONS_KEY, []); }
  function saveCompletion(rec) {
    var all = getCompletions();
    all.push(rec);
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(all));
  }

  /* Pending check-outs today, sourced from the shared CHECKOUT_CONTROLS cast. */
  function pendingList() {
    var completedIds = getCompletions().map(function (c) { return c.coId; });
    return MM.BOOK.CHECKOUT_CONTROLS.map(function (c) {
      return { coId: c.id, property: c.property, checkOutDate: TODAY, done: completedIds.indexOf(c.id) !== -1 };
    });
  }

  function rowHtml(r) {
    return '<tr data-co="' + r.coId + '">' +
      '<td class="cell-strong">' + r.property + '</td>' +
      '<td>' + MM.BOOK.fmtDate(r.checkOutDate) + '</td>' +
      '<td>' + (r.done ? '<span class="badge badge-success">Completed</span>' : '<span class="badge badge-warning">Pending</span>') + '</td>' +
      '<td style="text-align:right;">' +
        (r.done ? '<span class="text-xs text-muted">Done</span>' :
          '<button class="btn btn-primary btn-sm" data-start="' + r.coId + '">Start Check-out</button>') +
      '</td>' +
    '</tr>';
  }

  function render() {
    var rows = pendingList();
    var tbody = document.getElementById('villa-rows');
    tbody.innerHTML = rows.length ? rows.map(rowHtml).join('') :
      '<tr><td colspan="4"><div class="empty-state"><h3>No check-outs pending</h3><p>All villas have been checked out for today.</p></div></td></tr>';
    tbody.querySelectorAll('[data-start]').forEach(function (btn) {
      btn.addEventListener('click', function () { startWizard(btn.getAttribute('data-start')); });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Wizard state                                                       */
  /* ---------------------------------------------------------------- */
  var wiz = null;

  function freshPointState() {
    var pts = {};
    CONTROL_POINTS.forEach(function (name) {
      pts[name] = { status: null, issue: false, issuedTo: '', description: '', compensation: '', amountPaid: '', photos: 0 };
    });
    return pts;
  }

  function startWizard(coId) {
    var co = MM.BOOK.CHECKOUT_CONTROLS.filter(function (c) { return c.id === coId; })[0];
    if (!co) return;
    wiz = { coId: coId, property: co.property, step: 2, points: freshPointState(), rating: 5, review: '', lat: (1.24 + Math.random() * 0.02).toFixed(4), lon: (103.82 + Math.random() * 0.03).toFixed(4) };
    document.getElementById('wizard-villa-name').textContent = co.property;
    document.getElementById('gps-coords-3').textContent = wiz.lat + ', ' + wiz.lon;
    document.getElementById('gps-coords-4').textContent = wiz.lat + ', ' + wiz.lon;
    renderControlPoints();
    goToStep(2);
    MM.openModal('modal-checkout-wizard');
  }

  function renderControlPoints() {
    var host = document.getElementById('control-points-list');
    host.innerHTML = CONTROL_POINTS.map(function (name) {
      var p = wiz.points[name];
      return '<div class="control-point-row-wrap" data-point="' + name + '">' +
        '<div class="control-point-row">' +
          '<div class="control-point-row__name">' + name + '</div>' +
          '<div class="control-point-row__toggle">' +
            '<button type="button" class="cp-btn pass' + (p.status === 'pass' ? ' active' : '') + '" data-cp-pass="' + name + '">Passed</button>' +
            '<button type="button" class="cp-btn damaged' + (p.status === 'damaged' ? ' active' : '') + '" data-cp-damage="' + name + '">Damaged</button>' +
          '</div>' +
        '</div>' +
        '<div class="control-point-detail' + (p.status === 'damaged' ? ' open' : '') + '" data-cp-detail="' + name + '">' +
          '<div class="form-grid">' +
            '<div class="form-group"><label>Responsible Party</label><select data-cp-field="issuedTo" data-cp-name="' + name + '">' +
              '<option value="">None</option><option' + (p.issuedTo === 'Guest' ? ' selected' : '') + '>Guest</option><option' + (p.issuedTo === 'Owner' ? ' selected' : '') + '>Owner</option><option' + (p.issuedTo === 'Staff' ? ' selected' : '') + '>Staff</option></select></div>' +
            '<div class="form-group"><label>Compensation Amount</label><input type="number" min="0" data-cp-field="compensation" data-cp-name="' + name + '" value="' + p.compensation + '" placeholder="0.00"></div>' +
            '<div class="form-group full"><label>Damage Description</label><textarea data-cp-field="description" data-cp-name="' + name + '" placeholder="Describe what happened...">' + p.description + '</textarea></div>' +
          '</div>' +
          '<button type="button" class="photo-add-btn" data-cp-photo="' + name + '" style="width:120px;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
            '<span data-cp-photo-label="' + name + '">' + (p.photos ? p.photos + ' photo' + (p.photos > 1 ? 's' : '') + ' added' : 'Add Photo') + '</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    host.querySelectorAll('[data-cp-pass]').forEach(function (btn) {
      btn.addEventListener('click', function () { setPointStatus(btn.getAttribute('data-cp-pass'), 'pass'); });
    });
    host.querySelectorAll('[data-cp-damage]').forEach(function (btn) {
      btn.addEventListener('click', function () { setPointStatus(btn.getAttribute('data-cp-damage'), 'damaged'); });
    });
    host.querySelectorAll('[data-cp-field]').forEach(function (input) {
      input.addEventListener('change', function () {
        var name = input.getAttribute('data-cp-name');
        var field = input.getAttribute('data-cp-field');
        wiz.points[name][field] = input.value;
      });
    });
    host.querySelectorAll('[data-cp-photo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var name = btn.getAttribute('data-cp-photo');
        wiz.points[name].photos += 1;
        host.querySelector('[data-cp-photo-label="' + name + '"]').textContent = wiz.points[name].photos + ' photo' + (wiz.points[name].photos > 1 ? 's' : '') + ' added';
        MM.showToast('Photo attached to ' + name + '.');
      });
    });
  }

  function setPointStatus(name, status) {
    wiz.points[name].status = status;
    wiz.points[name].issue = status === 'damaged';
    var wrap = document.querySelector('.control-point-row-wrap[data-point="' + name + '"]');
    wrap.querySelector('.cp-btn.pass').classList.toggle('active', status === 'pass');
    wrap.querySelector('.cp-btn.damaged').classList.toggle('active', status === 'damaged');
    wrap.querySelector('[data-cp-detail]').classList.toggle('open', status === 'damaged');
  }

  /* Star rating */
  document.querySelectorAll('#star-rating .star').forEach(function (star) {
    star.addEventListener('click', function () {
      var n = parseInt(star.getAttribute('data-star'), 10);
      if (wiz) wiz.rating = n;
      paintStars(n);
    });
  });
  function paintStars(n) {
    document.querySelectorAll('#star-rating .star').forEach(function (s) {
      s.classList.toggle('on', parseInt(s.getAttribute('data-star'), 10) <= n);
    });
  }

  document.getElementById('checkout-review').addEventListener('input', function (e) {
    if (wiz) wiz.review = e.target.value;
  });

  function goToStep(n) {
    wiz.step = n;
    document.querySelectorAll('[data-wizard-panel]').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-wizard-panel') !== String(n);
    });
    document.querySelectorAll('[data-step-dot]').forEach(function (dot) {
      var s = parseInt(dot.getAttribute('data-step-dot'), 10);
      dot.classList.toggle('done', s < n);
      dot.classList.toggle('active', s === n);
    });
    if (n === 3) paintStars(wiz.rating);
    var btn = document.getElementById('btn-wizard-continue');
    btn.textContent = n === 4 ? 'Confirm Completion' : 'Continue';
  }

  document.getElementById('btn-wizard-continue').addEventListener('click', function () {
    if (!wiz) return;
    if (wiz.step === 2) {
      var unmarked = CONTROL_POINTS.filter(function (name) { return !wiz.points[name].status; });
      if (unmarked.length) {
        MM.showToast('Mark every control point as Passed or Damaged before continuing.', { danger: true });
        return;
      }
      var missingDesc = CONTROL_POINTS.filter(function (name) { return wiz.points[name].status === 'damaged' && !wiz.points[name].description.trim(); });
      if (missingDesc.length) {
        MM.showToast('Add a damage description for: ' + missingDesc.join(', ') + '.', { danger: true });
        return;
      }
      goToStep(3);
    } else if (wiz.step === 3) {
      goToStep(4);
      var damagedCount = CONTROL_POINTS.filter(function (name) { return wiz.points[name].status === 'damaged'; }).length;
      document.getElementById('summary-villa').textContent = wiz.property;
      document.getElementById('summary-damage').textContent = damagedCount ? damagedCount + ' point' + (damagedCount > 1 ? 's' : '') + ' flagged' : 'None reported';
      document.getElementById('summary-rating').textContent = wiz.rating + ' / 5 stars';
    } else if (wiz.step === 4) {
      var btn = this;
      MM.simulateSave(btn, 'Confirming...', function () {
        saveCompletion({
          coId: wiz.coId, property: wiz.property, completedAt: new Date().toISOString(),
          damagePoints: CONTROL_POINTS.filter(function (name) { return wiz.points[name].status === 'damaged'; }),
          rating: wiz.rating, review: wiz.review, lat: wiz.lat, lon: wiz.lon
        });
        MM.closeModal('modal-checkout-wizard');
        MM.showToast('Check-out completed for ' + wiz.property + '. Recorded in Check-out Control.');
        wiz = null;
        render();
      });
    }
  });

  render();
});
