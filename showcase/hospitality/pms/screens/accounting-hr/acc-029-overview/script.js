(function () {
  'use strict';
  var search = document.getElementById('ov-search');
  var grid = document.getElementById('ov-shortcut-grid');
  var empty = document.getElementById('ov-empty');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.ov-shortcut'));

  search.addEventListener('input', function () {
    var q = search.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (c) {
      var match = !q || c.getAttribute('data-name').indexOf(q) > -1;
      c.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    empty.hidden = visible > 0;
  });
})();
