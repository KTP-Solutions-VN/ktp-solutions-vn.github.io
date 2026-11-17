(function () {
  'use strict';
  var PROPS = MM.MOCK_PROPERTIES;
  var VSV = MM.VSV;
  var CHANNELS = ['Direct', 'Booking.com', 'Airbnb', 'Agoda'];
  var VILLA_TYPES = { 'PV-101': 'Pool Villa', 'PV-102': 'Beachfront Villa', 'PV-103': 'Hillside Villa', 'PV-104': 'Garden Villa', 'PV-105': 'Pool Villa', 'PV-106': 'Beachfront Villa', 'PV-107': 'Garden Villa', 'PV-108': 'Hillside Villa' };
  var AREAS = { 'PV-101': 'Kamala', 'PV-102': 'Bang Tao', 'PV-103': 'Seminyak', 'PV-104': 'Ubud', 'PV-105': 'Kata', 'PV-106': 'Bophut', 'PV-107': 'Choeng Mon', 'PV-108': 'Canggu' };

  var MGMT_KEY = 'mm_vsv_electricity_mgmt';
  var PRICING_KEY = 'mm_vsv_electricity_pricing';

  function ownerFor(villaId) {
    var owner = (MM.MOCK_OWNERS || []).find(function (o) { return o.properties.indexOf(villaId) > -1; });
    return owner ? owner.name : 'Unassigned';
  }

  function loadMgmt() { try { return JSON.parse(localStorage.getItem(MGMT_KEY)) || {}; } catch (e) { return {}; } }
  function saveMgmt(map) { localStorage.setItem(MGMT_KEY, JSON.stringify(map)); }
  function loadPricing() { try { return JSON.parse(localStorage.getItem(PRICING_KEY)) || {}; } catch (e) { return {}; } }
  function savePricing(map) { localStorage.setItem(PRICING_KEY, JSON.stringify(map)); }

  function isManaged(villaId) {
    var overrides = loadMgmt();
    if (Object.prototype.hasOwnProperty.call(overrides, villaId)) return overrides[villaId];
    var cfg = VSV.ELECTRICITY[villaId];
    return cfg ? cfg.managed : false;
  }

  function currentFilter() {
    return { bu: document.getElementById('f-bu').value, villa: document.getElementById('f-villa').value };
  }

  function filteredProps() {
    var f = currentFilter();
    return PROPS.filter(function (p) {
      if (f.bu && p.bu !== f.bu) return false;
      if (f.villa && p.id !== f.villa) return false;
      return true;
    });
  }

  function populateFilters() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) {
      var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o);
    });
    var villaSel = document.getElementById('f-villa');
    PROPS.forEach(function (p) {
      var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; villaSel.appendChild(o);
    });
    buSel.addEventListener('change', renderAll);
    villaSel.addEventListener('change', renderAll);
  }

  function renderManagement() {
    var tbody = document.getElementById('mgmt-tbody');
    var rows = filteredProps();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state" style="padding:24px;"><p>No properties match the current filter.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (p) {
      var managed = isManaged(p.id);
      return '<tr>' +
        '<td class="cell-strong">' + p.name + '</td>' +
        '<td><span class="badge ' + (p.status === 'active' ? 'badge-success' : 'badge-warning') + '">' + p.status + '</span></td>' +
        '<td>' + VILLA_TYPES[p.id] + '</td>' +
        '<td>' + ownerFor(p.id) + '</td>' +
        '<td>' + AREAS[p.id] + '</td>' +
        '<td style="text-align:right;"><label class="switch"><input type="checkbox" data-mgmt-toggle="' + p.id + '" ' + (managed ? 'checked' : '') + '><span class="switch-slider"></span></label></td>' +
        '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-mgmt-toggle]').forEach(function (input) {
      input.addEventListener('change', function () {
        var map = loadMgmt();
        map[input.getAttribute('data-mgmt-toggle')] = input.checked;
        saveMgmt(map);
        MM.showToast(input.checked ? 'Electricity management enabled' : 'Electricity management disabled');
      });
    });
  }

  function pricingKey(villaId, channel) { return villaId + '::' + channel; }

  function pricingFor(villaId, channel) {
    var map = loadPricing();
    var k = pricingKey(villaId, channel);
    if (map[k]) return map[k];
    if (channel === 'Direct') {
      var cfg = VSV.ELECTRICITY[villaId];
      if (cfg && cfg.managed && cfg.method) return cfg;
    }
    return null;
  }

  function renderPricing() {
    var tbody = document.getElementById('pricing-tbody');
    var rows = filteredProps();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state" style="padding:24px;"><p>No properties match the current filter.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function (p) {
      var cells = CHANNELS.map(function (ch) {
        var cfg = pricingFor(p.id, ch);
        var inner = cfg ? '<span class="badge badge-info">' + (VSV.METHOD_LABELS[cfg.method] || cfg.method) + '</span>' : '<span class="not-set">Not set</span>';
        return '<td class="pricing-cell" data-villa="' + p.id + '" data-channel="' + ch + '">' + inner + '</td>';
      }).join('');
      return '<tr><td class="cell-strong">' + p.name + '</td>' + cells + '</tr>';
    }).join('');
    tbody.querySelectorAll('.pricing-cell').forEach(function (cell) {
      cell.addEventListener('click', function () { openPricingModal(cell.getAttribute('data-villa'), cell.getAttribute('data-channel')); });
    });
  }

  function renderAll() { renderManagement(); renderPricing(); }

  /* ---------------- Pricing modal ---------------- */
  var typeFieldMap = {
    'Collect-Fixed': ['pf-amount-group'],
    'Platform-Separate': ['pf-amount-group'],
    'Platform-Rental': ['pf-amount-group'],
    'Collect-Quota': ['pf-quota-group', 'pf-above-group'],
    'Collect-kWh': ['pf-kwh-group'],
    'Combined-Separate': ['pf-included-group', 'pf-kwh-group'],
    'Combined-Rental': ['pf-included-group', 'pf-kwh-group']
  };
  var allFieldGroups = ['pf-amount-group', 'pf-quota-group', 'pf-above-group', 'pf-kwh-group', 'pf-included-group'];

  function updateVisibleFields() {
    var type = document.getElementById('pf-type').value;
    var show = typeFieldMap[type] || [];
    allFieldGroups.forEach(function (id) {
      var group = document.getElementById(id);
      var required = show.indexOf(id) > -1;
      group.hidden = !required;
      var input = group.querySelector('input');
      if (input) { if (required) input.setAttribute('required', 'required'); else input.removeAttribute('required'); }
    });
  }

  var currentVilla = null, currentChannel = null;

  function openPricingModal(villaId, channel) {
    currentVilla = villaId; currentChannel = channel;
    var prop = VSV.propertyById(villaId);
    document.getElementById('pm-title').textContent = 'Edit Pricing';
    document.getElementById('pm-subtitle').textContent = prop.name + ' × ' + channel;
    var cfg = pricingFor(villaId, channel) || {};
    document.getElementById('pf-type').value = cfg.method || '';
    document.getElementById('pf-amount').value = cfg.amount || cfg.fixedAmount || '';
    document.getElementById('pf-quota').value = cfg.freeQuota || '';
    document.getElementById('pf-above').value = cfg.costAboveQuota || '';
    document.getElementById('pf-kwh').value = cfg.costPerKwh || '';
    document.getElementById('pf-included').value = cfg.includedQuotaKwh || '';
    updateVisibleFields();
    document.getElementById('pricing-form').querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('pricing-modal');
  }

  document.getElementById('pf-type').addEventListener('change', updateVisibleFields);

  document.getElementById('pricing-save-btn').addEventListener('click', function () {
    var form = document.getElementById('pricing-form');
    if (!MM.validateForm(form)) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var map = loadPricing();
      var entry = { method: document.getElementById('pf-type').value };
      if (!document.getElementById('pf-amount-group').hidden) entry.amount = Number(document.getElementById('pf-amount').value);
      if (!document.getElementById('pf-quota-group').hidden) entry.freeQuota = Number(document.getElementById('pf-quota').value);
      if (!document.getElementById('pf-above-group').hidden) entry.costAboveQuota = Number(document.getElementById('pf-above').value);
      if (!document.getElementById('pf-kwh-group').hidden) entry.costPerKwh = Number(document.getElementById('pf-kwh').value);
      if (!document.getElementById('pf-included-group').hidden) entry.includedQuotaKwh = Number(document.getElementById('pf-included').value);
      map[pricingKey(currentVilla, currentChannel)] = entry;
      savePricing(map);
      MM.closeModal('pricing-modal');
      MM.showToast('Pricing saved for ' + currentChannel);
      renderPricing();
    });
  });

  populateFilters();
  renderAll();
})();
