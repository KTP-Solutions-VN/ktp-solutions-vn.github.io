# USR-006 — Edit Team Member

**Type:** Full page

**Route:** `UserController::edit($tab, $id, $show_page, $bank_account_id)` — default `user/edit/:tab/:id/:show_page/:bank_account_id`

**Module:** Sign-in & Workforce

## Overview
A full profile-editing form for a staff member, consisting of 4-5 tabs: Identification, Office (workplace/residence/attendance), Admin (work permit, documents, company-issued assets), Payroll, and Bank Account. This is the central screen for completing a staff profile after it is first created on USR-005, and is also where salary locking (`is_lock_sallery`), team leader assignment, and attendance configuration are handled.

## Detailed Description

### Identification Tab (same as USR-005, pre-filled when editing)
All fields as in USR-005 (employee_number, title, first_name, family_name, usage_name, photo/avatar, nationality, date_of_birth, email, professional_email, username, password, phone_number, company_id, subsidiary_id, business_unit_id, starting_date, status, fixed day off, leader_id), pre-populated with the staff member's existing data.

### Office Tab

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Allow Clock-In | `is_clock_in` | Hidden (toggle switch) | yes/no |
| 2 | Enable Location Tracking | `is_tracker` | Hidden (toggle switch) | yes/no |
| 3 | Authorize Remote Work | `is_remote_work_authorized` | Hidden (toggle switch) | yes/no |
| 4 | Times per Week | `times_per_week` | Select | 1–7 |
| 5 | Home Photo | `home_image` | File (jpg/png) | |
| 6 | Home Address | `address` (id=`home_address`) | Text | |
| 7 | Google Maps Link | `home_maps_link` | Text (read-only) | Auto-generated from coordinates |
| 8 | Latitude | `home_latitude` | Text | |
| 9 | Longitude | `home_longitude` | Text | |

### Admin Tab

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Work Permit Status | `work_permit_status` | Select2 | |
| 2 | Expected Completion Date | `expected_completion_date` | Text (date, read-only) | |
| 3 | Permit Expiry Date | `expiry_date` | Text (date, read-only) | |
| 4 | Visa Expiry Date | `visa_expiry_date` | Text (date, read-only) | |
| 5 | Last Notification Date | `last_notification_date` | Text (date, read-only) | |
| 6 | Next Notification Date | `next_notification_date` | Text (date, read-only) | Highlighted in red if overdue |
| 7 | Permit Receipt Image | `permit_receipt_image` | File | |
| 8 | Processing Agency | `employment_agency` | Select2 | |
| 9 | Driving Eligibility | `is_driving` | Select | |
| 10 | Social Security Number | `social_security_number` | Text | |
| 11 | Registration Date | `registration_date` | Text (date, read-only) | |
| 12 | Attached Documents (sub-item) | `title`, `document` | Text + File (image/PDF) | Multi-row document list |
| 13 | Company-Issued Assets (sub-item) | `received_on`, `returned_on` | Date | Asset receipt/return dates |

### Payroll Tab

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Total Salary | `total_amount` | Text (number) | |
| 2 | First-Half Salary | `first_half_amount` | Text (number) | |
| 3 | Second-Half Salary | `second_half_amount` | Text (read-only) | Auto-calculated = total − first half |
| 4 | Daily Rate | `daily_amount` | Text (read-only) | |
| 5 | Currency | `currency_id` | Select | Defaults to the business unit's currency |
| 6 | Lock Salary | — (ajax `updateIsLockSallery`) | Toggle | Locks/unlocks salary editing |

### Bank Account Tab

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Bank | (select bank) | Select | |
| 2 | SWIFT Code | `bank_swift` | Text | |
| 3 | Account Type | (select) | Select | Salary/Reimbursements/Both |
| 4 | Currency | `currency_id` | Select2 | Source: `Currency` table |
| 5 | Account Holder Name | `account_name` | Text | |
| 6 | Account Number | `account_number` | Text | |
| 7 | Attached Document | `document` | File (image/PDF) | |

## Functions / Actions
- **Save (each tab saves independently via ajax/submit):** updates the corresponding data.
- **Delete Bank Account:** calls `user/deleteBankDetail/:id`.
- **Lock/Unlock Salary:** ajax call `updateIsLockSallery`.
- **Assign Team Leader, business unit assignment, multi-select business unit checkboxes** (`business_units[]`).

## Navigation
- Opened from: USR-004 (Edit icon), or automatically after a successful save on USR-005.
- Navigates to: returns to USR-004 after saving; the sub-tabs are not separate screens/popups (they belong to the same page, switched via tabs).
