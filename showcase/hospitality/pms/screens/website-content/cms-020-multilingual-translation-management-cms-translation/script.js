(function () {
  'use strict';
  var STORAGE_KEY = 'mm_cms_translations';

  var KEYS = {
    'mini-website': ['hero_title', 'hero_subtitle', 'nav_properties', 'nav_contact', 'footer_copyright'],
    'guest-portal': ['welcome_message', 'checkin_instructions', 'wifi_label', 'concierge_label'],
    'owner-portal': [
      { page: 'Dashboard', key: 'dashboard_greeting' },
      { page: 'Dashboard', key: 'dashboard_revenue_label' },
      { page: 'Statements', key: 'statements_title' },
      { page: 'Statements', key: 'statements_empty' },
      { page: 'Bookings', key: 'bookings_title' }
    ],
    'azura-manager': [
      { page: 'Login', key: 'login_title' },
      { page: 'Login', key: 'login_subtitle' },
      { page: 'Dashboard', key: 'dashboard_greeting' },
      { page: 'Sidebar', key: 'sidebar_logout' }
    ]
  };

  var DEFAULTS = {
    en: {
      hero_title: 'Villas That Feel Like Home', hero_subtitle: 'Hand-picked luxury villas across Singapore and Australia.',
      nav_properties: 'Properties', nav_contact: 'Contact Us', footer_copyright: '© Azura Stays. All rights reserved.',
      welcome_message: 'Welcome back', checkin_instructions: 'Your check-in guide', wifi_label: 'Wi-Fi Details', concierge_label: 'Your Concierge',
      dashboard_greeting: 'Good morning', dashboard_revenue_label: 'Revenue this month', statements_title: 'Owner Statements', statements_empty: 'No statements yet', bookings_title: 'Upcoming Bookings',
      login_title: 'Sign in to Azura Manager', login_subtitle: 'Manage every villa from one place.', sidebar_logout: 'Logout'
    }
  };

  function readJSON(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; } }
  function writeJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function valueFor(lang, key) {
    var saved = readJSON(STORAGE_KEY, {});
    if (saved[lang] && saved[lang][key] !== undefined) return saved[lang][key];
    return (DEFAULTS.en[key] || '') + (lang !== 'en' ? ' (' + lang.toUpperCase() + ')' : '');
  }

  function labelize(key) { return key.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }

  function renderTab(tab, lang) {
    var list = KEYS[tab];
    if (tab === 'mini-website' || tab === 'guest-portal') {
      var wrap = document.getElementById('rows-' + tab);
      wrap.innerHTML = list.map(function (key) {
        return '<div class="form-group inline-row"><label>' + labelize(key) + '</label><input type="text" data-key="' + key + '" value="' + valueFor(lang, key).replace(/"/g, '&quot;') + '"></div>';
      }).join('');
    } else {
      var body = document.getElementById('rows-' + tab);
      body.innerHTML = list.map(function (row) {
        return '<tr><td class="cell-sub">' + row.page + '</td><td>' + labelize(row.key) + '</td><td><input type="text" data-key="' + row.key + '" value="' + valueFor(lang, row.key).replace(/"/g, '&quot;') + '" style="width:100%;border:1px solid var(--color-gray-300);border-radius:6px;padding:6px 8px;"></td></tr>';
      }).join('');
    }
  }

  function renderAll() {
    var lang = document.getElementById('language-select').value;
    Object.keys(KEYS).forEach(function (tab) { renderTab(tab, lang); });
  }

  function saveTab(tab) {
    var lang = document.getElementById('language-select').value;
    var saved = readJSON(STORAGE_KEY, {});
    saved[lang] = saved[lang] || {};
    document.querySelectorAll('[data-tab-panel="' + tab + '"] [data-key]').forEach(function (input) {
      saved[lang][input.getAttribute('data-key')] = input.value;
    });
    writeJSON(STORAGE_KEY, saved);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();

    document.getElementById('language-select').addEventListener('change', renderAll);

    document.querySelectorAll('[data-save-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-save-tab');
        MM.simulateSave(btn, 'Saving...', function () {
          saveTab(tab);
          MM.showToast('Translations saved for this tab.');
        });
      });
    });

    document.querySelectorAll('[data-reset-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-reset-tab');
        var lang = document.getElementById('language-select').value;
        var saved = readJSON(STORAGE_KEY, {});
        if (saved[lang]) {
          KEYS[tab].forEach(function (item) {
            var key = typeof item === 'string' ? item : item.key;
            delete saved[lang][key];
          });
          writeJSON(STORAGE_KEY, saved);
        }
        renderTab(tab, lang);
        MM.showToast('Reset to defaults.');
      });
    });
  });
})();
