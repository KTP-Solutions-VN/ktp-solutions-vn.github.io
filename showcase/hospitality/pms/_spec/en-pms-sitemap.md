# Sitemap — Azura Manager PMS (English)

This document lists every screen (including popups/modals) of the Azura Manager PMS system, prepared to support the UI/UX redesign initiative. Each screen has a unique code; detailed specifications (fields, data types, etc.) are available in `output/en-screens/<code>-*.md`.

## Screen Count Overview by Module

| # | Module | Prefix | Screen/Popup Count |
|---|---|---|---|
| 1 | Login & System Users | LOG, USR | 28 |
| 2 | Master Data | PROP, COMP, BU, VCS | 117 |
| 3 | System Settings | CS, SET | 26 |
| 4 | Booking | BOOK | 100 |
| 5 | Owner Management (Admin) | OWN | 22 |
| 6 | Owner Portal | OWP | 31 |
| 7 | Guest Portal | GST | 11 |
| 8 | Field Operations | OPR, MNT, REN, TRN | 79 |
| 9 | Finance | FUND, INV | 18 |
| 10 | Villa Services | VSV | 38 |
| 11 | Website Content (CMS) | CMS, EMT, NOT, TXT, PHO, VID, OTA, PAGE | 68 |
| 12 | Accounting & HR | ACC | 41 |
| | **Total** | | **579** |

## Legend

- **Screen code**: `<PREFIX>-<sequence number>` for a full page (e.g. `BOOK-001`), `<PREFIX>-<number>-P<n>` for a popup/modal child of that page (e.g. `BOOK-001-P1`).
- **Type**: Full page or Popup/Modal (parent screen noted).
- **Opened From**: the parent screen code that leads to this screen (mainly applies to popups).
- **Navigates To**: screen codes reachable from this screen (derived from code analysis; may not be 100% exhaustive for complex AJAX flows — see the individual screen file for full detail).

## 1. Login & System Users

### LOG — Login (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| LOG-001 | Login | Full page | `LoginController::index()` — default `login/index`; friendly route: `/` (system root page) |  | LOG-001-P1, USR-001 |
| LOG-001-P1 | Forgot Password | Popup | `LoginController::forgotPassword()` — default `login/forgotPassword`; friendly route: `/forgot-password` | LOG-001 | LOG-001, LOG-002 |
| LOG-002 | Reset Password | Full page | `LoginController::resetPassword($token)` — default `login/resetPassword/:token`; friendly route: `/reset-password/:token` |  | LOG-001, LOG-001-P1 |
| LOG-003 | System Settings | Full page | `LoginController::settings()` — default `login/settings` |  | USR-003 |

### USR — System Users (24 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| USR-001 | Dashboard | Full page | `UserController::dashboard()` — default `user/dashboard`; friendly route: `/user/dashboard` |  | LOG-001 |
| USR-002 | Business Indicators | Full page | `UserController::indicators()` — default `user/indicators` |  |  |
| USR-003 | System Settings | Full page | `UserController` inherits `LoginController::settings()` — default `user/settings` (no dedicated friendly route; already commented out in `config/Routes.php`) |  |  |
| USR-004 | User List (Internal Staff) | Full page | `UserController::list($tab)` — default `user/list/:tab` |  | USR-005, USR-006, USR-007 |
| USR-005 | Add User (Internal Staff) | Full page | `UserController::add($tab)` — default `user/add/:tab` |  | USR-004, USR-006 |
| USR-006 | Edit User (Internal Staff) | Full page | `UserController::edit($tab, $id, $show_page, $bank_account_id)` — default `user/edit/:tab/:id/:show_page/:bank_account_id` |  | USR-004, USR-005 |
| USR-007 | View User Details | Full page | `UserController::viewDetails($id, $tab)` — default `user/viewDetails/:id/:tab` |  | USR-004, USR-006 |
| USR-008 | My Profile | Full page | `UserController::profile()` — default `user/profile` |  | LOG-001, USR-008-P1 |
| USR-008-P1 | Change Password | Popup | `UserController::changePassword()` — default `user/changePassword` | USR-008 | LOG-001, USR-008 |
| USR-009 | Weekly Off | Full page | `UserController::weeklyOff()` — default `user/weeklyOff` |  | USR-004 |
| USR-010 | Granted Leaves | Full page | `UserController::grantedLeaves()` — default `user/grantedLeaves` |  | USR-004, USR-011 |
| USR-011 | Assign Leaves | Full page | `UserController::assignLeaves($id, $role)` — default `user/assignLeaves/:id/:role` |  | USR-010 |
| USR-012 | Agent List | Full page | `UserController::agents()` — default `user/agents` |  | USR-013, USR-014 |
| USR-013 | Add Agent | Full page | `UserController::addAgents()` — default `user/addAgents` |  | USR-012 |
| USR-014 | Edit Agent | Full page | `UserController::editAgents($id)` — default `user/editAgents/:id` |  | USR-012 |
| USR-015 | Booking Statistics | Full page | `UserController::statistics()` — default `user/statistics` |  |  |
| USR-016 | Provider List | Full page | `UserController::providers($tab)` — default `user/providers` |  | USR-017, USR-018, USR-019 |
| USR-017 | Add Provider | Full page | `UserController::addProviders()` — default `user/addProviders` |  | USR-016 |
| USR-018 | Edit Provider | Full page | `UserController::editProvider($id)` — default `user/editProvider/:id` (id is base64-encoded) |  | USR-016 |
| USR-019 | View Provider Details | Full page | `UserController::viewProviderDetails($id)` — default `user/viewProviderDetails/:id` |  | USR-016 |
| USR-020 | Payroll Rules List | Full page | `UserController::payrollRules()` — default `user/payrollRules` |  | USR-021 |
| USR-021 | Add Payroll Rule | Full page | `UserController::addPayrollRules()` — default `user/addPayrollRules` |  | USR-020 |
| USR-022 | Clock In / Clock Out | Full page | `UserController::clockIn()` — default `user/clockIn` |  | LOG-001 |
| USR-023 | Virtual Users Management | Full page | `UserController::virtualUsers()` — default `user/virtualUsers` |  |  |

## 2. Master Data

### PROP — Properties (47 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PROP-001 | Add Property Onboarding Confirmation Request | Full page | property/add-onboarding (optional parameter `$id` – ID of an existing Villa Onboarding record) |  |  |
| PROP-002 | Beds24 Pricing Coefficient by OTA Channel | Full page | property/beds24-coefficient |  |  |
| PROP-017 | Properties Missing Room ID | Full page | property/missing-roomids/:id (default dashed-format route; the `$id` parameter is passed via URL but is actually reset to empty by the controller and re-read... |  | PROP-030 |
| PROP-018 | Monthly Newsletter for Property Owners | Full page | property/monthly-report |  | PROP-030 |
| PROP-019 | Add New Photo Shoot Schedule | Full page | property/new-shooting |  | PROP-026 |
| PROP-020 | Onboarding List (New Property Data-Entry Wizard) | Full page | property/on-boardings |  | PROP-017 |
| PROP-021 | Properties Pending Onboarding Action List (Confirmation/Communication/Rules/Extras) | Full page | property/onboarding |  | PROP-017 |
| PROP-022 | Add Property Bank Account | Full page | property/payment-record/:villa_id (villa_id passed base64-encoded) |  |  |
| PROP-023 | Edit Property Service Payment Record (Payment Record Edit) | Full page | property/payment-record-edit/:villa_id/:payment_id (both parameters passed base64-encoded) |  |  |
| PROP-024 | Monthly Payment Report for Property Owners (Payment/Owner Report) | Full page | property/payment-report |  |  |
| PROP-025 | Photographer Evaluation | Full page | property/photography/photographer-evaluation (a custom route configured in Routes.php, mapped to the `photographerEvaluation` action) |  | PROP-026, PROP-028 |
| PROP-026 | Photography Planning | Full page | property/photography/:shootId/:guidelineId (default dashed-format route; `$shootId` also doubles as a special "sub-action" value: `guidelines`, `download-gui... |  | PROP-019, PROP-025, PROP-027, PROP-028 |
| PROP-027 | Properties Missing Photos | Full page | property/photography/missing-photos (a custom route configured in Routes.php, mapped to the `photographyMissingPhotos` action) |  | PROP-026 |
| PROP-028 | Photography Scores | Full page | property/photography/scores (a custom route configured in Routes.php, mapped to the `photographyScores` action) |  | PROP-025, PROP-026 |
| PROP-029 | Property Reports | Full page | property/property-reports/:tab/:villa_id |  |  |
| PROP-031 | Request OTA Listing Redo | Full page | property/redo/:villa_id/:chanel_id |  | PROP-030 |
| PROP-032 | Property Dashboard | Full page | property/dashboard (default CakePHP DashedRoute: `/property/dashboard`) |  |  |
| PROP-033 | Property List | Full page | property/list/:id (default CakePHP DashedRoute: `/property/list`; the `id` parameter is the business unit id, also accepted via the query string `?id=`) |  | PROP-029, PROP-034, PROP-035 |
| PROP-035 | View Property Details (View Details) | Full page | property/view-details/:villa_id (default CakePHP DashedRoute: `/property/view-details/:villa_id`) |  | PROP-033 |
| PROP-036 | Property Confirmation Information (Villa Confirmation) | Full page | property/confirmation/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Confirmation" icon) |  | PROP-021 |
| PROP-037 | Property Communication Information (Villa Communication) | Full page | property/communication/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Communication" icon) |  | PROP-021 |
| PROP-038 | Property Rules (Villa Rules) | Popup | property/villa-rules/:villa_id (villa_id passed base64-encoded) | PROP-021 | PROP-021 |
| PROP-039 | Property Additional Guest Services (Villa Extra) | Full page | property/villa-extras/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Extra" icon) |  | PROP-021 |
| PROP-040 | Property Quality (Quality) | Full page | property/quality |  | PROP-031 |
| PROP-041 | Property Service Fee Payment List (Service Fee) | Full page | property/service-fee/:villa_id (villa_id passed base64-encoded) |  | PROP-022, PROP-023, PROP-035 |
| PROP-042 | Property Booking Restriction | Full page | property/booking-restriction |  |  |
| PROP-043 | Concierge Territories | Full page | property/territories/:id |  |  |
| PROP-044 | Property Inventory Management | Full page | property/inventories/:villa_id |  | PROP-035, PROP-045 |
| PROP-045 | Property Inventory Request | Full page | property/inventory-request/:villa_id |  | PROP-044 |
| PROP-046 | Residence/Project List (Residence Enquiry) | Full page | property/residence-enquiry |  | PROP-047 |
| PROP-047 | View Residence/Project Details (View Residence Enquiry) | Full page | property/view-residence-enquiry/:residence_id/:business_unit_id |  | PROP-046 |
| PROP-048 | Bulk Service Management by Business Unit (Services) | Full page | property/services/:tab (dashed by default, also supports query `?tab=`, `?electricity_tab=`) |  | PROP-051 |
| PROP-049 | Property Service & Utility Settings (Service Setting) | Full page | property/service-setting/:tab/:villa_id (villa_id passed base64-encoded); also embedded as the "Service and Utilities" tab in the Villa Detail screen (PROP-050) |  | PROP-041, PROP-050 |
| PROP-050 | Add/Edit Property Details (Villa Detail) | Full page | property/villa/:tab/:villa_id (dashed by default; `$villa_id` is empty when adding new) |  | PROP-017, PROP-032, PROP-033, PROP-042, PROP-046, PROP-049, PROP-051 |
| PROP-051 | Guest Contract Assignment Recap by Business Unit | Full page | property/guest-contract-bu-recap |  | PROP-048, PROP-050, PROP-052 |
| PROP-052 | Guest Contract PDF Export (Guest Contract Assignment PDF) | Full page | property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_code=...&electricity_mode=... |  | PROP-050, PROP-051 |
| PROP-053 | Monthly Report by Business Unit (BU Reports) | Full page | property/bu-reports |  | PROP-018 |
| PROP-054 | Monthly Report Status (Report Status) | Full page | property/report-status |  | PROP-018, PROP-053 |
| PROP-055 | Property Report Ready List (Report Ready) | Full page | property/report-ready?business_unit=... |  | PROP-018, PROP-053, PROP-054 |
| PROP-056 | Photography Activity Logs (Photography Logs) | Full page | property/logs |  | PROP-026, PROP-027, PROP-028 |
| PROP-057 | Listing Redo Request History (Redo Log) | Popup | property/redo-log/:villa_id/:channel_id | PROP-040 | PROP-040, PROP-058 |
| PROP-058 | Listing To Be Redone List | Full page | property/listing-redone |  | PROP-057 |
| PROP-059 | Photography Schedule List (Shootings) | Full page | property/shootings |  | PROP-019, PROP-060 |
| PROP-060 | Edit Photography Schedule (Edit Shooting) | Full page | property/edit-shooting/:req_id (req_id passed base64-encoded), opened from PROP-059 (Edit icon) |  | PROP-059 |
| PROP-061 | Upload Property Report (Upload Report) | Full page | property/upload-report |  | PROP-018, PROP-053 |
| PROP-062 | Property Onboarding Revalidation Request (Edit On Boarding) | Full page | property/edit-on-boarding/:id, opened from PROP-020 (Onboarding List) |  | PROP-020 |
| PROP-063 | View Property Onboarding Details (View Onboarding) | Full page | property/view-onboarding/:id, opened from PROP-020 (Onboarding List) |  | PROP-020, PROP-062 |

### COMP — Company (2 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| COMP-001 | Company & Legal Entity (Subsidiaries) List | Full page | company/list (default CakePHP dashed-format route: `/company/list`, with an additional `:tab` parameter — e.g. `/company/list/subsidiaries-list`) |  | COMP-001-P1 |
| COMP-001-P1 | Popup: Add/Edit/Delete Company or Legal Entity | Popup | No dedicated route — uses a shared POST form to `company/list` (hidden action `add`/`edit`/`delete`); duplicate-name checks via AJAX `company/checkCompany` a... | COMP-001 | COMP-001 |

### BU — Business Unit (45 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| BU-001 | Business Unit List | Full page | `BusinessUnitController::list()` — default `/business-unit/list` |  | BU-001-P1, BU-002, BU-003, BU-004 |
| BU-001-P1 | Delete Business Unit Confirmation Popup | Popup | Static Bootstrap modal (`#exampleModal`) in `list.ctp`; on confirmation the browser navigates to `BusinessUnitController::delete($id)` — `/business-unit/dele... | BU-001 | BU-001 |
| BU-002 | Add Business Unit | Full page | `BusinessUnitController::add()` — default `/business-unit/add` |  | BU-001 |
| BU-003 | Edit Business Unit | Full page | `BusinessUnitController::edit($id)` — default `/business-unit/edit/{id_base64}` |  | BU-001 |
| BU-004 | View Business Unit Details | Full page | `BusinessUnitController::viewDetails($id)` — default `/business-unit/view-details/{id}` |  | BU-001 |
| BU-005 | Channel List (Chanels) | Full page | `BusinessUnitController::chanels()` — default `/business-unit/chanels` |  | BU-005-P1, BU-005-P2 |
| BU-005-P1 | Add/Edit Channel Popup | Popup | Static Bootstrap modal (`#chanelModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action. | BU-005 | BU-005 |
| BU-005-P2 | Delete Channel Confirmation Popup | Popup | Static Bootstrap modal (`#deleteModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action with `action=delete`. | BU-005 | BU-005 |
| BU-006 | Villa Links by Channel | Full page | `BusinessUnitController::channelVilla($channel_id)` — default `/business-unit/channel-villa/{channel_id}` |  | BU-005, BU-007 |
| BU-007 | Currency List | Full page | `BusinessUnitController::currency()` — default `/business-unit/currency` |  | BU-007-P1, BU-007-P2, BU-008 |
| BU-007-P1 | Add/Edit Currency Popup | Popup | Static Bootstrap modal (`#exampleModal`) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action. | BU-007 | BU-007 |
| BU-007-P2 | Delete Currency Confirmation Popup | Popup | Static Bootstrap modal (`#exampleModal`, form section hidden) in `currency.ctp`; submitted via POST to the same `BusinessUnitController::currency()` action w... | BU-007 | BU-007 |
| BU-008 | Exchange Rates | Full page | `BusinessUnitController::rates()` — default `/business-unit/rates` |  | BU-007, BU-008-P1 |
| BU-008-P1 | Enter/Update Exchange Rate Popup | Popup | Static Bootstrap modal (`#exampleModal`) in `rates.ctp`; submitted via POST to the same `BusinessUnitController::rates()` action. | BU-008 | BU-008 |
| BU-009 | Chat Platforms | Full page | `BusinessUnitController::chatPlatform()` — default `/business-unit/chat-platform` |  | BU-009-P1, BU-009-P2 |
| BU-009-P1 | Add/Edit Chat Platform Popup | Popup | Static Bootstrap modal (`#exampleModal`) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()` action. | BU-009 | BU-009 |
| BU-009-P2 | Delete Chat Platform Confirmation Popup | Popup | Static Bootstrap modal (`#exampleModal`, form section hidden) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()`... | BU-009 | BU-009 |
| BU-010 | Payment & Accounts | Full page | `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — default `/business-unit/payment-method/{tab}` |  | BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 |
| BU-010-P1 | Add/Edit Payment Method Popup | Popup | Bootstrap modal (`#exampleModal`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` action (`... | BU-010 | BU-010 |
| BU-010-P2 | Delete Payment Method Confirmation Popup | Popup | Bootstrap modal (`#exampleModalDeletePM`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` a... | BU-010 | BU-010 |
| BU-010-P3 | Add/Edit Account | Sub-page (opened fro | `BusinessUnitController::paymentMethod('accounts', 'add')` or `paymentMethod('accounts', 'edit', $id)` — default `/business-unit/payment-method/accounts/add`... | BU-010 | BU-010 |
| BU-010-P4 | Delete Account Confirmation Popup | Popup | Bootstrap modal (`#exampleModalDelete`) in the `business-unit/accounts.ctp` element; submitted via POST to the `BusinessUnitController::paymentMethod()` acti... | BU-010 | BU-010 |
| BU-010-P5 | Open Account Statement Popup (Open Statement) | Popup | Bootstrap modal (`#openStatementModal`) in the `business-unit/accounts.ctp` element; submitted via POST to `BusinessUnitController::openStatement()`. | BU-010 | BU-010 |
| BU-011 | Payment Methods by Business Unit | Full page | `BusinessUnitController::businessUnitPaymentMethod()` — default `/business-unit/business-unit-payment-method` |  | BU-010, BU-011-P1 |
| BU-011-P1 | Toggle Payment Methods by Business Unit Popup | Popup | Static Bootstrap modal (`#exampleModal`) in `business_unit_payment_method.ctp`; toggling is done via AJAX to `getBusinessPaymentMethod` (loads status) and `s... | BU-011 | BU-011 |
| BU-012 | Business Zone (Zoning) | Full page | `BusinessUnitController::zoning()` — default `/business-unit/zoning` |  | BU-012-P1, BU-013, BU-014 |
| BU-012-P1 | Popup: Confirm Business Zone Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `zoning.ctp`; confirmation navigates to `BusinessUnitController::deleteZoning($id)` — `/business-unit/delete-... | BU-012 | BU-012 |
| BU-013 | Add Business Zone | Full page | `BusinessUnitController::addZoning()` — default `/business-unit/add-zoning` |  | BU-012 |
| BU-014 | Edit Business Zone | Full page | `BusinessUnitController::editZoning($id)` — default `/business-unit/edit-zoning/{id}` (id base64-encoded) |  | BU-012 |
| BU-015 | Office List | Full page | `BusinessUnitController::offices()` — default `/business-unit/offices` |  | BU-015-P1, BU-016, BU-017, BU-018 |
| BU-015-P1 | Popup: Confirm Office Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `offices.ctp`; confirmation navigates to `BusinessUnitController::deleteOffice($id)` — `/business-unit/delete... | BU-015 | BU-015 |
| BU-016 | Add Office | Full page | `BusinessUnitController::addOffice()` — default `/business-unit/add-office` |  | BU-015 |
| BU-017 | Edit Office | Full page | `BusinessUnitController::editOffice($id)` — default `/business-unit/edit-office/{id}` (id base64-encoded) |  | BU-015 |
| BU-018 | View Office Details | Full page | `BusinessUnitController::viewOffice($id)` — default `/business-unit/view-office/{id}` (id base64-encoded) |  | BU-015 |
| BU-019 | Bank List | Full page | `BusinessUnitController::banks()` — default `/business-unit/banks` |  | BU-019-P1, BU-020, BU-021 |
| BU-019-P1 | Popup: Confirm Bank Deletion | Popup | Static Bootstrap modal (`#exampleModal`) within `banks.ctp`; confirmation navigates to `BusinessUnitController::deleteBank($id)` — `/business-unit/delete-ban... | BU-019 | BU-019 |
| BU-020 | Add Bank | Full page | `BusinessUnitController::addBank()` — default `/business-unit/add-bank` |  | BU-019 |
| BU-021 | Edit Bank | Full page | `BusinessUnitController::editBank($id)` — default `/business-unit/edit-bank/{id}` (id base64-encoded) |  | BU-019 |
| BU-022 | Channels (Manage Platforms, Channel Accounts & Content Elements) | Full page | `BusinessUnitController::channels($tab)` — default `/business-unit/channels/{tab}` (tab: `platforms`, `accounts`, `content-elements`) |  | BU-006, BU-022-P1 |
| BU-022-P1 | Popup: Add/Edit Booking Platform | Popup | Static Bootstrap modal (`#platformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')`. | BU-022 | BU-022 |
| BU-022-P2 | Popup: Confirm Booking Platform Deletion | Popup | Static Bootstrap modal (`#deletePlatformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')` with `platform_act... | BU-022 | BU-022 |
| BU-022-P3 | Popup: Add/Edit Channel Account | Popup | Static Bootstrap modal (`#chanelModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')`. | BU-022 | BU-022 |
| BU-022-P4 | Popup: Confirm Channel Account Deletion | Popup | Static Bootstrap modal (`#deleteModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')` with `action=delete`. | BU-022 | BU-022 |
| BU-022-P5 | Popup: Add/Edit Content Element | Popup | Bootstrap modal (`#ota-element-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::createElement` / `editEl... | BU-022 | BU-022 |
| BU-022-P6 | Popup: Confirm Content Element Deletion (Archive) | Popup | Bootstrap modal (`#ota-archive-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::archiveElement`. | BU-022 | BU-022 |

### VCS — Villa Common Settings (23 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VCS-001 | Amenities List (Item) | Full page | villa-common-setting/items (default CakePHP DashedRoute: `/villa-common-setting/items`) |  | VCS-001-P1 |
| VCS-001-P1 | Add/Edit/Delete Amenity Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/items` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `vi... | VCS-001 | VCS-001 |
| VCS-002 | Price Categories List (Price Category) | Full page | villa-common-setting/price-categories (default DashedRoute: `/villa-common-setting/price-categories`) |  | VCS-002-P1 |
| VCS-002-P1 | Add/Edit/Delete Price Category Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/price-categories` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check v... | VCS-002 | VCS-002 |
| VCS-003 | Property Types List (Property/Villa Type) | Full page | villa-common-setting/villa-types (default DashedRoute: `/villa-common-setting/villa-types`) |  | VCS-003-P1 |
| VCS-003-P1 | Add/Edit/Delete Property Type Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-types` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJ... | VCS-003 | VCS-003 |
| VCS-004 | Services List (Service) | Full page | villa-common-setting/services (default DashedRoute: `/villa-common-setting/services`) |  | VCS-004-P1 |
| VCS-004-P1 | Add/Edit/Delete Service Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/services` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX ... | VCS-004 | VCS-004 |
| VCS-005 | Contract Service Types List (Contract Service Type) | Full page | villa-common-setting/contract-service-types (default DashedRoute: `/villa-common-setting/contract-service-types`) |  | VCS-005-P1 |
| VCS-005-P1 | Add/Edit/Delete Contract Service Type Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/contract-service-types` (hidden `action`=`add`/`edit`/`delete`); duplicate servic... | VCS-005 | VCS-005 |
| VCS-006 | Service Providers List (Service Providers) | Full page | villa-common-setting/service-providers/:tab (default CakePHP DashedRoute: `/villa-common-setting/service-providers`, `tab` parameter defaults to `service-pro... |  | VCS-006-P1, VCS-006-P2 |
| VCS-006-P1 | Add/Edit/Delete Service Provider Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check ... | VCS-006 | VCS-006 |
| VCS-006-P2 | Add Service Type (Villa Service) Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add_service`); duplicate-name check via AJAX... | VCS-006 | VCS-006, VCS-006-P1 |
| VCS-007 | Villa Property Usage List (Property Usage) | Full page | villa-common-setting/villa-usage (default CakePHP DashedRoute: `/villa-common-setting/villa-usage`) |  | VCS-007-P1 |
| VCS-007-P1 | Add/Edit/Delete Property Usage Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-usage` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJ... | VCS-007 | VCS-007 |
| VCS-008 | Villa Activities List (Property Activities) | Full page | villa-common-setting/villa-activity (default CakePHP DashedRoute: `/villa-common-setting/villa-activity`) |  | VCS-008-P1 |
| VCS-008-P1 | Add/Edit/Delete Property Activity Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-activity` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via... | VCS-008 | VCS-008 |
| VCS-009 | Accessibility List (Accessible) | Full page | villa-common-setting/villa-accessible (default CakePHP DashedRoute: `/villa-common-setting/villa-accessible`) |  | VCS-009-P1 |
| VCS-009-P1 | Add/Edit/Delete Accessibility Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-accessible` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check v... | VCS-009 | VCS-009 |
| VCS-010 | Transport List (Transport) | Full page | villa-common-setting/villa-transport (default CakePHP DashedRoute: `/villa-common-setting/villa-transport`) |  | VCS-010-P1 |
| VCS-010-P1 | Add/Edit/Delete Transport Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-transport` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check vi... | VCS-010 | VCS-010 |
| VCS-011 | Reminders List (Reminders) | Full page | villa-common-setting/reminders (default CakePHP DashedRoute: `/villa-common-setting/reminders`) |  | VCS-011-P1 |
| VCS-011-P1 | Add/Edit/Delete Reminder Popup | Popup | No dedicated route — uses a shared form that POSTs to `villa-common-setting/reminders` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX... | VCS-011 | VCS-011 |

## 3. System Settings

### CS — Common Lookup Settings (16 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| CS-001 | Countries | Full page | `CommonSettingController::countries()` — default `/common-setting/countries` (no dedicated friendly route; the route `/countries/list` in `config/Routes.php`... |  | CS-001-P1 |
| CS-001-P1 | Add/Edit/Delete Country Popup | Popup | Static Bootstrap Modal (`#exampleModal`) within `countries.ctp`; submits via POST to the same action `CommonSettingController::countries()`; duplicate name c... | CS-001 | CS-001 |
| CS-002 | Languages | Full page | `CommonSettingController::languages()` — default `/common-setting/languages` |  | CS-002-P1 |
| CS-002-P1 | Add/Edit/Delete Language Popup | Popup | Bootstrap Modal (`#exampleModal`) within `languages.ctp`; submits to the same action `CommonSettingController::languages()`; duplicate name check via AJAX `c... | CS-002 | CS-002 |
| CS-003 | Regions | Full page | `CommonSettingController::regions()` — default `/common-setting/regions` |  | CS-003-P1 |
| CS-003-P1 | Add/Edit/Delete Region Popup | Popup | Bootstrap Modal (`#exampleModal`) within `regions.ctp`; submits to the same action `CommonSettingController::regions()`; duplicate name check via AJAX `check... | CS-003 | CS-003 |
| CS-004 | Areas | Full page | `CommonSettingController::areas()` — default `/common-setting/areas` |  | CS-004-P1 |
| CS-004-P1 | Add/Edit/Delete Area Popup | Popup | Bootstrap Modal (`#exampleModal`) within `areas.ctp`; submits to the same action `CommonSettingController::areas()`; duplicate name check via AJAX `checkArea... | CS-004 | CS-004 |
| CS-005 | Districts | Full page | `CommonSettingController::districts()` — default `/common-setting/districts` |  | CS-005-P1 |
| CS-005-P1 | Add/Edit/Delete District Popup | Popup | Bootstrap Modal (`#exampleModal`) within `districts.ctp`; submits to the same action `CommonSettingController::districts()`; duplicate name check via AJAX `c... | CS-005 | CS-005 |
| CS-006 | Residence | Full page | `CommonSettingController::residences()` — default `/common-setting/residences` |  | CS-006-P1, CS-008 |
| CS-006-P1 | Add/Edit/Delete Residence Popup | Popup | Bootstrap Modal (`#exampleModal`, `multipart/form-data` form) within `residences.ctp`; submits to the same action `CommonSettingController::residences()`; lo... | CS-006 | CS-006 |
| CS-007 | Location Types | Full page | `CommonSettingController::locationTypes()` — default `/common-setting/location-types` |  | CS-007-P1 |
| CS-007-P1 | Add/Edit/Delete Location Type Popup | Popup | Bootstrap Modal (`#exampleModal`) within `location_types.ctp`; submits to the same action `CommonSettingController::locationTypes()`; duplicate name check vi... | CS-007 | CS-007 |
| CS-008 | Units | Full page | `CommonSettingController::units()` — default `/common-setting/units` |  | CS-008-P1 |
| CS-008-P1 | Add/Edit/Delete Unit Popup | Popup | Bootstrap Modal (`#exampleModal`) within `units.ctp`; submits to the same action `CommonSettingController::units()`; duplicate name check via AJAX `checkUnit... | CS-008 | CS-008 |

### SET — System Settings (10 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| SET-001 | Setting Dashboard | Full page | `SettingController::dashboard()` — friendly route `/setting` (declared in `config/Routes.php` line 78); default `/setting/dashboard` |  | SET-002, SET-003, SET-004 |
| SET-002 | General Settings | Full page | `SettingController::generalSettings($tab = null)` — default `/setting/general-settings/:tab` (`:tab` is a passed parameter, e.g. `/setting/general-settings/o... |  | SET-001, SET-002-P1, SET-002-P2, SET-002-P3 |
| SET-002-P1 | Add Owner Portal URL Popup | Popup | Bootstrap Modal `#addUrlModal` within element `technical-settings/owner_portal_url.ctp`; submits via AJAX POST to `SettingController::generalSettings()` (`ta... | SET-002 | SET-002 |
| SET-002-P2 | Edit Owner Portal URL Popup | Popup | Bootstrap Modal `#editModal` within element `technical-settings/owner_portal_url.ctp`; retrieves data via AJAX GET `SettingController::getEditOwnerPortalUrl(... | SET-002 | SET-002 |
| SET-002-P3 | Delete Owner Portal URL Popup | Popup | Bootstrap Modal `#exampleModal` within element `technical-settings/owner_portal_url.ctp`; confirmation navigates to `SettingController::deleteOwnerPortalUrl(... | SET-002 | SET-002 |
| SET-003 | SMTP Settings | Full page | `SettingController::smtpSettings()` — default `/setting/smtp-settings` (no friendly route declared in `config/Routes.php`; there is one legacy commented-out ... |  | SET-001 |
| SET-004 | Hostex Set-up | Full page | `SettingController::hostexSetup()` — default `/setting/hostex-setup`; data loaded via AJAX GET `getHostexData()` (`/setting/get-hostex-data`) |  | SET-001, SET-004-P1, SET-004-P2, SET-004-P3 |
| SET-004-P1 | Add/Edit Hostex Account Form | Popup | Rendered dynamically within `SettingController::hostexSetup()` (`hostex_setup.ctp`); submits via AJAX POST to `saveHostexAccount()` — `/setting/save-hostex-a... | SET-004 | SET-004 |
| SET-004-P2 | Delete Hostex Account Popup | Popup | Bootstrap Modal `#exampleModal` within `hostex_setup.ctp`; confirmation sends AJAX POST to `deleteHostexAccount()` — `/setting/delete-hostex-account`. | SET-004 | SET-004 |
| SET-004-P3 | Cannot-Delete Hostex Account Warning Popup | Popup | Bootstrap Modal `#warnModal` within `hostex_setup.ctp`; handled entirely client-side (JavaScript), does not call any controller action. | SET-004 | SET-004, SET-004-P2 |

## 4. Booking

### BOOK — Booking (100 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| BOOK-001 | Check-in / Check-out Calendar | Full page | Booking/list (default: `/booking/list`) |  | BOOK-009, BOOK-013 |
| BOOK-002 | Booking List | Full page | Booking/bookingList (default: `/booking/booking-list`) |  | BOOK-002-P1, BOOK-010 |
| BOOK-002-P1 | Booking Quick View | Full page | Booking/viewBooking/:id (default: `/booking/view-booking/:id`, id is base64_encoded) |  | BOOK-002, BOOK-004 |
| BOOK-003 | Customer List | Full page | Booking/customerList (default: `/booking/customer-list`) |  |  |
| BOOK-026 | Minimum Length of Stay | Full page | booking/minimum (base path `/VM` appears in the application's AJAX calls) |  |  |
| BOOK-027 | Villas Missing Rates | Full page | booking/missingRates (query `?id=<business_unit_id>`) |  | BOOK-023, BOOK-027-P1, BOOK-028, BOOK-030 |
| BOOK-028 | Booking Details (Full) | Full page | Booking/viewDetails/:id (default: `/booking/view-details/:id`, id is base64_encoded) |  | BOOK-001, BOOK-002 |
| BOOK-029 | Check-in Control | Full page | Booking/checkInControl (default: `/booking/check-in-control`) |  | BOOK-029-P1 |
| BOOK-029-P1 | Check-in Control Point Details | Popup | Booking/viewCheckinDetail/:id/:booking_id | BOOK-029 | BOOK-029 |
| BOOK-030 | Check-out Control | Full page | Booking/checkOutControl (default: `/booking/check-out-control`) |  | BOOK-030-P1 |
| BOOK-030-P1 | Check-out Control Point Details | Popup | Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id | BOOK-030 | BOOK-030 |
| BOOK-031 | Villa Control Points | Full page | Booking/checkControlPoint (default: `/booking/check-control-point`) |  |  |
| BOOK-032 | Check-in | Full page | Booking/checkIn (default: `/booking/check-in`) |  | BOOK-033 |
| BOOK-033 | Check-in Progress | Full page | Booking/checkinProgress/:id/:date/:villa_id (default: `/booking/checkin-progress/:id/:date/:villa_id`) | BOOK-032 | BOOK-029, BOOK-029-P1, BOOK-032 |
| BOOK-034 | Check-in Quality Control | Full page | Booking/qualityControl/:checkin_detail_id/:date/:villa_id (default: `/booking/quality-control/...`) | BOOK-029 | BOOK-029, BOOK-029-P1 |
| BOOK-035 | Check-out — Step 1: Select Villa | Full page | Booking/checkOut (default: `/booking/check-out`) |  | BOOK-035-P2 |
| BOOK-035-P2 | Check-out — Step 2: Control Point / Damage Inspection | Popup | Booking/checkOutStep2/:check_out_id (default: `/booking/check-out-step2/:check_out_id`) | BOOK-035 | BOOK-035, BOOK-035-P3 |
| BOOK-035-P3 | Check-out — Step 3: Satisfaction Rating | Popup | Booking/checkOutStep3/:check_out_id (default: `/booking/check-out-step3/:check_out_id`) | BOOK-035-P2 | BOOK-035-P2, BOOK-035-P4 |
| BOOK-035-P4 | Check-out — Step 4: Completion Confirmation | Popup | Booking/checkOutStep4/:check_out_id (default: `/booking/check-out-step4/:check_out_id`) | BOOK-035-P3 | BOOK-030, BOOK-030-P1, BOOK-035-P3 |
| BOOK-036 | Add New Booking | Full page | Booking/addBooking/:id? (default: `/booking/add-booking`; when an id is provided, it edits a manual booking) |  | BOOK-036-P1 |
| BOOK-036-P1 | Manual Booking List | Full page | Booking/addBookingList (default: `/booking/add-booking-list`) | BOOK-036 | BOOK-036 |
| BOOK-037 | Edit Booking | Full page | Booking/edit/:id (default: `/booking/edit/:id`) |  | BOOK-002, BOOK-028 |
| BOOK-038 | Retrieve Booking | Full page | Booking/retrieveBooking (default: `/booking/retrieve-booking`) |  | BOOK-028 |
| BOOK-039 | Planning List | Full page | Booking/planningList (default: `/booking/planning-list`) |  | BOOK-040 |
| BOOK-040 | Villa Planning Calendar | Full page | Booking/planning/:date? (default: `/booking/planning`) |  | BOOK-039, BOOK-041 |
| BOOK-041 | Team (Team Work Schedule) | Full page | Booking/team (default: `/booking/team`) |  | BOOK-028, BOOK-040 |
| BOOK-042 | Direct Booking List | Full page | Booking/directBookingList (default: `/booking/direct-booking-list`) |  | BOOK-043, BOOK-044, BOOK-045, BOOK-046 |
| BOOK-043 | Add Direct Booking | Popup | Booking/addDirectBooking/:id? (default: `/booking/add-direct-booking`) | BOOK-042 | BOOK-042 |
| BOOK-044 | Edit Direct Booking | Popup | Booking/editDirectBooking/:id (default: `/booking/edit-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-045 | View Direct Booking | Popup | Booking/viewDirectBooking/:id (default: `/booking/view-direct-booking/:id`) | BOOK-042 | BOOK-042 |
| BOOK-046 | Cancelled Direct Booking List | Full page | Booking/cancelDirectBookingList (default: `/booking/cancel-direct-booking-list`) |  | BOOK-042, BOOK-045 |
| BOOK-047 | Villa Availability Calendar | Full page | Booking/availability (default: `/booking/availability`, supports `referer` or `bu`, `district`, `villa_id` query parameters) |  | BOOK-036 |
| BOOK-048 | Villa Occupancy Rate | Full page | Booking/occupancy/:string? (default: `/booking/occupancy`) |  |  |
| BOOK-049 | Due Now Payments | Full page | Booking/dueNow (default: `/booking/due-now`) | BOOK-052 | BOOK-051, BOOK-052 |
| BOOK-050 | Due Later Payments | Full page | Booking/dueLater (default: `/booking/due-later`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-051 | Paid Payments | Full page | Booking/paid (default: `/booking/paid`) | BOOK-052 | BOOK-049, BOOK-052 |
| BOOK-052 | Partner Payments | Full page | Booking/partnerPayments (default: `/booking/partner-payments`) |  | BOOK-049, BOOK-050, BOOK-051 |
| BOOK-053 | Partner Bookings | Full page | Booking/partnerBookings (default: `/booking/partner-bookings`) |  | BOOK-052 |
| BOOK-054 | OTA (Channel Overview) | Full page | Booking/ota (default: `/booking/ota`) |  | BOOK-055, BOOK-056 |
| BOOK-055 | Villa Listing by OTA Channel (OTA Listing) | Full page | Booking/otaListing (default: `/booking/ota-listing`) | BOOK-054 | BOOK-054 |
| BOOK-056 | OTA Revenue/Commission Reconciliation (OTA Share) | Full page | Booking/otaShare (default: `/booking/ota-share`) | BOOK-054 | BOOK-054 |
| BOOK-057 | Booking Confirmation Template List (Confirmation Template) | Full page | Booking/confirmationTemplate (default: `/booking/confirmation-template`) |  | BOOK-058, BOOK-059, BOOK-060, BOOK-061 |
| BOOK-058 | Add Booking Confirmation Template | Popup | Booking/addConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-059 | Edit Booking Confirmation Template | Popup | Booking/editConfirmationTemplate/:id (id is base64_encoded) | BOOK-057 | BOOK-057 |
| BOOK-060 | View Booking Confirmation Template | Popup | Booking/viewConfirmationTemplate/:id (id is base64_encoded) | BOOK-057 | BOOK-057 |
| BOOK-061 | Booking Confirmation Template Translations | Full page | Booking/transalateConfirmationTemplate | BOOK-057 | BOOK-057 |
| BOOK-062 | Booking Exclusions | Full page | Booking/exception/:tab? (default: `/booking/exception`) |  |  |
| BOOK-063 | Unlinked Bookings | Full page | Booking/unlinkedBookings (default: `/booking/unlinked-bookings`) |  |  |
| BOOK-064 | Missing Rate Setting | Popup | Booking/missingRateSetting (default: `/booking/missing-rate-setting`) | BOOK-027 | BOOK-027 |
| BOOK-065 | Latest Bookings | Full page | Booking/latestBookings (default: `/booking/latest-bookings`) |  | BOOK-028 |
| BOOK-066 | Villa Rate Management (Overview Page) | Full page | Booking/rates (default: `/booking/rates`) |  | BOOK-067, BOOK-070, BOOK-073, BOOK-074 |
| BOOK-067 | Villa Rate Update Status | Full page | Booking/ratesStatus (default: `/booking/rates-status`) |  | BOOK-066, BOOK-069, BOOK-075, BOOK-076 |
| BOOK-068 | Add Villa Rate Status | Full page | Booking/ratesStatusAdd (default: `/booking/rates-status-add`) | BOOK-067 | BOOK-067 |
| BOOK-069 | Process Villa Rate Status (Payment/Finish) | Full page | Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` or `finish`) | BOOK-067 | BOOK-067 |
| BOOK-070 | Rate Change Log | Full page | Booking/ratesLogs (default: `/booking/rates-logs`) |  | BOOK-066 |
| BOOK-071 | Add Rate Log (Standalone Page) | Full page | Booking/ratesLogAdd (default: `/booking/rates-log-add`) |  | BOOK-070 |
| BOOK-072 | Edit Rate Log (Standalone Page) | Full page | Booking/ratesLogEdit/:id |  | BOOK-070 |
| BOOK-073 | Season Management | Full page | Booking/seasons (default: `/booking/seasons`) |  | BOOK-066 |
| BOOK-074 | Seasonal Rate Log | Full page | Booking/seasonPriceLogs (default: `/booking/season-price-logs`) |  | BOOK-066 |
| BOOK-075 | Change Villa Rate Type (Monthly/Daily) | Full page | Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` or `daily`) | BOOK-067 | BOOK-067 |
| BOOK-076 | View Monthly Rate | Full page | Booking/rentalMonthView/:business_unit_id/:villa_id | BOOK-067 | BOOK-067 |
| BOOK-077 | Guest Arrival Management | Full page | Booking/guestArrival |  |  |
| BOOK-078 | VIP Guest List (VIP Guests) | Full page | Booking/vipGuests/:id |  | BOOK-079 |
| BOOK-079 | Guest Arrival Preparation Work | Full page | Booking/preparationWork/:button/:booking_id | BOOK-078 | BOOK-078 |
| BOOK-080 | Villa Recommendation Criteria | Full page | Booking/criteria |  | BOOK-081, BOOK-082, BOOK-083 |
| BOOK-081 | Add Villa Recommendation Criteria | Popup | Booking/addCriteria | BOOK-080 | BOOK-080 |
| BOOK-082 | Edit Villa Recommendation Criteria | Popup | Booking/editCriteria/:id | BOOK-080 | BOOK-080 |
| BOOK-083 | Villa Recommendations (Menu) | Full page | Booking/recommendations |  | BOOK-080, BOOK-084 |
| BOOK-084 | Recommendation Check | Full page | Booking/recommendationCheck |  | BOOK-083 |
| BOOK-085 | Booking Enquiry Form | Full page | Booking/bookingEnquiry/:id |  | BOOK-086 |
| BOOK-086 | Booking Request Success Confirmation (Request Success) | Sub-page (opened fro | Booking/requestSuccess/:array | BOOK-085 | BOOK-085 |
| BOOK-087 | Satisfaction Survey (Satisfaction) | Full page | Booking/satisfaction |  |  |
| BOOK-088 | Watch List | Full page | Booking/watchList |  |  |
| BOOK-089 | Villa Chat List (Villa Chat) | Full page | Booking/villaChats (default: `/booking/villa-chats`) |  | BOOK-038, BOOK-089-P1, BOOK-090, BOOK-091 |
| BOOK-089-P1 | Activate / Edit Guest Chat | Full page | Booking/activateChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089 |
| BOOK-090 | Link Chat to Another Booking | Full page | Booking/linkChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089, BOOK-091 |
| BOOK-091 | View Linked Chat | Full page | Booking/viewLinkedChat/:booking_id (id is base64_encode'd) | BOOK-089 | BOOK-089 |
| BOOK-092 | Welcome Message Settings | Full page | Booking/messageSettings (default: `/booking/message-settings`) |  | BOOK-089-P1 |
| BOOK-093 | Guest Chat Window (Legacy) | Full page | Booking/chat/:booking_id (id is base64_encode'd) |  | BOOK-094-P1, BOOK-095-P1 |
| BOOK-094 | WhatsApp Manager (Legacy) | Full page | Booking/whatsAppManager (default: `/booking/whats-app-manager`) |  | BOOK-094-P1, BOOK-095 |
| BOOK-094-P1 | WhatsApp Chat | Full page | Booking/whatsappChat/:booking_id (id is base64_encode'd) | BOOK-094 | BOOK-094 |
| BOOK-095 | WhatsApp Manager (New Version) | Full page | Booking/whatsAppManagerNew/:tab? (default: `/booking/whats-app-manager-new`) |  | BOOK-094, BOOK-095-P1, BOOK-096 |
| BOOK-095-P1 | WhatsApp Chat (New Version) | Full page | Booking/whatsappChatNew/:booking_id (id is base64_encode'd) | BOOK-095 | BOOK-095 |
| BOOK-096 | WhatsApp Help / System Status | Full page | Booking/whatsAppHelp (default: `/booking/whats-app-help`) |  | BOOK-095 |
| BOOK-097 | FAQ Categories (Wiki) | Full page | Booking/faqCategory (default: `/booking/faq-category`) |  | BOOK-098, BOOK-099 |
| BOOK-098 | FAQ Question List (Wiki) | Full page | Booking/faqQuestion (default: `/booking/faq-question`) |  | BOOK-097, BOOK-099, BOOK-100 |
| BOOK-099 | Add / Edit FAQ Question | Full page | Booking/faq/:id? (default: `/booking/faq` when adding, `/booking/faq/:id` when editing) | BOOK-098 | BOOK-098 |
| BOOK-100 | View FAQ Question Details | Full page | Booking/viewFaq/:id | BOOK-098 | BOOK-098 |
| BOOK-101 | Property Status | Full page | Booking/propertyStatus (default: `/booking/property-status`) |  | BOOK-101-P1 |
| BOOK-101-P1 | Villa Staff Detail | Popup | Booking/staffDetail (default: `/booking/staff-detail?booking_id=...&clean_id=...&makeup_id=...&villa_id=...`) | BOOK-101 | BOOK-101 |
| BOOK-101-P2 | Adjust Villa Status (Adjust Detail) | Popup | Booking/adjustDetail (default: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<makeup_id>_<villa_id>_<clean_status>_<makeup_status>_<guest_status>_<bo... | BOOK-101 | BOOK-101 |
| BOOK-102 | Timesheet | Full page | Booking/timesheet (default: `/booking/timesheet`) |  |  |
| BOOK-103 | Occupancy-Based Action List (Action) | Full page | Booking/action (default: `/booking/action`) |  | BOOK-104, BOOK-105 |
| BOOK-104 | Add Occupancy-Based Action (Add Action) | Full page | Booking/addAction (default: `/booking/add-action`) | BOOK-103 | BOOK-103 |
| BOOK-105 | Follow Up Action | Full page | Booking/followUpAction/:id (id base64-encoded) | BOOK-103 | BOOK-103 |
| BOOK-106 | Nationalities | Full page | Booking/nationalities (default: `/booking/nationalities`) |  |  |
| BOOK-107 | Standard Check-in/Check-out Time (Standard Time) | Full page | Booking/standardTime (default: `/booking/standard-time`) |  | BOOK-106, BOOK-108 |
| BOOK-108 | Online Check-in Deadline Settings | Full page | Booking/onlineCheckinDeadlineSettings |  | BOOK-002, BOOK-106, BOOK-107 |
| BOOK-109 | Revenue Report | Full page | Booking/revenueReport (default: `/booking/revenue-report`) |  |  |
| BOOK-110 | SHA Plus Detail (SHA Plus Edit) | Full page | Booking/shaPlusEdit/:booking_id |  |  |

## 5. Owner Management (Admin)

### OWN — Owner Management (Admin) (22 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OWN-001 | Owner List | Full page | `/Owner/list` (controller `Owner`, action `list()`) |  | OWN-001-P1, OWN-002, OWN-003, OWN-014 |
| OWN-001-P1 | View Owner Details | Popup | `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`) | OWN-001 | OWN-001 |
| OWN-002 | Add New Owner | Full page | `/Owner/add` (controller `Owner`, action `add($tab = null)`) |  | OWN-001, OWN-003 |
| OWN-003 | Edit Owner | Full page | `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `edit($tab, $id, $show_page, $payment_detail_id)`) |  | OWN-001, OWN-002 |
| OWN-004 | Villa Status by Owner | Full page | `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`) |  | OWN-004-P1, OWN-004-P2 |
| OWN-004-P1 | View Garden Service Details | Popup | `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`) | OWN-004 | OWN-004 |
| OWN-004-P2 | View Expense Claim Details | Popup | `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`) | OWN-004 | OWN-004 |
| OWN-005 | Owner Booking Calendar | Full page | `/Owner/calendar` (controller `Owner`, action `calendar()`) |  |  |
| OWN-006 | Owner Villa Performance | Full page | `/Owner/performance` (controller `Owner`, action `performance()`) |  |  |
| OWN-007 | Generate Owner Report | Full page | `/Owner/generateReports` (controller `Owner`, action `generateReports()`) |  |  |
| OWN-008 | Owner Payment Detail List | Full page | `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`) |  | OWN-003, OWN-008-P1, OWN-008-P2 |
| OWN-008-P1 | Add Owner Payment Details | Popup | `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($owner_id)`) | OWN-008 | OWN-008 |
| OWN-008-P2 | Edit Owner Payment Details | Popup | `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`) | OWN-008 | OWN-008 |
| OWN-009 | Agency List | Full page | `/Owner/agencyList` (controller `Owner`, action `agencyList()`) |  | OWN-010, OWN-011, OWN-012 |
| OWN-010 | Add New Agency | Full page | `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $show_page = null, $payment_detail_id = null)`, when `agency_id` is not s... |  | OWN-009, OWN-011 |
| OWN-011 | Edit Agency | Full page | `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `editAgency($tab, $id, $show_page, $payment_detail_id)`) |  | OWN-009 |
| OWN-012 | View Agency Details | Popup | `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`) | OWN-009 | OWN-009 |
| OWN-013 | Agency Staff List | Full page | `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`) |  | OWN-014, OWN-015 |
| OWN-014 | Add New Agency Staff | Full page | `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`) |  | OWN-013 |
| OWN-015 | Edit Agency Staff | Full page | `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`) |  | OWN-013 |
| OWN-016 | Owner Login Log | Full page | `/Owner/loginLog` (controller `Owner`, action `loginLog()`) |  | OWN-001 |
| OWN-017 | Owner Notification Email Templates | Full page | `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAccessTemplate($tab, $selected_lang)`) |  |  |

## 6. Owner Portal

### OWP — Owner Portal (31 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OWP-001 | Login | Full page | `ExternalUserController::index()` — friendly route: `/Owner`, `/Owners` (config/Routes.php lines 104-105) |  | OWP-001-P1, OWP-003, OWP-005 |
| OWP-001-P1 | Forgot Password Popup | Popup | `ExternalUserController::forgotPassword()` — no dedicated friendly route, no dedicated view (autoRender = false); the popup UI is embedded directly in `index... | OWP-001 | OWP-001, OWP-003 |
| OWP-002 | Dashboard | Full page | `ExternalUserController::dashboard()` — no dedicated friendly route (accessed via `/external-user/dashboard`, CakePHP default) |  |  |
| OWP-003 | Reset Password | Full page | `ExternalUserController::resetPassword($token)` — no dedicated friendly route; accessed via the link in the email `/external-user/reset-password/{token}` (Ca... |  | OWP-001, OWP-001-P1 |
| OWP-004 | Personal Profile | Full page | `ExternalUserController::profile()` — no dedicated friendly route (default `/external-user/profile`) |  | OWP-004-P1 |
| OWP-004-P1 | Change Password Popup | Popup | `ExternalUserController::changePassword()` — no dedicated friendly route, no dedicated view (the form lives in the `#change-password` tab of `profile.ctp`), ... | OWP-004 | OWP-004 |
| OWP-005 | Property List | Full page | `ExternalUserController::list()` — friendly route: `/external-user/property/list` (config/Routes.php line 107) |  | OWP-001, OWP-006 |
| OWP-006 | Property Detail (Property ID Card) | Full page | `ExternalUserController::viewDetails($villa_id)` — no dedicated friendly route, accessed from OWP-005 (default `/external-user/view-details/{villa_id}`) |  | OWP-005 |
| OWP-007 | Property Activity Status | Full page | `ExternalUserController::status($tab, $villa_id)` — no dedicated friendly route, opened from OWP-005 ("View Activity" icon), of the form `.../status/rental/{... |  | OWP-005 |
| OWP-007-P1 | Cleaning Task Detail Popup | Popup | `ExternalUserController::planningTeamsDetail($id, $location)` — route of the form `.../planning-teams-detail/{villas_clean_id}/owner`, opened from OWP-007 (t... | OWP-007 | OWP-007 |
| OWP-007-P2 | Gardening Task Detail Popup | Popup | `ExternalUserController::gardenView($id)` — no dedicated friendly route, opened from OWP-007 (the "Garden" tab) in a new tab (default `/external-user/garden-... | OWP-007 | OWP-007 |
| OWP-008 | Property Booking Calendar | Full page | `ExternalUserController::calendar($villa_id)` — no dedicated friendly route, opened from OWP-005 (calendar icon), of the form `.../calendar/{villa_id_base64}` |  | OWP-005, OWP-010-P1 |
| OWP-009 | Maintenance Log | Full page | `ExternalUserController::maintenanceLog($id)` — friendly route: `/external-user/property/log/:id` (config/Routes.php line 108) |  | OWP-005, OWP-006 |
| OWP-010 | Booking List | Full page | `ExternalUserController::bookingList()` — no dedicated friendly route (default `/external-user/booking-list`) |  | OWP-010-P1 |
| OWP-010-P1 | Booking Detail Popup | Popup | `ExternalUserController::bookingDetails($id)` — no dedicated friendly route (default `/external-user/booking-details/{id_base64}`) | OWP-010 | OWP-008, OWP-010 |
| OWP-011 | Add Booking | Full page | `ExternalUserController::addBooking()` — no dedicated friendly route; no navigation link in the system currently points to this screen |  |  |
| OWP-012 | Check-in List | Full page | `ExternalUserController::checkIn()` — no dedicated friendly route (default `/external-user/check-in`) |  |  |
| OWP-013 | Check-out List | Full page | `ExternalUserController::checkOut()` — no dedicated friendly route (default `/external-user/check-out`) |  |  |
| OWP-014 | Generate Financial Report (Owner Statement) | Full page | `ExternalUserController::generateReports()` — no dedicated friendly route (default `/external-user/generate-reports`) |  |  |
| OWP-015 | Property Business Performance | Full page | `ExternalUserController::performance()` — no dedicated friendly route (default `/external-user/performance`) |  |  |
| OWP-016 | Monthly Owner Payment Report | Full page | `ExternalUserController::paymentReport($villa_id)` — no dedicated friendly route, opened from OWP-005 ($ icon), of the form `.../payment-report/{villa_id_bas... |  | OWP-005 |
| OWP-017 | Direct Booking Request List | Full page | `ExternalUserController::directBookingList()` — no dedicated friendly route (default `/external-user/direct-booking-list`) |  | OWP-017-P1, OWP-017-P2, OWP-017-P3 |
| OWP-017-P1 | Add Direct Booking Request Popup | Popup | `ExternalUserController::addDirectBooking($id = null)` — no dedicated friendly route, opened from the "Request New Booking" button on OWP-017 (default `/exte... | OWP-017 | OWP-017 |
| OWP-017-P2 | Edit Direct Booking Request Popup | Popup | `ExternalUserController::editDirectBooking($id)` — no dedicated friendly route, opened from the edit icon on OWP-017 (default `/external-user/edit-direct-boo... | OWP-017 | OWP-017 |
| OWP-017-P3 | View Direct Booking Request Detail Popup | Popup | `ExternalUserController::viewDirectBooking($id)` — no dedicated friendly route, opened from the eye icon on OWP-017 (default `/external-user/view-direct-book... | OWP-017 | OWP-017 |
| OWP-018 | Payment Details List | Full page | `ExternalUserController::paymentDetails()` — no dedicated friendly route (default `/external-user/payment-details`) |  | OWP-018-P1, OWP-018-P2 |
| OWP-018-P1 | Add Payment Detail Popup | Popup | `ExternalUserController::addPaymentDetail()` — no dedicated friendly route, opened from the "+" button on OWP-018 (default `/external-user/add-payment-detail`) | OWP-018 | OWP-018 |
| OWP-018-P2 | Edit Payment Detail Popup | Popup | `ExternalUserController::editPaymentDetail($id)` — no dedicated friendly route, opened from the edit icon on OWP-018 (default `/external-user/edit-payment-de... | OWP-018 | OWP-018 |
| OWP-019 | Cancel Direct Booking List | Full page | `ExternalUserController::cancelDirectBookingList()` — no dedicated friendly route (default `/external-user/cancel-direct-booking-list`) |  | OWP-017 |
| OWP-020 | Report History | Full page | `ExternalUserController::ReportHistory($villa_id)` — no dedicated friendly route (default `/external-user/report-history/{villa_id_base64}`) |  | OWP-005 |
| OWP-021 | Monthly Newsletter | Full page | `ExternalUserController::MonthlyNewsletter()` — no dedicated friendly route (default `/external-user/monthly-newsletter`) |  |  |

## 7. Guest Portal

### GST — Guest Portal (11 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| GST-001 | Guest Portal Login | Full page | `Guest::index()` — default `/guest/index`; pretty route: `/Welcome`, `/Welcome/:id` (both point to the same action; the `id` parameter is not used by the con... |  | GST-002, GST-003 |
| GST-002 | Guest Booking List | Full page | `Guest::bookings()` — default `/guest/bookings`; pretty route (DashedRoute fallback): `/guest/bookings` |  | GST-001, GST-003, GST-004 |
| GST-003 | My Booking Details | Full page | `Guest::yourBooking($booking_id = null)` — default `/guest/your-booking/:booking_id`; pretty route: `/guest/your-booking` (explicitly declared in `Routes.php... |  | GST-001, GST-002, GST-004 |
| GST-004 | Amenities Access Portal | Full page | `Guest::accessPortal($booking_id = null)` — default `/guest/access-portal/:booking_id`; pretty route (DashedRoute fallback): `/guest/access-portal` |  | GST-001, GST-002, GST-008, GST-010, GST-011 |
| GST-005 | Villa Information | Full page | `Guest::property()` — default `/guest/property`; pretty route (DashedRoute fallback): `/guest/property` |  |  |
| GST-006 | Your Holidays | Full page | `Guest::yourHolidays()` — default `/guest/your-holidays`; pretty route (DashedRoute fallback): `/guest/your-holidays` |  |  |
| GST-007 | Rules | Full page | `Guest::rules()` — default `/guest/rules`; pretty route (DashedRoute fallback): `/guest/rules` |  |  |
| GST-008 | Restaurant List Near the Villa | Full page | `Guest::restaurants($villa_id = null)` — default `/guest/restaurants/:villa_id`; pretty route (DashedRoute fallback): `/guest/restaurants` |  | GST-001, GST-009 |
| GST-009 | Restaurant Details | Full page | `Guest::restaurant($restaurant_id = null)` — default `/guest/restaurant/:restaurant_id`; pretty route (DashedRoute fallback): `/guest/restaurant` |  | GST-002, GST-004, GST-008 |
| GST-010 | Featured Landmarks Near the Villa | Full page | `Guest::landmark($booking_id = null)` — default `/guest/landmark/:booking_id`; pretty route (DashedRoute fallback): `/guest/landmark` |  | GST-001, GST-002 |
| GST-011 | Activities Near the Villa | Full page | `Guest::activities($booking_id = null)` — default `/guest/activities/:booking_id`; pretty route (DashedRoute fallback): `/guest/activities` |  | GST-002 |

## 8. Field Operations

### OPR — Garden/Pool Operations (22 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OPR-001 | Update Garden Job Completion | Full page | operator/gardenJobStatus (query `?id=`) + dashed-style pretty route: operator/garden-job-status |  | OPR-002 |
| OPR-002 | Garden Job List | Full page | operator/gardenJobList/:tab? + dashed-style pretty route: operator/garden-job-list |  | OPR-001, OPR-016 |
| OPR-003 | Pool Job List | Full page | operator/pools/:tab? + dashed-style pretty route: operator/pools |  | OPR-004 |
| OPR-004 | View Pool Job Details | Full page | operator/poolView/:id + dashed-style pretty route: operator/pool-view/:id |  | OPR-003 |
| OPR-005 | Update Pool Job Completion | Full page | operator/poolJob/:id + dashed-style pretty route: operator/pool-job/:id |  | OPR-003 |
| OPR-006 | Report Pool Incident | Full page | operator/poolReport/:id + dashed-style pretty route: operator/pool-report/:id |  | OPR-005 |
| OPR-007 | Cleaning List | Full page | operator/cleaning + dashed-style pretty route: operator/cleaning |  | OPR-008 |
| OPR-008 | Perform Cleaning by Inspection Point | Full page | operator/cleaningDetails?id=&last_id= + dashed-style pretty route: operator/cleaning-details |  | OPR-007 |
| OPR-009 | Cleaning Operator Dashboard | Full page | operator/cleaningOperator + dashed-style pretty route: operator/cleaning-operator |  |  |
| OPR-010 | Villa Inspection List | Full page | operator/inspection + dashed-style pretty route: operator/inspection |  | OPR-011, OPR-012, OPR-013 |
| OPR-011 | Perform Villa Inspection by Point | Full page | operator/inspectionDetails?id=&last_id= + dashed-style pretty route: operator/inspection-details |  | OPR-010 |
| OPR-012 | View Completed Inspection Results | Full page | operator/inspectionView?id= + dashed-style pretty route: operator/inspection-view |  | OPR-010 |
| OPR-013 | Manage In-Progress Inspection | Full page | operator/inspectionTaskView?id= + dashed-style pretty route: operator/inspection-task-view |  | OPR-010, OPR-011 |
| OPR-014 | Make Up List | Full page | operator/makeUp + dashed-style pretty route: operator/make-up |  | OPR-015 |
| OPR-015 | Perform Make Up by Point | Full page | operator/makeupDetails?id=&last_id= + dashed-style pretty route: operator/makeup-details |  | OPR-014 |
| OPR-016 | View Garden Job Details | Full page | operator/gardenView/:id + dashed-style pretty route: operator/garden-view/:id |  | OPR-002 |
| OPR-017 | Garden Job Planning (Garden Planning) | Full page | villa-services/gardenPlanning/:tab? + dashed-style pretty route: villa-services/garden-planning |  | OPR-002 |
| OPR-018 | Garden Team Configuration (Garden Teams) | Full page | villa-services/gardenTeams + dashed-style pretty route: villa-services/garden-teams |  | OPR-017 |
| OPR-019 | Personal Assignment Schedule (Roster) | Full page | operator/roster + dashed-style pretty route: operator/roster |  |  |
| OPR-020 | Maintenance Ticket List | Full page | operator/maintenance + dashed-style pretty route: operator/maintenance |  | OPR-021, OPR-022 |
| OPR-021 | Create New Maintenance Ticket | Full page | operator/addMaintenanceTicket + dashed-style pretty route: operator/add-maintenance-ticket |  | OPR-020 |
| OPR-022 | Edit/Manage Maintenance Ticket | Full page | operator/editMaintenanceTicket/:id + dashed-style pretty route: operator/edit-maintenance-ticket/:id (id passed as base64/btoa) |  | OPR-020 |

### MNT — Maintenance (29 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| MNT-001 | Maintenance Log List | Full page | maintenance/list |  | MNT-002, MNT-003, MNT-004, MNT-005 |
| MNT-002 | Add New Maintenance Log | Full page | maintenance/add |  | MNT-001 |
| MNT-003 | Accept/Reject Maintenance Task | Full page | maintenance/accept/:id (id base64) |  | MNT-001 |
| MNT-004 | Update Maintenance Log Processing | Full page | maintenance/edit/:id (id base64) |  | MNT-001 |
| MNT-005 | View Maintenance Log Details | Full page | maintenance/view/:id |  | MNT-001, MNT-004, MNT-006 |
| MNT-006 | Maintenance Cost | Full page | maintenance/cost/:id (id base64) |  | MNT-001, MNT-005 |
| MNT-007 | Maintenance Categories | Full page | maintenance/categories |  |  |
| MNT-008 | Maintenance Priorities | Full page | maintenance/priorities |  |  |
| MNT-009 | Garden Services | Full page | maintenance/gardenServices |  | MNT-009-P1, MNT-009-P2 |
| MNT-009-P1 | Add Garden Service | Popup | maintenance/addGardenService | MNT-009 | MNT-009 |
| MNT-009-P2 | Edit Garden Service | Popup | maintenance/editGardenService/:id | MNT-009 | MNT-009 |
| MNT-010 | Pool Services | Full page | maintenance/poolServices |  | MNT-010-P1, MNT-010-P2 |
| MNT-010-P1 | Add Pool Service | Popup | maintenance/addPoolServices | MNT-010 | MNT-010 |
| MNT-010-P2 | Edit Pool Service | Popup | maintenance/editPoolService/:id | MNT-010 | MNT-010 |
| MNT-011 | Pool Repair | Full page | maintenance/poolRepair |  | MNT-011-P1, MNT-011-P2 |
| MNT-011-P1 | Add Pool Repair Service | Popup | maintenance/addPoolRepair | MNT-011 | MNT-011 |
| MNT-011-P2 | Edit Pool Repair Service | Popup | maintenance/editPoolRepair/:id | MNT-011 | MNT-011 |
| MNT-012 | Maintenance Service Matrix (Category / Subcategory / Issue) | Full page | maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` for pagination/search) |  |  |
| MNT-013 | Renovation Services | Full page | maintenance/renovationServices |  | MNT-013-P1, MNT-013-P2 |
| MNT-013-P1 | Add Renovation Service | Popup | maintenance/addRenovationService | MNT-013 | MNT-013 |
| MNT-013-P2 | Edit Renovation Service | Popup | maintenance/editRenovationServices/:id | MNT-013 | MNT-013 |
| MNT-014 | Cleaning Services | Full page | maintenance/cleaningServices (ajax GET on the same route returns JSON search results; `maintenance/getCleaningServiceData/:id` loads edit data; `maintenance/... |  | MNT-014-P1 |
| MNT-014-P1 | Add Cleaning Service | Full page | maintenance/addCleaningService | MNT-014 | MNT-014 |
| MNT-015 | Back Office Services | Full page | maintenance/backOfficeServices |  | MNT-015-P1, MNT-015-P2 |
| MNT-015-P1 | Add Back Office Service | Popup | maintenance/addBackOfficeService | MNT-015 | MNT-015 |
| MNT-015-P2 | Edit Back Office Service | Popup | maintenance/editBackOfficeServices/:id | MNT-015 | MNT-015 |
| MNT-016 | Inspection Time Rules | Full page | maintenance/inspection |  | MNT-016-P1, MNT-016-P2 |
| MNT-016-P1 | Edit Inspection Time Rule | Popup | maintenance/editInspection/:id (id base64) | MNT-016 | MNT-016 |
| MNT-016-P2 | View Inspection Time Rule | Popup | maintenance/viewInspection/:id (id base64) | MNT-016 | MNT-016, MNT-016-P1 |

### REN — Renovation (12 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| REN-001 | Create New Renovation Project | Full page | renovation/new-project |  | REN-002, REN-003 |
| REN-002 | Renovation Follow-up | Full page | renovation/followUp + dashed-style pretty route: renovation/follow-up |  | REN-001, REN-003, REN-004 |
| REN-003 | Renovation Project Follow-up | Full page | renovation/projectFollowUp/:id + dashed-style pretty route: renovation/project-follow-up/:id (id passed as base64) |  | REN-001, REN-002, REN-005, REN-007, REN-008, REN-009, REN-010, REN-011 |
| REN-004 | Edit Renovation Project | Full page | renovation/edit/:renovation_id + dashed-style pretty route: renovation/edit/:renovation_id (id passed as base64) |  | REN-002 |
| REN-005 | Renovation Project Payment Ledger | Full page | renovation/paymentList/:renovation_id + dashed-style pretty route: renovation/payment-list/:renovation_id (id passed as base64) |  | REN-003, REN-006 |
| REN-006 | Add Payment | Full page | renovation/addPayment/:renovation_id + dashed-style pretty route: renovation/add-payment/:renovation_id (id passed as base64) |  | REN-005 |
| REN-007 | Add Invoice/Payment Receipt | Full page | renovation/addNewReceipt/:renovation_id + dashed-style pretty route: renovation/add-new-receipt/:renovation_id (id passed as base64) |  | REN-003 |
| REN-008 | Edit Invoice/Payment Receipt | Full page | renovation/editRenovationReceipt/:id + dashed-style pretty route: renovation/edit-renovation-receipt/:id (id passed as base64) |  | REN-003 |
| REN-009 | Add Project Photo | Full page | renovation/addPhoto/:renovation_id + dashed-style route: renovation/add-photo/:renovation_id (id passed as base64) |  | REN-003 |
| REN-010 | Edit Project Photo | Full page | renovation/editPhoto/:id + dashed-style route: renovation/edit-photo/:id (id passed as base64) |  | REN-003 |
| REN-011 | Project Progress & Cost Report | Full page | renovation/report/:id + dashed-style route: renovation/report/:id (id passed as base64) |  | REN-003 |
| REN-012 | Scaffold Popup (unused, entry point not identified) | Popup | renovation/startPopup + dashed-style route: renovation/start-popup |  |  |

### TRN — Training (16 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| TRN-001 | Training Homepage | Full page | `TrainingController::index()` — `/training/index` (default, DashedRoute) |  | TRN-002, TRN-007, TRN-008, TRN-010, TRN-011 |
| TRN-002 | Tutorial List (Admin) | Full page | `TrainingController::createTutorial()` — `/training/create-tutorial` |  | TRN-002-P1, TRN-003, TRN-004, TRN-005 |
| TRN-002-P1 | Confirm Delete Tutorial Popup | Popup | Bootstrap modal within `create_tutorial.ctp`; the delete action calls `TrainingController::deleteTutorial($id)` — `/training/delete-tutorial/{id_base64}` | TRN-002 | TRN-002 |
| TRN-003 | Add New Tutorial and Slide | Full page | `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/add-tutorial/{tutorial_id}/{slide_id}` |  | TRN-002, TRN-005 |
| TRN-004 | View Tutorial Details | Full page | `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}` |  | TRN-002, TRN-005 |
| TRN-005 | Edit Tutorial | Full page | `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}` |  | TRN-002, TRN-003, TRN-004, TRN-005-P1, TRN-006 |
| TRN-005-P1 | Confirm Delete Slide Popup | Popup | Bootstrap modal within `edit_tutorial.ctp`; the delete action calls `TrainingController::deleteSlide($id)` — `/training/delete-slide/{id_base64}` | TRN-005 | TRN-005 |
| TRN-006 | Edit Tutorial Slide | Full page | `TrainingController::editSlide($id)` — `/training/edit-slide/{id}` |  | TRN-005 |
| TRN-007 | Tutorial Library | Full page | `TrainingController::library()` — `/training/library` |  | TRN-009 |
| TRN-008 | My Training Record | Full page | `TrainingController::myRecord()` — `/training/my-record` |  | TRN-009 |
| TRN-009 | Read Tutorial | Full page | `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-tutorial/{tutorial_id}/{reading_id}` |  | TRN-007, TRN-008 |
| TRN-010 | Team Training Record | Full page | `TrainingController::myTeamRecord()` — `/training/my-team-record` |  |  |
| TRN-011 | Training Settings | Full page | `TrainingController::setting()` — `/training/setting` |  |  |
| TRN-012 | Villa Management Introduction Page (demo) | Full page | `TrainingController::page()` — `/training/page` |  |  |
| TRN-013 | Quiz Question Demo | Full page | `TrainingController::quizQuestion()` — `/training/quiz-question` |  |  |
| TRN-014 | "Missing Room IDs" Slide Demo | Full page | `TrainingController::slide2()` — `/training/slide2` |  |  |

## 9. Finance

### FUND — Investment Fund (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| FUND-001 | Investor List | Full page | `FundController::investors()` — `/fund/investors` (GET, filtered via query string `id`, `show_investor`; POST used to assign a project or download an Excel r... |  | FUND-001-P1, FUND-002, FUND-007 |
| FUND-001-P1 | Assign Project to Investor | Popup | Submits via POST to `FundController::investors()` (`/fund/investors`, hidden field `action = project`). Project list data is loaded via AJAX `fund/check-proj... | FUND-001 | FUND-001 |
| FUND-002 | Investor Transaction Statement | Full page | `FundController::statements($in_id = null)` — `/fund/statements` or `/fund/statements/:in_id` (parameter passed when navigating from FUND-001; also filterabl... |  | FUND-001, FUND-002-P1 |
| FUND-002-P1 | Investment Fund Transaction (Invest / Withdraw / Payout / Capitalize) | Popup | Submits via POST to `FundController::statements()` (`/fund/statements`, field `action` = `invest` \| `withdraw` \| `payout` \| `capitalize`). A single modal is ... | FUND-002 | FUND-002 |
| FUND-003 | Fund Project List | Full page | `FundController::projects()` — `/fund/projects` |  | FUND-004, FUND-005, FUND-006 |
| FUND-004 | Add Fund Project | Full page | `FundController::addProject()` — `/fund/add-project` (POST) |  | FUND-003 |
| FUND-005 | Update Fund Project | Full page | `FundController::updateProject($id)` — `/fund/update-project/:id` (POST) |  | FUND-003, FUND-006 |
| FUND-006 | Fund Project Detail | Full page | `FundController::viewProject($id)` — `/fund/view-project/:id` |  | FUND-003, FUND-005 |
| FUND-007 | Investor Interest Rate Configuration | Full page | `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET to display, POST to save the entire table) |  | FUND-001 |

### INV — Inventory (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| INV-001 | Inventory List | Full page | `InventoryController::list()` — `/inventory/list` |  | INV-001-P1, INV-002 |
| INV-001-P1 | Adjust / Delete Stock | Popup | Submits via POST to `InventoryController::list()` (`/inventory/list`, field `action` = `add-more` \| `sub-more` \| `delete`). A single modal is shared across a... | INV-001 | INV-001 |
| INV-002 | Add Item to Inventory | Full page | `InventoryController::add()` — `/inventory/add` (POST) |  | INV-001 |
| INV-003 | Update Inventory | Full page | `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` is base64-encoded in the URL; POST to save) |  | INV-001 |
| INV-004 | Item Receipt Requests | Full page | `InventoryController::itemRequest()` — `/inventory/item-request` |  | INV-004-P1 |
| INV-004-P1 | Approve Item Receipt Request | Popup | Submits via POST to `InventoryController::itemRequest()` (`/inventory/item-request`) | INV-004 | INV-004 |
| INV-005 | Item Discard Requests | Full page | `InventoryController::discard()` — `/inventory/discard` |  | INV-005-P1 |
| INV-005-P1 | Approve Item Discard Request | Popup | Submits via POST to `InventoryController::discard()` (`/inventory/discard`) | INV-005 | INV-005 |
| INV-006 | Inventory Log | Full page | `InventoryController::logs()` — `/inventory/logs` |  |  |

## 10. Villa Services

### VSV — Villa Services (38 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VSV-001 | Electricity: Overview Page (Hub) | Full page | `VillaServicesController::list()` — defaults to `/villa-services/list` |  | VSV-002, VSV-011, VSV-012 |
| VSV-002 | Villa Electricity Set-up (Electricity Set-up) | Full page | `VillaServicesController::propertySetup($tab = null)` — defaults to `/villa-services/property-setup/<tab>`; the tab is also read from the query string (`?tab... |  | VSV-001 |
| VSV-003 | Electricity Check-in (List) | Full page | `VillaServicesController::checkIn()` — defaults to `/villa-services/check-in` |  | VSV-003-P1, VSV-004-P1 |
| VSV-003-P1 | Enter Start Meter Reading (Start Meter) | Popup | View at `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<booking_id>`; saved via `VillaServicesController::saveMeter()` — `... | VSV-003 | VSV-003 |
| VSV-004 | Electricity Check-out (List) | Full page | `VillaServicesController::checkOut()` — defaults to `/villa-services/check-out` |  | VSV-004-P1 |
| VSV-004-P1 | Enter End Meter Reading (End Meter) | Popup | `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_id>` (GET displays the form, POST to the same action to save) | VSV-004 | VSV-004 |
| VSV-005 | Long Stay Electricity Meter (Long Stay) | Full page | `VillaServicesController::partial()` — defaults to `/villa-services/partial`; filters are read via query string (`?villa=&guest_name=&check_in_date=&check_ou... |  | VSV-005-P1 |
| VSV-005-P1 | Enter Long Stay Electricity Meter (Long Stay Meter) | Popup | `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-stay-meter/<booking_id>`; saved via `saveLongStayDiscount()` (POST, no d... | VSV-005 | VSV-005 |
| VSV-006 | Electricity Reconciliation (Reconcile) | Full page | `VillaServicesController::reconcile()` — defaults to `/villa-services/reconcile` |  | VSV-004-P1, VSV-005-P1 |
| VSV-007 | Monthly Electricity Bill (Monthly Bill) | Full page | `VillaServicesController::monthlyBill()` — defaults to `/villa-services/monthly-bill` (POST to the same action for search/update) |  |  |
| VSV-008 | Electricity Income/Expense Balance (Monthly Balance) | Full page | `VillaServicesController::monthlyBalance()` — defaults to `/villa-services/monthly-balance` (POST to the same action for search) |  |  |
| VSV-009 | Item | Full page | `VillaServicesController::item()` — defaults to `/villa-services/item` |  |  |
| VSV-010 | Transfer | Full page | `VillaServicesController::transfer()` — defaults to `/villa-services/transfer` |  |  |
| VSV-011 | Electricity Check-in Control (Electricity Check-in Control) | Full page | `VillaServicesController::electricityCheckInControl()` — defaults to `/villa-services/electricity-check-in-control`; all filters are read/written via the que... |  | VSV-001, VSV-011-P1 |
| VSV-011-P1 | View Electricity Check-in Control Detail | Popup | `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-control/<booking_id>` | VSV-011 | VSV-011 |
| VSV-012 | Electricity Check-out Control (Electricity Check-out Control) | Full page | `VillaServicesController::electricityCheckOutControl()` — defaults to `/villa-services/electricity-check-out-control`; filters are read/written via the query... |  | VSV-001, VSV-012-P1 |
| VSV-012-P1 | View Electricity Check-out Control Detail | Popup | `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-control/<booking_id>` | VSV-012 | VSV-012 |
| VSV-013 | Food Service (Food) | Full page | `VillaServicesController::food()` — defaults to `/villa-services/food` |  |  |
| VSV-014 | Cleaning | Full page | `VillaServicesController::cleaning()` — defaults to `/villa-services/cleaning` |  | VSV-016 |
| VSV-015 | Guest Electricity Bill Lookup (Check Stay) | Full page | `VillaServicesController::checkStay()` — defaults to `/villa-services/check-stay`; supplementary suggestion data via AJAX `getCheckStay` (no dedicated view) |  |  |
| VSV-016 | Cleaning Teams | Full page | `VillaServicesController::cleaningTeams()` — defaults to `/villa-services/cleaning-teams`; team list loaded via AJAX `cleaningTeamsAjax`, saved via `saveClea... |  |  |
| VSV-017 | Garden — Overview Page | Full page | `VillaServicesController::garden($tab, $sub_tab)` — defaults to `/villa-services/garden/<tab>/<sub_tab>` (tab: `reports` \| `team` \| `planning`) |  | VSV-017-P1 |
| VSV-017-P1 | View Garden Job Details (Garden Job View) | Popup | `VillaServicesController::gardenView($id)` — `/villa-services/garden-view/<garden_job_id>` | VSV-017 | VSV-017 |
| VSV-018 | Garden Teams | Full page | `VillaServicesController::gardenTeams()` — defaults to `/villa-services/garden-teams`; saved via AJAX `saveGardenTeams` |  | VSV-017 |
| VSV-019 | Garden Planning | Full page | `VillaServicesController::gardenPlanning($tab)` — defaults to `/villa-services/garden-planning/<tab>` (tab: `team-<n>` or `team-total`); data saved via AJAX ... |  | VSV-017 |
| VSV-020 | Operations Job List (Garden Job List) | Full page | `VillaServicesController::gardenJobList()` — defaults to `/villa-services/garden-job-list` |  | VSV-020-P1 |
| VSV-020-P1 | Job Status (Garden Job Status) | Popup | `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status` | VSV-020 | VSV-020 |
| VSV-021 | Villa Inspection List | Full page | `VillaServicesController::inspection()` — defaults to `/villa-services/inspection`; table data loaded via AJAX `inspectionAjax`/`inspectionDetailAjax` |  | VSV-021-P1, VSV-022, VSV-022-P1 |
| VSV-021-P1 | View Inspection Report Details (Inspection View) | Popup | `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspection_key>&keys=<list of keys, optional>` | VSV-021 | VSV-021 |
| VSV-022 | Inspection Report Processing Setup (Inspection Edit) | Popup | `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspection_key>` | VSV-021 | VSV-021, VSV-022-P1 |
| VSV-022-P1 | Process Inspection Items in Detail (Inspection Edit Details) | Popup | `VillaServicesController::inspectionEditDetails()` — `/villa-services/inspectionEditDetails?id=<inspection_key>[&view=default\|teamlead]` | VSV-021 | VSV-021, VSV-022 |
| VSV-023 | Pool | Full page | `VillaServicesController::pool()` — defaults to `/villa-services/pool`; quotation upload/approval via pretty routes `/villa-services/pool/upload-quotation`, ... |  |  |
| VSV-024 | Make-up | Full page | `VillaServicesController::makeUp()` — defaults to `/villa-services/make-up` |  | VSV-025 |
| VSV-025 | Daily Makeup Schedule (Makeup Teams) | Full page | `VillaServicesController::makeupTeams()` — defaults to `/villa-services/makeup-teams`; list loaded via AJAX `makeupAjax`, status updated via AJAX `updateMake... |  | VSV-025-P1 |
| VSV-025-P1 | Makeup Progress Details (Makeup Detail View) | Popup | `VillaServicesController::makeupTeamsDetail($id, $location)` — `/villa-services/makeup-teams-detail/<villa_clean_id>/makeup` | VSV-025 | VSV-025 |
| VSV-026 | Daily Cleaning Assignment Schedule (Planning Teams) | Full page | `VillaServicesController::planningTeams()` — defaults to `/villa-services/planning-teams`; villa/status list loaded via AJAX `planningTeamsAjax`, "Clean Toda... |  | VSV-016, VSV-026-P1 |
| VSV-026-P1 | Villa Cleaning Progress Details (Planning Detail View) | Popup | `VillaServicesController::planningTeamsDetail($id, $location)` — `/villa-services/planning-teams-detail/<villa_clean_id>/<location>` | VSV-026 | VSV-026 |
| VSV-027 | Electricity Check-in/Check-out Control (Legacy — Control) | Full page | `VillaServicesController::control()` — defaults to `/villa-services/control`; date-navigation data loaded via AJAX `getElecricutyControlAjax` |  | VSV-011, VSV-012 |

## 11. Website Content (CMS)

### CMS — Website Content (34 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| CMS-001 | CMS Property List | Full page | `CmsController::list($id)` — default `/cms/list/:id` |  | CMS-002 |
| CMS-002 | Main CMS Page per Villa (Villa Website Content) | Full page | `CmsController::cms($tab, $villa_id, $lang1)` — default `/cms/cms/:tab/:villa_id/:lang1` (default tab is `welcome` when empty, or `main`) |  | CMS-001, CMS-003 |
| CMS-003 | CMS Services List | Full page | `CmsController::cmsServicesList($action, $id)` — default `/cms/cms-services-list/:action/:id` |  | CMS-004, CMS-005 |
| CMS-004 | Add/Edit Villa Service (CMS Services) | Full page | `CmsController::cmsServices($id)` — default `/cms/cms-services/:id` |  | CMS-003 |
| CMS-005 | Common Text Page (CMS Content Navigation Menu) | Full page | `CmsController::commonText()` — default `/cms/common-text` |  | CMS-003, CMS-006, CMS-009, CMS-012, CMS-014, CMS-016 |
| CMS-006 | "Why Us" List | Full page | `CmsController::whyUs($action, $id)` — default `/cms/why-us/:action/:id` |  | CMS-005, CMS-007, CMS-008 |
| CMS-007 | Add "Why Us" | Full page | `CmsController::whyUsAdd()` — default `/cms/why-us-add` |  | CMS-006 |
| CMS-008 | Edit "Why Us" | Full page | `CmsController::whyUsEdit($id)` — default `/cms/why-us-edit/:id` |  | CMS-006 |
| CMS-009 | Partner Logo List | Full page | `CmsController::logos($action, $id)` — default `/cms/logos/:action/:id` |  | CMS-005, CMS-010, CMS-011 |
| CMS-010 | Add Partner Logo | Full page | `CmsController::logoAdd()` — default `/cms/logo-add` |  | CMS-009 |
| CMS-011 | Edit Partner Logo | Full page | `CmsController::logoEdit($id)` — default `/cms/logo-edit/:id` |  | CMS-009 |
| CMS-012 | Destination List | Full page | `CmsController::destination($action, $id)` — default `/cms/destination/:action/:id` |  | CMS-005, CMS-013 |
| CMS-013 | Edit Destination Content (Destination Edit) | Full page | `CmsController::destinationEdit($district_id)` — default `/cms/destination-edit/:district_id` |  | CMS-012 |
| CMS-014 | Destination Global List | Full page | `CmsController::destinationGlobal()` — default `/cms/destination-global` |  | CMS-005, CMS-015 |
| CMS-015 | Edit Destination Global Content | Full page | `CmsController::destinationGlobalEdit($district_id)` — default `/cms/destination-global-edit/:district_id` |  | CMS-014 |
| CMS-016 | Contact Form List | Full page | `CmsController::contactForm($action, $id)` — default `/cms/contact-form/:action/:id` |  | CMS-005, CMS-017 |
| CMS-017 | Add/Edit Contact Form | Full page | `CmsController::editContactForm($id)` — default `/cms/edit-contact-form/:id` |  | CMS-016 |
| CMS-018 | Concierge List | Full page | `CmsController::concierges($action, $id)` — default `/cms/concierges/:action/:id` |  | CMS-005, CMS-019 |
| CMS-019 | Add/Edit Concierge Service | Full page | `CmsController::editConcierges($id)` — default `/cms/edit-concierges/:id` |  | CMS-018 |
| CMS-020 | Multilingual Translation Management (CMS Translation) | Full page | `CmsController::cmsTranslation($tab)` — default `/cms/cms-translation/:tab` |  |  |
| CMS-021 | Collection Website List | Full page | `CmsController::collectionWebsites($action, $id)` — default `/cms/collection-websites/:action/:id` |  | CMS-022, CMS-023 |
| CMS-022 | Add/Edit Collection Website | Full page | `CmsController::collectionWebsiteEdit($id)` — default `/cms/collection-website-edit/:id` |  | CMS-021 |
| CMS-023 | Collection Website Content Management (5 sub-tabs) | Full page | `CmsController::collectionTabs($tab, $id)` — default `/cms/collection-tabs/:tab/:id` |  | CMS-021, CMS-022, CMS-024, CMS-025, CMS-026, CMS-027, CMS-028, CMS-029 |
| CMS-024 | Collection Website Common Text List | Full page | `CmsController::collectionCommonText($action, $id)` — default `/cms/collection-common-text/:action/:id` |  | CMS-023, CMS-025 |
| CMS-025 | Add/Edit Collection Website Common Text | Full page | `CmsController::editCollectionCommonText($id)` — default `/cms/edit-collection-common-text/:id` |  | CMS-023, CMS-024 |
| CMS-026 | Insights Article List | Full page | `CmsController::insights($action, $id)` — default `/cms/insights/:action/:id` |  | CMS-023, CMS-027 |
| CMS-027 | Add/Edit Insight Form | Full page | `CmsController::insightsEdit($id)` — default `/cms/insights-edit/:id` |  | CMS-023, CMS-026 |
| CMS-028 | I Wish List | Full page | `CmsController::iWish($action, $id)` — default `/cms/i-wish/:action/:id` |  | CMS-023, CMS-029 |
| CMS-029 | Add/Edit I Wish Form | Full page | `CmsController::iWishEdit($id)` — default `/cms/i-wish-edit/:id` |  | CMS-023, CMS-028 |
| CMS-030 | Arrival Content List (guest arrival guidance for villas) | Full page | `CmsController::arrival($action, $id)` — default `/cms/arrival` (list); delete uses `/cms/arrival/delete/:id` |  | CMS-031 |
| CMS-031 | Add/Edit Arrival Content | Full page | `CmsController::cmsArrival($id)` — default `/cms/cms-arrival/:id` |  | CMS-030 |
| CMS-032 | Restaurant List (Guest Portal) | Full page | `CmsController::guestPortal()` — default `/cms/guest-portal` |  | CMS-033 |
| CMS-033 | Add/Edit Restaurant (Guest Portal) | Full page | `CmsController::restaurants($tab, $restaurant_id)` — default `/cms/restaurants/:tab/:restaurant_id` |  | CMS-032 |
| CMS-034 | Guest Contract Editor | Full page | `CmsController::contracts()` — default `/cms/contracts` (GET may include the query parameters `country_id`, `language_code`, `tab`, `section_key`, `payment_s... |  |  |

### EMT — Email Templates (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| EMT-001 | Email Template List | Full page | `EmailTemplateController::list()` — default `/email-template/list` |  | EMT-001-P1, EMT-002, EMT-003 |
| EMT-001-P1 | Delete Email Template Confirmation | Popup | Static modal within `list.ctp`; confirming navigates to `EmailTemplateController::delete($id)` — `GET /email-template/delete/:id` | EMT-001 | EMT-001 |
| EMT-002 | Add Email Template | Full page | `EmailTemplateController::add()` — default `/email-template/add` |  | EMT-001 |
| EMT-003 | Edit Email Template | Full page | `EmailTemplateController::edit($id)` — default `/email-template/edit/:id` (id base64-encoded) |  | EMT-001 |

### NOT — Notices (9 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| NOT-001 | Send Notice/Task (Notice Board) | Full page | `NoticeController::noticeBoard()` — default `/notice/notice-board` (no dedicated pretty route declared in `config/Routes.php`; uses the DashedRoute fallback) |  | NOT-002 |
| NOT-002 | Notice/Task List (Notice List) | Full page | `NoticeController::noticeList($tab, $sub_tab)` — default `/notice/notice-list/:tab/:sub_tab` |  | NOT-001, NOT-003, NOT-004, NOT-005 |
| NOT-002-P1 | Delete Notice Confirmation | Popup | Static modal within `notice_list.ctp`; the delete action calls `NoticeController::delete($id)` via `GET /notice/delete/:id` (base64 id) when the confirm butt... | NOT-002 | NOT-002 |
| NOT-003 | Notice Detail (View Detail) | Full page | `NoticeController::viewDetail($id)` — default `/notice/view-detail/:id` |  | NOT-002, NOT-003-P1 |
| NOT-003-P1 | Delete Notice Confirmation (from Detail page) | Popup | Static modal within `view_detail.ctp`; confirming calls `NoticeController::delete($id)` via `GET /notice/delete/:id` | NOT-003 | NOT-003 |
| NOT-004 | Help Other User | Full page | `NoticeController::helpOtheruser($id)` — default `/notice/help-otheruser/:id` |  | NOT-002, NOT-003 |
| NOT-005 | Company News | Full page | `NoticeController::companyNews()` — default `/notice/company-news` |  | NOT-002, NOT-005-P1, NOT-006 |
| NOT-005-P1 | Delete Company News Confirmation | Popup | Static modal within `company_news.ctp`; confirming calls `NoticeController::deleteCompanyNews($id)` via `GET /notice/delete-company-news/:id` | NOT-005 | NOT-005 |
| NOT-006 | Add Company News | Full page | `NoticeController::addCompanyNews()` — default `/notice/add-company-news` |  | NOT-005 |

### TXT — Texts (4 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| TXT-001 | Text Library | Full page | `TextsController::index()` — default `/texts` |  | TXT-001-P1, TXT-001-P2, TXT-001-P3 |
| TXT-001-P1 | Add/Edit Text | Popup | Static modal within `index.ctp` (`#texts-editor-modal`); saves via AJAX `TextsController::saveText()` — `POST /texts/save-text` | TXT-001 | TXT-001 |
| TXT-001-P2 | Add Text Languages | Popup | Static modal within `index.ctp` (`#texts-language-modal`); saves via AJAX `TextsController::saveLanguages()` — `POST /texts/save-languages` | TXT-001 | TXT-001 |
| TXT-001-P3 | Confirm Delete Text/Language | Popup | Shared static modal within `index.ctp` (`#texts-delete-modal`); confirmation calls AJAX `TextsController::deleteText()` (`POST /texts/delete-text`) or `Texts... | TXT-001 | TXT-001 |

### PHO — Photos (8 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PHO-001 | Photo Shoot Planning | Full page | `PhotosController::planning($shootId)` — default `/photos/planning/:shootId` |  |  |
| PHO-002 | Villa Photo Management List (Photo Sets) | Full page | `PhotosController::index()` — default `/photos/index` (or `/photos/`) |  | PHO-006, PHO-007 |
| PHO-003 | Common Area Photos (Common Areas) | Full page | `PhotosController::commonAreas()` — clean route `/photos/common-areas` (explicitly declared in `config/Routes.php`) |  | PHO-002, PHO-004, PHO-005, PHO-008 |
| PHO-004 | Residence Common Area Photos | Full page | `PhotosController::residence($residenceId)` — clean route `/photos/residence/:id` (explicitly declared in `config/Routes.php`) |  | PHO-003, PHO-005 |
| PHO-005 | Common Area Photo Set Detail (Residence) | Full page | `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — clean route `/photos/residence/:id/:set_type` (explicitly declared); shares the `detail... |  | PHO-003, PHO-004 |
| PHO-006 | Property Photo Page (Villa) | Full page | `PhotosController::property($villaId)` — default route `/photos/property/:id` (no pretty route declared in `config/Routes.php`) |  | PHO-002, PHO-003, PHO-004, PHO-005, PHO-007, PHO-008 |
| PHO-007 | Property Photo Set Detail (Villa) | Full page | `PhotosController::detail($villaId, $setType = 'ota')` — default route `/photos/detail/:id/:set_type` (no pretty route declared); shares the `detail.ctp` vie... |  | PHO-002, PHO-004, PHO-006 |
| PHO-008 | Photo Standard Settings (Photo Settings) | Full page | `PhotosController::settings()` — default route `/photos/settings` |  | PHO-002, PHO-003, PHO-004, PHO-006, PHO-007 |

### VID — Videos (5 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| VID-001 | Video Library | Full page | `VideosController::index()` — default `/videos` |  | VID-001-P1, VID-001-P2, VID-001-P3, VID-001-P4 |
| VID-001-P1 | Add New Video | Popup | Static modal within `index.ctp` (`#video-add-modal`); saves via `VideosController::add()` — `POST /videos/add` (multipart/form-data) | VID-001 | VID-001 |
| VID-001-P2 | Edit Video | Popup | Static modal within `index.ctp` (`#video-edit-modal`); saves via `VideosController::edit($id)` — `POST /videos/edit/:id` (multipart/form-data) | VID-001 | VID-001 |
| VID-001-P3 | View Video (Video Player) | Popup | Static modal within `index.ctp` (`#video-player-modal`); content is played via `VideosController::play($id)` — `GET /videos/play/:id` (streams the file, with... | VID-001 | VID-001 |
| VID-001-P4 | Confirm Delete Video | Popup | Static modal within `index.ctp` (`#video-confirm-modal`); confirmation calls AJAX `VideosController::delete($id)` — `POST /videos/delete/:id` | VID-001 | VID-001 |

### OTA — OTA Content (3 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| OTA-001 | OTA Channel Listing Content (Listing Content) | Full page | `OtaContentController::listing($platformId)` — default `/ota-content/listing/:platformId` |  | OTA-001-P1, OTA-001-P2 |
| OTA-001-P1 | Select Content Element for OTA Listing | Popup | Static modal within `listing.ctp`; saves the selection via AJAX `OtaContentController::assignElements($platformId)` — `POST /ota-content/assign-elements/:pla... | OTA-001 | OTA-001 |
| OTA-001-P2 | Confirm Removal of Content Element from Listing | Popup | Static modal within `listing.ctp`; confirmation calls AJAX `OtaContentController::removeAssignment()` — `POST /ota-content/remove-assignment` | OTA-001 | OTA-001 |

### PAGE — Static Pages (1 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| PAGE-001 | CakePHP Default Welcome Page (Default Home / Scaffold Page) | Full page | `PagesController::display(...$path)` — default `/pages/*` (the route is commented out in `config/Routes.php`, line `//$routes->connect('/pages/*', ...)`). Th... |  |  |

## 12. Accounting & HR

### ACC — Accounting & HR (41 screens)

| Code | Screen Name | Type | Route | Opened From | Navigates To |
|---|---|---|---|---|---|
| ACC-007 | Account Statements | Full page | `AccountController::statements($account_id)` — default `/account/statements/<account_id>` (`account_id` passed as base64 in the URL) |  | ACC-007-P1, ACC-007-P2 |
| ACC-007-P1 | Add Statement Entry Popup | Popup | `AccountController::addStatement($account_id)` — default `/account/add-statement/<account_id>` | ACC-007 | ACC-007 |
| ACC-007-P2 | Edit Statement Entry Popup | Popup | `AccountController::editStatement($id)` — default `/account/edit-statement/<id>` (`id` passed as base64) | ACC-007 | ACC-007 |
| ACC-008 | Accounting Categories | Full page | `AccountController::accountingCategories()` — default `/account/accounting-categories` |  |  |
| ACC-009 | Statement Reconcile | Full page | `AccountController::statementReconcile()` — default `/account/statement-reconcile` |  |  |
| ACC-023 | Chart of Accounts | Full page | `AccountController::chartAccounts()` — default `/account/chart-accounts` |  | ACC-023-P1, ACC-023-P2 |
| ACC-023-P1 | View Accounting Account Details | Popup | `AccountController::viewChartAccount($id)` — default `/account/view-chart-account/<id>` (`id` passed as base64) | ACC-023 | ACC-023 |
| ACC-023-P2 | Edit Accounting Account Details | Popup | `AccountController::editChartAccount($id)` — default `/account/edit-chart-account/<id>` (`id` passed as base64) | ACC-023 | ACC-023 |
| ACC-028 | Account Reconcile (legacy/old version) | Full page | `AccountController::reconcile()` — default `/account/reconcile` |  | ACC-009 |
| ACC-029 | Accounting & HR Overview Page | Full page | `AccountController::index()` — default `/account/index` (no parameters) |  | ACC-007, ACC-030, ACC-031, ACC-032 |
| ACC-030 | OTA Reconciliation | Full page | - Main page: `AccountController::ota($ota_id = null)` — default `/account/ota` or `/account/ota/<key>` (the `$ota_id` parameter is passed from the sidebar bu... |  | ACC-007 |
| ACC-031 | Settings | Full page | `AccountController::setting()` — default `/account/setting` (no parameters) |  | ACC-032 |
| ACC-032 | Vehicle Management (Vehicles) | Full page | - Main page: `AccountController::vehicles()` — default `/account/vehicles` (GET to view the list; POST to the same URL for add/edit/delete, processed accordi... |  |  |
| ACC-033 | Timesheet | Full page | `AccountController::timesheet()` — default `/account/timesheet` |  |  |
| ACC-034 | Payroll | Full page | `AccountController::payroll()` — default `/account/payroll` |  |  |
| ACC-038 | Phone Management (Phones) | Full page | `AccountController::phones()` — default `/account/phones` |  |  |
| ACC-039 | Computer Management (Computers) | Full page | `AccountController::computers()` — default `/account/computers` |  |  |
| ACC-040 | SIM Card Management (SIM Cards) | Full page | `AccountController::simCards()` — default `/account/sim-cards` |  |  |
| ACC-041 | Wage Periods | Full page | `AccountController::wagePeriods()` — default `/account/wage-periods` |  |  |
| ACC-042 | Daily Wages | Full page | `AccountController::dailyWages()` — default `/account/daily-wages` |  |  |
| ACC-053 | Public Holidays | Full page | `AccountController::publicHolidays()` — default `/account/public-holidays` |  | ACC-053-P1, ACC-053-P2 |
| ACC-053-P1 | Popup: Add Public Holiday | Popup | `AccountController::addPublicHoliday()` — default `/account/add-public-holiday` | ACC-053 | ACC-053 |
| ACC-053-P2 | Popup: Edit Public Holiday | Popup | `AccountController::editPublicHoliday($id)` — default `/account/edit-public-holiday/<id>` (`id` passed as base64 in the URL) | ACC-053 | ACC-053 |
| ACC-054 | Recurring Expenses (Recurring) | Full page | `AccountController::recurring()` — default `/account/recurring` |  |  |
| ACC-055 | Expense Type | Full page | `AccountController::expenseType()` — default `/account/expense-type` |  |  |
| ACC-056 | Rebill | Full page | `AccountController::rebill()` — default `/account/rebill` |  | ACC-056-P1, ACC-056-P2 |
| ACC-056-P1 | Popup: Add Rebill | Popup | `AccountController::addRebill()` — default `/account/add-rebill` | ACC-056 | ACC-056 |
| ACC-056-P2 | Popup: Edit Rebill | Popup | `AccountController::editRebill($id)` — default `/account/edit-rebill/<id>` | ACC-056 | ACC-056 |
| ACC-057 | Product Suppliers | Full page | `AccountController::suppliers()` — default `/account/suppliers` |  | ACC-057-P1, ACC-058 |
| ACC-057-P1 | Popup: Add/Edit Product Supplier | Popup | `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-supplier/<tab>/<id>/<show_page>/<payment_detail_id>` | ACC-057 | ACC-057 |
| ACC-058 | Products | Full page | `AccountController::products($tab)` — default `/account/products/<tab>` |  | ACC-058-P1 |
| ACC-058-P1 | Popup: Add/Edit Product | Popup | `AccountController::addProduct($id)` — default `/account/add-product/<id>` | ACC-058 | ACC-058 |
| ACC-059 | Services Suppliers | Full page | `AccountController::servicesSupplier()` — default `/account/services-supplier` |  | ACC-059-P1, ACC-060 |
| ACC-059-P1 | Popup: Add/Edit Services Supplier | Popup | `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-services-supplier/<tab>/<id>/<show_page>/<payment... | ACC-059 | ACC-059 |
| ACC-060 | Services | Full page | `AccountController::services($tab)` — default `/account/services/<tab>` |  |  |
| ACC-061 | Approval Matrix | Full page | `AccountController::approvalMatrix()` — default `/account/approval-matrix` |  |  |
| ACC-062 | Petty Cash (Advance / Reimbursement) | Full page | `AccountController::pettyCash($tab, $sub_tab)` — default `/account/petty-cash/<tab>/<sub_tab>` |  | ACC-063 |
| ACC-063 | Expense Payments (Payments) | Full page | `AccountController::expensePayment($tab)` — default `/account/expense-payment/<tab>` |  | ACC-007, ACC-062 |
| ACC-064 | Payment Request List | Full page | `AccountController::paymentRequestList()` — default `/account/payment-request-list` |  | ACC-062, ACC-063, ACC-064-P1, ACC-064-P2 |
| ACC-064-P1 | Popup: Create Payment Request | Popup | `AccountController::paymentRequest()` (displays the form) + `AccountController::addPaymentRequest()` (saves, POST) — default `/account/payment-request` | ACC-064 | ACC-064 |
| ACC-064-P2 | Popup: Edit Payment Request | Popup | `AccountController::editPaymentRequest($id)` (displays the form) + `AccountController::updatePaymentRequest()` (saves, POST) — default `/account/edit-payment... | ACC-064 | ACC-064 |
