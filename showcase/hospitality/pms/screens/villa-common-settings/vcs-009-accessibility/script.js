(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-009-accessibility', storageKey: 'mm_vcs_accessibility', baseData: MM.VCS.ACCESSIBILITY,
    entityLabel: 'accessibility tag', entityTitle: 'Accessibility', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [ { key: 'name', cellClass: 'cell-strong' }, { key: 'createdAt', cellClass: 'cell-sub' } ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
