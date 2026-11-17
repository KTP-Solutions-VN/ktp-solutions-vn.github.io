(function () {
  'use strict';
  var PANELS = [
    { title: 'Welcome to Villa Management', text: 'Azura Stays manages a portfolio of luxury villas across Phuket, Bali, and Koh Samui — each with its own concierge team, maintenance crew, and service standards.' },
    { title: 'Your Role in the Team', text: 'Whichever role you hold — concierge, housekeeping, maintenance, or front office — your work directly shapes the guest experience and the villa\'s reputation.' },
    { title: 'Getting Started', text: 'Explore the Tutorial Library for role-specific lessons, and check My Training Record to see what refreshers are coming due.' }
  ];
  var idx = 0;

  function render() {
    document.getElementById('panel-counter').textContent = (idx + 1) + ' of ' + PANELS.length;
    document.getElementById('panel-title').textContent = PANELS[idx].title;
    document.getElementById('panel-text').textContent = PANELS[idx].text;
    document.getElementById('progress-bar').style.width = (((idx + 1) / PANELS.length) * 100) + '%';
    document.getElementById('prev-btn').disabled = idx === 0;
    document.getElementById('next-btn').textContent = idx === PANELS.length - 1 ? 'Done' : 'Next';
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('prev-btn').addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
    document.getElementById('next-btn').addEventListener('click', function () {
      if (idx < PANELS.length - 1) { idx++; render(); }
      else { window.location.href = '../trn-001-training-list/index.html'; }
    });
    document.getElementById('stop-btn').addEventListener('click', function () { window.location.href = '../trn-001-training-list/index.html'; });
  });
})();
