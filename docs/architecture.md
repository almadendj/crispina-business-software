# Architecture

## Constraints that drive the design

| Decision | Owner's answer                                                     |
| -------- | ------------------------------------------------------------------ |
| Platform | **Cloud web app** (for remote monitoring)                          |
| Internet | **Mostly reliable**, but **slow/spotty must not block a sale**     |
| Users    | **Single device, single user** (one shop attendant)                |
| Future   | Online bookings + payments later — don't build now, don't block it |

The interesting tension: _"cloud app"_ (for monitoring) **+** _"must work on bad
internet."_ The answer is an **offline-first (local-first) web app** that syncs
to the cloud.

## Why offline-first beats a plain cloud app or a manual queue

- A pure cloud app stalls every time the connection drops mid-sale — unacceptable
  at a beach resort.
- A hand-rolled "send later" queue usually handles the happy path but breaks on
  retries, duplicates, and app restarts.
- **Single device + single user removes the hard problem** of offline sync:
  there are no concurrent edits to reconcile. So we get robust offline behavior
  **without** CRDTs or complex conflict resolution. A disciplined **outbox /
  append-log** pattern is enough.

## High-level shape

```
┌──────────────────────── Shop device (browser / installed PWA) ─────────────┐
│  POS UI (React)                                                            │
│     │ writes/reads instantly                                              │
│     ▼                                                                     │
│  Local DB (IndexedDB)  ← source of truth for the attendant; always works  │
│     │                                                                     │
│  Outbox (pending changes)                                                 │
│     │  sync engine: push when online, retry w/ backoff, idempotent        │
└─────┼─────────────────────────────────────────────────────────────────────┘
      │  HTTPS (whenever a connection exists)
      ▼
┌──────────────────────── Cloud (Supabase / Postgres) ──────────────────────┐
│  Authoritative store for monitoring + report data                         │
│  Auth · REST/Realtime API · Row-Level Security                            │
└─────┬─────────────────────────────────────────────────────────────────────┘
      │  read-only
      ▼
  Owner's monitoring view (any browser, anywhere)
```

Recording a sale = an instant local write. Sync to the cloud happens in the
background. The owner monitors the cloud copy remotely.

## Recommended stack

| Layer         | Choice                                                                                 | Why                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| App framework | **Next.js (React) as a PWA**                                                           | One codebase for the POS now and the public booking site later; installable; offline shell via service worker                       |
| Local store   | **IndexedDB via Dexie.js**                                                             | Reliable structured offline storage; simple queries                                                                                 |
| Sync          | **Outbox pattern** (append pending ops; push idempotently with client-generated UUIDs) | Robust on flaky links; no duplicates on retry; trivial because single writer                                                        |
| Backend / DB  | **Supabase (Postgres)**                                                                | Managed Postgres + Auth + REST/Realtime + RLS; fast path to online bookings/payments in later phases; available in this environment |
| Hosting       | **Vercel** (app) + Supabase (data)                                                     | Low-cost, simple deploys                                                                                                            |
| PDF reports   | Server-side render to match sample layouts exactly                                     | Reports are a contract; deterministic output                                                                                        |
| Offline shell | **Workbox** service worker                                                             | Caches the app so it loads with no signal                                                                                           |

> Alternative considered: purpose-built Postgres sync engines (PowerSync /
> ElectricSQL / RxDB). Powerful, but **overkill for one device/one user** and
> add operational complexity. Start with the simple outbox; revisit only if
> multi-device is added in a later phase.

## Sync engine design (Release 1)

- **Client-generated UUIDs** for every voucher / line item / Costa Trip booking,
  so the same record syncs idempotently (no duplicates if a push is retried).
- **Outbox table** in IndexedDB: each local change is queued as an op.
- **Push loop:** when online, drain the outbox oldest-first; mark synced on
  server ack; exponential backoff on failure; resume automatically on
  reconnect/app restart.
- **Pull (light):** because the shop device is the only writer, pull is mainly
  for restoring/seeding the device. The owner's monitoring view reads the cloud
  directly and does not need to write.
- **Conflict policy:** not needed in practice (single writer). Server treats
  records as upserts keyed by UUID; last write from the one device wins.
- **Visible sync status** in the UI (e.g. "3 sales pending upload") so the user
  trusts it.

## Reporting

- Reports are **derived** by querying vouchers / Costa Trip bookings for a month.
- Generate to PDF reproducing the structure of `sample_billing_report.pdf` and
  `sample_costa_trip.pdf` (columns, totals, commission block, signature block).
- Can be generated from cloud data (owner, remotely) and should also work from
  local data on the shop device.

## Security & access

- **Auth required** for the cloud (Supabase Auth). Release 1 has one operator
  account; structure roles so staff/owner separation is easy to add later.
- **Row-Level Security** on all tables from the start.
- All transport over HTTPS.

## Designed-for-later (not built in Release 1)

- Public booking site reuses the same Next.js app + Supabase.
- Online payments add a provider (e.g. a PH-friendly gateway) against the same
  data model — bookings become payable records.
- Multi-device/staff: revisit sync (add per-record versioning) only if needed.
