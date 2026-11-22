(function () {
  'use strict';

  var VERSIONS_KEY = 'mm_gc_versions';
  var SECTIONS_KEY = 'mm_gc_sections';
  var ELECTRICITY_KEY = 'mm_gc_electricity';

  var COUNTRIES = ['Singapore', 'Australia'];
  var LANGS = [
    { code: 'en', name: 'English' }, { code: 'fr', name: 'French' }, { code: 'cn', name: 'Chinese' },
    { code: 'ru', name: 'Russian' }, { code: 'ar', name: 'Arabic' }
  ];
  var NAV_ITEMS = [
    { id: 'general', label: 'General Content', tab: 'general' },
    { id: 'checkin_checkout', label: 'Check-in/Checkout', tab: 'section', sectionKey: 'checkin_checkout' },
    { id: 'deposit', label: 'Deposit', tab: 'section', sectionKey: 'deposit', group: ['deposit_no_deposit', 'deposit'] },
    { id: 'electricity', label: 'Electricity', tab: 'electricity' },
    { id: 'pool_cleaning', label: 'Pool Cleaning', tab: 'section', sectionKey: 'pool_cleaning' }
  ];
  var SECTION_META = {
    checkin_checkout: { label: 'Check-in/Checkout', vars: ['{property.check_in_time}', '{property.check_out_time}'] },
    deposit_no_deposit: { label: 'No Deposit', vars: [] },
    deposit: { label: 'Deposit', vars: ['{property.deposit_amount}'] },
    pool_cleaning: { label: 'Pool Cleaning', vars: ['{property.pool_cleaning_time}', '{property.pool_cleaning_frequency}'] }
  };
  var ELECTRICITY_TYPES = [
    { key: 'included', label: 'Included', vars: [], note: 'Electricity is included in the nightly rate — no extra clause variables needed.' },
    { key: 'collect_fixed', label: 'Collect Fixed', vars: ['{property.electricity_daily_amount}'], note: 'A flat charge is added per night of the stay.' },
    { key: 'collect_quota', label: 'Collect Quota', vars: ['{property.electricity_quota_kwh}', '{property.electricity_extra_kwh_rate}'], note: 'A usage quota is included; overage is billed at the extra rate.' },
    { key: 'collect_kwh', label: 'Collect kWh', vars: ['{property.electricity_kwh_rate}'], note: 'All usage is billed per kWh from meter readings.' },
    { key: 'platform_separate', label: 'Platform Separate', vars: [], note: 'Electricity is settled separately via the booking platform.' },
    { key: 'combined_separate', label: 'Combined Separate', vars: ['{property.electricity_quota_kwh}', '{property.electricity_extra_kwh_rate}'], note: 'Combined with other utilities but settled separately from rent.' }
  ];
  var PREVIEW_VALUES = {
    Singapore: { check_in_time: '2:00 PM', check_out_time: '11:00 AM', deposit_amount: '$500', pool_cleaning_time: '9:00 AM', pool_cleaning_frequency: 'twice weekly', electricity_daily_amount: '$8.00/day', electricity_quota_kwh: '50 kWh', electricity_extra_kwh_rate: '$0.35/kWh', electricity_kwh_rate: '$0.30/kWh' },
    Australia: { check_in_time: '2:00 PM', check_out_time: '12:00 PM', deposit_amount: '$400', pool_cleaning_time: '8:00 AM', pool_cleaning_frequency: 'three times weekly', electricity_daily_amount: '$6.00/day', electricity_quota_kwh: '40 kWh', electricity_extra_kwh_rate: '$0.30/kWh', electricity_kwh_rate: '$0.28/kWh' }
  };

  var SEED_VERSIONS = {
    Singapore: [
      { id: 'GCV-TH-1', name: 'Standard House Agreement', internal_note: 'Default for most detached villas', property_type: 'house',
        body: { en: 'This Guest Contract ("Agreement") is entered into between {property.name} and the Guest named on the confirmed booking. By completing check-in, the Guest agrees to the terms set out in this Agreement, including the sections referenced below on check-in/checkout, deposit and electricity.',
                fr: 'Le présent contrat d’hébergement ("l’Accord") est conclu entre {property.name} et l’invité nommé sur la réservation confirmée. En procédant à l’enregistrement, l’invité accepte les termes du présent Accord.' } },
      { id: 'GCV-TH-2', name: 'Resort Villa Agreement', internal_note: 'Used for resort-branded villas with shared facilities', property_type: 'resort',
        body: { en: 'This Resort Villa Agreement governs the Guest’s stay at {property.name}, including use of shared resort facilities in addition to the private villa. Resort house rules apply alongside the sections referenced below.' } }
    ],
    Australia: [
      { id: 'GCV-ID-1', name: 'Standard Villa Agreement', internal_note: '', property_type: 'flat',
        body: { en: 'This Guest Contract applies to stays at {property.name} in Australia. The Guest agrees to the terms set out below, including check-in/checkout, deposit and electricity arrangements.' } }
    ]
  };
  var SEED_SECTIONS = {
    'Singapore|checkin_checkout|en': 'Check-in begins at {property.check_in_time} and check-out is by {property.check_out_time}. Early check-in or late check-out may be requested through your concierge, subject to availability.',
    'Singapore|checkin_checkout|fr': 'L’arrivée débute à {property.check_in_time} et le départ doit avoir lieu avant {property.check_out_time}.',
    'Singapore|deposit_no_deposit|en': 'No security deposit is required for this booking.',
    'Singapore|deposit|en': 'A refundable security deposit of {property.deposit_amount} is due prior to arrival and will be refunded within 7 days of checkout, subject to a property inspection.',
    'Singapore|pool_cleaning|en': 'The pool is professionally cleaned at {property.pool_cleaning_time}, {property.pool_cleaning_frequency}. Please avoid pool use during service windows.',
    'Australia|checkin_checkout|en': 'Check-in from {property.check_in_time}, check-out by {property.check_out_time}.',
    'Australia|pool_cleaning|en': 'Pool service occurs at {property.pool_cleaning_time}, {property.pool_cleaning_frequency}.'
  };
  var SEED_ELECTRICITY = {
    'Singapore|included|en': 'Electricity is included in the rental rate at no additional cost to the Guest.',
    'Singapore|collect_fixed|en': 'A fixed electricity charge of {property.electricity_daily_amount} applies for each night of the stay.',
    'Singapore|collect_kwh|en': 'Electricity is billed at {property.electricity_kwh_rate} based on actual meter readings taken at check-in and check-out.',
    'Australia|collect_quota|en': 'The rate includes {property.electricity_quota_kwh} of electricity; usage beyond this is billed at {property.electricity_extra_kwh_rate}.'
  };

  function readStore(key, seed) {
    try {
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    localStorage.setItem(key, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }
  function writeStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function esc(s) { return (s || '').replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  document.addEventListener('DOMContentLoaded', function () {
    var versionsStore = readStore(VERSIONS_KEY, SEED_VERSIONS);
    var sectionsStore = readStore(SECTIONS_KEY, SEED_SECTIONS);
    var electricityStore = readStore(ELECTRICITY_KEY, SEED_ELECTRICITY);

    var params = new URLSearchParams(window.location.search);
    var state = {
      country: (params.get('country_id') && COUNTRIES.indexOf(params.get('country_id')) !== -1) ? params.get('country_id') : COUNTRIES[0],
      lang: (params.get('language_code') && LANGS.some(function (l) { return l.code === params.get('language_code'); })) ? params.get('language_code') : 'en',
      tab: ['general', 'section', 'electricity'].indexOf(params.get('tab')) !== -1 ? params.get('tab') : 'general',
      sectionKey: SECTION_META[params.get('section_key')] ? params.get('section_key') : 'checkin_checkout',
      paymentType: ELECTRICITY_TYPES.some(function (t) { return t.key === params.get('payment_setting_type'); }) ? params.get('payment_setting_type') : 'included',
      generalVersionId: params.get('general_version_id') || null
    };

    var versionDraft = null; // { id, name, internal_note, property_type, body: {lang: text} }
    var sectionDraft = { key: null, lang: null, text: '', dirty: false };
    var electricityDraft = { type: null, lang: null, text: '', dirty: false };
    var pendingDeleteVersionId = null;

    function currentVersions() { return versionsStore[state.country] || []; }
    function sectionKeyFor(k) { return state.country + '|' + k + '|' + state.lang; }
    function elecKeyFor(t) { return state.country + '|' + t + '|' + state.lang; }

    /* ---------- Status computation ---------- */
    function missingLangsForGeneral() {
      var versions = currentVersions();
      if (!versions.length) return { none: true, missing: LANGS.map(function (l) { return l.code; }) };
      var missing = LANGS.filter(function (l) {
        return versions.some(function (v) { return !(v.body && v.body[l.code] && v.body[l.code].trim()); });
      }).map(function (l) { return l.code; });
      return { none: false, missing: missing };
    }
    function missingLangsForSection(key) {
      var group = key === 'deposit' ? ['deposit_no_deposit', 'deposit'] : [key];
      var missing = LANGS.filter(function (l) {
        return group.some(function (gk) { return !(sectionsStore[state.country + '|' + gk + '|' + l.code] || '').trim(); });
      }).map(function (l) { return l.code; });
      return { none: false, missing: missing };
    }
    function missingLangsForElectricity() {
      var missing = LANGS.filter(function (l) {
        return ELECTRICITY_TYPES.some(function (t) { return !(electricityStore[state.country + '|' + t.key + '|' + l.code] || '').trim(); });
      }).map(function (l) { return l.code; });
      return { none: false, missing: missing };
    }
    function badgeFor(navId) {
      var result;
      if (navId === 'general') result = missingLangsForGeneral();
      else if (navId === 'electricity') result = missingLangsForElectricity();
      else result = missingLangsForSection(NAV_ITEMS.filter(function (n) { return n.id === navId; })[0].sectionKey);
      if (result.none) return { tone: 'bad', text: 'Not configured' };
      if (!result.missing.length) return { tone: 'ok', text: 'Complete' };
      return { tone: 'warn', text: result.missing.map(function (c) { return c.toUpperCase(); }).join(', ') + ' Missing' };
    }

    /* ---------- Top-level renders ---------- */
    function currentNavId() {
      if (state.tab === 'general') return 'general';
      if (state.tab === 'electricity') return 'electricity';
      if (state.sectionKey === 'pool_cleaning') return 'pool_cleaning';
      if (state.sectionKey === 'deposit_no_deposit' || state.sectionKey === 'deposit') return 'deposit';
      return 'checkin_checkout';
    }

    function renderCountrySelect() {
      var sel = document.getElementById('gc-country');
      sel.innerHTML = COUNTRIES.map(function (c) { return '<option value="' + c + '"' + (c === state.country ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    }

    function renderNavTabs() {
      var activeId = currentNavId();
      document.getElementById('gc-nav-tabs').innerHTML = NAV_ITEMS.map(function (n) {
        var badge = badgeFor(n.id);
        return '<div class="tab-item' + (n.id === activeId ? ' active' : '') + '" data-nav="' + n.id + '">' + n.label +
          '<span class="gc-tab-badge ' + badge.tone + '">' + badge.text + '</span></div>';
      }).join('');
    }

    function renderLangTabs() {
      document.getElementById('gc-lang-tabs').innerHTML = LANGS.map(function (l) {
        return '<div class="lang-tab' + (l.code === state.lang ? ' active' : '') + '" data-lang="' + l.code + '">' + l.name + '</div>';
      }).join('');
    }

    function updateURL() {
      var p = new URLSearchParams();
      p.set('country_id', state.country);
      p.set('language_code', state.lang);
      p.set('tab', state.tab);
      if (state.tab === 'section') p.set('section_key', state.sectionKey);
      if (state.tab === 'electricity') p.set('payment_setting_type', state.paymentType);
      if (state.tab === 'general' && state.generalVersionId) p.set('general_version_id', state.generalVersionId);
      window.history.replaceState({}, '', window.location.pathname + '?' + p.toString());
    }

    function substitutePreview(text) {
      var vals = PREVIEW_VALUES[state.country] || {};
      return esc(text || '').replace(/\{property\.([a-z_]+)\}/g, function (m, key) {
        return vals[key] !== undefined ? '<strong>' + esc(vals[key]) + '</strong>' : '<span style="color:var(--color-gray-400);">' + esc(m) + '</span>';
      });
    }

    /* ---------- General tab ---------- */
    function loadVersionDraft(id) {
      var v = currentVersions().filter(function (x) { return x.id === id; })[0];
      versionDraft = v ? { id: v.id, name: v.name, internal_note: v.internal_note, property_type: v.property_type, body: Object.assign({}, v.body || {}) }
                       : { id: null, name: '', internal_note: '', property_type: 'flat', body: {} };
      state.generalVersionId = v ? v.id : null;
    }

    function renderGeneralTab() {
      if (!versionDraft || (state.generalVersionId && (!versionDraft || versionDraft.id !== state.generalVersionId))) {
        if (state.generalVersionId) loadVersionDraft(state.generalVersionId);
        else if (currentVersions().length) loadVersionDraft(currentVersions()[0].id);
        else loadVersionDraft(null);
      }
      var versions = currentVersions();
      var body = document.getElementById('gc-body');
      body.innerHTML =
        '<div class="gc-layout">' +
          '<div class="card"><div class="card__header"><div><h3>Version Library</h3></div></div><div class="card__body">' +
            '<div class="gc-version-list" id="gc-version-list"></div>' +
            '<button type="button" class="btn btn-outline btn-sm" id="gc-new-version-btn" style="margin-top:12px;width:100%;">+ New Version</button>' +
          '</div></div>' +
          '<div class="card"><div class="card__body">' +
            '<div class="form-grid">' +
              '<div class="form-group full"><label>Version Name <span class="req">*</span></label><input type="text" id="gc-version-name" required><span class="form-error"></span></div>' +
              '<div class="form-group full"><label>Internal Note</label><input type="text" id="gc-version-note" placeholder="Not shown to guests"></div>' +
              '<div class="form-group full"><label>Property Type <span class="req">*</span></label>' +
                '<div class="gc-option-strip" id="gc-property-type-strip">' +
                  ['flat', 'house', 'resort'].map(function (t) { return '<button type="button" class="gc-option-btn" data-ptype="' + t + '">' + t.charAt(0).toUpperCase() + t.slice(1) + '</button>'; }).join('') +
                '</div></div>' +
              '<div class="form-group full"><label>Contract Content (Body)</label><textarea id="gc-general-body" class="gc-rich-text-editor" rows="10"></textarea></div>' +
            '</div>' +
            '<div class="cms-form-footer">' +
              '<button type="button" class="btn btn-ghost" id="gc-cancel-btn">Cancel</button>' +
              '<button type="button" class="btn btn-primary" id="gc-save-general-btn">Save</button>' +
            '</div>' +
          '</div></div>' +
          '<div class="gc-preview-panel"><h4>Preview — ' + state.lang.toUpperCase() + '</h4><div class="gc-preview-body" id="gc-general-preview"></div></div>' +
        '</div>';

      document.getElementById('gc-version-list').innerHTML = versions.map(function (v) {
        var langTags = LANGS.map(function (l) {
          var has = v.body && v.body[l.code] && v.body[l.code].trim();
          return '<span class="gc-lang-chip' + (has ? ' has-content' : '') + '">' + l.code.toUpperCase() + '</span>';
        }).join('');
        return '<div class="gc-version-card' + (v.id === state.generalVersionId ? ' active' : '') + '" data-version-id="' + v.id + '">' +
          '<button type="button" class="gc-version-card__remove" data-delete-version="' + v.id + '" data-version-name="' + esc(v.name) + '" aria-label="Delete version">&times;</button>' +
          '<div class="gc-version-card__name">' + esc(v.name) + '</div>' +
          (v.internal_note ? '<div class="gc-version-card__note">' + esc(v.internal_note) + '</div>' : '') +
          '<div class="gc-version-card__meta"><span class="badge badge-neutral">' + v.property_type.charAt(0).toUpperCase() + v.property_type.slice(1) + '</span>' + langTags + '</div>' +
        '</div>';
      }).join('') || '<p class="text-sm text-muted">No versions yet for ' + state.country + '.</p>';

      document.getElementById('gc-version-name').value = versionDraft.name || '';
      document.getElementById('gc-version-note').value = versionDraft.internal_note || '';
      document.getElementById('gc-general-body').value = (versionDraft.body && versionDraft.body[state.lang]) || '';
      document.querySelectorAll('#gc-property-type-strip .gc-option-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-ptype') === versionDraft.property_type);
      });
      updateGeneralPreview();

      document.getElementById('gc-version-list').addEventListener('click', function (e) {
        var del = e.target.closest('[data-delete-version]');
        if (del) { pendingDeleteVersionId = del.getAttribute('data-delete-version'); document.getElementById('delete-version-name').textContent = del.getAttribute('data-version-name'); MM.openModal('delete-version-modal'); return; }
        var card = e.target.closest('[data-version-id]');
        if (!card) return;
        loadVersionDraft(card.getAttribute('data-version-id'));
        renderGeneralTab();
        updateURL();
      });
      document.getElementById('gc-new-version-btn').addEventListener('click', function () {
        loadVersionDraft(null);
        renderGeneralTab();
        MM.showToast('Blank version — fill in the details and Save to create it.');
      });
      document.getElementById('gc-property-type-strip').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-ptype]');
        if (!btn) return;
        versionDraft.property_type = btn.getAttribute('data-ptype');
        document.querySelectorAll('#gc-property-type-strip .gc-option-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      });
      document.getElementById('gc-general-body').addEventListener('input', function () {
        versionDraft.body[state.lang] = this.value;
        updateGeneralPreview();
      });
      document.getElementById('gc-cancel-btn').addEventListener('click', function () {
        loadVersionDraft(state.generalVersionId);
        renderGeneralTab();
      });
      document.getElementById('gc-save-general-btn').addEventListener('click', saveGeneral);
    }

    function updateGeneralPreview() {
      document.getElementById('gc-general-preview').innerHTML = substitutePreview((versionDraft.body || {})[state.lang]);
    }

    function saveGeneral() {
      versionDraft.name = document.getElementById('gc-version-name').value.trim();
      versionDraft.internal_note = document.getElementById('gc-version-note').value.trim();
      versionDraft.body[state.lang] = document.getElementById('gc-general-body').value;

      var nameGroup = document.getElementById('gc-version-name').closest('.form-group');
      var valid = true;
      if (!versionDraft.name) { nameGroup.classList.add('has-error'); nameGroup.querySelector('.form-error').textContent = 'Version name is required.'; valid = false; }
      else { nameGroup.classList.remove('has-error'); nameGroup.querySelector('.form-error').textContent = ''; }
      if (!versionDraft.property_type) { MM.showToast('Property type is required.', { danger: true }); valid = false; }
      if (!valid) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var btn = document.getElementById('gc-save-general-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        var list = versionsStore[state.country] || (versionsStore[state.country] = []);
        if (versionDraft.id) {
          var existing = list.filter(function (v) { return v.id === versionDraft.id; })[0];
          Object.assign(existing, { name: versionDraft.name, internal_note: versionDraft.internal_note, property_type: versionDraft.property_type, body: versionDraft.body });
        } else {
          versionDraft.id = MM.uid('GCV');
          list.push(Object.assign({}, versionDraft));
        }
        writeStore(VERSIONS_KEY, versionsStore);
        state.generalVersionId = versionDraft.id;
        MM.showToast('General content saved.');
        renderNavTabs();
        renderGeneralTab();
        updateURL();
      });
    }

    /* ---------- Section tab ---------- */
    function loadSectionDraft() {
      sectionDraft = { key: state.sectionKey, lang: state.lang, text: sectionsStore[sectionKeyFor(state.sectionKey)] || '', dirty: false };
    }

    function renderSectionTab() {
      loadSectionDraft();
      var isDepositGroup = state.sectionKey === 'deposit_no_deposit' || state.sectionKey === 'deposit';
      var meta = SECTION_META[state.sectionKey];
      var body = document.getElementById('gc-body');
      body.innerHTML =
        '<div class="gc-layout gc-layout-2col">' +
          '<div class="card"><div class="card__body">' +
            (isDepositGroup ?
              '<div class="gc-option-strip" id="gc-deposit-strip">' +
                '<button type="button" class="gc-option-btn' + (state.sectionKey === 'deposit_no_deposit' ? ' active' : '') + '" data-section-option="deposit_no_deposit">No Deposit</button>' +
                '<button type="button" class="gc-option-btn' + (state.sectionKey === 'deposit' ? ' active' : '') + '" data-section-option="deposit">Deposit</button>' +
              '</div>' : '') +
            '<label style="font-size:var(--font-size-xs);font-weight:700;color:var(--color-gray-700);text-transform:uppercase;letter-spacing:.03em;">' + meta.label + ' — Clause Content</label>' +
            (meta.vars.length ? '<div class="gc-vars" id="gc-section-vars">' + meta.vars.map(function (v) { return '<span class="gc-var-tag" data-insert-var="' + v + '">' + v + '</span>'; }).join('') + '</div>' : '') +
            '<textarea id="gc-section-body" class="gc-rich-text-editor" rows="12" style="margin-top:8px;"></textarea>' +
            '<div class="cms-form-footer"><button type="button" class="btn btn-primary" id="gc-save-section-btn">Save</button></div>' +
          '</div></div>' +
          '<div class="gc-preview-panel"><h4>Preview — ' + state.lang.toUpperCase() + '</h4><div class="gc-preview-body" id="gc-section-preview"></div></div>' +
        '</div>';

      var textarea = document.getElementById('gc-section-body');
      textarea.value = sectionDraft.text;
      updateSectionPreview();

      if (isDepositGroup) {
        document.getElementById('gc-deposit-strip').addEventListener('click', function (e) {
          var btn = e.target.closest('[data-section-option]');
          if (!btn) return;
          autoSaveSectionIfDirty();
          state.sectionKey = btn.getAttribute('data-section-option');
          renderAll();
        });
      }
      var varsEl = document.getElementById('gc-section-vars');
      if (varsEl) varsEl.addEventListener('click', function (e) {
        var tag = e.target.closest('[data-insert-var]');
        if (!tag) return;
        insertAtCursor(textarea, tag.getAttribute('data-insert-var'));
        sectionDraft.text = textarea.value;
        sectionDraft.dirty = true;
        updateSectionPreview();
      });
      textarea.addEventListener('input', function () {
        sectionDraft.text = this.value;
        sectionDraft.dirty = true;
        updateSectionPreview();
      });
      document.getElementById('gc-save-section-btn').addEventListener('click', saveSection);
    }

    function updateSectionPreview() { document.getElementById('gc-section-preview').innerHTML = substitutePreview(sectionDraft.text); }

    function saveSection() {
      var btn = document.getElementById('gc-save-section-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        sectionsStore[sectionKeyFor(state.sectionKey)] = sectionDraft.text;
        writeStore(SECTIONS_KEY, sectionsStore);
        sectionDraft.dirty = false;
        MM.showToast('Section content saved.');
        renderNavTabs();
      });
    }
    function autoSaveSectionIfDirty() {
      if (sectionDraft.dirty) { sectionsStore[sectionKeyFor(sectionDraft.key)] = sectionDraft.text; writeStore(SECTIONS_KEY, sectionsStore); sectionDraft.dirty = false; }
    }

    /* ---------- Electricity tab ---------- */
    function loadElectricityDraft() {
      electricityDraft = { type: state.paymentType, lang: state.lang, text: electricityStore[elecKeyFor(state.paymentType)] || '', dirty: false };
    }

    function renderElectricityTab() {
      loadElectricityDraft();
      var typeMeta = ELECTRICITY_TYPES.filter(function (t) { return t.key === state.paymentType; })[0];
      var body = document.getElementById('gc-body');
      body.innerHTML =
        '<div class="gc-layout gc-layout-2col">' +
          '<div class="card"><div class="card__body">' +
            '<div class="gc-option-strip" id="gc-elec-strip">' +
              ELECTRICITY_TYPES.map(function (t) { return '<button type="button" class="gc-option-btn' + (t.key === state.paymentType ? ' active' : '') + '" data-elec-option="' + t.key + '">' + t.label + '</button>'; }).join('') +
            '</div>' +
            '<p class="form-hint" style="margin-bottom:10px;">' + typeMeta.note + '</p>' +
            (typeMeta.vars.length ? '<div class="gc-vars" id="gc-elec-vars">' + typeMeta.vars.map(function (v) { return '<span class="gc-var-tag" data-insert-var="' + v + '">' + v + '</span>'; }).join('') + '</div>' : '') +
            '<label style="font-size:var(--font-size-xs);font-weight:700;color:var(--color-gray-700);text-transform:uppercase;letter-spacing:.03em;">Clause Content</label>' +
            '<textarea id="gc-elec-body" class="gc-rich-text-editor" rows="12" style="margin-top:8px;"></textarea>' +
            '<div class="cms-form-footer"><button type="button" class="btn btn-primary" id="gc-save-elec-btn">Save</button></div>' +
          '</div></div>' +
          '<div class="gc-preview-panel"><h4>Preview — ' + state.lang.toUpperCase() + '</h4><div class="gc-preview-body" id="gc-elec-preview"></div></div>' +
        '</div>';

      var textarea = document.getElementById('gc-elec-body');
      textarea.value = electricityDraft.text;
      updateElecPreview();

      document.getElementById('gc-elec-strip').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-elec-option]');
        if (!btn) return;
        autoSaveElecIfDirty();
        state.paymentType = btn.getAttribute('data-elec-option');
        renderAll();
      });
      var varsEl = document.getElementById('gc-elec-vars');
      if (varsEl) varsEl.addEventListener('click', function (e) {
        var tag = e.target.closest('[data-insert-var]');
        if (!tag) return;
        insertAtCursor(textarea, tag.getAttribute('data-insert-var'));
        electricityDraft.text = textarea.value;
        electricityDraft.dirty = true;
        updateElecPreview();
      });
      textarea.addEventListener('input', function () {
        electricityDraft.text = this.value;
        electricityDraft.dirty = true;
        updateElecPreview();
      });
      document.getElementById('gc-save-elec-btn').addEventListener('click', saveElectricity);
    }

    function updateElecPreview() { document.getElementById('gc-elec-preview').innerHTML = substitutePreview(electricityDraft.text); }

    function saveElectricity() {
      var btn = document.getElementById('gc-save-elec-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        electricityStore[elecKeyFor(state.paymentType)] = electricityDraft.text;
        writeStore(ELECTRICITY_KEY, electricityStore);
        electricityDraft.dirty = false;
        MM.showToast('Electricity clause saved.');
        renderNavTabs();
      });
    }
    function autoSaveElecIfDirty() {
      if (electricityDraft.dirty) { electricityStore[elecKeyFor(electricityDraft.type)] = electricityDraft.text; writeStore(ELECTRICITY_KEY, electricityStore); electricityDraft.dirty = false; }
    }

    function insertAtCursor(textarea, text) {
      var start = textarea.selectionStart, end = textarea.selectionEnd;
      var value = textarea.value;
      textarea.value = value.slice(0, start) + text + value.slice(end);
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    }

    /* ---------- Master render ---------- */
    function renderAll() {
      renderCountrySelect();
      renderNavTabs();
      renderLangTabs();
      if (state.tab === 'general') renderGeneralTab();
      else if (state.tab === 'electricity') renderElectricityTab();
      else renderSectionTab();
      updateURL();
    }

    document.getElementById('gc-country').addEventListener('change', function () {
      state.country = this.value;
      state.lang = 'en';
      state.tab = 'general';
      state.generalVersionId = null;
      versionDraft = null;
      renderAll();
    });

    document.getElementById('gc-nav-tabs').addEventListener('click', function (e) {
      var item = e.target.closest('[data-nav]');
      if (!item) return;
      if (state.tab === 'section') autoSaveSectionIfDirty();
      if (state.tab === 'electricity') autoSaveElecIfDirty();
      var navId = item.getAttribute('data-nav');
      var nav = NAV_ITEMS.filter(function (n) { return n.id === navId; })[0];
      state.tab = nav.tab;
      if (nav.tab === 'section') state.sectionKey = nav.sectionKey === 'deposit' ? 'deposit_no_deposit' : nav.sectionKey;
      renderAll();
    });

    document.getElementById('gc-lang-tabs').addEventListener('click', function (e) {
      var tab = e.target.closest('[data-lang]');
      if (!tab) return;
      if (state.tab === 'general' && versionDraft) { versionDraft.body[state.lang] = document.getElementById('gc-general-body').value; }
      if (state.tab === 'section') autoSaveSectionIfDirty();
      if (state.tab === 'electricity') autoSaveElecIfDirty();
      state.lang = tab.getAttribute('data-lang');
      renderAll();
    });

    document.getElementById('confirm-delete-version-btn').addEventListener('click', function () {
      if (!pendingDeleteVersionId) return;
      versionsStore[state.country] = (versionsStore[state.country] || []).filter(function (v) { return v.id !== pendingDeleteVersionId; });
      writeStore(VERSIONS_KEY, versionsStore);
      if (state.generalVersionId === pendingDeleteVersionId) { state.generalVersionId = null; versionDraft = null; }
      pendingDeleteVersionId = null;
      MM.closeModal('delete-version-modal');
      MM.showToast('Version deleted.');
      renderAll();
    });

    renderAll();
  });
})();
