# Project Status & Context Record

> Living "where are we" record so context survives across sessions. Update this
> when state changes. Last updated: **2026-06-26**.

## Current phase

**Planning complete → ready to build.** No application code yet. Next step is to
scaffold the app and define the database schema.

## What's done

- **Planning docs written** (`/docs`): company profile, project overview, domain
  model, architecture, POS requirements, open questions. These are the source of
  truth for context.
- **Owner decisions captured** — all questions in `open-questions.md` are
  answered, and the answers are folded into `domain-model.md` /
  `pos-requirements.md` / `CLAUDE.md`.
- **Repo under git** with a `.gitignore`; pushed to GitHub remote
  `almadendj/crispina-business-software`.
- **Work tracked in Linear** (see below).

## Confirmed scope & key decisions (quick reference)

- **Release 1 = POS + automatic monthly reports.** Online bookings/payments are
  future phases — architect for them, don't build them now.
- **Architecture:** offline-first PWA (Next.js) → IndexedDB local source of truth
  → outbox sync → Supabase (Postgres) cloud for monitoring. Single device /
  single user, so no conflict resolution needed.
- **Hosting:** Supabase + Vercel (free tiers).
- **No commission computation** — present gross figures only; the hotel's
  accounting fills the commission block. (Rates kept for future in
  `domain-model.md`.)
- **Two separate report streams:** Main Billing Report and Costa Trip Sales
  Report.
- **Prices = defaults** (`prices.md` is the catalog source of truth); always
  overridable per sale (gas-driven volatility).
- **Voucher number = manually typed Official Receipt number** — not generated,
  not sequence-validated.
- **Reports = clean equivalent of the samples, but consistent/deterministic**
  (one fixed template, uniform ₱/date formatting — see `pos-requirements.md`
  R4.8).
- **Fresh start at go-live** — no historical back-entry.
- **Branding** (name/address/logo) is configurable settings, not hard-coded.

## Linear tracking

- **Workspace team:** `Crispina` (key **CRI**).
- **Project:** "Crispina POS — Release 1"
  (https://linear.app/devhaven/project/crispina-pos-release-1-44d9c8c905e3),
  lead Almadendj. 20 issues, 4 milestones, all in Backlog.

| Milestone | Issues |
| --- | --- |
| **M1 · Foundation & Design System** | CRI-1 Scaffold Next.js PWA · CRI-2 Supabase setup · CRI-3 DB schema/migrations/RLS · CRI-4 Seed catalog from prices.md · CRI-5 Offline-first infra (IndexedDB + outbox sync) · CRI-6 Auth (single operator) · CRI-7 Design system (via Claude design) |
| **M2 · POS Transaction Entry** | CRI-8 Service catalog UI · CRI-9 Voucher entry w/ line items · CRI-10 Quick entry · CRI-11 Edit/void voucher · CRI-12 Costa Trip booking entry |
| **M3 · Monthly Reporting** | CRI-13 Main Billing Report · CRI-14 Costa Trip Sales Report · CRI-15 PDF export (consistent template) |
| **M4 · Sync UX, Settings & Launch** | CRI-16 Sync status UI · CRI-17 Configurable branding/settings · CRI-18 Owner remote monitoring · CRI-19 E2E testing & reconciliation · CRI-20 Production deploy |

> Issues were originally created under the `CafeRank` team (`CAF-78…97`) then
> migrated to `Crispina`; old `CAF-…` links redirect.

## Design-system workflow (deliberate)

Per the owner: build **one** cohesive design system with Claude design (CRI-7),
then implement all POS/report screens directly from it. **Do not** create
separate per-screen design tickets or round-trip each screen through Claude
design — this is intentional to save tokens.

## Immediate next steps

1. **CRI-1** — scaffold the Next.js PWA.
2. **CRI-3** — define the DB schema (the foundation everything else needs).
3. **CRI-7** — design system (can run in parallel; no backend dependency).

Note: **CRI-2** (Supabase project) needs the owner to create the cloud project /
share keys before the app can connect.
