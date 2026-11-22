(function () {
  'use strict';

  var PROPERTY_TYPES = ['Discover the villa', 'Arrival', 'Departure', 'Equipment', 'Troubleshooting'];
  var COUNTRY_TYPES = ['Marketing', 'Rules', 'Local Guide', 'Training'];
  var COUNTRIES = ['Singapore', 'Australia', 'New Zealand'];

  var SEED = [
    { id: 'VID-01', category: 'property', title: 'Discover Villa Sapphire Cliff', desc: 'A cinematic walkthrough of the villa\'s grounds, pool, and living areas.', target: 'Villa Sapphire Cliff', type: 'Discover the villa', lang: 'English', duration: '3:24', tone: 'Factual', guestPortal: true, author: 'Daniel T.', date: '2026-08-10' },
    { id: 'VID-02', category: 'property', title: 'Arrival Guide — Villa Lotus Bay', desc: 'Step-by-step arrival instructions including gate code and parking.', target: 'Villa Lotus Bay', type: 'Arrival', lang: 'English', duration: '2:10', tone: 'Factual', guestPortal: false, author: 'Adam P.', date: '2026-08-05' },
    { id: 'VID-03', category: 'property', title: 'Smart TV & Sound System', desc: 'How to operate the entertainment system in the living room.', target: 'Villa Amber Ridge', type: 'Equipment', lang: 'English', duration: '1:48', tone: 'Humoristic', guestPortal: false, author: 'Natalie S.', date: '2026-07-28' },
    { id: 'VID-04', category: 'country', title: 'Welcome to Singapore', desc: 'Marketing reel showcasing the Singapore collection of villas.', target: 'Singapore', type: 'Marketing', lang: 'English', duration: '4:02', tone: 'Factual', guestPortal: false, author: 'Management', date: '2026-07-15' },
    { id: 'VID-05', category: 'country', title: 'House Rules — Australia Villas', desc: 'Standard house rules briefing for all Australia properties.', target: 'Australia', type: 'Rules', lang: 'English', duration: '2:55', tone: 'Factual', guestPortal: false, author: 'Operations', date: '2026-07-02' }
  ];

  function getHidden() { return JSON.parse(localStorage.getItem('mm_vid_videos_hidden') || '[]'); }
  function getExtra() { return JSON.parse(localStorage.getItem('mm_vid_videos') || '[]'); }
  function saveExtra(list) { localStorage.setItem('mm_vid_videos', JSON.stringify(list)); }
  function getAll() {
    var hidden = getHidden();
    return SEED.filter(function (v) { return hidden.indexOf(v.id) === -1; }).concat(getExtra());
  }

  var state = { tab: 'property', typeFilter: null };

  function fillSelect(el, options, placeholder) {
    el.innerHTML = '<option value="">' + placeholder + '</option>' + options.map(function (o) { return '<option>' + o + '</option>'; }).join('');
  }
  fillSelect(document.getElementById('f-bu'), MM.MOCK_PROPERTIES.map(function (p) { return p.bu; }).filter(function (v, i, a) { return a.indexOf(v) === i; }), 'All Business Units');
  fillSelect(document.getElementById('f-property'), MM.MOCK_PROPERTIES.map(function (p) { return p.name; }), 'All Properties');
  fillSelect(document.getElementById('f-country'), COUNTRIES, 'All Countries');

  function renderChips() {
    var types = state.tab === 'property' ? PROPERTY_TYPES : COUNTRY_TYPES;
    document.getElementById('type-chips').innerHTML = types.map(function (t) {
      return '<button type="button" class="chip' + (state.typeFilter === t ? ' active' : '') + '" data-type="' + t + '">' + t + '</button>';
    }).join('');
  }

  function guestPortalBadge(v) {
    if (v.category !== 'property') return '';
    return '<span class="badge badge-' + (v.guestPortal ? 'success' : 'neutral') + ' video-card__guest-badge">' + (v.guestPortal ? 'Guest Hub' : 'Hidden') + '</span>';
  }

  function render() {
    var q = document.getElementById('f-search').value.trim().toLowerCase();
    var bu = document.getElementById('f-bu').value;
    var property = document.getElementById('f-property').value;
    var country = document.getElementById('f-country').value;

    var items = getAll().filter(function (v) { return v.category === state.tab; });
    if (state.typeFilter) items = items.filter(function (v) { return v.type === state.typeFilter; });
    if (q) items = items.filter(function (v) { return (v.title + ' ' + v.desc).toLowerCase().indexOf(q) !== -1; });
    if (state.tab === 'property') {
      if (property) items = items.filter(function (v) { return v.target === property; });
      if (bu) {
        var propsInBu = MM.MOCK_PROPERTIES.filter(function (p) { return p.bu === bu; }).map(function (p) { return p.name; });
        items = items.filter(function (v) { return propsInBu.indexOf(v.target) !== -1; });
      }
    } else if (country) {
      items = items.filter(function (v) { return v.target === country; });
    }

    var grid = document.getElementById('video-grid');
    if (!items.length) {
      grid.innerHTML = '<div class="empty-state"><p>No videos match your filters.</p></div>';
      return;
    }
    grid.innerHTML = items.map(function (v) {
      return '<div class="video-card">' +
        '<div class="video-card__preview" data-play="' + v.id + '">' +
          guestPortalBadge(v) +
          '<button class="video-card__play" data-play="' + v.id + '"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg></button>' +
          '<span class="video-card__duration">' + v.duration + '</span>' +
        '</div>' +
        '<div class="video-card__body">' +
          '<h3 class="video-card__title">' + v.title + '</h3>' +
          '<div class="video-card__meta">' + v.lang + ' · ' + v.type + ' · ' + v.tone + '</div>' +
          '<p class="video-card__desc">' + v.desc + '</p>' +
          '<div class="video-card__meta">' + v.author + ' · ' + v.date + '</div>' +
          '<div class="video-card__footer">' +
            (v.category === 'property' ? '<label class="switch"><input type="checkbox" data-toggle-gp="' + v.id + '"' + (v.guestPortal ? ' checked' : '') + '><span class="switch-slider"></span></label>' : '<span></span>') +
            '<div>' +
              '<button class="btn btn-ghost btn-sm" data-download="' + v.title + '" title="Download"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg></button>' +
              '<button class="btn btn-ghost btn-sm" data-edit="' + v.id + '" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>' +
              '<button class="btn btn-ghost btn-sm" data-delete="' + v.id + '" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  document.querySelectorAll('[data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      state.tab = tab.getAttribute('data-tab');
      state.typeFilter = null;
      document.querySelectorAll('[data-scope]').forEach(function (el) {
        el.style.display = el.getAttribute('data-scope') === state.tab ? '' : 'none';
      });
      renderChips();
      render();
    });
  });

  document.getElementById('type-chips').addEventListener('click', function (e) {
    var chip = e.target.closest('[data-type]');
    if (!chip) return;
    var type = chip.getAttribute('data-type');
    state.typeFilter = state.typeFilter === type ? null : type;
    renderChips();
    render();
  });

  ['f-search', 'f-bu', 'f-property', 'f-country'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', render);
    document.getElementById(id).addEventListener('change', render);
  });

  var pendingId = null;
  var playTimer = null;

  document.getElementById('video-grid').addEventListener('click', function (e) {
    var playEl = e.target.closest('[data-play]');
    if (playEl) {
      var v = getAll().filter(function (x) { return x.id === playEl.getAttribute('data-play'); })[0];
      if (!v) return;
      document.getElementById('view-video-title').textContent = v.title;
      document.getElementById('view-video-desc').textContent = v.desc;
      document.getElementById('video-player-progress').style.width = '0%';
      MM.openModal('view-modal');
      return;
    }
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) { openForm(getAll().filter(function (x) { return x.id === editBtn.getAttribute('data-edit'); })[0]); return; }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      pendingId = delBtn.getAttribute('data-delete');
      var vv = getAll().filter(function (x) { return x.id === pendingId; })[0];
      document.getElementById('delete-video-title').textContent = vv ? vv.title : 'this video';
      MM.openModal('delete-modal');
      return;
    }
    var dlBtn = e.target.closest('[data-download]');
    if (dlBtn) { MM.showToast('Downloading "' + dlBtn.getAttribute('data-download') + '"...'); return; }
    var gpToggle = e.target.closest('[data-toggle-gp]');
    if (gpToggle) {
      var id = gpToggle.getAttribute('data-toggle-gp');
      var isSeed = SEED.some(function (x) { return x.id === id; });
      if (isSeed) {
        var idx = SEED.findIndex(function (x) { return x.id === id; });
        SEED[idx].guestPortal = gpToggle.checked;
      } else {
        var extra = getExtra();
        var ei = extra.findIndex(function (x) { return x.id === id; });
        if (ei !== -1) { extra[ei].guestPortal = gpToggle.checked; saveExtra(extra); }
      }
      MM.showToast(gpToggle.checked ? 'Set as Guest Hub video' : 'Removed from Guest Hub');
      render();
    }
  });

  document.getElementById('video-player-toggle').addEventListener('click', function () {
    var bar = document.getElementById('video-player-progress');
    if (playTimer) { clearInterval(playTimer); playTimer = null; return; }
    var pct = 0;
    playTimer = setInterval(function () {
      pct += 4;
      if (pct >= 100) { pct = 100; clearInterval(playTimer); playTimer = null; }
      bar.style.width = pct + '%';
    }, 200);
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingId) return;
    var isSeed = SEED.some(function (x) { return x.id === pendingId; });
    if (isSeed) {
      var hidden = getHidden();
      hidden.push(pendingId);
      localStorage.setItem('mm_vid_videos_hidden', JSON.stringify(hidden));
    } else {
      saveExtra(getExtra().filter(function (x) { return x.id !== pendingId; }));
    }
    pendingId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Video deleted');
    render();
  });

  function fillTypeSelect() {
    var cat = document.getElementById('vf-category').value;
    var types = cat === 'property' ? PROPERTY_TYPES : COUNTRY_TYPES;
    document.getElementById('vf-type').innerHTML = types.map(function (t) { return '<option>' + t + '</option>'; }).join('');
    var targets = cat === 'property' ? MM.MOCK_PROPERTIES.map(function (p) { return p.name; }) : COUNTRIES;
    document.getElementById('vf-target').innerHTML = targets.map(function (t) { return '<option>' + t + '</option>'; }).join('');
  }
  document.getElementById('vf-category').addEventListener('change', fillTypeSelect);

  var editingId = null;
  function openForm(video) {
    editingId = video ? video.id : null;
    document.getElementById('video-form-title').textContent = video ? 'Edit Video' : 'Add Video';
    document.getElementById('video-form').reset();
    document.getElementById('vf-category').value = video ? video.category : state.tab;
    fillTypeSelect();
    if (video) {
      document.getElementById('vf-title').value = video.title;
      document.getElementById('vf-target').value = video.target;
      document.getElementById('vf-type').value = video.type;
      document.getElementById('vf-lang').value = video.lang;
      document.getElementById('vf-tone').value = video.tone;
      document.getElementById('vf-desc').value = video.desc;
      document.getElementById('vf-guest-portal').checked = !!video.guestPortal;
    } else {
      document.getElementById('vf-guest-portal').checked = false;
    }
    MM.openModal('video-form-modal');
  }
  document.getElementById('new-video-btn').addEventListener('click', function () { openForm(null); });

  var videoForm = document.getElementById('video-form');
  MM.bindFormValidation(videoForm);
  videoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!MM.validateForm(videoForm)) return;
    MM.simulateSave(document.getElementById('video-save-btn'), 'Saving...', function () {
      var payload = {
        category: document.getElementById('vf-category').value,
        title: document.getElementById('vf-title').value.trim(),
        target: document.getElementById('vf-target').value,
        type: document.getElementById('vf-type').value,
        lang: document.getElementById('vf-lang').value,
        tone: document.getElementById('vf-tone').value,
        desc: document.getElementById('vf-desc').value.trim(),
        duration: '2:30',
        guestPortal: document.getElementById('vf-guest-portal').checked,
        author: 'You',
        date: new Date().toISOString().slice(0, 10)
      };
      if (editingId) {
        var isSeed = SEED.some(function (x) { return x.id === editingId; });
        if (isSeed) {
          var idx = SEED.findIndex(function (x) { return x.id === editingId; });
          SEED[idx] = Object.assign({}, SEED[idx], payload);
        } else {
          var extra = getExtra();
          var ei = extra.findIndex(function (x) { return x.id === editingId; });
          if (ei !== -1) { extra[ei] = Object.assign({}, extra[ei], payload); saveExtra(extra); }
        }
      } else {
        payload.id = MM.uid('vid');
        var stored = getExtra();
        stored.push(payload);
        saveExtra(stored);
      }
      MM.closeModal('video-form-modal');
      MM.showToast(editingId ? 'Video updated' : 'Video added');
      render();
    });
  });

  renderChips();
  render();
})();
