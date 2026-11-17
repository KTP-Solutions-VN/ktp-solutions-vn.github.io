(function () {
  'use strict';
  function tick() {
    document.getElementById('clock-time').textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);

  setTimeout(function () {
    document.getElementById('location-text').textContent = 'I am at Phuket Collection Office';
  }, 800);

  document.getElementById('start-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Starting...', function () { document.getElementById('status-text').textContent = 'Day started at ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); MM.showToast('Workday started'); });
  });
  document.getElementById('end-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Ending...', function () { document.getElementById('status-text').textContent = 'Day ended at ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); MM.showToast('Workday ended'); });
  });
  document.getElementById('dayoff-btn').addEventListener('click', function () {
    MM.simulateSave(this, 'Saving...', function () { document.getElementById('status-text').textContent = 'Marked as day off today'; MM.showToast('Day off recorded'); });
  });
})();
