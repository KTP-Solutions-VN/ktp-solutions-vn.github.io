(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_services_added';
  var EDITS_KEY = 'mm_cms_services_edits';
  var DELETED_KEY = 'mm_cms_services_deleted';
  var editingId = null;

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getServices() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.SERVICES || []).concat(added);
    return base
      .filter(function (s) { return deleted.indexOf(s.id) === -1; })
      .map(function (s) { return edits[s.id] ? Object.assign({}, s, edits[s.id]) : s; });
  }

  function villaName(id) {
    var v = MM.CMS.villaById(id);
    return v ? v.name : '—';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var villaFilter = document.getElementById('villa-filter');
    var villaField = document.getElementById('field-villa');
    (MM.MOCK_PROPERTIES || []).filter(function (p) { return p.status === 'active'; }).forEach(function (v) {
      var opt = document.createElement('option'); opt.value = v.id; opt.textContent = v.name;
      villaFilter.appendChild(opt);
      var opt2 = document.createElement('option'); opt2.value = v.id; opt2.textContent = v.name;
      villaField.appendChild(opt2);
    });

    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var villaId = villaFilter.value;
      var status = document.getElementById('status-filter').value;
      var tbody = document.getElementById('services-table-body');
      var rows = getServices().filter(function (s) {
        if (search && s.name.toLowerCase().indexOf(search) === -1) return false;
        if (villaId && s.villaId !== villaId) return false;
        if (status && s.status !== status) return false;
        return true;
      });
      tbody.innerHTML = '';
      rows.forEach(function (s, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td class="cell-strong">' + s.name + '</td>' +
          '<td>' + villaName(s.villaId) + '</td>' +
          '<td>' + s.category + '</td>' +
          '<td class="cell-num">$' + s.price + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[s.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[s.status] || s.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + s.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + s.id + '" data-name="' + s.name + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + getServices().length + ' services';
    }

    document.getElementById('search-input').addEventListener('input', render);
    villaFilter.addEventListener('change', render);
    document.getElementById('status-filter').addEventListener('change', render);

    var pendingDeleteId = null;
    document.getElementById('services-table-body').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]');
      if (editBtn) {
        var s = getServices().filter(function (d) { return d.id === editBtn.getAttribute('data-edit'); })[0];
        openDrawer(s);
        return;
      }
      var btn = e.target.closest('[data-delete]');
      if (!btn) return;
      pendingDeleteId = btn.getAttribute('data-delete');
      document.getElementById('delete-target-name').textContent = btn.getAttribute('data-name');
      MM.openModal('delete-modal');
    });
    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      if (!pendingDeleteId) return;
      var deleted = readJson(DELETED_KEY, []);
      deleted.push(pendingDeleteId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
      MM.closeModal('delete-modal');
      MM.showToast('Service deleted.');
      pendingDeleteId = null;
      render();
    });

    function openDrawer(service) {
      editingId = service ? service.id : null;
      document.getElementById('service-drawer-title').textContent = service ? 'Edit Villa Service' : 'Add Villa Service';
      document.getElementById('save-service-btn').textContent = service ? 'Save Changes' : 'Save Service';
      var form = document.getElementById('service-form');
      form.reset();
      if (service) {
        villaField.value = service.villaId || '';
        document.getElementById('field-title').value = service.name || '';
        document.getElementById('field-category').value = service.category || '';
        document.getElementById('field-price').value = service.price != null ? service.price : '';
        document.getElementById('field-description').value = service.description || 'Curated for guests staying at this villa.';
        document.getElementById('field-status').value = service.status || 'active';
      } else {
        document.getElementById('field-status').value = 'active';
      }
      MM.openModal('service-drawer');
    }

    document.getElementById('add-service-btn').addEventListener('click', function () { openDrawer(null); });
    var emptyAddBtn = document.getElementById('empty-add-service-btn');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', function () { openDrawer(null); });

    var form = document.getElementById('service-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!MM.validateForm(form)) { MM.showToast('Please fix the highlighted fields.', { danger: true }); return; }

      var payload = {
        villaId: villaField.value,
        name: document.getElementById('field-title').value.trim(),
        category: document.getElementById('field-category').value,
        price: parseFloat(document.getElementById('field-price').value) || 0,
        description: document.getElementById('field-description').value.trim(),
        status: document.getElementById('field-status').value
      };

      var btn = document.getElementById('save-service-btn');
      MM.simulateSave(btn, editingId ? 'Saving...' : 'Creating...', function () {
        if (editingId) {
          var edits = readJson(EDITS_KEY, {});
          edits[editingId] = payload;
          localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
          MM.showToast('Service updated.');
        } else {
          var added = readJson(ADDED_KEY, []);
          payload.id = MM.uid('SVC');
          added.push(payload);
          localStorage.setItem(ADDED_KEY, JSON.stringify(added));
          MM.showToast('Service created.');
        }
        MM.closeModal('service-drawer');
        render();
      });
    });

    render();
  });
})();
