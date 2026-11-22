document.addEventListener('DOMContentLoaded', function () {
  function renderRows() {
    var rows = MM.BOOK.getRecommendationCriteria();
    var tbody = document.getElementById('criteria-rows');
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>' +
        '<h3>No criteria sets yet</h3><p>Add a criteria set to start running recommendation checks.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (c) {
      return '<tr>' +
        '<td class="cell-strong">' + c.name + '</td>' +
        '<td class="text-xs">&lt; ' + c.lastMinute.days + 'd &middot; ' + c.lastMinute.under + '% / ' + c.lastMinute.over + '%</td>' +
        '<td class="text-xs">' + c.lastMinute.days + '&ndash;' + c.earlyBird.days + 'd &middot; ' + c.earlyBird.under + '%…' + '</td>' +
        '<td class="text-xs">&gt; ' + c.earlyBird.days + 'd &middot; ' + c.earlyBird.under + '% / ' + c.earlyBird.over + '%</td>' +
        '<td class="cell-num">' + c.upTo + 'd</td>' +
        '<td class="cell-num">' + c.excludeDays + 'd</td>' +
        '<td><div class="row-actions">' +
          '<button class="btn btn-ghost btn-sm" data-edit="' + c.id + '" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + c.id + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="15" height="15"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>' +
        '</div></td>' +
      '</tr>';
    }).join('');

    tbody.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var c = rows.filter(function (r) { return r.id === btn.getAttribute('data-edit'); })[0];
        openModal(c);
      });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var c = rows.filter(function (r) { return r.id === btn.getAttribute('data-delete'); })[0];
        MM.BOOK.confirmAction('Delete criteria set "' + c.name + '"? Recommendation checks using it will no longer be available.', function () {
          MM.BOOK.deleteRecommendationCriterion(c.id);
          MM.showToast('Criteria set deleted.', { danger: true });
          renderRows();
        }, { title: 'Delete criteria' });
      });
    });
  }

  function openModal(c) {
    document.getElementById('criteria-modal-title').textContent = c ? 'Edit Occupancy Threshold' : 'Add Occupancy Threshold';
    document.getElementById('criteria-id').value = c ? c.id : '';
    document.getElementById('criteria-name').value = c ? c.name : '';
    document.getElementById('lm-days').value = c ? c.lastMinute.days : 14;
    document.getElementById('lm-under').value = c ? c.lastMinute.under : 40;
    document.getElementById('lm-over').value = c ? c.lastMinute.over : 70;
    document.getElementById('reg-under').value = c ? c.regular ? c.regular.under : Math.round((c.lastMinute.under + c.earlyBird.under) / 2) : 35;
    document.getElementById('reg-over').value = c ? c.regular ? c.regular.over : Math.round((c.lastMinute.over + c.earlyBird.over) / 2) : 65;
    document.getElementById('eb-days').value = c ? c.earlyBird.days : 60;
    document.getElementById('eb-under').value = c ? c.earlyBird.under : 30;
    document.getElementById('eb-over').value = c ? c.earlyBird.over : 60;
    document.getElementById('up-to').value = c ? c.upTo : 180;
    document.getElementById('exclude-days').value = c ? c.excludeDays : 7;
    document.getElementById('reg-days-display').textContent = c ? (c.lastMinute.days + '–' + c.earlyBird.days + ' days') : 'auto';
    document.querySelectorAll('#criteria-form .form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('criteria-modal');
  }

  document.getElementById('add-criteria-btn').addEventListener('click', function () { openModal(null); });

  var lmDays = document.getElementById('lm-days'), ebDays = document.getElementById('eb-days');
  function updateRegDisplay() { document.getElementById('reg-days-display').textContent = (lmDays.value || '?') + '–' + (ebDays.value || '?') + ' days'; }
  lmDays.addEventListener('input', updateRegDisplay);
  ebDays.addEventListener('input', updateRegDisplay);

  var form = document.getElementById('criteria-form');
  MM.bindFormValidation(form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(form)) { MM.showToast('Please fill in all required threshold fields.', { danger: true }); return; }
    var id = document.getElementById('criteria-id').value || MM.uid('CRIT');
    var criterion = {
      id: id,
      name: document.getElementById('criteria-name').value.trim(),
      lastMinute: { days: Number(document.getElementById('lm-days').value), under: Number(document.getElementById('lm-under').value), over: Number(document.getElementById('lm-over').value) },
      regular: { under: Number(document.getElementById('reg-under').value), over: Number(document.getElementById('reg-over').value) },
      earlyBird: { days: Number(document.getElementById('eb-days').value), under: Number(document.getElementById('eb-under').value), over: Number(document.getElementById('eb-over').value) },
      upTo: Number(document.getElementById('up-to').value),
      excludeDays: Number(document.getElementById('exclude-days').value)
    };
    var btn = document.getElementById('criteria-save-btn');
    var isEdit = !!document.getElementById('criteria-id').value;
    MM.simulateSave(btn, 'Saving…', function () {
      MM.BOOK.saveRecommendationCriterion(criterion);
      MM.closeModal('criteria-modal');
      MM.showToast(isEdit ? 'Criteria set updated.' : 'Criteria set added.');
      renderRows();
    });
  });

  renderRows();
});
