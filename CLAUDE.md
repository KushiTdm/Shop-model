# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ModShop** — a single-page men's-fashion storefront homepage (Next.js 14 App Router + TypeScript + Tailwind). It reproduces the Zalando Homme homepage layout, adapted around a **Click & Collect / retrait en magasin** feature. All content is mock data; images are `picsum.photos` placeholders. UI copy is in French.

`consignes.md` is the original design brief (design tokens, breakpoints, component anatomy, section order) — consult it before changing layout/visuals.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint (eslint-config-next)
```

There is no test setup in this repo.

## Architecture

### Routes
- `/` ([app/page.tsx](app/page.tsx)) — the homepage. Fixed sections (`PromoBanner`, `CountdownBar`, `StorePickupBanner`, `SeoTextBlocks`, `Newsletter`) are placed directly; the data-driven middle is delegated to [components/home/HomeSections.tsx](components/home/HomeSections.tsx).
- `/compte` ([app/compte/page.tsx](app/compte/page.tsx)) — personal area: mock login, then delivery/in-store-pickup preferences.
- `/admin` ([app/admin/page.tsx](app/admin/page.tsx)) — admin dashboard (CRUD over flash promo + products/prices), gated to admin users.

### Client-state model (no backend)
There is no database or API. All dynamic state lives in **React Context providers persisted to `localStorage`**, composed in [app/providers.tsx](app/providers.tsx) and wrapped around everything in [app/layout.tsx](app/layout.tsx):

- **`LanguageContext`** (`modshop_lang`) — `lang` (`"fr"|"en"`), `setLang`/`toggle`, and the translation helpers `t(key)` (UI strings), `tx(localized)` (content), `price(n)` (locale currency). Consume via `useLanguage()`.
- **`AuthContext`** (`modshop_user`) — mock auth: `login(email, password)` accepts **any email with password `123456`** (see `MOCK_PASSWORD`); `admin@modshop.fr` becomes an admin (`isAdmin`). Also stores the user's delivery/pickup preference. Consume via `useAuth()`.
- **`StoreContext`** (`modshop_store`) — the editable catalog: `promo` config + `sections`, seeded by deep-cloning [data/home.ts](data/home.ts) on first load. Exposes CRUD (`updatePromo`, `updateProduct`, `deleteProduct`, `addProduct`, `reset`) and a flattened `allProducts`. Admin edits here flow straight to the homepage. Consume via `useStore()`.

**Hydration rule:** every provider initializes state to the static seed/defaults and only reads `localStorage` inside a `useEffect` after mount, so the first client render matches the server. Preserve this when adding state — do not read `localStorage` during render.

### i18n
[lib/i18n.ts](lib/i18n.ts) holds the FR/EN dictionaries (`t` keys) and the `Localized` type (`string | { fr, en }`). **Content** in [data/home.ts](data/home.ts) (titles, product names, etc.) is typed `Localized` and rendered through `tx()`; plain strings pass through untranslated. **UI chrome** strings live as dot-keys in the dictionary and render through `t()`. When adding visible text, add a key to *both* `fr` and `en` maps.

### Data-driven sections
The homepage middle maps over `sections` (from `useStore()`, not the static import) and dispatches by `type` discriminant: `hero`→`SponsoredHero`, `carousel`→`ProductCarousel`, `editorial`→`EditorialCarousel`. The dominant pattern is **Hero + Carousel repeated ~10×**. Each section needs a stable `id` (used as React key and as the admin CRUD target). A new section kind requires a union member in `Section`, a renderer, and a branch in `HomeSections`.

Components are grouped by domain under `components/` (`header/`, `promo/`, `brand/`, `product/`, `editorial/`, `footer/`, `seo/`, `ui/`, `home/`). Imports use the `@/*` alias (repo root). Most rendering components are now `"use client"` because they consume the language/store contexts.

Click & Collect appears in several places that must stay consistent if the feature changes: `StorePickupBanner`, `header/BurgerMenu`, `header/CartDrawer`, `footer/Footer`, and the delivery panel in `/compte`.

## Design system (enforced via tailwind.config.ts)

These are deliberate brand choices, not defaults — preserve them:

- **No border-radius**: all radius tokens (`sm`/`md`/`lg`/`xl`/`DEFAULT`) are `0px`; only `rounded-full` rounds. Right angles are part of the identity.
- **Custom colors**: `brand.green` `#A6BE47` (promo), `brand.greenLight` `#CBD994` (countdown), `brand.orange` `#FF6900` (accent), `surface.gray` `#EFEFF0` (sponsored blocks).
- **Custom font weights**: `medium: 520`, `semibold: 600`, `bold: 650`. Hierarchy is by weight, not color.
- **Custom breakpoints**: `sm: 600px`, `md: 840px`, `lg: 1024px`, `xl: 1280px`. The key desktop shift is **840px (`md`)** — "FR" appears in the header and hero/editorial blocks go to two columns. Layout is full-width (no centered max-width container).

Product cards are portrait `aspect-[2/3]`. Carousels are `flex overflow-x-auto` with scroll-snap, scrollbar hidden.

## Images

Remote images are restricted in [next.config.mjs](next.config.mjs) to `picsum.photos` and `images.unsplash.com`. Add any new image host there or `next/image` will throw. The `img(seed, w, h)` helper in `data/home.ts` builds placeholder URLs.
