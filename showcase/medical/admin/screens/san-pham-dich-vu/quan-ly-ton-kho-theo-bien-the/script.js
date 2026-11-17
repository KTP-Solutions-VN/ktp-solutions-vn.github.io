
  var rows = [];
  DATA_SAN_PHAM_DICH_VU.forEach(function (p) { p.variants.forEach(function (v) { rows.push({ product: p.name, variant: v.name, sku: v.sku, stock: v.stock }); }); });
  function render() {
    var tbody = document.getElementById('listTbody');
    tbody.innerHTML = rows.map(function (r) {
      var low = r.stock <= 5 && r.stock > 0;
      var zero = r.stock === 0;
      var badge = zero ? '<span class="badge badge-error">Out of stock</span>' : (low ? '<span class="badge badge-warning">Low stock</span>' : '<span class="badge badge-success">In stock</span>');
      return '<tr><td class="cell-strong">' + r.product + '</td><td>' + r.variant + '</td><td>' + r.sku + '</td>' +
        '<td class="tabular-nums">' + r.stock + ' ' + badge + '</td>' +
        '<td class="row-actions"><button class="btn btn-outline btn-sm">Adjust</button></td></tr>';
    }).join('');
  }
  document.getElementById('tbSearch').addEventListener('input', function () {
    var s = this.value.toLowerCase();
    document.querySelectorAll('#listTbody tr').forEach(function (tr) {
      tr.style.display = tr.textContent.toLowerCase().indexOf(s) > -1 ? '' : 'none';
    });
  });
  render();
  