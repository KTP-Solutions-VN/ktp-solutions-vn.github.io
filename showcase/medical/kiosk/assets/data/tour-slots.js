/**
 * DATA_TOUR_SLOTS — mock availability for Flow B (Schedule a Visit — guided ward tour).
 * Schema:
 * - id: string
 * - date: string (ISO date, YYYY-MM-DD)
 * - time: string (display label, e.g. "10:00 AM")
 * - facilitator: string
 * - capacityTotal: number
 * - capacityBooked: number   (slot is full when booked >= total)
 *
 * DATA_TOUR_BOOKINGS — Booking/Session entity, historical mock used
 * as today's baseline for the Home signature stat. New bookings created
 * during a live demo session are appended to localStorage['kiosk_tour_bookings'],
 * never mutating this file.
 * Lifecycle: Scheduled -> Confirmed -> (Rescheduled/Cancelled) -> Completed/No-show
 */
const DATA_TOUR_SLOTS = [
  { id: "VSL-01", date: "2026-09-17", time: "10:00 AM", facilitator: "Nurse Clinician Fiona McKenzie", capacityTotal: 8, capacityBooked: 8 },
  { id: "VSL-02", date: "2026-09-17", time: "1:30 PM", facilitator: "Nurse Clinician Fiona McKenzie", capacityTotal: 8, capacityBooked: 5 },
  { id: "VSL-03", date: "2026-09-17", time: "4:00 PM", facilitator: "Guest Services — Liam Doyle", capacityTotal: 6, capacityBooked: 2 },
  { id: "VSL-04", date: "2026-09-18", time: "10:00 AM", facilitator: "Nurse Clinician Fiona McKenzie", capacityTotal: 8, capacityBooked: 3 },
  { id: "VSL-05", date: "2026-09-18", time: "1:30 PM", facilitator: "Guest Services — Liam Doyle", capacityTotal: 6, capacityBooked: 6 },
  { id: "VSL-06", date: "2026-09-18", time: "4:00 PM", facilitator: "Nurse Clinician Anna Novak", capacityTotal: 8, capacityBooked: 1 },
  { id: "VSL-07", date: "2026-09-19", time: "10:00 AM", facilitator: "Nurse Clinician Anna Novak", capacityTotal: 8, capacityBooked: 4 },
  { id: "VSL-08", date: "2026-09-19", time: "1:30 PM", facilitator: "Guest Services — Liam Doyle", capacityTotal: 6, capacityBooked: 0 },
  { id: "VSL-09", date: "2026-09-20", time: "10:00 AM", facilitator: "Nurse Clinician Fiona McKenzie", capacityTotal: 8, capacityBooked: 2 },
  { id: "VSL-10", date: "2026-09-20", time: "1:30 PM", facilitator: "Nurse Clinician Anna Novak", capacityTotal: 8, capacityBooked: 5 }
];

const DATA_TOUR_BOOKINGS = [
  { id: "VIS-2210", slotId: "VSL-01", visitorName: "Leila Mansour", contact: "+61 491 375 582", guestCount: 2, status: "Completed", createdAt: "2026-09-15T09:20:00+10:00" },
  { id: "VIS-2211", slotId: "VSL-02", visitorName: "Patrick Byrne", contact: "patrick.byrne@example.com", guestCount: 1, status: "Confirmed", createdAt: "2026-09-16T11:05:00+10:00" },
  { id: "VIS-2212", slotId: "VSL-04", visitorName: "Ayesha Qureshi", contact: "+61 482 950 416", guestCount: 3, status: "Confirmed", createdAt: "2026-09-16T14:40:00+10:00" },
  { id: "VIS-2213", slotId: "VSL-06", visitorName: "Toby Price", contact: "+61 495 687 730", guestCount: 2, status: "No-show", createdAt: "2026-09-14T10:10:00+10:00" },
  { id: "VIS-2214", slotId: "VSL-07", visitorName: "Victoria Lane", contact: "victoria.lane@example.com", guestCount: 1, status: "Confirmed", createdAt: "2026-09-17T08:55:00+10:00" }
];
