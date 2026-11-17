# BOOK-078 — VIP Guest List (VIP Guests)

**Type:** Full page
**Route:** Booking/vipGuests/:id
**Pretty route:** no dedicated route found in config/Routes.php (the URL uses the form `/vip-guests?id=...` per the script in the view)
**Module:** Booking

## Overview
Screen for configuring the criteria used to identify VIP/VIP 5* guests (based on length of stay and booking value) for each business unit, while also displaying the list of current bookings that meet the VIP criteria for special-arrival preparation.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | Changing the value reloads the page with the corresponding `?id=` |

### VIP Criteria Configuration Table (update form)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Status | `data[key][name]` (hidden) | Hidden text | - | "VIP" or "VIP 5*" |
| 2 | Value | `data[key][price]` | Number/Text | Yes | Booking value threshold (THB) |
| 3 | Condition Link | `data[key][link]` | Select | Yes | AND / OR — combines the nights and value conditions |
| 4 | Nights | `data[key][duration]` | Number/Text | Yes | Length-of-stay threshold (default VIP=8, VIP 5*=15) |

### List of Bookings Meeting VIP Criteria
| # | Column | Notes |
|---|---|---|
| 1 | Check-in | Check-in date |
| 2 | Check-out | Check-out date |
| 3 | Villa | Villa name |
| 4 | Guest Name | Name of the guest who made the booking |
| 5 | Status | "VIP" or "VIP 5*" |
| 6 | Criteria | Description (e.g., "50000 THB-10 nights") |
| 7 | Action | Ban icon (blocks VIP tracking), "Get Ready" icon color-coded: red = chat group not yet opened, blue = chat group opened but no preparation work recorded, green = preparation work recorded (opens BOOK-079) |

## Functions / Actions
- Select a business unit — reloads the page
- **Update** button — saves the VIP criteria configuration (form submit; the controller recalculates the VIP booking list based on the new criteria)
- **Ban** icon on each booking — opens a confirmation modal, calls `banVipBooking/:booking_id` on confirmation (hides the booking from the VIP list)
- Red **Get Ready** icon — shows a warning "please open the chat group first"
- Blue/green **Get Ready** icon — opens BOOK-079 (`preparationWork`) to record guest-arrival preparation work

## Navigation
- Opened from: Booking module menu > VIP Guests
- Navigates to: BOOK-079 (Guest Arrival Preparation Work) when the Get Ready icon is clicked
