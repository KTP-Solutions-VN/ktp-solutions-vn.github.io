/* ==========================================================================
   Azura Stays CMS — Shared layout behaviour (sidebar, topbar, modal
   helpers, toast). Included on every screen before the page-specific
   script so page scripts can call window.CM.* helpers.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Modal helpers                                                      */
  /* ---------------------------------------------------------------- */

  function openModal(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.dispatchEvent(new CustomEvent('cm:modal-open'));
  }

  function closeModal(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('open');
    var anyOpen = document.querySelector('.modal-overlay.open');
    if (!anyOpen) document.body.style.overflow = '';
    overlay.dispatchEvent(new CustomEvent('cm:modal-close'));
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(function (overlay) {
      overlay.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  // Click outside modal card closes it. Click on [data-close-modal] closes it.
  document.addEventListener('click', function (e) {
    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
    var closeTrigger = e.target.closest('[data-close-modal]');
    if (closeTrigger) {
      var overlay = closeTrigger.closest('.modal-overlay');
      if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    var openTrigger = e.target.closest('[data-open-modal]');
    if (openTrigger) {
      openModal(openTrigger.getAttribute('data-open-modal'));
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });

  /* ---------------------------------------------------------------- */
  /* Topbar user menu dropdown                                         */
  /* ---------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    var userMenu = document.querySelector('[data-user-menu]');
    var userDropdown = document.querySelector('[data-user-dropdown]');
    if (userMenu && userDropdown) {
      userMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        userDropdown.classList.remove('open');
      });
    }

    // Generic icon-button popovers (notifications, help) using [data-popover]
    document.querySelectorAll('[data-popover-trigger]').forEach(function (trigger) {
      var targetId = trigger.getAttribute('data-popover-trigger');
      var popover = document.getElementById(targetId);
      if (!popover) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.popover.open').forEach(function (p) {
          if (p !== popover) p.classList.remove('open');
        });
        popover.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (!popover.contains(e.target)) popover.classList.remove('open');
      });
    });
  });

  /* ---------------------------------------------------------------- */
  /* Toast notifications                                                */
  /* ---------------------------------------------------------------- */

  function showToast(message, duration) {
    var toast = document.getElementById('cm-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cm-toast';
      toast.className = 'toast';
      toast.innerHTML = '<span class="toast-dot"></span><span data-toast-text></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('[data-toast-text]').textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, duration || 2600);
  }

  /* ---------------------------------------------------------------- */
  /* Tabs helper — elements with [data-tabs] wrapping [data-tab] items  */
  /* and sibling panels marked [data-tab-panel]                        */
  /* ---------------------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var tabBtn = e.target.closest('[data-tab]');
    if (!tabBtn) return;
    var group = tabBtn.closest('[data-tabs]');
    if (!group) return;
    var target = tabBtn.getAttribute('data-tab');

    group.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn === tabBtn);
    });

    var panelGroup = group.getAttribute('data-tabs');
    document.querySelectorAll('[data-tab-panel][data-tabs-group="' + panelGroup + '"]').forEach(function (panel) {
      panel.style.display = (panel.getAttribute('data-tab-panel') === target) ? '' : 'none';
    });
  });

  /* ---------------------------------------------------------------- */
  /* Expose shared helpers                                              */
  /* ---------------------------------------------------------------- */

  window.CM = window.CM || {};
  window.CM.openModal = openModal;
  window.CM.closeModal = closeModal;
  window.CM.closeAllModals = closeAllModals;
  window.CM.showToast = showToast;

  /* Sample cross-screen mock dataset (vendors), used by multiple pages */
  window.CM.MOCK_VENDORS = [
    { id: 'v1', name: 'Andaman Villas Group', plan: 'Subscription', properties: 18, status: 'active', provider: ['Channex', 'Beds24'] },
    { id: 'v2', name: 'Aegean Retreats', plan: 'Per-Property', properties: 9, status: 'active', provider: ['Channex'] },
    { id: 'v3', name: 'Sunshine Coast Rentals', plan: 'Performance-based', properties: 24, status: 'active', provider: ['Beds24'] },
    { id: 'v4', name: 'Caribbean Palms Collection', plan: 'Subscription', properties: 6, status: 'onboarding', provider: ['Channex'] },
    { id: 'v5', name: 'Phuket Hillside Estates', plan: 'Subscription', properties: 12, status: 'suspended', provider: ['Channex', 'Beds24'] }
  ];
})();
