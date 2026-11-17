
  var STORE_KEY = 'admin_content_pages';
  function getData() { return CJStore.mergeOverrides(DATA_TRANG_NOI_DUNG, STORE_KEY, 'id').concat(CJStore.getExtra(STORE_KEY)); }
  var searchEl = document.getElementById('tbSearch');
  function render() {
    var s = (searchEl.value || '').toLowerCase();
    var list = getData().filter(function (o) { return !s || (String(o.title).toLowerCase().indexOf(s) > -1 || String(o.slug).toLowerCase().indexOf(s) > -1); });
    var tbody = document.getElementById('listTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="es-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line></svg></div><h3>No content pages found</h3><p>Try adjusting your search.</p></div></td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (o) { return '<tr>' + '<td class="cell-strong">' + o.title + (o.noIndex ? ' <span class="badge badge-neutral" style="margin-left:6px;">No-index</span>' : '') + '<div style="font-size:11.5px;color:var(--gray-500);font-weight:400;">' + o.slug + '</div></td>' + '<td>' + CJBadge(o.status, {"Draft":"neutral","Scheduled":"info","Published":"success","Unpublished":"error"}) + '</td>' + '<td>' + (o.publishAt || '—') + '</td>' + '<td>' + o.updatedAt + '</td>' + '<td>' + o.author + '</td>' + '<td class="row-actions"><a class="btn btn-ghost btn-sm btn-icon-only openContentLink" href="../../../screens/noi-dung/soan-thao-trang-noi-dung/index.html?id=' + o.id + '" data-id="' + o.id + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg></a></td>' + '</tr>'; }).join('');
    document.querySelectorAll('.openContentLink').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openContentDrawer(link.getAttribute('data-id')); });
    });
  }
  searchEl.addEventListener('input', render);

  /* ---------------- #32 Content Editor drawer ------------------------------ */
  var editingContentId = null;
  CJDrawer.bind('contentEditorOverlay');

  function openContentDrawer(id) {
    var o = id ? getData().find(function (x) { return x.id === id; }) : null;
    editingContentId = o ? o.id : null;
    document.getElementById('cDrawerTitle').textContent = o ? 'Edit Page' : 'Create Page';
    document.getElementById('cTitle').value = o ? o.title : '';
    document.getElementById('cSlug').value = o ? o.slug : '';
    document.getElementById('cContent').value = o ? 'Preparing for your first trimester can feel overwhelming — here’s what to expect at every stage of your journey with Meridian Specialists...' : '';
    document.getElementById('cStatus').value = o ? o.status : 'Draft';
    document.getElementById('cPublishAt').value = o && o.publishAt ? o.publishAt : '';
    document.getElementById('cNoIndex').checked = !!(o && o.noIndex);
    document.getElementById('cMetaTitle').value = o ? (o.title + ' | CareJourney') : '';
    document.getElementById('cMetaDesc').value = '';
    CJDrawer.open('contentEditorOverlay');
  }
  document.getElementById('createPageBtn').addEventListener('click', function () { openContentDrawer(null); });

  document.getElementById('cSaveBtn').addEventListener('click', function () {
    var title = document.getElementById('cTitle').value.trim() || 'Untitled Page';
    var patch = {
      title: title,
      slug: document.getElementById('cSlug').value.trim() || ('/pages/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
      status: document.getElementById('cStatus').value,
      publishAt: document.getElementById('cPublishAt').value || null,
      noIndex: document.getElementById('cNoIndex').checked,
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    if (editingContentId) {
      CJStore.setOverride(STORE_KEY, editingContentId, patch);
      CJToast('"' + patch.title + '" updated.');
    } else {
      patch.id = 'CMS-NEW-' + Date.now().toString().slice(-4);
      patch.author = 'You (Admin)';
      CJStore.addExtra(STORE_KEY, patch);
      CJToast('"' + patch.title + '" created.');
    }
    CJDrawer.close('contentEditorOverlay');
    render();
  });

  function handleDeepLink() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('openId')) { openContentDrawer(params.get('openId')); }
    else if (params.get('openCreate')) { openContentDrawer(null); }
  }

  render();
  handleDeepLink();
