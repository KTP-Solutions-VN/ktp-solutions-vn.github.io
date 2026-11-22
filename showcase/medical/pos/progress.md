# POS Prototype — Progress

## Foundation
- [x] ui-kit-brief.md
- [x] assets/css/global.css
- [x] assets/js/global.js
- [x] assets/data/product.js (DATA_PRODUCT)
- [x] assets/data/prescription.js (DATA_PRESCRIPTION)
- [x] assets/data/transaction.js (DATA_TRANSACTION)
- [x] screens/pos-operations/popup-flow.css (shared backdrop/step-tracker for the prescription popup screens)

## Screens (7 total) — ALL COMPLETE
- [x] pos-operations/man-hinh-ban-hang-pos — Sales Terminal: cart, barcode scan, supervisor override modal (signature moment)
- [x] pos-operations/nhap-thong-tin-nhan-khau-hoc-lam-sang-benh-nhan — Patient Intake: patient demographic/clinical intake, allergy alert banner
- [x] pos-operations/ghi-nhan-don-thuoc — Dispensing Record: prescribed/dispensed/remaining qty, auto dispense status
- [x] pos-operations/ghi-nhan-tu-van-duoc — Medication Counseling: counseling checklist, health-record submission simulation + audit line
- [x] pos-operations/ghi-nhan-quy-trinh-can-thiep — Clinical Intervention: intervention record, loops back to Medication Counseling
- [x] pos-operations/dong-ca-thu-ngan — Shift Close-Out: shift KPIs, cash reconciliation, Supervisor Overrides audit panel
- [x] pos-operations/bao-cao-van-hanh-pos — Pharmacy Reports: 5 tabs (Day-End Sales / Shift Close-Outs / Transaction Log / Dispensing Trends / Health Record Uploads)
- [x] index.html (screen picker, launches the Sales Terminal)

## QA — done
- [x] Track 1 (aesthetic critique on the Sales Terminal anchor + Patient Intake / Medication Counseling popups + Shift Close-Out) via full-page screenshots — colors/spacing/elevation/badges/icons all match the brief, no wireframe feel.
- [x] Track 2 (countable checklist) — verified via Playwright: full 7-screen click-through (retail sale w/ override, Rx sale through Patient Intake → Dispensing Record → Medication Counseling → Clinical Intervention loop → Medication Counseling health-record submit → Sales Terminal, then Shift Close-Out, then Pharmacy Reports all 5 tabs) with **0 console/page errors**.
- [x] Bug found & fixed: `.field .error-text` was visible by default instead of only under `.has-error`/`.has-alert` — fixed in `assets/css/global.css` (now `display:none` by default, `display:block` when errored). Re-verified via computed-style check and fresh screenshots.
- [x] Verified allergy chip selection logic (`is-alert`/`is-selected` classes) via computed styles — correct, no stray styling on unselected chips.

## Notes
- Signature moment: Supervisor-Override Audit Trail (grounded in the compliance requirement that sensitive POS actions such as price overrides must be audit-logged). Visible on the Sales Terminal (override modal + line badge), Shift Close-Out (dedicated audit panel + KPI) and Pharmacy Reports (transaction flags).
- The prescription popups (Patient Intake → Dispensing Record → Medication Counseling → Clinical Intervention) are implemented as separate pages, styled as pop-up cards over a dimmed/desaturated Sales Terminal-style backdrop (`.popup-scrim` is `position:absolute` confined to `.pos-device`, not full viewport) — confirmed to render correctly once navigation settles (some mid-navigation screenshots looked "washed out" during testing — a screenshot-timing artifact only, not a real rendering bug).
- Draft prescription state persisted via `localStorage` key `pos_draft_prescription` (see assets/js/global.js `getDraftRx`/`saveDraftRx`/`clearDraftRx`) so the flow survives real page navigation between the popup screens.
- All UI text in English per the shared brand brief; v1 colors were Primary #4C5FFF, Primary-dark #00084A, Accent #019770 (v2 values in ui-kit-brief.md).

## Addition (2026-09-17) — Customer & Rewards panel on the Sales Terminal
- [x] `assets/data/customer.js` (DATA_CUSTOMER) and `assets/data/promotion.js` (DATA_PROMOTION) added — new local mock data, IDs/balances mirrored from Storefront's DATA_KHACH_HANG for unified-commerce consistency.
- [x] Sales Terminal: Customer & Rewards panel (lookup modal w/ touch keypad + quick-pick chips, Redeem Points toggle/input, Promotion/Discount Code apply+validate) added to the cart sidebar, above the cart line list — doesn't disrupt scan/cart/payment/supervisor-override elements.
- [x] `assets/data/transaction.js` schema + `assets/js/global.js`'s shared `POS.completeSale()` extended with `promoCode`/`promoDiscountAmount`/`customerId`/`customerName`/`loyaltyPointsRedeemed`/`loyaltyDiscountAmount` so both the direct Sales Terminal checkout and the Rx popup-flow finalization path carry this detail through.
- [x] Shift Close-Out and Pharmacy Reports transaction tables show a customer-name sub-line + loyalty/promo flag badges; Shift Close-Out gained a 6th KPI card ("Loyalty & Promo").
- [x] Verified via scripted Playwright click-through: lookup (invalid + quick-pick success), redeem toggle/use-max/over-limit clamp, promo apply (invalid/expired/min-spend-not-met/valid), live total recalculation, charge → transaction record fields, the Rx popup flow's shared completeSale() carrying fields through, Shift Close-Out table/KPI rendering. Zero console/page errors across all runs.
- See `ui-kit-brief.md` → "Customer & Rewards panel addition (2026-09-17)" for the full writeup and the 100 pts = A$1.00 redemption-rate note (reused from Storefront checkout's established rate, not a new assumption).

## 2026-11-22 — Regional data: Australia (Sydney)
- A$ amounts (`en-AU`), outlet "Meridian Health — Randwick Pharmacy", +61 mobile numbers, Australian sample names (customers mirror the Storefront's DATA_KHACH_HANG), timestamps with Australia/Sydney offsets.
- GST 10% (`TAX_RATE` in `assets/js/global.js` and the Sales Terminal script); `tax`/`total`/`changeGiven` of every DATA_TRANSACTION record follow that rate.
- Payment methods: Cash / Card / EFTPOS (same value in the pay buttons, report filter chips and data).
- Patient Intake identifies patients by Medicare card number (10 digits + optional IRN) or driver licence number; DATA_PRESCRIPTION stores masked values such as `2123 ****1 1` (field still named `patientNric`).
- Customer lookup accepts the local mobile format (e.g. `0491 234 567`) as well as `+61 …` and membership IDs.

## STATUS: COMPLETE
