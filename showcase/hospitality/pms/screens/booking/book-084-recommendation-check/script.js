document.addEventListener('DOMContentLoaded', function () {
  var buSelect = document.getElementById('bu-select');
  var typeSelect = document.getElementById('type-select');
  var criteriaSelect = document.getElementById('criteria-select');
  var lastResult = null;

  MM.BOOK.BUSINESS_UNITS.forEach(function (bu) {
    var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSelect.appendChild(o);
  });
  MM.BOOK.PROPERTY_TYPES.forEach(function (t) {
    var o = document.createElement('option'); o.value = t; o.textContent = t; typeSelect.appendChild(o);
  });
  MM.BOOK.getRecommendationCriteria().forEach(function (c) {
    var o = document.createElement('option'); o.value = c.id; o.textContent = c.name; criteriaSelect.appendChild(o);
  });

  function symbol(cls) { return cls === 'success' ? '&#9650;' : cls === 'danger' ? '&#9660;' : '&#8212;'; }
  function badgeCls(cls) { return cls === 'success' ? 'badge-success' : cls === 'danger' ? 'badge-danger' : 'badge-neutral'; }
  function cell(band) {
    return '<span class="badge ' + badgeCls(band.cls) + '">' + symbol(band.cls) + ' ' + band.pct + '%</span>';
  }

  function renderResults() {
    var tbody = document.getElementById('analysis_data');
    if (!lastResult || !lastResult.rows.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' +
        '<h3>No villas match this filter</h3><p>Try a different business unit or property type.</p></div></td></tr>';
      return;
    }
    var rowsHtml = '';
    if (lastResult.average) {
      rowsHtml += '<tr class="kpi-total-row"><td class="cell-strong">Average</td><td>' + cell(lastResult.average.lastMinute) + '</td><td>' + cell(lastResult.average.regular) + '</td><td>' + cell(lastResult.average.earlyBird) + '</td><td>—</td><td></td></tr>';
    }
    rowsHtml += lastResult.rows.map(function (r) {
      var logHtml = r.lastLog ? ('<div class="cell-sub">' + new Date(r.lastLog.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + '</div><div class="text-xs text-muted">' + r.lastLog.comment + '</div>') : '<span class="text-xs text-muted">No notes yet</span>';
      return '<tr>' +
        '<td class="cell-strong">' + r.villaName + '</td>' +
        '<td>' + cell(r.lastMinute) + '</td>' +
        '<td>' + cell(r.regular) + '</td>' +
        '<td>' + cell(r.earlyBird) + '</td>' +
        '<td>' + logHtml + '</td>' +
        '<td><button class="btn btn-ghost btn-sm" data-log="' + r.villaId + '" data-name="' + r.villaName + '" title="Add log"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button></td>' +
      '</tr>';
    }).join('');
    tbody.innerHTML = rowsHtml;

    tbody.querySelectorAll('[data-log]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLogModal(btn.getAttribute('data-log'), btn.getAttribute('data-name'));
      });
    });
  }

  var logTargetId = null;
  function openLogModal(villaId, villaName) {
    logTargetId = villaId;
    document.getElementById('log-villa-label').textContent = villaName;
    document.getElementById('log-comment').value = '';
    document.querySelectorAll('#log-form .form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('log-modal');
  }

  var logForm = document.getElementById('log-form');
  MM.bindFormValidation(logForm);
  document.getElementById('log-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(logForm)) { MM.showToast('Please enter a comment.', { danger: true }); return; }
    var comment = document.getElementById('log-comment').value.trim();
    var btn = this;
    MM.simulateSave(btn, 'Saving…', function () {
      MM.BOOK.saveRecommendationLog(logTargetId, comment, 'Daniel Tan');
      MM.closeModal('log-modal');
      MM.showToast('Log saved.');
      runCheck();
    });
  });

  function runCheck() {
    lastResult = MM.BOOK.computeRecommendationCheck(buSelect.value, typeSelect.value, criteriaSelect.value);
    renderResults();
  }

  var form = document.getElementById('check-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please select business unit and criteria.', { danger: true }); return; }
    var btn = document.getElementById('check-btn');
    MM.simulateSave(btn, 'Checking…', runCheck);
  });
});
