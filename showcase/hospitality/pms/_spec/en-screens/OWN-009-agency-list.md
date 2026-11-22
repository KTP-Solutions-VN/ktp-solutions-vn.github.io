# OWN-009 — Partner Agencies

**Type:** Full page

**Route:** `/Owner/agencyList` (controller `Owner`, action `agencyList()`)

**Module:** Owner Relations (Admin)

## Overview

A screen listing all Agencies in the system. Superadmins see all Agencies; other users only see Agencies belonging to the business unit(s) they are assigned to. This is a first-level sidebar menu item ("Partner Agencies"), though it is implemented within `OwnerController` alongside the owner management module.

## Detailed Description

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | No. | — | Number | |
| 2 | Agency Name | `agency_name` | Text | |
| 3 | Country | `country` | Text | |
| 4 | Created By | `created_by` | Text | |
| 5 | Created Date | `created_at` | Datetime | Format `d M Y H:i` |
| 6 | Actions | — | View / Payment / Edit / Delete | |

## Functions / Actions

- **+ Add New**: opens OWN-010 (New Partner Agency).
- **View** (eye icon): opens OWN-012 (Partner Agency Profile).
- **Payment** (dollar icon): opens OWN-011 (Edit Partner Agency) on the "Payment Details" tab, showing the payment detail list.
- **Edit** (pencil icon): opens OWN-011 (Edit Partner Agency) on the "Agency Details" tab.
- **Delete** (trash icon): confirmed via a popup modal, then calls `deleteAgency/{id}` (no dedicated UI).

## Navigation

- Opened from: sidebar menu "Partner Agencies" (`active_menu` 9/91).
- Navigates to:
  - OWN-010 — New Partner Agency
  - OWN-011 — Edit Partner Agency
  - OWN-012 — Partner Agency Profile
