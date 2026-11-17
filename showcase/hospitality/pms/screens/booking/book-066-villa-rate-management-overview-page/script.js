document.addEventListener('DOMContentLoaded', function () {
  var overview = MM.BOOK.getEffectiveMonthlyOverview();
  var overdue = overview.filter(function (r) { return MM.BOOK.isOverdue(r.nextDueDate); }).length;
  document.getElementById('stat-status').textContent = overview.length + ' villa' + (overview.length === 1 ? '' : 's') + ' on Monthly rates' + (overdue ? ' — ' + overdue + ' overdue' : '');

  var logs = MM.BOOK.getRateChangeLog();
  document.getElementById('stat-logs').textContent = logs.length + ' rate change' + (logs.length === 1 ? '' : 's') + ' recorded';

  var regionsWith = MM.BOOK.regionsWithSeasons().length;
  document.getElementById('stat-seasons').textContent = regionsWith + ' of ' + MM.BOOK.REGIONS.length + ' regions have seasons configured';

  var mismatchVillas = Object.keys(MM.BOOK.SEASON_PRICE_DATA).filter(function (id) { return MM.BOOK.SEASON_PRICE_DATA[id].discrepancy; }).length;
  document.getElementById('stat-seasonlogs').textContent = mismatchVillas ? mismatchVillas + ' villa' + (mismatchVillas === 1 ? '' : 's') + ' with a price mismatch' : 'All villas reconciled';
});
