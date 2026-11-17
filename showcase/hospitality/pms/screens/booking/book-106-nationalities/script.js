(function () {
  'use strict';
  var BOOK = MM.BOOK;

  var editingId = null;
  var pendingDeleteId = null;

  function currentCountry() { return document.getElementById('f-country').value; }

  function assignedNationalities(country) {
    var out = [];
    BOOK.getNationalityGroups(country).forEach(function (g) { out = out.concat(g.nationalities); });
    return out;
  }

  function fillNationalitySelect(country, excludeGroupId) {
    var assigned = assignedNationalities(country);
    var editingGroup = excludeGroupId ? BOOK.getNationalityGroups(country).filter(function (g) { return g.id === excludeGroupId; })[0] : null;
    var available = (BOOK.ALL_NATIONALITIES || []).filter(function (n) {
      return assigned.indexOf(n) === -1 || (editingGroup && editingGroup.nationalities.indexOf(n) !== -1);
    });
    document.getElementById('gf-nationalities').innerHTML = available.map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
  }

  function render() {
    var country = currentCountry();
    var groups = BOOK.getNationalityGroups(country);
    document.getElementById('group-list').innerHTML = groups.length ? groups.map(function (g) {
      return '<div class="nat-card">' +
        '<div class="nat-card__header"><h3 class="nat-card__title">' + g.name + '</h3>' +
          '<div><button class="btn btn-ghost btn-sm" data-edit="' + g.id + '">Edit</button> <button class="btn btn-ghost btn-sm" data-delete="' + g.id + '">Delete</button></div>' +
        '</div>' +
        '<div class="nat-card__tags">' + g.nationalities.map(function (n) { return '<span class="nat-tag">' + n + '</span>'; }).join('') + '</div>' +
        '<p class="nat-card__behaviour">' + g.behaviour + '</p>' +
      '</div>';
    }).join('') : '<div class="empty-state"><p>No nationality groups for this country yet.</p></div>';

    var assigned = assignedNationalities(country);
    var unassigned = (BOOK.ALL_NATIONALITIES || []).filter(function (n) { return assigned.indexOf(n) === -1; });
    document.getElementById('unassigned-tags').innerHTML = unassigned.length ? unassigned.map(function (n) { return '<span class="nat-tag nat-tag--muted">' + n + '</span>'; }).join('') : '<span class="text-sm text-muted">All nationalities are assigned.</span>';

    fillNationalitySelect(country, editingId);
  }

  function resetForm() {
    editingId = null;
    document.getElementById('form-title').textContent = 'New Group';
    document.getElementById('group-form').reset();
    fillNationalitySelect(currentCountry(), null);
  }

  document.getElementById('f-country').addEventListener('change', function () { resetForm(); render(); });

  document.getElementById('group-list').addEventListener('click', function (e) {
    var editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      var country = currentCountry();
      var g = BOOK.getNationalityGroups(country).filter(function (x) { return x.id === editBtn.getAttribute('data-edit'); })[0];
      if (!g) return;
      editingId = g.id;
      document.getElementById('form-title').textContent = 'Edit Group';
      document.getElementById('gf-name').value = g.name;
      document.getElementById('gf-behaviour').value = g.behaviour;
      fillNationalitySelect(country, g.id);
      Array.prototype.forEach.call(document.getElementById('gf-nationalities').options, function (opt) {
        opt.selected = g.nationalities.indexOf(opt.value) !== -1;
      });
      return;
    }
    var delBtn = e.target.closest('[data-delete]');
    if (delBtn) { pendingDeleteId = delBtn.getAttribute('data-delete'); MM.openModal('delete-modal'); }
  });

  document.getElementById('gf-cancel-btn').addEventListener('click', resetForm);

  var groupForm = document.getElementById('group-form');
  MM.bindFormValidation(groupForm);
  document.getElementById('gf-save-btn').addEventListener('click', function () {
    var selected = Array.prototype.filter.call(document.getElementById('gf-nationalities').options, function (o) { return o.selected; }).map(function (o) { return o.value; });
    if (!MM.validateForm(groupForm) || !selected.length) {
      if (!selected.length) MM.showToast('Select at least one nationality', { danger: true });
      return;
    }
    MM.simulateSave(document.getElementById('gf-save-btn'), 'Saving...', function () {
      var country = currentCountry();
      BOOK.saveNationalityGroup(country, {
        id: editingId || MM.uid('NG'),
        name: document.getElementById('gf-name').value.trim(),
        nationalities: selected,
        behaviour: document.getElementById('gf-behaviour').value.trim()
      });
      MM.showToast(editingId ? 'Group updated' : 'Group created');
      resetForm();
      render();
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', function () {
    if (!pendingDeleteId) return;
    BOOK.deleteNationalityGroup(currentCountry(), pendingDeleteId);
    pendingDeleteId = null;
    MM.closeModal('delete-modal');
    MM.showToast('Group deleted');
    resetForm();
    render();
  });

  resetForm();
  render();
})();
