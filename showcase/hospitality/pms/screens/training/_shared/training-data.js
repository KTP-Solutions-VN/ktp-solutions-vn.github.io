/* ==========================================================================
   Training module — shared mock data & helpers, reused across every
   screens/training/<code>/script.js. Loaded after assets/js/global.js and
   before each screen's own script.js.
   Reuses window.MM.MOCK_STAFF for author/reader names. Whole-dataset
   localStorage model (mirrors the Renovation module's REN.getX()/updateX()
   pattern): the full tutorial list (including nested slides) is hydrated
   once from TRN.BASE_TUTORIALS into localStorage, then every screen reads/
   writes through TRN.getTutorials()/TRN.saveTutorials() so edits made on
   one screen (e.g. adding a slide on TRN-003) are visible everywhere else
   in the demo session. The "current user" for My Record / reading sessions
   is Daniel Tan, matching the shell's topbar identity.
   ========================================================================== */

(function () {
  'use strict';

  window.MM = window.MM || {};
  var TRN = window.MM.TRN = window.MM.TRN || {};

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  TRN.CURRENT_USER = 'Daniel Tan';
  TRN.CURRENT_USER_ID = 'STF-01';

  TRN.BUSINESS_UNITS = Array.from(new Set((window.MM.MOCK_PROPERTIES || []).map(function (p) { return p.bu; })));
  TRN.ROLES = ['Concierge', 'Housekeeping', 'Maintenance Technician', 'Team Leader', 'Business Unit Manager', 'Front Office'];
  TRN.ACCESS_LEVELS = ['staff', 'manager', 'admin'];

  /* ---------------------------------------------------------------- */
  /* Base seed data — 7 tutorials with real variety: released/draft,   */
  /* quiz/no-quiz, across all 3 access levels and several audiences.   */
  /* ---------------------------------------------------------------- */

  TRN.BASE_TUTORIALS = [
    {
      id: 'TUT-101',
      title: 'Villa Turnover Cleaning Standards',
      businessUnit: 'Sentosa Collection',
      accessLevel: 'staff',
      roles: ['Housekeeping'],
      image: null,
      isQuiz: true,
      maxQuizFrequency: 60,
      minQuizFrequency: 30,
      isReadyRelease: true,
      releaseDate: '2026-06-01',
      status: 'active',
      createdBy: 'Karen Seah',
      createdAt: '2026-05-20 09:12',
      slides: [
        { id: 'SLD-1', title: 'Welcome & Purpose', mediaType: 'image', text: 'This tutorial covers the standard turnover cleaning checklist used across every Sentosa Collection villa between guest stays.', isQuizPage: false },
        { id: 'SLD-2', title: 'Bathroom Standards', mediaType: 'image', text: 'All bathrooms must be sanitized, mirrors streak-free, and fresh linen placed on every rail before check-in.', isQuizPage: false },
        { id: 'SLD-3', title: 'Bedroom & Linen', mediaType: 'image', text: 'Beds are made with fresh linen, no dust on surfaces, and welcome amenities placed per the villa\'s service tier.', isQuizPage: true, question: 'How often should bed linen be replaced between guest stays?', option1: 'Every stay', option2: 'Every 3 stays', option3: 'Only if visibly soiled', correctAnswer: '1', points: 10, explanation: 'Linen is replaced for every new guest stay regardless of visible condition.' },
        { id: 'SLD-4', title: 'The End', mediaType: 'image', text: 'You have completed the Villa Turnover Cleaning Standards tutorial.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-102',
      title: 'Pool Chemical Safety Procedures',
      businessUnit: 'Byron Bay Retreats',
      accessLevel: 'staff',
      roles: ['Maintenance Technician'],
      image: null,
      isQuiz: true,
      maxQuizFrequency: 90,
      minQuizFrequency: 45,
      isReadyRelease: true,
      releaseDate: '2026-04-15',
      status: 'active',
      createdBy: 'Warren Kelly',
      createdAt: '2026-04-02 14:30',
      slides: [
        { id: 'SLD-1', title: 'Chemical Storage', mediaType: 'image', text: 'Pool chemicals must be stored in a ventilated, locked area away from direct sunlight and separated by type.', isQuizPage: false },
        { id: 'SLD-2', title: 'Personal Protective Equipment', mediaType: 'image', text: 'Always wear gloves and eye protection when handling chlorine or pH balancing chemicals.', isQuizPage: true, question: 'What PPE is mandatory when handling pool chemicals?', option1: 'Gloves and eye protection', option2: 'A hard hat only', option3: 'No PPE required', correctAnswer: '1', points: 10, explanation: 'Gloves and eye protection prevent chemical burns and splash injuries.' },
        { id: 'SLD-3', title: 'The End', mediaType: 'image', text: 'You have completed the Pool Chemical Safety Procedures tutorial.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-103',
      title: 'Guest Concierge Service Standards',
      businessUnit: 'Sentosa Collection',
      accessLevel: 'manager',
      roles: ['Concierge', 'Business Unit Manager'],
      image: null,
      isQuiz: false,
      maxQuizFrequency: 0,
      minQuizFrequency: 0,
      isReadyRelease: true,
      releaseDate: '2026-03-10',
      status: 'active',
      createdBy: 'Daniel Tan',
      createdAt: '2026-02-28 11:00',
      slides: [
        { id: 'SLD-1', title: 'Greeting Guests on Arrival', mediaType: 'image', text: 'Concierge staff greet every guest by name within 2 minutes of arrival, offering a welcome drink and villa orientation.', isQuizPage: false },
        { id: 'SLD-2', title: 'Handling Special Requests', mediaType: 'video', text: 'Watch this short walkthrough on logging and escalating special requests through the concierge desk system.', isQuizPage: false },
        { id: 'SLD-3', title: 'The End', mediaType: 'image', text: 'You have completed the Guest Concierge Service Standards tutorial.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-104',
      title: 'Emergency Evacuation Procedures',
      businessUnit: 'Noosa Estates',
      accessLevel: 'admin',
      roles: ['Concierge', 'Housekeeping', 'Maintenance Technician', 'Team Leader', 'Business Unit Manager', 'Front Office'],
      image: null,
      isQuiz: true,
      maxQuizFrequency: 180,
      minQuizFrequency: 90,
      isReadyRelease: true,
      releaseDate: '2026-01-05',
      status: 'active',
      createdBy: 'Nicole Parker',
      createdAt: '2025-12-20 10:00',
      slides: [
        { id: 'SLD-1', title: 'Evacuation Routes', mediaType: 'image', text: 'Every villa has two marked evacuation routes — review the site map posted at the staff entrance.', isQuizPage: false },
        { id: 'SLD-2', title: 'Assembly Points', mediaType: 'image', text: 'All staff and guests must gather at the designated assembly point, then await the headcount from the duty manager.', isQuizPage: true, question: 'Who confirms the headcount at the assembly point?', option1: 'The duty manager', option2: 'Any available guest', option3: 'No headcount is required', correctAnswer: '1', points: 10, explanation: 'The duty manager is responsible for confirming all staff and guests are accounted for.' },
        { id: 'SLD-3', title: 'The End', mediaType: 'image', text: 'You have completed the Emergency Evacuation Procedures tutorial.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-105',
      title: 'New Booking System Walkthrough',
      businessUnit: 'Byron Bay Retreats',
      accessLevel: 'staff',
      roles: ['Front Office'],
      image: null,
      isQuiz: false,
      maxQuizFrequency: 0,
      minQuizFrequency: 0,
      isReadyRelease: false,
      releaseDate: null,
      status: 'inactive',
      createdBy: 'Warren Kelly',
      createdAt: '2026-08-18 16:45',
      slides: [
        { id: 'SLD-1', title: 'Draft — Booking Screen Overview', mediaType: 'image', text: 'Draft content, still being written. Do not release yet.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-106',
      title: 'Fire Safety & First Aid',
      businessUnit: 'Sentosa Collection',
      accessLevel: 'manager',
      roles: ['Team Leader'],
      image: null,
      isQuiz: true,
      maxQuizFrequency: 120,
      minQuizFrequency: 60,
      isReadyRelease: true,
      releaseDate: '2026-02-01',
      status: 'active',
      createdBy: 'Daniel Tan',
      createdAt: '2026-01-20 09:00',
      slides: [
        { id: 'SLD-1', title: 'Fire Extinguisher Types', mediaType: 'image', text: 'Know the difference between CO2, foam, and dry powder extinguishers and when to use each.', isQuizPage: true, question: 'Which extinguisher type is safe for electrical fires?', option1: 'CO2', option2: 'Water', option3: 'Foam', correctAnswer: '1', points: 10, explanation: 'CO2 extinguishers do not conduct electricity, making them safe for electrical fires.' },
        { id: 'SLD-2', title: 'Basic First Aid', mediaType: 'video', text: 'Review the basic first-aid response steps for common on-site injuries.', isQuizPage: false },
        { id: 'SLD-3', title: 'The End', mediaType: 'image', text: 'You have completed the Fire Safety & First Aid tutorial.', isQuizPage: false }
      ]
    },
    {
      id: 'TUT-107',
      title: 'Garden & Landscaping Basics',
      businessUnit: 'Noosa Estates',
      accessLevel: 'staff',
      roles: ['Housekeeping', 'Maintenance Technician'],
      image: null,
      isQuiz: false,
      maxQuizFrequency: 0,
      minQuizFrequency: 0,
      isReadyRelease: true,
      releaseDate: '2025-11-01',
      status: 'active',
      createdBy: 'Nicole Parker',
      createdAt: '2025-10-25 13:20',
      slides: [
        { id: 'SLD-1', title: 'Lawn Care Schedule', mediaType: 'image', text: 'Lawns are mowed weekly and hedges trimmed on a 2-week cycle across all Noosa Estates properties.', isQuizPage: false },
        { id: 'SLD-2', title: 'The End', mediaType: 'image', text: 'You have completed the Garden & Landscaping Basics tutorial.', isQuizPage: false }
      ]
    }
  ];

  /* User training / reading records — drives TRN-008 (My Record) and the
     "already read" state on TRN-007 (Library). Keyed by staff + tutorial. */
  TRN.BASE_RECORDS = [
    { id: 'UTR-1', staffId: 'STF-01', staffName: 'Daniel Tan', tutorialId: 'TUT-101', viewCount: 2, lastReadDate: '2026-07-10', isCompleteRead: true },
    { id: 'UTR-2', staffId: 'STF-01', staffName: 'Daniel Tan', tutorialId: 'TUT-103', viewCount: 1, lastReadDate: '2026-03-15', isCompleteRead: true },
    { id: 'UTR-3', staffId: 'STF-01', staffName: 'Daniel Tan', tutorialId: 'TUT-104', viewCount: 1, lastReadDate: '2026-01-12', isCompleteRead: true },
    { id: 'UTR-4', staffId: 'STF-01', staffName: 'Daniel Tan', tutorialId: 'TUT-106', viewCount: 3, lastReadDate: '2026-08-05', isCompleteRead: true },
    { id: 'UTR-5', staffId: 'STF-02', staffName: 'Warren Kelly', tutorialId: 'TUT-102', viewCount: 1, lastReadDate: '2026-04-20', isCompleteRead: true },
    { id: 'UTR-6', staffId: 'STF-04', staffName: 'Karen Seah', tutorialId: 'TUT-101', viewCount: 4, lastReadDate: '2026-08-22', isCompleteRead: true },
    { id: 'UTR-7', staffId: 'STF-05', staffName: 'Ben Sullivan', tutorialId: 'TUT-102', viewCount: 1, lastReadDate: '2026-05-01', isCompleteRead: true },
    { id: 'UTR-8', staffId: 'STF-03', staffName: 'Nicole Parker', tutorialId: 'TUT-104', viewCount: 2, lastReadDate: '2026-02-14', isCompleteRead: true }
  ];

  /* ---------------------------------------------------------------- */
  /* Whole-dataset localStorage persistence                            */
  /* ---------------------------------------------------------------- */

  TRN.TUTORIALS_KEY = 'mm_trn_tutorials';
  TRN.resetTutorials = function () { localStorage.setItem(TRN.TUTORIALS_KEY, JSON.stringify(TRN.BASE_TUTORIALS)); };
  TRN.getTutorials = function () {
    var raw = localStorage.getItem(TRN.TUTORIALS_KEY);
    if (!raw) { TRN.resetTutorials(); raw = localStorage.getItem(TRN.TUTORIALS_KEY); }
    try { return JSON.parse(raw); } catch (e) { TRN.resetTutorials(); return clone(TRN.BASE_TUTORIALS); }
  };
  TRN.saveTutorials = function (list) { localStorage.setItem(TRN.TUTORIALS_KEY, JSON.stringify(list)); };
  TRN.getTutorial = function (id) {
    var list = TRN.getTutorials();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };
  TRN.updateTutorial = function (id, mutateFn) {
    var list = TRN.getTutorials();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { mutateFn(list[i]); break; } }
    TRN.saveTutorials(list);
    return TRN.getTutorial(id);
  };
  TRN.addTutorial = function (tutorial) {
    var list = TRN.getTutorials();
    list.unshift(tutorial);
    TRN.saveTutorials(list);
    return tutorial;
  };
  TRN.deleteTutorial = function (id) {
    var list = TRN.getTutorials().filter(function (t) { return t.id !== id; });
    TRN.saveTutorials(list);
  };

  TRN.addSlide = function (tutorialId, slide) {
    return TRN.updateTutorial(tutorialId, function (t) { t.slides = t.slides || []; t.slides.push(slide); });
  };
  TRN.updateSlide = function (tutorialId, slideId, mutateFn) {
    return TRN.updateTutorial(tutorialId, function (t) {
      var s = (t.slides || []).find(function (x) { return x.id === slideId; });
      if (s) mutateFn(s);
    });
  };
  TRN.deleteSlide = function (tutorialId, slideId) {
    return TRN.updateTutorial(tutorialId, function (t) {
      t.slides = (t.slides || []).filter(function (x) { return x.id !== slideId; });
    });
  };

  TRN.RECORDS_KEY = 'mm_trn_records';
  TRN.resetRecords = function () { localStorage.setItem(TRN.RECORDS_KEY, JSON.stringify(TRN.BASE_RECORDS)); };
  TRN.getRecords = function () {
    var raw = localStorage.getItem(TRN.RECORDS_KEY);
    if (!raw) { TRN.resetRecords(); raw = localStorage.getItem(TRN.RECORDS_KEY); }
    try { return JSON.parse(raw); } catch (e) { TRN.resetRecords(); return clone(TRN.BASE_RECORDS); }
  };
  TRN.saveRecords = function (list) { localStorage.setItem(TRN.RECORDS_KEY, JSON.stringify(list)); };

  /* Record (or bump) a reading session for the current user + tutorial —
     called by TRN-009 when the reader reaches "The End" and hits Stop. */
  TRN.recordReading = function (tutorialId, staffId, staffName, complete) {
    var list = TRN.getRecords();
    var rec = list.find(function (r) { return r.tutorialId === tutorialId && r.staffId === staffId; });
    var today = new Date().toISOString().slice(0, 10);
    if (rec) {
      rec.viewCount += 1;
      rec.lastReadDate = today;
      rec.isCompleteRead = !!complete;
    } else {
      list.push({ id: MM.uid('UTR'), staffId: staffId, staffName: staffName, tutorialId: tutorialId, viewCount: 1, lastReadDate: today, isCompleteRead: !!complete });
    }
    TRN.saveRecords(list);
  };

  /* ---------------------------------------------------------------- */
  /* Formatting / badge helpers                                        */
  /* ---------------------------------------------------------------- */

  TRN.TODAY = '2026-09-03';

  TRN.dateShort = function (d) {
    if (!d) return '–';
    var dt = new Date(d + 'T00:00:00');
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  TRN.dateTime = function (d) {
    if (!d) return '–';
    return d;
  };

  TRN.levelBadge = function (level) {
    var map = { staff: 'badge-info', manager: 'badge-warning', admin: 'badge-danger' };
    var label = level ? level.charAt(0).toUpperCase() + level.slice(1) : '–';
    return '<span class="badge ' + (map[level] || 'badge-neutral') + '">' + label + '</span>';
  };

  TRN.statusBadge = function (status) {
    var map = { active: 'badge-success', inactive: 'badge-neutral' };
    var label = status === 'active' ? 'Released' : 'Draft / Hidden';
    return '<span class="badge ' + (map[status] || 'badge-neutral') + '">' + label + '</span>';
  };

  /* Due-status for a reading record, based on the tutorial's quiz
     frequency window (min/max days) counted from lastReadDate. */
  TRN.dueStatus = function (tutorial, lastReadDate) {
    if (!lastReadDate) return { label: 'New', cls: 'badge-info' };
    if (!tutorial || !tutorial.isQuiz || !tutorial.maxQuizFrequency) return { label: 'Up to date', cls: 'badge-success' };
    var last = new Date(lastReadDate + 'T00:00:00');
    var today = new Date(TRN.TODAY + 'T00:00:00');
    var daysSince = Math.round((today - last) / 86400000);
    var dueDate = new Date(last.getTime() + tutorial.maxQuizFrequency * 86400000);
    if (daysSince >= tutorial.maxQuizFrequency) return { label: 'Overdue', cls: 'badge-danger' };
    if (daysSince >= tutorial.minQuizFrequency) return { label: 'Due Now', cls: 'badge-warning' };
    return { label: 'Due on ' + TRN.dateShort(dueDate.toISOString().slice(0, 10)), cls: 'badge-neutral' };
  };

  /* Tutorials a given user_type/role may access, per the legacy rule:
     Employees see only staff-level content; Team Leader/BU Manager see
     staff+manager; Admin sees everything. Demo always evaluates as
     Business Unit Manager (the shell's logged-in persona). */
  TRN.visibleLevels = function () { return ['staff', 'manager', 'admin']; };

  TRN.rolesText = function (roles) { return (roles || []).join(', '); };
})();
