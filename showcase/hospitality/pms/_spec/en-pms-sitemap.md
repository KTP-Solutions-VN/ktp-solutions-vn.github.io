# Sitemap — Azura Manager PMS (English)

This document lists every screen (including popups/modals) of the Azura Manager PMS system, prepared to support the UI/UX redesign initiative. Each screen has a unique code; detailed specifications (fields, data types, etc.) are available in `output/en-screens/<code>-*.md`.

## Screen Count Overview by Module

| # | Module | Prefix | Screen/Popup Count |
|---|---|---|---|
| 1 | Sign-in & Workforce | LOG, USR | 28 |
| 2 | Portfolio Setup | PROP, COMP, BU, VCS | 117 |
| 3 | Configuration | CS, SET | 26 |
| 4 | Reservations | BOOK | 100 |
| 5 | Owner Relations (Admin) | OWN | 22 |
| 6 | Owner Hub | OWP | 31 |
| 7 | Guest Hub | GST | 11 |
| 8 | Property Care | OPR, MNT, REN, TRN | 79 |
| 9 | Investors & Stock | FUND, INV | 18 |
| 10 | In-Stay Services | VSV | 38 |
| 11 | Web & Media | CMS, EMT, NOT, TXT, PHO, VID, OTA, PAGE | 68 |
| 12 | Finance & Admin | ACC | 41 |
| | **Total** | | **579** |

## Legend

- **Screen code**: `<PREFIX>-<sequence number>` for a full page (e.g. `BOOK-001`), `<PREFIX>-<number>-P<n>` for a popup/modal child of that page (e.g. `BOOK-001-P1`).
- **Type**: Full page or Popup/Modal (parent screen noted).
- **Opened From**: the parent screen code that leads to this screen (mainly applies to popups).
- **Navigates To**: screen codes reachable from this screen (derived from code analysis; may not be 100% exhaustive for complex AJAX flows — see the individual screen file for full detail).

## 1. Sign-in & Workforce

### LOG — Sign-in (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| LOG-001 | Sign In | Full page | `LoginController::index()` — default `login/index`; friendly route: `/` (system root page) |  | LOG-001-P1, USR-001 |
| LOG-001-P1 | Password Recovery | Popup | `LoginController::forgotPassword()` — default `login/forgotPassword`; friendly route: `/forgot-password` | LOG-001 | LOG-001, LOG-002 |
| LOG-002 | Set New Password | Full page | `LoginController::resetPassword($token)` — default `login/resetPassword/:token`; friendly route: `/reset-password/:token` |  | LOG-001, LOG-001-P1 |
| LOG-003 | Site & SEO Settings | Full page | `LoginController::settings()` — default `login/settings` |  | USR-003 |

### USR — Team Members (24 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| USR-001 | Overview | Full page | `UserController::dashboard()` — default `user/dashboard`; friendly route: `/user/dashboard` |  | LOG-001 |
| USR-002 | Revenue Scorecard | Full page | `UserController::indicators()` — default `user/indicators` |  |  |
| USR-003 | Site & SEO Settings | Full page | `UserController` inherits `LoginController::settings()` — default `user/settings` (no dedicated friendly route; already commented out in `config/Routes.php`) |  |  |
| USR-004 | Team Directory | Full page | `UserController::list($tab)` — default `user/list/:tab` |  | USR-005, USR-006, USR-007 |
| USR-005 | New Team Member | Full page | `UserController::add($tab)` — default `user/add/:tab` |  | USR-004, USR-006 |
| USR-006 | Edit Team Member | Full page | `UserController::edit($tab, $id, $show_page, $bank_account_id)` — default `user/edit/:tab/:id/:show_page/:bank_account_id` |  | USR-004, USR-005 |
| USR-007 | Team Member Profile | Full page | `UserController::viewDetails($id, $tab)` — default `user/viewDetails/:id/:tab` |  | USR-004, USR-006 |
| USR-008 | My Account | Full page | `UserController::profile()` — default `user/profile` |  | LOG-001, USR-008-P1 |
| USR-008-P1 | Update Password | Popup | `UserController::changePassword()` — default `user/changePassword` | USR-008 | LOG-001, USR-008 |
| USR-009 | Weekly Rest Days | Full page | `UserController::weeklyOff()` — default `user/weeklyOff` |  | USR-004 |
| USR-010 | Leave History | Full page | `UserController::grantedLeaves()` — default `user/grantedLeaves` |  | USR-004, USR-011 |
| USR-011 | Grant Time Off | Full page | `UserController::assignLeaves($id, $role)` — default `user/assignLeaves/:id/:role` |  | USR-010 |
| USR-012 | Sales Agents | Full page | `UserController::agents()` — default `user/agents` |  | USR-013, USR-014 |
| USR-013 | New Sales Agent | Full page | `UserController::addAgents()` — default `user/addAgents` |  | USR-012 |
| USR-014 | Edit Sales Agent | Full page | `UserController::editAgents($id)` — default `user/editAgents/:id` |  | USR-012 |
| USR-015 | Reservation Analytics | Full page | `UserController::statistics()` — default `user/statistics` |  |  |
| USR-016 | Contractors | Full page | `UserController::providers($tab)` — default `user/providers` |  | USR-017, USR-018, USR-019 |
| USR-017 | New Contractor | Full page | `UserController::addProviders()` — default `user/addProviders` |  | USR-016 |
| USR-018 | Edit Contractor | Full page | `UserController::editProvider($id)` — default `user/editProvider/:id` (id is base64-encoded) |  | USR-016 |
| USR-019 | Contractor Profile | Full page | `UserController::viewProviderDetails($id)` — default `user/viewProviderDetails/:id` |  | USR-016 |
| USR-020 | Wage Rules | Full page | `UserController::payrollRules()` — default `user/payrollRules` |  | USR-021 |
| USR-021 | New Wage Rule | Full page | `UserController::addPayrollRules()` — default `user/addPayrollRules` |  | USR-020 |
| USR-022 | Time Clock | Full page | `UserController::clockIn()` — default `user/clockIn` |  | LOG-001 |
| USR-023 | Department Avatars | Full page | `UserController::virtualUsers()` — default `user/virtualUsers` |  |  |

## 2. Portfolio Setup

### PROP — Property Records (47 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PROP-001 | New Intake Request | Full page | property/add-onboarding (optional parameter `$id` – ID of an existing Villa Onboarding record) |  |  |
| PROP-002 | Channel Rate Multiplier | Full page | property/beds24-coefficient |  |  |
| PROP-017 | Unmapped Room Codes | Full page | property/missing-roomids/:id (default dashed-format route; the `$id` parameter is passed via URL but is actually reset to empty by the controller and re-read... |  | PROP-030 |
| PROP-018 | Owner Bulletins | Full page | property/monthly-report |  | PROP-030 |
| PROP-019 | Schedule a Shoot | Full page | property/new-shooting |  | PROP-026 |
| PROP-020 | Property Intake | Full page | property/on-boardings |  | PROP-017 |
| PROP-021 | Go-Live Blockers | Full page | property/onboarding |  | PROP-017 |
| PROP-022 | Property Bank Details | Full page | property/payment-record/:villa_id (villa_id passed base64-encoded) |  |  |
| PROP-023 | Edit Service Fee Entry | Full page | property/payment-record-edit/:villa_id/:payment_id (both parameters passed base64-encoded) |  |  |
| PROP-024 | Owner Payout Reports | Full page | property/payment-report |  |  |
| PROP-025 | Photographer Ratings | Full page | property/photography/photographer-evaluation (a custom route configured in Routes.php, mapped to the `photographerEvaluation` action) |  | PROP-026, PROP-028 |
| PROP-026 | Shoot Scheduler | Full page | property/photography/:shootId/:guidelineId (default dashed-format route; `$shootId` also doubles as a special "sub-action" value: `guidelines`, `download-gui... |  | PROP-019, PROP-025, PROP-027, PROP-028 |
| PROP-027 | Photo Coverage Gaps | Full page | property/photography/missing-photos (a custom route configured in Routes.php, mapped to the `photographyMissingPhotos` action) |  | PROP-026 |
| PROP-028 | Image Quality Review | Full page | property/photography/scores (a custom route configured in Routes.php, mapped to the `photographyScores` action) |  | PROP-025, PROP-026 |
| PROP-029 | Contract Reports | Full page | property/property-reports/:tab/:villa_id |  |  |
| PROP-031 | Listing Refresh Request | Full page | property/redo/:villa_id/:chanel_id |  | PROP-030 |
| PROP-032 | Portfolio Health | Full page | property/dashboard (default CakePHP DashedRoute: `/property/dashboard`) |  |  |
| PROP-033 | Property Register | Full page | property/list/:id (default CakePHP DashedRoute: `/property/list`; the `id` parameter is the business unit id, also accepted via the query string `?id=`) |  | PROP-029, PROP-034, PROP-035 |
| PROP-035 | Property Profile | Full page | property/view-details/:villa_id (default CakePHP DashedRoute: `/property/view-details/:villa_id`) |  | PROP-033 |
| PROP-036 | Confirmation Letter | Full page | property/confirmation/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Confirmation" icon) |  | PROP-021 |
| PROP-037 | Contact & Chat Details | Full page | property/communication/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Communication" icon) |  | PROP-021 |
| PROP-038 | House Policies | Popup | property/villa-rules/:villa_id (villa_id passed base64-encoded) | PROP-021 | PROP-021 |
| PROP-039 | Guest Extras | Full page | property/villa-extras/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Extra" icon) |  | PROP-021 |
| PROP-040 | Listing Quality | Full page | property/quality |  | PROP-031 |
| PROP-041 | Service Fee Ledger | Full page | property/service-fee/:villa_id (villa_id passed base64-encoded) |  | PROP-022, PROP-023, PROP-035 |
| PROP-042 | Instant Book Settings | Full page | property/booking-restriction |  |  |
| PROP-043 | Concierge Coverage | Full page | property/territories/:id |  |  |
| PROP-044 | On-site Stock | Full page | property/inventories/:villa_id |  | PROP-035, PROP-045 |
| PROP-045 | Stock Requests | Full page | property/inventory-request/:villa_id |  | PROP-044 |
| PROP-046 | Residences & Projects | Full page | property/residence-enquiry |  | PROP-047 |
| PROP-047 | Residence Profile | Full page | property/view-residence-enquiry/:residence_id/:business_unit_id |  | PROP-046 |
| PROP-048 | Bulk Service Import | Full page | property/services/:tab (dashed by default, also supports query `?tab=`, `?electricity_tab=`) |  | PROP-051 |
| PROP-049 | Utilities Setup | Full page | property/service-setting/:tab/:villa_id (villa_id passed base64-encoded); also embedded as the "Service and Utilities" tab in the Villa Detail screen (PROP-050) |  | PROP-041, PROP-050 |
| PROP-050 | Property Editor | Full page | property/villa/:tab/:villa_id (dashed by default; `$villa_id` is empty when adding new) |  | PROP-017, PROP-032, PROP-033, PROP-042, PROP-046, PROP-049, PROP-051 |
| PROP-051 | Contract Readiness | Full page | property/guest-contract-bu-recap |  | PROP-048, PROP-050, PROP-052 |
| PROP-052 | Print Guest Contracts | Full page | property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_code=...&electricity_mode=... |  | PROP-050, PROP-051 |
| PROP-053 | Owner Reports by Unit | Full page | property/bu-reports |  | PROP-018 |
| PROP-054 | Report Dispatch Status | Full page | property/report-status |  | PROP-018, PROP-053 |
| PROP-055 | Reports Ready to Run | Full page | property/report-ready?business_unit=... |  | PROP-018, PROP-053, PROP-054 |
| PROP-056 | Shoot History | Full page | property/logs |  | PROP-026, PROP-027, PROP-028 |
| PROP-057 | Listing Refresh History | Popup | property/redo-log/:villa_id/:channel_id | PROP-040 | PROP-040, PROP-058 |
| PROP-058 | Listing Refresh Queue | Full page | property/listing-redone |  | PROP-057 |
| PROP-059 | Upcoming Shoots | Full page | property/shootings |  | PROP-019, PROP-060 |
| PROP-060 | Edit Shoot Schedule | Full page | property/edit-shooting/:req_id (req_id passed base64-encoded), opened from PROP-059 (Edit icon) |  | PROP-059 |
| PROP-061 | Add Monthly Report | Full page | property/upload-report |  | PROP-018, PROP-053 |
| PROP-062 | Intake Revalidation | Full page | property/edit-on-boarding/:id, opened from PROP-020 (Property Intake) |  | PROP-020 |
| PROP-063 | Intake Record | Full page | property/view-onboarding/:id, opened from PROP-020 (Property Intake) |  | PROP-020, PROP-062 |

### COMP — Legal Entities (2 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| COMP-001 | Company Structure | Full page | company/list (default CakePHP dashed-format route: `/company/list`, with an additional `:tab` parameter — e.g. `/company/list/subsidiaries-list`) |  | COMP-001-P1 |
| COMP-001-P1 | Company / Branch Entity Form | Popup | No dedicated route — uses a shared POST form to `company/list` (hidden action `add`/`edit`/`delete`); duplicate-name checks via AJAX `company/checkCompany` a... | COMP-001 | COMP-001 |

### BU — Operating Units (45 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| BU-001 | Operating Units | Full page | `BusinessUnitController::list()` — default `/business-unit/list` |  | BU-001-P1, BU-002, BU-003, BU-004 |
| BU-001-P1 | Confirm Unit Deletion | Popup | Static Bootstrap modal (`#exampleModal`) in `list.ctp`; on confirmation the browser navigates to `BusinessUnitController::delete($id)` — `/business-unit/dele... | BU-001 | BU-001 |
| BU-002 | New Operating Unit | Full page | `BusinessUnitController::add()` — default `/business-unit/add` |  | BU-001 |
| BU-003 | Edit Operating Unit | Full page | `BusinessUnitController::edit($id)` — default `/business-unit/edit/{id_base64}` |  | BU-001 |
| BU-004 | Operating Unit Profile | Full page | `BusinessUnitController::viewDetails($id)` — default `/business-unit/view-details/{id}` |  | BU-001 |
| BU-005 | Sales Channels | Full page | `BusinessUnitController::chanels()` — default `/business-unit/chanels` |  | BU-005-P1, BU-005-P2 |
| BU-005-P1 | Sales Channel Form | Popup | Static Bootstrap modal (`#chanelModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action. | BU-005 | BU-005 |
| BU-005-P2 | Confirm Channel Deletion | Popup | Static Bootstrap modal (`#deleteModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action with `action=delete`. | BU-005 | BU-005 |
| BU-006 | Channel Listing Links | Full page | `BusinessUnitController::channelVilla($channel_id)` — default `/business-unit/channel-villa/{channel_id}` |  | BU-005, BU-007 |
| BU-007 | Currency Setup | Full page | `BusinessUnitController::currency()` — default `/business-unit/currency` |  | BU-007-P1, BU-007-P2, BU-008 |
| BU-007-P1 | Currency Form | Popup | Static Bootstrap modal (`#exampleModal`) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action. | BU-007 | BU-007 |
| BU-007-P2 | Confirm Currency Deletion | Popup | Static Bootstrap modal (`#exampleModal`, form section hidden) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action w... | BU-007 | BU-007 |
| BU-008 | FX Rates | Full page | `BusinessUnitController::rates()` — default `/business-unit/rates` |  | BU-007, BU-008-P1 |
| BU-008-P1 | FX Rate Entry | Popup | Static Bootstrap modal (`#exampleModal`) in `rates.ctp`; submitted via POST to the same `BusinessUnitController::rates()` action. | BU-008 | BU-008 |
| BU-009 | Messaging Apps | Full page | `BusinessUnitController::chatPlatform()` — default `/business-unit/chat-platform` |  | BU-009-P1, BU-009-P2 |
| BU-009-P1 | Messaging App Form | Popup | Static Bootstrap modal (`#exampleModal`) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()` action. | BU-009 | BU-009 |
| BU-009-P2 | Confirm App Deletion | Popup | Static Bootstrap modal (`#exampleModal`, form section hidden) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()`... | BU-009 | BU-009 |
| BU-010 | Payment Setup | Full page | `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — default `/business-unit/payment-method/{tab}` |  | BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 |
| BU-010-P1 | Payment Method Form | Popup | Bootstrap modal (`#exampleModal`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` action (`... | BU-010 | BU-010 |
| BU-010-P2 | Confirm Method Deletion | Popup | Bootstrap modal (`#exampleModalDeletePM`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` a... | BU-010 | BU-010 |
| BU-010-P3 | Bank Account Form | Sub-page (opened fro | `BusinessUnitController::paymentMethod('accounts', 'add')` or `paymentMethod('accounts', 'edit', $id)` — default `/business-unit/payment-method/accounts/add`... | BU-010 | BU-010 |
| BU-010-P4 | Confirm Account Deletion | Popup | Bootstrap modal (`#exampleModalDelete`) in the `business-unit/accounts.ctp` element; submitted via POST to the `BusinessUnitController::paymentMethod()` acti... | BU-010 | BU-010 |
| BU-010-P5 | Open Account Ledger | Popup | Bootstrap modal (`#openStatementModal`) in the `business-unit/accounts.ctp` element; submitted via POST to `BusinessUnitController::openStatement()`. | BU-010 | BU-010 |
| BU-011 | Payment Methods per Unit | Full page | `BusinessUnitController::businessUnitPaymentMethod()` — default `/business-unit/business-unit-payment-method` |  | BU-010, BU-011-P1 |
| BU-011-P1 | Payment Methods per Unit Toggle | Popup | Static Bootstrap modal (`#exampleModal`) in `business_unit_payment_method.ctp`; toggling is done via AJAX to `getBusinessPaymentMethod` (loads status) and `s... | BU-011 | BU-011 |
| BU-012 | Reporting Zones | Full page | `BusinessUnitController::zoning()` — default `/business-unit/zoning` |  | BU-012-P1, BU-013, BU-014 |
| BU-012-P1 | Confirm Zone Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `zoning.ctp`; confirmation navigates to `BusinessUnitController::deleteZoning($id)` — `/business-unit/delete-... | BU-012 | BU-012 |
| BU-013 | New Reporting Zone | Full page | `BusinessUnitController::addZoning()` — default `/business-unit/add-zoning` |  | BU-012 |
| BU-014 | Edit Reporting Zone | Full page | `BusinessUnitController::editZoning($id)` — default `/business-unit/edit-zoning/{id}` (id base64-encoded) |  | BU-012 |
| BU-015 | Office Locations | Full page | `BusinessUnitController::offices()` — default `/business-unit/offices` |  | BU-015-P1, BU-016, BU-017, BU-018 |
| BU-015-P1 | Confirm Office Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `offices.ctp`; confirmation navigates to `BusinessUnitController::deleteOffice($id)` — `/business-unit/delete... | BU-015 | BU-015 |
| BU-016 | New Office Location | Full page | `BusinessUnitController::addOffice()` — default `/business-unit/add-office` |  | BU-015 |
| BU-017 | Edit Office Location | Full page | `BusinessUnitController::editOffice($id)` — default `/business-unit/edit-office/{id}` (id base64-encoded) |  | BU-015 |
| BU-018 | Office Profile | Full page | `BusinessUnitController::viewOffice($id)` — default `/business-unit/view-office/{id}` (id base64-encoded) |  | BU-015 |
| BU-019 | Bank Directory | Full page | `BusinessUnitController::banks()` — default `/business-unit/banks` |  | BU-019-P1, BU-020, BU-021 |
| BU-019-P1 | Confirm Bank Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `banks.ctp`; confirmation navigates to `BusinessUnitController::deleteBank($id)` — `/business-unit/delete-ban... | BU-019 | BU-019 |
| BU-020 | New Bank | Full page | `BusinessUnitController::addBank()` — default `/business-unit/add-bank` |  | BU-019 |
| BU-021 | Edit Bank Record | Full page | `BusinessUnitController::editBank($id)` — default `/business-unit/edit-bank/{id}` (id base64-encoded) |  | BU-019 |
| BU-022 | Booking Platforms | Full page | `BusinessUnitController::channels($tab)` — default `/business-unit/channels/{tab}` (tab: `platforms`, `accounts`, `content-elements`) |  | BU-006, BU-022-P1 |
| BU-022-P1 | Booking Platform Form | Popup | Static Bootstrap modal (`#platformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')`. | BU-022 | BU-022 |
| BU-022-P2 | Confirm Platform Deletion | Popup | Static Bootstrap modal (`#deletePlatformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')` with `platform_act... | BU-022 | BU-022 |
| BU-022-P3 | Channel Account Form | Popup | Static Bootstrap modal (`#chanelModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')`. | BU-022 | BU-022 |
| BU-022-P4 | Confirm Channel Account Deletion | Popup | Static Bootstrap modal (`#deleteModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')` with `action=delete`. | BU-022 | BU-022 |
| BU-022-P5 | Listing Element Form | Popup | Bootstrap modal (`#ota-element-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::createElement` / `editEl... | BU-022 | BU-022 |
| BU-022-P6 | Confirm Element Archiving | Popup | Bootstrap modal (`#ota-archive-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::archiveElement`. | BU-022 | BU-022 |

### VCS — Property Attributes (23 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VCS-001 | Amenity Catalog | Full page | villa-common-setting/items (default CakePHP DashedRoute: `/villa-common-setting/items`) |  | VCS-001-P1 |
| VCS-001-P1 | Amenity Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/items` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `vi... | VCS-001 | VCS-001 |
| VCS-002 | Rate Tiers | Full page | villa-common-setting/price-categories (default DashedRoute: `/villa-common-setting/price-categories`) |  | VCS-002-P1 |
| VCS-002-P1 | Rate Tier Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/price-categories` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check v... | VCS-002 | VCS-002 |
| VCS-003 | Accommodation Types | Full page | villa-common-setting/villa-types (default DashedRoute: `/villa-common-setting/villa-types`) |  | VCS-003-P1 |
| VCS-003-P1 | Accommodation Type Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-types` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJ... | VCS-003 | VCS-003 |
| VCS-004 | Service Catalog | Full page | villa-common-setting/services (default DashedRoute: `/villa-common-setting/services`) |  | VCS-004-P1 |
| VCS-004-P1 | Catalog Service Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/services` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX ... | VCS-004 | VCS-004 |
| VCS-005 | Service Bundles | Full page | villa-common-setting/contract-service-types (default DashedRoute: `/villa-common-setting/contract-service-types`) |  | VCS-005-P1 |
| VCS-005-P1 | Service Bundle Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/contract-service-types` (hidden `action`=`add`/`edit`/`delete`); duplicate servic... | VCS-005 | VCS-005 |
| VCS-006 | Approved Vendors | Full page | villa-common-setting/service-providers/:tab (default CakePHP DashedRoute: `/villa-common-setting/service-providers`, `tab` parameter defaults to `service-pro... |  | VCS-006-P1, VCS-006-P2 |
| VCS-006-P1 | Approved Vendor Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check ... | VCS-006 | VCS-006 |
| VCS-006-P2 | Vendor Service Type Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add_service`); duplicate-name check via AJAX... | VCS-006 | VCS-006, VCS-006-P1 |
| VCS-007 | Usage Types | Full page | villa-common-setting/villa-usage (default CakePHP DashedRoute: `/villa-common-setting/villa-usage`) |  | VCS-007-P1 |
| VCS-007-P1 | Usage Type Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-usage` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJ... | VCS-007 | VCS-007 |
| VCS-008 | Guest Activities | Full page | villa-common-setting/villa-activity (default CakePHP DashedRoute: `/villa-common-setting/villa-activity`) |  | VCS-008-P1 |
| VCS-008-P1 | Guest Activity Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-activity` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via... | VCS-008 | VCS-008 |
| VCS-009 | Access Features | Full page | villa-common-setting/villa-accessible (default CakePHP DashedRoute: `/villa-common-setting/villa-accessible`) |  | VCS-009-P1 |
| VCS-009-P1 | Access Feature Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-accessible` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check v... | VCS-009 | VCS-009 |
| VCS-010 | Transport Options | Full page | villa-common-setting/villa-transport (default CakePHP DashedRoute: `/villa-common-setting/villa-transport`) |  | VCS-010-P1 |
| VCS-010-P1 | Transport Option Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-transport` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check vi... | VCS-010 | VCS-010 |
| VCS-011 | Staff Reminders | Full page | villa-common-setting/reminders (default CakePHP DashedRoute: `/villa-common-setting/reminders`) |  | VCS-011-P1 |
| VCS-011-P1 | Staff Reminder Form | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/reminders` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX... | VCS-011 | VCS-011 |

## 3. Configuration

### CS — Reference Data (16 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| CS-001 | Country Setup | Full page | `CommonSettingController::countries()` — default `/common-setting/countries` (no dedicated friendly route; the route `/countries/list` in `config/Routes.php`... |  | CS-001-P1 |
| CS-001-P1 | Country Form | Popup | Static Bootstrap Modal (`#exampleModal`) within `countries.ctp`; submits via POST to the same action `CommonSettingController::countries()`; duplicate name c... | CS-001 | CS-001 |
| CS-002 | Language Setup | Full page | `CommonSettingController::languages()` — default `/common-setting/languages` |  | CS-002-P1 |
| CS-002-P1 | Language Form | Popup | Bootstrap Modal (`#exampleModal`) within `languages.ctp`; submits to the same action `CommonSettingController::languages()`; duplicate name check via AJAX `c... | CS-002 | CS-002 |
| CS-003 | Region Setup | Full page | `CommonSettingController::regions()` — default `/common-setting/regions` |  | CS-003-P1 |
| CS-003-P1 | Region Form | Popup | Bootstrap Modal (`#exampleModal`) within `regions.ctp`; submits to the same action `CommonSettingController::regions()`; duplicate name check via AJAX `check... | CS-003 | CS-003 |
| CS-004 | Area Setup | Full page | `CommonSettingController::areas()` — default `/common-setting/areas` |  | CS-004-P1 |
| CS-004-P1 | Area Form | Popup | Bootstrap Modal (`#exampleModal`) within `areas.ctp`; submits to the same action `CommonSettingController::areas()`; duplicate name check via AJAX `checkArea... | CS-004 | CS-004 |
| CS-005 | District Setup | Full page | `CommonSettingController::districts()` — default `/common-setting/districts` |  | CS-005-P1 |
| CS-005-P1 | District Form | Popup | Bootstrap Modal (`#exampleModal`) within `districts.ctp`; submits to the same action `CommonSettingController::districts()`; duplicate name check via AJAX `c... | CS-005 | CS-005 |
| CS-006 | Residence Setup | Full page | `CommonSettingController::residences()` — default `/common-setting/residences` |  | CS-006-P1, CS-008 |
| CS-006-P1 | Residence Form | Popup | Bootstrap Modal (`#exampleModal`, `multipart/form-data` form) within `residences.ctp`; submits to the same action `CommonSettingController::residences()`; lo... | CS-006 | CS-006 |
| CS-007 | Location Tags | Full page | `CommonSettingController::locationTypes()` — default `/common-setting/location-types` |  | CS-007-P1 |
| CS-007-P1 | Location Tag Form | Popup | Bootstrap Modal (`#exampleModal`) within `location_types.ctp`; submits to the same action `CommonSettingController::locationTypes()`; duplicate name check vi... | CS-007 | CS-007 |
| CS-008 | Unit Setup | Full page | `CommonSettingController::units()` — default `/common-setting/units` |  | CS-008-P1 |
| CS-008-P1 | Unit Form | Popup | Bootstrap Modal (`#exampleModal`) within `units.ctp`; submits to the same action `CommonSettingController::units()`; duplicate name check via AJAX `checkUnit... | CS-008 | CS-008 |

### SET — Platform Settings (10 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| SET-001 | Platform Settings | Full page | `SettingController::dashboard()` — friendly route `/setting` (declared in `config/Routes.php` line 78); default `/setting/dashboard` |  | SET-002, SET-003, SET-004 |
| SET-002 | Core Preferences | Full page | `SettingController::generalSettings($tab = null)` — default `/setting/general-settings/:tab` (`:tab` is a passed parameter, e.g. `/setting/general-settings/o... |  | SET-001, SET-002-P1, SET-002-P2, SET-002-P3 |
| SET-002-P1 | New Owner Hub URL | Popup | Bootstrap Modal `#addUrlModal` within element `technical-settings/owner_portal_url.ctp`; submits via AJAX POST to `SettingController::generalSettings()` (`ta... | SET-002 | SET-002 |
| SET-002-P2 | Edit Owner Hub URL | Popup | Bootstrap Modal `#editModal` within element `technical-settings/owner_portal_url.ctp`; retrieves data via AJAX GET `SettingController::getEditOwnerPortalUrl(... | SET-002 | SET-002 |
| SET-002-P3 | Delete Owner Hub URL | Popup | Bootstrap Modal `#exampleModal` within element `technical-settings/owner_portal_url.ctp`; confirmation navigates to `SettingController::deleteOwnerPortalUrl(... | SET-002 | SET-002 |
| SET-003 | Outgoing Mail Server | Full page | `SettingController::smtpSettings()` — default `/setting/smtp-settings` (no friendly route declared in `config/Routes.php`; there is one legacy commented-out ... |  | SET-001 |
| SET-004 | Channel Account Mapping | Full page | `SettingController::hostexSetup()` — default `/setting/hostex-setup`; data loaded via AJAX GET `getHostexData()` (`/setting/get-hostex-data`) |  | SET-001, SET-004-P1, SET-004-P2, SET-004-P3 |
| SET-004-P1 | Channel Account Mapping Form | Popup | Rendered dynamically within `SettingController::hostexSetup()` (`hostex_setup.ctp`); submits via AJAX POST to `saveHostexAccount()` — `/setting/save-hostex-a... | SET-004 | SET-004 |
| SET-004-P2 | Remove Mapped Account | Popup | Bootstrap Modal `#exampleModal` within `hostex_setup.ctp`; confirmation sends AJAX POST to `deleteHostexAccount()` — `/setting/delete-hostex-account`. | SET-004 | SET-004 |
| SET-004-P3 | Mapped Account In-Use Warning | Popup | Bootstrap Modal `#warnModal` within `hostex_setup.ctp`; handled entirely client-side (JavaScript), does not call any controller action. | SET-004 | SET-004, SET-004-P2 |

## 4. Reservations

### BOOK — Reservations (100 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| BOOK-001 | Arrivals & Departures | Full page | Booking/list (default: `/booking/list`) |  | BOOK-009, BOOK-013 |
| BOOK-002 | All Reservations | Full page | Booking/bookingList (default: `/booking/booking-list`) |  | BOOK-002-P1, BOOK-010 |
| BOOK-002-P1 | Reservation Preview | Full page | Booking/viewBooking/:id (default: `/booking/view-booking/:id`, id is base64_encoded) |  | BOOK-002, BOOK-004 |
| BOOK-003 | Guest Directory | Full page | Booking/customerList (default: `/booking/customer-list`) |  |  |
| BOOK-026 | Minimum Nights | Full page | booking/minimum (base path `/VM` appears in the application's AJAX calls) |  |  |
| BOOK-027 | Unpriced Properties | Full page | booking/missingRates (query `?id=<business_unit_id>`) |  | BOOK-023, BOOK-027-P1, BOOK-028, BOOK-030 |
| BOOK-028 | Reservation Record | Full page | Booking/viewDetails/:id (default: `/booking/view-details/:id`, id is base64_encoded) |  | BOOK-001, BOOK-002 |
| BOOK-029 | Arrival Audit | Full page | Booking/checkInControl (default: `/booking/check-in-control`) |  | BOOK-029-P1 |
| BOOK-029-P1 | Arrival Checkpoint Details | Popup | Booking/viewCheckinDetail/:id/:booking_id | BOOK-029 | BOOK-029 |
| BOOK-030 | Departure Audit | Full page | Booking/checkOutControl (default: `/booking/check-out-control`) |  | BOOK-030-P1 |
| BOOK-030-P1 | Departure Checkpoint Details | Popup | Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id | BOOK-030 | BOOK-030 |
| BOOK-031 | Audit Checkpoints | Full page | Booking/checkControlPoint (default: `/booking/check-control-point`) |  |  |
| BOOK-032 | On-site Check-in | Full page | Booking/checkIn (default: `/booking/check-in`) |  | BOOK-033 |
| BOOK-033 | Check-in Tracker | Full page | Booking/checkinProgress/:id/:date/:villa_id (default: `/booking/checkin-progress/:id/:date/:villa_id`) | BOOK-032 | BOOK-029, BOOK-029-P1, BOOK-032 |
| BOOK-034 | Check-in Verification | Full page | Booking/qualityControl/:checkin_detail_id/:date/:villa_id (default: `/booking/quality-control/...`) | BOOK-029 | BOOK-029, BOOK-029-P1 |
| BOOK-035 | On-site Check-out | Full page | Booking/checkOut (default: `/booking/check-out`) |  | BOOK-035-P2 |
| BOOK-035-P2 | On-site Check-out · Step 2: Damage Check | Popup | Booking/checkOutStep2/:check_out_id (default: `/booking/check-out-step2/:check_out_id`) | BOOK-035 | BOOK-035, BOOK-035-P3 |
| BOOK-035-P3 | On-site Check-out · Step 3: Guest Rating | Popup | Booking/checkOutStep3/:check_out_id (default: `/booking/check-out-step3/:check_out_id`) | BOOK-035-P2 | BOOK-035-P2, BOOK-035-P4 |
| BOOK-035-P4 | On-site Check-out · Step 4: Wrap-up | Popup | Booking/checkOutStep4/:check_out_id (default: `/booking/check-out-step4/:check_out_id`) | BOOK-035-P3 | BOOK-030, BOOK-030-P1, BOOK-035-P3 |
| BOOK-036 | New Reservation | Full page | Booking/addBooking/:id? (default: `/booking/add-booking`; when an id is provided, it edits a manual booking) |  | BOOK-036-P1 |
| BOOK-036-P1 | Offline Reservations | Full page | Booking/addBookingList (default: `/booking/add-booking-list`) | BOOK-036 | BOOK-036 |
| BOOK-037 | Modify Reservation | Full page | Booking/edit/:id (default: `/booking/edit/:id`) |  | BOOK-002, BOOK-028 |
| BOOK-038 | Reservation Lookup | Full page | Booking/retrieveBooking (default: `/booking/retrieve-booking`) |  | BOOK-028 |
| BOOK-039 | Handover Schedule | Full page | Booking/planningList (default: `/booking/planning-list`) |  | BOOK-040 |
| BOOK-040 | Handover Calendar | Full page | Booking/planning/:date? (default: `/booking/planning`) |  | BOOK-039, BOOK-041 |
| BOOK-041 | Concierge Duty Roster | Full page | Booking/team (default: `/booking/team`) |  | BOOK-028, BOOK-040 |
| BOOK-042 | Direct Stay Requests | Full page | Booking/directBookingList (default: `/booking/direct-booking-list`) |  | BOOK-043, BOOK-044, BOOK-045, BOOK-046 |
| BOOK-043 | New Stay Request | Popup | Booking/addDirectBooking/:id? (default: `/booking/add-direct-booking`) | BOOK-042 | BOOK-042 |
| BOOK-044 | Edit Stay Request | Popup | Booking/editDirectBooking/:id (default: `/booking/edit-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-045 | Stay Request Details | Popup | Booking/viewDirectBooking/:id (default: `/booking/view-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-046 | Cancelled Stay Requests | Full page | Booking/cancelDirectBookingList (default: `/booking/cancel-direct-booking-list`) |  | BOOK-042, BOOK-045 |
| BOOK-047 | Availability Grid | Full page | Booking/availability (default: `/booking/availability`, supports `referer` or `bu`, `district`, `villa_id` query parameters) |  | BOOK-036 |
| BOOK-048 | Occupancy by Property | Full page | Booking/occupancy/:string? (default: `/booking/occupancy`) |  |  |
| BOOK-049 | Payouts Due | Full page | Booking/dueNow (default: `/booking/due-now`) | BOOK-052 | BOOK-051, BOOK-052 |
| BOOK-050 | Upcoming Payouts | Full page | Booking/dueLater (default: `/booking/due-later`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-051 | Settled Payouts | Full page | Booking/paid (default: `/booking/paid`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-052 | Partner Payouts | Full page | Booking/partnerPayments (default: `/booking/partner-payments`) |  | BOOK-049, BOOK-050, BOOK-051 |
| BOOK-053 | Partner Reservations | Full page | Booking/partnerBookings (default: `/booking/partner-bookings`) |  | BOOK-052 |
| BOOK-054 | Channel Toolkit | Full page | Booking/ota (default: `/booking/ota`) |  | BOOK-055, BOOK-056 |
| BOOK-055 | Listing Sync Check | Full page | Booking/otaListing (default: `/booking/ota-listing`) | BOOK-054 | BOOK-054 |
| BOOK-056 | Commission Review | Full page | Booking/otaShare (default: `/booking/ota-share`) | BOOK-054 | BOOK-054 |
| BOOK-057 | Confirmation Layouts | Full page | Booking/confirmationTemplate (default: `/booking/confirmation-template`) |  | BOOK-058, BOOK-059, BOOK-060, BOOK-061 |
| BOOK-058 | New Confirmation Layout | Popup | Booking/addConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-059 | Edit Confirmation Layout | Popup | Booking/editConfirmationTemplate/:id (id is base64_encoded) | BOOK-057 | BOOK-057 |
| BOOK-060 | Confirmation Layout Preview | Popup | Booking/viewConfirmationTemplate/:id (id is base64_encoded) | BOOK-057 | BOOK-057 |
| BOOK-061 | Layout Translations | Full page | Booking/transalateConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-062 | Report Exclusions | Full page | Booking/exception/:tab? (default: `/booking/exception`) |  |  |
| BOOK-063 | Unsynced Reservations | Full page | Booking/unlinkedBookings (default: `/booking/unlinked-bookings`) |  |  |
| BOOK-064 | Unpriced Alert Threshold | Popup | Booking/missingRateSetting (default: `/booking/missing-rate-setting`) | BOOK-027 | BOOK-027 |
| BOOK-065 | Recent Reservations | Full page | Booking/latestBookings (default: `/booking/latest-bookings`) |  | BOOK-028 |
| BOOK-066 | Pricing Hub | Full page | Booking/rates (default: `/booking/rates`) |  | BOOK-067, BOOK-070, BOOK-073, BOOK-074 |
| BOOK-067 | Rate Plan Status | Full page | Booking/ratesStatus (default: `/booking/rates-status`) |  | BOOK-066, BOOK-069, BOOK-075, BOOK-076 |
| BOOK-068 | New Rate Plan Status | Full page | Booking/ratesStatusAdd (default: `/booking/rates-status-add`) | BOOK-067 | BOOK-067 |
| BOOK-069 | Monthly Rent Action | Full page | Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` or `finish`) | BOOK-067 | BOOK-067 |
| BOOK-070 | Price Change Notes | Full page | Booking/ratesLogs (default: `/booking/rates-logs`) |  | BOOK-066 |
| BOOK-071 | New Price Note | Full page | Booking/ratesLogAdd (default: `/booking/rates-log-add`) |  | BOOK-070 |
| BOOK-072 | Edit Price Note | Full page | Booking/ratesLogEdit/:id |  | BOOK-070 |
| BOOK-073 | Season Calendar | Full page | Booking/seasons (default: `/booking/seasons`) |  | BOOK-066 |
| BOOK-074 | Season Price Audit | Full page | Booking/seasonPriceLogs (default: `/booking/season-price-logs`) |  | BOOK-066 |
| BOOK-075 | Switch Rate Basis | Full page | Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` or `daily`) | BOOK-067 | BOOK-067 |
| BOOK-076 | Monthly Rent Terms | Full page | Booking/rentalMonthView/:business_unit_id/:villa_id | BOOK-067 | BOOK-067 |
| BOOK-077 | Arrivals Board | Full page | Booking/guestArrival |  |  |
| BOOK-078 | VIP Arrivals | Full page | Booking/vipGuests/:id |  | BOOK-079 |
| BOOK-079 | VIP Arrival Prep | Full page | Booking/preparationWork/:button/:booking_id | BOOK-078 | BOOK-078 |
| BOOK-080 | Occupancy Thresholds | Full page | Booking/criteria |  | BOOK-081, BOOK-082, BOOK-083 |
| BOOK-081 | New Occupancy Threshold | Popup | Booking/addCriteria | BOOK-080 | BOOK-080 |
| BOOK-082 | Edit Occupancy Threshold | Popup | Booking/editCriteria/:id | BOOK-080 | BOOK-080 |
| BOOK-083 | Pricing Signals | Full page | Booking/recommendations |  | BOOK-080, BOOK-084 |
| BOOK-084 | Run Pricing Check | Full page | Booking/recommendationCheck |  | BOOK-083 |
| BOOK-085 | Stay Enquiry | Full page | Booking/bookingEnquiry/:id |  | BOOK-086 |
| BOOK-086 | Enquiry Received | Sub-page (opened fro | Booking/requestSuccess/:array | BOOK-085 | BOOK-085 |
| BOOK-087 | Guest Feedback | Full page | Booking/satisfaction |  |  |
| BOOK-088 | Monitored Stays | Full page | Booking/watchList |  |  |
| BOOK-089 | Guest Conversations | Full page | Booking/villaChats (default: `/booking/villa-chats`) |  | BOOK-038, BOOK-089-P1, BOOK-090, BOOK-091 |
| BOOK-089-P1 | Open Guest Thread | Full page | Booking/activateChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089 |
| BOOK-090 | Merge Conversation | Full page | Booking/linkChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089, BOOK-091 |
| BOOK-091 | Merged Conversation | Full page | Booking/viewLinkedChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089 |
| BOOK-092 | Greeting Templates | Full page | Booking/messageSettings (default: `/booking/message-settings`) |  | BOOK-089-P1 |
| BOOK-093 | Guest Thread (Classic) | Full page | Booking/chat/:booking_id (id is base64_encode'd) |  | BOOK-094-P1, BOOK-095-P1 |
| BOOK-094 | Chat Inbox (Classic) | Full page | Booking/whatsAppManager (default: `/booking/whats-app-manager`) |  | BOOK-094-P1, BOOK-095 |
| BOOK-094-P1 | Chat Thread (Classic) | Full page | Booking/whatsappChat/:booking_id (id is base64_encode'd) | BOOK-094 | BOOK-094 |
| BOOK-095 | Chat Inbox | Full page | Booking/whatsAppManagerNew/:tab? (default: `/booking/whats-app-manager-new`) |  | BOOK-094, BOOK-095-P1, BOOK-096 |
| BOOK-095-P1 | Chat Thread | Full page | Booking/whatsappChatNew/:booking_id (id is base64_encode'd) | BOOK-095 | BOOK-095 |
| BOOK-096 | Chat Service Health | Full page | Booking/whatsAppHelp (default: `/booking/whats-app-help`) |  | BOOK-095 |
| BOOK-097 | Knowledge Topics | Full page | Booking/faqCategory (default: `/booking/faq-category`) |  | BOOK-098, BOOK-099 |
| BOOK-098 | Knowledge Articles | Full page | Booking/faqQuestion (default: `/booking/faq-question`) |  | BOOK-097, BOOK-099, BOOK-100 |
| BOOK-099 | New Knowledge Article | Full page | Booking/faq/:id? (default: `/booking/faq` when adding, `/booking/faq/:id` when editing) | BOOK-098 | BOOK-098 |
| BOOK-100 | Knowledge Article | Full page | Booking/viewFaq/:id | BOOK-098 | BOOK-098 |
| BOOK-101 | Live Status Board | Full page | Booking/propertyStatus (default: `/booking/property-status`) |  | BOOK-101-P1 |
| BOOK-101-P1 | On-duty Staff Detail | Popup | Booking/staffDetail (default: `/booking/staff-detail?booking_id=...&clean_id=...&makeup_id=...&villa_id=...`) | BOOK-101 | BOOK-101 |
| BOOK-101-P2 | Adjust Live Status | Popup | Booking/adjustDetail (default: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<makeup_id>_<villa_id>_<clean_status>_<makeup_status>_<guest_status>_<bo... | BOOK-101 | BOOK-101 |
| BOOK-102 | Field Attendance | Full page | Booking/timesheet (default: `/booking/timesheet`) |  |  |
| BOOK-103 | Pricing Adjustments | Full page | Booking/action (default: `/booking/action`) |  | BOOK-104, BOOK-105 |
| BOOK-104 | New Pricing Adjustment | Full page | Booking/addAction (default: `/booking/add-action`) | BOOK-103 | BOOK-103 |
| BOOK-105 | Adjustment Follow-up | Full page | Booking/followUpAction/:id (id base64-encoded) | BOOK-103 | BOOK-103 |
| BOOK-106 | Guest Origins | Full page | Booking/nationalities (default: `/booking/nationalities`) |  |  |
| BOOK-107 | Default Stay Times | Full page | Booking/standardTime (default: `/booking/standard-time`) |  | BOOK-106, BOOK-108 |
| BOOK-108 | Pre-arrival Deadlines | Full page | Booking/onlineCheckinDeadlineSettings |  | BOOK-002, BOOK-106, BOOK-107 |
| BOOK-109 | Revenue Breakdown | Full page | Booking/revenueReport (default: `/booking/revenue-report`) |  |  |
| BOOK-110 | Health Certification | Full page | Booking/shaPlusEdit/:booking_id |  |  |

## 5. Owner Relations (Admin)

### OWN — Owner Relations (Admin) (22 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OWN-001 | Owner Accounts | Full page | `/Owner/list` (controller `Owner`, action `list()`) |  | OWN-001-P1, OWN-002, OWN-003, OWN-014 |
| OWN-001-P1 | Owner Account Snapshot | Popup | `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`) | OWN-001 | OWN-001 |
| OWN-002 | New Owner Account | Full page | `/Owner/add` (controller `Owner`, action `add($tab = null)`) |  | OWN-001, OWN-003 |
| OWN-003 | Edit Owner Account | Full page | `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `edit($tab, $id, $show_page, $payment_detail_id)`) |  | OWN-001, OWN-002 |
| OWN-004 | Owner Property Status | Full page | `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`) |  | OWN-004-P1, OWN-004-P2 |
| OWN-004-P1 | Garden Visit Detail | Popup | `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`) | OWN-004 | OWN-004 |
| OWN-004-P2 | Owner Expense Detail | Popup | `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`) | OWN-004 | OWN-004 |
| OWN-005 | Owner Occupancy Calendar | Full page | `/Owner/calendar` (controller `Owner`, action `calendar()`) |  |  |
| OWN-006 | Property Performance | Full page | `/Owner/performance` (controller `Owner`, action `performance()`) |  |  |
| OWN-007 | Owner Statement Builder | Full page | `/Owner/generateReports` (controller `Owner`, action `generateReports()`) |  |  |
| OWN-008 | Owner Payout Accounts | Full page | `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`) |  | OWN-003, OWN-008-P1, OWN-008-P2 |
| OWN-008-P1 | New Owner Payout Account | Popup | `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($owner_id)`) | OWN-008 | OWN-008 |
| OWN-008-P2 | Edit Owner Payout Account | Popup | `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`) | OWN-008 | OWN-008 |
| OWN-009 | Partner Agencies | Full page | `/Owner/agencyList` (controller `Owner`, action `agencyList()`) |  | OWN-010, OWN-011, OWN-012 |
| OWN-010 | New Partner Agency | Full page | `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $show_page = null, $payment_detail_id = null)`, when `agency_id` is not s... |  | OWN-009, OWN-011 |
| OWN-011 | Edit Partner Agency | Full page | `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `editAgency($tab, $id, $show_page, $payment_detail_id)`) |  | OWN-009 |
| OWN-012 | Partner Agency Profile | Popup | `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`) | OWN-009 | OWN-009 |
| OWN-013 | Agency Users | Full page | `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`) |  | OWN-014, OWN-015 |
| OWN-014 | New Agency User | Full page | `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`) |  | OWN-013 |
| OWN-015 | Edit Agency User | Full page | `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`) |  | OWN-013 |
| OWN-016 | Owner Access History | Full page | `/Owner/loginLog` (controller `Owner`, action `loginLog()`) |  | OWN-001 |
| OWN-017 | Owner Email Alerts | Full page | `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAccessTemplate($tab, $selected_lang)`) |  |  |

## 6. Owner Hub

### OWP — Owner Hub (31 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OWP-001 | Owner Hub Login | Full page | `ExternalUserController::index()` — friendly route: `/Owner`, `/Owners` (config/Routes.php lines 104-105) |  | OWP-001-P1, OWP-003, OWP-005 |
| OWP-001-P1 | Password Recovery | Popup | `ExternalUserController::forgotPassword()` — no dedicated friendly route, no dedicated view (autoRender = false); the popup UI is embedded directly in `index... | OWP-001 | OWP-001, OWP-003 |
| OWP-002 | Overview | Full page | `ExternalUserController::dashboard()` — no dedicated friendly route (accessed via `/external-user/dashboard`, CakePHP default) |  |  |
| OWP-003 | New Password | Full page | `ExternalUserController::resetPassword($token)` — no dedicated friendly route; accessed via the link in the email `/external-user/reset-password/{token}` (Ca... |  | OWP-001, OWP-001-P1 |
| OWP-004 | My Account | Full page | `ExternalUserController::profile()` — no dedicated friendly route (default `/external-user/profile`) |  | OWP-004-P1 |
| OWP-004-P1 | Update Password | Popup | `ExternalUserController::changePassword()` — no dedicated friendly route, no dedicated view (the form lives in the `#change-password` tab of `profile.ctp`), ... | OWP-004 | OWP-004 |
| OWP-005 | My Portfolio | Full page | `ExternalUserController::list()` — friendly route: `/external-user/property/list` (config/Routes.php line 107) |  | OWP-001, OWP-006 |
| OWP-006 | Property Snapshot | Full page | `ExternalUserController::viewDetails($villa_id)` — no dedicated friendly route, accessed from OWP-005 (default `/external-user/view-details/{villa_id}`) |  | OWP-005 |
| OWP-007 | Activity Tracker | Full page | `ExternalUserController::status($tab, $villa_id)` — no dedicated friendly route, opened from OWP-005 ("View Activity" icon), of the form `.../status/rental/{... |  | OWP-005 |
| OWP-007-P1 | Housekeeping Visit Detail | Popup | `ExternalUserController::planningTeamsDetail($id, $location)` — route of the form `.../planning-teams-detail/{villas_clean_id}/owner`, opened from OWP-007 (t... | OWP-007 | OWP-007 |
| OWP-007-P2 | Garden Visit Detail | Popup | `ExternalUserController::gardenView($id)` — no dedicated friendly route, opened from OWP-007 (the "Garden" tab) in a new tab (default `/external-user/garden-... | OWP-007 | OWP-007 |
| OWP-008 | Occupancy Calendar | Full page | `ExternalUserController::calendar($villa_id)` — no dedicated friendly route, opened from OWP-005 (calendar icon), of the form `.../calendar/{villa_id_base64}` |  | OWP-005, OWP-010-P1 |
| OWP-009 | Repair History | Full page | `ExternalUserController::maintenanceLog($id)` — friendly route: `/external-user/property/log/:id` (config/Routes.php line 108) |  | OWP-005, OWP-006 |
| OWP-010 | Reservations | Full page | `ExternalUserController::bookingList()` — no dedicated friendly route (default `/external-user/booking-list`) |  | OWP-010-P1 |
| OWP-010-P1 | Reservation Detail | Popup | `ExternalUserController::bookingDetails($id)` — no dedicated friendly route (default `/external-user/booking-details/{id_base64}`) | OWP-010 | OWP-008, OWP-010 |
| OWP-011 | Block Dates | Full page | `ExternalUserController::addBooking()` — no dedicated friendly route; no navigation link in the system currently points to this screen |  |  |
| OWP-012 | Upcoming Arrivals | Full page | `ExternalUserController::checkIn()` — no dedicated friendly route (default `/external-user/check-in`) |  |  |
| OWP-013 | Upcoming Departures | Full page | `ExternalUserController::checkOut()` — no dedicated friendly route (default `/external-user/check-out`) |  |  |
| OWP-014 | Earnings Statement | Full page | `ExternalUserController::generateReports()` — no dedicated friendly route (default `/external-user/generate-reports`) |  |  |
| OWP-015 | Performance Trends | Full page | `ExternalUserController::performance()` — no dedicated friendly route (default `/external-user/performance`) |  |  |
| OWP-016 | Monthly Payout Summary | Full page | `ExternalUserController::paymentReport($villa_id)` — no dedicated friendly route, opened from OWP-005 ($ icon), of the form `.../payment-report/{villa_id_bas... |  | OWP-005 |
| OWP-017 | Stay Requests | Full page | `ExternalUserController::directBookingList()` — no dedicated friendly route (default `/external-user/direct-booking-list`) |  | OWP-017-P1, OWP-017-P2, OWP-017-P3 |
| OWP-017-P1 | New Stay Request | Popup | `ExternalUserController::addDirectBooking($id = null)` — no dedicated friendly route, opened from the "Request New Booking" button on OWP-017 (default `/exte... | OWP-017 | OWP-017 |
| OWP-017-P2 | Edit Stay Request | Popup | `ExternalUserController::editDirectBooking($id)` — no dedicated friendly route, opened from the edit icon on OWP-017 (default `/external-user/edit-direct-boo... | OWP-017 | OWP-017 |
| OWP-017-P3 | Stay Request Details | Popup | `ExternalUserController::viewDirectBooking($id)` — no dedicated friendly route, opened from the eye icon on OWP-017 (default `/external-user/view-direct-book... | OWP-017 | OWP-017 |
| OWP-018 | Payout Accounts | Full page | `ExternalUserController::paymentDetails()` — no dedicated friendly route (default `/external-user/payment-details`) |  | OWP-018-P1, OWP-018-P2 |
| OWP-018-P1 | New Payout Account | Popup | `ExternalUserController::addPaymentDetail()` — no dedicated friendly route, opened from the "+" button on OWP-018 (default `/external-user/add-payment-detail`) | OWP-018 | OWP-018 |
| OWP-018-P2 | Edit Payout Account | Popup | `ExternalUserController::editPaymentDetail($id)` — no dedicated friendly route, opened from the edit icon on OWP-018 (default `/external-user/edit-payment-de... | OWP-018 | OWP-018 |
| OWP-019 | Cancelled Stay Requests | Full page | `ExternalUserController::cancelDirectBookingList()` — no dedicated friendly route (default `/external-user/cancel-direct-booking-list`) |  | OWP-017 |
| OWP-020 | Statement Archive | Full page | `ExternalUserController::ReportHistory($villa_id)` — no dedicated friendly route (default `/external-user/report-history/{villa_id_base64}`) |  | OWP-005 |
| OWP-021 | Owner Bulletin | Full page | `ExternalUserController::MonthlyNewsletter()` — no dedicated friendly route (default `/external-user/monthly-newsletter`) |  |  |

## 7. Guest Hub

### GST — Guest Hub (11 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| GST-001 | Guest Hub Login | Full page | `Guest::index()` — default `/guest/index`; pretty route: `/Welcome`, `/Welcome/:id` (both point to the same action; the `id` parameter is not used by the con... |  | GST-002, GST-003 |
| GST-002 | My Reservations | Full page | `Guest::bookings()` — default `/guest/bookings`; pretty route (DashedRoute fallback): `/guest/bookings` |  | GST-001, GST-003, GST-004 |
| GST-003 | Trip Details | Full page | `Guest::yourBooking($booking_id = null)` — default `/guest/your-booking/:booking_id`; pretty route: `/guest/your-booking` (explicitly declared in `Routes.php... |  | GST-001, GST-002, GST-004 |
| GST-004 | Quick Links | Full page | `Guest::accessPortal($booking_id = null)` — default `/guest/access-portal/:booking_id`; pretty route (DashedRoute fallback): `/guest/access-portal` |  | GST-001, GST-002, GST-008, GST-010, GST-011 |
| GST-005 | Property Guide | Full page | `Guest::property()` — default `/guest/property`; pretty route (DashedRoute fallback): `/guest/property` |  |  |
| GST-006 | Local Holidays | Full page | `Guest::yourHolidays()` — default `/guest/your-holidays`; pretty route (DashedRoute fallback): `/guest/your-holidays` |  |  |
| GST-007 | Stay Policies | Full page | `Guest::rules()` — default `/guest/rules`; pretty route (DashedRoute fallback): `/guest/rules` |  |  |
| GST-008 | Dining Nearby | Full page | `Guest::restaurants($villa_id = null)` — default `/guest/restaurants/:villa_id`; pretty route (DashedRoute fallback): `/guest/restaurants` |  | GST-001, GST-009 |
| GST-009 | Restaurant Profile | Full page | `Guest::restaurant($restaurant_id = null)` — default `/guest/restaurant/:restaurant_id`; pretty route (DashedRoute fallback): `/guest/restaurant` |  | GST-002, GST-004, GST-008 |
| GST-010 | Sights Nearby | Full page | `Guest::landmark($booking_id = null)` — default `/guest/landmark/:booking_id`; pretty route (DashedRoute fallback): `/guest/landmark` |  | GST-001, GST-002 |
| GST-011 | Things to Do Nearby | Full page | `Guest::activities($booking_id = null)` — default `/guest/activities/:booking_id`; pretty route (DashedRoute fallback): `/guest/activities` |  | GST-002 |

## 8. Property Care

### OPR — Upkeep Jobs (22 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OPR-001 | Grounds & Pool Jobs | Full page | operator/gardenJobStatus (query `?id=`) + dashed-style pretty route: operator/garden-job-status |  | OPR-002 |
| OPR-002 | Garden Rounds | Full page | operator/gardenJobList/:tab? + dashed-style pretty route: operator/garden-job-list |  | OPR-001, OPR-016 |
| OPR-003 | Pool Rounds | Full page | operator/pools/:tab? + dashed-style pretty route: operator/pools |  | OPR-004 |
| OPR-004 | Pool Round Record | Full page | operator/poolView/:id + dashed-style pretty route: operator/pool-view/:id |  | OPR-003 |
| OPR-005 | Close Pool Round | Full page | operator/poolJob/:id + dashed-style pretty route: operator/pool-job/:id |  | OPR-003 |
| OPR-006 | Log Pool Issue | Full page | operator/poolReport/:id + dashed-style pretty route: operator/pool-report/:id |  | OPR-005 |
| OPR-007 | Housekeeping Rounds | Full page | operator/cleaning + dashed-style pretty route: operator/cleaning |  | OPR-008 |
| OPR-008 | Housekeeping Checklist | Full page | operator/cleaningDetails?id=&last_id= + dashed-style pretty route: operator/cleaning-details |  | OPR-007 |
| OPR-009 | Housekeeping Console | Full page | operator/cleaningOperator + dashed-style pretty route: operator/cleaning-operator |  |  |
| OPR-010 | Condition Checks | Full page | operator/inspection + dashed-style pretty route: operator/inspection |  | OPR-011, OPR-012, OPR-013 |
| OPR-011 | Run Condition Check | Full page | operator/inspectionDetails?id=&last_id= + dashed-style pretty route: operator/inspection-details |  | OPR-010 |
| OPR-012 | Condition Check Results | Full page | operator/inspectionView?id= + dashed-style pretty route: operator/inspection-view |  | OPR-010 |
| OPR-013 | Resume Condition Check | Full page | operator/inspectionTaskView?id= + dashed-style pretty route: operator/inspection-task-view |  | OPR-010, OPR-011 |
| OPR-014 | Final Prep Rounds | Full page | operator/makeUp + dashed-style pretty route: operator/make-up |  | OPR-015 |
| OPR-015 | Final Prep Checklist | Full page | operator/makeupDetails?id=&last_id= + dashed-style pretty route: operator/makeup-details |  | OPR-014 |
| OPR-016 | Garden Round Record | Full page | operator/gardenView/:id + dashed-style pretty route: operator/garden-view/:id |  | OPR-002 |
| OPR-017 | Garden Round Planner | Full page | villa-services/gardenPlanning/:tab? + dashed-style pretty route: villa-services/garden-planning |  | OPR-002 |
| OPR-018 | Garden Crew Setup | Full page | villa-services/gardenTeams + dashed-style pretty route: villa-services/garden-teams |  | OPR-017 |
| OPR-019 | My Assignments | Full page | operator/roster + dashed-style pretty route: operator/roster |  |  |
| OPR-020 | Field Repair Reports | Full page | operator/maintenance + dashed-style pretty route: operator/maintenance |  | OPR-021, OPR-022 |
| OPR-021 | Report Field Repair | Full page | operator/addMaintenanceTicket + dashed-style pretty route: operator/add-maintenance-ticket |  | OPR-020 |
| OPR-022 | Manage Field Repair | Full page | operator/editMaintenanceTicket/:id + dashed-style pretty route: operator/edit-maintenance-ticket/:id (id passed as base64/btoa) |  | OPR-020 |

### MNT — Repair Desk (29 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| MNT-001 | Repair Requests | Full page | maintenance/list |  | MNT-002, MNT-003, MNT-004, MNT-005 |
| MNT-002 | New Repair Request | Full page | maintenance/add |  | MNT-001 |
| MNT-003 | Repair Triage | Full page | maintenance/accept/:id (id base64) |  | MNT-001 |
| MNT-004 | Repair Progress Update | Full page | maintenance/edit/:id (id base64) |  | MNT-001 |
| MNT-005 | Repair Request Record | Full page | maintenance/view/:id |  | MNT-001, MNT-004, MNT-006 |
| MNT-006 | Repair Expenses | Full page | maintenance/cost/:id (id base64) |  | MNT-001, MNT-005 |
| MNT-007 | Issue Categories | Full page | maintenance/categories |  |  |
| MNT-008 | Urgency Levels | Full page | maintenance/priorities |  |  |
| MNT-009 | Garden Service Types | Full page | maintenance/gardenServices |  | MNT-009-P1, MNT-009-P2 |
| MNT-009-P1 | New Garden Service Type | Popup | maintenance/addGardenService | MNT-009 | MNT-009 |
| MNT-009-P2 | Edit Garden Service Type | Popup | maintenance/editGardenService/:id | MNT-009 | MNT-009 |
| MNT-010 | Pool Service Types | Full page | maintenance/poolServices |  | MNT-010-P1, MNT-010-P2 |
| MNT-010-P1 | New Pool Service Type | Popup | maintenance/addPoolServices | MNT-010 | MNT-010 |
| MNT-010-P2 | Edit Pool Service Type | Popup | maintenance/editPoolService/:id | MNT-010 | MNT-010 |
| MNT-011 | Pool Repair Types | Full page | maintenance/poolRepair |  | MNT-011-P1, MNT-011-P2 |
| MNT-011-P1 | New Pool Repair Type | Popup | maintenance/addPoolRepair | MNT-011 | MNT-011 |
| MNT-011-P2 | Edit Pool Repair Type | Popup | maintenance/editPoolRepair/:id | MNT-011 | MNT-011 |
| MNT-012 | Issue Classification | Full page | maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` for pagination/search) |  |  |
| MNT-013 | Refurbishment Types | Full page | maintenance/renovationServices |  | MNT-013-P1, MNT-013-P2 |
| MNT-013-P1 | New Refurbishment Type | Popup | maintenance/addRenovationService | MNT-013 | MNT-013 |
| MNT-013-P2 | Edit Refurbishment Type | Popup | maintenance/editRenovationServices/:id | MNT-013 | MNT-013 |
| MNT-014 | Housekeeping Standards | Full page | maintenance/cleaningServices (ajax GET on the same route returns JSON search results; `maintenance/getCleaningServiceData/:id` loads edit data; `maintenance/... |  | MNT-014-P1 |
| MNT-014-P1 | New Housekeeping Service | Full page | maintenance/addCleaningService | MNT-014 | MNT-014 |
| MNT-015 | Admin Service Types | Full page | maintenance/backOfficeServices |  | MNT-015-P1, MNT-015-P2 |
| MNT-015-P1 | New Admin Service Type | Popup | maintenance/addBackOfficeService | MNT-015 | MNT-015 |
| MNT-015-P2 | Edit Admin Service Type | Popup | maintenance/editBackOfficeServices/:id | MNT-015 | MNT-015 |
| MNT-016 | Inspection SLAs | Full page | maintenance/inspection |  | MNT-016-P1, MNT-016-P2 |
| MNT-016-P1 | Edit Inspection SLA | Popup | maintenance/editInspection/:id (id base64) | MNT-016 | MNT-016 |
| MNT-016-P2 | Inspection SLA Details | Popup | maintenance/viewInspection/:id (id base64) | MNT-016 | MNT-016, MNT-016-P1 |

### REN — Refurbishment (12 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| REN-001 | New Refurbishment Project | Full page | renovation/new-project |  | REN-002, REN-003 |
| REN-002 | Refurbishment Tracker | Full page | renovation/followUp + dashed-style pretty route: renovation/follow-up |  | REN-001, REN-003, REN-004 |
| REN-003 | Project Timeline | Full page | renovation/projectFollowUp/:id + dashed-style pretty route: renovation/project-follow-up/:id (id passed as base64) |  | REN-001, REN-002, REN-005, REN-007, REN-008, REN-009, REN-010, REN-011 |
| REN-004 | Edit Refurbishment Project | Full page | renovation/edit/:renovation_id + dashed-style pretty route: renovation/edit/:renovation_id (id passed as base64) |  | REN-002 |
| REN-005 | Project Spend Ledger | Full page | renovation/paymentList/:renovation_id + dashed-style pretty route: renovation/payment-list/:renovation_id (id passed as base64) |  | REN-003, REN-006 |
| REN-006 | Record Project Payment | Full page | renovation/addPayment/:renovation_id + dashed-style pretty route: renovation/add-payment/:renovation_id (id passed as base64) |  | REN-005 |
| REN-007 | Add Invoice or Receipt | Full page | renovation/addNewReceipt/:renovation_id + dashed-style pretty route: renovation/add-new-receipt/:renovation_id (id passed as base64) |  | REN-003 |
| REN-008 | Edit Invoice or Receipt | Full page | renovation/editRenovationReceipt/:id + dashed-style pretty route: renovation/edit-renovation-receipt/:id (id passed as base64) |  | REN-003 |
| REN-009 | Upload Progress Photo | Full page | renovation/addPhoto/:renovation_id + dashed-style route: renovation/add-photo/:renovation_id (id passed as base64) |  | REN-003 |
| REN-010 | Edit Progress Photo | Full page | renovation/editPhoto/:id + dashed-style route: renovation/edit-photo/:id (id passed as base64) |  | REN-003 |
| REN-011 | Budget vs. Progress | Full page | renovation/report/:id + dashed-style route: renovation/report/:id (id passed as base64) |  | REN-003 |
| REN-012 | Unused Placeholder Popup | Popup | renovation/startPopup + dashed-style route: renovation/start-popup |  |  |

### TRN — Staff Academy (16 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| TRN-001 | Staff Academy | Full page | `TrainingController::index()` — `/training/index` (default, DashedRoute) |  | TRN-002, TRN-007, TRN-008, TRN-010, TRN-011 |
| TRN-002 | Lesson Builder | Full page | `TrainingController::createTutorial()` — `/training/create-tutorial` |  | TRN-002-P1, TRN-003, TRN-004, TRN-005 |
| TRN-002-P1 | Confirm Lesson Deletion | Popup | Bootstrap modal within `create_tutorial.ctp`; the delete action calls `TrainingController::deleteTutorial($id)` — `/training/delete-tutorial/{id_base64}` | TRN-002 | TRN-002 |
| TRN-003 | New Lesson | Full page | `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/add-tutorial/{tutorial_id}/{slide_id}` |  | TRN-002, TRN-005 |
| TRN-004 | Lesson Overview | Full page | `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}` |  | TRN-002, TRN-005 |
| TRN-005 | Edit Lesson | Full page | `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}` |  | TRN-002, TRN-003, TRN-004, TRN-005-P1, TRN-006 |
| TRN-005-P1 | Confirm Slide Deletion | Popup | Bootstrap modal within `edit_tutorial.ctp`; the delete action calls `TrainingController::deleteSlide($id)` — `/training/delete-slide/{id_base64}` | TRN-005 | TRN-005 |
| TRN-006 | Edit Lesson Slide | Full page | `TrainingController::editSlide($id)` — `/training/edit-slide/{id}` |  | TRN-005 |
| TRN-007 | Lesson Catalog | Full page | `TrainingController::library()` — `/training/library` |  | TRN-009 |
| TRN-008 | My Learning Progress | Full page | `TrainingController::myRecord()` — `/training/my-record` |  | TRN-009 |
| TRN-009 | Lesson Reader | Full page | `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-tutorial/{tutorial_id}/{reading_id}` |  | TRN-007, TRN-008 |
| TRN-010 | Team Learning Progress | Full page | `TrainingController::myTeamRecord()` — `/training/my-team-record` |  |  |
| TRN-011 | Academy Settings | Full page | `TrainingController::setting()` — `/training/setting` |  |  |
| TRN-012 | Intro Lesson Demo | Full page | `TrainingController::page()` — `/training/page` |  |  |
| TRN-013 | Knowledge Check Demo | Full page | `TrainingController::quizQuestion()` — `/training/quiz-question` |  |  |
| TRN-014 | Lesson Slide Demo | Full page | `TrainingController::slide2()` — `/training/slide2` |  |  |

## 9. Investors & Stock

### FUND — Investor Capital (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| FUND-001 | Investor Accounts | Full page | `FundController::investors()` — `/fund/investors` (GET, filtered via query string `id`, `show_investor`; POST used to assign a project or download an Excel r... |  | FUND-001-P1, FUND-002, FUND-007 |
| FUND-001-P1 | Link Investor to Project | Popup | Submits via POST to `FundController::investors()` (`/fund/investors`, hidden field `action = project`). Project list data is loaded via AJAX `fund/check-proj... | FUND-001 | FUND-001 |
| FUND-002 | Investor Ledger | Full page | `FundController::statements($in_id = null)` — `/fund/statements` or `/fund/statements/:in_id` (parameter passed when navigating from FUND-001; also filterabl... |  | FUND-001, FUND-002-P1 |
| FUND-002-P1 | Investor Transaction: Invest / Withdraw / Payout / Capitalize | Popup | Submits via POST to `FundController::statements()` (`/fund/statements`, field `action` = `invest` \| `withdraw` \| `payout` \| `capitalize`). A single modal is ... | FUND-002 | FUND-002 |
| FUND-003 | Funded Projects | Full page | `FundController::projects()` — `/fund/projects` |  | FUND-004, FUND-005, FUND-006 |
| FUND-004 | New Funded Project | Full page | `FundController::addProject()` — `/fund/add-project` (POST) |  | FUND-003 |
| FUND-005 | Edit Funded Project | Full page | `FundController::updateProject($id)` — `/fund/update-project/:id` (POST) |  | FUND-003, FUND-006 |
| FUND-006 | Funded Project Profile | Full page | `FundController::viewProject($id)` — `/fund/view-project/:id` |  | FUND-003, FUND-005 |
| FUND-007 | Investor Yield Rates | Full page | `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET to display, POST to save the entire table) |  | FUND-001 |

### INV — Stock Control (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| INV-001 | Stock Levels | Full page | `InventoryController::list()` — `/inventory/list` |  | INV-001-P1, INV-002 |
| INV-001-P1 | Adjust or Remove Stock | Popup | Submits via POST to `InventoryController::list()` (`/inventory/list`, field `action` = `add-more` \| `sub-more` \| `delete`). A single modal is shared across a... | INV-001 | INV-001 |
| INV-002 | New Stock Item | Full page | `InventoryController::add()` — `/inventory/add` (POST) |  | INV-001 |
| INV-003 | Adjust Stock | Full page | `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` is base64-encoded in the URL; POST to save) |  | INV-001 |
| INV-004 | Incoming Stock Requests | Full page | `InventoryController::itemRequest()` — `/inventory/item-request` |  | INV-004-P1 |
| INV-004-P1 | Approve Incoming Stock | Popup | Submits via POST to `InventoryController::itemRequest()` (`/inventory/item-request`) | INV-004 | INV-004 |
| INV-005 | Write-off Requests | Full page | `InventoryController::discard()` — `/inventory/discard` |  | INV-005-P1 |
| INV-005-P1 | Approve Write-off | Popup | Submits via POST to `InventoryController::discard()` (`/inventory/discard`) | INV-005 | INV-005 |
| INV-006 | Stock Movements | Full page | `InventoryController::logs()` — `/inventory/logs` |  |  |

## 10. In-Stay Services

### VSV — In-Stay Services (38 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VSV-001 | Service Overview | Full page | `VillaServicesController::list()` — defaults to `/villa-services/list` |  | VSV-002, VSV-011, VSV-012 |
| VSV-002 | Metering Setup | Full page | `VillaServicesController::propertySetup($tab = null)` — defaults to `/villa-services/property-setup/<tab>`; the tab is also read from the query string (`?tab... |  | VSV-001 |
| VSV-003 | Arrival Meter Reading | Full page | `VillaServicesController::checkIn()` — defaults to `/villa-services/check-in` |  | VSV-003-P1, VSV-004-P1 |
| VSV-003-P1 | Record Arrival Reading | Popup | View at `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<booking_id>`; saved via `VillaServicesController::saveMeter()` — `... | VSV-003 | VSV-003 |
| VSV-004 | Departure Meter Reading | Full page | `VillaServicesController::checkOut()` — defaults to `/villa-services/check-out` |  | VSV-004-P1 |
| VSV-004-P1 | Record Departure Reading | Popup | `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_id>` (GET displays the form, POST to the same action to save) | VSV-004 | VSV-004 |
| VSV-005 | Extended-Stay Metering | Full page | `VillaServicesController::partial()` — defaults to `/villa-services/partial`; filters are read via query string (`?villa=&guest_name=&check_in_date=&check_ou... |  | VSV-005-P1 |
| VSV-005-P1 | Record Extended-Stay Reading | Popup | `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-stay-meter/<booking_id>`; saved via `saveLongStayDiscount()` (POST, no d... | VSV-005 | VSV-005 |
| VSV-006 | Power Bill Settlement | Full page | `VillaServicesController::reconcile()` — defaults to `/villa-services/reconcile` |  | VSV-004-P1, VSV-005-P1 |
| VSV-007 | Utility Invoices | Full page | `VillaServicesController::monthlyBill()` — defaults to `/villa-services/monthly-bill` (POST to the same action for search/update) |  |  |
| VSV-008 | Power Cost Recovery | Full page | `VillaServicesController::monthlyBalance()` — defaults to `/villa-services/monthly-balance` (POST to the same action for search) |  |  |
| VSV-009 | Billable Items | Full page | `VillaServicesController::item()` — defaults to `/villa-services/item` |  |  |
| VSV-010 | Guest Transfers | Full page | `VillaServicesController::transfer()` — defaults to `/villa-services/transfer` |  |  |
| VSV-011 | Arrival Reading Audit | Full page | `VillaServicesController::electricityCheckInControl()` — defaults to `/villa-services/electricity-check-in-control`; all filters are read/written via the que... |  | VSV-001, VSV-011-P1 |
| VSV-011-P1 | Arrival Reading Detail | Popup | `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-control/<booking_id>` | VSV-011 | VSV-011 |
| VSV-012 | Departure Reading Audit | Full page | `VillaServicesController::electricityCheckOutControl()` — defaults to `/villa-services/electricity-check-out-control`; filters are read/written via the query... |  | VSV-001, VSV-012-P1 |
| VSV-012-P1 | Departure Reading Detail | Popup | `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-control/<booking_id>` | VSV-012 | VSV-012 |
| VSV-013 | In-Villa Dining | Full page | `VillaServicesController::food()` — defaults to `/villa-services/food` |  |  |
| VSV-014 | Housekeeping Overview | Full page | `VillaServicesController::cleaning()` — defaults to `/villa-services/cleaning` |  | VSV-016 |
| VSV-015 | Guest Power Charges | Full page | `VillaServicesController::checkStay()` — defaults to `/villa-services/check-stay`; supplementary suggestion data via AJAX `getCheckStay` (no dedicated view) |  |  |
| VSV-016 | Housekeeping Crews | Full page | `VillaServicesController::cleaningTeams()` — defaults to `/villa-services/cleaning-teams`; team list loaded via AJAX `cleaningTeamsAjax`, saved via `saveClea... |  |  |
| VSV-017 | Garden Care Hub | Full page | `VillaServicesController::garden($tab, $sub_tab)` — defaults to `/villa-services/garden/<tab>/<sub_tab>` (tab: `reports` \| `team` \| `planning`) |  | VSV-017-P1 |
| VSV-017-P1 | Garden Care Visit Detail | Popup | `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>` | VSV-017 | VSV-017 |
| VSV-018 | Garden Crews | Full page | `VillaServicesController::gardenTeams()` — defaults to `/villa-services/garden-teams`; saved via AJAX `saveGardenTeams` |  | VSV-017 |
| VSV-019 | Garden Visit Planner | Full page | `VillaServicesController::gardenPlanning($tab)` — defaults to `/villa-services/garden-planning/<tab>` (tab: `team-<n>` or `team-total`); data saved via AJAX ... |  | VSV-017 |
| VSV-020 | Today's Garden Jobs | Full page | `VillaServicesController::gardenJobList()` — defaults to `/villa-services/garden-job-list` |  | VSV-020-P1 |
| VSV-020-P1 | Garden Job Progress | Popup | `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status` | VSV-020 | VSV-020 |
| VSV-021 | Inspection Reports | Full page | `VillaServicesController::inspection()` — defaults to `/villa-services/inspection`; table data loaded via AJAX `inspectionAjax`/`inspectionDetailAjax` |  | VSV-021-P1, VSV-022, VSV-022-P1 |
| VSV-021-P1 | Inspection Report Detail | Popup | `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspection_key>&keys=<list of keys, optional>` | VSV-021 | VSV-021 |
| VSV-022 | Inspection Triage | Popup | `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspection_key>` | VSV-021 | VSV-021, VSV-022-P1 |
| VSV-022-P1 | Resolve Inspection Items | Popup | `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDetails?id=<inspection_key>[&view=default\|teamlead]` | VSV-021 | VSV-021, VSV-022 |
| VSV-023 | Pool Care Visits | Full page | `VillaServicesController::pool()` — defaults to `/villa-services/pool`; quotation upload/approval via pretty routes `/villa-services/pool/upload-quotation`, ... |  |  |
| VSV-024 | Room Refresh Overview | Full page | `VillaServicesController::makeUp()` — defaults to `/villa-services/make-up` |  | VSV-025 |
| VSV-025 | Daily Refresh Rota | Full page | `VillaServicesController::makeupTeams()` — defaults to `/villa-services/makeup-teams`; list loaded via AJAX `makeupAjax`, status updated via AJAX `updateMake... |  | VSV-025-P1 |
| VSV-025-P1 | Refresh Progress Detail | Popup | `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-teams-detail/<villa_clean_id>/makeup` | VSV-025 | VSV-025 |
| VSV-026 | Turnover Cleaning Rota | Full page | `VillaServicesController::planningTeams()` — defaults to `/villa-services/planning-teams`; villa/status list loaded via AJAX `planningTeamsAjax`, "Clean Toda... |  | VSV-016, VSV-026-P1 |
| VSV-026-P1 | Turnover Progress Detail | Popup | `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/planning-teams-detail/<villa_clean_id>/<location>` | VSV-026 | VSV-026 |
| VSV-027 | Meter Audit (Classic) | Full page | `VillaServicesController::control()` — defaults to `/villa-services/control`; date-navigation data loaded via AJAX `getElecricutyControlAjax` |  | VSV-011, VSV-012 |

## 11. Web & Media

### CMS — Web Publishing (34 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| CMS-001 | Property Web Pages | Full page | `CmsController::list($id)` — default `/cms/list/:id` |  | CMS-002 |
| CMS-002 | Property Web Page | Full page | `CmsController::cms($tab, $villa_id, $lang1)` — default `/cms/cms/:tab/:villa_id/:lang1` (default tab is `welcome` when empty, or `main`) |  | CMS-001, CMS-003 |
| CMS-003 | Service Showcase | Full page | `CmsController::cmsServicesList($action, $id)` — default `/cms/cms-services-list/:action/:id` |  | CMS-004, CMS-005 |
| CMS-004 | Showcase Service Editor | Full page | `CmsController::cmsServices($id)` — default `/cms/cms-services/:id` |  | CMS-003 |
| CMS-005 | Shared Content Blocks | Full page | `CmsController::commonText()` — default `/cms/common-text` |  | CMS-003, CMS-006, CMS-009, CMS-012, CMS-014, CMS-016 |
| CMS-006 | Book-Direct Benefits | Full page | `CmsController::whyUs($action, $id)` — default `/cms/why-us/:action/:id` |  | CMS-005, CMS-007, CMS-008 |
| CMS-007 | New Book-Direct Benefit | Full page | `CmsController::whyUsAdd()` — default `/cms/why-us-add` |  | CMS-006 |
| CMS-008 | Edit Book-Direct Benefit | Full page | `CmsController::whyUsEdit($id)` — default `/cms/why-us-edit/:id` |  | CMS-006 |
| CMS-009 | Press & Partner Badges | Full page | `CmsController::logos($action, $id)` — default `/cms/logos/:action/:id` |  | CMS-005, CMS-010, CMS-011 |
| CMS-010 | New Partner Badge | Full page | `CmsController::logoAdd()` — default `/cms/logo-add` |  | CMS-009 |
| CMS-011 | Edit Partner Badge | Full page | `CmsController::logoEdit($id)` — default `/cms/logo-edit/:id` |  | CMS-009 |
| CMS-012 | Destination Guides | Full page | `CmsController::destination($action, $id)` — default `/cms/destination/:action/:id` |  | CMS-005, CMS-013 |
| CMS-013 | Destination Guide Editor | Full page | `CmsController::destinationEdit($district_id)` — default `/cms/destination-edit/:district_id` |  | CMS-012 |
| CMS-014 | Aggregator Destinations | Full page | `CmsController::destinationGlobal()` — default `/cms/destination-global` |  | CMS-005, CMS-015 |
| CMS-015 | Aggregator Destination Editor | Full page | `CmsController::destinationGlobalEdit($district_id)` — default `/cms/destination-global-edit/:district_id` |  | CMS-014 |
| CMS-016 | Enquiry Forms | Full page | `CmsController::contactForm($action, $id)` — default `/cms/contact-form/:action/:id` |  | CMS-005, CMS-017 |
| CMS-017 | Enquiry Form Editor | Full page | `CmsController::editContactForm($id)` — default `/cms/edit-contact-form/:id` |  | CMS-016 |
| CMS-018 | Concierge Showcase | Full page | `CmsController::concierges($action, $id)` — default `/cms/concierges/:action/:id` |  | CMS-005, CMS-019 |
| CMS-019 | Concierge Service Editor | Full page | `CmsController::editConcierges($id)` — default `/cms/edit-concierges/:id` |  | CMS-018 |
| CMS-020 | Interface Translations | Full page | `CmsController::cmsTranslation($tab)` — default `/cms/cms-translation/:tab` |  |  |
| CMS-021 | Themed Sites | Full page | `CmsController::collectionWebsites($action, $id)` — default `/cms/collection-websites/:action/:id` |  | CMS-022, CMS-023 |
| CMS-022 | Themed Site Editor | Full page | `CmsController::collectionWebsiteEdit($id)` — default `/cms/collection-website-edit/:id` |  | CMS-021 |
| CMS-023 | Themed Site Content | Full page | `CmsController::collectionTabs($tab, $id)` — default `/cms/collection-tabs/:tab/:id` |  | CMS-021, CMS-022, CMS-024, CMS-025, CMS-026, CMS-027, CMS-028, CMS-029 |
| CMS-024 | Themed Site Snippets | Full page | `CmsController::collectionCommonText($action, $id)` — default `/cms/collection-common-text/:action/:id` |  | CMS-023, CMS-025 |
| CMS-025 | Themed Site Snippet Editor | Full page | `CmsController::editCollectionCommonText($id)` — default `/cms/edit-collection-common-text/:id` |  | CMS-023, CMS-024 |
| CMS-026 | Travel Journal | Full page | `CmsController::insights($action, $id)` — default `/cms/insights/:action/:id` |  | CMS-023, CMS-027 |
| CMS-027 | Journal Article Editor | Full page | `CmsController::insightsEdit($id)` — default `/cms/insights-edit/:id` |  | CMS-023, CMS-026 |
| CMS-028 | Experience Wishlist | Full page | `CmsController::iWish($action, $id)` — default `/cms/i-wish/:action/:id` |  | CMS-023, CMS-029 |
| CMS-029 | Wishlist Item Editor | Full page | `CmsController::iWishEdit($id)` — default `/cms/i-wish-edit/:id` |  | CMS-023, CMS-028 |
| CMS-030 | Getting-There Guides | Full page | `CmsController::arrival($action, $id)` — default `/cms/arrival` (list); delete uses `/cms/arrival/delete/:id` |  | CMS-031 |
| CMS-031 | Getting-There Guide Editor | Full page | `CmsController::cmsArrival($id)` — default `/cms/cms-arrival/:id` |  | CMS-030 |
| CMS-032 | Dining Picks | Full page | `CmsController::guestPortal()` — default `/cms/guest-portal` |  | CMS-033 |
| CMS-033 | Dining Pick Editor | Full page | `CmsController::restaurants($tab, $restaurant_id)` — default `/cms/restaurants/:tab/:restaurant_id` |  | CMS-032 |
| CMS-034 | Agreement Templates | Full page | `CmsController::contracts()` — default `/cms/contracts` (GET may include the query parameters `country_id`, `language_code`, `tab`, `section_key`, `payment_s... |  |  |

### EMT — Email Library (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| EMT-001 | Email Library | Full page | `EmailTemplateController::list()` — default `/email-template/list` |  | EMT-001-P1, EMT-002, EMT-003 |
| EMT-001-P1 | Confirm Template Deletion | Popup | Static modal within `list.ctp`; confirming navigates to `EmailTemplateController::delete($id)` — `GET /email-template/delete/:id` | EMT-001 | EMT-001 |
| EMT-002 | New Email Template | Full page | `EmailTemplateController::add()` — default `/email-template/add` |  | EMT-001 |
| EMT-003 | Email Template Editor | Full page | `EmailTemplateController::edit($id)` — default `/email-template/edit/:id` (id base64-encoded) |  | EMT-001 |

### NOT — Announcements (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| NOT-001 | New Announcement | Full page | `NoticeController::noticeBoard()` — default `/notice/notice-board` (no dedicated pretty route declared in `config/Routes.php`; uses the DashedRoute fallback) |  | NOT-002 |
| NOT-002 | Announcements & Tasks | Full page | `NoticeController::noticeList($tab, $sub_tab)` — default `/notice/notice-list/:tab/:sub_tab` |  | NOT-001, NOT-003, NOT-004, NOT-005 |
| NOT-002-P1 | Confirm Announcement Deletion | Popup | Static modal within `notice_list.ctp`; the delete action calls `NoticeController::delete($id)` via `GET /notice/delete/:id` (base64 id) when the confirm butt... | NOT-002 | NOT-002 |
| NOT-003 | Announcement View | Full page | `NoticeController::viewDetail($id)` — default `/notice/view-detail/:id` |  | NOT-002, NOT-003-P1 |
| NOT-003-P1 | Delete Announcement from Detail | Popup | Static modal within `view_detail.ctp`; confirming calls `NoticeController::delete($id)` via `GET /notice/delete/:id` | NOT-003 | NOT-003 |
| NOT-004 | Cover for Colleague | Full page | `NoticeController::helpOtheruser($id)` — default `/notice/help-otheruser/:id` |  | NOT-002, NOT-003 |
| NOT-005 | Newsroom | Full page | `NoticeController::companyNews()` — default `/notice/company-news` |  | NOT-002, NOT-005-P1, NOT-006 |
| NOT-005-P1 | Confirm Post Deletion | Popup | Static modal within `company_news.ctp`; confirming calls `NoticeController::deleteCompanyNews($id)` via `GET /notice/delete-company-news/:id` | NOT-005 | NOT-005 |
| NOT-006 | New Newsroom Post | Full page | `NoticeController::addCompanyNews()` — default `/notice/add-company-news` |  | NOT-005 |

### TXT — Description Bank (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| TXT-001 | Description Bank | Full page | `TextsController::index()` — default `/texts` |  | TXT-001-P1, TXT-001-P2, TXT-001-P3 |
| TXT-001-P1 | Description Editor | Popup | Static modal within `index.ctp` (`#texts-editor-modal`); saves via AJAX `TextsController::saveText()` — `POST /texts/save-text` | TXT-001 | TXT-001 |
| TXT-001-P2 | Add Description Languages | Popup | Static modal within `index.ctp` (`#texts-language-modal`); saves via AJAX `TextsController::saveLanguages()` — `POST /texts/save-languages` | TXT-001 | TXT-001 |
| TXT-001-P3 | Confirm Description Deletion | Popup | Shared static modal within `index.ctp` (`#texts-delete-modal`); confirmation calls AJAX `TextsController::deleteText()` (`POST /texts/delete-text`) or `Texts... | TXT-001 | TXT-001 |

### PHO — Photo Library (8 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PHO-001 | Shoot Coordination | Full page | `PhotosController::planning($shootId)` — default `/photos/planning/:shootId` |  |  |
| PHO-002 | Photo Albums | Full page | `PhotosController::index()` — default `/photos/index` (or `/photos/`) |  | PHO-006, PHO-007 |
| PHO-003 | Shared Space Albums | Full page | `PhotosController::commonAreas()` — clean route `/photos/common-areas` (explicitly declared in `config/Routes.php`) |  | PHO-002, PHO-004, PHO-005, PHO-008 |
| PHO-004 | Residence Shared Spaces | Full page | `PhotosController::residence($residenceId)` — clean route `/photos/residence/:id` (explicitly declared in `config/Routes.php`) |  | PHO-003, PHO-005 |
| PHO-005 | Shared Space Album | Full page | `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — clean route `/photos/residence/:id/:set_type` (explicitly declared); shares the `detail... |  | PHO-003, PHO-004 |
| PHO-006 | Property Gallery | Full page | `PhotosController::property($villaId)` — default route `/photos/property/:id` (no pretty route declared in `config/Routes.php`) |  | PHO-002, PHO-003, PHO-004, PHO-005, PHO-007, PHO-008 |
| PHO-007 | Property Album | Full page | `PhotosController::detail($villaId, $setType = 'ota')` — default route `/photos/detail/:id/:set_type` (no pretty route declared); shares the `detail.ctp` vie... |  | PHO-002, PHO-004, PHO-006 |
| PHO-008 | Photo Requirements | Full page | `PhotosController::settings()` — default route `/photos/settings` |  | PHO-002, PHO-003, PHO-004, PHO-006, PHO-007 |

### VID — Video Guides (5 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VID-001 | Video Guides | Full page | `VideosController::index()` — default `/videos` |  | VID-001-P1, VID-001-P2, VID-001-P3, VID-001-P4 |
| VID-001-P1 | New Video Guide | Popup | Static modal within `index.ctp` (`#video-add-modal`); saves via `VideosController::add()` — `POST /videos/add` (multipart/form-data) | VID-001 | VID-001 |
| VID-001-P2 | Edit Video Guide | Popup | Static modal within `index.ctp` (`#video-edit-modal`); saves via `VideosController::edit($id)` — `POST /videos/edit/:id` (multipart/form-data) | VID-001 | VID-001 |
| VID-001-P3 | Video Guide Player | Popup | Static modal within `index.ctp` (`#video-player-modal`); content is played via `VideosController::play($id)` — `GET /videos/play/:id` (streams the file, with... | VID-001 | VID-001 |
| VID-001-P4 | Confirm Video Deletion | Popup | Static modal within `index.ctp` (`#video-confirm-modal`); confirmation calls AJAX `VideosController::delete($id)` — `POST /videos/delete/:id` | VID-001 | VID-001 |

### OTA — Channel Content (3 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OTA-001 | Channel Listing Copy | Full page | `OtaContentController::listing($platformId)` — default `/ota-content/listing/:platformId` |  | OTA-001-P1, OTA-001-P2 |
| OTA-001-P1 | Pick Listing Elements | Popup | Static modal within `listing.ctp`; saves the selection via AJAX `OtaContentController::assignElements($platformId)` — `POST /ota-content/assign-elements/:pla... | OTA-001 | OTA-001 |
| OTA-001-P2 | Confirm Element Removal | Popup | Static modal within `listing.ctp`; confirmation calls AJAX `OtaContentController::removeAssignment()` — `POST /ota-content/remove-assignment` | OTA-001 | OTA-001 |

### PAGE — Utility Pages (1 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PAGE-001 | Platform Health Check | Full page | `PagesController::display(...$path)` — default `/pages/*` (the route is commented out in `config/Routes.php`, line `//$routes->connect('/pages/*', ...)`). Th... |  |  |

## 12. Finance & Admin

### ACC — Finance & Admin (41 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| ACC-007 | Account Ledger | Full page | `AccountController::statements($account_id)` — default `/account/statements/<account_id>` (`account_id` passed as base64 in the URL) |  | ACC-007-P1, ACC-007-P2 |
| ACC-007-P1 | New Ledger Entry | Popup | `AccountController::addStatement($account_id)` — default `/account/add-statement/<account_id>` | ACC-007 | ACC-007 |
| ACC-007-P2 | Edit Ledger Entry | Popup | `AccountController::editStatement($id)` — default `/account/edit-statement/<id>` (`id` passed as base64) | ACC-007 | ACC-007 |
| ACC-008 | Entry Categories | Full page | `AccountController::accountingCategories()` — default `/account/accounting-categories` |  |  |
| ACC-009 | Bank Matching | Full page | `AccountController::statementReconcile()` — default `/account/statement-reconcile` |  |  |
| ACC-023 | Account Structure | Full page | `AccountController::chartAccounts()` — default `/account/chart-accounts` |  | ACC-023-P1, ACC-023-P2 |
| ACC-023-P1 | Account Structure Details | Popup | `AccountController::viewChartAccount($id)` — default `/account/view-chart-account/<id>` (`id` passed as base64) | ACC-023 | ACC-023 |
| ACC-023-P2 | Edit Account Structure | Popup | `AccountController::editChartAccount($id)` — default `/account/edit-chart-account/<id>` (`id` passed as base64) | ACC-023 | ACC-023 |
| ACC-028 | Bank Matching (Classic) | Full page | `AccountController::reconcile()` — default `/account/reconcile` |  | ACC-009 |
| ACC-029 | Finance Summary | Full page | `AccountController::index()` — default `/account/index` (no parameters) |  | ACC-007, ACC-030, ACC-031, ACC-032 |
| ACC-030 | Channel Payout Matching | Full page | - Main page: `AccountController::ota($ota_id = null)` — default `/account/ota` or `/account/ota/<key>` (the `$ota_id` parameter is passed from the sidebar bu... |  | ACC-007 |
| ACC-031 | Finance Preferences | Full page | `AccountController::setting()` — default `/account/setting` (no parameters) |  | ACC-032 |
| ACC-032 | Company Fleet | Full page | - Main page: `AccountController::vehicles()` — default `/account/vehicles` (GET to view the list; POST to the same URL for add/edit/delete, processed accordi... |  |  |
| ACC-033 | Attendance Log | Full page | `AccountController::timesheet()` — default `/account/timesheet` |  |  |
| ACC-034 | Pay Runs | Full page | `AccountController::payroll()` — default `/account/payroll` |  |  |
| ACC-038 | Mobile Devices | Full page | `AccountController::phones()` — default `/account/phones` |  |  |
| ACC-039 | IT Equipment | Full page | `AccountController::computers()` — default `/account/computers` |  |  |
| ACC-040 | Mobile Lines | Full page | `AccountController::simCards()` — default `/account/sim-cards` |  |  |
| ACC-041 | Pay Periods | Full page | `AccountController::wagePeriods()` — default `/account/wage-periods` |  |  |
| ACC-042 | Daily Earnings | Full page | `AccountController::dailyWages()` — default `/account/daily-wages` |  |  |
| ACC-053 | Holiday Calendar | Full page | `AccountController::publicHolidays()` — default `/account/public-holidays` |  | ACC-053-P1, ACC-053-P2 |
| ACC-053-P1 | New Holiday | Popup | `AccountController::addPublicHoliday()` — default `/account/add-public-holiday` | ACC-053 | ACC-053 |
| ACC-053-P2 | Edit Holiday | Popup | `AccountController::editPublicHoliday($id)` — default `/account/edit-public-holiday/<id>` (`id` passed as base64 in the URL) | ACC-053 | ACC-053 |
| ACC-054 | Scheduled Costs | Full page | `AccountController::recurring()` — default `/account/recurring` |  |  |
| ACC-055 | Cost Categories | Full page | `AccountController::expenseType()` — default `/account/expense-type` |  |  |
| ACC-056 | Owner Recharges | Full page | `AccountController::rebill()` — default `/account/rebill` |  | ACC-056-P1, ACC-056-P2 |
| ACC-056-P1 | New Owner Recharge | Popup | `AccountController::addRebill()` — default `/account/add-rebill` | ACC-056 | ACC-056 |
| ACC-056-P2 | Edit Owner Recharge | Popup | `AccountController::editRebill($id)` — default `/account/edit-rebill/<id>` | ACC-056 | ACC-056 |
| ACC-057 | Goods Vendors | Full page | `AccountController::suppliers()` — default `/account/suppliers` |  | ACC-057-P1, ACC-058 |
| ACC-057-P1 | Goods Vendor Form | Popup | `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-supplier/<tab>/<id>/<show_page>/<payment_detail_id>` | ACC-057 | ACC-057 |
| ACC-058 | Goods Catalog | Full page | `AccountController::products($tab)` — default `/account/products/<tab>` |  | ACC-058-P1 |
| ACC-058-P1 | Goods Item Form | Popup | `AccountController::addProduct($id)` — default `/account/add-product/<id>` | ACC-058 | ACC-058 |
| ACC-059 | Service Vendors | Full page | `AccountController::servicesSupplier()` — default `/account/services-supplier` |  | ACC-059-P1, ACC-060 |
| ACC-059-P1 | Service Vendor Form | Popup | `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-services-supplier/<tab>/<id>/<show_page>/<payment... | ACC-059 | ACC-059 |
| ACC-060 | Billable Services | Full page | `AccountController::services($tab)` — default `/account/services/<tab>` |  |  |
| ACC-061 | Spending Limits | Full page | `AccountController::approvalMatrix()` — default `/account/approval-matrix` |  |  |
| ACC-062 | Cash Advances | Full page | `AccountController::pettyCash($tab, $sub_tab)` — default `/account/petty-cash/<tab>/<sub_tab>` |  | ACC-063 |
| ACC-063 | Expense Settlements | Full page | `AccountController::expensePayment($tab)` — default `/account/expense-payment/<tab>` |  | ACC-007, ACC-062 |
| ACC-064 | Payment Approvals | Full page | `AccountController::paymentRequestList()` — default `/account/payment-request-list` |  | ACC-062, ACC-063, ACC-064-P1, ACC-064-P2 |
| ACC-064-P1 | New Payment Request | Popup | `AccountController::paymentRequest()` (displays the form) + `AccountController::addPaymentRequest()` (saves, POST) — default `/account/payment-request` | ACC-064 | ACC-064 |
| ACC-064-P2 | Edit Payment Request | Popup | `AccountController::editPaymentRequest($id)` (displays the form) + `AccountController::updatePaymentRequest()` (saves, POST) — default `/account/edit-payment... | ACC-064 | ACC-064 |
