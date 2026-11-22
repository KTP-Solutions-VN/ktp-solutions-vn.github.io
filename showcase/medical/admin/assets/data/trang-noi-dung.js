/* Entity: Content Page (Trang nội dung)
   Schema: id, title, slug, status (Draft|Scheduled|Published|Unpublished), noIndex, publishAt, updatedAt, author */
const DATA_TRANG_NOI_DUNG = [
  { id: 'CMS-01', title: 'Your Complete Guide to Prenatal Care at Meridian', slug: '/articles/prenatal-care-guide', status: 'Published', noIndex: false, publishAt: '2026-06-01', updatedAt: '2026-08-10', author: 'Jessica Russo' },
  { id: 'CMS-02', title: 'FBP/NBP Membership — Frequently Asked Questions', slug: '/help/fbp-nbp-faq', status: 'Published', noIndex: false, publishAt: '2026-05-20', updatedAt: '2026-07-15', author: 'Jessica Russo' },
  { id: 'CMS-03', title: 'Preg Event August 2026 — Landing Page', slug: '/events/preg-event-aug-2026', status: 'Published', noIndex: true, publishAt: '2026-07-25', updatedAt: '2026-08-01', author: 'Jessica Russo' },
  { id: 'CMS-04', title: 'Meet Our Doctors — Meridian Fertility Centre', slug: '/about/fertility-doctors', status: 'Scheduled', noIndex: false, publishAt: '2026-09-20', updatedAt: '2026-09-10', author: 'Andrew Campbell' },
  { id: 'CMS-05', title: 'Confinement Meal Plan — Nutrition Breakdown', slug: '/articles/confinement-meal-nutrition', status: 'Draft', noIndex: false, publishAt: null, updatedAt: '2026-09-15', author: 'Jessica Russo' },
  { id: 'CMS-06', title: 'Q1 2026 Promotions Archive', slug: '/promotions/q1-2026-archive', status: 'Unpublished', noIndex: true, publishAt: null, updatedAt: '2026-04-01', author: 'Jessica Russo' }
];
