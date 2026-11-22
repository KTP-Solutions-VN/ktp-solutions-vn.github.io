# BOOK-026 — Minimum Nights
**Type:** Full page
**Route:** booking/minimum (base path `/VM` appears in the application's AJAX calls)
**Module:** Reservations

## Overview
A screen that allows managers to view and quickly update the minimum length of stay (minimum stay) applied to each villa, filtered by Business Unit/Zone.

## Detailed Description
**Filters (top of page):**
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit / Zone | `business_unit_id` | Select2 (dropdown) | No | Defaults to "All"; changing the value auto-submits the form to reload the corresponding villa list (also supports a Zone combining multiple BUs) |

**Villa List Table (inline editing on each row):**
| Column | Field Code | Data Type / Input | Notes |
|---|---|---|---|
| Property (Villa) | `name` (readonly), `id_<i>` (hidden) | Text display | Villa name, not editable |
| Minimum Stay | `minimum_stay_<i>` | Text/number input | The villa's current value; if not yet configured, displays "To Fill" and the row is highlighted in orange as a warning |

## Functions / Actions
- Changing the Business Unit/Zone automatically reloads the villa list within the selected scope.
- Edit the "Minimum Stay" value directly on each villa row.
- "Update" button (`#confirm_send`): submits all changes (AJAX to `saveMinimumStay`) and displays a success/error message directly on the page.
- The table supports DataTable functionality (pagination, remembering rows-per-page via cookie).

## Navigation
- Opened from: Reservations menu.
- Navigates to: none (saving is performed in place via AJAX).
- Sub-popups: none.
