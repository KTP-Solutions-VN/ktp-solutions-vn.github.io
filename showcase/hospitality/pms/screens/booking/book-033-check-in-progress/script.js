document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var controlId = params.get('id');
  var villaId = params.get('villa_id');
  var bookingId = params.get('booking_id');
  var villa = villaId ? BOOK.villaById(villaId) : null;

  if (!controlId || !villa) {
    document.getElementById('content-card').hidden = true;
    document.getElementById('empty-card').hidden = false;
    return;
  }

  document.getElementById('page-sub').textContent = villa.name + ' — ' + villa.bu;
  document.getElementById('pv-villa').textContent = villa.name;
  var startTime = new Date();
  document.getElementById('pv-start').textContent = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  var steps = ['Confirming GPS location…', 'Checking amenities and welcome setup…', 'Verifying utilities (AC, water, power)…', 'Preparing arrival documents…', 'Ready to finish.'];
  var stepIdx = 0;
  var pct = 8;
  var timer = setInterval(function () {
    pct = Math.min(96, pct + 12);
    document.getElementById('progress-bar').style.width = pct + '%';
    if (pct > (stepIdx + 1) * 20 && stepIdx < steps.length - 1) stepIdx++;
    document.getElementById('progress-label').textContent = steps[stepIdx];
  }, 700);

  var elapsedTimer = setInterval(function () {
    var secs = Math.floor((new Date() - startTime) / 1000);
    var mm = String(Math.floor(secs / 60)).padStart(2, '0');
    var ss = String(secs % 60).padStart(2, '0');
    document.getElementById('pv-elapsed').textContent = mm + ':' + ss;
  }, 1000);

  function stopTimers() { clearInterval(timer); clearInterval(elapsedTimer); }

  document.getElementById('btn-cancel-checkin').addEventListener('click', function () {
    BOOK.confirmAction('Cancel this check-in process for ' + villa.name + '? Progress will not be saved.', function () {
      stopTimers();
      MM.showToast('Check-in cancelled.', { danger: true });
      setTimeout(function () { window.location.href = '../book-032-check-in/index.html'; }, 500);
    }, { title: 'Cancel check-in' });
  });

  document.getElementById('btn-finish-checkin').addEventListener('click', function () {
    var btn = this;
    var original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Finishing…';
    stopTimers();
    document.getElementById('progress-bar').style.width = '100%';
    document.getElementById('progress-label').textContent = 'Completed.';
    MM.simulateSave(function () {
      var endTime = new Date();
      var entry = {
        id: controlId, property: villa.name, staff: 'Somchai Anuwat',
        start: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        end: endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        gps: villa ? '7.9,98.3' : '—', comments: 'Recorded via on-site Check-in Progress flow.'
      };
      var saved = [];
      try { saved = JSON.parse(localStorage.getItem('mm_checkin_controls_extra') || '[]'); } catch (e) {}
      saved.unshift(entry);
      localStorage.setItem('mm_checkin_controls_extra', JSON.stringify(saved));
      MM.showToast('Check-in completed for ' + villa.name + '.');
      setTimeout(function () { window.location.href = '../book-029-check-in-control/index.html'; }, 700);
    });
  });
});
