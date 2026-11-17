(function () {
  let draft = POS.getDraftRx();
  const CHECKLIST_ITEMS = [
    'Explained dosage & frequency',
    'Explained possible side effects',
    'Confirmed no drug interaction with current medication',
    'Confirmed allergy status reviewed',
    'Patient questions addressed',
  ];
  let issueFound = false;

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
    document.getElementById('dispenseOut').textContent = 'Dispensed ' + draft.qtyDispensed + '/' + draft.qtyPrescribed + ' · ' + draft.dispenseStatus;
    const hasAllergy = draft.allergies && draft.allergies.length && !(draft.allergies.length === 1 && draft.allergies[0] === 'None known');
    const banner = document.getElementById('allergyBanner');
    if (hasAllergy) {
      document.getElementById('allergyBannerText').textContent = 'Allergies: ' + draft.allergies.join(', ') + '. Confirm the patient has been asked again before releasing medication.';
      banner.style.display = 'flex';
    } else banner.style.display = 'none';

    if (draft.interventionRecords && draft.interventionRecords.length) {
      const last = draft.interventionRecords[draft.interventionRecords.length - 1];
      const el = document.getElementById('interventionSummary');
      el.style.display = 'block';
      el.innerHTML = '<b>' + draft.interventionRecords.length + ' intervention record(s) on this prescription.</b> Most recent: “' + last.issue + '” → ' + last.outcome + '.';
    }
  }

  function renderChecklist() {
    const wrap = document.getElementById('checklistWrap');
    wrap.innerHTML = CHECKLIST_ITEMS.map(item => {
      const checked = draft.counselingChecklist && draft.counselingChecklist.includes(item);
      return `<div class="check-row ${checked ? 'is-checked' : ''}" data-item="${item}">
        <div class="checkbox-box"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
        <span>${item}</span>
      </div>`;
    }).join('');
    wrap.querySelectorAll('.check-row').forEach(row => {
      row.addEventListener('click', () => {
        const item = row.dataset.item;
        draft.counselingChecklist = draft.counselingChecklist || [];
        const idx = draft.counselingChecklist.indexOf(item);
        if (idx >= 0) draft.counselingChecklist.splice(idx, 1); else draft.counselingChecklist.push(item);
        row.classList.toggle('is-checked');
      });
    });
  }

  function syncNotes() { draft.counselingNotes = document.getElementById('counselingNotes').value; }

  function updatePrimaryButtonLabel() {
    const btn = document.getElementById('primaryActionBtn');
    btn.innerHTML = issueFound
      ? 'Continue to Intervention Recording <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px;vertical-align:-3px;"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
      : 'Complete Counseling & Submit to NEHR';
  }

  function toggleIssue() {
    issueFound = !issueFound;
    document.getElementById('issueToggle').classList.toggle('is-on', issueFound);
    updatePrimaryButtonLabel();
  }

  function generateNehrRef() {
    return 'NEHR-SG-' + Math.floor(10000000 + Math.random() * 89999999);
  }

  function primaryAction() {
    syncNotes();
    POS.saveDraftRx(draft);

    if (issueFound) {
      window.location.href = '../ghi-nhan-quy-trinh-can-thiep/index.html';
      return;
    }

    const complete = CHECKLIST_ITEMS.every(item => draft.counselingChecklist && draft.counselingChecklist.includes(item));
    if (!complete) {
      POS.toast('Complete every checklist item before submitting.', 'warning');
      return;
    }

    const btn = document.getElementById('primaryActionBtn');
    btn.disabled = true;
    btn.textContent = 'Submitting to NEHR…';

    setTimeout(() => {
      const now = new Date().toISOString();
      draft.counselingCompletedAt = now;
      draft.dispenseStatus = 'NEHR Submitted';
      draft.nehrSubmitted = true;
      draft.nehrSubmittedAt = now;
      draft.nehrReference = generateNehrRef();
      draft.cashierName = POS.getSession().cashierName;

      const txn = POS.completeSale({ linkedPrescriptionId: draft.id });
      draft.transactionId = txn ? txn.id : null;
      POS.upsertPrescription(draft);

      document.getElementById('nehrAuditLine').innerHTML =
        'Submitted by <b>' + draft.cashierName + '</b> at <b>' + POS.fmtDateTime(now) + '</b><br>NEHR Reference: <b>' + draft.nehrReference + '</b>' +
        (txn ? '<br>Linked transaction: <b>' + txn.transactionNo + '</b> · ' + POS.fmtCurrency(txn.total) : '');

      document.getElementById('formView').style.display = 'none';
      document.getElementById('successView').style.display = 'block';
    }, 750);
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
    renderChecklist();
    document.getElementById('counselingNotes').value = draft.counselingNotes || '';
    updatePrimaryButtonLabel();

    document.getElementById('issueToggle').addEventListener('click', toggleIssue);
    document.getElementById('primaryActionBtn').addEventListener('click', primaryAction);
    document.getElementById('backBtn').addEventListener('click', cancelFlow);
    document.getElementById('cancelFlowBtn').addEventListener('click', cancelFlow);
    document.getElementById('doneBtn').addEventListener('click', () => {
      POS.clearDraftRx();
      POS.toast('Prescription completed and submitted to NEHR.', 'success');
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
    });
  });
})();
