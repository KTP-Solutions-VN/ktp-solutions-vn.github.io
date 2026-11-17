(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-001-amenities-list', storageKey: 'mm_vcs_amenities', baseData: MM.VCS.AMENITIES,
    entityLabel: 'amenity', entityTitle: 'Amenity', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [
      { key: 'name', cellClass: 'cell-strong' },
      { key: 'createdAt', cellClass: 'cell-sub' }
    ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
