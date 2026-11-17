/* ==========================================================================
   Website Content (CMS) module — shared mock data & helpers.
   Extends window.MM with a MM.CMS namespace. Loaded after global.js and
   before each CMS-0xx screen's own script.js so every screen (Villa
   Content, Services, Why Us, Partner Logos, Destinations, Contact Forms,
   Concierge, Translations, Collection Websites, Insights, I Wish, Arrival,
   Restaurants, Guest Contracts) shares the same villas/collections/authors.

   Villa-level content keys off MM.MOCK_PROPERTIES ids so this module stays
   consistent with the Property Readiness signature moment on the Dashboard.
   ========================================================================== */
(function () {
  'use strict';
  window.MM = window.MM || {};
  var CMS = window.MM.CMS = window.MM.CMS || {};

  /* Per-villa website content status (CMS-001 / CMS-002) */
  CMS.VILLA_CONTENT = {
    'PV-101': { status: 'published', lang: ['English', 'French'], tagline: 'Cliffside serenity above the Andaman Sea', updatedAt: '2026-08-14', updatedBy: 'Somchai Anuwat' },
    'PV-102': { status: 'published', lang: ['English'], tagline: 'A coral-toned escape on Phuket’s west coast', updatedAt: '2026-07-30', updatedBy: 'Somchai Anuwat' },
    'PV-103': { status: 'needs-review', lang: ['English'], tagline: 'Emerald waters, six bedrooms of quiet luxury', updatedAt: '2026-05-11', updatedBy: 'Wayan Kertha' },
    'PV-104': { status: 'draft', lang: ['English'], tagline: 'A ridge-top hideaway over Bali’s rice terraces', updatedAt: '2026-08-02', updatedBy: 'Wayan Kertha' },
    'PV-105': { status: 'draft', lang: [], tagline: '', updatedAt: '2026-03-20', updatedBy: 'Somchai Anuwat' },
    'PV-106': { status: 'published', lang: ['English', 'Thai'], tagline: 'Lotus gardens meet Koh Samui’s tide', updatedAt: '2026-08-20', updatedBy: 'Nok Pattaya' },
    'PV-107': { status: 'draft', lang: [], tagline: '', updatedAt: '2026-02-08', updatedBy: 'Nok Pattaya' },
    'PV-108': { status: 'published', lang: ['English', 'French', 'German'], tagline: 'Seven bedrooms of silver-tide grandeur', updatedAt: '2026-08-25', updatedBy: 'Wayan Kertha' }
  };

  /* Villa services shown on the public website (CMS-003 / CMS-004) */
  CMS.SERVICES = [
    { id: 'SVC-01', villaId: 'PV-101', name: 'Private Chef — Thai Tasting Menu', category: 'Dining', price: 180, status: 'active' },
    { id: 'SVC-02', villaId: 'PV-101', name: 'Sunset Catamaran Charter', category: 'Excursion', price: 420, status: 'active' },
    { id: 'SVC-03', villaId: 'PV-102', name: 'In-Villa Thai Massage (2 guests)', category: 'Wellness', price: 110, status: 'active' },
    { id: 'SVC-04', villaId: 'PV-103', name: 'Airport Limousine Transfer', category: 'Transport', price: 65, status: 'active' },
    { id: 'SVC-05', villaId: 'PV-106', name: 'Kids Club Half-Day Program', category: 'Family', price: 90, status: 'draft' },
    { id: 'SVC-06', villaId: 'PV-108', name: 'Private Yoga Instructor', category: 'Wellness', price: 75, status: 'active' },
    { id: 'SVC-07', villaId: 'PV-108', name: 'Grocery Pre-Stocking Service', category: 'Concierge', price: 40, status: 'inactive' }
  ];

  /* "Why Us" marketing points (CMS-006 / 007 / 008) */
  CMS.WHY_US = [
    { id: 'WU-01', order: 1, title: '24/7 Dedicated Concierge', description: 'A named concierge for every stay, reachable day or night.', status: 'active' },
    { id: 'WU-02', order: 2, title: 'Hand-Picked Villas Only', description: 'Every property is personally inspected before it joins the collection.', status: 'active' },
    { id: 'WU-03', order: 3, title: 'Best Rate Guarantee', description: 'Book direct and we match any verified lower rate.', status: 'active' },
    { id: 'WU-04', order: 4, title: 'Zero-Contact Digital Check-In', description: 'Skip the front desk — arrival guides sent straight to your phone.', status: 'draft' },
    { id: 'WU-05', order: 5, title: 'Carbon-Neutral Operations', description: 'Every stay offsets its footprint through our reef restoration fund.', status: 'inactive' }
  ];

  /* Partner logos strip (CMS-009 / 010 / 011) */
  CMS.PARTNER_LOGOS = [
    { id: 'LOGO-01', order: 1, name: 'Conde Nast Traveller', status: 'active' },
    { id: 'LOGO-02', order: 2, name: 'Michelin Guide Thailand', status: 'active' },
    { id: 'LOGO-03', order: 3, name: 'Virtuoso Network', status: 'active' },
    { id: 'LOGO-04', order: 4, name: 'Boutique Hotel Awards', status: 'draft' },
    { id: 'LOGO-05', order: 5, name: 'Travel + Leisure', status: 'inactive' }
  ];

  /* Destination district pages (CMS-012 / 013) */
  CMS.DESTINATIONS = [
    { id: 'DST-01', name: 'Bang Tao', region: 'Phuket Collection', villaCount: 3, status: 'published', updatedAt: '2026-08-01' },
    { id: 'DST-02', name: 'Kata', region: 'Phuket Collection', villaCount: 2, status: 'published', updatedAt: '2026-06-18' },
    { id: 'DST-03', name: 'Ubud', region: 'Bali Retreats', villaCount: 2, status: 'draft', updatedAt: '2026-05-02' },
    { id: 'DST-04', name: 'Seminyak', region: 'Bali Retreats', villaCount: 1, status: 'published', updatedAt: '2026-07-22' },
    { id: 'DST-05', name: 'Bophut', region: 'Koh Samui Estates', villaCount: 2, status: 'needs-review', updatedAt: '2026-04-14' },
    { id: 'DST-06', name: 'Chaweng', region: 'Koh Samui Estates', villaCount: 1, status: 'draft', updatedAt: '2026-03-30' }
  ];

  /* Destination global (region-level) content (CMS-014 / 015) */
  CMS.DESTINATIONS_GLOBAL = [
    { id: 'GDST-01', region: 'Phuket', villaCount: 5, status: 'published', updatedAt: '2026-07-28' },
    { id: 'GDST-02', region: 'Bali', villaCount: 3, status: 'published', updatedAt: '2026-06-30' },
    { id: 'GDST-03', region: 'Koh Samui', villaCount: 2, status: 'draft', updatedAt: '2026-04-19' }
  ];

  /* Website contact forms (CMS-016 / 017) */
  CMS.CONTACT_FORMS = [
    { id: 'CF-01', name: 'General Enquiry', targetEmail: 'reservations@azurastays.example', scope: 'Global', status: 'active' },
    { id: 'CF-02', name: 'Phuket Collection Enquiry', targetEmail: 'phuket@azurastays.example', scope: 'Phuket Collection', status: 'active' },
    { id: 'CF-03', name: 'Bali Retreats Enquiry', targetEmail: 'bali@azurastays.example', scope: 'Bali Retreats', status: 'active' },
    { id: 'CF-04', name: 'Press & Partnerships', targetEmail: 'press@azurastays.example', scope: 'Global', status: 'draft' }
  ];

  /* Website concierge service content blocks (CMS-018 / 019) */
  CMS.CONCIERGES = [
    { id: 'CON-01', order: 1, title: 'Private Chef Booking', description: 'Arrange a personal chef for any meal of your stay.', status: 'active' },
    { id: 'CON-02', order: 2, title: 'In-Villa Spa & Wellness', description: 'On-demand massage, yoga and wellness treatments.', status: 'active' },
    { id: 'CON-03', order: 3, title: 'Yacht & Excursion Planning', description: 'Sunset cruises, island hopping and private charters.', status: 'active' },
    { id: 'CON-04', order: 4, title: 'Family & Kids Programs', description: 'Nannies, kids clubs and family excursions.', status: 'draft' },
    { id: 'CON-05', order: 5, title: 'Event & Celebration Planning', description: 'Weddings, anniversaries and private events on-site.', status: 'inactive' }
  ];

  /* Multilingual translation keys (CMS-020) */
  CMS.LANGUAGES = ['English', 'French', 'German', 'Thai', 'Chinese'];
  CMS.TRANSLATIONS = [
    { key: 'nav.villas', group: 'Navigation', values: { English: 'Villas', French: 'Villas', German: 'Villen', Thai: 'วิลล่า', Chinese: '' } },
    { key: 'nav.destinations', group: 'Navigation', values: { English: 'Destinations', French: 'Destinations', German: 'Reiseziele', Thai: '', Chinese: '目的地' } },
    { key: 'nav.contact', group: 'Navigation', values: { English: 'Contact Us', French: 'Contactez-nous', German: 'Kontakt', Thai: 'ติดต่อเรา', Chinese: '联系我们' } },
    { key: 'cta.bookNow', group: 'Call to Action', values: { English: 'Book Now', French: 'Réserver', German: 'Jetzt buchen', Thai: 'จองเลย', Chinese: '' } },
    { key: 'cta.enquire', group: 'Call to Action', values: { English: 'Enquire', French: 'Demander', German: '', Thai: '', Chinese: '咨询' } },
    { key: 'footer.rightsReserved', group: 'Footer', values: { English: 'All rights reserved.', French: 'Tous droits réservés.', German: 'Alle Rechte vorbehalten.', Thai: '', Chinese: '' } },
    { key: 'villa.bedrooms', group: 'Villa Detail', values: { English: 'Bedrooms', French: 'Chambres', German: 'Schlafzimmer', Thai: 'ห้องนอน', Chinese: '卧室' } },
    { key: 'villa.fromPerNight', group: 'Villa Detail', values: { English: 'From {price}/night', French: 'À partir de {price}/nuit', German: 'Ab {price}/Nacht', Thai: '', Chinese: '' } }
  ];

  /* Collection sub-sites (CMS-021 / 022 / 023) — mirrors business-unit names */
  CMS.COLLECTIONS = [
    { id: 'COL-01', name: 'Phuket Collection', domain: 'phuket.azurastays.example', status: 'published', languages: ['English', 'Thai'], villaCount: 4 },
    { id: 'COL-02', name: 'Bali Retreats', domain: 'bali.azurastays.example', status: 'published', languages: ['English'], villaCount: 3 },
    { id: 'COL-03', name: 'Koh Samui Estates', domain: 'samui.azurastays.example', status: 'draft', languages: ['English'], villaCount: 2 }
  ];

  /* Collection website common text blocks (CMS-024 / 025) — one record per
     (type, language) pair; the 5 fixed `type` values feed the Footer tab
     dropdowns on CMS-023. */
  CMS.COMMON_TEXT_TYPES = [
    { value: 'book_with_confidence', label: 'Book With Confidence' },
    { value: 'terms_&_condition', label: 'Terms & Condition' },
    { value: 'guarantee', label: 'Guarantee' },
    { value: 'why_work_with_us', label: 'Why Work with Us' },
    { value: 'personal_data_policy', label: 'Personal Data Policy' }
  ];
  CMS.COLLECTION_COMMON_TEXT = [
    { id: 'CCT-01', type: 'book_with_confidence', title: 'Book_With_Confidence_Deposit', text: 'Every reservation is protected by our best-rate guarantee — book direct and pay only a fully refundable deposit until 30 days before arrival.', language: 'en', status: 'active' },
    { id: 'CCT-02', type: 'terms_&_condition', title: 'Standard_Booking_Terms', text: 'Full payment is due 60 days prior to arrival. Cancellations made more than 60 days before check-in receive a full refund less a 5% administration fee.', language: 'en', status: 'active' },
    { id: 'CCT-03', type: 'guarantee', title: 'Best_Rate_Guarantee', text: 'Find the same villa listed cheaper elsewhere within 24 hours of booking and we will match the rate, no questions asked.', language: 'en', status: 'active' },
    { id: 'CCT-04', type: 'why_work_with_us', title: 'Why_Work_With_Us_Intro', text: 'A dedicated concierge, hand-inspected villas, and 24/7 support in five languages — direct booking has never been easier.', language: 'en', status: 'active' },
    { id: 'CCT-05', type: 'personal_data_policy', title: 'Personal_Data_Policy_Summary', text: 'We collect only the guest information required to fulfil a booking and never share it with third parties without consent.', language: 'en', status: 'active' },
    { id: 'CCT-06', type: 'terms_&_condition', title: 'Standard_Booking_Terms', text: 'Le paiement intégral est dû 60 jours avant l’arrivée. Les annulations effectuées plus de 60 jours avant l’arrivée sont intégralement remboursées, moins des frais de 5 %.', language: 'fr', status: 'active' },
    { id: 'CCT-07', type: 'guarantee', title: 'Best_Rate_Guarantee', text: 'Trouvez la même villa moins chère ailleurs dans les 24 heures suivant votre réservation et nous égalerons le tarif.', language: 'fr', status: 'draft' },
    { id: 'CCT-08', type: 'book_with_confidence', title: 'Book_With_Confidence_Deposit', text: 'ทุกการจองได้รับการรับประกันราคาที่ดีที่สุด — จองตรงและชำระเพียงมัดจำที่คืนเงินได้เต็มจำนวนจนถึง 30 วันก่อนเข้าพัก', language: 'th', status: 'draft' }
  ];

  /* Insights articles (CMS-026 / 027) — global, not tied to a single
     collection website; `text` is multilingual (keyed by language code),
     `destinationIds` references CMS.DESTINATIONS (1-3 ids), `image` flags
     whether an illustrative image has been uploaded. */
  CMS.INSIGHTS = [
    { id: 'INS-01', title: 'A First-Timer’s Guide to Bang Tao Beach', author: 'Somchai Anuwat', date: '2026-07-20', status: 'published', image: true,
      destinationIds: ['DST-01'],
      text: { en: 'Bang Tao’s three-kilometre stretch of white sand is the quietest beach on Phuket’s west coast — here’s how to make the most of a first visit, from sunrise walks to the best beachfront lunch spots.' } },
    { id: 'INS-02', title: 'Best Sunset Viewpoints Near Kata', author: 'Somchai Anuwat', date: '2026-06-05', status: 'published', image: true,
      destinationIds: ['DST-02'],
      text: { en: 'Kata’s hillside viewpoints catch the last light over the Andaman Sea. We rank the five best spots for a sundowner, all within a short drive of the villa collection.' } },
    { id: 'INS-03', title: 'Why Ubud Villas Are Booking Out Early in 2027', author: 'Wayan Kertha', date: '2026-08-11', status: 'draft', image: false,
      destinationIds: ['DST-03'],
      text: { en: 'Rice-terrace retreats around Ubud are seeing record early bookings for next season — a look at what is driving demand and how far ahead guests are now planning.' } },
    { id: 'INS-04', title: 'A Culinary Tour of Seminyak', author: 'Wayan Kertha', date: '2026-05-28', status: 'published', image: true,
      destinationIds: ['DST-04', 'DST-03'],
      text: {
        en: 'From beachfront grills to hidden warungs, Seminyak’s dining scene rewards a little local knowledge. Our concierge team shares the reservations worth planning around.',
        fr: 'Des grillades en bord de mer aux warungs cachés, la scène culinaire de Seminyak récompense une connaissance locale. Notre équipe de conciergerie partage les réservations à ne pas manquer.'
      } },
    { id: 'INS-05', title: 'Koh Samui in the Green Season', author: 'Nok Pattaya', date: '2026-04-02', status: 'needs-review', image: false,
      destinationIds: ['DST-05', 'DST-06'],
      text: { en: 'Lower rates, lush landscapes and empty beaches — why the green season (May to October) is Koh Samui’s best-kept secret for villa stays.' } }
  ];

  /* "I Wish" guest wish-list items (CMS-028 / 029) — global; text_1/text_2
     are multilingual (keyed by language code), image_1/2/3 flag whether an
     illustrative image has been uploaded for each of the 3 image slots. */
  CMS.IWISH = [
    { id: 'IW-01', title: 'Private Fireworks Display', price: 1200, status: 'active', image_1: true, image_2: true, image_3: false,
      text_1: { en: 'End the evening with a private fireworks display launched from the beach in front of your villa.' },
      text_2: { en: 'Arranged with 48 hours notice, weather and local permits permitting.' } },
    { id: 'IW-02', title: 'In-Villa Muay Thai Lesson', price: 90, status: 'active', image_1: true, image_2: false, image_3: false,
      text_1: { en: 'A private one-hour Muay Thai lesson on your villa’s lawn or terrace, suitable for all fitness levels.' },
      text_2: { en: 'Includes gloves and pads; instructor speaks English and Thai.' } },
    { id: 'IW-03', title: 'Sunrise Hot-Air Balloon over Ubud', price: 350, status: 'active', image_1: true, image_2: true, image_3: true,
      text_1: {
        en: 'Drift over the rice terraces of Ubud at first light in a private hot-air balloon, with hotel pickup included.',
        fr: 'Survolez les rizières d’Ubud au lever du soleil à bord d’une montgolfière privée, prise en charge à l’hôtel incluse.'
      },
      text_2: { en: 'Followed by a champagne breakfast on landing.' } },
    { id: 'IW-04', title: 'Traditional Thai Cooking Class', price: 75, status: 'draft', image_1: false, image_2: false, image_3: false,
      text_1: { en: 'Learn to cook three classic Thai dishes with your villa’s private chef, using ingredients from the morning market.' },
      text_2: { en: 'Suitable for groups of up to 6 guests.' } }
  ];

  /* Arrival guidance content per villa (CMS-030 / 031) — the 6 content
     blocks are multilingual, stored per record as `content[language_code]
     = { airport_text, pier_text, car_rental_text, other_text,
     check_in_text, stay_text }`. */
  CMS.ARRIVALS = [
    { id: 'ARR-01', villaId: 'PV-101', title: 'Arriving at Villa Sapphire Cliff', status: 'published', updatedAt: '2026-08-10',
      content: { en: {
        airport_text: 'Phuket International Airport (HKT) is a 45-minute drive from the villa. Our driver will meet you at the arrivals hall with a name board.',
        pier_text: 'The nearest pier, Ao Po Grand Marina, is a 30-minute drive for guests arriving by private yacht.',
        car_rental_text: 'Self-drive guests can collect a rental car at the airport; the villa has secure parking for 3 vehicles.',
        other_text: 'A private limousine transfer can be arranged through your concierge for a smoother arrival.',
        check_in_text: 'Standard check-in is from 2:00 PM. Early check-in is subject to availability.',
        stay_text: 'Your dedicated villa host will greet you on arrival with a welcome drink and a full property orientation.'
      } } },
    { id: 'ARR-02', villaId: 'PV-102', title: 'Arriving at Villa Coral Horizon', status: 'published', updatedAt: '2026-07-15',
      content: { en: {
        airport_text: 'Phuket International Airport (HKT) is approximately 35 minutes from the villa by car.',
        pier_text: 'Ao Po Grand Marina is the closest pier for guests arriving by boat, roughly 25 minutes away.',
        car_rental_text: 'Rental cars can be collected curbside at the airport; on-site parking is available for 2 vehicles.',
        other_text: 'Airport limousine transfer can be booked in advance through the concierge desk.',
        check_in_text: 'Check-in begins at 2:00 PM; luggage storage is available for early arrivals.',
        stay_text: 'A welcome fruit platter and orientation tour are provided on arrival.'
      } } },
    { id: 'ARR-03', villaId: 'PV-103', title: 'Arriving at Villa Emerald Bay', status: 'needs-review', updatedAt: '2026-05-01',
      content: { en: {
        airport_text: 'Ngurah Rai International Airport (DPS) is around 50 minutes from the villa depending on traffic.',
        pier_text: 'Benoa Harbour is the nearest pier for guests arriving by boat.',
        car_rental_text: '',
        other_text: 'Private driver transfer is included with stays of 5 nights or longer.',
        check_in_text: 'Check-in is from 2:00 PM.',
        stay_text: ''
      } } },
    { id: 'ARR-04', villaId: 'PV-106', title: 'Arriving at Villa Lotus Terrace', status: 'published', updatedAt: '2026-08-19',
      content: { en: {
        airport_text: 'Samui International Airport (USM) is a 20-minute drive from the villa.',
        pier_text: 'Nathon Pier serves ferries from the mainland, about 35 minutes from the villa.',
        car_rental_text: 'Rental cars are available at the airport arrivals hall.',
        other_text: 'Speedboat transfer from Surat Thani can be arranged on request.',
        check_in_text: 'Standard check-in from 2:00 PM, with flexible early check-in for direct bookings.',
        stay_text: 'Your host will be on-site to welcome you and explain the villa’s amenities.'
      },
      th: {
        airport_text: 'สนามบินนานาชาติสมุย (USM) อยู่ห่างจากวิลล่าโดยรถยนต์ประมาณ 20 นาที',
        pier_text: 'ท่าเรือหน้าทอนให้บริการเรือเฟอร์รี่จากแผ่นดินใหญ่ ห่างจากวิลล่าประมาณ 35 นาที',
        car_rental_text: 'สามารถเช่ารถได้ที่อาคารผู้โดยสารขาเข้าของสนามบิน',
        other_text: 'สามารถจัดเรือเร็วรับส่งจากสุราษฎร์ธานีได้ตามคำขอ',
        check_in_text: 'เช็คอินมาตรฐานตั้งแต่ 14:00 น. เป็นต้นไป',
        stay_text: 'เจ้าหน้าที่ประจำวิลล่าของท่านจะต้อนรับและแนะนำสิ่งอำนวยความสะดวกของวิลล่า'
      } } },
    { id: 'ARR-05', villaId: 'PV-108', title: 'Arriving at Villa Silver Tide', status: 'draft', updatedAt: '2026-06-22',
      content: { en: {
        airport_text: 'Ngurah Rai International Airport (DPS) is roughly 55 minutes from the villa.',
        pier_text: '',
        car_rental_text: '',
        other_text: '',
        check_in_text: 'Check-in from 2:00 PM.',
        stay_text: ''
      } } }
  ];

  /* Restaurant recommendations shown in Guest Portal (CMS-032 / 033) —
     businessUnit mirrors MM's Business Unit List module (bu-001) names so
     the same "Phuket Collection" zone appears consistently. */
  CMS.BUSINESS_UNITS = ['Phuket Collection', 'Koh Samui Estates', 'Bali Retreats', 'Lombok Escapes'];
  CMS.RESTAURANTS = [
    { id: 'RST-01', name: 'Andaman Reef Grill', cuisine: 'Seafood', district: 'Bang Tao', status: 'active', businessUnit: 'Phuket Collection',
      logo: true, address: '99 Bang Tao Beach Road, Cherngtalay, Phuket 83110', latitude: 7.9927, longitude: 98.2954,
      googleMapLink: 'https://maps.google.com/?q=Andaman+Reef+Grill+Bang+Tao', rating: 4.6,
      description: 'Beachfront seafood grill specialising in the morning catch, a short walk from the Phuket Collection villas.',
      foodMenuLink: 'https://azurastays.example/menus/andaman-reef-grill.pdf', hours: '11:00 AM – 10:30 PM daily', phoneNumber: '+66 76 123 456', bannerImages: 3 },
    { id: 'RST-02', name: 'Kata Hill Trattoria', cuisine: 'Italian', district: 'Kata', status: 'active', businessUnit: 'Phuket Collection',
      logo: true, address: '45 Kata Hill Road, Karon, Phuket 83100', latitude: 7.8167, longitude: 98.2975,
      googleMapLink: 'https://maps.google.com/?q=Kata+Hill+Trattoria', rating: 4.4,
      description: 'Family-run Italian trattoria on the Kata hillside with sunset views over the Andaman Sea.',
      foodMenuLink: 'https://azurastays.example/menus/kata-hill-trattoria.pdf', hours: '5:00 PM – 11:00 PM daily', phoneNumber: '+66 76 234 567', bannerImages: 2 },
    { id: 'RST-03', name: 'Sawah Terrace', cuisine: 'Balinese', district: 'Ubud', status: 'active', businessUnit: 'Bali Retreats',
      logo: false, address: 'Jl. Raya Sanggingan, Ubud, Bali 80571', latitude: -8.5069, longitude: 115.2542,
      googleMapLink: 'https://maps.google.com/?q=Sawah+Terrace+Ubud', rating: 4.8,
      description: 'Rice-terrace-view restaurant serving contemporary Balinese tasting menus, a favourite of Bali Retreats guests.',
      foodMenuLink: 'https://azurastays.example/menus/sawah-terrace.pdf', hours: '7:00 AM – 10:00 PM daily', phoneNumber: '+62 361 555 210', bannerImages: 4 },
    { id: 'RST-04', name: 'Seminyak Sunset Bar & Kitchen', cuisine: 'Fusion', district: 'Seminyak', status: 'draft', businessUnit: 'Bali Retreats',
      logo: false, address: 'Jl. Kayu Aya No. 8, Seminyak, Bali 80361', latitude: -8.6906, longitude: 115.1587,
      googleMapLink: 'https://maps.google.com/?q=Seminyak+Sunset+Bar', rating: 4.2,
      description: 'Beach-club style fusion kitchen and cocktail bar, best known for its sunset happy hour.',
      foodMenuLink: '', hours: '12:00 PM – 1:00 AM daily', phoneNumber: '+62 361 555 480', bannerImages: 0 },
    { id: 'RST-05', name: 'Bophut Fisherman’s Table', cuisine: 'Thai Seafood', district: 'Bophut', status: 'active', businessUnit: 'Koh Samui Estates',
      logo: true, address: '22 Fisherman’s Village, Bophut, Koh Samui 84320', latitude: 9.5595, longitude: 100.0625,
      googleMapLink: 'https://maps.google.com/?q=Bophut+Fishermans+Table', rating: 4.5,
      description: 'Fisherman’s Village institution serving Thai-style seafood barbecue on a wooden pier over the water.',
      foodMenuLink: 'https://azurastays.example/menus/bophut-fishermans-table.pdf', hours: '11:00 AM – 10:00 PM daily', phoneNumber: '+66 77 345 678', bannerImages: 3 },
    { id: 'RST-06', name: 'Chaweng Night Market Kitchen', cuisine: 'Street Food', district: 'Chaweng', status: 'inactive', businessUnit: 'Koh Samui Estates',
      logo: false, address: 'Chaweng Night Market, Koh Samui 84320', latitude: 9.5382, longitude: 100.0614,
      googleMapLink: 'https://maps.google.com/?q=Chaweng+Night+Market', rating: 4.0,
      description: 'Open-air street food stalls in the heart of Chaweng, temporarily closed for renovation.',
      foodMenuLink: '', hours: '5:00 PM – 12:00 AM daily', phoneNumber: '+66 77 456 789', bannerImages: 1 }
  ];

  /* Guest contract templates (CMS-034) */
  CMS.CONTRACTS = [
    { id: 'CTR-01', country: 'Thailand', language: 'English', tab: 'terms', sectionKey: 'cancellation_policy', title: 'Cancellation Policy', status: 'active' },
    { id: 'CTR-02', country: 'Thailand', language: 'English', tab: 'terms', sectionKey: 'damage_deposit', title: 'Damage Deposit Terms', status: 'active' },
    { id: 'CTR-03', country: 'Thailand', language: 'Thai', tab: 'terms', sectionKey: 'cancellation_policy', title: 'นโยบายการยกเลิก', status: 'draft' },
    { id: 'CTR-04', country: 'Indonesia', language: 'English', tab: 'terms', sectionKey: 'cancellation_policy', title: 'Cancellation Policy', status: 'active' },
    { id: 'CTR-05', country: 'Indonesia', language: 'English', tab: 'payment', sectionKey: 'payment_schedule', title: 'Payment Schedule', status: 'active' },
    { id: 'CTR-06', country: 'Thailand', language: 'English', tab: 'payment', sectionKey: 'payment_schedule', title: 'Payment Schedule', status: 'needs-review' }
  ];

  CMS.STATUS_BADGE = {
    published: 'badge-success', active: 'badge-success',
    draft: 'badge-neutral',
    'needs-review': 'badge-warning',
    inactive: 'badge-danger'
  };
  CMS.STATUS_LABEL = {
    published: 'Published', active: 'Active', draft: 'Draft', 'needs-review': 'Needs Review', inactive: 'Inactive'
  };
  CMS.villaById = function (id) { return MM.MOCK_PROPERTIES.filter(function (p) { return p.id === id; })[0]; };
})();
