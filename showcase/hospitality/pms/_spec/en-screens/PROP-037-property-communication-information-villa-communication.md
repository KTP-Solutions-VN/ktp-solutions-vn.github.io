# PROP-037 — Property Communication Information (Villa Communication)

**Type:** Full page
**Route:** property/communication/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Communication" icon)
**Module:** PROP = Properties

## Overview
Page for declaring contact information for the Owner Chat group and the Concierge Chat group for a property, along with a special Requirement note and displayed Bank Account information. Supports adding multiple owner/concierge contacts (dynamic rows via JS). Data is stored in the `VillaCommunication` table.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Owner Chat – Title | `o_title[]` | Text | No | Multiple rows can be added ("+" button) |
| 2 | Owner Chat – Name | `o_name[]` | Text | No | |
| 3 | Owner Chat – Email | `o_email[]` | Text (email) | No | |
| 4 | Owner Chat – Phone | `o_phone[]` | Text | No | |
| 5 | Concierge Chat – Title | `c_title[]` | Text | No | Multiple rows can be added ("+" button) |
| 6 | Concierge Chat – Name | `c_name[]` | Text | No | |
| 7 | Concierge Chat – Email | `c_email[]` | Text (email) | No | |
| 8 | Concierge Chat – Phone | `c_phone[]` | Text | No | |
| 9 | Requirement | `requirement` | Textarea | No | |
| 10 | Bank Account | `bank_account` | Textarea | No | |

## Functions / Actions
- "+" button on each Owner Chat/Concierge Chat block — adds a new contact row (JS renders additional Title/Name/Email/Phone inputs).
- "Save" button (`why_here_form_1`) — submits the entire form, saving to the `VillaCommunication` table (inserts if no record exists, updates if one exists for `villa_id`), displays a flash message, then redirects back to the same page.

## Navigation
- Opened from: PROP-021 (Properties Pending Onboarding Action List) — "Villa Communication" icon.
- Navigates to: none (saves in place and redirects back to itself).
- Child popup: none.
