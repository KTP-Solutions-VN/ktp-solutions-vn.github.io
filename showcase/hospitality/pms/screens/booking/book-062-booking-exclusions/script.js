document.addEventListener('DOMContentLoaded', function () {
  var TAB_LABELS = { complete: 'Complete Exclusions', nill_value: 'Nill Value Exclusions', early: 'Early Exclusions', late: 'Late Exclusions' };
  var currentTab = 'complete';

  function renderRows() {
    document.getElementById('tab-title').textContent = TAB_LABELS[currentTab];
    var rows = MM.BOOK.getExclusions(currentTab);
    var tbody = document.getElementById('exclusion-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>' +
        '<h3>No exclusion keywords yet</h3><p>Add the first keyword to exclude matching bookings from this category.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (r) {
      return '<tr>' +
        '<td class="cell-strong">' + r.keyword + '</td>' +
        '<td>' + (r.addedBy || '—') + '</td>' +
        '<td>' + MM.BOOK.fmtDate(r.on) + '</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit="' + r.id + '" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + r.id + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>' +
        '</div></td>' +
      '</tr>';
    }).join('');

    tbody.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-edit');
        var row = rows.filter(function (r) { return r.id === id; })[0];
        openModalFor(row);
      });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-delete');
        var row = rows.filter(function (r) { return r.id === id; })[0];
        MM.BOOK.confirmAction('Delete exclusion keyword "' + row.keyword + '"? Bookings matching it will reappear in reports.', function () {
          var all = MM.BOOK.getExclusions(currentTab).filter(function (r) { return r.id !== id; });
          MM.BOOK.saveExclusions(currentTab, all);
          MM.showToast('Exclusion keyword deleted.', { danger: true });
          renderRows();
        }, { title: 'Delete keyword' });
      });
    });
  }

  function openModalFor(row) {
    document.getElementById('keyword-modal-title').textContent = row ? 'Edit Exclusion Keyword' : 'Add Exclusion Keyword';
    document.getElementById('keyword-id').value = row ? row.id : '';
    document.getElementById('keyword-input').value = row ? row.keyword : '';
    document.querySelector('#keyword-input').closest('.form-group').classList.remove('has-error');
    MM.openModal('keyword-modal');
  }

  document.getElementById('add-keyword-btn').addEventListener('click', function () { openModalFor(null); });

  document.querySelectorAll('#exclusion-tabs [data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () { currentTab = btn.getAttribute('data-tab'); renderRows(); });
  });

  var form = document.getElementById('keyword-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please enter a keyword.', { danger: true }); return; }
    var id = document.getElementById('keyword-id').value;
    var keyword = document.getElementById('keyword-input').value.trim();
    var rows = MM.BOOK.getExclusions(currentTab);
    var dup = rows.some(function (r) { return r.keyword.toLowerCase() === keyword.toLowerCase() && r.id !== id; });
    if (dup) { MM.showToast('This keyword already exists in this category.', { danger: true }); return; }

    var btn = document.getElementById('keyword-save-btn');
    MM.simulateSave(btn, 'Saving…', function () {
      if (id) {
        rows = rows.map(function (r) { return r.id === id ? Object.assign({}, r, { keyword: keyword }) : r; });
      } else {
        rows.unshift({ id: MM.uid('EX'), keyword: keyword, addedBy: 'Somchai Anuwat', on: new Date().toISOString().slice(0, 10) });
      }
      MM.BOOK.saveExclusions(currentTab, rows);
      MM.closeModal('keyword-modal');
      MM.showToast(id ? 'Exclusion keyword updated.' : 'Exclusion keyword added.');
      renderRows();
    });
  });

  renderRows();
});
