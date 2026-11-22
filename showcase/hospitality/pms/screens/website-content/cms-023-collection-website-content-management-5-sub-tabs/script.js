(function () {
  'use strict';
  var STORAGE_KEY = 'mm_cms_collection_content';

  var COLLECTIONS = {
    'GCW-01': 'Coral Beachfront Collection',
    'GCW-02': 'Byron Hinterland Retreats',
    'GCW-03': 'Family-Friendly Villas',
    'GCW-04': 'Wedding & Celebration Villas',
    'GCW-05': 'Pet-Friendly Escapes'
  };

  var IWISH_MASTER = [
    { id: 'IW-01', title: 'Beach' }, { id: 'IW-02', title: 'Golf' }, { id: 'IW-03', title: 'Spa & Wellness' },
    { id: 'IW-04', title: 'Family Fun' }, { id: 'IW-05', title: 'Adventure' }, { id: 'IW-06', title: 'Romance' }
  ];

  var REGIONS = {
    'Sentosa Collection': ['Villa Sapphire Cliff', 'Villa Coral Horizon', 'Villa Marble Cove'],
    'Byron Bay Retreats': ['Villa Emerald Bay', 'Villa Azure Ridge', 'Villa Silver Tide'],
    'Noosa Estates': ['Villa Lotus Terrace', 'Villa Golden Palm']
  };

  var INSIGHTS_MOCK = [
    { id: 'GI-01', title: 'A Guide to Sentosa’s Hidden Beaches', type: 'Local Culture' },
    { id: 'GI-02', title: 'Best Beachside Dining in Byron Bay', type: 'Dining Guide' },
    { id: 'GI-03', title: 'Family Activities in Noosa', type: 'Family Activities' }
  ];

  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function getParam(name) { return new URLSearchParams(window.location.search).get(name); }

  var websiteId = getParam('id') || 'GCW-01';
  var allData = readJSON(STORAGE_KEY, {});
  var data = allData[websiteId] = allData[websiteId] || {
    iwish: { 'IW-01': true, 'IW-02': false, 'IW-03': true, 'IW-04': false, 'IW-05': false, 'IW-06': true },
    properties: {},
    insights: INSIGHTS_MOCK.slice(),
    idcard: { languages: ['en'], contact: '+65 6655 5010', email: 'collection@azurastays.example' },
    footerLinks: [{ name: 'Instagram', url: 'https://instagram.com/azurastays' }],
    facebook: '', instagram: ''
  };

  function persist() { allData[websiteId] = data; writeJSON(STORAGE_KEY, allData); }

  function renderIWish() {
    var body = document.getElementById('iwish-body');
    body.innerHTML = IWISH_MASTER.map(function (w, i) {
      var on = !!data.iwish[w.id];
      return '<tr><td class="cell-num">' + (i + 1) + '</td><td class="cell-strong">' + w.title + '</td>' +
        '<td><button class="iwish-toggle ' + (on ? 'on' : '') + '" data-iwish="' + w.id + '" aria-label="Toggle ' + w.title + '"></button></td></tr>';
    }).join('');
    body.querySelectorAll('[data-iwish]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-iwish');
        data.iwish[id] = !data.iwish[id];
        persist();
        renderIWish();
        renderProperties();
        MM.showToast(data.iwish[id] ? 'Wishlist category enabled.' : 'Wishlist category disabled.');
      });
    });
  }

  function renderProperties() {
    var enabled = IWISH_MASTER.filter(function (w) { return data.iwish[w.id]; });
    var wrap = document.getElementById('properties-groups');
    var hint = document.getElementById('properties-empty-hint');
    if (!enabled.length) { wrap.innerHTML = ''; hint.hidden = false; return; }
    hint.hidden = true;
    wrap.innerHTML = enabled.map(function (w) {
      return '<h3 style="margin:14px 0 8px;">' + w.title + '</h3>' + Object.keys(REGIONS).map(function (region) {
        return '<div class="region-group"><div class="region-group__header">' + region + '</div><div class="region-group__villas">' +
          REGIONS[region].map(function (v) {
            var key = w.id + '::' + v;
            var checked = data.properties[key];
            return '<label><input type="checkbox" data-prop="' + key + '" ' + (checked ? 'checked' : '') + '> ' + v + '</label>';
          }).join('') + '</div></div>';
      }).join('');
    }).join('');
  }

  function renderInsights() {
    var body = document.getElementById('insights-body');
    body.innerHTML = data.insights.map(function (ins, i) {
      return '<tr><td class="cell-num">' + (i + 1) + '</td><td class="cell-strong">' + ins.title + '</td>' +
        '<td><select data-insight-type="' + ins.id + '">' +
          ['Local Culture', 'Dining Guide', 'Family Activities', 'Wellness & Spa'].map(function (t) {
            return '<option ' + (t === ins.type ? 'selected' : '') + '>' + t + '</option>';
          }).join('') +
        '</select></td>' +
        '<td><button class="btn btn-ghost btn-sm" data-delete-insight="' + ins.id + '" data-name="' + ins.title + '">Delete</button></td></tr>';
    }).join('');
    body.querySelectorAll('[data-insight-type]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var id = sel.getAttribute('data-insight-type');
        var ins = data.insights.find(function (x) { return x.id === id; });
        if (ins) { ins.type = sel.value; persist(); MM.showToast('Article type updated.'); }
      });
    });
    var pendingDeleteId = null;
    body.querySelectorAll('[data-delete-insight]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pendingDeleteId = btn.getAttribute('data-delete-insight');
        document.getElementById('delete-insight-name').textContent = btn.getAttribute('data-name');
        document.getElementById('confirm-delete-insight-btn').setAttribute('data-pending', pendingDeleteId);
        MM.openModal('delete-insight-modal');
      });
    });
  }

  function renderFooterLinks() {
    var wrap = document.getElementById('footer-links');
    wrap.innerHTML = data.footerLinks.map(function (link, i) {
      return '<div class="footer-link-row" data-link-row="' + i + '">' +
        '<div class="form-group"><label>Display Name</label><input type="text" class="link-name" value="' + (link.name || '').replace(/"/g, '&quot;') + '"></div>' +
        '<div class="form-group"><label>Url</label><input type="url" class="link-url" value="' + (link.url || '').replace(/"/g, '&quot;') + '"></div>' +
        (data.footerLinks.length > 1 ? '<button type="button" class="image-row__remove" data-remove-link="' + i + '">&times;</button>' : '') +
      '</div>';
    }).join('');
    wrap.querySelectorAll('[data-remove-link]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        data.footerLinks.splice(parseInt(btn.getAttribute('data-remove-link'), 10), 1);
        renderFooterLinks();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('page-website-name').textContent = COLLECTIONS[websiteId] || 'Themed Site Content';
    document.getElementById('page-title').textContent = COLLECTIONS[websiteId] || 'Themed Site Content';

    renderIWish();
    renderProperties();
    renderInsights();
    renderFooterLinks();
    document.getElementById('footer-facebook').value = data.facebook || '';
    document.getElementById('footer-instagram').value = data.instagram || '';
    document.getElementById('idcard-contact').value = data.idcard.contact || '';
    document.getElementById('idcard-email').value = data.idcard.email || '';
    ['en', 'fr', 'de', 'th'].forEach(function (l) {
      document.getElementById('lang-' + l).checked = data.idcard.languages.indexOf(l) !== -1;
    });

    document.getElementById('properties-save-btn').addEventListener('click', function (e) {
      MM.simulateSave(e.currentTarget, 'Saving...', function () {
        document.querySelectorAll('[data-prop]').forEach(function (cb) { data.properties[cb.getAttribute('data-prop')] = cb.checked; });
        persist();
        MM.showToast('Property assignments saved.');
      });
    });
    document.getElementById('properties-reset-btn').addEventListener('click', function () { renderProperties(); MM.showToast('Reset to saved values.'); });

    document.getElementById('add-link-btn').addEventListener('click', function () {
      data.footerLinks.push({ name: '', url: '' });
      renderFooterLinks();
    });
    document.getElementById('footer-save-btn').addEventListener('click', function (e) {
      MM.simulateSave(e.currentTarget, 'Saving...', function () {
        data.footerLinks = Array.from(document.querySelectorAll('[data-link-row]')).map(function (row) {
          return { name: row.querySelector('.link-name').value, url: row.querySelector('.link-url').value };
        });
        persist();
        MM.showToast('Footer links saved.');
      });
    });
    document.getElementById('footer-content-save-btn').addEventListener('click', function (e) {
      MM.simulateSave(e.currentTarget, 'Saving...', function () {
        data.facebook = document.getElementById('footer-facebook').value;
        data.instagram = document.getElementById('footer-instagram').value;
        persist();
        MM.showToast('Footer content saved.');
      });
    });

    var idcardForm = document.getElementById('idcard-form');
    MM.bindFormValidation(idcardForm);
    document.getElementById('idcard-save-btn').addEventListener('click', function (e) {
      if (!MM.validateForm(idcardForm)) return;
      MM.simulateSave(e.currentTarget, 'Saving...', function () {
        data.idcard.contact = document.getElementById('idcard-contact').value;
        data.idcard.email = document.getElementById('idcard-email').value;
        data.idcard.languages = ['en', 'fr', 'de', 'th'].filter(function (l) { return document.getElementById('lang-' + l).checked; });
        persist();
        MM.showToast('ID card saved.');
      });
    });
    document.getElementById('idcard-reset-btn').addEventListener('click', function () {
      document.getElementById('idcard-contact').value = data.idcard.contact;
      document.getElementById('idcard-email').value = data.idcard.email;
    });

    var insightForm = document.getElementById('insight-form');
    MM.bindFormValidation(insightForm);
    document.getElementById('insight-save-btn').addEventListener('click', function (e) {
      if (!MM.validateForm(insightForm)) return;
      MM.simulateSave(e.currentTarget, 'Saving...', function () {
        data.insights.push({ id: MM.uid('GI'), title: document.getElementById('insight-title').value.trim(), type: document.getElementById('insight-type').value });
        persist();
        renderInsights();
        insightForm.reset();
        MM.closeModal('add-insight-modal');
        MM.showToast('Article added.');
      });
    });

    document.getElementById('confirm-delete-insight-btn').addEventListener('click', function (e) {
      var id = e.currentTarget.getAttribute('data-pending');
      MM.simulateSave(e.currentTarget, 'Deleting...', function () {
        data.insights = data.insights.filter(function (x) { return x.id !== id; });
        persist();
        renderInsights();
        MM.closeModal('delete-insight-modal');
        MM.showToast('Article deleted.');
      });
    });
  });
})();
