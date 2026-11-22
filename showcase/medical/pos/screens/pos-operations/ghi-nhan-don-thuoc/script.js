(function () {
  let draft = POS.getDraftRx();

  function requirePrescriptionDraft() {
    if (!draft) {
      POS.toast('No prescription in progress — start from Sales Terminal.', 'warning');
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
      return false;
    }
    return true;
  }

  function rxProducts() { return DATA_PRODUCT.filter(p => p.requiresPrescription); }

  function renderBackdrop() {
    document.getElementById('patientNameOut').textContent = draft.patientName || '—';
    document.getElementById('patientMetaOut').textContent = (draft.patientNric || '—') + ' · ' + (draft.prescribingDoctor || '—');
    const hasAllergy = draft.allergies && draft.allergies.length && !(draft.allergies.length === 1 && draft.allergies[0] === 'None known');
    const banner = document.getElementById('allergyBanner');
    if (hasAllergy) {
      document.getElementById('allergyBannerText').textContent = 'Allergies: ' + draft.allergies.join(', ') + '. Verify medication before confirming dispense.';
      banner.style.display = 'flex';
    } else banner.style.display = 'none';
  }

  function renderMedicationSelect() {
    const select = document.getElementById('medicationSelect');
    select.innerHTML = rxProducts().map(p => `<option value="${p.sku}">${p.name} (${p.unit})</option>`).join('');
    select.value = draft.medicationSku || rxProducts()[0].sku;
    if (!draft.medicationSku) { syncMedicationFields(); }
  }

  function syncMedicationFields() {
    const product = DATA_PRODUCT.find(p => p.sku === document.getElementById('medicationSelect').value);
    draft.medicationSku = product.sku;
    draft.medicationName = product.name;
  }

  function updateSummary() {
    const prescribed = parseInt(document.getElementById('qtyPrescribed').value, 10) || 0;
    const dispensedInput = document.getElementById('qtyDispensed');
    let dispensed = parseInt(dispensedInput.value, 10) || 0;
    const wrap = document.getElementById('f_qtyDispensed');
    if (dispensed > prescribed) {
      wrap.classList.add('has-error');
    } else {
      wrap.classList.remove('has-error');
    }
    const remaining = Math.max(prescribed - Math.min(dispensed, prescribed), 0);
    document.getElementById('qtyRemainingOut').textContent = remaining;
    const badge = document.getElementById('dispenseStatusBadge');
    if (remaining === 0 && prescribed > 0) {
      badge.textContent = 'Fully Dispensed';
      badge.className = 'badge badge-success';
    } else {
      badge.textContent = 'Partially Dispensed';
      badge.className = 'badge badge-warning';
    }
  }

  function confirmDispense() {
    syncMedicationFields();
    const prescribed = parseInt(document.getElementById('qtyPrescribed').value, 10) || 0;
    const dispensed = Math.min(parseInt(document.getElementById('qtyDispensed').value, 10) || 0, prescribed);
    if (prescribed <= 0) { POS.toast('Enter a valid quantity prescribed.', 'warning'); return; }
    draft.qtyPrescribed = prescribed;
    draft.qtyDispensed = dispensed;
    draft.qtyRemaining = prescribed - dispensed;
    draft.dispenseStatus = draft.qtyRemaining === 0 ? 'Fully Dispensed' : 'Partially Dispensed';

    const btn = document.getElementById('confirmDispenseBtn');
    btn.disabled = true; btn.textContent = 'Confirming…';
    setTimeout(() => {
      POS.saveDraftRx(draft);
      window.location.href = '../ghi-nhan-tu-van-duoc/index.html';
    }, 450);
  }

  function cancelFlow() {
    if (confirm('Cancel this prescription and return to Sales Terminal? Unsaved info will be lost.')) {
      POS.clearDraftRx();
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!requirePrescriptionDraft()) return;
    renderBackdrop();
    renderMedicationSelect();
    document.getElementById('qtyPrescribed').value = draft.qtyPrescribed || 1;
    document.getElementById('qtyDispensed').value = draft.qtyDispensed || 0;
    updateSummary();

    document.getElementById('medicationSelect').addEventListener('change', syncMedicationFields);
    document.getElementById('qtyPrescribed').addEventListener('input', updateSummary);
    document.getElementById('qtyDispensed').addEventListener('input', updateSummary);
    document.getElementById('confirmDispenseBtn').addEventListener('click', confirmDispense);
    document.getElementById('backBtn').addEventListener('click', cancelFlow);
    document.getElementById('cancelFlowBtn').addEventListener('click', cancelFlow);
  });
})();
