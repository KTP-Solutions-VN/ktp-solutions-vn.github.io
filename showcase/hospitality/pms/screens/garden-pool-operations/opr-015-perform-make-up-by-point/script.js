(function () {
  'use strict';
  var POINTS = MM.OPR.MAKEUP_POINTS;
  var idx = 0;
  var completed = [];

  function render() {
    document.getElementById('point-heading').textContent = 'Point ' + (idx + 1) + ' of ' + POINTS.length;
    document.getElementById('point-name').textContent = POINTS[idx];
    document.getElementById('back-btn').style.visibility = idx > 0 ? 'visible' : 'hidden';
    var isLast = idx === POINTS.length - 1;
    document.getElementById('next-btn').hidden = isLast;
    document.getElementById('finish-btn').hidden = !isLast;
    var itemSel = document.getElementById('f-item');
    if (itemSel) itemSel.innerHTML = MM.OPR.INSPECTION_ITEMS.map(function (i) { return '<option>' + i + '</option>'; }).join('');
    var areaSel = document.getElementById('f-area');
    if (areaSel) areaSel.innerHTML = MM.OPR.INSPECTION_AREAS.map(function (a) { return '<option>' + a + '</option>'; }).join('');
    document.getElementById('f-photo').value = '';
    document.getElementById('f-desc').value = '';
    renderProgress();
  }

  function renderProgress() {
    document.getElementById('progress-list').innerHTML = POINTS.map(function (p, i) {
      var state = completed.indexOf(i) > -1 ? 'done' : (i === idx ? 'current' : 'pending');
      var icon = state === 'done'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-success);"><polyline points="20 6 9 17 4 12"/></svg>'
        : (state === 'current'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-primary);"><circle cx="12" cy="12" r="9"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-gray-300);"><circle cx="12" cy="12" r="9"/></svg>');
      return '<li style="display:flex;align-items:center;gap:10px;font-size:13px;' + (state === 'current' ? 'font-weight:700;color:var(--color-primary-dark);' : 'color:var(--color-gray-600);') + '">' + icon + '<span>' + p + '</span></li>';
    }).join('');
  }

  document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('f-photo').value = '';
    document.getElementById('f-desc').value = '';
    MM.showToast('Point data cleared');
  });

  document.getElementById('back-btn').addEventListener('click', function () {
    if (idx > 0) { idx -= 1; render(); }
  });

  document.getElementById('next-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('point-form'))) return;
    if (completed.indexOf(idx) === -1) completed.push(idx);
    idx += 1;
    render();
  });

  document.getElementById('finish-btn').addEventListener('click', function () {
    if (!MM.validateForm(document.getElementById('point-form'))) return;
    if (completed.indexOf(idx) === -1) completed.push(idx);
    MM.simulateSave(document.getElementById('finish-btn'), 'Finishing...', function () {
      MM.showToast('Round completed');
      setTimeout(function () { window.location.href = '../opr-014-make-up-list/index.html'; }, 500);
    });
  });

  render();
})();
