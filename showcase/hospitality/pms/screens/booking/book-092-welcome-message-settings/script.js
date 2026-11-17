(function () {
  'use strict';
  var BOOK = MM.BOOK;

  function getHidden() { return JSON.parse(localStorage.getItem('mm_welcome_messages_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_welcome_messages') || '[]'); }
  function saveExtra(list) { localStorage.setItem('mm_welcome_messages', JSON.stringify(list)); }
  function getAllMessages() {
    var hidden = getHidden();
    return BOOK.WELCOME_MESSAGES.filter(function (m) { return hidden.indexOf(m.id) === -1; }).concat(getExtra());
  }

  function getAssignments() {
    var stored = localStorage.getItem('mm_villa_welcome_assignments');
    return stored ? JSON.parse(stored) : BOOK.VILLA_WELCOME_ASSIGNMENTS.slice();
  }
  function saveAssignments(list) { localStorage.setItem('mm_villa_welcome_assignments', JSON.stringify(list)); }

  var countries = getAllMessages().map(function (m) { return m.country; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
  document.getElementById('f-country').innerHTML = '<option value="">All Countries</option>' + countries.map(function (c) { return '<option>' + c + '</option>'; }).join('');
  document.getElementById('mf-country').innerHTML = countries.map(function (c) { return '<option>' + c + '</option>'; }).join('');

  function renderMessages() {
    var country = document.getElementById('f-country').value;
    var rows = getAllMessages().filter(function (m) { return !country || m.country === country; });
    document.getElementById('welcome-tbody').innerHTML = rows.length ? rows.map(function (m) {
      return '<tr><td>' + m.language + '</td><td class="cell-strong">' + m.title + '</td><td class="text-sm text-muted">' + m.body.slice(0, 60) + (m.body.length > 60 ? '…' : '') + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-delete="' + m.id + '">Delete</button></td></tr>';
    }).join('') : '<tr><td colspan="4"><div class="empty-state"><p>No welcome messages for this country yet.</p></div></td></tr>';
  }

  function renderAssignments() {
    var assignments = getAssignments();
    document.getElementById('villa-msg-tbody').innerHTML = assignments.length ? assignments.map(function (a, i) {
      var msg = getAllMessages().filter(function (m) { return m.id === a.messageId; })[0];
      return '<tr><td class="cell-strong">' + a.property + '</td><td>' + (msg ? msg.title : '—') + '</td>' +
        '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-unassign="' + i + '">Remove</button></td></tr>';
    }).join('') : '<tr><td colspan="3"><div class="empty-state"><p>No villa-specific assignments yet.</p></div></td></tr>';
  }

  document.getElementById('f-country').addEventListener('change', renderMessages);

  var pendingDeleteId = null;
  document.getElementById('welcome-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-delete]');
    if (!btn) return;
    pendingDeleteId = btn.getAttribute('data-delete');
    MM.openModal('delete-modal');
  });
  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    var isSeed = BOOK.WELCOME_MESSAGES.some(function (m) { return m.id === pendingDeleteId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingDeleteId);
      localStorage.setItem('mm_welcome_messages_hidden', JSON.stringify(hidden));
    } else {
      saveExtra(getExtra().filter(function (m) { return m.id !== pendingDeleteId; }));
    }
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Message deleted');
    renderMessages();
  });

  document.getElementById('add-message-btn').addEventListener('click', function () {
    document.getElementById('message-form').reset();
    MM.openModal('message-modal');
  });
  var messageForm = document.getElementById('message-form');
  MM.bindFormValidation(messageForm);
  document.getElementById('message-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(messageForm)) return;
    MM.simulateSave(document.getElementById('message-save-btn'), 'Saving...', function () {
      var stored = getExtra();
      var country = document.getElementById('mf-country').value;
      stored.push({
        id: MM.uid('WM'), country: country, region: 'Custom', language: document.getElementById('mf-language').value.trim(),
        title: document.getElementById('mf-title').value.trim(), body: document.getElementById('mf-body').value.trim()
      });
      saveExtra(stored);
      MM.closeModal('message-modal');
      MM.showToast('Welcome message added');
      renderMessages();
    });
  });

  document.getElementById('assign-villa-btn').addEventListener('click', function () {
    document.getElementById('villa-message-card').style.display = '';
    document.getElementById('af-villa').innerHTML = MM.MOCK_PROPERTIES.map(function (p) { return '<option>' + p.name + '</option>'; }).join('');
    document.getElementById('af-message').innerHTML = getAllMessages().map(function (m) { return '<option value="' + m.id + '">' + m.title + '</option>'; }).join('');
    document.getElementById('assign-form').reset();
    MM.openModal('assign-modal');
    renderAssignments();
  });
  var assignForm = document.getElementById('assign-form');
  MM.bindFormValidation(assignForm);
  document.getElementById('assign-save-btn').addEventListener('click', function () {
    if (!MM.validateForm(assignForm)) return;
    MM.simulateSave(document.getElementById('assign-save-btn'), 'Assigning...', function () {
      var assignments = getAssignments().filter(function (a) { return a.property !== document.getElementById('af-villa').value; });
      assignments.push({ property: document.getElementById('af-villa').value, messageId: document.getElementById('af-message').value });
      saveAssignments(assignments);
      MM.closeModal('assign-modal');
      MM.showToast('Message assigned to villa');
      renderAssignments();
    });
  });

  document.getElementById('villa-msg-tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-unassign]');
    if (!btn) return;
    var idx = parseInt(btn.getAttribute('data-unassign'), 10);
    var assignments = getAssignments();
    assignments.splice(idx, 1);
    saveAssignments(assignments);
    MM.showToast('Assignment removed');
    renderAssignments();
  });

  renderMessages();
})();
