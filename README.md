# ModShop — Boutique en ligne mode homme avec retrait en magasin

Reproduction du modèle de page d'accueil Zalando Homme en Next.js (App Router + TypeScript + Tailwind), avec une mise en avant du **retrait en magasin (Click & Collect)**.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

> Les images sont générées via `picsum.photos` (placeholders). Les marques et libellés sont fictifs.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — design tokens dans [tailwind.config.ts](tailwind.config.ts)
- **next/image** pour les visuels responsive

## Design tokens

| Token | Valeur |
|-------|--------|
| Vert promo | `#A6BE47` |
| Vert clair (compte à rebours) | `#CBD994` |
| Orange accent | `#FF6900` |
| Gris surface | `#EFEFF0` |
| Border-radius | `0px` (angles droits) |

Breakpoints : `sm: 600px`, `md: 840px`, `lg: 1024px`, `xl: 1280px`. Le passage desktop clé est à **840px** (apparition du « FR », heros en 2 colonnes).

## Structure

```
app/
  layout.tsx          → Providers + Header + {children} + Footer + BackToTop
  page.tsx            → composition de la home
  providers.tsx       → Language + Auth + Store (context)
  compte/page.tsx     → espace personnel (connexion, livraison/retrait)
  admin/page.tsx      → tableau de bord admin (CRUD promo + articles)
context/              → LanguageContext, AuthContext, StoreContext (localStorage)
lib/
  i18n.ts             → dictionnaire FR/EN + type Localized + helpers
components/
  home/HomeSections.tsx  → boucle data-driven sur le store
  header/             Header, Logo, CategorySwitch, SearchBar, BurgerMenu, CartDrawer, icons
  promo/              PromoBanner, CountdownBar
  brand/              SponsoredHero
  product/            ProductCard, ProductCarousel
  editorial/          EditorialCarousel
  footer/             Footer, StorePickupBanner
  seo/                SeoTextBlocks
  ui/                 BackToTop
  AppPromo.tsx, Newsletter.tsx
data/
  home.ts             → données mock typées (sections hero/carousel/editorial)
```

## Fonctionnalités

- **Traduction instantanée FR / EN** — bouton globe dans le header. La langue est mémorisée (`localStorage`) et appliquée sans rechargement. Le contenu de [data/home.ts](data/home.ts) est typé `Localized` (`string | { fr, en }`) ; l'UI passe par un dictionnaire dans [lib/i18n.ts](lib/i18n.ts).
- **Espace personnel** — `/compte`. Connexion mockée : **n'importe quel e-mail avec le mot de passe `123456`**. Une fois connecté, l'utilisateur choisit sa **livraison à domicile** ou son **retrait en boutique** (sélection du magasin).
- **Newsletter** — formulaire fonctionnel : les inscriptions (e-mail, préférences) sont enregistrées dans `localStorage` (`modshop_newsletter`).
- **Espace admin** — `/admin`, réservé à l'administrateur (`admin@modshop.fr` / `123456`). CRUD sur la **promo flash** (bannière + compte à rebours) et les **articles/prix**. Les modifications sont persistées et reflétées immédiatement sur la boutique.

> Aucun backend : tout l'état dynamique vit dans des React Context persistés en `localStorage` (voir `context/` et `app/providers.tsx`).

## Retrait en magasin

La fonctionnalité de Click & Collect est présente à plusieurs endroits :
- **StorePickupBanner** — section dédiée « Retrait en magasin gratuit » en 3 étapes
- **BurgerMenu** — entrée + encart d'explication
- **CartDrawer** — rappel du retrait gratuit dans le panier
- **Footer** — colonne dédiée

## Personnalisation

Modifiez [data/home.ts](data/home.ts) pour changer les sections, marques et produits par défaut (la « seed »). Le motif `Hero + Carousel` est entièrement piloté par les données. En ligne, les responsables peuvent aussi éditer promos et articles depuis `/admin` (les changements sont stockés en `localStorage` ; l'onglet **Réinitialiser** restaure la seed).
