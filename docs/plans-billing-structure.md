# Plans & Billing — Global Structure Spec

Status: Built · Last updated: 2026-06-02 (rev 2 — product is the top-level axis)
Owner: Pourav · Surface: Dashboard (ACCOUNT › Application › Plans & Billing)

> **Rev 2 change:** Product was promoted to the **high-level axis** (above the tabs).
> Each product now owns its own tab set and its own Billing — Billing is
> **per-product**, not unified (supersedes the rev 1 "unified billing" decision).

This spec defines how the App-global **Plans & Billing** page absorbs **AI Agent**
pricing alongside the existing **Chat** pricing, and is built to extend to other
products (Calling, Notifications) without a redesign.

---

## 1. Decision log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI Agent pricing scope | **Per-App (one shared pool)** | CometChat billing is App-centric. One AI plan + one credit pool for the whole App; per-agent usage rolls up as a breakdown, not separate billing. |
| Page location | **Single page**, ACCOUNT › Application › Plans & Billing | One global money surface, but organized by product inside. |
| Top-level axis | **Product** (Chat / AI Agents), above the tabs | "Product over everything" — each product scopes the whole view. |
| Tab sets | **Per-product** | Chat → Plans · Billing. AI Agents → Plans · Credits · Billing (Credits only for consumption products). |
| Billing | **Per-product** (rev 2) | Each product has its own Current plan / payment method / invoices / cancel. (Rev 1 had this unified; changed when product became the top-level axis.) |
| Plans organization | Cards per product's pricing model | Chat = MAU tiers; AI = credit plans. |

Out of scope for now (deferred): per-seat Chat team billing, tax/VAT handling,
proration math, multi-currency, real Stripe integration.

---

## 2. The two pricing models (why this needs structure)

CometChat sells two *kinds* of products, and the structure must hold both:

- **Subscription products** — priced by a capacity unit.
  - **Chat**: tiers by **MAU** (Basic $299 / Advanced $399 / Enterprise $999),
    Monthly/Yearly toggle, overages on MAU + concurrency.
- **Consumption products** — priced by **credits / usage**.
  - **AI Agents**: plans grant monthly **credits** (Web-only PAYG / Core $99 ·
    2,500 cr / Plus $999 · 25,000 cr / Done-for-you custom), top-ups @ $0.04/credit,
    auto top-up, trial = 1,000 credits / 11 days.
  - **Calling** (future): usage-based minutes — slots into the same Credits model.

The page separates **what you buy per product** (Plans, Credits) from **the one place
you pay** (Billing).

---

## 3. Information architecture

```
Plans & Billing
│
├── Product selector (high-level):  [ Chat & Messaging | AI Agents | (Calling…) ]
│
├── Chat & Messaging
│     ├── Plans   → 3 MAU-tier cards + Monthly/Yearly toggle + footer disclaimer
│     └── Billing → Advanced plan + stats, payment method, Chat invoices, cancel
│
└── AI Agents      (+ Demo-state switcher: trial active/ending/expired/paid)
      ├── Plans    → trial/credit banner + 4 credit-plan cards + toggle
      ├── Credits  → balance, plan-vs-top-up split, buy credits, auto top-up
      └── Billing  → trial OR Core plan, payment method, AI invoices, cancel
```

- **Product** is the top-level axis (purple-filled `ProductSwitcher`); **tabs**
  (underline) are sub-navigation that change per product.
- **Credits** tab only exists for consumption products (AI Agents now, Calling later).
- **Billing is per-product** — switching product switches the billing context.
  Switching to a product that lacks the active tab falls back to Plans.

---

## 4. Tab-by-tab behavior

### 4.1 Plans
- **Product switcher** (segmented pill, same component as the Plans/Billing tabs).
  Default to the product the customer most recently engaged; remember last choice.
- **Chat view** — unchanged: 3 cards, MAU slider, Monthly/Yearly, footer disclaimer.
- **AI Agents view**:
  - **Trial/credit banner** (when on trial): "Free Trial · ACTIVE · N days left",
    credits-used progress bar, "Upgrade plan" CTA. Mirrors agent-builder.
  - **4 cards**: Web-only (Pay-as-you-go, "Get started"), **Core** (Most Popular,
    purple border + ribbon, "$99/mo · 2,500 credits"), Plus ("$999/mo · 25,000
    credits"), Done-for-you (dark card, "Let's talk" / "Talk to sales").
  - Each card: icon tile, name, description, price, a **credits chip**
    (e.g. "2,500 Monthly Credits"), CTA, "What's included" / "Everything in X, plus".
  - Monthly/Yearly toggle drives the −20% annual pricing, shared with Chat.
  - "View full pricing details" external link below the grid.

### 4.2 Credits  (AI Agents)
- **Total credits available** hero: big number + HEALTHY/LOW status pill,
  "X from plan · Y from top-ups", stacked progress bar (plan vs top-up).
- Two stat cards: **Plan credits** (`used / allotment`, "Resets monthly") and
  **Top-up credits** (`balance / max`, "Never expire").
- **Buy credits**: rate line ($0.04/credit), quick-amount chips (100 / 200 / 500 /
  Max), amount input, live total, "Buy Now".
- **Auto top-up**: toggle + trigger threshold + top-up amount + "Save settings".
- Per-App pool; optional **per-agent usage breakdown** table (top consumers) since
  billing is App-level but spend originates per agent.

### 4.3 Billing  (unified)
- **Active subscriptions** card: one row per product —
  `Chat · Advanced · $399/mo` and `AI Agents · Core · $99/mo` — each with its own
  Change / Cancel. Replaces today's single-plan card.
- **Payment method** card: single card on file, Update.
- **Invoices** table: all products combined, each line labeled with the product
  ("Core plan · monthly", "Chat Advanced · annual"), status pill, Download.
- **Cancel subscription** per product row (keep-access-until date).

---

## 5. Prototype state switchers (top-right, prototype-only)

Reuse the SSO/Audit-Logs state-switcher pattern.
- **AI Agents billing states**: `Trial active` · `Trial ending` · `Trial expired` ·
  `Paid plan` (drives banner + Billing tab content).
- **Chat** keeps its free-tier banner as-is.

---

## 6. Data model (per-App, prototype-local state)

```
app.billing = {
  paymentMethod: { brand, last4, exp } | null,
  invoices: [ { date, product, plan, cycle, amount, status } ],
  chat:   { plan, mau, cycle: 'monthly'|'annual', renewsOn } | null,
  aiAgents: {
    plan: 'web-only'|'core'|'plus'|'done-for-you' | 'trial',
    cycle, renewsOn,
    trial: { active, daysLeft, creditsTotal, creditsUsed } | null,
    credits: {
      planAllotment, planUsed,            // resets monthly
      topUpBalance, topUpMax,             // never expire
      ratePerCredit: 0.04,
      autoTopUp: { enabled, threshold, amount }
    }
  } | null
}
```

---

## 7. Component reuse vs. new

**Reuse (existing prototype):**
- Segmented pill tabs (Plans/Credits/Billing + product switcher)
- Monthly/Yearly toggle, PlanCard scaffold, CheckCircle feature items
- State-switcher pattern (SSO), Invoices grid table, Toggle (auto top-up)

**New components:**
- `ProductSwitcher` (segmented, product-aware)
- `CreditPlanCard` (credits chip, dark "Done-for-you" variant)
- `TrialBanner` (progress bar + days-left)
- `CreditsTab` (balance hero, stat cards, Buy credits, Auto top-up)
- `SubscriptionRow` (per-product row in Billing)

---

## 8. Suggested build phases

1. **Plans · AI Agents view** — ProductSwitcher + 4 CreditPlanCards + TrialBanner.
   (Chat view already done.)
2. **Credits tab** — balance hero, stat cards, Buy credits, Auto top-up.
3. **Unified Billing** — multi-subscription rows + product-labeled invoices +
   AI billing state switcher.
4. **Polish** — tab-visibility rule, remember-last-product, per-agent usage breakdown.

Each phase is independently shippable and HMR-verifiable.

---

## 9. Open questions (non-blocking)

- Annual pricing for AI Agent plans — confirm the −20% applies to Core/Plus the
  same way Chat does (prototype assumes yes).
- Does the trial belong to the App or the first agent created? (Spec assumes App.)
- Should Chat's overage/usage ("Voice & Video charged separately") surface in the
  Credits tab as a usage line, or stay in Chat's footer only?
```
