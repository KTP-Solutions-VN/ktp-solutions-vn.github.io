/* ==========================================================================
   CareJourney — Admin Portal — Global chrome behavior
   Sidebar collapse/expand (persisted), accordion groups, topbar scroll shadow,
   shared toast helper, shared confirm-modal helper.
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    initSidebarCollapse();
    initSidebarAccordion();
    initTopbarScrollShadow();
  }

  /* ---------------- Sidebar collapse/expand, persisted ---------------- */
  function initSidebarCollapse() {
    var sidebar = document.querySelector('.sidebar');
    var toggleBtn = document.querySelector('.sidebar-toggle');
    if (!sidebar || !toggleBtn) return;

    var collapsed = localStorage.getItem('sidebar_collapsed') === '1';
    applyState(collapsed);

    toggleBtn.addEventListener('click', function () {
      collapsed = !collapsed;
      localStorage.setItem('sidebar_collapsed', collapsed ? '1' : '0');
      applyState(collapsed);
    });

    function applyState(isCollapsed) {
      sidebar.classList.toggle('collapsed', isCollapsed);
      document.body.classList.toggle('sidebar-collapsed', isCollapsed);
      var tooltip = toggleBtn.querySelector('.tooltip-text');
      if (tooltip) tooltip.textContent = isCollapsed ? 'Expand menu' : 'Collapse menu';
    }
  }

  /* ---------------- Accordion nav groups (expand-on-demand) ------------ */
  function initSidebarAccordion() {
    var groupTitles = document.querySelectorAll('.nav-group-title');
    groupTitles.forEach(function (title) {
      title.addEventListener('click', function () {
        var group = title.closest('.nav-group');
        if (!group) return;
        group.classList.toggle('open');
      });
    });
  }

  /* ---------------- Topbar shadow-on-scroll ----------------------------- */
  function initTopbarScrollShadow() {
    var topbar = document.querySelector('.topbar');
    var pageMain = document.querySelector('.page-main');
    if (!topbar) return;
    var target = window;
    target.addEventListener('scroll', function () {
      topbar.classList.toggle('scrolled', window.scrollY > 4);
    });
  }

  /* ---------------- Shared toast helper --------------------------------- */
  window.CJToast = function (message) {
    var wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span></span>';
    toast.querySelector('span').textContent = message;
    wrap.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 200ms ease-out';
      setTimeout(function () { toast.remove(); }, 220);
    }, 2600);
  };

  /* ---------------- Shared confirm-before-delete helper ------------------ */
  window.CJConfirm = function (message, onConfirm) {
    var overlay = document.createElement('div');
    overlay.className = 'overlay open';
    overlay.innerHTML =
      '<div class="modal" style="width:400px;">' +
        '<div class="modal-header"><h3>Please confirm</h3></div>' +
        '<div class="modal-body"><p style="margin:0;color:var(--gray-700);">' + message + '</p></div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-ghost" data-cancel>Cancel</button>' +
          '<button class="btn btn-danger" data-confirm>Confirm</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('[data-cancel]').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('[data-confirm]').addEventListener('click', function () {
      overlay.remove();
      onConfirm && onConfirm();
    });
  };

  /* ---------------- Simple localStorage merge helper --------------------- */
  window.CJStore = {
    get: function (key) {
      try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
    },
    set: function (key, arr) {
      localStorage.setItem(key, JSON.stringify(arr));
    },
    reset: function (key) {
      localStorage.removeItem(key);
    },
    /* Overrides: patch existing mock records by id without mutating the shared DATA_<ENTITY> array */
    getOverrides: function (key) {
      try { return JSON.parse(localStorage.getItem(key + '__overrides')) || {}; } catch (e) { return {}; }
    },
    setOverride: function (key, id, patch) {
      var overrides = this.getOverrides(key);
      overrides[id] = Object.assign({}, overrides[id], patch);
      localStorage.setItem(key + '__overrides', JSON.stringify(overrides));
    },
    mergeOverrides: function (baseArray, key, idField) {
      var overrides = this.getOverrides(key);
      return baseArray.map(function (item) {
        var o = overrides[item[idField]];
        return o ? Object.assign({}, item, o) : item;
      });
    },
    /* Extra: brand-new records created in-session (e.g. manual order create) */
    getExtra: function (key) {
      try { return JSON.parse(localStorage.getItem(key + '__extra')) || []; } catch (e) { return []; }
    },
    addExtra: function (key, record) {
      var arr = this.getExtra(key);
      arr.unshift(record);
      localStorage.setItem(key + '__extra', JSON.stringify(arr));
    },
    resetAll: function (key) {
      localStorage.removeItem(key + '__overrides');
      localStorage.removeItem(key + '__extra');
    }
  };

  /* ---------------- Generic badge/status renderer ------------------------ */
  window.CJBadge = function (status, map, size) {
    var cls = (map && map[status]) || 'neutral';
    return '<span class="badge badge-' + cls + '">' + status + '</span>';
  };

  /* ---------------- Generic Slide-over (drawer) open/close/bind ---------- *
   * Reused across every "≤20 fields → Drawer" Create/Edit/View screen      *
   * (see ui-kit-brief.md §16b). Each drawer is `.drawer-overlay#<id>` >     *
   * `aside.drawer`. bind() wires: click on overlay outside the panel       *
   * closes it, any [data-drawer-close] element closes it, and Escape       *
   * closes whichever drawer is currently open.                             */
  window.CJDrawer = {
    open: function (id) {
      var overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.classList.add('open');
    },
    close: function (id) {
      var overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.classList.remove('open');
    },
    bind: function (id) {
      var overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.addEventListener('click', function (e) { if (e.target === overlay) window.CJDrawer.close(id); });
      overlay.querySelectorAll('[data-drawer-close]').forEach(function (el) {
        el.addEventListener('click', function (e) { e.preventDefault(); window.CJDrawer.close(id); });
      });
    }
  };
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.drawer-overlay.open').forEach(function (overlay) {
      overlay.classList.remove('open');
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
