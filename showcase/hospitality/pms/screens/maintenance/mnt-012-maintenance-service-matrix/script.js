(function () {
  'use strict';
  var MNT = MM.MNT;
  var ctx = {}; // holds current modal context (catId, subId, issueId, deleteType)
  var openCats = {};
  var openSubs = {};

  function iconBtn(action, id, title) {
    var icons = {
      add: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      del: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'
    };
    var kind = action.indexOf('add') === 0 ? 'add' : (action.indexOf('edit') === 0 ? 'edit' : 'del');
    return '<button type="button" class="btn btn-ghost btn-sm" data-' + action + '="' + id + '" title="' + title + '"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + icons[kind] + '</svg></button>';
  }

  function matches(text, q) { return !q || text.toLowerCase().indexOf(q) > -1; }

  function render() {
    var q = document.getElementById('search-input').value.trim().toLowerCase();
    var priFilter = document.getElementById('f-priority').value;
    var cats = MNT.getMatrix();
    var wrap = document.getElementById('matrix-tree');
    var totalIssues = 0;
    var anyVisible = false;

    var html = cats.map(function (cat) {
      var subsHtml = (cat.subcategories || []).map(function (sub) {
        var issuesHtml = (sub.issues || []).filter(function (iss) {
          if (priFilter && iss.priorityId !== priFilter) return false;
          if (!q) return true;
          return matches(iss.name, q) || matches(sub.name, q) || matches(cat.name, q);
        }).map(function (iss) {
          totalIssues++;
          return '<div class="matrix-issue">' +
            '<span class="matrix-issue__name">' + iss.name + '</span>' +
            '<select data-quick-priority="' + iss.id + '">' + MNT.getPriorities().map(function (p) { return '<option value="' + p.id + '"' + (p.id === iss.priorityId ? ' selected' : '') + '>' + p.name + '</option>'; }).join('') + '</select>' +
            MNT.statusBadge(iss.status) +
            iconBtn('edit-issue', iss.id, 'Edit issue') + iconBtn('del-issue', iss.id, 'Delete issue') +
            '</div>';
        }).join('');
        if (q && !matches(sub.name, q) && !issuesHtml) return '';
        if (priFilter && !issuesHtml) return '';
        return '<div class="matrix-sub' + (openSubs[sub.id] ? ' open' : '') + '" data-sub-id="' + sub.id + '">' +
          '<div class="matrix-sub__header" data-toggle-sub="' + sub.id + '">' +
          '<svg class="matrix-sub__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
          '<span class="matrix-sub__name">' + sub.name + '</span>' + MNT.statusBadge(sub.status) +
          '<span class="matrix-cat__actions">' + iconBtn('add-issue', sub.id, 'Add issue') + iconBtn('edit-sub', sub.id, 'Edit subcategory') + iconBtn('del-sub', sub.id, 'Delete subcategory') + '</span>' +
          '</div>' +
          '<div class="matrix-sub__body">' + (issuesHtml || '<div class="matrix-empty-branch">No issues yet.</div>') + '</div>' +
          '</div>';
      }).join('');

      if (q && !matches(cat.name, q) && !subsHtml) return '';

      var visible = !q && !priFilter ? true : !!subsHtml || matches(cat.name, q);
      if (visible) anyVisible = true;

      return '<div class="matrix-cat' + (openCats[cat.id] ? ' open' : '') + '" data-cat-id="' + cat.id + '">' +
        '<div class="matrix-cat__header" data-toggle-cat="' + cat.id + '">' +
        '<svg class="matrix-cat__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
        '<span class="matrix-cat__name">' + cat.name + '</span>' + MNT.statusBadge(cat.status) +
        '<span class="matrix-cat__actions">' + iconBtn('add-sub', cat.id, 'Add subcategory') + iconBtn('edit-cat', cat.id, 'Edit category') + iconBtn('del-cat', cat.id, 'Delete category') + '</span>' +
        '</div>' +
        '<div class="matrix-cat__body">' + (subsHtml || '<div class="matrix-empty-branch">No subcategories yet.</div>') + '</div>' +
        '</div>';
    }).join('');

    wrap.innerHTML = html;
    document.getElementById('matrix-empty').hidden = !!html.trim();
    document.getElementById('result-count').textContent = totalIssues + ' issue' + (totalIssues === 1 ? '' : 's');

    wireTreeEvents();
  }

  function wireTreeEvents() {
    document.querySelectorAll('[data-toggle-cat]').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-toggle-cat');
        openCats[id] = !openCats[id];
        render();
      });
    });
    document.querySelectorAll('[data-toggle-sub]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = el.getAttribute('data-toggle-sub');
        openSubs[id] = !openSubs[id];
        render();
      });
    });
    document.querySelectorAll('[data-quick-priority]').forEach(function (sel) {
      sel.addEventListener('click', function (e) { e.stopPropagation(); });
      sel.addEventListener('change', function () {
        var issueId = sel.getAttribute('data-quick-priority');
        var cats = MNT.getMatrix();
        cats.forEach(function (c) { (c.subcategories || []).forEach(function (s) { (s.issues || []).forEach(function (i) { if (i.id === issueId) i.priorityId = sel.value; }); }); });
        MNT.saveMatrix(cats);
        MM.showToast('Priority updated');
      });
    });

    document.querySelectorAll('[data-add-sub]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openSubModal(null, btn.getAttribute('data-add-sub')); }); });
    document.querySelectorAll('[data-edit-cat]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openCatModal(btn.getAttribute('data-edit-cat')); }); });
    document.querySelectorAll('[data-del-cat]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openDelete('category', btn.getAttribute('data-del-cat')); }); });
    document.querySelectorAll('[data-add-issue]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openIssueModal(null, btn.getAttribute('data-add-issue')); }); });
    document.querySelectorAll('[data-edit-sub]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openSubModal(btn.getAttribute('data-edit-sub'), null); }); });
    document.querySelectorAll('[data-del-sub]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openDelete('subcategory', btn.getAttribute('data-del-sub')); }); });
    document.querySelectorAll('[data-edit-issue]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openIssueModal(btn.getAttribute('data-edit-issue'), null); }); });
    document.querySelectorAll('[data-del-issue]').forEach(function (btn) { btn.addEventListener('click', function (e) { e.stopPropagation(); openDelete('issue', btn.getAttribute('data-del-issue')); }); });
  }

  function findCat(catId) { return MNT.getMatrix().find(function (c) { return c.id === catId; }); }
  function findSub(subId) { var res = null; MNT.getMatrix().forEach(function (c) { (c.subcategories || []).forEach(function (s) { if (s.id === subId) res = { cat: c, sub: s }; }); }); return res; }
  function findIssue(issueId) { var res = null; MNT.getMatrix().forEach(function (c) { (c.subcategories || []).forEach(function (s) { (s.issues || []).forEach(function (i) { if (i.id === issueId) res = { cat: c, sub: s, issue: i }; }); }); }); return res; }

  function openCatModal(catId) {
    ctx.catId = catId;
    var cat = catId ? findCat(catId) : null;
    document.getElementById('cat-modal-title').textContent = cat ? 'Edit Category' : 'Add Category';
    document.getElementById('cat-form').reset();
    document.getElementById('cat-bu-checks').innerHTML = MNT.buChecks(cat ? (cat.businessUnits || MNT.BUSINESS_UNITS) : MNT.BUSINESS_UNITS, 'cat');
    document.getElementById('cat-name').value = cat ? cat.name : '';
    document.getElementById('cat-desc').value = cat ? (cat.description || '') : '';
    document.getElementById('cat-status').value = cat ? cat.status : 'Active';
    MM.openModal('cat-modal');
  }

  function openSubModal(subId, parentCatId) {
    ctx.subId = subId;
    ctx.parentCatId = parentCatId;
    var found = subId ? findSub(subId) : null;
    var parentCat = found ? found.cat : findCat(parentCatId);
    document.getElementById('sub-modal-title').textContent = found ? 'Edit Subcategory' : 'Add Subcategory';
    document.getElementById('sub-parent-name').textContent = parentCat ? parentCat.name : '–';
    document.getElementById('sub-form').reset();
    document.getElementById('sub-name').value = found ? found.sub.name : '';
    document.getElementById('sub-status').value = found ? found.sub.status : 'Active';
    MM.openModal('sub-modal');
  }

  function openIssueModal(issueId, parentSubId) {
    ctx.issueId = issueId;
    ctx.parentSubId = parentSubId;
    var found = issueId ? findIssue(issueId) : null;
    var parentSub = found ? found.sub : (findSub(parentSubId) || {}).sub;
    var parentCat = found ? found.cat : (findSub(parentSubId) || {}).cat;
    document.getElementById('issue-modal-title').textContent = found ? 'Edit Issue' : 'Add Issue';
    document.getElementById('issue-parent-name').textContent = (parentCat ? parentCat.name + ' / ' : '') + (parentSub ? parentSub.name : '–');
    var prioritySel = document.getElementById('issue-priority');
    prioritySel.innerHTML = MNT.getPriorities().map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
    document.getElementById('issue-form').reset();
    document.getElementById('issue-name').value = found ? found.issue.name : '';
    if (found) prioritySel.value = found.issue.priorityId;
    document.getElementById('issue-status').value = found ? found.issue.status : 'Active';
    MM.openModal('issue-modal');
  }

  function openDelete(type, id) {
    ctx.deleteType = type; ctx.deleteId = id;
    var name = '';
    if (type === 'category') name = (findCat(id) || {}).name;
    if (type === 'subcategory') name = (findSub(id).sub || {}).name;
    if (type === 'issue') name = (findIssue(id).issue || {}).name;
    var msgs = {
      category: 'Delete category <strong>' + name + '</strong>? All of its subcategories and issues will also be removed.',
      subcategory: 'Delete subcategory <strong>' + name + '</strong>? All of its issues will also be removed.',
      issue: 'Delete issue <strong>' + name + '</strong>? This cannot be undone.'
    };
    document.getElementById('delete-modal-title').textContent = 'Delete ' + type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('delete-modal-body').innerHTML = msgs[type];
    MM.openModal('delete-modal');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var priSel = document.getElementById('f-priority');
    MNT.getPriorities().forEach(function (p) { var o = document.createElement('option'); o.value = p.id; o.textContent = p.name; priSel.appendChild(o); });

    render();
    document.getElementById('search-input').addEventListener('input', render);
    document.getElementById('f-priority').addEventListener('change', render);
    document.getElementById('add-category-btn').addEventListener('click', function () { openCatModal(null); });

    MM.bindFormValidation(document.getElementById('cat-form'));
    MM.bindFormValidation(document.getElementById('sub-form'));
    MM.bindFormValidation(document.getElementById('issue-form'));

    document.getElementById('cat-save-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('cat-form'))) return;
      var bus = Array.from(document.querySelectorAll('.cat-bu-check:checked')).map(function (c) { return c.value; });
      if (!bus.length) { document.getElementById('cat-bu-error').textContent = 'Select at least 1 business unit.'; return; }
      document.getElementById('cat-bu-error').textContent = '';
      MM.simulateSave(document.getElementById('cat-save-btn'), 'Saving...', function () {
        var cats = MNT.getMatrix();
        var name = document.getElementById('cat-name').value.trim();
        var desc = document.getElementById('cat-desc').value.trim();
        var status = document.getElementById('cat-status').value;
        if (ctx.catId) {
          var c = cats.find(function (x) { return x.id === ctx.catId; });
          c.name = name; c.description = desc; c.status = status; c.businessUnits = bus;
        } else {
          cats.push({ id: MM.uid('mcat'), name: name, description: desc, status: status, businessUnits: bus, subcategories: [] });
        }
        MNT.saveMatrix(cats);
        MM.closeModal('cat-modal');
        MM.showToast(ctx.catId ? 'Category updated' : 'Category added');
        render();
      });
    });

    document.getElementById('sub-save-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('sub-form'))) return;
      MM.simulateSave(document.getElementById('sub-save-btn'), 'Saving...', function () {
        var cats = MNT.getMatrix();
        var name = document.getElementById('sub-name').value.trim();
        var status = document.getElementById('sub-status').value;
        if (ctx.subId) {
          cats.forEach(function (c) { (c.subcategories || []).forEach(function (s) { if (s.id === ctx.subId) { s.name = name; s.status = status; } }); });
        } else {
          var cat = cats.find(function (c) { return c.id === ctx.parentCatId; });
          cat.subcategories = cat.subcategories || [];
          cat.subcategories.push({ id: MM.uid('msub'), name: name, status: status, issues: [] });
          openCats[cat.id] = true;
        }
        MNT.saveMatrix(cats);
        MM.closeModal('sub-modal');
        MM.showToast(ctx.subId ? 'Subcategory updated' : 'Subcategory added');
        render();
      });
    });

    document.getElementById('issue-save-btn').addEventListener('click', function () {
      if (!MM.validateForm(document.getElementById('issue-form'))) return;
      MM.simulateSave(document.getElementById('issue-save-btn'), 'Saving...', function () {
        var cats = MNT.getMatrix();
        var name = document.getElementById('issue-name').value.trim();
        var priorityId = document.getElementById('issue-priority').value;
        var status = document.getElementById('issue-status').value;
        if (ctx.issueId) {
          cats.forEach(function (c) { (c.subcategories || []).forEach(function (s) { (s.issues || []).forEach(function (i) { if (i.id === ctx.issueId) { i.name = name; i.priorityId = priorityId; i.status = status; } }); }); });
        } else {
          var found = findSub(ctx.parentSubId);
          found.sub.issues = found.sub.issues || [];
          found.sub.issues.push({ id: MM.uid('iss'), name: name, priorityId: priorityId, status: status });
          openCats[found.cat.id] = true;
          openSubs[found.sub.id] = true;
        }
        MNT.saveMatrix(cats);
        MM.closeModal('issue-modal');
        MM.showToast(ctx.issueId ? 'Issue updated' : 'Issue added');
        render();
      });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', function () {
      var cats = MNT.getMatrix();
      if (ctx.deleteType === 'category') cats = cats.filter(function (c) { return c.id !== ctx.deleteId; });
      if (ctx.deleteType === 'subcategory') cats.forEach(function (c) { c.subcategories = (c.subcategories || []).filter(function (s) { return s.id !== ctx.deleteId; }); });
      if (ctx.deleteType === 'issue') cats.forEach(function (c) { (c.subcategories || []).forEach(function (s) { s.issues = (s.issues || []).filter(function (i) { return i.id !== ctx.deleteId; }); }); });
      MNT.saveMatrix(cats);
      MM.closeModal('delete-modal');
      MM.showToast(ctx.deleteType.charAt(0).toUpperCase() + ctx.deleteType.slice(1) + ' deleted', { danger: true });
      render();
    });
  });
})();
