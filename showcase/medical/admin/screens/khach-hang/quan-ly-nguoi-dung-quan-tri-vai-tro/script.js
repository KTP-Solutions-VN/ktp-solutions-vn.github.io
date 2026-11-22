
  var state = { search: '', role: '' };
  function render() {
    var s = state.search.toLowerCase();
    var list = DATA_NGUOI_DUNG_QUAN_TRI.filter(function (u) {
      if (s && u.name.toLowerCase().indexOf(s) === -1 && u.email.toLowerCase().indexOf(s) === -1) return false;
      if (state.role && u.role !== state.role) return false;
      return true;
    });
    document.getElementById('listTbody').innerHTML = list.map(function (u) {
      var initials = u.name.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
      return '<tr><td class="cell-strong" style="display:flex;align-items:center;gap:8px;"><span class="avatar" style="width:26px;height:26px;font-size:11px;">' + initials + '</span>' + u.name + '</td>' +
        '<td>' + u.email + '</td><td><span class="badge badge-primary">' + u.role + '</span></td><td>' + u.department + '</td>' +
        '<td>' + CJBadge(u.status, {Active:'success',Inactive:'neutral'}) + '</td><td>' + u.lastLogin + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm btn-icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></button></td></tr>';
    }).join('');
  }
  document.getElementById('tbSearch').addEventListener('input', function () { state.search = this.value; render(); });
  document.getElementById('roleFilter').addEventListener('change', function () { state.role = this.value; render(); });
  document.getElementById('createBtn').addEventListener('click', function () { CJToast('Add Staff Account form (demo only).'); });
  render();

  /* ---------------- Access Role Editor drawer ------------- */
  var MODULES = ["Orders & Fulfillment","Campaigns & Offers","Catalog & Sessions","Site Content","People & Access","Business Insights","Platform Settings"];
  var LEVELS_BY_ROLE = {"Super Admin":["Full","Full","Full","Full","Full","Full","Full"],"Admin":["High","Full","Full","Full","High","Medium","None"],"Tech Support":["Limited","None","None","None","None","Medium","High"],"Finance":["High","Limited","None","None","Limited","High","None"],"Operations":["Medium","None","Medium","None","Limited","Limited","None"],"Vendor Partner":["Limited","None","None","None","None","None","None"]};
  var LEVEL_CLASS = {"Full":"perm-full","High":"perm-high","Medium":"perm-medium","Limited":"perm-limited","None":"perm-none"};
  var LEVELS = ['Full', 'High', 'Medium', 'Limited', 'None'];

  function renderMatrix(role) {
    var levels = LEVELS_BY_ROLE[role] || LEVELS_BY_ROLE.Admin;
    var tbody = document.querySelector('#permTable tbody');
    tbody.innerHTML = '<tr><td>Access Level</td>' + MODULES.map(function (m, i) {
      return '<td><select data-idx="' + i + '" class="permSelect">' + LEVELS.map(function (l) { return '<option' + (l === levels[i] ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select></td>';
    }).join('') + '</tr>';
    document.querySelectorAll('.permSelect').forEach(function (sel) {
      function paint() { sel.className = 'permSelect ' + LEVEL_CLASS[sel.value]; }
      sel.addEventListener('change', paint);
      paint();
    });
  }
  CJDrawer.bind('roleOverlay');
  document.getElementById('roleSelect').addEventListener('change', function () {
    document.getElementById('roleName').value = this.value;
    renderMatrix(this.value);
  });
  document.getElementById('manageRolesBtn').addEventListener('click', function () {
    document.getElementById('roleSelect').value = 'Admin';
    document.getElementById('roleName').value = 'Admin';
    renderMatrix('Admin');
    CJDrawer.open('roleOverlay');
  });
  document.getElementById('saveRoleBtn').addEventListener('click', function () {
    var name = document.getElementById('roleName').value.trim() || 'Untitled Role';
    CJDrawer.close('roleOverlay');
    CJToast('Role "' + name + '" saved.');
  });

  (function handleDeepLink() {
    if (new URLSearchParams(window.location.search).get('openRoles')) { document.getElementById('manageRolesBtn').click(); }
  })();
