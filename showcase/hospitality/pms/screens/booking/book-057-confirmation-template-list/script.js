document.addEventListener('DOMContentLoaded', function () {
  var BASE_TEMPLATES = [
    {
      id: 'CT-01', language: 'English', templateName: 'Standard Owner Confirmation (EN)',
      businessUnits: ['Phuket Collection', 'Bali Retreats', 'Koh Samui Estates'],
      createdBy: 'Somchai Anuwat', on: '2026-03-02', logo: null,
      companyName: 'Azura Stays Villas', companyShortName: 'Azura Stays', addr1: '88 Beach Road', addr2: 'Kathu District', addr3: 'Phuket 83150, Thailand',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', signatory: 'Somchai Anuwat', currency: 'USD', replyEmail: 'no-reply@azurastays.example'
    },
    {
      id: 'CT-02', language: 'French', templateName: 'Confirmation Propriétaire Standard (FR)',
      businessUnits: ['Bali Retreats'],
      createdBy: 'Wayan Kertha', on: '2026-04-10', logo: null,
      companyName: 'Azura Stays Villas', companyShortName: 'Azura Stays', addr1: 'Jl. Pantai Berawa No. 21', addr2: 'Canggu', addr3: 'Bali 80361, Indonésie',
      phone: '+62 361 555 0199', email: 'reservations.bali@azurastays.example', website: 'www.azurastays.example',
      taxId: '01.234.567.8-901.000', signatory: 'Wayan Kertha', currency: 'EUR', replyEmail: 'no-reply@azurastays.example'
    },
    {
      id: 'CT-03', language: 'German', templateName: 'Standard-Eigentümerbestätigung (DE)',
      businessUnits: ['Koh Samui Estates'],
      createdBy: 'Nok Pattaya', on: '2026-05-02', logo: null,
      companyName: 'Azura Stays Villas', companyShortName: 'Azura Stays', addr1: '12 Chaweng Beach Road', addr2: 'Koh Samui', addr3: 'Surat Thani 84320, Thailand',
      phone: '+66 77 555 210', email: 'reservations.samui@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', signatory: 'Nok Pattaya', currency: 'EUR', replyEmail: 'no-reply@azurastays.example'
    },
    {
      id: 'CT-04', language: 'Spanish', templateName: 'Confirmación Estándar del Propietario (ES)',
      businessUnits: ['Phuket Collection'],
      createdBy: 'Somchai Anuwat', on: '2026-05-20', logo: null,
      companyName: 'Azura Stays Villas', companyShortName: 'Azura Stays', addr1: '88 Beach Road', addr2: 'Kathu District', addr3: 'Phuket 83150, Tailandia',
      phone: '+66 76 123 456', email: 'reservations@azurastays.example', website: 'www.azurastays.example',
      taxId: '0105558012345', signatory: 'Somchai Anuwat', currency: 'USD', replyEmail: 'no-reply@azurastays.example'
    },
    {
      id: 'CT-05', language: 'Chinese (Mandarin)', templateName: 'Standard Owner Confirmation (ZH)',
      businessUnits: ['Bali Retreats', 'Koh Samui Estates'],
      createdBy: 'Wayan Kertha', on: '2026-06-15', logo: null,
      companyName: 'Azura Stays Villas', companyShortName: 'Azura Stays', addr1: 'Jl. Pantai Berawa No. 21', addr2: 'Canggu', addr3: 'Bali 80361, Indonesia',
      phone: '+62 361 555 0199', email: 'reservations.bali@azurastays.example', website: 'www.azurastays.example',
      taxId: '01.234.567.8-901.000', signatory: 'Wayan Kertha', currency: 'THB', replyEmail: 'no-reply@azurastays.example'
    }
  ];

  var EXTRA_KEY = 'mm_confirmation_templates_extra';
  var EDITS_KEY = 'mm_confirmation_templates_edits';
  var DELETED_KEY = 'mm_confirmation_templates_deleted';

  function safeParse(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }

  function getAllTemplates() {
    var extra = safeParse(EXTRA_KEY, []);
    var edits = safeParse(EDITS_KEY, {});
    var deleted = safeParse(DELETED_KEY, []);
    var merged = BASE_TEMPLATES.concat(extra).filter(function (t) { return deleted.indexOf(t.id) === -1; });
    return merged.map(function (t) { return edits[t.id] ? Object.assign({}, t, edits[t.id]) : t; });
  }
  function getTemplateById(id) {
    var found = null;
    getAllTemplates().forEach(function (t) { if (t.id === id) found = t; });
    return found;
  }
  function addTemplate(fields) {
    var extra = safeParse(EXTRA_KEY, []);
    var row = Object.assign({ id: MM.uid('CT'), createdBy: 'Somchai Anuwat', on: new Date().toISOString().slice(0, 10) }, fields);
    extra.unshift(row);
    localStorage.setItem(EXTRA_KEY, JSON.stringify(extra));
    return row;
  }
  function saveTemplateEdit(id, fields) {
    var edits = safeParse(EDITS_KEY, {});
    edits[id] = Object.assign({}, edits[id] || {}, fields);
    localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
  }
  function deleteTemplate(id) {
    var deleted = safeParse(DELETED_KEY, []);
    deleted.push(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
  }

  var state = { q: '', sortKey: null, sortDir: 'asc' };

  function rowHtml(t, idx) {
    var buChips = t.businessUnits.map(function (bu) { return '<span class="badge badge-neutral" style="margin:1px 3px 1px 0;">' + bu + '</span>'; }).join('');
    return '<tr>' +
      '<td class="cell-num">' + (idx + 1) + '</td>' +
      '<td><span class="cell-strong">' + t.templateName + '</span><br><span class="cell-sub">' + t.language + '</span></td>' +
      '<td>' + buChips + '</td>' +
      '<td>' + t.createdBy + '</td>' +
      '<td class="cell-num">' + MM.BOOK.fmtDate(t.on) + '</td>' +
      '<td><div class="row-actions">' +
        '<button class="btn btn-ghost btn-sm" data-view="' + t.id + '" title="View"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-edit="' + t.id + '" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button>' +
        '<button class="btn btn-ghost btn-sm" data-delete="' + t.id + '" title="Delete"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      '</div></td>' +
    '</tr>';
  }

  function render() {
    var all = getAllTemplates();
    var filtered = all.filter(function (t) {
      if (!state.q) return true;
      var hay = (t.templateName + ' ' + t.language + ' ' + t.createdBy).toLowerCase();
      return hay.indexOf(state.q) !== -1;
    });
    if (state.sortKey === 'template') {
      filtered = filtered.slice().sort(function (a, b) { return a.templateName.localeCompare(b.templateName); });
      if (state.sortDir === 'desc') filtered.reverse();
    } else if (state.sortKey === 'on') {
      filtered = filtered.slice().sort(function (a, b) { return new Date(a.on) - new Date(b.on); });
      if (state.sortDir === 'desc') filtered.reverse();
    }

    var tbody = document.getElementById('template-tbody');
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">' +
        '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
        '<h3>No templates found</h3><p>Try a different search term, or add a new template.</p></div></td></tr>';
    } else {
      tbody.innerHTML = filtered.map(rowHtml).join('');
    }

    tbody.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () { openView(btn.getAttribute('data-view')); });
    });
    tbody.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { openForm(btn.getAttribute('data-edit')); });
    });
    tbody.querySelectorAll('[data-delete]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-delete');
        var t = getTemplateById(id);
        MM.BOOK.confirmAction('Delete template "' + (t ? t.templateName : id) + '"? This cannot be undone.', function () {
          deleteTemplate(id);
          MM.showToast('Template deleted.', { danger: true });
          render();
        }, { title: 'Delete template' });
      });
    });
  }

  /* Search + sort chips */
  MM.BOOK.wireSearch(document.getElementById('search-input'), function (q) { state.q = q; render(); });
  document.querySelectorAll('.toolbar .chip[data-sort]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-sort');
      if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = key; state.sortDir = 'asc'; }
      document.querySelectorAll('.toolbar .chip[data-sort]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      render();
    });
  });

  /* ---------------------------------------------------------------- */
  /* View modal                                                          */
  /* ---------------------------------------------------------------- */
  function field(label, value) {
    return '<div><div class="detail-field__label">' + label + '</div><div class="detail-field__value">' + (value || '—') + '</div></div>';
  }
  function openView(id) {
    var t = getTemplateById(id);
    if (!t) return;
    document.getElementById('template-view-body').innerHTML =
      field('Language', t.language) + field('Template Name', t.templateName) +
      field('Currency', t.currency) +
      field('Company Name', t.companyName) + field('Company Short Name', t.companyShortName) +
      field('Address', [t.addr1, t.addr2, t.addr3].filter(Boolean).join(', ')) +
      field('Phone', t.phone) + field('Email', t.email) + field('Website', t.website) +
      field('Tax ID', t.taxId) + field('Signatory Name', t.signatory) + field('Reply-to Email', t.replyEmail) +
      field('Business Units', t.businessUnits.join(', ')) +
      field('Created By', t.createdBy + ' on ' + MM.BOOK.fmtDate(t.on));
    MM.openModal('modal-template-view');
  }

  /* ---------------------------------------------------------------- */
  /* Add / Edit modal (shared form)                                     */
  /* ---------------------------------------------------------------- */
  var form = document.getElementById('template-form');
  MM.bindFormValidation(form);

  document.getElementById('btn-add-template').addEventListener('click', function () { openForm(null); });

  function resetForm() {
    form.reset();
    document.getElementById('tpl-id').value = '';
    form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    form.querySelectorAll('.tpl-bu').forEach(function (cb) { cb.checked = false; });
  }

  function openForm(id) {
    resetForm();
    var isEdit = !!id;
    document.getElementById('template-form-title').textContent = isEdit ? 'Edit Booking Confirmation Template' : 'Add Booking Confirmation Template';
    document.getElementById('tpl-logo').removeAttribute('required');
    if (isEdit) {
      var t = getTemplateById(id);
      if (!t) return;
      document.getElementById('tpl-id').value = t.id;
      document.getElementById('tpl-language').value = t.language;
      document.getElementById('tpl-name').value = t.templateName;
      document.getElementById('tpl-company-name').value = t.companyName;
      document.getElementById('tpl-company-short').value = t.companyShortName;
      document.getElementById('tpl-addr1').value = t.addr1;
      document.getElementById('tpl-addr2').value = t.addr2 || '';
      document.getElementById('tpl-addr3').value = t.addr3 || '';
      document.getElementById('tpl-phone').value = t.phone;
      document.getElementById('tpl-email').value = t.email;
      document.getElementById('tpl-website').value = t.website;
      document.getElementById('tpl-tax-id').value = t.taxId;
      document.getElementById('tpl-signatory').value = t.signatory;
      document.getElementById('tpl-currency').value = t.currency;
      document.getElementById('tpl-reply-email').value = t.replyEmail;
      form.querySelectorAll('.tpl-bu').forEach(function (cb) { cb.checked = t.businessUnits.indexOf(cb.value) !== -1; });
    }
    MM.openModal('modal-template-form');
  }

  function buChecked() {
    return Array.from(form.querySelectorAll('.tpl-bu:checked')).map(function (cb) { return cb.value; });
  }

  document.getElementById('btn-save-template').addEventListener('click', function () {
    var validStandard = MM.validateForm(form);
    var bus = buChecked();
    var buGroup = form.querySelector('.tpl-bu').closest('.form-group');
    var buValid = bus.length > 0;
    buGroup.classList.toggle('has-error', !buValid);
    if (!buValid) {
      var err = buGroup.querySelector('.form-error');
      if (!err) { err = document.createElement('span'); err.className = 'form-error'; buGroup.appendChild(err); }
      err.textContent = 'Select at least one business unit.';
    }
    if (!validStandard || !buValid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

    var id = document.getElementById('tpl-id').value;
    var language = document.getElementById('tpl-language').value;
    var fields = {
      language: language,
      templateName: document.getElementById('tpl-name').value.trim(),
      companyName: document.getElementById('tpl-company-name').value.trim(),
      companyShortName: document.getElementById('tpl-company-short').value.trim(),
      addr1: document.getElementById('tpl-addr1').value.trim(),
      addr2: document.getElementById('tpl-addr2').value.trim(),
      addr3: document.getElementById('tpl-addr3').value.trim(),
      phone: document.getElementById('tpl-phone').value.trim(),
      email: document.getElementById('tpl-email').value.trim(),
      website: document.getElementById('tpl-website').value.trim(),
      taxId: document.getElementById('tpl-tax-id').value.trim(),
      signatory: document.getElementById('tpl-signatory').value.trim(),
      currency: document.getElementById('tpl-currency').value,
      replyEmail: document.getElementById('tpl-reply-email').value.trim(),
      businessUnits: bus
    };

    var existingForLanguage = getAllTemplates().filter(function (t) { return t.language === language && t.id !== id; })[0];
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      if (id) {
        saveTemplateEdit(id, fields);
        MM.showToast('Template updated.');
      } else {
        if (existingForLanguage) {
          deleteTemplate(existingForLanguage.id);
          MM.showToast(language + ' already had a template — it has been replaced.', { danger: true });
        }
        addTemplate(fields);
        if (!existingForLanguage) MM.showToast('Template added.');
      }
      MM.closeModal('modal-template-form');
      render();
    });
  });

  render();
});
