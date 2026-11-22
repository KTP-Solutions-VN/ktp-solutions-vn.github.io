# MNT-008 — Urgency Levels

**Type:** Full page
**Route:** maintenance/priorities
**Module:** Repair Desk

## Overview
Screen managing maintenance priority levels (`MaintenancePriority`): list, add/edit via modal, delete. Each priority level has a response time and a display color.

## Detailed Description

### List
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Priority Name | `name` | |
| 3 | Response Time | `response_time` | Unit: hours |
| 4 | Color | `color` | Color swatch (input type=color, disabled) |
| 5 | Created Date | `created` | |
| 6 | Actions | — | Edit, Delete |

### Add/Edit Form (modal)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Name | `name` | Text | Yes | Duplicate check via ajax `checkMaintenancePriority` |
| 2 | Response Time | `response_time` | Numeric text (hours) | Yes | Used to calculate `due_date` when creating a maintenance log |
| 3 | Color | `color` | Color picker | Yes | |
| 4 | ID (when editing) | `id` | Hidden | — | |
| 5 | Action | `action` | Hidden (`add`/`edit`) | — | |

## Functions / Actions
- **Add New / Edit** (modal): saves the `MaintenancePriority` record, `slug` auto-generated from the name.
- **Delete**: deletes the priority level (`action=delete`).

## Navigation
- Entered from: Repair Desk settings menu in the sidebar.
- Navigates to: no navigation to other pages (in-place actions via modal).
