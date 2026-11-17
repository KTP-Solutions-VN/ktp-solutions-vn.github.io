(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-004-areas', storageKey: 'mm_cs_areas', baseData: MM.CS.AREAS,
    entityLabel: 'area', entityTitle: 'Area', nameField: 'name',
    columns: [
      { key: 'country', cellClass: 'cell-sub' },
      { key: 'region', cellClass: 'cell-sub' },
      { key: 'district', cellClass: 'cell-sub' },
      { key: 'name', cellClass: 'cell-strong' }
    ],
    fields: [
      { id: 'f-district', key: 'district' },
      { id: 'f-name', key: 'name' }
    ]
  });
})();
