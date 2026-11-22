document.addEventListener('DOMContentLoaded', function () {
  var state = { bu: '', level: '', villa: '' };

  function populateFilters() {
    var buSel = document.getElementById('filter-bu');
    BOOK.BUSINESS_UNITS.forEach(function (bu) {
      var o = document.createElement('option'); o.value = bu.name; o.textContent = bu.name; buSel.appendChild(o);
    });
    var villaSel = document.getElementById('filter-villa');
    BOOK.VILLAS.forEach(function (v) {
      var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; villaSel.appendChild(o);
    });
    var formVillaSel = document.getElementById('log-villa');
    BOOK.VILLAS.forEach(function (v) {
      var o = document.createElement('option'); o.value = v.id; o.textContent = v.name; formVillaSel.appendChild(o);
    });
  }

  function rowHtml(r) {
    var villa = BOOK.villaById(r.villaId);
    var label = villa ? villa.name : '—';
    return '<tr>' +
      '<td>' + BOOK.fmtDate(r.date) + '</td>' +
      '<td class="cell-strong">' + label + ' <span class="badge badge-neutral" style="margin-left:6px;">' + r.entryLevel + '</span></td>' +
      '<td>' + (r.action || BOOK.rateChangeAction(r)) + '</td>' +
      '<td>' + (r.by || '—') + '</td>' +
      '<td><div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + r.id + '" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + r.id + '" title="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      '</div></td></tr>';
  }

  function render() {
    var all = BOOK.getRateChangeLog();
    var filtered = all.filter(function (r) {
      var villa = BOOK.villaById(r.villaId);
      if (state.bu && (!villa || villa.bu !== state.bu)) return false;
      if (state.level && r.entryLevel !== state.level) return false;
      if (state.villa && r.villaId !== state.villa) return false;
      return true;
    }).sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var tbody = document.getElementById('log-rows');
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>' +
        '<h3>No rate change logs match these filters</h3><p>Add the first log entry, or clear the filters.</p></div></td></tr>';
    } else {
      tbody.innerHTML = filtered.map(rowHtml).join('');
    }
    document.getElementById('result-count').textContent = filtered.length + ' entr' + (filtered.length === 1 ? 'y' : 'ies');

    tbody.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { openForm(btn.getAttribute('data-edit')); });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-delete');
        var row = BOOK.rateChangeLogById(id);
        BOOK.confirmAction('Delete this rate change log entry' + (row ? ' for ' + (BOOK.villaById(row.villaId) || {}).name : '') + '? This cannot be undone.', function () {
          var next = BOOK.getRateChangeLog().filter(function (r) { return r.id !== id; });
          BOOK.saveRateChangeLog(next);
          MM.showToast('Log entry deleted.', { danger: true });
          render();
        }, { title: 'Delete log entry' });
      });
    });
  }

  function openForm(id) {
    var form = document.getElementById('log-form');
    MM.bindFormValidation && MM.bindFormValidation(form);
    if (id) {
      var row = BOOK.rateChangeLogById(id);
      document.getElementById('log-form-title').textContent = 'Edit Log';
      document.getElementById('log-id').value = row.id;
      document.getElementById('log-level').value = row.entryLevel;
      document.getElementById('log-villa').value = row.villaId;
      document.getElementById('log-action').value = row.action || BOOK.rateChangeAction(row);
    } else {
      document.getElementById('log-form-title').textContent = 'Add Log';
      form.reset();
      document.getElementById('log-id').value = '';
    }
    window.MM.openModal('modal-log-form');
  }

  document.getElementById('btn-add-log').addEventListener('click', function () { openForm(null); });

  document.getElementById('btn-save-log').addEventListener('click', function () {
    var form = document.getElementById('log-form');
    if (MM.validateForm && !MM.validateForm(form)) return;
    var id = document.getElementById('log-id').value;
    var villaId = document.getElementById('log-villa').value;
    var villa = BOOK.villaById(villaId);
    var btn = this;
    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = 'Saving…';
    MM.simulateSave(function () {
      btn.disabled = false; btn.textContent = original;
      var all = BOOK.getRateChangeLog();
      if (id) {
        all = all.map(function (r) {
          if (r.id !== id) return r;
          return Object.assign({}, r, {
            entryLevel: document.getElementById('log-level').value,
            villaId: villaId,
            action: document.getElementById('log-action').value
          });
        });
        MM.showToast('Log entry updated.');
      } else {
        all.unshift({
          id: 'RCL-' + MM.uid(), date: new Date().toISOString().slice(0, 10),
          entryLevel: document.getElementById('log-level').value, villaId: villaId,
          action: document.getElementById('log-action').value, by: 'Daniel Tan'
        });
        MM.showToast('Log entry added.');
      }
      BOOK.saveRateChangeLog(all);
      window.MM.closeModal('modal-log-form');
      render();
    });
  });

  document.getElementById('filter-bu').addEventListener('change', function (e) { state.bu = e.target.value; render(); });
  document.getElementById('filter-level').addEventListener('change', function (e) { state.level = e.target.value; render(); });
  document.getElementById('filter-villa').addEventListener('change', function (e) { state.villa = e.target.value; render(); });

  populateFilters();
  render();
});
