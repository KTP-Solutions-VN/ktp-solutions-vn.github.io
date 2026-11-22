/* ==========================================================================
   Azura Manager PMS — Shared App Shell Behavior
   Loaded on every screen before the page's own script.js, exposing
   window.MM.* helpers. Mirrors the sibling CMS prototype's window.CM.*
   pattern for consistency across the two products.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Sidebar collapse/expand — persisted via localStorage             */
  /* ---------------------------------------------------------------- */

  var SIDEBAR_KEY = 'sidebar_collapsed';

  function applySidebarState() {
    var collapsed = localStorage.getItem(SIDEBAR_KEY) === '1';
    document.body.classList.toggle('sidebar-collapsed', collapsed);
  }

  function toggleSidebar() {
    var collapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
  }

  // Apply immediately (before DOMContentLoaded) to avoid a layout flash.
  applySidebarState();

  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('[data-sidebar-toggle]');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

    /* ------------------------------------------------------------ */
    /* Accordion nav groups                                          */
    /* ------------------------------------------------------------ */
    document.querySelectorAll('.nav-group__header').forEach(function (header) {
      header.addEventListener('click', function () {
        header.closest('.nav-group').classList.toggle('open');
      });
    });

    /* ------------------------------------------------------------ */
    /* Topbar user menu + generic popovers                           */
    /* ------------------------------------------------------------ */
    var userMenu = document.querySelector('[data-user-menu]');
    var userDropdown = document.querySelector('[data-user-dropdown]');
    if (userMenu && userDropdown) {
      userMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });
      document.addEventListener('click', function () { userDropdown.classList.remove('open'); });
    }

    document.querySelectorAll('[data-popover-trigger]').forEach(function (trigger) {
      var targetId = trigger.getAttribute('data-popover-trigger');
      var popover = document.getElementById(targetId);
      if (!popover) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.popover.open').forEach(function (p) { if (p !== popover) p.classList.remove('open'); });
        popover.classList.toggle('open');
      });
      document.addEventListener('click', function (e) { if (!popover.contains(e.target)) popover.classList.remove('open'); });
    });

    /* ------------------------------------------------------------ */
    /* Topbar shadow-on-scroll                                       */
    /* ------------------------------------------------------------ */
    var topbar = document.querySelector('.topbar');
    var scrollHost = document.querySelector('.page-content');
    if (topbar && scrollHost) {
      window.addEventListener('scroll', function () {
        topbar.classList.toggle('is-scrolled', window.scrollY > 4);
      });
    }

    /* ------------------------------------------------------------ */
    /* Settings vertical side-nav (tabs pattern)                     */
    /* ------------------------------------------------------------ */
    document.querySelectorAll('[data-settings-nav-item]').forEach(function (item) {
      item.addEventListener('click', function () {
        var group = item.closest('[data-settings-nav]');
        var target = item.getAttribute('data-settings-nav-item');
        group.querySelectorAll('[data-settings-nav-item]').forEach(function (i) { i.classList.toggle('active', i === item); });
        document.querySelectorAll('[data-settings-panel]').forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-settings-panel') !== target;
        });
      });
    });

    /* ------------------------------------------------------------ */
    /* Reset demo data                                                */
    /* ------------------------------------------------------------ */
    document.querySelectorAll('[data-reset-demo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var keys = (btn.getAttribute('data-reset-demo') || '').split(',').map(function (k) { return k.trim(); }).filter(Boolean);
        keys.forEach(function (k) { localStorage.removeItem(k); });
        window.location.reload();
      });
    });
  });

  /* ---------------------------------------------------------------- */
  /* Modal helpers                                                     */
  /* ---------------------------------------------------------------- */

  function openModal(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.dispatchEvent(new CustomEvent('mm:modal-open'));
  }

  function closeModal(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('open');
    if (!document.querySelector('.modal-overlay.open')) document.body.style.overflow = '';
    overlay.dispatchEvent(new CustomEvent('mm:modal-close'));
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(function (o) { o.classList.remove('open'); });
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
    var closeTrigger = e.target.closest('[data-close-modal]');
    if (closeTrigger) {
      var overlay = closeTrigger.closest('.modal-overlay');
      if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
    }
    var openTrigger = e.target.closest('[data-open-modal]');
    if (openTrigger) openModal(openTrigger.getAttribute('data-open-modal'));
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllModals(); });

  /* ---------------------------------------------------------------- */
  /* Toast notifications                                                */
  /* ---------------------------------------------------------------- */

  function showToast(message, opts) {
    opts = opts || {};
    var toast = document.getElementById('mm-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mm-toast';
      toast.className = 'toast';
      toast.innerHTML = '<span class="toast-dot"></span><span data-toast-text></span>';
      document.body.appendChild(toast);
    }
    toast.classList.toggle('toast-danger', !!opts.danger);
    toast.querySelector('[data-toast-text]').textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () { toast.classList.remove('show'); }, opts.duration || 2600);
  }

  /* ---------------------------------------------------------------- */
  /* Tabs helper — [data-tabs] wrapping [data-tab] items + sibling      */
  /* [data-tab-panel] panels                                            */
  /* ---------------------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var tabBtn = e.target.closest('[data-tab]');
    if (!tabBtn) return;
    var group = tabBtn.closest('[data-tabs]');
    if (!group) return;
    var target = tabBtn.getAttribute('data-tab');
    group.querySelectorAll('[data-tab]').forEach(function (btn) { btn.classList.toggle('active', btn === tabBtn); });
    var panelGroup = group.getAttribute('data-tabs');
    document.querySelectorAll('[data-tab-panel][data-tabs-group="' + panelGroup + '"]').forEach(function (panel) {
      panel.style.display = (panel.getAttribute('data-tab-panel') === target) ? '' : 'none';
    });
  });

  /* ---------------------------------------------------------------- */
  /* Form validation helpers (used by main-workflow screens)           */
  /* ---------------------------------------------------------------- */

  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;
    var errorEl = group.querySelector('.form-error');
    var value = input.value.trim();
    var message = '';

    if (input.hasAttribute('required') && !value) {
      message = 'This field is required.';
    } else if (value && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Enter a valid email address.';
    } else if (value && input.dataset.validate === 'phone' && !/^[+0-9()\-\s]{7,}$/.test(value)) {
      message = 'Enter a valid phone number.';
    } else if (value && input.type === 'number') {
      var min = input.getAttribute('min'), max = input.getAttribute('max');
      var num = parseFloat(value);
      if (min !== null && num < parseFloat(min)) message = 'Value must be at least ' + min + '.';
      if (max !== null && num > parseFloat(max)) message = 'Value must be at most ' + max + '.';
    }

    group.classList.toggle('has-error', !!message);
    if (errorEl) errorEl.textContent = message;
    return !message;
  }

  function bindFormValidation(form) {
    if (!form) return;
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
    });
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      if (!validateField(input)) valid = false;
    });
    return valid;
  }

  /* Simulated async save: disables the button, swaps its label, then
     resolves after a short delay — used by every main-workflow form. */
  function simulateSave(button, doneLabel, callback) {
    var originalLabel = button.innerHTML;
    button.disabled = true;
    button.dataset.originalLabel = originalLabel;
    button.textContent = doneLabel || 'Saving...';
    setTimeout(function () {
      button.disabled = false;
      button.innerHTML = originalLabel;
      if (callback) callback();
    }, 500 + Math.random() * 300);
  }

  function uid(prefix) {
    return (prefix || 'id') + '-' + Math.random().toString(36).slice(2, 9);
  }

  window.MM = window.MM || {};
  window.MM.openModal = openModal;
  window.MM.closeModal = closeModal;
  window.MM.closeAllModals = closeAllModals;
  window.MM.showToast = showToast;
  window.MM.validateField = validateField;
  window.MM.bindFormValidation = bindFormValidation;
  window.MM.validateForm = validateForm;
  window.MM.simulateSave = simulateSave;
  window.MM.uid = uid;

  /* ---------------------------------------------------------------- */
  /* Shared cast of mock entities, reused across screens so the same   */
  /* villa/booking/owner/guest/staff looks identical everywhere.       */
  /* ---------------------------------------------------------------- */

  window.MM.MOCK_PROPERTIES = [
    { id: 'PV-101', name: 'Villa Sapphire Cliff', bu: 'Sentosa Collection', concierge: 'Daniel T.', photosComplete: true, onboarding: 'live', bedrooms: 5, status: 'active' },
    { id: 'PV-102', name: 'Villa Coral Horizon', bu: 'Sentosa Collection', concierge: 'Daniel T.', photosComplete: true, onboarding: 'live', bedrooms: 4, status: 'active' },
    { id: 'PV-103', name: 'Villa Emerald Bay', bu: 'Byron Bay Retreats', concierge: null, photosComplete: true, onboarding: 'live', bedrooms: 6, status: 'active' },
    { id: 'PV-104', name: 'Villa Azure Ridge', bu: 'Byron Bay Retreats', concierge: 'Warren K.', photosComplete: false, onboarding: 'live', bedrooms: 3, status: 'active' },
    { id: 'PV-105', name: 'Villa Marble Cove', bu: 'Sentosa Collection', concierge: 'Daniel T.', photosComplete: false, onboarding: 'onboarding', bedrooms: 5, status: 'onboarding' },
    { id: 'PV-106', name: 'Villa Lotus Terrace', bu: 'Noosa Estates', concierge: 'Nicole P.', photosComplete: true, onboarding: 'live', bedrooms: 4, status: 'active' },
    { id: 'PV-107', name: 'Villa Golden Palm', bu: 'Noosa Estates', concierge: null, photosComplete: false, onboarding: 'onboarding', bedrooms: 3, status: 'onboarding' },
    { id: 'PV-108', name: 'Villa Silver Tide', bu: 'Byron Bay Retreats', concierge: 'Warren K.', photosComplete: true, onboarding: 'live', bedrooms: 7, status: 'active' }
  ];

  window.MM.MOCK_OWNERS = [
    { id: 'OWN-01', name: 'Richard Halstead', properties: ['PV-101', 'PV-102'], email: 'r.halstead@example.com', payoutStatus: 'current' },
    { id: 'OWN-02', name: 'Isabelle Moreau', properties: ['PV-103'], email: 'i.moreau@example.com', payoutStatus: 'pending' },
    { id: 'OWN-03', name: 'David Chen', properties: ['PV-104', 'PV-108'], email: 'd.chen@example.com', payoutStatus: 'current' },
    { id: 'OWN-04', name: 'Priya Nair', properties: ['PV-106', 'PV-107'], email: 'p.nair@example.com', payoutStatus: 'overdue' }
  ];

  window.MM.MOCK_GUESTS = [
    { id: 'GST-01', name: 'James Whitfield', email: 'james.whitfield@example.com', country: 'United Kingdom' },
    { id: 'GST-02', name: 'Anna Kowalski', email: 'anna.kowalski@example.com', country: 'Poland' },
    { id: 'GST-03', name: 'Michael Tan', email: 'michael.tan@example.com', country: 'Singapore' },
    { id: 'GST-04', name: 'Sophia Rossi', email: 'sophia.rossi@example.com', country: 'Italy' }
  ];

  window.MM.MOCK_STAFF = [
    { id: 'STF-01', name: 'Daniel Tan', role: 'Concierge', team: 'Sentosa Collection' },
    { id: 'STF-02', name: 'Warren Kelly', role: 'Concierge', team: 'Byron Bay Retreats' },
    { id: 'STF-03', name: 'Nicole Parker', role: 'Concierge', team: 'Noosa Estates' },
    { id: 'STF-04', name: 'Karen Seah', role: 'Housekeeping Lead', team: 'Sentosa Collection' },
    { id: 'STF-05', name: 'Ben Sullivan', role: 'Maintenance Technician', team: 'Byron Bay Retreats' }
  ];

  window.MM.MOCK_BOOKINGS = [
    { id: 'BK-10231', property: 'Villa Sapphire Cliff', guest: 'James Whitfield', checkIn: '2026-09-02', checkOut: '2026-09-09', status: 'confirmed', total: 8400 },
    { id: 'BK-10232', property: 'Villa Coral Horizon', guest: 'Anna Kowalski', checkIn: '2026-09-05', checkOut: '2026-09-10', status: 'confirmed', total: 5600 },
    { id: 'BK-10233', property: 'Villa Emerald Bay', guest: 'Michael Tan', checkIn: '2026-09-08', checkOut: '2026-09-15', status: 'pending', total: 11200 },
    { id: 'BK-10234', property: 'Villa Azure Ridge', guest: 'Sophia Rossi', checkIn: '2026-08-20', checkOut: '2026-08-25', status: 'checked-in', total: 4200 },
    { id: 'BK-10235', property: 'Villa Marble Cove', guest: 'James Whitfield', checkIn: '2026-07-10', checkOut: '2026-07-14', status: 'cancelled', total: 3600 }
  ];

  window.MM.MOCK_VENDORS = [
    { id: 'VND-01', name: 'Coral Pool Services', category: 'Maintenance', status: 'active' },
    { id: 'VND-02', name: 'Byron Bloom Gardens', category: 'Garden/Pool', status: 'active' },
    { id: 'VND-03', name: 'Sentosa Frame Photography', category: 'Photography', status: 'active' },
    { id: 'VND-04', name: 'Straits Linen Supply', category: 'Housekeeping', status: 'inactive' }
  ];
})();
