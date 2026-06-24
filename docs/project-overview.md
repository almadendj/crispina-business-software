# Project Overview

## Problem

Every sale at the dive shop is written by hand on a numbered **voucher**. At
month-end, someone manually re-encodes an entire month of vouchers into two PDF
reports (the Main Billing Report and the Costa Trip Sales Report) for settlement
with Costabella. This double-handling is slow, tedious, and prone to arithmetic
and transcription errors.

## Vision

A simple, reliable POS that the shop attendant uses to record each transaction
once, at the moment of sale, and that **generates the monthly reports
automatically** — reproducing the exact report formats Costabella already
expects.

## Goals (Release 1)

1. **Record transactions fast**, the way the shop already thinks about them
   (vouchers with one or more line items, paid by cash or room charge).
2. **Eliminate manual report encoding** — generate the Main Billing Report and
   the Costa Trip Sales Report for any month, as PDFs matching the samples.
3. **Compute totals and commission automatically** (cash vs. room-charge splits,
   commission to Costabella).
4. **Work even with poor internet** — recording a sale never depends on the
   network.
5. **Let the owner monitor remotely** — data syncs to the cloud so the owner can
   view sales/reports from anywhere.

## Success criteria

- A full month of sales can be entered through the POS and the generated PDFs
  match the structure of `sample_billing_report.pdf` and `sample_costa_trip.pdf`.
- Month-end reporting goes from "hours of re-encoding" to "click generate."
- Totals (cash, room charge, commission) reconcile with manual figures.
- The shop can keep selling during an internet outage.

## In scope (Release 1)

- Transaction / voucher entry for all shop services and rentals.
- Costa Trip booking entry (separate stream).
- Service catalog with default prices (overridable per sale).
- Monthly report generation (both reports) to PDF.
- Automatic totals + commission calculation.
- Offline-first operation with cloud sync (single device, single user).
- Owner-facing view of synced data for monitoring.

## Out of scope (Release 1 — planned for later)

- Online bookings by customers.
- Online / card payment processing.
- Multi-device concurrent editing, multi-branch, payroll, inventory depth,
  accounting integrations.

Architect so these can be added later, but **do not build them now.**

## Roadmap

| Phase | Focus |
| --- | --- |
| **1 — POS (now)** | Offline-first POS + automatic monthly reports + cloud monitoring |
| **2 — Online presence** | Public catalog, online booking requests |
| **3 — Online payments** | Card/e-wallet payment, deposits, confirmations |
| **4 — Operations** | Inventory, staff accounts/roles, analytics dashboards |

## Stakeholders

- **Owner / operator** (Dan Jeryll, Crispina) — primary user, report preparer,
  remote monitor.
- **Shop attendant** — day-to-day POS user.
- **Costabella resort (GSA)** — recipient of the monthly reports; commission
  partner.
