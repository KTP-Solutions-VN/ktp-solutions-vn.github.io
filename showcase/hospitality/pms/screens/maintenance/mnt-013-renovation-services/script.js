(function () {
  'use strict';
  var MNT = MM.MNT;

  document.addEventListener('DOMContentLoaded', function () {
    var buWrap = document.getElementById('bu-checks');
    if (buWrap) buWrap.innerHTML = MNT.buChecks([], 'svc');

    MM.bindFormValidation(document.getElementById('item-form'));

    MNT.wireServiceCatalog({
      storageKey: 'mm_mnt_renovation_services',
      baseData: MNT.RENOVATION_SERVICES,
      entityLabel: 'service',
      entityTitle: 'Refurbishment Type',
      tbodyId: 'list-tbody',
      allBu: false
    });
  });
})();
