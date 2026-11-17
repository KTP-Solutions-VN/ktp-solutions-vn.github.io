(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-007-property-usage', storageKey: 'mm_vcs_property_usage', baseData: MM.VCS.PROPERTY_USAGE,
    entityLabel: 'usage type', entityTitle: 'Property Usage', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [ { key: 'name', cellClass: 'cell-strong' }, { key: 'createdAt', cellClass: 'cell-sub' } ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
