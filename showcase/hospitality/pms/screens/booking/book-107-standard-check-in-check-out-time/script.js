(function () {
  'use strict';
  var BOOK = MM.BOOK;

  function fmtTime(t) {
    if (!t) return '—';
    var parts = t.split(':');
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + m + ' ' + ampm;
  }

  document.getElementById('sf-bu').innerHTML = (BOOK.BUSINESS_UNITS || []).map(function (bu) {
    var name = typeof bu === 'string' ? bu : bu.name;
    return '<option>' + name + '</option>';
  }).join('');

  function render() {
    var rows = BOOK.getStandardTimes();
    document.getElementById('list-tbody').innerHTML = rows.length ? rows.map(function (r, i) {
      return '<tr><td>' + (i + 1) + '</td><td class="cell-strong">' + r.bu + '</td><td>' + fmtTime(r.checkInTime) + '</td><td>' + fmtTime(r.checkOutTime) + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-edit="' + r.id + '">Edit</button> <button class="btn btn-ghost btn-sm" data-delete="' + r.id + '">Delete</button></td></tr>';
    }).join('') : '<tr><td colspan="5"><div class="empty-state"><p>No standard times configured yet.</p></div></td></tr>';
  }

  var editingId = null;
  var pendingDeleteId = null;

  function openAdd() {
    editingId = null;
    document.getElementById('form-modal-title').textContent = 'Add Standard Time';
    document.getElementById('std-form').reset();
    document.getElementById('sf-bu').disabled = false;
    MM.openModal('form-modal');
  }
  document.getElementById('add-btn').addEventListener('click', openAdd);

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var row = BOOK.getStandardTimes().filter(function (r) { return r.id === editBtn.getAttribute('data-edit'); })[0];
      if (!row) return;
      editingId = row.id;
      document.getElementById('form-modal-title').textContent = 'Edit Standard Time';
      document.getElementById('sf-bu').value = row.bu;
      document.getElementById('sf-bu').disabled = true;
      document.getElementById('sf-checkin').value = row.checkInTime;
      document.getElementById('sf-checkout').value = row.checkOutTime;
      MM.openModal('form-modal');
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) { pendingDeleteId = delBtn.getAttribute('data-delete'); MM.openModal('delete-modal'); }
  });

  var stdForm = document.getElementById('std-form');
  MM.bindFormValidation(stdForm);
  document.getElementById('std-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(stdForm)) return;
    MM.simulateSave(document.getElementById('std-save-btn'), 'Saving...', function () {
      BOOK.saveStandardTime({
        id: editingId || MM.uid('STD'),
        bu: document.getElementById('sf-bu').value,
        checkInTime: document.getElementById('sf-checkin').value,
        checkOutTime: document.getElementById('sf-checkout').value
      });
      MM.closeModal('form-modal');
      MM.showToast(editingId ? 'Standard time updated' : 'Standard time added');
      render();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    BOOK.deleteStandardTime(pendingDeleteId);
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Standard time removed');
    render();
  });

  render();
})();
