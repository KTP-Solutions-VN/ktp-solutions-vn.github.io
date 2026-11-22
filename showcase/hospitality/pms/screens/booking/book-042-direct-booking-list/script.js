(function () {
  'use strict';

  var SEED = [
    { id: 'DB-01', property: 'Villa Sapphire Cliff', checkin: '2026-09-10', checkout: '2026-09-14', requestedBy: 'Richard Halstead (Owner)', on: '2026-08-20', status: 'pending', processedBy: '—', first: 'Richard', last: 'Halstead', email: 'richard.h@example.com', phone: '+65 9234 5678', guests: 4, type: 'Owner Stay', amount: 0, paid: 'unpaid', by: 'Richard Halstead', conditions: 'Owner and family, no cleaning fee.' },
    { id: 'DB-02', property: 'Villa Lotus Bay', checkin: '2026-09-18', checkout: '2026-09-22', requestedBy: 'Adam P. (Partner)', on: '2026-08-19', status: 'approved', processedBy: 'Daniel Tan', first: 'Karen', last: 'Siow', email: 'karen.s@example.com', phone: '+65 9345 6789', guests: 2, type: 'Partner Rate', amount: 800, paid: 'paid', by: 'Adam P.', conditions: '' },
    { id: 'DB-03', property: 'Villa Amber Ridge', checkin: '2026-09-25', checkout: '2026-09-28', requestedBy: 'Natalie S. (Manager)', on: '2026-08-18', status: 'rejected', processedBy: 'Daniel Tan', first: 'Tom', last: 'Becker', email: '', phone: '+65 9456 7890', guests: 6, type: 'Complimentary', amount: 0, paid: 'unpaid', by: 'Natalie S.', conditions: 'Requested for press stay — declined, dates overlap OTA booking.' },
    { id: 'DB-04', property: 'Villa Coral Breeze', checkin: '2026-10-02', checkout: '2026-10-06', requestedBy: 'Peter K. (Owner)', on: '2026-08-22', status: 'pending', processedBy: '—', first: 'Peter', last: 'Kwek', email: 'peter.k@example.com', phone: '+65 9567 8901', guests: 3, type: 'Owner Stay', amount: 0, paid: 'unpaid', by: 'Peter Kwek', conditions: '' }
  ];

  function getHidden() { return JSON.parse(localStorage.getItem('mm_book_direct_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_book_direct') || '[]'); }
  function saveExtra(list) { localStorage.setItem('mm_book_direct', JSON.stringify(list)); }
  function getAll() {
    var hidden = getHidden();
    return SEED.filter(function (b) { return hidden.indexOf(b.id) === -1; }).concat(getExtra());
  }
  function findRecord(id) { return getAll().filter(function (b) { return b.id === id; })[0]; }

  function statusBadge(status) {
    var map = { pending: ['warning', 'Pending'], approved: ['success', 'Approved'], rejected: ['danger', 'Rejected'] };
    var m = map[status] || ['neutral', status];
    return '<span class="badge badge-' + m[0] + '">' + m[1] + '</span>';
  }

  var propSelect = document.getElementById('df-property');
  propSelect.innerHTML = MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');

  function render() {
    var status = document.getElementById('f-status').value;
    var q = document.getElementById('f-search').value.trim().toLowerCase();
    var rows = getAll();
    if (status) rows = rows.filter(function (b) { return b.status === status; });
    if (q) rows = rows.filter(function (b) { return (b.property + ' ' + b.requestedBy).toLowerCase().indexOf(q) !== -1; });

    var tbody = document.getElementById('list-tbody');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><p>No direct booking requests found.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (b, i) {
      var canProcess = b.status === 'pending';
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + b.property + '</td>' +
        '<td>' + b.checkin + '</td>' +
        '<td>' + b.checkout + '</td>' +
        '<td>' + b.requestedBy + '</td>' +
        '<td>' + b.on + '</td>' +
        '<td>' + statusBadge(b.status) + '</td>' +
        '<td>' + b.processedBy + '</td>' +
        '<td style="text-align:right;">' +
          '<button class="btn btn-ghost btn-sm" data-view="' + b.id + '">View</button> ' +
          (canProcess ? '<button class="btn btn-ghost btn-sm" data-approve="' + b.id + '">Approve</button> <button class="btn btn-ghost btn-sm" data-reject="' + b.id + '">Reject</button> ' : '') +
          '<button class="btn btn-ghost btn-sm" data-edit="' + b.id + '">Edit</button> ' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + b.id + '">Delete</button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  function updateStatus(id, status, processedBy) {
    var isSeed = SEED.some(function (b) { return b.id === id; });
    if (isSeed) {
      var idx = SEED.findIndex(function (b) { return b.id === id; });
      SEED[idx].status = status;
      SEED[idx].processedBy = processedBy;
    } else {
      var extra = getExtra();
      var ei = extra.findIndex(function (b) { return b.id === id; });
      if (ei !== -1) { extra[ei].status = status; extra[ei].processedBy = processedBy; saveExtra(extra); }
    }
  }

  document.getElementById('list-tbody').addEventListener('click', function (e) {
    var viewBtn = e.target.closest('[data-view]');
    if (viewBtn) { openView(findRecord(viewBtn.getAttribute('data-view'))); return; }
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) { openForm(findRecord(editBtn.getAttribute('data-edit'))); return; }
    var approveBtn = e.target.closest('[data-approve]');
    if (approveBtn) { updateStatus(approveBtn.getAttribute('data-approve'), 'approved', 'Daniel Tan'); MM.showToast('Request approved'); render(); return; }
    var rejectBtn = e.target.closest('[data-reject]');
    if (rejectBtn) { updateStatus(rejectBtn.getAttribute('data-reject'), 'rejected', 'Daniel Tan'); MM.showToast('Request rejected'); render(); return; }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) { pendingDeleteId = delBtn.getAttribute('data-delete'); MM.openModal('delete-modal'); }
  });

  function openView(b) {
    if (!b) return;
    document.getElementById('view-detail-list').innerHTML = [
      ['Property', b.property], ['Check-in', b.checkin], ['Check-out', b.checkout],
      ['Guest', b.first + ' ' + b.last], ['Email', b.email || '—'], ['Phone', b.phone],
      ['Number of Guests', b.guests], ['Booking Type', b.type], ['Amount', '$' + b.amount],
      ['Payment Status', b.paid === 'paid' ? 'Paid' : 'Unpaid'], ['Requested By', b.by || b.requestedBy],
      ['Special Conditions', b.conditions || '—'], ['Status', b.status]
    ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');
    MM.openModal('view-modal');
  }

  var editingId = null;
  function openForm(record) {
    editingId = record ? record.id : null;
    document.getElementById('form-modal-title').textContent = record ? 'Edit Stay Request' : 'Add Stay Request';
    document.getElementById('db-form').reset();
    if (record) {
      document.getElementById('df-property').value = record.property;
      document.getElementById('df-checkin').value = record.checkin;
      document.getElementById('df-checkout').value = record.checkout;
      document.getElementById('df-first').value = record.first;
      document.getElementById('df-last').value = record.last;
      document.getElementById('df-email').value = record.email || '';
      document.getElementById('df-phone').value = record.phone;
      document.getElementById('df-guests').value = record.guests;
      document.getElementById('df-type').value = record.type;
      document.getElementById('df-amount').value = record.amount;
      document.getElementById('df-paid').value = record.paid;
      document.getElementById('df-by').value = record.by || '';
      document.getElementById('df-conditions').value = record.conditions || '';
      calcNights();
    }
    MM.openModal('form-modal');
  }
  document.getElementById('new-request-btn').addEventListener('click', function () { openForm(null); });

  function calcNights() {
    var ci = document.getElementById('df-checkin').value;
    var co = document.getElementById('df-checkout').value;
    if (ci && co) {
      var nights = Math.round((new Date(co) - new Date(ci)) / 86400000);
      document.getElementById('df-nights').value = nights > 0 ? nights : '';
    }
  }
  document.getElementById('df-checkin').addEventListener('change', calcNights);
  document.getElementById('df-checkout').addEventListener('change', calcNights);

  var dbForm = document.getElementById('db-form');
  MM.bindFormValidation(dbForm);
  dbForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(dbForm)) return;
    MM.simulateSave(document.getElementById('db-save-btn'), 'Submitting...', function () {
      var payload = {
        property: document.getElementById('df-property').value,
        checkin: document.getElementById('df-checkin').value,
        checkout: document.getElementById('df-checkout').value,
        first: document.getElementById('df-first').value.trim(),
        last: document.getElementById('df-last').value.trim(),
        email: document.getElementById('df-email').value.trim(),
        phone: document.getElementById('df-phone').value.trim(),
        guests: document.getElementById('df-guests').value,
        type: document.getElementById('df-type').value,
        amount: document.getElementById('df-amount').value,
        paid: document.getElementById('df-paid').value,
        by: document.getElementById('df-by').value.trim(),
        conditions: document.getElementById('df-conditions').value.trim()
      };
      payload.requestedBy = payload.by || (payload.first + ' ' + payload.last);
      if (editingId) {
        var isSeed = SEED.some(function (b) { return b.id === editingId; });
        if (isSeed) {
          var idx = SEED.findIndex(function (b) { return b.id === editingId; });
          SEED[idx] = Object.assign({}, SEED[idx], payload);
        } else {
          var extra = getExtra();
          var ei = extra.findIndex(function (b) { return b.id === editingId; });
          if (ei !== -1) { extra[ei] = Object.assign({}, extra[ei], payload); saveExtra(extra); }
        }
        MM.showToast('Request updated');
      } else {
        payload.id = MM.uid('db');
        payload.on = new Date().toISOString().slice(0, 10);
        payload.status = 'pending';
        payload.processedBy = '—';
        var stored = getExtra();
        stored.push(payload);
        saveExtra(stored);
        MM.showToast('Direct booking request submitted');
      }
      MM.closeModal('form-modal');
      render();
    });
  });

  var pendingDeleteId = null;
  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    var isSeed = SEED.some(function (b) { return b.id === pendingDeleteId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingDeleteId);
      localStorage.setItem('mm_book_direct_hidden', JSON.stringify(hidden));
    } else {
      saveExtra(getExtra().filter(function (b) { return b.id !== pendingDeleteId; }));
    }
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Request deleted');
    render();
  });

  ['f-status', 'f-search'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', render);
    document.getElementById(id).addEventListener('change', render);
  });

  render();
})();
