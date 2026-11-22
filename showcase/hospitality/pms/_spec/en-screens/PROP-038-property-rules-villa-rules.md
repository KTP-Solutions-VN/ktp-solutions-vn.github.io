# PROP-038 — House Policies

**Type:** Popup (opened from PROP-021)
**Route:** property/villa-rules/:villa_id (villa_id passed base64-encoded)
**Module:** PROP = Property Records

## Overview
A modal/page for declaring the rules applicable to a property: house rules, deposit, electricity & other charges (multilingual), cleaning rules, smoking, and parties & events. Data is stored in the `VillaRule` table.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language`/`language_why_here` | Select (en/fr/zh) | Yes (class `required`) | Applies only to the Electricity & Other Charges field |
| 2 | Electricity & Other Charges | `electricity_other_charges` | Textarea (multilingual) | No | Saved as a serialized array keyed by `language_id` |
| 3 | House Rules | `house_rules` | Textarea | No | Not multilingual |
| 4 | Deposit | `deposit` | Textarea | No | Not multilingual |
| 5 | Cleaning | `cleaning` | Textarea | No | Not multilingual |
| 6 | Smoking | `smoking` | Textarea | No | Not multilingual |
| 7 | Parties/Events | `parties_events` | Textarea | No | Not multilingual |

## Functions / Actions
- "Save" button (`why_here_form_1`) — submits the form, saving to the `VillaRule` table (inserts if no record exists for `villa_id`, otherwise updates), displays a success/error flash message, then redirects back to the same page.
- Changing the language — updates the Electricity & Other Charges content per the saved language (JS).

## Navigation
- Opened from: PROP-021 (Go-Live Blockers) — "Villa Rules" icon (opens as a modal via a data attribute).
- Navigates to: none (saves in place and redirects back to itself).
- Child popup: none.
