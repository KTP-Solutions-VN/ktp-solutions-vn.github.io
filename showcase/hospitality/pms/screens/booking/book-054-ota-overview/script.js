document.addEventListener('DOMContentLoaded', function () {
  var wrap = document.getElementById('channel-chips');
  wrap.innerHTML = MM.BOOK.OTA_CHANNELS.map(function (c) {
    var n = (MM.BOOK.OTA_UNLINKED[c] || []).length;
    return '<span class="chip">' + c + '<span class="badge badge-' + (n ? 'warning' : 'success') + '" style="margin-left:6px;">' + n + ' unlinked</span></span>';
  }).join('');
});
