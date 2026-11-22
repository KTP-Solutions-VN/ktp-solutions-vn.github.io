# MNT-007 — Issue Categories

**Type:** Full page
**Route:** maintenance/categories
**Module:** Repair Desk

## Overview
Screen managing the legacy maintenance categories (`MaintenanceCategory`): list, add/edit via modal, delete. Each category is linked to a default priority level. (This is the legacy category management screen, predating the category/subcategory matrix introduced in MNT-013.)

## Detailed Description

### List
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Category Name | `name` | |
| 3 | Priority | `maintenance_priority_id` → name | |
| 4 | Created Date | `created` | |
| 5 | Actions | — | Edit, Delete |

### Add/Edit Form (modal)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Category Name | `name` | Text | Yes | Duplicate check via ajax `checkMaintenanceCategory` |
| 2 | Priority | `maintenance_priority_id` | Select (`MaintenancePriority` list) | Yes | |
| 3 | ID (when editing) | `id` | Hidden | — | |
| 4 | Action | `action` | Hidden (`add`/`edit`) | — | Save logic routed at the controller level |

## Functions / Actions
- **Add New** (modal): adds a new category, `slug` auto-generated from the name.
- **Edit** (modal): updates name/priority.
- **Delete**: deletes the category (`action=delete`, only `id` is sent).

## Navigation
- Entered from: Repair Desk settings menu in the sidebar.
- Navigates to: no navigation to other pages (in-place actions via modal, list reloads).
