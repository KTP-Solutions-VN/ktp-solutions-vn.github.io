# OWP-007 — Activity Tracker

**Type:** Full page

**Route:** `ExternalUserController::status($tab, $villa_id)` — no dedicated friendly route, opened from OWP-005 ("View Activity" icon), of the form `.../status/rental/{villa_id_base64}`

**Module:** Owner Hub

## Overview

A consolidated view of a property's current activities, organized into tabs: Rental, Make-up (quick cleaning), Maintenance, Garden (garden care), Pool, Rate History (rates-logs), Cleaning, and Receipts/Vouchers. Tabs are shown/hidden based on each property's `OwnerVillaExtraSetting` configuration. Each tab's data is loaded via AJAX.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa | Select2 | Yes | List of the owner's currently open properties |

Tab list (each tab's content is loaded via a separate AJAX call):

| # | Tab | Field Code | AJAX Data Source | Notes |
|---|---|---|---|---|
| 1 | Rental | rental | (server-side data via `getVillaStatusAjax`) | Default tab |
| 2 | Make-up | make-up | getMakeUp | Shown/hidden based on configuration |
| 3 | Maintenance | maintenance | getMaintenanceLog | Shown/hidden based on configuration |
| 4 | Garden | garden | getGardenCleanings, getGardenData | Shown/hidden based on configuration; comments can be submitted |
| 5 | Pool | pool | getPoolCleanings | Shown/hidden based on configuration |
| 6 | Rate History | rates-logs | getRatesLogs | |
| 7 | Cleaning | cleaning | getCleaningData | Shown/hidden based on configuration |
| 8 | Receipts/Vouchers | receipts | getClaimExpenseData | |

## Functions / Actions

- Select a property to view its status (select2, auto-reloads the page)
- Switch tabs to view each type of activity
- Submit a comment on the garden care schedule (hidden form, POST to the same `status` action, sends a notification email to the business unit)
- View enlarged images (lightbox) for work evidence

## Navigation

- Accessed from OWP-005 ("View Activity" icon on each property row)
- No navigation to another page (all actions handled in place via AJAX)
