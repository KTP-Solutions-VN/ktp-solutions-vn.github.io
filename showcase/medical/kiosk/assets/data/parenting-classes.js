/**
 * Flow D — Birth & Parenting Classes (Meridian Parenting Centre).
 *
 * DATA_PARENTING_COURSES — the 3 class types offered on step 1.
 * DATA_PARENTING_SLOTS — mock available session date/times for step 3.
 * DATA_PARENTING_REGISTRATIONS — historical mock records (today's
 * baseline for the Home signature stat); new registrations append to
 * localStorage['kiosk_parenting_registrations'].
 *
 * Schema (DATA_PARENTING_REGISTRATIONS):
 * - id: string                 "CLS-####"
 * - courseId: string           one of DATA_PARENTING_COURSES ids
 * - guardianName: string
 * - contact: string
 * - childInfo: string          child's age or expected due date, free text
 * - childrenCount: number
 * - attendedBefore: boolean
 * - slotId: string
 * - status: string             "Registered" | "Confirmed" | "Completed" | "Cancelled"
 * - createdAt: string
 */
const DATA_PARENTING_COURSES = [
  { id: "birth-preparation", name: "Birth Preparation Course", icon: "heart-pulse", description: "Three sessions on the stages of labour, pain-relief options and breathing techniques — birth partners welcome." },
  { id: "caring-for-newborn", name: "Caring for Your Newborn", icon: "baby", description: "A hands-on workshop on bathing, swaddling, feeding cues and safe sleep for the first weeks at home." },
  { id: "parenting-essentials", name: "Parenting Essentials Workshop", icon: "graduation", description: "A half-day session combining prenatal fitness, breastfeeding preparation and postnatal recovery tips." }
];

const DATA_PARENTING_SLOTS = [
  { id: "CSL-01", date: "2026-09-20", time: "9:30 AM", seatsTotal: 16, seatsBooked: 9 },
  { id: "CSL-02", date: "2026-09-20", time: "2:00 PM", seatsTotal: 16, seatsBooked: 16 },
  { id: "CSL-03", date: "2026-09-27", time: "9:30 AM", seatsTotal: 16, seatsBooked: 4 },
  { id: "CSL-04", date: "2026-09-27", time: "2:00 PM", seatsTotal: 16, seatsBooked: 12 },
  { id: "CSL-05", date: "2026-10-04", time: "9:30 AM", seatsTotal: 16, seatsBooked: 2 },
  { id: "CSL-06", date: "2026-10-04", time: "2:00 PM", seatsTotal: 16, seatsBooked: 0 }
];

const DATA_PARENTING_REGISTRATIONS = [
  { id: "CLS-4410", courseId: "birth-preparation", guardianName: "Monique Dubois", contact: "+61 494 621 175", childInfo: "Due 10 Nov 2026", childrenCount: 1, attendedBefore: false, slotId: "CSL-01", status: "Confirmed", createdAt: "2026-09-11T10:00:00+10:00" },
  { id: "CLS-4411", courseId: "caring-for-newborn", guardianName: "Matthew Chow", contact: "matthew.chow@example.com", childInfo: "Due 2 Dec 2026", childrenCount: 1, attendedBefore: false, slotId: "CSL-03", status: "Confirmed", createdAt: "2026-09-13T15:30:00+10:00" },
  { id: "CLS-4412", courseId: "parenting-essentials", guardianName: "Hiba Youssef", contact: "+61 486 349 927", childInfo: "2nd child, due 20 Oct 2026", childrenCount: 2, attendedBefore: true, slotId: "CSL-04", status: "Completed", createdAt: "2026-08-25T09:15:00+10:00" },
  { id: "CLS-4413", courseId: "birth-preparation", guardianName: "Eric Tang", contact: "+61 498 152 246", childInfo: "Due 15 Nov 2026", childrenCount: 1, attendedBefore: false, slotId: "CSL-05", status: "Registered", createdAt: "2026-09-16T11:45:00+10:00" }
];
