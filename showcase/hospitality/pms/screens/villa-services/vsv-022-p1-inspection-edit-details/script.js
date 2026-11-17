(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var reportId = params.get('id') || 'insp0';
  var property = MM.MOCK_PROPERTIES[parseInt(reportId.replace('insp', ''), 10) % MM.MOCK_PROPERTIES.length];

  var SEED_ITEMS = [
    { id: 'it-1', title: 'Living Room — Furniture Condition', desc: 'Sofa cushion showing wear; requires re-upholstery or replacement.', service: 'Housekeeping', location: 'Living Room', status: 'pending', agent: '' },
    { id: 'it-2', title: 'Kitchen — Appliance Check', desc: 'Dishwasher not draining fully after cycle completes.', service: 'Maintenance', location: 'Kitchen', status: 'ready', agent: '' },
    { id: 'it-3', title: 'Pool Deck — Tile Crack', desc: 'Hairline crack noted on the north pool deck tile row.', service: 'Pool', location: 'Pool Deck', status: 'in-progress', agent: 'Andaman Pool Services — Team 1' },
    { id: 'it-4', title: 'Master Bath — Grout Mould', desc: 'Grout discoloration in the master bathroom shower area.', service: 'Housekeeping', location: 'Master Bathroom', status: 'completed', agent: 'Somchai A.', comment: 'Cleaned and re-sealed grout lines.' }
  ];

  function storageKey() { return 'mm_vsv_inspection_items_' + reportId; }
  function getItems() {
    var stored = localStorage.getItem(storageKey());
    return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(SEED_ITEMS));
  }
  function saveItems(items) { localStorage.setItem(storageKey(), JSON.stringify(items)); }

  document.getElementById('report-title').textContent = 'Process Inspection Items — ' + property.name;
  document.getElementById('report-subtitle').textContent = 'Quarterly Inspection · Inspector: Somchai Anuwat';
  document.getElementById('scope-summary').innerHTML = [
    ['Villa', property.name], ['Inspector', 'Somchai Anuwat'], ['Scope Status', 'Confirmed by Wayan Kertha on 2026-08-18'],
    ['Maintenance Supervisor', 'Kittisak Rungrueang'], ['Cleaning Supervisor', 'Nok Pattaya']
  ].map(function (row) { return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>'; }).join('');

  var STATUS_LABEL = { pending: 'Pending', ready: 'Ready', 'in-progress': 'In Progress', paused: 'Paused', completed: 'Completed', help: 'Help Requested' };
  var STATUS_BADGE = { pending: 'neutral', ready: 'info', 'in-progress': 'warning', paused: 'warning', completed: 'success', help: 'danger' };

  function actionButtons(item) {
    var btns = [];
    if (item.status === 'pending') btns.push('<button class="btn btn-outline btn-sm" data-action="ready" data-id="' + item.id + '">Ready</button>');
    if (item.status === 'ready') btns.push('<button class="btn btn-primary btn-sm" data-action="launch" data-id="' + item.id + '">Launch</button>');
    if (item.status === 'in-progress') {
      btns.push('<button class="btn btn-outline btn-sm" data-action="pause" data-id="' + item.id + '">Pause</button>');
      btns.push('<button class="btn btn-primary btn-sm" data-action="validate" data-id="' + item.id + '">Validate</button>');
    }
    if (item.status === 'paused') btns.push('<button class="btn btn-outline btn-sm" data-action="unpause" data-id="' + item.id + '">Unpause</button>');
    if (item.status === 'in-progress' || item.status === 'paused') btns.push('<button class="btn btn-ghost btn-sm" data-action="rework" data-id="' + item.id + '">Rework</button>');
    btns.push('<button class="btn btn-ghost btn-sm" data-action="update" data-id="' + item.id + '">Update</button>');
    if (item.status !== 'completed') btns.push('<button class="btn btn-ghost btn-sm" data-action="delete" data-id="' + item.id + '">Delete</button>');
    return btns.join(' ');
  }

  function render() {
    var items = getItems();
    document.getElementById('item-kanban').innerHTML = items.map(function (item) {
      return '<div class="item-card">' +
        '<div class="item-card__photos"><div class="item-card__photo">Before Photo</div><div class="item-card__photo">' + (item.status === 'completed' ? 'After Photo' : 'Pending') + '</div></div>' +
        '<div class="item-card__body">' +
          '<h3 class="item-card__title">' + item.title + '</h3>' +
          '<span class="badge badge-' + STATUS_BADGE[item.status] + '">' + STATUS_LABEL[item.status] + '</span>' +
          '<p class="item-card__desc">' + item.desc + '</p>' +
          '<select class="item-card__select" data-service="' + item.id + '"><option' + (item.service === 'Housekeeping' ? ' selected' : '') + '>Housekeeping</option><option' + (item.service === 'Maintenance' ? ' selected' : '') + '>Maintenance</option><option' + (item.service === 'Garden' ? ' selected' : '') + '>Garden</option><option' + (item.service === 'Pool' ? ' selected' : '') + '>Pool</option><option' + (item.service === 'Amenities' ? ' selected' : '') + '>Amenities</option></select>' +
          '<select class="item-card__select" data-agent="' + item.id + '"><option value="">Assign agent...</option>' + (VSV.CLEANING_STAFF || []).concat(VSV.POOL_STAFF || []).map(function (s) { return '<option' + (s === item.agent ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
          (item.comment ? '<p class="item-card__meta">Comment: ' + item.comment + '</p>' : '') +
        '</div>' +
        '<div class="item-card__footer">' + actionButtons(item) + '</div>' +
      '</div>';
    }).join('');

    var allComplete = items.length > 0 && items.every(function (i) { return i.status === 'completed'; });
    document.getElementById('approve-report-btn').style.display = allComplete ? '' : 'none';
  }

  document.getElementById('item-kanban').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-action');
    var id = btn.getAttribute('data-id');
    var items = getItems();
    var item = items.filter(function (i) { return i.id === id; })[0];
    if (!item) return;
    if (action === 'ready') item.status = 'ready';
    else if (action === 'launch') item.status = 'in-progress';
    else if (action === 'pause') item.status = 'paused';
    else if (action === 'unpause') item.status = 'in-progress';
    else if (action === 'validate') { item.status = 'completed'; item.comment = item.comment || 'Processed and validated.'; }
    else if (action === 'rework') { item.status = 'help'; MM.showToast('Rework requested', { danger: true }); saveItems(items); render(); return; }
    else if (action === 'update') {
      item.service = document.querySelector('[data-service="' + id + '"]').value;
      item.agent = document.querySelector('[data-agent="' + id + '"]').value;
      MM.showToast('Item updated');
      saveItems(items);
      render();
      return;
    } else if (action === 'delete') {
      items = items.filter(function (i) { return i.id !== id; });
      saveItems(items);
      MM.showToast('Item removed from report', { danger: true });
      render();
      return;
    }
    saveItems(items);
    MM.showToast('Status updated to ' + STATUS_LABEL[item.status]);
    render();
  });

  document.getElementById('approve-report-btn').addEventListener('click', function () {
    MM.simulateSave(document.getElementById('approve-report-btn'), 'Approving...', function () {
      MM.showToast('Report approved and closed');
      setTimeout(function () { window.location.href = '../vsv-021-villa-inspection-list/index.html'; }, 600);
    });
  });

  render();
})();
