# PROP-036 — Property Confirmation Information (Villa Confirmation)

**Type:** Full page
**Route:** property/confirmation/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Confirmation" icon)
**Module:** PROP = Properties

## Overview
Page for entering/composing the confirmation letter sent to guests upon a successful booking for a property: a welcome message per language, pick-up instructions, and parking instructions. Data is stored in the `VillaConfirmation` table; multilingual fields are serialized by language code.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language`/`language_why_here` | Select (en/fr/zh) | Yes (class `required`) | Changing the language → JS reloads the `welcome_message` content for the saved language (if any) |
| 2 | Welcome Message | `welcome_message` | Textarea (multilingual) | No | Saved as a serialized array keyed by `language_id` |
| 3 | Pick Up | `pick_up` | Textarea | No | Not multilingual (shared) |
| 4 | Parking | `parking` | Textarea | No | Not multilingual (shared) |

## Functions / Actions
- "Save" button (`why_here_form_1`) — submits the form, saving to the `VillaConfirmation` table (inserts if no record exists for `villa_id`, otherwise updates), displays a success/error flash message, then redirects back to the same page.
- Changing the language — updates the Welcome Message textarea with the content saved for that language (JS, no page reload).

## Navigation
- Opened from: PROP-021 (Properties Pending Onboarding Action List) — "Villa Confirmation" icon.
- Navigates to: none (saves in place and redirects back to itself).
- Child popup: none.
