/* ==========================================================================
   Photos module — shared mock data & helpers.
   Extends window.MM with a MM.PHO namespace. Loaded after global.js and
   before each PHO-0xx screen's own script.js so every screen (Photo Sets,
   Common Areas, Property Photo Page, Set Detail, Settings, Planning) shows
   the same villas/residences/scores/shoots.

   Keys the villa-level data off MM.MOCK_PROPERTIES ids so the Dashboard's
   "Missing required photos" count (properties with photosComplete:false)
   stays consistent with what this module shows as incomplete.
   ========================================================================== */
(function () {
  'use strict';
  window.MM = window.MM || {};
  var PHO = window.MM.PHO = window.MM.PHO || {};

  PHO.SET_TYPES = [
    { key: 'ota', label: 'OTA', note: 'Up to 1MB/photo, 2100x1400' },
    { key: 'highres', label: 'High Res', note: 'Up to 3MB/photo, 3:2 ratio' },
    { key: 'extras', label: 'Extras', note: 'Behind-the-scenes / drone / detail shots' },
    { key: 'owners', label: "Owner's Set", note: 'Shared with the property owner' },
    { key: 'raw', label: 'Raw / Temporary', note: 'Unedited, pending review' },
    { key: 'archive', label: 'Archive', note: 'Superseded sets kept for reference' }
  ];

  // Per-villa photo sets. Villas not listed here (or with photosComplete:false
  // upstream) intentionally show gaps so the module's KPIs and badges have
  // real status diversity to demo.
  PHO.PROPERTY_PHOTOS = {
    'PV-101': {
      lastShoot: '2026-07-12', agentLink: 'https://share.azurastays.example/pv-101/agent',
      sets: {
        ota: { count: 44, required: 40, score: 2.8, sizeMB: 41 },
        highres: { count: 60, required: 40, score: 2.7, sizeMB: 210 },
        extras: { count: 12, required: 0, score: null, sizeMB: 38 },
        owners: { count: 44, required: 0, score: null, sizeMB: 41 }
      }
    },
    'PV-102': {
      lastShoot: '2026-06-28', agentLink: 'https://share.azurastays.example/pv-102/agent',
      sets: {
        ota: { count: 38, required: 36, score: 2.4, sizeMB: 33 },
        highres: { count: 38, required: 36, score: 2.4, sizeMB: 150 }
      }
    },
    'PV-103': {
      lastShoot: '2026-05-02', agentLink: null,
      sets: {
        ota: { count: 40, required: 44, score: 2.1, sizeMB: 35 },
        raw: { count: 10, required: 0, score: null, sizeMB: 90 }
      }
    },
    'PV-104': {
      lastShoot: null, agentLink: null,
      sets: {
        raw: { count: 6, required: 0, score: null, sizeMB: 52 }
      }
    },
    'PV-105': {
      lastShoot: '2026-04-18', agentLink: null,
      sets: {
        ota: { count: 14, required: 40, score: 1.6, sizeMB: 12 }
      }
    },
    'PV-106': {
      lastShoot: '2026-07-30', agentLink: 'https://share.azurastays.example/pv-106/agent',
      sets: {
        ota: { count: 36, required: 36, score: 2.9, sizeMB: 30 },
        highres: { count: 36, required: 36, score: 2.9, sizeMB: 140 },
        extras: { count: 8, required: 0, score: null, sizeMB: 20 }
      }
    },
    'PV-107': {
      lastShoot: null, agentLink: null,
      sets: {}
    },
    'PV-108': {
      lastShoot: '2026-08-05', agentLink: 'https://share.azurastays.example/pv-108/agent',
      sets: {
        ota: { count: 50, required: 44, score: 2.9, sizeMB: 46 },
        highres: { count: 50, required: 44, score: 2.8, sizeMB: 260 },
        owners: { count: 50, required: 0, score: null, sizeMB: 46 }
      }
    }
  };

  PHO.PHOTO_CATEGORIES = ['Exterior', 'Living Area', 'Bedroom', 'Bathroom', 'Pool', 'Kitchen', 'Dining', 'Drone / Aerial'];

  function samplePhotos(count, setType) {
    var photos = [];
    var cats = PHO.PHOTO_CATEGORIES;
    for (var i = 1; i <= Math.min(count, 24); i++) {
      photos.push({
        id: 'IMG-' + setType.toUpperCase() + '-' + i,
        name: setType + '_' + String(i).padStart(3, '0') + '.jpg',
        category: cats[i % cats.length],
        essential: i % 4 === 0,
        drone: i % 9 === 0,
        ai: i % 11 === 0,
        night: i % 13 === 0
      });
    }
    return photos;
  }
  PHO.samplePhotos = samplePhotos;

  PHO.RESIDENCES = [
    {
      id: 'RES-01', name: 'Bang Tao Residence', district: 'Bang Tao', bu: 'Phuket Collection',
      sets: { ota: { count: 28, sizeMB: 24 }, highres: { count: 28, sizeMB: 120 } }
    },
    {
      id: 'RES-02', name: 'Ubud Hillside Residence', district: 'Ubud', bu: 'Bali Retreats',
      sets: { ota: { count: 10, sizeMB: 9 } }
    },
    {
      id: 'RES-03', name: 'Bophut Bay Residence', district: 'Bophut', bu: 'Koh Samui Estates',
      sets: {}
    }
  ];

  PHO.SHOOTS = [
    { id: 'SHT-01', villaId: 'PV-105', photographer: 'Phuket Frame Photography', date: '2026-09-10', objective: 'OTA refresh', status: 'scheduled', comment: 'Villa Marble Cove exterior looks dated on Booking.com.' },
    { id: 'SHT-02', villaId: 'PV-107', photographer: 'Phuket Frame Photography', date: '2026-09-14', objective: 'Full new set', status: 'scheduled', comment: 'No photos exist yet — priority shoot before OTA launch.' },
    { id: 'SHT-03', villaId: 'PV-103', photographer: 'Andaman Pool Services', date: '2026-08-20', objective: 'Pool + drone extras', status: 'delivered', comment: 'Delivered but flagged for follow-up — 4 images below resolution.' },
    { id: 'SHT-04', villaId: 'PV-101', photographer: 'Phuket Frame Photography', date: '2026-07-12', objective: 'Owner set', status: 'delivered', comment: '' },
    { id: 'SHT-05', villaId: 'PV-108', photographer: 'Phuket Frame Photography', date: '2026-08-05', objective: 'OTA refresh', status: 'delivered', comment: '' }
  ];

  PHO.FOLLOWUPS = [
    { id: 'FU-01', villaId: 'PV-103', required: 'Re-shoot pool deck — overexposed', date: '2026-08-24', type: 'quality' },
    { id: 'FU-02', villaId: 'PV-105', required: 'Missing bedroom 3 & bathroom 2 photos', date: '2026-09-05', type: 'coverage' }
  ];

  // Standard required-photo counts per property type x bedroom count, used
  // by PHO-008 and referenced by PHO-007's Completeness table.
  PHO.STANDARDS = {
    'Pool Villa': {
      areas: [
        { code: 'drone', name: 'Drone / Aerial', note: 'Whole property from above', locked: true, req: [2, 2, 3, 3, 3, 4, 4, 4] },
        { code: 'exterior', name: 'Exterior', note: 'Facade, garden, entrance', locked: true, req: [4, 4, 5, 5, 6, 6, 6, 6] },
        { code: 'pool_day', name: 'Pool (Day)', note: 'Daytime pool shots', locked: true, req: [3, 3, 4, 4, 4, 4, 5, 5] },
        { code: 'pool_night', name: 'Pool (Night)', note: 'Lit pool at dusk/night', locked: true, req: [2, 2, 2, 2, 3, 3, 3, 3] },
        { code: 'living', name: 'Living Area', note: '', locked: true, req: [3, 3, 4, 4, 4, 4, 4, 4] },
        { code: 'dining', name: 'Dining', note: '', locked: true, req: [2, 2, 2, 3, 3, 3, 3, 3] },
        { code: 'kitchen', name: 'Kitchen', note: '', locked: true, req: [2, 2, 2, 2, 3, 3, 3, 3] },
        { code: 'bedrooms_bathrooms', name: 'Bedrooms & Bathrooms', note: 'Per bedroom/bathroom pair', locked: true, req: [4, 8, 12, 16, 20, 24, 28, 32] }
      ]
    },
    'Beachfront Villa': {
      areas: [
        { code: 'drone', name: 'Drone / Aerial', note: 'Whole property from above', locked: true, req: [2, 3, 3, 4, 4, 4, 5, 5] },
        { code: 'exterior', name: 'Exterior', note: 'Facade, garden, entrance', locked: true, req: [4, 5, 5, 6, 6, 6, 7, 7] },
        { code: 'pool_day', name: 'Pool (Day)', note: 'Daytime pool shots', locked: true, req: [3, 3, 4, 4, 5, 5, 5, 5] },
        { code: 'pool_night', name: 'Pool (Night)', note: 'Lit pool at dusk/night', locked: true, req: [2, 2, 3, 3, 3, 3, 3, 3] },
        { code: 'living', name: 'Living Area', note: '', locked: true, req: [3, 4, 4, 4, 5, 5, 5, 5] },
        { code: 'dining', name: 'Dining', note: '', locked: true, req: [2, 3, 3, 3, 3, 3, 3, 3] },
        { code: 'kitchen', name: 'Kitchen', note: '', locked: true, req: [2, 2, 2, 3, 3, 3, 3, 3] },
        { code: 'bedrooms_bathrooms', name: 'Bedrooms & Bathrooms', note: 'Per bedroom/bathroom pair', locked: true, req: [4, 8, 12, 16, 20, 24, 28, 32] }
      ]
    },
    'Hillside Villa': { areas: [] },
    'Garden Villa': { areas: [] }
  };
  // Keep every villa type consistent by falling back to Pool Villa's areas.
  ['Hillside Villa', 'Garden Villa'].forEach(function (t) {
    PHO.STANDARDS[t].areas = JSON.parse(JSON.stringify(PHO.STANDARDS['Pool Villa'].areas));
  });

  PHO.villaTypeFor = function (propId) {
    var map = { 'PV-101': 'Pool Villa', 'PV-102': 'Pool Villa', 'PV-103': 'Beachfront Villa', 'PV-104': 'Hillside Villa', 'PV-105': 'Pool Villa', 'PV-106': 'Garden Villa', 'PV-107': 'Pool Villa', 'PV-108': 'Beachfront Villa' };
    return map[propId] || 'Pool Villa';
  };

  PHO.scoreClass = function (score) {
    if (score === null || score === undefined) return '';
    if (score >= 2.5) return 'good';
    if (score >= 2) return 'ok';
    return 'bad';
  };

  // Which residence (if any) each villa belongs to, for the "Residence
  // Common Areas" block on PHO-006.
  PHO.VILLA_RESIDENCE = { 'PV-101': 'RES-01', 'PV-102': 'RES-01', 'PV-104': 'RES-02', 'PV-106': 'RES-03', 'PV-107': 'RES-03' };

  PHO.propertyById = function (id) {
    return MM.MOCK_PROPERTIES.filter(function (p) { return p.id === id; })[0];
  };
})();
