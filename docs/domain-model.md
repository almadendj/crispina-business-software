# Domain Model

This describes the business concepts the system must represent. It is derived
from the real sample reports in `/docs`. Where a rule is uncertain, it is flagged
and also listed in [`open-questions.md`](open-questions.md).

## Glossary

| Term            | Meaning                                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Voucher**     | The unit of sale in the main shop. A numbered slip that holds one or more line items for one customer/room on one date. Example voucher numbers: `1909`, `1918`, `0201`.     |
| **Line item**   | A single charged thing on a voucher: a service or a rented item, with a quantity/pax and an amount. One voucher can have several (e.g. a boat rental + 5 mask/snorkel sets). |
| **Room Charge** | Customer charges the purchase to their hotel room instead of paying cash. Settled later via the hotel.                                                                       |
| **Cash**        | Customer pays cash directly to Crispina.                                                                                                                                     |
| **Day Use**     | A walk-in / non-staying customer; appears where a room number would be.                                                                                                      |
| **Pax**         | Number of persons (drives tiered/per-person pricing).                                                                                                                        |
| **Costa Trip**  | Hotel-booked boat trip; a separate sales stream with its own report and per-pax pricing.                                                                                     |
| **Commission**  | Percentage of sales owed to Costabella for operating inside the resort.                                                                                                      |

## Core entities (logical)

```
Service (catalog)
  id, name, category, default_price, pricing_mode, min_pax, active

Voucher                         ← main shop sale
  id, voucher_no, date, room_no | "Day Use", settlement_type, note
  └─ LineItem (1..*)
       id, service_id?, description, qty/pax, unit_price, amount

CostaTripBooking                ← separate stream
  id, date, room_no(s), adults, children, unit_price (tier), amount, note

MonthlyReport (derived, not stored as source of truth)
  period (month/year), type (MAIN | COSTA_TRIP), generated_at
```

> **Vouchers and line items are the source of truth.** Reports are _derived_ by
> aggregating them for a month — they are generated, not hand-maintained.

## Settlement types (main shop)

Each voucher (or line item — see open questions) is settled as one of:

- **Cash** — paid directly to Crispina.
- **Room Charge** — charged to the hotel room.

The Main Billing Report has separate **CASH** and **Room Charge** money columns
and totals each independently. In the sample month:
`TOTAL SALES ₱111,000 = CASH ₱22,300 + Room Charge ₱88,700`.

## Commission to Costabella

> **Decision: the system does NOT compute commission in Release 1.** We present
> **gross** figures only (Total Sales, plus the CASH and Room Charge subtotals).
> Costabella's accounting team computes and deducts commission on their side.
> The "Commission to Costabella" block on the report stays as **blank fields**
> for them to fill in — exactly like the sample.

For reference only (not computed by us): direct **cash** sales carry ~20%
commission, **room charges** ~25%. Costa Trip carries **no** commission (its
prices are already net — see below). Keep these rates documented so commission
_can_ be added later, but do not implement the calculation now.

## Pricing rules

Catalog prices are **defaults / pre-fills**, not enforced values — real vouchers
show the same service at different amounts (e.g. "Fun Dive" appears at ₱3,000,
₱6,000, and ₱8,000 in one month, likely reflecting dive type/data entry). The
POS must **always store the actual amount charged** and allow override.

Pricing modes seen in the catalog (`prices.md`):

- **Flat per item** — e.g. equipment rentals ₱200 each; boat rental flat fee.
- **Per pax** — e.g. Fun Dive ₱3,000/pax, Sightseeing ₱350/head.
- **Tiered by pax band** — e.g. Island Hopping 1–3 = ₱5,500 flat, 3+ = ₱500/person.
- **Minimum persons** — e.g. Boat Dive min 2, Sardines min 2, Bandwagon min 3.

### Costa Trip pricing (separate)

Per-pax tiered by group size:

| Group size (adults) | Price per adult |
| ------------------- | --------------- |
| 1–3                 | ₱2,400          |
| 4–8                 | ₱1,560          |
| 9+                  | ₱960            |

- **Child** = 50% of the adult rate, ages 4 and above.
- **Children appear as their own row** on the report, directly **below** the
  adult row for the same booking (own unit price + amount).
- A single booking may list **multiple rooms** (e.g. `250, 208`).
- Amount = applicable per-pax rate × number of pax.
- **No commission** — Costa Trip prices are already net to Crispina.

## Two report streams (must stay separate)

1. **Main Billing Report** (`sample_billing_report.pdf`) — columns:
   `DATE · VOUCHER NO. · DETAILS · RM. NO. · CASH · Room Charge`. Footer has
   total sales and the commission section. Prepared-by / received-by signature
   block on the last page.
2. **Costa Trip Sales Report** (`sample_costa_trip.pdf`) — columns:
   `DATE · RM # · PARTICULARS · UNIT PRICE · AMOUNT`, with a single TOTAL SALES.
   Signature block at top.

## Voucher numbering

The "voucher number" is the number from the **physical Official Receipt (OR)**
pad, **manually entered** by the operator. It is **not** system-generated and is
**not reliably sequential** — physical pads get jumbled, so numbers can arrive
out of order or with gaps (sample shows `1909…1950` then `0201…0221`).

Design implications:

- The operator types the OR number; the system does **not** auto-assign it.
- Do **not** enforce sequence/ordering. At most, warn on an exact duplicate
  within a period; never block saving.

## Data-quality notes (design implications)

- Prices vary for the "same" service → store actual amount; never recompute from
  catalog at report time.
- Room number is optional ("Day Use") and can be multiple values.
- A voucher groups multiple line items but settles to cash/room-charge columns.
- Reports must reproduce historical entries faithfully, including overrides.
