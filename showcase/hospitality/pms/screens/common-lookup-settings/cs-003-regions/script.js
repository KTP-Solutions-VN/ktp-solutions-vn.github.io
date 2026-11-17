(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-003-regions', storageKey: 'mm_cs_regions', baseData: MM.CS.REGIONS,
    entityLabel: 'region', entityTitle: 'Region', nameField: 'name',
    columns: [
      { key: 'country', cellClass: 'cell-sub' },
      { key: 'name', cellClass: 'cell-strong' },
      { key: 'villaCounts', cellClass: 'cell-sub' }
    ],
    fields: [
      { id: 'f-country', key: 'country' },
      { id: 'f-name', key: 'name' }
    ]
  });
})();
