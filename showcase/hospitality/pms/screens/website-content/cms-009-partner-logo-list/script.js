(function () {
  'use strict';

  var ADDED_KEY = 'mm_cms_logos_added';
  var EDITS_KEY = 'mm_cms_logos_edits';
  var DELETED_KEY = 'mm_cms_logos_deleted';
  var DEFAULT_LINK = 'https://azurastays.example/press';

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

  function getItems() {
    var added = readJson(ADDED_KEY, []);
    var edits = readJson(EDITS_KEY, {});
    var deleted = readJson(DELETED_KEY, []);
    var base = (MM.CMS.PARTNER_LOGOS || []).concat(added);
    return base.filter(function (i) { return deleted.indexOf(i.id) === -1; })
      .map(function (i) { var merged = edits[i.id] ? Object.assign({}, i, edits[i.id]) : i; return Object.assign({ link: DEFAULT_LINK }, merged); })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var rows = getItems().filter(function (i) { return !search || i.name.toLowerCase().indexOf(search) !== -1; });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td><div class="logo-tile__mark" style="margin:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div></td>' +
          '<td class="cell-strong">' + item.name + '</td>' +
          '<td><a href="' + item.link + '" target="_blank" rel="noopener" style="color:var(--color-primary-dark);">' + item.link + '</a></td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td class="row-actions">' +
            '<a class="btn btn-ghost btn-sm" href="../cms-011-edit-partner-logo/index.html?id=' + item.id + '">Edit</a>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + item.id + '" data-name="' + item.name + '" style="color:var(--color-accent);">Delete</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + getItems().length + ' items';
    }

    document.getElementById('search-input').addEventListener('input', render);

    var pendingId = null;
    document.getElementById('table-body').addEventListener('click', function (e) {
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
      MM.showToast('Partner logo deleted.');
      pendingId = null;
      render();
    });

    render();

    var params = new URLSearchParams(window.location.search);
    var saved = params.get('saved');
    if (saved) {
      MM.showToast(saved === 'updated' ? 'Logo updated.' : 'Logo created.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  });
})();
