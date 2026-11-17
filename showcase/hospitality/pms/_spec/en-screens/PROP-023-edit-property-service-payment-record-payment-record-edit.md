# PROP-023 — Edit Property Service Payment Record (Payment Record Edit)

**Type:** Full page
**Route:** property/payment-record-edit/:villa_id/:payment_id (both parameters passed base64-encoded)
**Module:** PROP = Properties

## Overview
Form for editing an existing service payment record (Villa Payment Record) for a property — including service type, amount, applicable period, payer, and attached documentation.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Id (hidden) | `id` | Hidden | — | VillaPaymentRecord record id |
| 2 | Villa Service | `villa_services` | Select (list of VillaService) | Yes | |
| 3 | Payment Amount | `amount` | Text | Yes | |
| 4 | Payment From | `payment_from` | Text (date picker `d F, Y`) | Yes | |
| 5 | Payment To | `payment_to` | Text (date picker `d F, Y`) | Yes | |
| 6 | Payment Date | `payment_date` | Text (date picker `d F, Y`) | Yes | |
| 7 | Paid By | `paid_by` | Select (Azura / Owner) | No | |
| 8 | Payment Details | `payment_details` | Text | Yes | |
| 9 | Payment Document | `payment_document` | File upload (jpg/png/jpeg/gif/pdf) | No | If no new file is selected, the existing file is retained; image preview shown if applicable |

## Functions / Actions
- "Save" button (`name="common_area_form"`) — converts dates to the standard format, uploads the supporting document (if provided), saves to `VillaPaymentRecord`; writes an Activity Log entry; displays a flash message; redirects to `service-fee/{base64(villa_id)}`.
- "Cancel" button (`type=reset`) — resets the form to its original values (does not leave the page).

## Navigation
- Opened from: the property's "Service Fee" page (outside the scope of the current spec) — payment record list, clicking Edit on a row.
- Navigates to: `service-fee/{villa_id}` after a successful save.
- Child popup: none.
