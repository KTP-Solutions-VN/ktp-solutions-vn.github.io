(function () {
  'use strict';
  var REN = window.MM.REN;
  var params = new URLSearchParams(window.location.search);
  var projectId = params.get('id');
  var project = REN.getProject(projectId) || REN.getProjects()[0];
  projectId = project.id;

  var editingReceiptId = null;
  var editingPhotoId = null;

  var STATUS_FLOW = { 'Not Started': 'Under Progress', 'Under Progress': 'Completed', 'Completed': null };
  var STATUS_LABEL = { 'Not Started': 'Mark as Started', 'Under Progress': 'Mark as Completed', 'Completed': null };

  function render() {
    project = REN.getProject(projectId);
    document.getElementById('proj-title').textContent = project.title;
    document.getElementById('bc-title').textContent = project.title;
    document.getElementById('proj-villa').textContent = project.villaName + ' · ' + project.bu;
    document.getElementById('stat-status').innerHTML = REN.statusBadge(project.status);
    document.getElementById('stat-budget').textContent = REN.money(REN.itemBudgetTotal(project));
    document.getElementById('stat-actual').textContent = REN.money(REN.itemRealTotal(project));
    document.getElementById('stat-timeline').textContent = REN.date(project.startDate) + ' → ' + REN.date(project.endDate);
    document.getElementById('f-actual-start').value = project.actualStartDate || '';
    document.getElementById('f-actual-end').value = project.actualEndDate || '';

    document.getElementById('wallet-link').href = '../ren-005-renovation-project-payment-ledger/index.html?id=' + project.id;
    document.getElementById('report-link').href = '../ren-011-project-progress-cost-report/index.html?id=' + project.id;

    var statusBtn = document.getElementById('status-btn');
    var nextLabel = STATUS_LABEL[project.status];
    if (!nextLabel) { statusBtn.hidden = true; } else { statusBtn.hidden = false; statusBtn.textContent = nextLabel; }

    document.getElementById('items-tbody').innerHTML = project.items.map(function (it) {
      return '<tr><td class="cell-strong">' + it.name + '</td><td class="cell-num">' + REN.money(it.budget) + '</td><td class="cell-num">' + REN.money(it.realAmount) + '</td>' +
        '<td>' + (it.hasDocument ? '<span class="badge badge-info">Attached</span>' : '<span class="text-muted text-sm">None</span>') + '</td></tr>';
    }).join('') || '<tr><td colspan="4" class="text-muted text-sm">No budget items yet.</td></tr>';

    document.getElementById('receipts-tbody').innerHTML = project.receipts.map(function (r) {
      return '<tr><td class="cell-strong">' + r.receiptName + '</td><td class="cell-sub">' + REN.date(r.date) + '</td><td>' + r.paidBy + '</td><td class="cell-num">' + REN.money(r.totalAmount) + '</td>' +
        '<td class="row-actions"><button class="row-icon-btn" data-edit-receipt="' + r.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="row-icon-btn danger" data-delete-receipt="' + r.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }).join('') || '<tr><td colspan="5" class="text-muted text-sm">No invoices yet — add the first one.</td></tr>';

    document.getElementById('photos-grid').innerHTML = project.photos.map(function (p) {
      return '<div class="ren-photo-card"><div class="ren-photo-card__thumb tone-' + p.tone + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>' +
        '<div class="ren-photo-card__body"><div class="ren-photo-card__caption">' + p.caption + '</div><div class="ren-photo-card__meta">' + p.createdBy + ' · ' + REN.date(p.createdAt) + '</div></div>' +
        '<div class="ren-photo-card__actions"><button class="row-icon-btn" data-edit-photo="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="row-icon-btn danger" data-delete-photo="' + p.id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></div></div>';
    }).join('') || '<p class="text-muted text-sm">No progress photos yet.</p>';
  }
  render();

  document.getElementById('save-dates-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Saving...', function () {
      REN.updateProject(projectId, function (p) {
        p.actualStartDate = document.getElementById('f-actual-start').value || null;
        p.actualEndDate = document.getElementById('f-actual-end').value || null;
      });
      MM.showToast('Dates saved');
      render();
    });
  });

  document.getElementById('status-btn').addEventListener('click', function () {
    var next = STATUS_FLOW[project.status];
    if (!next) return;
    MM.simulateSave(this, 'Updating...', function () {
      REN.updateProject(projectId, function (p) { p.status = next; });
      MM.showToast('Project marked as ' + next);
      render();
    });
  });

  /* ---------------------------------------------------------------- */
  /* Edit Project drawer                                               */
  /* ---------------------------------------------------------------- */

  document.getElementById('f-leader').innerHTML = MM.MOCK_STAFF.map(function (s) { return '<option value="' + s.id + '">' + s.name + '</option>'; }).join('');

  document.getElementById('edit-project-btn').addEventListener('click', function () {
    project = REN.getProject(projectId);
    document.getElementById('f-title').value = project.title;
    document.getElementById('f-leader').value = project.leaderId;
    document.getElementById('f-status').value = project.status;
    document.getElementById('f-start').value = project.startDate;
    document.getElementById('f-end').value = project.endDate;
    MM.openModal('edit-project-drawer');
  });

  var projectForm = document.getElementById('project-form');
  MM.bindFormValidation(projectForm);
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(projectForm)) return;
    MM.simulateSave(document.getElementById('project-save-btn'), 'Saving...', function () {
      var leaderId = document.getElementById('f-leader').value;
      var leader = MM.MOCK_STAFF.find(function (s) { return s.id === leaderId; });
      REN.updateProject(projectId, function (p) {
        p.title = document.getElementById('f-title').value.trim();
        p.status = document.getElementById('f-status').value;
        p.startDate = document.getElementById('f-start').value;
        p.endDate = document.getElementById('f-end').value;
        p.leaderId = leaderId;
        p.leaderName = leader ? leader.name : p.leaderName;
      });
      MM.showToast('Project updated');
      MM.closeModal('edit-project-drawer');
      render();
    });
  });

  /* ---------------------------------------------------------------- */
  /* Invoice / Payment Receipt drawer (shared add + edit)              */
  /* ---------------------------------------------------------------- */

  function openReceiptDrawer(receipt) {
    editingReceiptId = receipt ? receipt.id : null;
    document.getElementById('receipt-drawer-title').textContent = receipt ? 'Edit Invoice / Payment Receipt' : 'Add Invoice / Payment Receipt';
    document.getElementById('receipt-save-btn').textContent = receipt ? 'Save Changes' : 'Save Invoice';
    document.getElementById('receipt-form').reset();
    document.getElementById('receipt-item-group').hidden = !!receipt;
    document.getElementById('receipt-upload-zone').hidden = !!receipt;
    document.getElementById('f-item').innerHTML = project.items.map(function (it) { return '<option value="' + it.id + '">' + it.name + '</option>'; }).join('');
    if (receipt) {
      document.getElementById('f-name').value = receipt.receiptName;
      document.getElementById('f-date').value = receipt.date;
      document.getElementById('f-amount').value = receipt.totalAmount;
      document.getElementById('f-paidby').value = receipt.paidBy;
      document.getElementById('f-paidtype').value = receipt.paidType;
    }
    MM.openModal('receipt-drawer');
  }

  document.getElementById('add-receipt-btn').addEventListener('click', function () { openReceiptDrawer(null); });

  document.getElementById('receipts-tbody').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-receipt]');
    if (editBtn) {
      var r = project.receipts.find(function (rr) { return rr.id === editBtn.dataset.editReceipt; });
      openReceiptDrawer(r);
      return;
    }
    var delBtn = e.target.closest('[data-delete-receipt]');
    if (!delBtn) return;
    document.getElementById('confirm-delete-receipt-btn').dataset.id = delBtn.dataset.deleteReceipt;
    MM.openModal('delete-receipt-modal');
  });

  var receiptForm = document.getElementById('receipt-form');
  MM.bindFormValidation(receiptForm);
  receiptForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(receiptForm)) return;
    MM.simulateSave(document.getElementById('receipt-save-btn'), editingReceiptId ? 'Saving...' : 'Saving...', function () {
      var amount = parseFloat(document.getElementById('f-amount').value) || 0;
      if (editingReceiptId) {
        REN.updateProject(projectId, function (p) {
          var r = p.receipts.find(function (rr) { return rr.id === editingReceiptId; });
          if (r) {
            r.receiptName = document.getElementById('f-name').value.trim();
            r.date = document.getElementById('f-date').value;
            r.totalAmount = amount;
            r.paidBy = document.getElementById('f-paidby').value.trim();
            r.paidType = document.getElementById('f-paidtype').value;
          }
        });
        MM.showToast('Invoice updated');
      } else {
        var itemId = document.getElementById('f-item').value;
        REN.updateProject(projectId, function (p) {
          var item = p.items.find(function (it) { return it.id === itemId; });
          var itemName = item ? item.name : '';
          p.receipts.push({
            id: REN.uid('RCT'), receiptName: document.getElementById('f-name').value.trim(), date: document.getElementById('f-date').value,
            totalAmount: amount, paidBy: document.getElementById('f-paidby').value.trim(), paidType: document.getElementById('f-paidtype').value,
            paymentMethod: '', items: itemName ? [{ name: itemName, amount: amount }] : []
          });
          if (item) item.realAmount = (item.realAmount || 0) + amount;
          if (item) item.hasDocument = true;
          p.payments.push({ id: REN.uid('PAY'), date: document.getElementById('f-date').value, post: document.getElementById('f-name').value.trim(), paidBy: document.getElementById('f-paidtype').value === 'company' ? 'Company' : document.getElementById('f-paidby').value.trim(), paidTo: 'Contractor', paymentMethod: '', credit: 0, debit: amount });
        });
        MM.showToast('Invoice added');
      }
      MM.closeModal('receipt-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-receipt-btn').addEventListener('click', function () {
    var id = this.dataset.id;
    REN.updateProject(projectId, function (p) { p.receipts = p.receipts.filter(function (r) { return r.id !== id; }); });
    MM.closeModal('delete-receipt-modal');
    MM.showToast('Invoice deleted', { danger: true });
    render();
  });

  /* ---------------------------------------------------------------- */
  /* Progress Photo drawer (shared add + edit)                         */
  /* ---------------------------------------------------------------- */

  function openPhotoDrawer(photo) {
    editingPhotoId = photo ? photo.id : null;
    document.getElementById('photo-drawer-title').textContent = photo ? 'Edit Project Photo' : 'Add Project Photo';
    document.getElementById('photo-save-btn').textContent = photo ? 'Save Changes' : 'Add Photo';
    document.getElementById('photo-form').reset();
    document.getElementById('photo-upload-zone').hidden = !!photo;
    var preview = document.getElementById('photo-preview');
    preview.hidden = !photo;
    if (photo) {
      preview.className = 'ren-photo-card__thumb tone-' + photo.tone;
      document.getElementById('f-caption').value = photo.caption;
    }
    MM.openModal('photo-drawer');
  }

  document.getElementById('add-photo-btn').addEventListener('click', function () { openPhotoDrawer(null); });

  document.getElementById('photos-grid').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit-photo]');
    if (editBtn) {
      var p2 = project.photos.find(function (ph) { return ph.id === editBtn.dataset.editPhoto; });
      openPhotoDrawer(p2);
      return;
    }
    var delBtn = e.target.closest('[data-delete-photo]');
    if (!delBtn) return;
    document.getElementById('confirm-delete-photo-btn').dataset.id = delBtn.dataset.deletePhoto;
    MM.openModal('delete-photo-modal');
  });

  var photoForm = document.getElementById('photo-form');
  MM.bindFormValidation(photoForm);
  photoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(photoForm)) return;
    MM.simulateSave(document.getElementById('photo-save-btn'), editingPhotoId ? 'Saving...' : 'Uploading...', function () {
      if (editingPhotoId) {
        REN.updateProject(projectId, function (p) {
          var ph = p.photos.find(function (pp) { return pp.id === editingPhotoId; });
          if (ph) ph.caption = document.getElementById('f-caption').value.trim();
        });
        MM.showToast('Photo updated');
      } else {
        REN.updateProject(projectId, function (p) {
          p.photos.push({ id: REN.uid('PHT'), tone: (p.photos.length % 4) + 1, caption: document.getElementById('f-caption').value.trim(), createdBy: 'Somchai Anuwat', createdAt: new Date().toISOString().slice(0, 10) });
        });
        MM.showToast('Photo added');
      }
      MM.closeModal('photo-drawer');
      render();
    });
  });

  document.getElementById('confirm-delete-photo-btn').addEventListener('click', function () {
    var id = this.dataset.id;
    REN.updateProject(projectId, function (p) { p.photos = p.photos.filter(function (ph) { return ph.id !== id; }); });
    MM.closeModal('delete-photo-modal');
    MM.showToast('Photo deleted', { danger: true });
    render();
  });
})();
