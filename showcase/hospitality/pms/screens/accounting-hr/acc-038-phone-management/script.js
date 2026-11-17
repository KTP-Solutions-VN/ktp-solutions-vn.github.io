(function () {
  'use strict';
  ACC.wireCrudScreen({
    storageKey: 'mm_acc_phones', baseData: MM.ACC.PHONES, entityLabel: 'phone', entityTitle: 'Phone', nameField: 'number', colCount: 3,
    fields: [{ id: 'f-name', key: 'number' }, { id: 'f-sub', key: 'assignedTo' }],
    rowHtml: function (p) {
      return '<tr><td class="cell-strong">' + p.number + '</td><td class="cell-sub">' + (p.assignedTo || '—') + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + p.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></td></tr>';
    }
  });
})();
