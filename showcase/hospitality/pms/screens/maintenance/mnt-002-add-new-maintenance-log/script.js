(function () {
  'use strict';
  var MNT = MM.MNT;
  var photoCount = 0;

  function populate() {
    var villaSel = document.getElementById('f-villa');
    (MM.MOCK_PROPERTIES || []).forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p.name; opt.textContent = p.name + ' — ' + p.bu;
      villaSel.appendChild(opt);
    });
    var catSel = document.getElementById('f-category');
    MNT.getCategories().forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id; opt.textContent = c.name;
      catSel.appendChild(opt);
    });
    renderPriorityPills(null);
  }

  function renderPriorityPills(activeId) {
    var wrap = document.getElementById('priority-pills');
    wrap.innerHTML = MNT.getPriorities().map(function (p) {
      var sel = p.id === activeId ? ' selected' : '';
      return '<span class="priority-pill' + sel + '" style="--pill-color:' + p.color + ';">' + p.name + '</span>';
    }).join('');
  }

  function addPhotoRow() {
    photoCount++;
    var row = document.createElement('div');
    row.className = 'photo-row';
    row.innerHTML = '<span class="photo-row__thumb"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></span>' +
      '<input type="file" accept="image/*">' +
      '<button type="button" class="btn btn-ghost btn-sm remove-photo-btn" aria-label="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    var fileInput = row.querySelector('input[type="file"]');
    var thumb = row.querySelector('.photo-row__thumb');
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) { thumb.innerHTML = '<img src="' + e.target.result + '" alt="">'; };
      reader.readAsDataURL(file);
    });
    row.querySelector('.remove-photo-btn').addEventListener('click', function () { row.remove(); });
    document.getElementById('photo-rows').appendChild(row);
  }

  document.addEventListener('DOMContentLoaded', function () {
    populate();
    MM.bindFormValidation(document.getElementById('log-form'));

    document.getElementById('f-category').addEventListener('change', function () {
      var cat = MNT.getCategories().find(function (c) { return c.id === this.value; }, this);
      renderPriorityPills(cat ? cat.priorityId : null);
    });

    document.getElementById('add-photo-btn').addEventListener('click', addPhotoRow);

    document.getElementById('save-btn').addEventListener('click', function () {
      var form = document.getElementById('log-form');
      if (!MM.validateForm(form)) { MM.showToast('Please fill in all required fields.', { danger: true }); return; }
      var catId = document.getElementById('f-category').value;
      var cat = MNT.getCategories().find(function (c) { return c.id === catId; });
      var priority = MNT.getPriorities().find(function (p) { return p.id === (cat ? cat.priorityId : null); });
      var responseHours = priority ? priority.responseTime : 72;

      MM.simulateSave(document.getElementById('save-btn'), 'Saving...', function () {
        var now = new Date();
        var due = new Date(now.getTime() + responseHours * 3600000);
        var log = {
          id: MM.uid('MT').toUpperCase(),
          property: document.getElementById('f-villa').value,
          category: catId,
          description: document.getElementById('f-description').value.trim(),
          priority: cat ? cat.priorityId : null,
          status: 'Pending',
          assignee: null,
          openBy: 'Somchai Anuwat (Business Unit Manager)',
          openDate: now.toISOString().slice(0, 10),
          dueDate: due.toISOString().slice(0, 10)
        };
        MNT.addLog(log);
        MM.showToast('Maintenance log created');
        setTimeout(function () { window.location.href = '../mnt-001-maintenance-ticket-list/index.html'; }, 700);
      });
    });
  });
})();
