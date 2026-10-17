# v2 funnel notes (for Josh – not linked from any page)

Pages: `v2/` (landing) → `v2-quiz/` (proof + quiz + form) → `promise-terms/` (conditions).
Originals `kpi-style/`, `faded-split/`, `promise-terms/` are unchanged.

**Live on v2 (18 Oct 2026, Josh's order):** headline **"Quote in 2 days or we pay you $500.*"** → mid line "Limestone and Gabion walls for Perth and Bunbury homeowners" → "Gabion walls built to last up to 80 years." + BBA proof line → "Built by Josh's crew. Backed by a 7-year workmanship warranty."

## 1. Headline variants (A/B)
1. **Gabion walls built to last up to 80 years. Quote in 2 days or we pay you $500.*** (previous v2 headline)
2. **Retaining wall quote in 2 days, or we pay you $500.*** (promise only)
3. **WA homeowners: your retaining wall quote in 2 days, or we pay you $500.***
4. **Your wall quote in 2 days. Miss it, and we pay you $500.***
5. **Stop replacing retaining walls. Gabion walls built to last up to 80 years.** (sub: Quote in 2 days or we pay you $500.*)

Rules kept: "up to" always on the 80-year line (mesh coating's tested life, never a guarantee); one promise wording everywhere: "or we pay you $500", with the * linking to ../promise-terms/.

## 2. Proof layout (mobile order)
**Page 1 (v2/)**
1. Hero (plain 50/50 gabion | limestone split): wordmark logo (logo-wordmark.png; logo-icon.svg favicon) → ★ 5.0 on Google → headline "Quote in 2 days or we pay you $500.*" → "Limestone and Gabion walls for Perth and Bunbury homeowners" → "Gabion walls built to last up to 80 years." → Galfan-coated mesh BBA proof line + certificate link → "Built by Josh's crew. Backed by a 7-year workmanship warranty." → GET MY QUOTE IN 2 DAYS → or call 0458 740 333 → *Conditions apply. (All in the first 412×780 screen.)
2. 5.0 rating + promise-backing reviews: Craig Dixon (Western Australia, lead local review), then Sarah Wilson (communication, product knowledge, seamless install), then Ryan ("Quick response, accurate online quote"), then Nasir ("Quicker than expected").
3. Stat tiles: [walls built] · 50+ years combined experience.
4. Two ways to build it: Gabion card (Galfan-coated mesh, up to 80 years (BBA) · Modern rock look · Drains freely → ../v2-quiz/?type=gabion) and Limestone card (Engineered limestone block walls · Classic Perth look · Built by Josh's crew · Backed by our 7-year workmanship warranty → ../v2-quiz/?type=limestone). No limestone lifespan, stats or prices claimed.
5. Why gabion lasts: "Timber sleepers can rot." + Galfan mesh drains/flexes + BBA rating + certificate link. ("Concrete can crack" removed so nothing reads as a knock on limestone.)
6. Before/after [photo] + [result testimonial: wall size, price, time to quote].
7. Extra-mile story: Josh flew WA → Gympie QLD for Kristen (gate photo + her review).
8. Solid yellow $500 panel with a one-line summary of the terms + Conditions apply.
9. Final CTA + click-to-call.

**Page 2 (v2-quiz/)**
1. Brand + click-to-call (0458 740 333) → ★ 5.0 average on Google → Craig (WA) + Sarah → CTA → $500 panel with terms summary (complete enquiry incl. photo, 2 business days, paid on acceptance, Conditions apply) → Ryan + Nasir.
2. Quiz (plain split header): what are you after → wall type (gabion first) → size buckets + price-range anchor → details form.
3. Below the quiz: "We go the extra mile" Kristen card + Emma.

## 3. Quiz flow
1. What are you after? Retaining wall / Freestanding wall / Something else (→ details).
2. Wall type: Gabion / Limestone blocks / Quote me for both / Something else (→ details).
3. How big is it? Height: Under 1 m · 1–1.5 m · 1.5–2 m · 2 m+ · Not sure. Length: Under 10 m · 10–20 m · 20–40 m · 40 m+ · Not sure. Both are required ("Not sure" counts). Anchor: "Most walls land between [$ low] and [$ high] per metre, installed."
4. Where do we send your quote? Full name* · Phone* ("So we can confirm details. No spam.") · Email* · Site suburb or postcode* · Site photo* ("Add a photo of the site and we'll quote faster", matching the terms' complete-enquiry rule) · Description (optional). Button: GET MY QUOTE IN 2 DAYS.
5. Thank-you: name, promise line + Conditions apply → what happens next (3 steps) → more-photos prompt → Josh intro + [photo] → Call Josh 0458 740 333 → While you wait: [project gallery link].

Form behaviour is unchanged from faded-split (front end only, `preventDefault` → thank-you; nothing is wired to GHL). The height/length bucket picks are held in JS only. Map them to GHL fields when the automation is wired.
Preview hook: `?step=size|details|done` opens a step directly.

## 4. Top 3 A/B tests (priority order)
1. **Headline: promise + 80 years (V1) vs promise only (V2).** Hypothesis: for cold mobile traffic, the fast quote plus the cash promise is the clearest reason to click, so a promise-only headline will raise CTA click-through; V1 may win on lead quality because the 80-year line pre-sells gabion. Measure CTR and quiz-start rate, then qualified leads.
2. **Site photo required vs optional.** Hypothesis: a required photo cuts raw submits but raises quote-ready leads (and stops the 2-day clock disputes), giving more qualified leads per visitor. Measure submits, the share of leads that are quotable without a call-back, and the close rate.
3. **Price-range anchor shown vs hidden** (once real figures exist). Hypothesis: showing a per-metre range filters out tyre-kickers, so there will be fewer leads but a higher acceptance rate and lower cost per accepted quote.

## 5. Gabion vs limestone traffic split
- Keep `v2/` as the **gabion** page (80-year Galfan mesh angle, gabion photos and reviews).
- Clone it as `v2-limestone/` with its own headline (e.g. "Engineered limestone retaining walls. Quote in 2 days or we pay you $500.*"), limestone photos, limestone proof (no 80-year mesh claim on that page), and its own price anchor.
- Split at the ad level: separate ad sets with gabion vs limestone creative and audiences, each pointing at its own page, so CPL and quality can be compared per offer.
- Send limestone traffic to `v2-quiz/?type=limestone` (built: `?type=gabion` / `?type=limestone` pre-selects the wall type and skips step 2) so both pages share one form and one CRM pipeline.
- Keep "Quote me for both" in the quiz for undecided buyers.

## 6. Placeholders (all need Josh's input)
Filled 18 Oct 2026: phone 0458 740 333 (tel:+61458740333), email hello@gabionfabrication.com.au, service area "Perth and Bunbury regions", review count removed (shows "5.0 on Google"), "50+ years combined experience" tile, 80-year proof now links to the BBA certificate (https://cdn.shopify.com/s/files/1/0792/8630/5003/files/BBA_Certificate_-_Welded_Mesh_2.pdf?v=1787745102); proof line reads "Galfan-coated mesh, rated over 80 years in mild conditions by the British Board of Agrément (BBA)." Note: the certificate (holder Link Middle East Ltd) gives >80 years for Galfan in mild conditions for 4.0–5.0 mm wire (>70 years for 3.0 mm), Table 3. Confirm the supplied mesh matches.

Still open:
| Placeholder | Where |
|---|---|
| [PLACEHOLDER] walls built in WA | v2 stat tile |
| [PLACEHOLDER: before/after photo] | v2 Before & after |
| [PLACEHOLDER: result testimonial: wall size, price, time to quote] | v2 Before & after |
| [PLACEHOLDER: $ low] / [PLACEHOLDER: $ high] per metre (gabion) | v2-quiz size step |
| [PLACEHOLDER: Josh photo] | v2-quiz thank-you |
| [PLACEHOLDER: project gallery link] (href="#") | v2-quiz thank-you |

Copy for Josh to approve: the thank-you intro "G'day, I'm Josh. Thanks for reaching out. I'll look over your wall details and we'll have your quote to you within 2 business days." Also: the timber contrast line.
