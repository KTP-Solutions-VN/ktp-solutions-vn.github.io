(function () {
  let draft = POS.getDraftRx();

  function requireDraft() {
    if (!draft) {
      POS.toast('No prescription in progress — start from Sales Screen.', 'warning');
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
      return false;
    }
    return true;
  }

  function renderBackdrop() {
    document.getElementById('medicationOut').textContent = draft.medicationName || '—';
    document.getElementById('patientOut').textContent = draft.patientName || '—';
  }

  function renderPriorInterventions() {
    const wrap = document.getElementById('priorInterventions');
    if (!draft.interventionRecords || !draft.interventionRecords.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<label class="text-caption" style="font-weight:600;color:var(--gray-700);">Prior interventions on this prescription</label><div class="mt-2">' +
      draft.interventionRecords.map(r => `
        <div class="prior-intervention">
          <div class="prior-intervention__meta">${POS.fmtDateTime(r.recordedAt)} · ${r.recordedBy} · <span class="badge badge-neutral">${r.outcome}</span></div>
          <div class="prior-intervention__body"><b>Issue:</b> ${r.issue}<br><b>Action:</b> ${r.actionTaken}</div>
        </div>
      `).join('') + '</div>';
  }

  function validate() {
    let ok = true;
    const issue = document.getElementById('issueDesc').value.trim();
    const action = document.getElementById('actionTaken').value.trim();
    const outcome = document.getElementById('outcomeSelect').value;
    document.getElementById('f_issue').classList.toggle('has-error', !issue);
    document.getElementById('f_action').classList.toggle('has-error', !action);
    document.getElementById('f_outcome').classList.toggle('has-error', !outcome);
    if (!issue || !action || !outcome) ok = false;
    return ok;
  }

  function saveAndReturn() {
    if (!validate()) { POS.toast('Complete the intervention record before continuing.', 'warning'); return; }
    const record = {
      issue: document.getElementById('issueDesc').value.trim(),
      actionTaken: document.getElementById('actionTaken').value.trim(),
      outcome: document.getElementById('outcomeSelect').value,
      recordedBy: POS.getSession().cashierName,
      recordedAt: new Date().toISOString(),
    };
    draft.interventionRecords = draft.interventionRecords || [];
    draft.interventionRecords.push(record);
    POS.saveDraftRx(draft);
    POS.toast('Intervention recorded — returning to Counseling.', 'success');
    setTimeout(() => { window.location.href = '../ghi-nhan-tu-van-duoc/index.html'; }, 400);
  }

  function cancelFlow() {
    if (confirm('Cancel this prescription and return to Sales Screen? Unsaved info will be lost.')) {
      POS.clearDraftRx();
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!requireDraft()) return;
    renderBackdrop();
    renderPriorInterventions();
    document.getElementById('saveReturnBtn').addEventListener('click', saveAndReturn);
    document.getElementById('backBtn').addEventListener('click', cancelFlow);
    document.getElementById('cancelFlowBtn').addEventListener('click', cancelFlow);
  });
})();
