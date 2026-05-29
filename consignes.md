J'ai analysé en détail la page d'accueil Homme de Zalando (structure DOM, design, comportement des carrousels et responsive sur mobile/tablette/desktop). Voici les consignes complètes pour la reproduire en Next.js.

# Reproduction de la page d'accueil Zalando Homme en Next.js

## 1. Vue d'ensemble & stack recommandée

Le site est une marketplace mode mobile-first, très épurée (fond blanc, texte noir, accents vert acide), avec une succession de carrousels horizontaux scrollables. Particularité importante : Zalando garde un **menu burger à toutes les tailles d'écran** (le menu catégories complet n'est jamais affiché en barre horizontale inline), et le contenu est **full-width sans conteneur centré à largeur max**.

Stack conseillée : Next.js 14+ (App Router), TypeScript, Tailwind CSS (idéal pour reproduire le système d'espacement et les breakpoints), et `next/image` pour les visuels. Vous pouvez ajouter Embla Carousel ou un simple conteneur `overflow-x-auto` + scroll-snap pour les carrousels.

## 2. Design tokens (couleurs, typographie, espacements)

Couleurs relevées sur le site :
- Fond principal : blanc `#FFFFFF`
- Texte / liens : noir `#000000`
- Vert promo (bannière principale) : `rgb(166,190,71)` ≈ `#A6BE47` (un dégradé vers `#C3E024` apparaît en haut)
- Vert secondaire/clair (zone compte à rebours) : `rgb(203,217,148)` ≈ `#CBD994`
- Gris clair (fond des blocs sponsorisés) : `rgb(239,239,240)` ≈ `#EFEFF0`
- Orange logo / accent (flèche play du logo, bouton outil) : ton orange Zalando `#FF6900` environ

Typographie : police maison **ZalandoSans** avec fallback `Helvetica, sans-serif`. Comme ZalandoSans est propriétaire, utilisez une alternative proche (Inter, Helvetica Neue, ou Geist). Les graisses observées vont de 400 (regular) à 520, 600, 650 (semi-bold). Tailles relevées : titres de sections 14–22px, prix 14–16px, corps 14px. Les `line-height` sont serrés (24px pour un titre 16px).

Configuration Tailwind suggérée :

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: { green: '#A6BE47', greenLight: '#CBD994', orange: '#FF6900' },
      surface: { gray: '#EFEFF0' },
    },
    fontFamily: { sans: ['ZalandoSans','Inter','Helvetica','sans-serif'] },
    fontWeight: { medium: '520', semibold: '600', bold: '650' },
  }
}
```

Notez l'absence de border-radius (`border-radius: 0px` partout) : les boutons, inputs et cartes sont à **angles droits**, ce qui fait partie de l'identité visuelle.

## 3. Breakpoints & comportement responsive

Zalando suit une approche mobile-first. Les breakpoints utiles à reproduire (alignés sur ce que j'ai observé et sur les standards proches du site) :

Sur mobile (≈ 360–599px) : header avec logo + icônes (langue/globe, compte, favoris, panier) et, en dessous, une ligne burger + champ de recherche pleine largeur. Le texte « FR » est masqué (seule l'icône globe reste). La bannière promo verte empile titre et sous-titre verticalement. Le bloc sponsorisé passe l'image en dessous du texte (layout colonne). Les cartes produits font environ 270px de large et défilent horizontalement.

Sur tablette (≈ 600–839px) : layout très proche du mobile, burger toujours présent, le champ de recherche s'élargit, les carrousels montrent plus de cartes.

Sur desktop (≥ 840px et au-delà) : le « FR » réapparaît à côté de l'icône globe, le header passe sur une logique plus large, le bloc sponsorisé HUGO passe en deux colonnes (texte à gauche, grande image à droite occupant ~50%), et les carrousels affichent plus de produits avec boutons de navigation « Suivant/Précédent ». Le contenu reste full-width (pas de `max-width` centrale ; `main` occupe toute la largeur).

Breakpoints Tailwind à définir : `sm: 600px`, `md: 840px`, `lg: 1024px`, `xl: 1280px`. Le passage clé desktop se situe autour de **840px** (apparition du « FR », passage des blocs éditoriaux en 2 colonnes).

## 4. Structure / arborescence des composants

L'arborescence de la page se décompose ainsi :

```
app/
  layout.tsx          → <Header/> ... {children} ... <Footer/>
  page.tsx            → composition de la home homme
components/
  header/
    Header.tsx          (logo, switch langue, icônes compte/favoris/panier)
    CategorySwitch.tsx   (pills Femme / Homme / Enfant)
    SearchBar.tsx        (burger + input "Rechercher" + icône loupe)
    BurgerMenu.tsx       (panneau latéral : Nouveautés, Vêtements, Chaussures,
                          Accessoires, Streetwear, Luxe & Créateurs, Sport,
                          Soin, Seconde-main, Petits prix)
    CartDrawer.tsx       (dialog "Votre panier est vide")
  promo/
    PromoBanner.tsx      (bannière verte "Jusqu'à 40% en plus" + CTA "Je revends")
    CountdownBar.tsx     (barre vert clair "Finit dans" + timer J/H/Min/Sec)
  brand/
    SponsoredHero.tsx    (bloc marque : label "Sponsorisé", titre, sous-titre,
                          CTA, grande image — HUGO, Pier One, Hackett, etc.)
  product/
    ProductCarousel.tsx  (titre section + flèche + liste scrollable)
    ProductCard.tsx      (image, coeur favori, marque, nom, prix)
  editorial/
    LookCarousel.tsx     ("Idées de looks", "Adoptez le look", tableaux)
    StoriesCarousel.tsx  ("Stories sur Zalando")
  AppPromo.tsx           (encart "Vous avez essayé notre appli ?")
  Newsletter.tsx         (form email + préférences radio/checkbox)
  seo/SeoTextBlocks.tsx  (titres + paragraphes SEO + listes de marques/liens)
  footer/Footer.tsx      (accordéons d'aide, liens légaux, QR app, réseaux sociaux)
  ui/BackToTop.tsx
```

Ordre des sections dans `page.tsx` (de haut en bas, tel qu'observé) : bannière promo verte → barre compte à rebours → hero sponsorisé HUGO → carrousel produits HUGO → carrousel « Stories sur Zalando / Best of de la semaine » → hero Pier One + carrousel → « Explorer les tableaux » → hero Hackett London + carrousel → encart App → hero Calvin Klein + carrousel → hero Havaianas → hero Nike Pegasus + carrousel → hero NikeCourt + carrousel → hero PUMA → hero Casio + carrousel → « Cadeaux d'anniversaire » + carrousel → « Idées de looks » → « Looks de soirée » + carrousel → « Adoptez le look / Les nouveautés » → hero M&S + carrousel → « Petit avant-goût / tendances de demain » → hero Emporio Armani + carrousel → blocs texte SEO → listes « Plus de marques » et « Plus d'inspiration » → newsletter → footer.

Le motif dominant et réutilisable est le couple **HeroMarque + ProductCarousel**, répété une dizaine de fois avec des données différentes. Construisez-le une fois, alimentez-le en props/data.

## 5. Composants clés en détail

Le **Header** (hauteur ~114px sur desktop) se compose d'une première ligne : logo Zalando à gauche (mot-symbole noir + triangle « play » orange), puis à droite le sélecteur de langue (« FR » + icône globe), icône compte, icône favoris (cœur), icône panier. Deuxième ligne : icône burger à gauche, puis champ de recherche pleine largeur avec placeholder « Rechercher » et icône loupe à droite. Input à fond transparent, **sans border-radius**, hauteur ~44px, avec un séparateur fin.

La **CategorySwitch** est un petit groupe de pills/onglets « Femme · Homme · Enfant » qui pilote la catégorie active.

La **PromoBanner** verte : pleine largeur, fond `#A6BE47`, titre en deux lignes (bold), sous-titre, et un lien CTA noir « Je revends → » avec flèche. Padding horizontal généreux.

La **CountdownBar** : bande vert clair `#CBD994`, libellé « Finit dans » à gauche, et à droite un timer décomposé en blocs `00 J · 14 H · 02 Min · 15 Sec` (chiffres en gras, unités en petit). À implémenter avec un `useEffect` + `setInterval` côté client.

Le **SponsoredHero** : sur fond gris clair `#EFEFF0`, libellé « Sponsorisé » (avec icône info) en petit, titre marque en gros (ex. « HUGO »), sous-titre, CTA texte avec flèche (« Découvrir → », « Acheter → »), et une grande image à droite. En mobile, image en dessous ; à partir de ~840px, deux colonnes 50/50.

La **ProductCard** (anatomie observée) : ratio image **~0.69 (portrait, env. 2:3)**, image en haut, icône cœur (favori) en overlay, puis sous l'image : nom de marque en `font-weight 650` / 14px, nom de l'article en 400 / 14px, prix en 16px. Cartes sans bordure ni radius. Largeur fluide selon le breakpoint (~270px mobile, ~180–220px desktop dans un carrousel). Gérez aussi un éventuel badge promo et un « prix de référence » barré (le site affiche « Prix de référence », « -30% », « Dernier prix le plus bas »).

Le **ProductCarousel** : un titre de section (souvent sur deux lignes, ex. « Stories sur Zalando » + sous-titre), un lien « Explorer / Voir plus », et une **liste en `display:flex` avec `overflow-x: scroll`** contenant les cartes ; boutons « Suivant »/« Précédent » sur desktop. Implémentation simple : `flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth` avec chaque carte en `snap-start`, en masquant la scrollbar.

La **Newsletter** : champ email, un groupe de boutons radio (Mode femme / Mode homme), une série de checkboxes de préférences (Alertes articles, Nouveautés mode, Mes marques, Recommandations, Stories, Promos, Sondages…), un bouton submit « Inscrivez-moi », et une mention légale avec liens vers la politique de confidentialité.

Le **Footer** : plusieurs colonnes/accordéons (Aide & Contact, Chèques cadeaux, Zalando, Modes de livraison, Moyens de paiement, Shopping facile, Nos services), chacun avec une icône et un titre repliable. En dessous : liens légaux (Mentions légales, Protection des données, CGV, Accessibilité, Cookies), un QR code de téléchargement d'app + liens iOS/Android, et les réseaux sociaux (TikTok, Facebook, Pinterest, Instagram). Les accordéons sont repliés sur mobile et dépliés/en colonnes sur desktop.

Ajoutez enfin un bouton **« Retour en haut »** flottant et, optionnellement, l'entrée « Assistant Zalando ».

## 6. Bonnes pratiques d'implémentation

Construisez d'abord les tokens (Tailwind config) puis le `ProductCard` et le `ProductCarousel` réutilisables, car ils structurent 80% de la page. Mockez les données dans un fichier `data/home.ts` (tableau de sections typé : `{ type: 'hero' | 'carousel', brand, title, subtitle, cta, image, products[] }`) et faites une boucle dans `page.tsx` pour rendre les sections dans l'ordre. Utilisez `next/image` avec `fill` + `sizes` pour les visuels responsive et respectez le ratio portrait des cartes via `aspect-[2/3]`. Pour le countdown et les carrousels interactifs, marquez les composants concernés en `"use client"`. Gardez l'esthétique : angles droits, beaucoup de blanc, hiérarchie typographique par la graisse plutôt que par la couleur, accents verts réservés aux bannières promo.

Quelques rappels : je n'ai pas reproduit les visuels ni les textes marketing de Zalando (contenu protégé) — utilisez vos propres images et libellés. Le rendu exact des breakpoints peut varier légèrement car la fenêtre du navigateur appliquait une mise à l'échelle ; je vous recommande de valider visuellement à 375, 768 et 1440px lors de l'intégration.
