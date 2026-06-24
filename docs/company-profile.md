# Company Profile

## Identity

- **Trade name:** Crispina Dive Scuba Diving Services
  *(letterhead reads "CRISPINA DIVE — SCUBA DIVING SERVICES")*
- **Type:** Scuba diving, water-sports, and equipment-rental shop.
- **Location:** Inside **Costabella Tropical Beach Resort/Hotel**, Buyong,
  Maribago, Lapu-Lapu City (Mactan Island), Cebu, Philippines.
- **Reports prepared by:** Dan Jeryll (on behalf of Crispina).

## Operating setup

Crispina runs a dive shop **inside** the Costabella resort. Most customers are
hotel guests; some are walk-ins / day-use visitors (recorded as **"Day Use"**
instead of a room number).

Because the shop sits inside the hotel, two things follow:

1. **Guests can charge purchases to their hotel room** ("Room Charge") instead of
   paying cash. The hotel collects on Crispina's behalf and settles later.
2. **The hotel takes a commission** on sales (see `domain-model.md`).

## Services offered

(Authoritative prices: [`prices.md`](prices.md). Summary below.)

- **Diving** — Discover Scuba, Fun Dive (Beach Dive), Boat Dive, Special Boat
  Dive, plus diving gear rental.
- **Equipment rentals** — Mask/Snorkel, Fins, Life Jacket (₱200 each in the
  sample period).
- **Boat rentals** — chartered boat trips (commonly ₱6,000; varies by pax).
- **Island / water activities** — Island Hopping, Sardines Watching,
  Sightseeing, Bandwagon. Several have minimum-person requirements.

## The Costabella partnership — "Costa Trip"

**Costa Trip** is a separate boat-rental product run *in partnership with the
hotel*:

- **The hotel accepts the bookings** (the guest books through Costabella, not
  directly with Crispina).
- **The hotel provides the food**; **Crispina provides the boats.**
- It is **billed completely separately** from the main shop sales — its own
  monthly report (`sample_costa_trip.pdf`) with its own per-pax tiered pricing.

Treat Costa Trip as a distinct sales stream throughout the system. It is not just
another service line on the main billing report.

## Customer types

- **Hotel guest with room** — has a room number; may pay Cash or Room Charge.
- **Day Use / walk-in** — no room number; typically pays Cash.

## Future direction

The owner intends to scale toward **online bookings and online payments**. The
system should be architected so that capability can be added later without a
rewrite, but it is **out of scope for Release 1**.
