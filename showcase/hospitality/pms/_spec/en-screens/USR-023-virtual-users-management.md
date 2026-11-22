# USR-023 — Department Avatars

**Type:** Full page

**Route:** `UserController::virtualUsers()` — default `user/virtualUsers`

**Module:** Sign-in & Workforce

## Overview
A page for managing a library of "virtual users" (representative avatars by gender/department/country) used for operational departments (concierge, housekeeping, maintenance, renovation, gardening, pool, etc.). Accessible only to Superadmin. Allows filtering by country/gender/department, and adding or editing a virtual user via an in-page panel (drawer).

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `search[country][]` | Multi-select button group | No | Defaults to "All countries" |
| 2 | Gender | `search[gender]` | Button-style select | No | Mr/Mrs |
| 3 | Department | `search[department][]` | Multi-select checkbox | No | concierge/cleaning/maintenance/renovation/garden/pool |

**Displayed List:** a card-based grid of avatars, each card showing an icon image, title (Mr./Mrs.) plus department name, and the applicable country flags.

**Add/Edit Form (drawer/panel on the same page):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Gender (title) | `gender` | Radio | Yes | Mr/Mrs |
| 2 | Department | `department` | Radio | Yes | concierge/cleaning/maintenance/renovation/garden/pool |
| 3 | Applicable Countries | `country[]` | Multi-select checkbox | Yes | |
| 4 | Avatar Image | `icon` | Cropped image (base64) | No | Upload/crop image; defaults to a placeholder image based on gender/department |
| 5 | Record ID (when editing) | `edit_id` | Hidden | No | |

## Functions / Actions
- **Filter:** submits via ajax; the card list updates according to the selected filters without a page reload.
- **Add New:** opens the add panel (the "+" tile on the card grid), enter gender/department/country/image, and submit via ajax to `user/virtualUserSave`.
- **Edit:** click a card to open the edit panel pre-populated with its data, and submit via ajax to `user/virtualUserSave` with `edit_id`.
- **Delete:** calls `user/deleteVirtualUser/:id`.

## Navigation
- Entry point: Workforce menu → Department Avatars (visible/available to Superadmin only).
- No navigation to other pages (add/edit actions are performed directly on this page via ajax).
