(function () {
  'use strict';
  MM.VCS.wireCrudScreen({
    navCode: 'vcs-002-price-categories', storageKey: 'mm_vcs_price_categories', baseData: MM.VCS.PRICE_CATEGORIES,
    entityLabel: 'rate tier', entityTitle: 'Rate Tier', nameField: 'name',
    sort: function (a, b) { return a.description.localeCompare(b.description); },
    columns: [
      { key: 'name', cellClass: 'cell-strong' },
      { key: 'description', cellClass: 'cell-sub' },
      { key: 'createdAt', cellClass: 'cell-sub' }
    ],
    fields: [ { id: 'f-name', key: 'name' }, { id: 'f-description', key: 'description' } ]
  });
})();
