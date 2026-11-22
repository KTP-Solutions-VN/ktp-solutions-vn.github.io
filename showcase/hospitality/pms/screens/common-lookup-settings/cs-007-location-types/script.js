(function () {
  'use strict';
  MM.CS.wireCrudScreen({
    navCode: 'cs-007-location-types', storageKey: 'mm_cs_location_types', baseData: MM.CS.LOCATION_TYPES,
    entityLabel: 'location tag', entityTitle: 'Location Tag', nameField: 'name',
    columns: [
      { key: 'name', cellClass: 'cell-strong' },
      { key: 'createdAt', cellClass: 'cell-sub' }
    ],
    fields: [
      { id: 'f-name', key: 'name' }
    ]
  });
})();
