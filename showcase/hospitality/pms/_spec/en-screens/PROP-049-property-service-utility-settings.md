# PROP-049 — Property Service & Utility Settings (Service Setting)

**Type:** Full page
**Route:** property/service-setting/:tab/:villa_id (villa_id passed base64-encoded); also embedded as the "Service and Utilities" tab in the Villa Detail screen (PROP-050)
**Module:** PROP = Properties

## Overview
Page consolidating operational service/utility settings for a Property across 10 tabs: Concierge, Common Area, Electricity, Cleaning, Water, Internet, Television, Pool, Garden, Pest Control. Each tab saves to its own corresponding data table (via the `_saveXxxSetting` functions); some tabs are only available once a Property (`villa_id`) has been selected. This content is shared (element `property/*`) with the "Service and Utilities" tab in the Villa Detail screen (PROP-050).

## Detailed Description

### Concierge Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Used By | `used_by` | Select | Yes | Key hand-over method |
| 2 | Primary Method | `primary_method` | Select | Yes | |
| 3 | Other Primary Method | `other_primary_method` | Text | No | Shown when Primary Method = Other |
| 4 | Nb of Keys | `nb_of_keys` / `key_nb_of_keys-1_` | Number (multiple rows) | No | Multiple key types can be added |
| 5 | Key Image | `key_image` | Image upload | No | |
| 6 | Check-in Time | `check_in_time` | Time picker | Yes | |
| 7 | Check-out Time | `check_out_time` | Time picker | Yes | |
| 8 | Ownership | `ownership` | Select | No | |
| 9 | Full Name / Nickname | `full_name`/`nick_name` | Text | No | |
| 10 | Bed Linen / Bed Sheet / Towels | `bed_linen`/`bed_sheet`/`towels` | Number | No | |
| 11 | Access Code | `access_code` | Text | No | |
| 12 | Rental Fee / Security Deposit | `rental_fee`/`security_deposit_amount` | Number | No | |
| 13 | Icon | `icon` | Select/Upload | No | |

### Common Area Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Fee | `fee` | Text/Select | No | Fee type |
| 2 | Amount | `amount` | Number | No | |
| 3 | Payable By | `payable_by` | Select | No | |
| 4 | Billing Period | `billing_period` | Select | No | |
| 5 | Due By | `due_by` | Select/Datepicker | No | |

### Electricity Tab (only available once `villa_id` exists)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Yes | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 3 | Currency | `currency_id` | Select | No | |
| 4 | Price | `price` | Number | No | |
| 5 | Free Quota | `free_quota` | Number | No | |
| 6 | Fixed Daily | `fixed_daily` | Number | No | |
| 7 | Starting Date / Starting Meter | `starting_date`/`starting_meter` | Datepicker/Number | No | |
| 8 | Payment Date | `payment_date` | Datepicker | No | |
| 9 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |
| 10 | Inclusion | `inclusion` | Textarea/Checkbox | No | |
| 11 | Electricity Management | `electricity_management` | Select | No | Method of managing electricity (shared/individual meter, etc.) |

### Cleaning Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Make Up Frequency | `make_up_frequency` | Select | No | |
| 2 | Makeup Man Hour | `makeup_man_hour` | Number | No | |
| 3 | Cleaning Man Hour | `cleaning_man_hour` | Number | No | |

### Water Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Yes | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 3 | Price / Free Quota | `price`/`free_quota` | Number | No | |
| 4 | Payment Date | `payment_date` | Datepicker | No | |
| 5 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |
| 6 | Inclusion | `inclusion` | Textarea/Checkbox | No | |

### Internet Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Yes | List of amenity providers |
| 2 | Login / Password | `login`/`password` | Text | No | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 4 | Price | `price` | Number | No | |
| 5 | Billing Period | `billing_period` | Select | No | |
| 6 | Payment Date | `payment_date`/`payment_date_date` | Datepicker | No | |
| 7 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |

### Television Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider | `provider` | Select2 | Yes | |
| 2 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 3 | Price | `price` | Number | No | |
| 4 | Billing Period | `billing_period` | Select | No | |
| 5 | Payment Date | `payment_date`/`payment_date_date` | Datepicker | No | |
| 6 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |

### Pool Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider Type | `provider_type` | Select | Yes | |
| 2 | Provider | `provider` | Select2 | Yes | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 4 | Price | `price` | Number | No | |
| 5 | Cleaning Period | `cleaning_period` | Select | No | |
| 6 | Service Days | `service_days` | Checkbox (multiple days) | No | Mon-Sun |
| 7 | Payment Date | `payment_date` | Datepicker | No | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |

### Garden Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider Garden Type | `provider_garden_type` | Select | Yes | |
| 2 | Provider | `provider` | Select2 | Yes | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 4 | Price / Amount | `price`/`amount` | Number | No | |
| 5 | Man Hours | `man_hours` | Number | No | |
| 6 | Cleaning Period | `cleaning_period` | Select | No | |
| 7 | Payment System / Payment Date | `payment_system`/`payment_date` | Select/Datepicker | No | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |

### Pest Control Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Provider Pest Control Type | `provider_pest_control_type` | Select | Yes | |
| 2 | Provider | `provider` | Select2 | Yes | |
| 3 | Customer Registration Number | `customer_registration_number` | Text | No | |
| 4 | Price | `price` | Number | No | |
| 5 | Scope of Service | `scope_of_ser` | Textarea | No | |
| 6 | Cleaning Period | `cleaning_period` | Select | No | |
| 7 | Payment System / Payment Date | `payment_system`/`payment_date` | Select/Datepicker | No | |
| 8 | Payable By / Due By | `payable_by`/`due_by` | Select | No | |

## Functions / Actions
- Switching tabs (Concierge/Common Area/Electricity/Cleaning/Water/Internet/Television/Pool/Garden/Pest Control) — tabs from Electricity onward are disabled if no Property has been selected.
- "Save" button on each tab — submits that tab's form, calls the corresponding Controller save function (`_saveConciergeSetting`, `_saveCommonAreaSetting`, `_saveElecticitySetting`, `_saveCleaningMakeUp`, `_saveWaterSetting`, `_saveInternetSetting`, `_saveTelevisionSetting`, `_savePoolSetting`, `_saveGardenSetting`, `_savePestControlSetting`), shows a flash message, then redirects back to the current tab.

## Navigation
- Opened from: PROP-041 (Property Service Fee Payment List — "Add Settings" button), or from the "Service and Utilities" tab of PROP-050 (Villa Detail).
- Navigates to: No navigation to another page (only switches tabs and saves in place).
- Child popup: None.
