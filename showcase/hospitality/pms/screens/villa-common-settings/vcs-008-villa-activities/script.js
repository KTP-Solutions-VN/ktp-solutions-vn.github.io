(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-008-villa-activities', storageKey: 'mm_vcs_villa_activities', baseData: MM.VCS.VILLA_ACTIVITIES,
    entityLabel: 'activity', entityTitle: 'Villa Activity', nameField: 'name',
    sort: function (a, b) { return a.name.localeCompare(b.name); },
    columns: [ { key: 'name', cellClass: 'cell-strong' }, { key: 'createdAt', cellClass: 'cell-sub' } ],
    fields: [ { id: 'f-name', key: 'name' } ]
  });
})();
