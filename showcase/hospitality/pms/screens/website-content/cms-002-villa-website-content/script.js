(function () {
  'use strict';

  var STORE_KEY = 'mm_cms_villa_content_edits';
  var SEO_PAGES = ['Home', 'Welcome', 'Why Here', 'Daily Life', 'Comfort'];

  function getEdits() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveEdit(villaId, tab, data) {
    var all = getEdits();
    all[villaId] = all[villaId] || {};
    all[villaId][tab] = data;
    all[villaId]._updatedAt = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  }

  function getVillaId() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('villa');
    var openVillas = (MM.MOCK_PROPERTIES || []).filter(function (p) { return p.status === 'active'; });
    if (id && openVillas.some(function (v) { return v.id === id; })) return id;
    return openVillas.length ? openVillas[0].id : null;
  }

  function fieldsOf(form) {
    var out = {};
    form.querySelectorAll('[data-field]').forEach(function (el) {
      if (el.type === 'checkbox') out[el.dataset.field] = el.checked;
      else out[el.dataset.field] = el.value;
    });
    return out;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var villaId = getVillaId();
    var villas = (MM.MOCK_PROPERTIES || []).filter(function (p) { return p.status === 'active'; });
    var villa = villas.filter(function (v) { return v.id === villaId; })[0];
    if (!villa) return;

    var content = (MM.CMS.VILLA_CONTENT && MM.CMS.VILLA_CONTENT[villaId]) || { status: 'draft', lang: [], updatedAt: '—', updatedBy: '—' };
    var edits = getEdits()[villaId] || {};

    document.getElementById('breadcrumb-villa').textContent = villa.name;
    document.getElementById('villa-title').textContent = villa.name + ' — Web Page';
    document.getElementById('villa-subtitle').textContent = villa.bu + ' · ' + villa.bedrooms + ' bedrooms · ' + villa.id;
    var statusBadge = document.getElementById('villa-status-badge');
    statusBadge.textContent = MM.CMS.STATUS_LABEL[content.status] || content.status;
    statusBadge.className = 'badge ' + (MM.CMS.STATUS_BADGE[content.status] || 'badge-neutral');
    document.getElementById('villa-lang-list').textContent = (content.lang && content.lang.length) ? content.lang.join(', ') : 'None yet';
    document.getElementById('villa-updated').textContent = (edits._updatedAt || content.updatedAt || '—') + (content.updatedBy ? ' by ' + content.updatedBy : '');

    // Villa switcher
    var switcher = document.getElementById('villa-switcher');
    villas.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v.id; opt.textContent = v.name;
      if (v.id === villaId) opt.selected = true;
      switcher.appendChild(opt);
    });
    switcher.addEventListener('change', function () {
      window.location.href = 'index.html?villa=' + switcher.value;
    });

    // Bedroom description rows (Comfort tab), count = villa.bedrooms
    var bedroomWrap = document.getElementById('bedroom-rows');
    var savedBedrooms = (edits.comfort && edits.comfort.bedroomLines) || [];
    for (var i = 0; i < villa.bedrooms; i++) {
      var row = document.createElement('input');
      row.type = 'text';
      row.dataset.field = 'bedroomLine' + i;
      row.placeholder = 'Bedroom ' + (i + 1) + ' description';
      row.style.marginBottom = '8px';
      row.value = savedBedrooms[i] || '';
      bedroomWrap.appendChild(row);
    }

    // Menu tab dropdowns — link to shared CMS content blocks
    function fillSelect(selectEl, items, labelFn) {
      var placeholder = document.createElement('option');
      placeholder.value = ''; placeholder.textContent = 'None linked';
      selectEl.appendChild(placeholder);
      items.forEach(function (item) {
        var opt = document.createElement('option');
        opt.value = item.id; opt.textContent = labelFn(item);
        selectEl.appendChild(opt);
      });
    }
    var menuForm = document.querySelector('[data-tab-form="menu"]');
    fillSelect(menuForm.querySelector('[data-field="whyUsId"]'), MM.CMS.WHY_US, function (i) { return i.title; });
    fillSelect(menuForm.querySelector('[data-field="conciergeId"]'), MM.CMS.CONCIERGES, function (i) { return i.title; });
    fillSelect(menuForm.querySelector('[data-field="destinationId"]'), MM.CMS.DESTINATIONS, function (i) { return i.name; });
    fillSelect(menuForm.querySelector('[data-field="contactId"]'), MM.CMS.CONTACT_FORMS, function (i) { return i.name; });
    fillSelect(menuForm.querySelector('[data-field="arrivalId"]'), MM.CMS.ARRIVALS, function (i) { return i.title; });
    if (edits.menu) Object.keys(edits.menu).forEach(function (k) {
      var el = menuForm.querySelector('[data-field="' + k + '"]');
      if (el) el.value = edits.menu[k];
    });

    // Services checklist — this villa's services from CMS-003
    var svcWrap = document.getElementById('services-checklist');
    var villaServices = (MM.CMS.SERVICES || []).filter(function (s) { return s.villaId === villaId; });
    if (!villaServices.length) {
      svcWrap.innerHTML = '<p class="text-sm text-muted">No services configured for this villa yet. <a href="../cms-003-services-list/index.html">Add one in Services &rarr;</a></p>';
    } else {
      var checkedIds = (edits.services && edits.services.checked) || villaServices.filter(function (s) { return s.status === 'active'; }).map(function (s) { return s.id; });
      villaServices.forEach(function (s) {
        var label = document.createElement('label');
        label.innerHTML = '<input type="checkbox" data-service-id="' + s.id + '" ' + (checkedIds.indexOf(s.id) !== -1 ? 'checked' : '') + '> ' + s.name + ' <span class="badge badge-neutral" style="margin-left:auto;">$' + s.price + '</span>';
        svcWrap.appendChild(label);
      });
    }

    // SEO page metadata groups
    var seoWrap = document.getElementById('seo-page-groups');
    SEO_PAGES.forEach(function (page, idx) {
      var slug = 'seo' + idx;
      var group = document.createElement('div');
      group.className = 'seo-page-group';
      group.innerHTML =
        '<div class="seo-page-group__title">' + page + ' page</div>' +
        '<div class="form-grid">' +
          '<div class="form-group full"><label>SEO title <span class="req">*</span></label><input type="text" data-field="' + slug + 'Title" required><span class="form-error"></span></div>' +
          '<div class="form-group full"><label>SEO description <span class="req">*</span></label><textarea data-field="' + slug + 'Description" required></textarea><span class="form-error"></span></div>' +
          '<div class="form-group full"><label>SEO keywords <span class="req">*</span></label><input type="text" data-field="' + slug + 'Keywords" required><span class="form-error"></span></div>' +
        '</div>';
      seoWrap.appendChild(group);
    });

    // Pre-fill saved edits for each tab
    document.querySelectorAll('[data-tab-form]').forEach(function (form) {
      var tabKey = form.dataset.tabForm;
      var saved = edits[tabKey];
      if (saved) {
        Object.keys(saved).forEach(function (k) {
          var el = form.querySelector('[data-field="' + k + '"]');
          if (!el) return;
          if (el.type === 'checkbox') el.checked = !!saved[k];
          else el.value = saved[k];
        });
      }
      MM.bindFormValidation(form);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!MM.validateForm(form)) { MM.showToast('Please fill in the required fields before saving.', { danger: true }); return; }
        var data = fieldsOf(form);
        if (tabKey === 'comfort') {
          data.bedroomLines = [];
          for (var i = 0; i < villa.bedrooms; i++) data.bedroomLines.push(data['bedroomLine' + i] || '');
        }
        if (tabKey === 'services') {
          data.checked = Array.prototype.slice.call(svcWrap.querySelectorAll('input:checked')).map(function (cb) { return cb.dataset.serviceId; });
        }
        var btn = form.querySelector('button[type="submit"]');
        MM.simulateSave(btn, 'Saving...', function () {
          saveEdit(villaId, tabKey, data);
          document.getElementById('villa-updated').textContent = new Date().toISOString().slice(0, 10) + ' by Daniel Tan';
          if (content.status === 'draft') {
            statusBadge.textContent = 'Needs Review';
            statusBadge.className = 'badge badge-warning';
          }
          MM.showToast('Saved the ' + form.closest('[data-tab-panel]').getAttribute('data-tab-panel').replace('-', ' ') + ' tab.');
        });
      });
    });
  });
})();
