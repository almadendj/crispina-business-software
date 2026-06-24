# POS Requirements — Release 1

Functional and non-functional requirements for the first release. Concepts come
from [`domain-model.md`](domain-model.md); design from [`architecture.md`](architecture.md).

## 1. Service catalog

- **R1.1** Maintain a list of services/rentals with: name, category, default
  price, pricing mode (flat / per-pax / tiered), optional minimum pax, active flag.
- **R1.2** Seed the catalog from [`prices.md`](prices.md).
- **R1.3** Catalog price is a **pre-fill only**; the operator can override the
  amount on any line item.
- **R1.4** Owner can add, edit, deactivate catalog items.

## 2. Transaction (voucher) entry — main shop

- **R2.1** Create a voucher with: date, voucher number, room number *or* "Day Use"
  (room optional / allow multiple), and a settlement type (**Cash** or **Room
  Charge**).
- **R2.2** Add one or more **line items** to a voucher; each has a service (or
  free-text description), quantity/pax, unit price, and amount.
- **R2.3** Auto-calculate line amount (qty/pax × unit price) but allow manual
  override of the amount.
- **R2.4** Operator **manually enters** the voucher number (the physical Official
  Receipt number). Do **not** auto-assign and do **not** enforce sequence; at most
  warn on an exact duplicate within the period, never block saving.
- **R2.5** Save instantly to local storage (must succeed offline).
- **R2.6** Edit / void a voucher (with the change reflected in reports and synced).
- **R2.7** Quick entry for the most common items (equipment rentals, boat rental)
  to keep counter service fast.

## 3. Costa Trip entry — separate stream

- **R3.1** Record a Costa Trip booking: date, room number(s), number of adults,
  number of children, applicable per-pax tier price, amount, optional note.
- **R3.2** Auto-select the per-pax tier from group size (1–3 / 4–8 / 9+) and apply
  child = 50% adult; allow override. **Children render as a separate row directly
  below the adult row** for the same booking on the report.
- **R3.3** Costa Trip records are kept **separate** from main shop vouchers and
  never appear on the main billing report.

## 4. Monthly reports

- **R4.1** Generate the **Main Billing Report** for a selected month using the
  same columns as the sample: `DATE · VOUCHER NO. · DETAILS · RM. NO. · CASH ·
  Room Charge`, with header (company/address/period). A **clean equivalent** of
  the sample layout is acceptable — it need not be pixel-perfect — **but it must
  be consistent**: see R4.8.
- **R4.2** Compute and show **TOTAL SALES**, split into **CASH** and **Room
  Charge** totals (gross figures).
- **R4.3** Render the **"Commission to Costabella"** block as **blank fields**
  (Cash / Charge Card / Charge Cash). **The system does NOT compute commission** —
  Costabella's accounting fills these in. (Rates are documented for future use in
  `domain-model.md`.)
- **R4.4** Include the **prepared-by / received-by (GSA)** signature block.
- **R4.5** Generate the **Costa Trip Sales Report** for a selected month:
  `DATE · RM # · PARTICULARS · UNIT PRICE · AMOUNT` + TOTAL SALES + signature
  block. Children appear as a separate row below the adult row (R3.2). No
  commission block.
- **R4.6** Export both reports to **PDF** (clean equivalent of the samples).
- **R4.7** Reports are derived from stored transactions — no manual re-encoding.
- **R4.8** **Consistency (what "clean equivalent" requires).** "Clean equivalent"
  frees us from copying the hand-made sample's exact pixels, but the generated
  output must be uniform:
  - **Across months** — every month's report shares one fixed template (same
    columns, header, totals block, ordering).
  - **Across runs** — regenerating the same month yields identical output
    (deterministic; e.g. stable sort by date then voucher number).
  - **Internally** — one fixed format for currency (always `₱1,234.00`), dates
    (e.g. `May 1`), and column widths. Generated reports must be *more* uniform
    than the hand-made samples (which mixed `200`, `₱200.00`, `₱8000`).

## 5. Monitoring (owner)

- **R5.1** Owner can view synced sales and generate/download reports remotely from
  any browser (reads the cloud copy).
- **R5.2** Show current month running totals (cash, room charge, Costa Trip).

## 6. Non-functional

- **NFR-1 Offline-first:** recording a sale must succeed with no internet; data
  syncs automatically when a connection returns.
- **NFR-2 Sync transparency:** UI shows pending-upload count / last-synced time.
- **NFR-3 Durability:** no data loss across app restarts or crashes while offline.
- **NFR-4 Single operator account** with auth; structured so staff/owner roles
  can be added later.
- **NFR-5 Speed:** counter entry of a common sale in a few taps/seconds.
- **NFR-6 PH context:** currency ₱ (PHP), Asia/Manila timezone, local date format
  consistent with the samples (e.g. "May 1").
- **NFR-7 Configurable branding:** company name, address, and logo on reports are
  **settings**, not hard-coded. Ship with the current header text; leave logo
  empty for now so it can be added later without code changes.
- **NFR-8 Fresh start:** go-live begins with an empty dataset. **No historical
  back-entry** is required for Release 1.
- **NFR-9 Hosting:** Supabase + Vercel (free tiers acceptable for Release 1).

## Out of scope (Release 1)

Online customer bookings, online/card payments, multi-device concurrent use,
inventory tracking, payroll, accounting integrations. (See `project-overview.md`
roadmap.)
