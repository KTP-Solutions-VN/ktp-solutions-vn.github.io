(function () {
  'use strict';

  /* Canonical Type/Area extension — kept identical to PROP-033's table so
     the same villa shows the same area everywhere in the module. */
  var PROPERTY_EXT = {
    'PV-101': { type: 'Pool Villa', area: 'Sentosa Cove' },
    'PV-102': { type: 'Pool Villa', area: 'Ocean Drive' },
    'PV-103': { type: 'Beachfront Villa', area: 'Wategos' },
    'PV-104': { type: 'Hillside Villa', area: 'Bangalow' },
    'PV-105': { type: 'Pool Villa', area: 'Paradise Island' },
    'PV-106': { type: 'Garden Villa', area: 'Noosaville' },
    'PV-107': { type: 'Pool Villa', area: 'Sunshine Beach' },
    'PV-108': { type: 'Beachfront Villa', area: 'Belongil' }
  };
  var DEFAULT_EXT = { type: 'Pool Villa', area: 'New Area' };

  /* Rich detail data for the View Details "ID card" — country/region/
     address/internet/pool servicing, keyed by property id. */
  var DETAIL_EXT = {
    'PV-101': { country: 'Singapore', region: 'Sentosa', district: 'Sentosa Cove', residence: 'Independent', address: '88 Ocean Drive, Sentosa Cove, Singapore 098297', locationType: 'Hillside', mapUrl: 'https://maps.google.com/?q=Sentosa+Cove+Singapore', internetLogin: 'sapphirecliff-guest', internetPassword: 'Ky7#mR2q', poolCompany: 'Coral Pool Services', poolFrequency: 'Every 2 days', poolDays: 'Mon, Wed, Fri', guests: 10, bathrooms: 5, luxury: 'Ultra Luxury', pool: true, poolL: 15, poolW: 6, poolD: 1.6, poolSystem: 'Saltwater',
      ota: [{ channel: 'Airbnb', link: 'https://airbnb.com/rooms/sapphire-cliff' }, { channel: 'Booking.com', link: 'https://booking.com/hotel/sapphire-cliff' }] },
    'PV-102': { country: 'Singapore', region: 'Sentosa', district: 'Sentosa Cove', residence: 'Independent', address: '12 Ocean Drive, Sentosa Cove, Singapore 098374', locationType: 'Beachfront', mapUrl: 'https://maps.google.com/?q=Ocean+Drive+Sentosa', internetLogin: 'coralhorizon-guest', internetPassword: 'Wv4$pL9z', poolCompany: 'Coral Pool Services', poolFrequency: 'Every 3 days', poolDays: 'Tue, Fri', guests: 8, bathrooms: 4, luxury: 'Luxury', pool: true, poolL: 12, poolW: 5, poolD: 1.5, poolSystem: 'Chlorine',
      ota: [{ channel: 'Airbnb', link: 'https://airbnb.com/rooms/coral-horizon' }] },
    'PV-103': { country: 'Australia', region: 'Byron Bay', district: 'Byron Bay', residence: 'Independent', address: '21 Marine Parade, Wategos Beach NSW 2481', locationType: 'Clifftop', mapUrl: 'https://maps.google.com/?q=Wategos+Beach+Byron+Bay', internetLogin: 'emeraldbay-guest', internetPassword: 'Qs1@tN6x', poolCompany: 'Byron Bloom Gardens', poolFrequency: 'Every 2 days', poolDays: 'Mon, Wed, Fri, Sun', guests: 12, bathrooms: 6, luxury: 'Ultra Luxury', pool: true, poolL: 18, poolW: 7, poolD: 1.7, poolSystem: 'Saltwater',
      ota: [{ channel: 'Airbnb', link: 'https://airbnb.com/rooms/emerald-bay' }, { channel: 'Agoda', link: 'https://agoda.com/emerald-bay' }] },
    'PV-104': { country: 'Australia', region: 'Byron Bay', district: 'Bangalow', residence: 'Independent', address: '9 Byron Street, Bangalow NSW 2479', locationType: 'Riverside', mapUrl: 'https://maps.google.com/?q=Bangalow+NSW', internetLogin: 'azureridge-guest', internetPassword: 'Fb8&hK3w', poolCompany: 'Byron Bloom Gardens', poolFrequency: 'Every 3 days', poolDays: 'Tue, Sat', guests: 6, bathrooms: 3, luxury: 'Luxury', pool: true, poolL: 10, poolW: 4, poolD: 1.4, poolSystem: 'Chlorine',
      ota: [] },
    'PV-105': { country: 'Singapore', region: 'Sentosa', district: 'Sentosa Cove', residence: 'Independent', address: '45 Paradise Island, Sentosa Cove, Singapore 098374', locationType: 'Beachfront', mapUrl: 'https://maps.google.com/?q=Paradise+Island+Sentosa', internetLogin: 'marblecove-guest', internetPassword: 'Zt5!vD2m', poolCompany: 'Coral Pool Services', poolFrequency: 'Not yet scheduled', poolDays: '—', guests: 10, bathrooms: 5, luxury: 'Ultra Luxury', pool: true, poolL: 14, poolW: 6, poolD: 1.6, poolSystem: 'Saltwater',
      ota: [] },
    'PV-106': { country: 'Australia', region: 'Noosa', district: 'Noosaville', residence: 'Independent', address: '7 Gympie Terrace, Noosaville QLD 4566', locationType: 'Beachfront', mapUrl: 'https://maps.google.com/?q=Noosaville+QLD', internetLogin: 'lotusterrace-guest', internetPassword: 'Rn9#cQ4e', poolCompany: 'Coral Pool Services', poolFrequency: 'Every 2 days', poolDays: 'Mon, Thu, Sat', guests: 8, bathrooms: 4, luxury: 'Luxury', pool: true, poolL: 12, poolW: 5, poolD: 1.5, poolSystem: 'Chlorine',
      ota: [{ channel: 'Booking.com', link: 'https://booking.com/hotel/lotus-terrace' }] },
    'PV-107': { country: 'Australia', region: 'Noosa', district: 'Sunshine Beach', residence: 'Independent', address: '3 Belmore Terrace, Sunshine Beach QLD 4567', locationType: 'Beachfront', mapUrl: 'https://maps.google.com/?q=Sunshine+Beach+QLD', internetLogin: 'goldenpalm-guest', internetPassword: 'Lx2%bE7y', poolCompany: '—', poolFrequency: 'Not yet scheduled', poolDays: '—', guests: 6, bathrooms: 3, luxury: 'Standard', pool: true, poolL: 9, poolW: 4, poolD: 1.3, poolSystem: 'Chlorine',
      ota: [] },
    'PV-108': { country: 'Australia', region: 'Byron Bay', district: 'Byron Bay', residence: 'Independent', address: '55 Bay Street, Byron Bay NSW 2481', locationType: 'Beachfront', mapUrl: 'https://maps.google.com/?q=Belongil+Byron+Bay', internetLogin: 'silvertide-guest', internetPassword: 'Jm6*sA1p', poolCompany: 'Byron Bloom Gardens', poolFrequency: 'Every day', poolDays: 'Daily', guests: 14, bathrooms: 7, luxury: 'Ultra Luxury', pool: true, poolL: 20, poolW: 8, poolD: 1.8, poolSystem: 'Saltwater',
      ota: [{ channel: 'Airbnb', link: 'https://airbnb.com/rooms/silver-tide' }, { channel: 'Booking.com', link: 'https://booking.com/hotel/silver-tide' }, { channel: 'Agoda', link: 'https://agoda.com/silver-tide' }] }
  };

  function readJSON(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v || fallback; } catch (e) { return fallback; }
  }

  function getAllProperties() {
    var extra = readJSON('mm_prop_properties_new', []);
    var overrides = readJSON('mm_prop_properties_overrides', {});
    var deleted = readJSON('mm_prop_properties_deleted', []);
    return MM.MOCK_PROPERTIES.concat(extra)
      .filter(function (p) { return deleted.indexOf(p.id) === -1; })
      .map(function (p) { return Object.assign({}, p, overrides[p.id] || {}); });
  }

  function findConciergeStaff(shortName) {
    if (!shortName) return null;
    var last = shortName.split(' ')[0];
    return MM.MOCK_STAFF.filter(function (s) { return s.name.indexOf(last) === 0; })[0];
  }

  function initials(name) {
    return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function field(label, value, muted) {
    return '<div class="ro-field"><label>' + label + '</label><div class="ro-value' + (muted ? ' muted' : '') + '">' + (value || '—') + '</div></div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(window.location.search);
    var all = getAllProperties();
    var id = params.get('id') || all[0].id;
    var p = all.filter(function (x) { return x.id === id; })[0] || all[0];
    var ext = PROPERTY_EXT[p.id] || DEFAULT_EXT;
    var d = DETAIL_EXT[p.id] || Object.assign({
      country: 'Singapore', region: ext.area, district: ext.area, residence: 'Independent', address: 'Address on file',
      locationType: 'Pool Villa', mapUrl: '#', internetLogin: p.id.toLowerCase() + '-guest', internetPassword: 'Ask concierge',
      poolCompany: 'Coral Pool Services', poolFrequency: 'Every 2 days', poolDays: 'Mon, Thu', guests: p.bedrooms * 2,
      bathrooms: p.bedrooms, luxury: 'Luxury', pool: true, poolL: 10, poolW: 4, poolD: 1.5, poolSystem: 'Chlorine', ota: []
    });

    document.title = p.name + ' — Property Profile — Azura Manager';
    document.getElementById('bc-property-name').textContent = p.name;
    document.getElementById('pd-title').textContent = 'Property Profile: ' + p.name + ' — ' + p.id;
    document.getElementById('pd-subtitle').textContent = p.bu + ' · ' + ext.area + ' · Read-only consolidated record — use Edit Property to change any of these details.';
    document.getElementById('edit-property-link').href = '../prop-050-add-edit-property-details/index.html?id=' + p.id + '&tab=identification';

    document.getElementById('pd-location-fields').innerHTML = [
      field('Country', d.country), field('Region', d.region), field('District', d.district), field('Area', ext.area),
      field('Residence', d.residence), field('Location Type', d.locationType),
      '<div class="ro-field full" style="grid-column:1/-1;"><label>Address</label><div class="ro-value">' + d.address + '</div></div>'
    ].join('');
    document.getElementById('pd-map-link').href = d.mapUrl;

    document.getElementById('pd-type-fields').innerHTML = [
      field('Number of Bedrooms', p.bedrooms), field('Number of Bathrooms', d.bathrooms), field('Number of Guests', d.guests),
      field('Luxury Level', d.luxury), field('Has Pool', d.pool ? 'Yes' : 'No'),
      field('Pool Dimensions (L×W×D, m)', d.pool ? (d.poolL + ' × ' + d.poolW + ' × ' + d.poolD) : null, !d.pool),
      field('Pool System', d.pool ? d.poolSystem : null, !d.pool)
    ].join('');

    document.getElementById('pd-internet-fields').innerHTML = [
      field('Internet Login', d.internetLogin), field('Internet Password', d.internetPassword)
    ].join('');

    document.getElementById('pd-pool-fields').innerHTML = [
      field('Pool Company', d.poolCompany, d.poolCompany === '—'), field('Cleaning Frequency', d.poolFrequency),
      field('Cleaning Days', d.poolDays)
    ].join('');

    var staff = findConciergeStaff(p.concierge);
    var concierge = document.getElementById('pd-concierge');
    if (p.concierge && staff) {
      concierge.innerHTML = '<span class="avatar">' + initials(staff.name) + '</span>' +
        '<div><div class="pd-concierge-name">' + staff.name + '</div><div class="pd-concierge-role">' + staff.role + ' · ' + staff.team + '</div></div>';
    } else {
      concierge.innerHTML = '<div class="ro-value muted">No concierge assigned yet</div>';
    }

    var otaBody = document.getElementById('pd-ota-tbody');
    if (d.ota && d.ota.length) {
      otaBody.innerHTML = d.ota.map(function (o, i) {
        return '<tr><td class="cell-strong">' + o.channel + '</td><td class="cell-sub">' + o.link + '</td>' +
          '<td style="text-align:right;"><button class="pd-copy-btn" data-copy="' + o.link + '" title="Copy link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></td></tr>';
      }).join('');
      document.getElementById('pd-ota-empty').hidden = true;
    } else {
      otaBody.innerHTML = '';
      document.getElementById('pd-ota-empty').hidden = false;
    }

    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(function () {});
        }
        btn.classList.add('copied');
        MM.showToast('Link copied to clipboard');
        setTimeout(function () { btn.classList.remove('copied'); }, 1200);
      });
    });
  });
})();
