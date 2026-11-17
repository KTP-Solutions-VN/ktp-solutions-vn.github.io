(function () {
  'use strict';

  var COUNTRY_BY_REGION = {
    'Phuket': 'Thailand',
    'Bali': 'Indonesia',
    'Koh Samui': 'Thailand'
  };

  var CONTENT_KEY = 'mm_cms_destglobal_content';
  var LANGUAGES = (window.MM && MM.CMS && MM.CMS.LANGUAGES) || ['English', 'French', 'German', 'Thai', 'Chinese'];

  function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function writeJson(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function defaultContent(regionName) {
    return {
      heading: regionName + ', Curated for the Guest Collection',
      hasImage: true,
      text: { English: 'Discover ' + regionName + '’s hand-picked villas, dining and experiences across the Guest Collection website.' }
    };
  }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso + 'T09:00:00');
    if (isNaN(d.getTime())) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var hh = String(d.getHours()).padStart(2, '0');
    var mm = String(d.getMinutes()).padStart(2, '0');
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + hh + ':' + mm;
  }

  function getItems() {
    return (MM.CMS.DESTINATIONS_GLOBAL || []).slice().sort(function (a, b) {
      var ca = COUNTRY_BY_REGION[a.region] || '', cb = COUNTRY_BY_REGION[b.region] || '';
      if (ca !== cb) return ca.localeCompare(cb);
      return a.region.localeCompare(b.region);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    function render() {
      var search = document.getElementById('search-input').value.trim().toLowerCase();
      var tbody = document.getElementById('table-body');
      var all = getItems();
      var rows = all.filter(function (i) {
        if (!search) return true;
        var country = (COUNTRY_BY_REGION[i.region] || '').toLowerCase();
        return i.region.toLowerCase().indexOf(search) !== -1 || country.indexOf(search) !== -1;
      });
      tbody.innerHTML = '';
      rows.forEach(function (item, idx) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td>' + (idx + 1) + '</td>' +
          '<td>' + (COUNTRY_BY_REGION[item.region] || '—') + '</td>' +
          '<td class="cell-strong">' + item.region + '</td>' +
          '<td>' + item.villaCount + '</td>' +
          '<td><span class="badge ' + (MM.CMS.STATUS_BADGE[item.status] || 'badge-neutral') + '">' + (MM.CMS.STATUS_LABEL[item.status] || item.status) + '</span></td>' +
          '<td>' + formatDate(item.updatedAt) + '</td>' +
          '<td class="row-actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + item.id + '">Edit</button>' +
          '</td>';
        tbody.appendChild(tr);
      });
      document.getElementById('empty-state').style.display = rows.length ? 'none' : 'block';
      document.getElementById('pagination-count').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' items';
    }

    document.getElementById('search-input').addEventListener('input', render);

    document.getElementById('table-body').addEventListener('click', function (e) {
      var editBtn = e.target.closest('[data-edit]');
      if (!editBtn) return;
      var item = getItems().filter(function (d) { return d.id === editBtn.getAttribute('data-edit'); })[0];
      if (item) openDrawer(item);
    });

    var langSelect = document.getElementById('field-language');
    var headingInput = document.getElementById('field-heading');
    var textArea = document.getElementById('field-text');
    var uploadTile = document.getElementById('upload-tile');
    var imageHint = document.getElementById('image-hint');
    var currentId = null;
    var content = null;

    function loadIntoForm() {
      headingInput.value = content.heading || '';
      textArea.value = content.text[langSelect.value] || '';
      uploadTile.classList.toggle('has-file', !!content.hasImage);
      imageHint.textContent = content.hasImage ? 'Current image kept unless replaced.' : 'Recommended ratio 3:1, < 1MB.';
    }

    function openDrawer(destination) {
      currentId = destination.id;
      document.getElementById('field-title').value = destination.region;
      langSelect.innerHTML = LANGUAGES.map(function (l) { return '<option value="' + l + '">' + l + '</option>'; }).join('');
      langSelect.value = 'English';

      var store = readJson(CONTENT_KEY, {});
      content = store[currentId] ? Object.assign({ text: {} }, store[currentId]) : defaultContent(destination.region);
      loadIntoForm();
      MM.openModal('destglobal-drawer');
    }

    langSelect.addEventListener('change', function () {
      textArea.value = content.text[langSelect.value] || '';
    });
    textArea.addEventListener('input', function () {
      content.text[langSelect.value] = textArea.value;
    });

    document.getElementById('fake-upload-btn').addEventListener('click', function () {
      content.hasImage = true;
      uploadTile.classList.add('has-file');
      imageHint.textContent = 'destination-hero-v2.jpg selected (replaces current image on save).';
    });

    var form = document.getElementById('destglobal-form');
    MM.bindFormValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      content.text[langSelect.value] = textArea.value.trim();
      content.heading = headingInput.value.trim();
      var textOk = (content.text[langSelect.value] || '').length > 0;
      if (!MM.validateForm(form) || !textOk) {
        if (!textOk) textArea.closest('.form-group').classList.add('has-error');
        MM.showToast('Please fix the highlighted fields.', { danger: true });
        return;
      }

      var btn = document.getElementById('save-btn');
      MM.simulateSave(btn, 'Saving...', function () {
        var s = readJson(CONTENT_KEY, {});
        s[currentId] = content;
        writeJson(CONTENT_KEY, s);
        MM.closeModal('destglobal-drawer');
        MM.showToast('Destination content updated.');
      });
    });

    render();
  });
})();
