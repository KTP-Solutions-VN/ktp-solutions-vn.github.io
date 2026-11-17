(function () {
  'use strict';
  var MNT = MM.MNT;
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var log = id ? MNT.getLog(id) : null;

  function renderHistory() {
    var hist = MNT.getHistory(id);
    var tbody = document.getElementById('history-tbody');
    if (!hist.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-sm text-muted" style="text-align:center;padding:18px;">No processing history yet.</td></tr>';
      return;
    }
    tbody.innerHTML = hist.map(function (h) {
      return '<tr><td class="cell-strong">' + h.by + '</td><td class="cell-sub">' + h.comment + '</td><td>' + MNT.statusBadge(h.status) + '</td><td class="cell-sub">' + h.date + '</td></tr>';
    }).join('');
  }

  function addPhotoRow() {
    var row = document.createElement('div');
    row.className = 'photo-row';
    row.innerHTML = '<span class="photo-row__thumb"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></span>' +
      '<input type="file" accept="image/*">' +
      '<button type="button" class="btn btn-ghost btn-sm remove-photo-btn" aria-label="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    var fileInput = row.querySelector('input[type="file"]');
    var thumb = row.querySelector('.photo-row__thumb');
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) { thumb.innerHTML = '<img src="' + e.target.result + '" alt="">'; };
      reader.readAsDataURL(file);
    });
    row.querySelector('.remove-photo-btn').addEventListener('click', function () { row.remove(); });
    document.getElementById('photo-rows').appendChild(row);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!log || (log.status !== 'Open' && log.status !== 'Pending')) {
      document.getElementById('detail-wrap').hidden = true;
      document.getElementById('not-found').hidden = false;
      return;
    }
    document.getElementById('d-villa').textContent = log.property;
    document.getElementById('d-category').textContent = MNT.categoryName(log.category);
    document.getElementById('d-priority').innerHTML = MNT.priorityBadge(log.priority);
    document.getElementById('d-openby').textContent = log.openBy;
    document.getElementById('d-description').textContent = log.description;
    document.getElementById('f-status').value = log.status;
    renderHistory();

    MM.bindFormValidation(document.getElementById('update-form'));
    document.getElementById('add-photo-btn').addEventListener('click', addPhotoRow);

    document.getElementById('save-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('update-form'))) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var newStatus = document.getElementById('f-status').value;
        var comment = document.getElementById('f-comment').value.trim();
        MNT.updateLog(id, function (l) {
          l.status = newStatus;
          if (newStatus === 'Closed') { l.closeBy = 'Somchai Anuwat'; l.closeDate = new Date().toISOString().slice(0, 10); }
        });
        MNT.addHistory(id, { by: 'Somchai Anuwat', comment: comment, status: newStatus, date: new Date().toISOString().slice(0, 16).replace('T', ' ') });
        MM.showToast('Maintenance log updated');
        setTimeout(function () { window.location.href = '../mnt-001-maintenance-ticket-list/index.html'; }, 700);
      });
    });
  });
})();
