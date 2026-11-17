(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_restaurants_added';
  var EDITS_KEY = 'mm_cms_restaurants_edits';
  var DELETED_KEY = 'mm_cms_restaurants_deleted';
  var COOKIE_KEY = 'mm_cms_restaurants_bu_filter';
  var BANNERS_KEY = 'mm_cms_restaurants_banners';
  var editingId = null;
  var editingItem = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getBanners(id) {
    var all = readJson(BANNERS_KEY, {});
    if (!all[id]) {
      var item = getItems().filter(function (i) { return i.id === id; })[0];
      var seedCount = item ? (item.bannerImages || 0) : 0;
      all[id] = [];
      for (var i = 0; i < seedCount; i++) all[id].push(MM.uid('IMG'));
      localStorage.setItem(BANNERS_KEY, JSON.stringify(all));
    }
    return all[id];
  }
  function setBanners(id, list) {
    var all = readJson(BANNERS_KEY, {});
    all[id] = list;
    localStorage.setItem(BANNERS_KEY, JSON.stringify(all));
  }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.RESTAURANTS || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { return edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; })
      .sort(function (a, b) { return (a.name || '').localeCompare(b.name || ''); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buFilter = document.getElementById('bu-filter');
    (MM.CMS.BUSINESS_UNITS || []).forEach(function (bu) {
      var opt = document.createElement('option');
      opt.value = bu; opt.textContent = bu;
      buFilter.appendChild(opt);
    });
    buFilter.value = localStorage.getItem(COOKIE_KEY) || '0';

    var search = document.getElementById('search-input');

    function render() {
      var bu = buFilter.value;
      var q = search.value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems();
      var rows = all.filter(function (i) { return (bu === '0' || i.businessUnit === bu) && (!q || i.name.toLowerCase().indexOf(q) !== -1); });
      tbody.innerHTML = '';
      rows.forEach(function (item) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td><div class="rst-logo">' + (item.logo ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>') + '</div></td>' +
          '<td>' + (item.businessUnit || '—') + '</td>' +
          '<td class="cell-strong">' + item.name + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.name + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-label').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' restaurants';
    }

    buFilter.addEventListener('change', function () {
      localStorage.setItem(COOKIE_KEY, buFilter.value);
      render();
    });
    search.addEventListener('input', render);

    var pendingId = null;
    document.getElementById('table-body').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]');
      if (editBtn) {
        var found = getItems().filter(function (d) { return d.id === editBtn.getAttribute('data-edit'); })[0];
        openDrawer(found);
        return;
      }
      var btn = e.target.closest('[data-delete]');
      if (!btn) return;
      pendingId = btn.getAttribute('data-delete');
      document.getElementById('delete-target-name').textContent = btn.getAttribute('data-name');
      MM.openModal('delete-modal');
    });
    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      if (!pendingId) return;
      var deleted = readJson(DELETED_KEY, []);
      deleted.push(pendingId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
      MM.closeModal('delete-modal');
      MM.showToast('Restaurant deleted.');
      pendingId = null;
      render();
    });

    var drawerBuSelect = document.getElementById('field-bu');
    (MM.CMS.BUSINESS_UNITS || []).forEach(function (bu) {
      var opt = document.createElement('option');
      opt.value = bu; opt.textContent = bu;
      drawerBuSelect.appendChild(opt);
    });

    var fields = {
      bu: drawerBuSelect,
      name: document.getElementById('field-name'),
      address: document.getElementById('field-address'),
      mapLink: document.getElementById('field-map-link'),
      rating: document.getElementById('field-rating'),
      description: document.getElementById('field-description'),
      menuLink: document.getElementById('field-menu-link'),
      hours: document.getElementById('field-hours'),
      phone: document.getElementById('field-phone')
    };
    var uploadTile = document.querySelector('#restaurant-drawer .cms-upload-tile');
    var hasLogo = false;

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      hasLogo = true;
      uploadTile.classList.add('has-file');
      document.getElementById('logo-hint').textContent = 'restaurant-logo.jpg selected (auto square-cropped).';
    });

    function fillFromItem(item) {
      fields.bu.value = item.businessUnit || '';
      fields.name.value = item.name || '';
      fields.address.value = item.address || '';
      fields.mapLink.value = item.googleMapLink || '';
      fields.rating.value = item.rating != null ? item.rating : '';
      fields.description.value = item.description || '';
      fields.menuLink.value = item.foodMenuLink || '';
      fields.hours.value = item.hours || '';
      fields.phone.value = item.phoneNumber || '';
      if (item.logo) { uploadTile.classList.add('has-file'); document.getElementById('logo-hint').textContent = 'Current logo kept unless replaced.'; }
    }

    var imageTabItem = document.getElementById('image-tab-item');
    function setImageTabState() {
      if (editingId) {
        imageTabItem.classList.remove('tab-disabled');
        document.getElementById('image-tab-locked').hidden = true;
        document.getElementById('image-tab-unlocked').hidden = false;
      } else {
        imageTabItem.classList.add('tab-disabled');
        document.getElementById('image-tab-locked').hidden = false;
        document.getElementById('image-tab-unlocked').hidden = true;
      }
    }

    function renderBanners() {
      if (!editingId) return;
      var list = getBanners(editingId);
      var grid = document.getElementById('banner-grid');
      grid.innerHTML = list.map(function (bid) {
        return '<div class="cms-banner-tile" data-banner-id="' + bid + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
          '<button type="button" class="cms-banner-tile__remove" data-remove-banner="' + bid + '" aria-label="Remove image">&times;</button>' +
          '</div>';
      }).join('') || '<p class="text-sm text-muted">No scroll images uploaded yet.</p>';
    }

    document.getElementById('add-banner-btn').addEventListener('click', function () {
      if (!editingId) return;
      var list = getBanners(editingId);
      list.push(MM.uid('IMG'));
      setBanners(editingId, list);
      renderBanners();
      MM.showToast('Scroll image uploaded.');
    });
    document.getElementById('banner-grid').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-remove-banner]');
      if (!btn) return;
      var list = getBanners(editingId).filter(function (bid) { return bid !== btn.getAttribute('data-remove-banner'); });
      setBanners(editingId, list);
      renderBanners();
      MM.showToast('Scroll image removed.');
    });

    function resetToRestaurantTab() {
      var restaurantTabBtn = document.querySelector('#restaurant-drawer [data-tab="restaurant"]');
      if (restaurantTabBtn) restaurantTabBtn.click();
    }

    function openDrawer(item) {
      editingId = item ? item.id : null;
      editingItem = item || null;
      document.getElementById('restaurant-drawer-title').textContent = item ? 'Edit Restaurant' : 'Add Restaurant';
      document.getElementById('save-btn').textContent = item ? 'Save Changes' : 'Save';
      document.getElementById('restaurant-form').reset();
      hasLogo = item ? !!(item && item.logo) : false;
      uploadTile.classList.remove('has-file');
      document.getElementById('logo-hint').textContent = 'Square logos are recommended (auto-cropped to 1:1); max 1.2MB.';
      if (item) fillFromItem(item);
      setImageTabState();
      renderBanners();
      resetToRestaurantTab();
      MM.openModal('restaurant-drawer');
    }

    document.getElementById('add-restaurant-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-restaurant-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('restaurant-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        businessUnit: fields.bu.value,
        name: fields.name.value.trim(),
        address: fields.address.value.trim(),
        googleMapLink: fields.mapLink.value.trim(),
        rating: parseFloat(fields.rating.value),
        description: fields.description.value.trim(),
        foodMenuLink: fields.menuLink.value.trim(),
        hours: fields.hours.value.trim(),
        phoneNumber: fields.phone.value.trim(),
        logo: hasLogo,
        status: (editingItem && editingItem.status) || 'active'
      };

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, editingId ? 'Saving...' : 'Creating...', function () {
        if (editingId) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = Object.assign({}, edits[editingId], payload);
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Restaurant updated.');
          render();
        } else {
          var newId = MM.uid('RST');
          var added = readJson(ADDED_KEY, []);
          added.push(Object.assign({ id: newId, district: fields.address.value.trim(), cuisine: '', bannerImages: 0, latitude: null, longitude: null }, payload));
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Restaurant created.');
          render();
          // Legacy behaviour: after the first save, stay on this drawer (now in Edit mode)
          // so the Image tab unlocks — it does not close the drawer.
          editingId = newId;
          editingItem = getItems().filter(function (d) { return d.id === newId; })[0];
          document.getElementById('restaurant-drawer-title').textContent = 'Edit Restaurant';
          document.getElementById('save-btn').textContent = 'Save Changes';
          setImageTabState();
          renderBanners();
        }
      });
    });

    render();
  });
})();
