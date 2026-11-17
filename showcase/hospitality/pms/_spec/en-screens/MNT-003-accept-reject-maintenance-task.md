# MNT-003 — Accept/Reject Maintenance Task

**Type:** Full page
**Route:** maintenance/accept/:id (id base64)
**Module:** Maintenance

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
- Entered from: MNT-001 — Maintenance Log List (clicking on a Pending task).
- Navigates to: after Accept/Reject, returns to MNT-001.
