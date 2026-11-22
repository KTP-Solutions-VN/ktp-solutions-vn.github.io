
  var MODULES = ["Orders & Fulfillment","Campaigns & Offers","Catalog & Sessions","Site Content","People & Access","Business Insights","Platform Settings"];
  var LEVELS_BY_ROLE = {"Super Admin":["Full","Full","Full","Full","Full","Full","Full"],"Admin":["High","Full","Full","Full","High","Medium","None"],"Tech Support":["Limited","None","None","None","None","Medium","High"],"Finance":["High","Limited","None","None","Limited","High","None"],"Operations":["Medium","None","Medium","None","Limited","Limited","None"],"Vendor Partner":["Limited","None","None","None","None","None","None"]};
  var LEVEL_CLASS = {"Full":"perm-full","High":"perm-high","Medium":"perm-medium","Limited":"perm-limited","None":"perm-none"};
  var LEVELS = ['Full', 'High', 'Medium', 'Limited', 'None'];

  function renderMatrix(role) {
    var levels = LEVELS_BY_ROLE[role];
    var tbody = document.querySelector('#permTable tbody');
    tbody.innerHTML = '<tr><td>Access Level</td>' + MODULES.map(function (m, i) {
      return '<td><select data-idx="' + i + '" class="permSelect">' + LEVELS.map(function (l) { return '<option' + (l === levels[i] ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select></td>';
    }).join('') + '</tr>';
    document.querySelectorAll('.permSelect').forEach(function (sel) {
      var idx = sel.getAttribute('data-idx');
      function paint() { sel.className = 'permSelect ' + LEVEL_CLASS[sel.value]; }
      sel.addEventListener('change', paint);
      paint();
    });
  }
  document.getElementById('roleSelect').addEventListener('change', function () {
    document.getElementById('roleName').value = this.value;
    renderMatrix(this.value);
  });
  document.getElementById('saveBtn').addEventListener('click', function () { window.location.href = '../../../screens/khach-hang/quan-ly-nguoi-dung-quan-tri-vai-tro/index.html'; });
  renderMatrix('Admin');
  