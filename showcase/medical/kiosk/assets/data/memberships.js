/**
 * Flow E — Member Enrollment (FBP / NBP). FBP = First Baby Programme,
 * NBP = Next Baby Programme.
 *
 * DATA_MEMBERSHIP_APPLICATIONS — historical mock records (today's baseline
 * for the Home signature stat); new applications append to
 * localStorage['kiosk_membership_applications'].
 *
 * Schema:
 * - id: string                  "MEM-####" (also shown as the membership number)
 * - programType: string         "FBP" | "NBP"
 * - applicantName: string
 * - contact: string
 * - childBirthDetails: string   free text — birth date/hospital details relevant to the incentive
 * - status: string              "Submitted" | "Active" | "Rejected"
 * - createdAt: string
 */
const DATA_MEMBERSHIP_APPLICATIONS = [
  { id: "MEM-5510", programType: "FBP", applicantName: "Jacinta Moore", contact: "+61 495 832 209", childBirthDetails: "First child born 3 Aug 2026 at Meridian Medical Centre", status: "Active", createdAt: "2026-08-10T10:20:00+10:00" },
  { id: "MEM-5511", programType: "NBP", applicantName: "Zac Ibrahim", contact: "zac.ibrahim@example.com", childBirthDetails: "2nd child, expected 14 Oct 2026, 1st child born 2023 at Meridian Medical Centre", status: "Active", createdAt: "2026-08-22T14:05:00+10:00" },
  { id: "MEM-5512", programType: "FBP", applicantName: "Courtney Ellis", contact: "+61 488 174 053", childBirthDetails: "First child due 28 Nov 2026", status: "Submitted", createdAt: "2026-09-14T09:50:00+10:00" },
  { id: "MEM-5513", programType: "NBP", applicantName: "Vikram Rao", contact: "+61 490 716 638", childBirthDetails: "3rd child, expected 5 Dec 2026, prior children born 2021 & 2024 at Meridian Medical Centre", status: "Active", createdAt: "2026-09-01T11:30:00+10:00" }
];
