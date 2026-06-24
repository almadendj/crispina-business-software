# Open Questions

Decisions still needed from the owner. These don't block writing planning docs,
but several must be answered before/while building Release 1. Grouped by urgency.

## Must answer before building reports

1. **Commission math.** The sample lists Cash 20%, Costabella Charge Card 25%,
   Costabella Charge Cash 20%, but leaves the amounts blank. Please confirm:

   - Is direct **cash** commission 20%?
   - For **room charges**, is it 25% when the guest settles their hotel bill by
     **card** and 20% when by **cash**?
   - At POS time we only know "Cash vs Room Charge." The card-vs-cash split of
     room charges is the hotel's info. Should the system: (a) ask you to enter the
     hotel's card/cash split when generating the report, (b) assume one rate for
     all room charges, or (c) something else?
     Answer: Direct cash commission is 20%, and then when charged to their rooms its 25%. However, we can leave this computation out since it is not our reposibility for now. The fields are only open because the accounting team at the hotel will handle that one. So we just present them the gross, and they handle the rest.

2. **What is commission charged on?** Total sales, or only certain
   services/streams? Does Costa Trip have its own commission, or none (different
   arrangement since the hotel provides food)?
   Answer: total sales. Costa trip has no commission, those prices are already deducted.

## Must answer for transaction entry

3. **Voucher numbering.** Should the system auto-assign the next number, or do you
   type the number from a pre-printed voucher pad? The sample shows two ranges
   (`19xx` then `02xx`) — how/when do they reset?
   Answer: good catch. Actually those numbers are from the physical Official Receipt. However sometimes the pads get jumbled so its inconsistent.

4. **Settlement granularity.** Is Cash vs Room Charge chosen per **voucher** or
   can different line items on one voucher be paid differently? (Samples suggest
   per voucher.)
   Answer: per voucher.

## Pricing clarifications

5. **Boat rental pricing.** It appears as a flat ₱6,000 for several pax counts but
   ₱7,500 for 9 pax in one row. What's the actual rule (flat? per-pax bands?).
   Answer: Source of truth should be whats inside prices.md. Prices are inconsistent for now because of the volatile gas market.

6. **Diving price variance.** "Fun Dive" appears at ₱3,000, ₱6,000, and ₱8,000.
   Are these different dive types entered under one label, or price overrides?
   Should the catalog list them as distinct services?
   Answer: I think lets start with the prices.md first, and then work from there. This mightve been mislabelled, or price override

7. **Costa Trip children.** Confirm child = 50% of adult, ages 4+. How are
   children recorded on the report (the sample shows only adults)?
   Answer: Another row below the adult row

## Product / rollout

8. **Report acceptance.** Does Costabella require the PDF to match the current
   layout exactly, or is a clean equivalent acceptable?
   Answer: a clean equivalent is acceptable

9. **Historical data.** Do you want to back-enter past months, or start fresh from
   go-live?
   Answer: start fresh from go live

10. **Branding.** Logo, exact legal name, and address text to print on reports.
    Answer: Lets leave that out for now, make it flexible so we can add later.

11. **Hosting/accounts.** OK to use Supabase + Vercel? Who owns the accounts and
    billing?
    Answer: Supabase + vercel is fine as they have free tiers.
