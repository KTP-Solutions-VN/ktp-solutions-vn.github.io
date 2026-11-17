/* ==========================================================================
   Entity: Booking/Session (Lịch đặt dịch vụ/khóa học/tour)
   Module: Product/Service Management (booking)
   Schema:
     id             string
     productId      string   references DATA_SAN_PHAM_DICH_VU[].id
     productName    string
     date           string   ISO date
     timeSlot       string   e.g. "10:00 AM – 11:00 AM"
     location       string
     capacityTotal  number
     capacityBooked number
     status         string   "open" | "full" | "closed"
     facilitator    string
   ========================================================================== */

const DATA_LICH_DAT_DICH_VU = [
  { id: "SLOT-2001", productId: "PRD-1002", productName: "Hospital Tour — Meridian Women's Clinic", date: "2026-09-20", timeSlot: "10:00 AM – 10:45 AM", location: "Meridian Women's Clinic, Level 3", capacityTotal: 20, capacityBooked: 14, status: "open", facilitator: "Nurse Aileen Koh" },
  { id: "SLOT-2002", productId: "PRD-1002", productName: "Hospital Tour — Meridian Women's Clinic", date: "2026-09-20", timeSlot: "2:00 PM – 2:45 PM", location: "Meridian Women's Clinic, Level 3", capacityTotal: 20, capacityBooked: 20, status: "full", facilitator: "Nurse Aileen Koh" },
  { id: "SLOT-2003", productId: "PRD-1002", productName: "Hospital Tour — Meridian Women's Clinic", date: "2026-09-21", timeSlot: "10:00 AM – 10:45 AM", location: "Meridian Women's Clinic, Level 3", capacityTotal: 20, capacityBooked: 6, status: "open", facilitator: "Nurse Bee Choo" },
  { id: "SLOT-2004", productId: "PRD-1001", productName: "Meridian Prenatal Wellness Package", date: "2026-09-22", timeSlot: "9:00 AM – 9:40 AM", location: "Meridian Specialists Suite 5", capacityTotal: 8, capacityBooked: 3, status: "open", facilitator: "Dr. Victor Teo" },
  { id: "SLOT-2005", productId: "PRD-1001", productName: "Meridian Prenatal Wellness Package", date: "2026-09-22", timeSlot: "11:00 AM – 11:40 AM", location: "Meridian Specialists Suite 5", capacityTotal: 8, capacityBooked: 8, status: "full", facilitator: "Dr. Victor Teo" },
  { id: "SLOT-2006", productId: "PRD-1004", productName: "Prenatal Parenting Class — Childbirth Essentials", date: "2026-09-27", timeSlot: "7:00 PM – 10:00 PM", location: "Meridian Parenting Centre, Room 2", capacityTotal: 24, capacityBooked: 19, status: "open", facilitator: "Ms. Faridah Yusof" },
  { id: "SLOT-2007", productId: "PRD-1004", productName: "Prenatal Parenting Class — Childbirth Essentials", date: "2026-09-28", timeSlot: "9:00 AM – 12:00 PM", location: "Meridian Parenting Centre, Room 1", capacityTotal: 24, capacityBooked: 5, status: "open", facilitator: "Ms. Faridah Yusof" },
  { id: "SLOT-2008", productId: "PRD-1007", productName: "Meridian Fertility Centre Consultation Package", date: "2026-09-24", timeSlot: "3:00 PM – 3:30 PM", location: "Meridian Fertility Centre, Level 6", capacityTotal: 6, capacityBooked: 6, status: "closed", facilitator: "Dr. Hannah Low" }
];
