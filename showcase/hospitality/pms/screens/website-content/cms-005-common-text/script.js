(function () {
  'use strict';

  var ICONS = {
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    concierge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>',
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    services: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
    wish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    insights: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>',
    arrival: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 22h20"/><path d="M4 22V9l8-6 8 6v13"/><path d="M9 22v-6h6v6"/></svg>'
  };

  var CARDS = [
    { icon: 'star', title: 'Why Us', desc: 'Reasons guests should book direct, shown across the marketing site.', href: '../cms-006-why-us-list/index.html', count: function () { return (MM.CMS.WHY_US || []).length; } },
    { icon: 'concierge', title: 'Concierge', desc: 'On-demand concierge service blocks (chef booking, spa, excursions).', href: '../cms-018-concierge-list/index.html', count: function () { return (MM.CMS.CONCIERGES || []).length; } },
    { icon: 'logo', title: 'Partner Logos', desc: 'Press and partner logo strip shown in the website footer.', href: '../cms-009-partner-logo-list/index.html', count: function () { return (MM.CMS.PARTNER_LOGOS || []).length; } },
    { icon: 'pin', title: 'Destination', desc: 'Per-villa destination introductions (district image galleries).', href: '../cms-012-destination-list/index.html', count: function () { return (MM.CMS.DESTINATIONS || []).length; } },
    { icon: 'mail', title: 'Contact Form', desc: 'Recipient routing for the website\'s "Talk to us" enquiry forms.', href: '../cms-016-contact-form-list/index.html', count: function () { return (MM.CMS.CONTACT_FORMS || []).length; } },
    { icon: 'services', title: 'Services', desc: 'Villa service content blocks (dining, wellness, transport).', href: '../cms-003-services-list/index.html', count: function () { return (MM.CMS.SERVICES || []).length; } },
    { icon: 'wish', title: 'I Wish', desc: 'Bookable guest wish-list experiences shown on collection sites.', href: '../cms-028-i-wish-list/index.html', count: function () { return (MM.CMS.IWISH || []).length; } },
    { icon: 'insights', title: 'Insights', desc: 'Editorial articles published on collection websites.', href: '../cms-026-insights-article-list/index.html', count: function () { return (MM.CMS.INSIGHTS || []).length; } },
    { icon: 'globe', title: 'Destination Global', desc: 'Destination introductions for the aggregated Guest Collection site.', href: '../cms-014-destination-global-list/index.html', count: function () { return (MM.CMS.DESTINATIONS || []).length; } },
    { icon: 'text', title: 'Common Texts (Collection)', desc: 'Shared hero and about copy for each collection sub-site.', href: '../cms-024-collection-website-common-text-list/index.html', count: function () { return (MM.CMS.COLLECTION_COMMON_TEXT || []).length; } },
    { icon: 'arrival', title: 'Arrival', desc: 'Guest arrival guidance content shown before check-in.', href: '../cms-030-arrival-content-list/index.html', count: function () { return (MM.CMS.ARRIVALS || []).length; } }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('hub-grid');
    CARDS.forEach(function (c) {
      var card = document.createElement('a');
      card.className = 'hub-card';
      card.href = c.href;
      var count = c.count();
      card.innerHTML =
        '<div class="hub-card__icon">' + ICONS[c.icon] + '</div>' +
        '<h3>' + c.title + '</h3>' +
        '<p>' + c.desc + '</p>' +
        '<div class="hub-card__meta">' + count + ' item' + (count === 1 ? '' : 's') + '</div>';
      grid.appendChild(card);
    });
  });
})();
