(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-005-districts', storageKey: 'mm_cs_districts', baseData: MM.CS.DISTRICTS,
    entityLabel: 'district', entityTitle: 'District', nameField: 'name',
    columns: [
      { key: 'country', cellClass: 'cell-sub' },
      { key: 'region', cellClass: 'cell-sub' },
      { key: 'name', cellClass: 'cell-strong' }
    ],
    fields: [
      { id: 'f-region', key: 'region' },
      { id: 'f-name', key: 'name' }
    ]
  });
})();
