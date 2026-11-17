(function () {
  'use strict';

  var SCOPES = ['Property', 'Unit', 'Residence', 'Shared', 'Account'];
  var ALL_ELEMENTS = [
    { id: 'CE-01', name: 'Villa Description', group: 'description', maxLength: 2000, scope: 'Property' },
    { id: 'CE-02', name: 'Highlights', group: 'description', maxLength: 500, scope: 'Property' },
    { id: 'CE-03', name: 'House Rules', group: 'policies', maxLength: null, scope: 'Property' },
    { id: 'CE-04', name: 'Unit Description', group: 'description', maxLength: 1200, scope: 'Unit' },
    { id: 'CE-05', name: 'Room Amenities', group: 'guest', maxLength: 800, scope: 'Unit' },
    { id: 'CE-06', name: 'Residence Overview', group: 'description', maxLength: 1500, scope: 'Residence' },
    { id: 'CE-07', name: 'Location & Access', group: 'location', maxLength: 1000, scope: 'Residence' },
    { id: 'CE-08', name: 'Cancellation Policy', group: 'policies', maxLength: null, scope: 'Shared' },
    { id: 'CE-09', name: 'Pool Safety Notice', group: 'guest', maxLength: 400, scope: 'Shared' },
    { id: 'CE-10', name: 'Host Bio', group: 'account', maxLength: 600, scope: 'Account' }
  ];
  var DEFAULT_ASSIGNED = ['CE-01', 'CE-02', 'CE-03', 'CE-04', 'CE-06', 'CE-08', 'CE-10'];

  function getState() {
    var stored = localStorage.getItem('mm_ota_listing');
    if (stored) return JSON.parse(stored);
    return { assigned: DEFAULT_ASSIGNED.slice(), order: {} };
  }
  function saveState(state) { localStorage.setItem('mm_ota_listing', JSON.stringify(state)); }

  function groupLabel(g) {
    var map = { description: 'Description', guest: 'Guest', policies: 'Policies', location: 'Location', account: 'Account' };
    return map[g] || g;
  }
  function lengthLabel(n) { return n ? 'Maximum ' + n + ' characters' : 'No limit'; }

  function render() {
    var state = getState();
    var blocksHtml = SCOPES.map(function (scope) {
      var items = ALL_ELEMENTS.filter(function (el) { return el.scope === scope && state.assigned.indexOf(el.id) !== -1; });
      var order = state.order[scope] || items.map(function (el) { return el.id; });
      items.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
      var rows = items.length ? items.map(function (el, idx) {
        return '<tr class="listing-row" draggable="true" data-id="' + el.id + '" data-scope="' + scope + '">' +
          '<td><span class="drag-handle"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="6" r="1"/><circle cx="8" cy="12" r="1"/><circle cx="8" cy="18" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="16" cy="12" r="1"/><circle cx="16" cy="18" r="1"/></svg></span>' + (idx + 1) + '</td>' +
          '<td>' + el.name + '</td><td>' + groupLabel(el.group) + '</td><td>' + lengthLabel(el.maxLength) + '</td>' +
          '<td style="text-align:right;"><button class="btn btn-ghost btn-sm" data-remove="' + el.id + '" data-remove-name="' + el.name + '">Remove</button></td></tr>';
      }).join('') : '<tr><td colspan="5"><div class="empty-state"><p>No content elements assigned to this scope.</p></div></td></tr>';
      return '<div class="scope-block"><h3 class="scope-block__title">' + scope + '</h3><div class="card"><div class="card__body"><div class="table-wrap"><table class="data-table">' +
        '<thead><tr><th>Order</th><th>Content Element</th><th>Group</th><th>Length</th><th style="text-align:right;">Actions</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></div></div></div>';
    }).join('');
    document.getElementById('scope-blocks').innerHTML = blocksHtml;
    wireDragAndDrop();
  }

  function wireDragAndDrop() {
    var dragged = null;
    document.querySelectorAll('.listing-row[draggable="true"]').forEach(function (row) {
      row.addEventListener('dragstart', function () { dragged = row; row.classList.add('dragging'); });
      row.addEventListener('dragend', function () { row.classList.remove('dragging'); });
      row.addEventListener('dragover', function (e) {
        if (!dragged || dragged.getAttribute('data-scope') !== row.getAttribute('data-scope')) return;
        e.preventDefault();
        var tbody = row.parentNode;
        var rows = Array.prototype.slice.call(tbody.children);
        var draggedIdx = rows.indexOf(dragged);
        var targetIdx = rows.indexOf(row);
        if (draggedIdx < targetIdx) tbody.insertBefore(dragged, row.nextSibling);
        else tbody.insertBefore(dragged, row);
      });
      row.addEventListener('drop', function () {
        var scope = row.getAttribute('data-scope');
        var tbody = row.closest('tbody');
        var ids = Array.prototype.slice.call(tbody.children).map(function (r) { return r.getAttribute('data-id'); }).filter(Boolean);
        var state = getState();
        state.order[scope] = ids;
        saveState(state);
        MM.showToast('Order updated');
        render();
      });
    });
  }

  var pendingRemove = null;
  document.getElementById('scope-blocks').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove]');
    if (!btn) return;
    pendingRemove = btn.getAttribute('data-remove');
    document.getElementById('remove-element-name').textContent = btn.getAttribute('data-remove-name');
    MM.openModal('remove-modal');
  });
  document.getElementById('confirm-remove-btn').addEventListener('click', function () {
    if (!pendingRemove) return;
    var state = getState();
    state.assigned = state.assigned.filter(function (id) { return id !== pendingRemove; });
    saveState(state);
    pendingRemove = null;
    MM.closeModal('remove-modal');
    MM.showToast('Content element removed from listing');
    render();
  });

  document.getElementById('select-elements-btn').addEventListener('click', function () {
    var state = getState();
    document.getElementById('select-list').innerHTML = ALL_ELEMENTS.map(function (el) {
      var checked = state.assigned.indexOf(el.id) !== -1 ? ' checked' : '';
      return '<div class="select-checklist__item">' +
        '<input type="checkbox" id="chk-' + el.id + '" value="' + el.id + '"' + checked + '>' +
        '<label for="chk-' + el.id + '">' + el.name + '<div class="select-checklist__meta">' + el.scope + ' · ' + groupLabel(el.group) + ' · ' + lengthLabel(el.maxLength) + '</div></label>' +
      '</div>';
    }).join('');
    MM.openModal('select-modal');
  });

  document.getElementById('select-save-btn').addEventListener('click', function () {
    MM.simulateSave(document.getElementById('select-save-btn'), 'Applying...', function () {
      var checked = Array.prototype.slice.call(document.querySelectorAll('#select-list input[type="checkbox"]:checked')).map(function (c) { return c.value; });
      var state = getState();
      state.assigned = checked;
      saveState(state);
      MM.closeModal('select-modal');
      MM.showToast('Content elements updated');
      render();
    });
  });

  render();
})();
