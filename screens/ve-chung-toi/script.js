/* Về chúng tôi — carousel đội ngũ trên mobile (CSS scroll-snap; script chỉ dựng chấm chỉ vị trí) */
(function () {
  var grid = document.querySelector('.team-grid');
  if (!grid) return;
  var cards = grid.querySelectorAll('.team-member');
  var dots = document.createElement('div');
  dots.className = 'team-dots';
  cards.forEach(function (card, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', (i + 1) + ' / ' + cards.length);
    b.addEventListener('click', function () {
      grid.scrollTo({ left: card.offsetLeft - grid.offsetLeft - parseFloat(getComputedStyle(grid).paddingLeft), behavior: 'smooth' });
    });
    dots.appendChild(b);
  });
  grid.parentNode.insertBefore(dots, grid.nextSibling);

  function update() {
    var pad = parseFloat(getComputedStyle(grid).paddingLeft) || 0, best = 0, min = Infinity;
    cards.forEach(function (card, i) {
      var d = Math.abs(card.getBoundingClientRect().left - grid.getBoundingClientRect().left - pad);
      if (d < min) { min = d; best = i; }
    });
    dots.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('is-active', i === best); });
  }
  var raf;
  grid.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  update();
})();
