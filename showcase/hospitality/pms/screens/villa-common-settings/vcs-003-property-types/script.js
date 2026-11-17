(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-003-property-types', storageKey: 'mm_vcs_property_types', baseData: MM.VCS.PROPERTY_TYPES,
    entityLabel: 'property type', entityTitle: 'Property Type', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [
      { key: 'name', cellClass: 'cell-strong' },
      { key: 'category', cellClass: 'cell-sub' },
      { render: function (i) { return (i.updatedAt || '—') + (i.updatedBy ? ' · ' + i.updatedBy : ''); }, cellClass: 'cell-sub' }
    ],
    fields: [ { id: 'f-name', key: 'name' }, { id: 'f-category', key: 'category' } ],
    beforeSave: function (record) { record.updatedAt = new Date().toISOString().slice(0, 10); record.updatedBy = 'Somchai A.'; }
  });
})();
