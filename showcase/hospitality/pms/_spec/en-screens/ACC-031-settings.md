# ACC-031 — Finance Preferences

**Type:** Full page

**Route:** `AccountController::setting()` — default `/account/setting` (no parameters)

**Module:** Finance & Admin

## Overview
The "Finance Preferences" page of the Finance & Admin module. The action only sets the page title (`settings_text`) and `active_menu = 'acc-ota'`, without querying or setting any other data variables.

## Detailed Description

**Important finding:** the view file `plugins/VillaManagement/src/Template/Account/setting.ctp` is **completely empty** (0 lines) — when accessed directly, the page shows only the layout shell (header, sidebar) with no content/form inside. This is effectively an unimplemented page (or one that only serves as an anchor to toggle a submenu).

Therefore there is no field/column table to describe for the `setting()` action itself.

Per the sidebar structure (`Element/side-bar/account-sidebar.ctp`), the top-level **Finance Preferences** menu item both links to `Account::setting` and acts as a toggle for showing/hiding the `.account-setting-menu` submenu group (Finance Preferences submenu, hidden by default via CSS `display:none`), which contains:
- Supplies (Goods Vendors, Goods Catalog)
- Services (Service Vendors, Billable Services)
- **Assets** (Company Fleet — ACC-032, Mobile Devices, IT Equipment, Mobile Lines)
- HR (Holiday Calendar, Pay Periods)
- Account Structure (Superadmin only)
- Spending Limits (Superadmin only)
- Summary (returns to ACC-029 — `Account::index`)

Thus, the actual "Finance Preferences" content is scattered across the submenus listed above rather than residing directly on the `setting()` page.

## Functions / Actions
- No action buttons on this page itself (the view is empty).
- In terms of navigation, the "Finance Preferences" sidebar menu leads to the submenu items listed above.

## Navigation
- Entered from: Sidebar > Finance & Admin > **Finance Preferences** (top-level item, with a Setting-Icon.png icon).
- Navigates to: no content/links originate from the `setting()` page itself — the actual configuration screens (Company Fleet - ACC-032, Goods Vendors, Billable Services, Holiday Calendar, Pay Periods, Account Structure, Spending Limits, etc.) are accessed directly from the sidebar submenu, not from this page's content.
