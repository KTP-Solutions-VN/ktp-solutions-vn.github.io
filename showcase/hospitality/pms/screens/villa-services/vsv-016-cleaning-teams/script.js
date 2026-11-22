(function () {
  'use strict';
  var VSV = MM.VSV;
  var STORAGE_KEY = 'mm_vsv_cleaning_teams';
  var TODAY = '2026-09-03';

  function loadAll() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; } }
  function saveAll(map) { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }

  function seedIfEmpty() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    var seed = {};
    seed[TODAY] = [
      { id: 'CT-01', bu: 'Sentosa Collection', teamName: 'Sentosa Team A', cleaners: ['CLN-01', 'CLN-02'], vehicle: 'Truck 01 (Sentosa)' },
      { id: 'CT-02', bu: 'Byron Bay Retreats', teamName: 'Byron Bay Team A', cleaners: ['CLN-03'], vehicle: 'Van 01 (Byron Bay)' }
    ];
    saveAll(seed);
  }
  seedIfEmpty();

  function cleanerName(id) { var c = VSV.CLEANING_STAFF.find(function (x) { return x.id === id; }); return c ? c.name : id; }

  function populateFixedSelects() {
    var buSel = document.getElementById('f-bu');
    VSV.BUSINESS_UNITS.forEach(function (bu) { var o = document.createElement('option'); o.value = bu; o.textContent = bu; buSel.appendChild(o); });
    document.getElementById('f-date').value = TODAY;
    buSel.value = VSV.BUSINESS_UNITS[0];
    ['tf-vehicle', 'ef-vehicle'].forEach(function (id) {
      var sel = document.getElementById(id);
      if (id === 'tf-vehicle') { var ph = document.createElement('option'); ph.value = ''; ph.textContent = 'Select a vehicle…'; sel.appendChild(ph); }
      VSV.VEHICLES.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); });
    });
  }

  function teamsForDateBu(date, bu) {
    var all = loadAll();
    return (all[date] || []).filter(function (t) { return t.bu === bu; });
  }

  function assignedCleanerIds(date, bu, excludeTeamId) {
    return teamsForDateBu(date, bu)
      .filter(function (t) { return t.id !== excludeTeamId; })
      .reduce(function (acc, t) { return acc.concat(t.cleaners); }, []);
  }

  function populateCleanerSelect(selectEl, date, bu, preselected, excludeTeamId) {
    selectEl.innerHTML = '';
    var assigned = assignedCleanerIds(date, bu, excludeTeamId);
    VSV.CLEANING_STAFF.filter(function (c) { return c.bu === bu; }).forEach(function (c) {
      if (assigned.indexOf(c.id) !== -1 && (!preselected || preselected.indexOf(c.id) === -1)) return;
      var o = document.createElement('option');
      o.value = c.id; o.textContent = c.name;
      if (preselected && preselected.indexOf(c.id) !== -1) o.selected = true;
      selectEl.appendChild(o);
    });
  }

  function currentDateBu() {
    return { date: document.getElementById('f-date').value, bu: document.getElementById('f-bu').value };
  }

  function render() {
    var ctx = currentDateBu();
    var teams = teamsForDateBu(ctx.date, ctx.bu);
    document.getElementById('result-count').textContent = teams.length + ' team' + (teams.length === 1 ? '' : 's');

    var tbody = document.getElementById('teams-tbody');
    var empty = document.getElementById('teams-empty');
    if (!teams.length) { tbody.innerHTML = ''; empty.hidden = false; }
    else {
      empty.hidden = true;
      tbody.innerHTML = teams.map(function (t) {
        return '<tr>' +
          '<td class="cell-strong">' + t.teamName + '</td>' +
          '<td><div class="cleaner-chip-list">' + t.cleaners.map(function (id) { return '<span class="cleaner-chip">' + cleanerName(id) + '</span>'; }).join('') + '</div></td>' +
          '<td>' + t.vehicle + '</td>' +
          '<td style="text-align:right;"><div class="row-actions">' +
            '<button class="btn btn-outline btn-sm" data-edit="' + t.id + '">Edit</button>' +
            '<button class="btn btn-ghost btn-sm" data-delete="' + t.id + '">Delete</button>' +
          '</div></td>' +
          '</tr>';
      }).join('');
      tbody.querySelectorAll('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { openEdit(b.getAttribute('data-edit')); }); });
      tbody.querySelectorAll('[data-delete]').forEach(function (b) { b.addEventListener('click', function () { openDelete(b.getAttribute('data-delete')); }); });
    }

    populateCleanerSelect(document.getElementById('tf-cleaners'), ctx.date, ctx.bu, [], null);

    /* All-BU summary for the selected date */
    var all = loadAll();
    var dayTeams = all[ctx.date] || [];
    document.getElementById('all-bu-count').textContent = dayTeams.length + ' team' + (dayTeams.length === 1 ? '' : 's') + ' across all business units';
    var allTbody = document.getElementById('allbu-tbody');
    allTbody.innerHTML = dayTeams.length ? dayTeams.map(function (t) {
      return '<tr>' +
        '<td>' + t.bu + '</td>' +
        '<td class="cell-strong">' + t.teamName + '</td>' +
        '<td>' + t.cleaners.map(cleanerName).join(', ') + '</td>' +
        '<td>' + VSV.fmtDate(ctx.date) + '</td>' +
        '<td>' + t.vehicle + '</td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="5" class="text-muted text-sm" style="text-align:center;padding:20px;">No teams created for this date yet.</td></tr>';
  }

  document.getElementById('f-date').addEventListener('change', render);
  document.getElementById('f-bu').addEventListener('change', render);

  /* -------------------- Create team -------------------- */
  var teamForm = document.getElementById('team-form');
  MM.bindFormValidation(teamForm);

  document.getElementById('tf-reset').addEventListener('click', function () {
    setTimeout(function () { render(); }, 0);
  });

  teamForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var cleanersSel = document.getElementById('tf-cleaners');
    var selectedCleaners = Array.prototype.slice.call(cleanersSel.selectedOptions).map(function (o) { return o.value; });
    var valid = MM.validateForm(teamForm);
    if (!selectedCleaners.length) {
      cleanersSel.closest('.form-group').classList.add('has-error');
      cleanersSel.closest('.form-group').querySelector('.form-error').textContent = 'Select at least one cleaner.';
      valid = false;
    }
    if (!valid) { MM.showToast('Please complete the required fields.', { danger: true }); return; }

    var btn = document.getElementById('tf-save');
    MM.simulateSave(btn, 'Saving...', function () {
      var ctx = currentDateBu();
      var all = loadAll();
      all[ctx.date] = all[ctx.date] || [];
      all[ctx.date].push({
        id: VSV.uid('CT'),
        bu: ctx.bu,
        teamName: document.getElementById('tf-name').value.trim(),
        cleaners: selectedCleaners,
        vehicle: document.getElementById('tf-vehicle').value
      });
      saveAll(all);
      teamForm.reset();
      MM.showToast('Cleaning team saved.');
      render();
    });
  });

  /* -------------------- Edit team -------------------- */
  var editingId = null;
  function openEdit(id) {
    var ctx = currentDateBu();
    var team = teamsForDateBu(ctx.date, ctx.bu).find(function (t) { return t.id === id; });
    if (!team) return;
    editingId = id;
    document.getElementById('et-subtitle').textContent = team.bu + ' · ' + VSV.fmtDate(ctx.date);
    document.getElementById('ef-name').value = team.teamName;
    document.getElementById('ef-vehicle').innerHTML = '';
    VSV.VEHICLES.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; if (v === team.vehicle) o.selected = true; document.getElementById('ef-vehicle').appendChild(o); });
    populateCleanerSelect(document.getElementById('ef-cleaners'), ctx.date, ctx.bu, team.cleaners, id);
    document.getElementById('edit-team-form').querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
    MM.openModal('edit-team-modal');
  }

  document.getElementById('edit-team-save').addEventListener('click', function () {
    var form = document.getElementById('edit-team-form');
    var cleanersSel = document.getElementById('ef-cleaners');
    var selectedCleaners = Array.prototype.slice.call(cleanersSel.selectedOptions).map(function (o) { return o.value; });
    var valid = MM.validateForm(form);
    if (!selectedCleaners.length) {
      cleanersSel.closest('.form-group').classList.add('has-error');
      cleanersSel.closest('.form-group').querySelector('.form-error').textContent = 'Select at least one cleaner.';
      valid = false;
    }
    if (!valid) { MM.showToast('Please complete the required fields.', { danger: true }); return; }
    var btn = this;
    MM.simulateSave(btn, 'Saving...', function () {
      var ctx = currentDateBu();
      var all = loadAll();
      var list = all[ctx.date] || [];
      var idx = list.findIndex(function (t) { return t.id === editingId; });
      if (idx !== -1) {
        list[idx].teamName = document.getElementById('ef-name').value.trim();
        list[idx].vehicle = document.getElementById('ef-vehicle').value;
        list[idx].cleaners = selectedCleaners;
      }
      all[ctx.date] = list;
      saveAll(all);
      MM.closeModal('edit-team-modal');
      MM.showToast('Team updated.');
      render();
    });
  });

  /* -------------------- Delete team -------------------- */
  var deletingId = null;
  function openDelete(id) {
    var ctx = currentDateBu();
    var team = teamsForDateBu(ctx.date, ctx.bu).find(function (t) { return t.id === id; });
    if (!team) return;
    deletingId = id;
    document.getElementById('dt-name').textContent = team.teamName;
    MM.openModal('delete-team-modal');
  }
  document.getElementById('delete-team-btn').addEventListener('click', function () {
    var btn = this;
    MM.simulateSave(btn, 'Deleting...', function () {
      var ctx = currentDateBu();
      var all = loadAll();
      all[ctx.date] = (all[ctx.date] || []).filter(function (t) { return t.id !== deletingId; });
      saveAll(all);
      MM.closeModal('delete-team-modal');
      MM.showToast('Team deleted.');
      render();
    });
  });

  populateFixedSelects();
  render();
})();
