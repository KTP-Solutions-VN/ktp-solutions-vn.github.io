(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-008-units', storageKey: 'mm_cs_units', baseData: MM.CS.UNITS,
    entityLabel: 'unit', entityTitle: 'Unit', nameField: 'name',
    columns: [
      { key: 'country', cellClass: 'cell-sub' },
      { key: 'residence', cellClass: 'cell-sub' },
      { key: 'name', cellClass: 'cell-strong' }
    ],
    fields: [
      { id: 'f-residence', key: 'residence' },
      { id: 'f-name', key: 'name' }
    ]
  });
})();
