(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-010-transport', storageKey: 'mm_vcs_transport', baseData: MM.VCS.TRANSPORT,
    entityLabel: 'transport option', entityTitle: 'Transport Option', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [ { key: 'name', cellClass: 'cell-strong' }, { key: 'createdAt', cellClass: 'cell-sub' } ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
