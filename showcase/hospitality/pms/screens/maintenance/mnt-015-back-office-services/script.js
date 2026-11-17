(function () {
  'use strict';
  var MNT = MM.MNT;

  document.addEventListener('DOMContentLoaded', function () {
    var buWrap = document.getElementById('bu-checks');
    if (buWrap) buWrap.innerHTML = MNT.buChecks([], 'svc');

    MM.bindFormValidation(document.getElementById('item-form'));

    MNT.wireServiceCatalog({
      storageKey: 'mm_mnt_back_office_services',
      baseData: MNT.BACK_OFFICE_SERVICES,
      entityLabel: 'service',
      entityTitle: 'Back Office Service',
      tbodyId: 'list-tbody',
      allBu: true
    });
  });
})();
