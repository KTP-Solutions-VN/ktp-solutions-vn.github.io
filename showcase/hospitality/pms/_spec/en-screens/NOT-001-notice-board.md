# NOT-001 — New Announcement

**Type:** Full page

**Route:** `NoticeController::noticeBoard()` — default `/notice/notice-board` (no dedicated pretty route declared in `config/Routes.php`; uses the DashedRoute fallback)

**Module:** Announcements

## Overview
Form allowing a user (Superadmin/Admin/Business Unit Manager, etc.) to create and send a notice/task to another staff member, associated with a business unit, a property (villa), and a service category (cleaning, gardening, maintenance, back-office, other...).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 (list of Business Units) | No | Defaults to the user's currently selected BU; changing it reloads the Property list and recipients via AJAX (`/notice/getBusinessUnitVilla` — actual route `common/getBusinessUnitVilla`) |
| 2 | Property (Villa) | `villa_id` | Select2 (list of Villas by BU) | Yes, if `service_category` = cleaning/garden | Loaded dynamically based on `business_unit_id` |
| 3 | Service Category | `service_category` | Select2: Back Office, Cleaning Services, Gardening Services, Maintenance Services, Renovation Services, Custom Task | Yes | Changing this shows/hides the Task field and loads the corresponding Task list via AJAX (`/notice/getServiceData`) |
| 4 | Task (specific service) | `service_category_id` | Select2 (list of GardenService by type) | Yes | Hidden when `service_category = other` |
| 5 | Task Content | `notice` | Textarea | Yes (when `service_category = other`) | Only shown when "Custom Task" is selected |
| 6 | Deadline | `deadline` | Date-time picker (Bootstrap Material Datetime Picker) | Yes | Cannot select a date before today |
| 7 | Assign To | `assign_to` | Select2: Management / Operator | Yes | Selecting Operator shows an additional Department field |
| 8 | Department | `department_id[]` | Multi-select checkbox (list of Role/Employee Role) | Yes (if Operator) | Used to filter recipients via AJAX `/notice/getUsersByDepartment` |
| 9 | Received By | `received_by` | Select2 (list of Users) | Yes | List depends on BU + department + assign_to |

## Functions / Actions
- **Send:** submits the form, saves a `NoticeBoard` + `NoticeBoardDetail` record, sends a push notification (FCM) to the recipient if the service group is back_office/other/cleaning/garden, then redirects to the Notice List screen (NOT-002).
- **Cancel:** returns to `noticeList`.
- Changes to any select field (BU, service category, assign_to, department) automatically trigger AJAX calls to reload the dependent options (no separate screen).

## Navigation
- Accessed from: the "Assign Task" icon/button on NOT-002 (Announcements & Tasks).
- After successfully sending or canceling: redirects to NOT-002 (Announcements & Tasks).
