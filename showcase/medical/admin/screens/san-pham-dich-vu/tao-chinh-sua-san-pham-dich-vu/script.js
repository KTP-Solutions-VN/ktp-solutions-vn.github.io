
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelector('[data-panel="' + btn.getAttribute('data-tab') + '"]').classList.add('active');
    });
  });
  function updatePreview() {
    var lp = parseFloat(document.getElementById('fListPrice').value) || 0;
    var sp = parseFloat(document.getElementById('fSalePrice').value) || 0;
    document.getElementById('previewList').textContent = 'SGD ' + lp.toFixed(0);
    document.getElementById('previewSale').textContent = 'SGD ' + (sp || lp).toFixed(0);
  }
  document.getElementById('fListPrice').addEventListener('input', updatePreview);
  document.getElementById('fSalePrice').addEventListener('input', updatePreview);

  function validateField(el) {
    var field = el.closest('.field');
    var ok = el.value.trim() !== '' && el.value !== '';
    field.classList.toggle('has-error', !ok);
    return ok;
  }
  ['fName', 'fCategory'].forEach(function (id) {
    document.getElementById(id).addEventListener('blur', function () { validateField(this); });
  });

  document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = ['fName', 'fCategory'].map(function (id) { return validateField(document.getElementById(id)); }).every(Boolean);
    if (!valid) { CJToast('Please complete the required fields before saving.'); return; }
    var btn = document.getElementById('saveBtn');
    btn.disabled = true; btn.textContent = 'Saving...';
    setTimeout(function () {
      var newProduct = {
        id: 'PRD-NEW-' + Date.now().toString().slice(-4),
        name: document.getElementById('fName').value,
        type: 'Service', category: document.getElementById('fCategory').value, bu: 'Meridian Specialists',
        status: 'Published',
        variants: [{ id: 'V1', name: 'Standard', sku: 'NEW-STD', stock: 20, price: parseFloat(document.getElementById('fSalePrice').value) || 0 }],
        listPrice: parseFloat(document.getElementById('fListPrice').value) || 0,
        salePrice: parseFloat(document.getElementById('fSalePrice').value) || null,
        currency: 'SGD', location: '', doctor: null, leadTimeDays: 2, bookingWindowDays: 30, blackoutDates: [],
        publishedAt: new Date().toISOString().slice(0, 10), thumbnail: '✨'
      };
      CJStore.addExtra('admin_products', newProduct);
      window.location.href = '../../../screens/san-pham-dich-vu/danh-sach-san-pham-dich-vu/index.html';
    }, 600);
  });
  