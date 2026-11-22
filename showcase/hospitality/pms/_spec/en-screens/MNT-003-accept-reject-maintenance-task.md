# MNT-003 — Repair Triage

**Type:** Full page
**Route:** maintenance/accept/:id (id base64)
**Module:** Repair Desk

## Overview
Screen allowing a technician/assigned handler to view details of a maintenance log currently in Pending status and decide to Accept or Reject the task.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Log Information (villa, category, description, priority) | `data_array` (from `Maintenance`) | Readonly display | — | |
| 2 | Action Type | `type` | Hidden radio/button (`Accepted` or another value) | Yes | Determines the new `status`: `Accepted` → `Open`; otherwise → `Rejected` |

## Functions / Actions
- **Accept**: submits `type=Accepted`, updates `Maintenance.status = Open`, `Maintenance.user_id` = current user, shows a success message, returns to MNT-001.
- **Reject**: submits a different `type`, updates `Maintenance.status = Rejected`, returns to MNT-001.

## Navigation
- Entered from: MNT-001 — Repair Requests (clicking on a Pending task).
- Navigates to: after Accept/Reject, returns to MNT-001.
