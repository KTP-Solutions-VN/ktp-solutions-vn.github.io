# TRN-001 — Training Homepage

**Type:** Full page
**Route:** `TrainingController::index()` — `/training/index` (default, DashedRoute)
**Module:** TRN = Training

## Overview
The homepage/landing screen of the Training module. Displays the system logo banner (only for non-Employee users) and has no business data; acts as the entry point when a user selects the "Training" menu.

## Detailed Description
There is no form or data list on this page.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Banner image | `logo-dashboard.png` | Static image | No | Only shown when `user_type != Employee` |

## Functions / Actions
- No business actions on this page (only displays the banner).

## Navigation
- **Entered from:** the system's main menu, "Training" item.
- **Leads to:** no direct navigation links on the page itself; the module's other screens (TRN-002, TRN-007, TRN-008, TRN-010, TRN-011) are accessed via the general navigation menu, not from this page.
