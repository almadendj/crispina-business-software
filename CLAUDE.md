# CLAUDE.md — Agent Context Entry Point

> Read this first. It orients any AI agent (or new developer) working on this
> repository. Detailed context lives in `/docs`.

## What this project is

A **Point-of-Sale (POS) and reporting system** for **Crispina Dive Scuba
Diving Services**, a dive shop operating inside Costabella Tropical Beach
Resort, Maribago, Lapu-Lapu City (Mactan), Cebu, Philippines.

Today the shop records every sale by hand on vouchers, then manually re-encodes
a full month of vouchers into PDF billing reports. This is slow and error-prone.
The software replaces that workflow: **record transactions as they happen, then
generate the monthly reports automatically.**

## Release scope

- **Release 1 (current focus): the POS.** Record transactions + generate the two
  monthly reports (Main Billing Report and Costa Trip Sales Report).
- **Future (not now): online bookings and online payments.** Architect for it,
  but do not build it in Release 1.

## Read these next (in `/docs`)

| Doc | What it covers |
| --- | --- |
| [`project-status.md`](docs/project-status.md) | **Where we are now** — current phase, decisions recap, Linear tracking, next steps. Read this to get current fast. |
| [`company-profile.md`](docs/company-profile.md) | Who the company is, where it operates, the Costabella relationship, services |
| [`project-overview.md`](docs/project-overview.md) | Problem, vision, goals, scope, roadmap |
| [`domain-model.md`](docs/domain-model.md) | Core concepts: vouchers, line items, payment/settlement types, commission, pricing rules |
| [`architecture.md`](docs/architecture.md) | Cloud + offline-first design, recommended stack, sync engine |
| [`pos-requirements.md`](docs/pos-requirements.md) | Release 1 functional + non-functional requirements |
| [`open-questions.md`](docs/open-questions.md) | Decisions still needed from the owner before/while building |
| [`prices.md`](docs/prices.md) | Authoritative price list (services + Costa Trip tiers) |
| `sample_billing_report.pdf` / `sample_costa_trip.pdf` | Real examples of the two reports the system must reproduce |

## Working agreements for agents

- **Do not build online booking/payments in Release 1.** Keep the data model
  ready for it; don't implement it.
- **Prices are defaults, not hard rules.** Real vouchers show the same service
  sold at different prices. Always capture the *actual amount charged*, with the
  catalog price as a pre-fill the user can override.
- **A sale must never be blocked by the network.** Offline-first is a hard
  requirement (see `architecture.md`).
- **Reproduce the two report formats as a clean equivalent.** Same columns and
  totals as the sample PDFs in `/docs`; pixel-perfect matching is not required,
  **but output must be consistent** — one fixed template across months, identical
  on re-runs, uniform currency/date formatting (see `pos-requirements.md` R4.8).
- **Do not compute commission.** Present gross figures only; the
  "Commission to Costabella" block stays as blank fields for the hotel's
  accounting team. (Rates are noted in `domain-model.md` for future use.)
- **Voucher number = manually entered Official Receipt number.** Not
  system-generated, not sequence-validated.
- **`prices.md` is the source of truth for the catalog;** prices fluctuate (gas
  market), so always allow per-sale overrides.
- The owner's decisions are recorded inline in `open-questions.md`.

## Status

**Planning complete; no application code yet.** All owner decisions are captured,
work is tracked in Linear (team **Crispina** / `CRI`, project "Crispina POS —
Release 1", 20 issues across 4 milestones). Next: scaffold the app (CRI-1) and
define the DB schema (CRI-3); the design system (CRI-7) can run in parallel.

See [`docs/project-status.md`](docs/project-status.md) for the full current-state
record (decisions recap, milestone→ticket map, next steps). Keep it updated as
state changes.
