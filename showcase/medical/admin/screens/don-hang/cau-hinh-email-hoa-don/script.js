
  var STORE_KEY = 'admin_email_templates';
  function getData() { return CJStore.mergeOverrides(DATA_EMAIL_TEMPLATES, STORE_KEY, 'id').concat(CJStore.getExtra(STORE_KEY)); }

  function render() {
    var list = getData();
    document.getElementById('listTbody').innerHTML = list.map(function (t) {
      var appliesLabel = t.appliesToType === 'All categories' ? 'All categories' : (t.appliesToType === 'Business Unit' ? 'BU: ' + t.appliesToValue : t.appliesToType + ': ' + t.appliesToValue);
      return '<tr>' +
        '<td class="cell-strong">' + t.name + '</td>' +
        '<td>' + appliesLabel + '</td>' +
        '<td>' + CJBadge(t.status, { Active: 'success', Inactive: 'neutral' }) + '</td>' +
        '<td class="row-actions"><button class="btn btn-ghost btn-sm btn-icon-only openTemplateBtn" data-id="' + t.id + '" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></button></td>' +
        '</tr>';
    }).join('');
    document.querySelectorAll('.openTemplateBtn').forEach(function (b) {
      b.addEventListener('click', function () { openTemplateDrawer(b.getAttribute('data-id')); });
    });
  }

  /* ---------------- #22 Create/Edit Email/Invoice Template drawer --------- */
  var editingTemplateId = null;
  CJDrawer.bind('templateOverlay');

  function openTemplateDrawer(id) {
    var t = id ? getData().find(function (x) { return x.id === id; }) : null;
    editingTemplateId = t ? t.id : null;
    document.getElementById('etDrawerTitle').textContent = t ? 'Edit Template' : 'New Template';
    document.getElementById('etName').value = t ? t.name : '';
    document.getElementById('etAppliesType').value = t ? t.appliesToType : 'All categories';
    document.getElementById('etAppliesValue').value = t ? t.appliesToValue : '';
    document.getElementById('etContent').value = t ? ('Dear {{customer_name}}, thank you for your order with Meridian Health...') : '';
    document.getElementById('etTerms').checked = !!(t && t.includeTerms);
    document.getElementById('etBranding').checked = t ? !!t.includeBranding : true;
    document.getElementById('etRefundPolicy').checked = !!(t && t.includeRefundPolicy);
    document.getElementById('etActive').checked = t ? t.status === 'Active' : true;
    CJDrawer.open('templateOverlay');
  }
  document.getElementById('createTemplateBtn').addEventListener('click', function () { openTemplateDrawer(null); });

  document.getElementById('etSaveBtn').addEventListener('click', function () {
    var name = document.getElementById('etName').value.trim() || 'Untitled Template';
    var patch = {
      name: name,
      appliesToType: document.getElementById('etAppliesType').value,
      appliesToValue: document.getElementById('etAppliesValue').value.trim() || document.getElementById('etAppliesType').value,
      includeTerms: document.getElementById('etTerms').checked,
      includeBranding: document.getElementById('etBranding').checked,
      includeRefundPolicy: document.getElementById('etRefundPolicy').checked,
      status: document.getElementById('etActive').checked ? 'Active' : 'Inactive'
    };
    if (editingTemplateId) {
      CJStore.setOverride(STORE_KEY, editingTemplateId, patch);
      CJToast('"' + name + '" updated.');
    } else {
      patch.id = 'TPL-NEW-' + Date.now().toString().slice(-4);
      CJStore.addExtra(STORE_KEY, patch);
      CJToast('"' + name + '" created.');
    }
    CJDrawer.close('templateOverlay');
    render();
  });

  render();
