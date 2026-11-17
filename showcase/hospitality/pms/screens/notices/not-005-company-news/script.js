(function () {
  'use strict';

  var SEED = [
    { id: 'CN-01', title: 'New Villa Onboarded: Villa Jade Horizon', date: '2026-08-15', author: 'Management', excerpt: 'We are excited to welcome Villa Jade Horizon to the Azura Manager portfolio, now accepting bookings from September.' },
    { id: 'CN-02', title: 'Q3 Owner Payout Schedule Update', date: '2026-08-10', author: 'Accounting Team', excerpt: 'Owner payouts for Q3 will be processed one week earlier this quarter. Please review the updated schedule.' },
    { id: 'CN-03', title: 'Staff Training: New Housekeeping Standards', date: '2026-08-02', author: 'Operations', excerpt: 'All housekeeping staff are required to complete the refreshed cleaning standards training by end of month.' }
  ];

  function getHidden() { return JSON.parse(localStorage.getItem('mm_not_news_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_not_news') || '[]'); }
  function getAll() {
    var hidden = getHidden();
    return SEED.filter(function (n) { return hidden.indexOf(n.id) === -1; }).concat(getExtra());
  }

  var pendingDeleteId = null;

  function render() {
    var grid = document.getElementById('news-grid');
    var items = getAll();
    if (!items.length) {
      grid.innerHTML = '<div class="empty-state"><p>No news posts yet.</p></div>';
      return;
    }
    grid.innerHTML = items.map(function (n) {
      return '<div class="news-card">' +
        '<div class="news-card__banner"></div>' +
        '<div class="news-card__body">' +
          '<h3 class="news-card__title">' + n.title + '</h3>' +
          '<div class="news-card__meta">' + n.date + ' · ' + n.author + '</div>' +
          '<p class="news-card__excerpt">' + n.excerpt + '</p>' +
        '</div>' +
        '<div class="news-card__footer">' +
          '<button class="btn btn-ghost btn-sm" data-delete="' + n.id + '">Delete</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  document.getElementById('news-grid').addEventListener('click', function (e) {
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) { pendingDeleteId = delBtn.getAttribute('data-delete'); MM.openModal('delete-modal'); }
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    var isSeed = SEED.some(function (n) { return n.id === pendingDeleteId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingDeleteId);
      localStorage.setItem('mm_not_news_hidden', JSON.stringify(hidden));
    } else {
      var extra = getExtra().filter(function (n) { return n.id !== pendingDeleteId; });
      localStorage.setItem('mm_not_news', JSON.stringify(extra));
    }
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('News post deleted');
    render();
  });

  render();

  document.getElementById('add-news-btn').addEventListener('click', function () {
    document.getElementById('news-form').reset();
    MM.openModal('news-drawer');
  });

  var newsForm = document.getElementById('news-form');
  MM.bindFormValidation(newsForm);
  newsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(newsForm)) return;
    MM.simulateSave(document.getElementById('news-save-btn'), 'Publishing...', function () {
      var stored = getExtra();
      stored.push({
        id: MM.uid('cn'),
        title: document.getElementById('f-title').value.trim(),
        author: document.getElementById('f-author').value.trim(),
        date: new Date().toISOString().slice(0, 10),
        excerpt: document.getElementById('f-excerpt').value.trim()
      });
      localStorage.setItem('mm_not_news', JSON.stringify(stored));
      MM.showToast('News published');
      MM.closeModal('news-drawer');
      render();
    });
  });
})();
