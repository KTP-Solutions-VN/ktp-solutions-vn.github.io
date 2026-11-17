
  var state = { search: '', sev: '' };
  function render() {
    var s = state.search.toLowerCase();
    var list = DATA_NHAT_KY_HE_THONG.filter(function (l) {
      if (s && l.user.toLowerCase().indexOf(s) === -1 && l.action.toLowerCase().indexOf(s) === -1 && l.objectId.toLowerCase().indexOf(s) === -1) return false;
      if (state.sev && l.severity !== state.sev) return false;
      return true;
    });
    document.getElementById('listTbody').innerHTML = list.map(function (l) {
      return '<tr><td class="tabular-nums">' + l.at + '</td><td>' + l.user + '</td><td>' + l.action + '</td><td>' + l.objectType + ' — ' + l.objectId + '</td>' +
        '<td style="font-size:12px;"><span style="color:var(--gray-500);">' + l.before + '</span> → <span style="color:var(--primary-dark);font-weight:600;">' + l.after + '</span></td>' +
        '<td>' + CJBadge(l.severity, { Sensitive: 'error', Info: 'neutral' }) + '</td></tr>';
    }).join('');
  }
  document.getElementById('tbSearch').addEventListener('input', function () { state.search = this.value; render(); });
  document.getElementById('sevFilter').addEventListener('change', function () { state.sev = this.value; render(); });
  document.getElementById('exportBtn').addEventListener('click', function () { CJToast('Audit log exported (demo).'); });
  render();
  