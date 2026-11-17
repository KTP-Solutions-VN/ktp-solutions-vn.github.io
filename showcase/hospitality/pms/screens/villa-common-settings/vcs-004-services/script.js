(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-004-services', storageKey: 'mm_vcs_services', baseData: MM.VCS.SERVICES,
    entityLabel: 'service', entityTitle: 'Service', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [ { key: 'name', cellClass: 'cell-strong' }, { key: 'createdAt', cellClass: 'cell-sub' } ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
