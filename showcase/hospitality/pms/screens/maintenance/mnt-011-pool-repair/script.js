(function () {
  'use strict';
  var MNT = MM.MNT;

  document.addEventListener('DOMContentLoaded', function () {
    var buWrap = document.getElementById('bu-checks');
    if (buWrap) buWrap.innerHTML = MNT.buChecks([], 'svc');

    MM.bindFormValidation(document.getElementById('item-form'));

    MNT.wireServiceCatalog({
      storageKey: 'mm_mnt_pool_repair',
      baseData: MNT.POOL_REPAIR,
      entityLabel: 'service',
      entityTitle: 'Pool Repair Service',
      tbodyId: 'list-tbody',
      allBu: false
    });
  });
})();
