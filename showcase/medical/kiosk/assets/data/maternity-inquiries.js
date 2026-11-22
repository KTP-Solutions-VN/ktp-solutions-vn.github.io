/**
 * Flow C — Maternity Package Sign-up (Antenatal Care Plan / Birthing Suite
 * Reservation). Booking/Session entity shape (lifecycle: Scheduled -> Confirmed ->
 * (Rescheduled/Cancelled) -> Completed/No-show) — here "Submitted" stands
 * in for the kiosk-side "Scheduled" state, since the actual appointment
 * slot is set later by the patient service team after this kiosk hand-off.
 *
 * DATA_MATERNITY_DOCTORS — short mock list for the "preferred
 * doctor/specialist" optional field in step 3 (simulated searchable select
 * via <input list>, no custom dropdown component needed).
 *
 * DATA_MATERNITY_INQUIRIES — historical mock records, today's baseline for
 * the Home signature stat. New submissions append to
 * localStorage['kiosk_maternity_inquiries'].
 *
 * Schema (DATA_MATERNITY_INQUIRIES):
 * - id: string                     "MAT-####"
 * - serviceType: string            "Antenatal Care Plan" | "Birthing Suite Reservation"
 * - motherName: string
 * - contact: string
 * - dueDate: string|null           ISO date, optional
 * - trimester: string|null         "1st" | "2nd" | "3rd" | "Not yet confirmed"
 * - pregnancyType: string          "First pregnancy" | "Subsequent pregnancy"
 * - hasComplications: boolean
 * - complicationsNote: string|null
 * - preferredDoctor: string|null
 * - status: string                 "Submitted" | "Confirmed" | "Completed" | "Cancelled"
 * - createdAt: string              ISO datetime
 */
const DATA_MATERNITY_DOCTORS = [
  "Dr. Catherine Wu — Obstetrics & Gynaecology",
  "Dr. Hamish Macleod — Maternal-Fetal Medicine",
  "Dr. Fatima Ali — Obstetrics & Gynaecology",
  "Dr. Peter Vlahos — Obstetrics & Gynaecology",
  "Dr. Sophia Marino — Maternal-Fetal Medicine",
  "No preference / recommend a specialist for me"
];

const DATA_MATERNITY_INQUIRIES = [
  { id: "MAT-3301", serviceType: "Antenatal Care Plan", motherName: "Rania Khalil", contact: "+61 497 243 361", dueDate: "2027-02-14", trimester: "1st", pregnancyType: "First pregnancy", hasComplications: false, complicationsNote: null, preferredDoctor: "Dr. Catherine Wu — Obstetrics & Gynaecology", status: "Confirmed", createdAt: "2026-09-12T10:15:00+10:00" },
  { id: "MAT-3302", serviceType: "Birthing Suite Reservation", motherName: "Jenny Zhang", contact: "jenny.zhang@example.com", dueDate: "2026-11-02", trimester: "3rd", pregnancyType: "Subsequent pregnancy", hasComplications: false, complicationsNote: null, preferredDoctor: "Dr. Hamish Macleod — Maternal-Fetal Medicine", status: "Confirmed", createdAt: "2026-09-13T09:40:00+10:00" },
  { id: "MAT-3303", serviceType: "Antenatal Care Plan", motherName: "Sana Malik", contact: "+61 482 516 640", dueDate: "2027-01-20", trimester: "2nd", pregnancyType: "First pregnancy", hasComplications: true, complicationsNote: "Gestational diabetes screening flagged by GP, needs closer monitoring.", preferredDoctor: null, status: "Submitted", createdAt: "2026-09-15T13:22:00+10:00" },
  { id: "MAT-3304", serviceType: "Birthing Suite Reservation", motherName: "Isabella Santos", contact: "+61 493 468 812", dueDate: "2026-12-05", trimester: "3rd", pregnancyType: "Subsequent pregnancy", hasComplications: false, complicationsNote: null, preferredDoctor: "Dr. Peter Vlahos — Obstetrics & Gynaecology", status: "Completed", createdAt: "2026-08-30T11:00:00+10:00" },
  { id: "MAT-3305", serviceType: "Antenatal Care Plan", motherName: "Amy Huang", contact: "amy.huang@example.com", dueDate: null, trimester: "Not yet confirmed", pregnancyType: "First pregnancy", hasComplications: false, complicationsNote: null, preferredDoctor: null, status: "Submitted", createdAt: "2026-09-16T16:05:00+10:00" }
];
