(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-006-residence', storageKey: 'mm_cs_residences', baseData: MM.CS.RESIDENCES,
    entityLabel: 'residence', entityTitle: 'Residence', nameField: 'name',
    columns: [
      { key: 'photo', cellClass: 'cell-sub' },
      { key: 'country', cellClass: 'cell-sub' },
      { key: 'name', cellClass: 'cell-strong' }
    ],
    fields: [
      { id: 'f-area', key: 'area' },
      { id: 'f-name', key: 'name' }
    ]
  });

  // Photo column: placeholder thumbnail since these are mock records without real images.
  var origRowHtml = null;
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#list-tbody tr td:nth-child(2)').forEach(function (td) {
      td.innerHTML = '<div style="width:44px;height:30px;border-radius:6px;background:var(--color-gray-100);display:flex;align-items:center;justify-content:center;color:var(--color-gray-400);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>';
    });
  });
})();
