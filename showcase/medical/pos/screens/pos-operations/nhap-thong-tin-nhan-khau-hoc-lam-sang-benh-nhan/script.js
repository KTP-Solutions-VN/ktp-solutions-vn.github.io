(function () {
  const cart = POS.getCart();
  let selectedAllergies = new Set(['None known']);

  function renderCartSummary() {
    const el = document.getElementById('cartSummaryText');
    if (!cart.items.length) { el.textContent = 'No retail items in this sale yet.'; return; }
    const count = cart.items.reduce((s, i) => s + i.qty, 0);
    const total = cart.items.reduce((s, i) => s + i.lineTotal, 0);
    el.textContent = count + ' item(s) · ' + POS.fmtCurrency(total) + ' subtotal';
  }

  function toggleAllergy(value) {
    if (value === 'None known') {
      selectedAllergies = new Set(['None known']);
    } else {
      selectedAllergies.delete('None known');
      if (selectedAllergies.has(value)) selectedAllergies.delete(value); else selectedAllergies.add(value);
      if (selectedAllergies.size === 0) selectedAllergies.add('None known');
    }
    document.querySelectorAll('#allergyChips .chip').forEach(chip => {
      const isSel = selectedAllergies.has(chip.dataset.allergy);
      chip.classList.toggle('is-selected', isSel);
      chip.classList.toggle('is-alert', chip.dataset.allergy !== 'None known');
    });
    document.getElementById('allergyOther').style.display = selectedAllergies.has('Other') ? 'block' : 'none';
    updateAllergyBanner();
  }

  function updateAllergyBanner() {
    const banner = document.getElementById('allergyBanner');
    const hasAllergy = !(selectedAllergies.size === 1 && selectedAllergies.has('None known'));
    if (hasAllergy) {
      const list = Array.from(selectedAllergies).join(', ');
      document.getElementById('allergyBannerText').textContent = 'Patient has recorded allergies to: ' + list + '. Cross-check against the medication being dispensed before proceeding.';
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }

  function validate() {
    let ok = true;
    const req = [
      ['f_name', 'patientName'], ['f_nric', 'patientNric'], ['f_dob', 'patientDob'],
      ['f_gender', 'patientGender'], ['f_contact', 'patientContact'], ['f_doctor', 'prescribingDoctor'],
    ];
    req.forEach(([fieldId, inputId]) => {
      const wrap = document.getElementById(fieldId);
      const val = document.getElementById(inputId).value.trim();
      const invalid = !val;
      wrap.classList.toggle('has-error', invalid);
      if (invalid) ok = false;
    });
    const nric = document.getElementById('patientNric').value.trim();
    if (nric && !/^(\d{4} ?\d{5} ?\d( ?[1-9])?|[A-Z]{0,2}\d{5,10})$/i.test(nric)) {
      document.getElementById('f_nric').classList.add('has-error');
      ok = false;
    }
    const contact = document.getElementById('patientContact').value.trim();
    if (contact && contact.replace(/\D/g, '').length < 8) {
      document.getElementById('f_contact').classList.add('has-error');
      ok = false;
    }
    return ok;
  }

  function saveAndContinue() {
    if (!validate()) { POS.toast('Please complete all required fields.', 'warning'); return; }
    const btn = document.getElementById('saveNextBtn');
    btn.disabled = true;
    btn.textContent = 'Saving…';
    setTimeout(() => {
      const allergies = Array.from(selectedAllergies);
      if (allergies.includes('Other')) {
        const other = document.getElementById('allergyOther').value.trim();
        if (other) { allergies[allergies.indexOf('Other')] = other; }
      }
      const pendingProduct = cart.pendingRxSku ? DATA_PRODUCT.find(p => p.sku === cart.pendingRxSku) : null;
      const draft = {
        id: 'RX-' + Date.now().toString().slice(-6),
        prescriptionNo: 'RX-2026-' + Date.now().toString().slice(-4),
        patientName: document.getElementById('patientName').value.trim(),
        patientNric: document.getElementById('patientNric').value.trim().toUpperCase(),
        patientDob: document.getElementById('patientDob').value,
        patientGender: document.getElementById('patientGender').value,
        patientContact: document.getElementById('patientContact').value.trim(),
        allergies: allergies,
        clinicalNotes: document.getElementById('clinicalNotes').value.trim(),
        prescribingDoctor: document.getElementById('prescribingDoctor').value.trim(),
        medicationName: pendingProduct ? pendingProduct.name : '',
        medicationSku: pendingProduct ? pendingProduct.sku : '',
        qtyPrescribed: pendingProduct ? (cart.items.find(i => i.sku === pendingProduct.sku)?.qty || 1) : 1,
        qtyDispensed: 0,
        qtyRemaining: pendingProduct ? (cart.items.find(i => i.sku === pendingProduct.sku)?.qty || 1) : 1,
        dispenseStatus: 'Prescribed',
        counselingChecklist: [],
        counselingNotes: '',
        counselingCompletedAt: null,
        interventionRecords: [],
        nehrSubmitted: false,
        nehrSubmittedAt: null,
        nehrReference: null,
        cashierName: POS.getSession().cashierName,
        transactionId: null,
        createdAt: new Date().toISOString(),
      };
      POS.saveDraftRx(draft);
      window.location.href = '../ghi-nhan-don-thuoc/index.html';
    }, 500);
  }

  function cancelFlow() {
    if (confirm('Cancel prescription intake and return to Sales Terminal? Unsaved info will be lost.')) {
      POS.clearDraftRx();
      window.location.href = '../man-hinh-ban-hang-pos/index.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCartSummary();
    updateAllergyBanner();
    document.getElementById('allergyChips').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip) toggleAllergy(chip.dataset.allergy);
    });
    document.getElementById('saveNextBtn').addEventListener('click', saveAndContinue);
    document.getElementById('backToSaleBtn').addEventListener('click', cancelFlow);
    document.getElementById('cancelFlowBtn').addEventListener('click', cancelFlow);
  });
})();
