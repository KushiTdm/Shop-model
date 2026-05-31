import type { Localized } from "@/lib/i18n";

export type Category = "clothing" | "shoes" | "accessories";
export type Gender = "men" | "women" | "kids";

export type Product = {
  id: string;
  brand: string;
  name: Localized;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: Category;
  gender: Gender;
  tags: string[];
  isNew?: boolean;
  secondhand?: boolean;
};

export type HeroSection = {
  id: string;
  type: "hero";
  brand: string;
  label?: Localized;
  title: Localized;
  subtitle?: Localized;
  cta: Localized;
  image: string;
};

export type CarouselSection = {
  id: string;
  type: "carousel";
  title: Localized;
  subtitle?: Localized;
  cta?: Localized;
  products: Product[];
};

export type EditorialSection = {
  id: string;
  type: "editorial";
  title: Localized;
  subtitle?: Localized;
  cta?: Localized;
  items: { id: string; title: Localized; image: string }[];
};

export type Section = HeroSection | CarouselSection | EditorialSection;

/** Flash-promo banner + countdown configuration (editable from /admin). */
export type PromoConfig = {
  title: Localized;
  subtitle: Localized;
  cta: Localized;
  /** Countdown duration in hours from the moment the visitor loads the page. */
  countdownHours: number;
};

const img = (id: string, w = 600, h = 870) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/** Archétype produit (homme) : nom, catégorie, tags de filtrage, prix indicatif et photo. */
type Archetype = {
  name: Localized;
  category: Category;
  tags: string[];
  price: number;
  photo: string;
};

/**
 * Pool d'archétypes hommes — chaque entrée est associée à une photo Unsplash
 * *vérifiée* (le visuel correspond réellement au type d'article). `makeProducts`
 * en pioche un sous-ensemble décalé selon la section, de sorte que deux
 * carrousels n'affichent jamais exactement les mêmes visuels.
 */
const ARCHETYPES: Archetype[] = [
  // 0-4 — tee-shirts
  { name: { fr: "T-shirt col rond", en: "Crew-neck T-shirt" }, category: "clothing", tags: ["streetwear"], price: 24.95, photo: "1521572163474-6864f9cf17ab" },
  { name: { fr: "T-shirt imprimé", en: "Printed T-shirt" }, category: "clothing", tags: ["streetwear"], price: 29.95, photo: "1576566588028-4147f3842f27" },
  { name: { fr: "T-shirt premium", en: "Premium T-shirt" }, category: "clothing", tags: [], price: 34.95, photo: "1622519407650-3df9883f76a5" },
  { name: { fr: "T-shirt logo", en: "Logo T-shirt" }, category: "clothing", tags: ["streetwear"], price: 27.95, photo: "1583743814966-8936f5b7be1a" },
  { name: { fr: "T-shirt coton bio", en: "Organic cotton T-shirt" }, category: "clothing", tags: [], price: 22.95, photo: "1586790170083-2f9ceadc732d" },
  // 5-8 — chemises
  { name: { fr: "Chemise en chambray", en: "Chambray shirt" }, category: "clothing", tags: [], price: 59.0, photo: "1596755094514-f87e34085b2c" },
  { name: { fr: "Chemise à carreaux", en: "Checked shirt" }, category: "clothing", tags: ["streetwear"], price: 49.95, photo: "1607345366928-199ea26cfe3e" },
  { name: { fr: "Chemise habillée", en: "Dress shirt" }, category: "clothing", tags: ["luxury"], price: 69.0, photo: "1620012253295-c15cc3e65df4" },
  { name: { fr: "Chemise business", en: "Business shirt" }, category: "clothing", tags: ["luxury"], price: 79.0, photo: "1483118714900-540cf339fd46" },
  // 9-11 — maille
  { name: { fr: "Polo piqué", en: "Piqué polo" }, category: "clothing", tags: ["sport"], price: 45.0, photo: "1602810318383-e386cc2a3ccf" },
  { name: { fr: "Sweat col rond", en: "Crew sweatshirt" }, category: "clothing", tags: [], price: 55.0, photo: "1620799140408-edc6dcb6d633" },
  { name: { fr: "Sweat à capuche", en: "Hooded sweatshirt" }, category: "clothing", tags: ["streetwear", "sport"], price: 59.0, photo: "1556821840-3a63f95609a7" },
  // 12-15 — vestes
  { name: { fr: "Veste en cuir", en: "Leather jacket" }, category: "clothing", tags: ["luxury"], price: 199.0, photo: "1551028719-00167b16eac5" },
  { name: { fr: "Veste en jean", en: "Denim jacket" }, category: "clothing", tags: ["streetwear"], price: 89.0, photo: "1611312449408-fcece27cdbb7" },
  { name: { fr: "Blazer ajusté", en: "Tailored blazer" }, category: "clothing", tags: ["luxury"], price: 159.0, photo: "1594938298603-c8148c4dae35" },
  { name: { fr: "Costume deux pièces", en: "Two-piece suit" }, category: "clothing", tags: ["luxury"], price: 249.0, photo: "1617137968427-85924c800a22" },
  // 16-18 — bas
  { name: { fr: "Pantalon chino", en: "Chino trousers" }, category: "clothing", tags: [], price: 49.95, photo: "1473966968600-fa801b869a1a" },
  { name: { fr: "Jean slim", en: "Slim jeans" }, category: "clothing", tags: ["streetwear"], price: 69.95, photo: "1542272604-787c3835535d" },
  { name: { fr: "Jogging molleton", en: "Fleece joggers" }, category: "clothing", tags: ["sport"], price: 44.95, photo: "1594633312681-425c7b97ccd1" },
  // 19-23 — chaussures
  { name: { fr: "Sneakers basses", en: "Low-top sneakers" }, category: "shoes", tags: ["streetwear", "sport"], price: 79.99, photo: "1460353581641-37baddab0fa2" },
  { name: { fr: "Chaussures running", en: "Running shoes" }, category: "shoes", tags: ["sport"], price: 99.99, photo: "1542291026-7eec264c27ff" },
  { name: { fr: "Sneakers performance", en: "Performance sneakers" }, category: "shoes", tags: ["sport"], price: 119.0, photo: "1606107557195-0e29a4b5b4aa" },
  { name: { fr: "Sneakers blanches", en: "White sneakers" }, category: "shoes", tags: ["streetwear"], price: 89.99, photo: "1543508282-6319a3e2621f" },
  { name: { fr: "Bottines en cuir", en: "Leather boots" }, category: "shoes", tags: ["luxury"], price: 149.0, photo: "1542219550-37153d387c27" },
  // 24-26 — accessoires
  { name: { fr: "Montre acier", en: "Steel watch" }, category: "accessories", tags: ["luxury"], price: 149.0, photo: "1523275335684-37898b6baf30" },
  { name: { fr: "Casquette logo", en: "Logo cap" }, category: "accessories", tags: ["streetwear"], price: 24.95, photo: "1556306535-0f09a537f0a3" },
  { name: { fr: "Cravate en soie", en: "Silk tie" }, category: "accessories", tags: ["luxury"], price: 39.95, photo: "1598033129183-c4f50c736f10" },
];

/**
 * Sous-ensembles d'archétypes cohérents avec l'identité de chaque marque
 * sponsorisée (index dans ARCHETYPES). Les carrousels génériques utilisent
 * tout le pool via `ALL_IDX`.
 */
const BRAND_POOLS: Record<string, number[]> = {
  HUGO: [1, 2, 5, 7, 12, 14, 16, 17, 24],
  "Pier One": [0, 4, 6, 9, 10, 16, 17, 19, 25],
  Hackett: [5, 7, 8, 9, 14, 15, 16, 23, 24, 26],
  "Calvin Klein": [0, 2, 3, 10, 11, 17, 22, 24],
  Nike: [3, 11, 18, 19, 20, 21, 22, 25],
};
const ALL_IDX = ARCHETYPES.map((_, i) => i);

// Marques crédibles par type d'article, pour les carrousels « mixtes ».
const SPORT_BRANDS = ["Nike", "PUMA", "Adidas", "New Balance"];
const CASUAL_BRANDS = ["Vans", "Converse", "Pier One"];
const LUX_BRANDS = ["HUGO", "Calvin Klein", "Hackett", "BOSS"];
const STREET_BRANDS = ["Carhartt WIP", "Levi's", "Pier One", "Tommy Hilfiger"];
const BASIC_BRANDS = ["Pier One", "M&S", "Lacoste", "Tommy Hilfiger"];

const pickBrand = (a: Archetype, n: number): string => {
  if (a.category === "shoes") {
    const list = a.tags.includes("sport") ? SPORT_BRANDS : CASUAL_BRANDS;
    return list[n % list.length];
  }
  if (a.tags.includes("luxury")) return LUX_BRANDS[n % LUX_BRANDS.length];
  if (a.tags.includes("streetwear")) return STREET_BRANDS[n % STREET_BRANDS.length];
  return BASIC_BRANDS[n % BASIC_BRANDS.length];
};

// Hash déterministe d'un préfixe → décalage stable dans le pool (variété inter-sections).
const hashStr = (s: string): number => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const round95 = (n: number) => Math.round(n) - 0.05;

type MakeOpts = { brand?: string; pool?: number[] };

/**
 * Construit `count` produits pour une section. Le `prefix` détermine un décalage
 * déterministe dans le pool d'archétypes : chaque section affiche donc un jeu de
 * visuels distinct. `opts.brand` force une marque unique (carrousel sponsorisé),
 * `opts.pool` restreint les archétypes utilisés.
 */
const makeProducts = (prefix: string, count = 8, opts: MakeOpts = {}): Product[] => {
  const pool = opts.pool ?? ALL_IDX;
  const seedN = hashStr(prefix);
  const offset = seedN % pool.length;
  return Array.from({ length: count }).map((_, i) => {
    const a = ARCHETYPES[pool[(offset + i) % pool.length]];
    const discounted = (seedN + i) % 3 === 0;
    return {
      id: `${prefix}-${i}`,
      brand: opts.brand ?? pickBrand(a, seedN + i),
      name: a.name,
      price: discounted ? round95(a.price * 0.7) : a.price,
      oldPrice: discounted ? a.price : undefined,
      discount: discounted ? 30 : undefined,
      image: img(a.photo),
      category: a.category,
      gender: "men",
      tags: a.tags,
      isNew: (seedN + i) % 4 < 2,
      secondhand: (seedN + i) % 5 === 0,
    };
  });
};

/**
 * Catalogue femme & enfant — hors carrousels de la home, mais inclus dans
 * `allProducts` pour alimenter les onglets Femme/Enfant et les filtres.
 */
export const extraProducts: Product[] = [
  // Femme
  { id: "women-0", brand: "Mango", name: { fr: "Robe d'été", en: "Summer dress" }, price: 49.99, oldPrice: 69.99, discount: 28, image: img("1515372039744-b8f02a3ae446"), category: "clothing", gender: "women", tags: ["luxury"], isNew: true },
  { id: "women-1", brand: "COS", name: { fr: "Blouse fluide", en: "Flowy blouse" }, price: 39.9, image: img("1485462537746-965f33f7f6a7"), category: "clothing", gender: "women", tags: [], isNew: true },
  { id: "women-2", brand: "Levi's", name: { fr: "Jean slim", en: "Slim jeans" }, price: 89.0, image: img("1541099649105-f69ad21f3246"), category: "clothing", gender: "women", tags: ["streetwear"] },
  { id: "women-3", brand: "Jonak", name: { fr: "Escarpins cuir", en: "Leather heels" }, price: 119.0, oldPrice: 149.0, discount: 20, image: img("1543163521-1bf539c55dd2"), category: "shoes", gender: "women", tags: ["luxury"] },
  { id: "women-4", brand: "Mango", name: { fr: "Sac à main", en: "Handbag" }, price: 59.99, image: img("1584917865442-de89df76afd3"), category: "accessories", gender: "women", tags: ["luxury"], isNew: true },
  { id: "women-5", brand: "Hackett", name: { fr: "Manteau en laine", en: "Wool coat" }, price: 199.0, image: img("1539533018447-63fcce2678e3"), category: "clothing", gender: "women", tags: ["luxury"] },
  { id: "women-6", brand: "Nike", name: { fr: "Baskets blanches", en: "White sneakers" }, price: 99.99, image: img("1595950653106-6c9ebd614d3a"), category: "shoes", gender: "women", tags: ["sport", "streetwear"], isNew: true },
  { id: "women-7", brand: "Ray-Ban", name: { fr: "Lunettes de soleil", en: "Sunglasses" }, price: 129.0, image: img("1511499767150-a48a237f0083"), category: "accessories", gender: "women", tags: ["luxury"], secondhand: true },
  // Enfant
  { id: "kids-0", brand: "Petit Bateau", name: { fr: "T-shirt enfant", en: "Kids T-shirt" }, price: 14.99, image: img("1519457431-44ccd64a579b"), category: "clothing", gender: "kids", tags: [], isNew: true },
  { id: "kids-1", brand: "Name It", name: { fr: "Ensemble enfant", en: "Kids outfit" }, price: 29.9, oldPrice: 39.9, discount: 25, image: img("1503944583220-79d8926ad5e2"), category: "clothing", gender: "kids", tags: [] },
  { id: "kids-2", brand: "Nike", name: { fr: "Baskets enfant", en: "Kids sneakers" }, price: 44.99, image: img("1514989940723-e8e51635b782"), category: "shoes", gender: "kids", tags: ["sport"], isNew: true },
  { id: "kids-3", brand: "H&M", name: { fr: "Pull enfant", en: "Kids sweater" }, price: 19.99, image: img("1471286174890-9c112ffca5b4"), category: "clothing", gender: "kids", tags: [] },
  { id: "kids-4", brand: "Petit Bateau", name: { fr: "Veste enfant", en: "Kids jacket" }, price: 49.0, image: img("1503919545889-aef636e10ad4"), category: "clothing", gender: "kids", tags: [], secondhand: true },
];

export const defaultPromo: PromoConfig = {
  title: {
    fr: "Jusqu'à 40 % en plus|sur vos articles de seconde main",
    en: "Up to 40% more|on your pre-owned items",
  },
  subtitle: {
    fr: "Donnez une seconde vie à votre dressing.",
    en: "Give your wardrobe a second life.",
  },
  cta: { fr: "Je revends", en: "I sell" },
  countdownHours: 72,
};

export const sections: Section[] = [
  {
    id: "hero-hugo",
    type: "hero",
    brand: "HUGO",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "HUGO",
    subtitle: {
      fr: "La nouvelle collection Printemps-Été est arrivée",
      en: "The new Spring-Summer collection has arrived",
    },
    cta: { fr: "Découvrir", en: "Discover" },
    image: img("1490114538077-0a7f8cb49891", 1200, 700),
  },
  {
    id: "car-hugo",
    type: "carousel",
    title: { fr: "Sélection HUGO", en: "HUGO selection" },
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("hugo", 8, { brand: "HUGO", pool: BRAND_POOLS.HUGO }),
  },
  {
    id: "car-stories",
    type: "carousel",
    title: { fr: "Stories sur ModShop", en: "Stories on ModShop" },
    subtitle: { fr: "Best of de la semaine", en: "Best of the week" },
    cta: { fr: "Explorer", en: "Explore" },
    products: makeProducts("stories"),
  },
  {
    id: "hero-pierone",
    type: "hero",
    brand: "Pier One",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "Pier One",
    subtitle: {
      fr: "Essentiels intemporels à prix doux",
      en: "Timeless essentials at gentle prices",
    },
    cta: { fr: "Acheter", en: "Shop" },
    image: img("1483985988355-763728e1935b", 1200, 700),
  },
  {
    id: "car-pierone",
    type: "carousel",
    title: { fr: "Pier One — les indispensables", en: "Pier One — the essentials" },
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("pierone", 8, { brand: "Pier One", pool: BRAND_POOLS["Pier One"] }),
  },
  {
    id: "ed-boards",
    type: "editorial",
    title: { fr: "Explorer les tableaux", en: "Explore the boards" },
    cta: { fr: "Voir tous les tableaux", en: "See all boards" },
    items: [
      { id: "b1", title: "Streetwear", image: img("1517438476312-10d79c077509", 600, 600) },
      { id: "b2", title: { fr: "Total look noir", en: "All-black look" }, image: img("1539109136881-3be0616acf4b", 600, 600) },
      { id: "b3", title: { fr: "Vibes vacances", en: "Holiday vibes" }, image: img("1507680434567-5739c80be1ac", 600, 600) },
      { id: "b4", title: { fr: "Sneaker game", en: "Sneaker game" }, image: img("1556905055-8f358a7a47b2", 600, 600) },
      { id: "b5", title: "Workwear", image: img("1521119989659-a83eee488004", 600, 600) },
    ],
  },
  {
    id: "hero-hackett",
    type: "hero",
    brand: "Hackett London",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "Hackett London",
    subtitle: {
      fr: "Élégance britannique au quotidien",
      en: "British elegance for every day",
    },
    cta: { fr: "Découvrir", en: "Discover" },
    image: img("1488161628813-04466f872be2", 1200, 700),
  },
  {
    id: "car-hackett",
    type: "carousel",
    title: "Hackett London",
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("hackett", 8, { brand: "Hackett", pool: BRAND_POOLS.Hackett }),
  },
  {
    id: "hero-ck",
    type: "hero",
    brand: "Calvin Klein",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "Calvin Klein",
    subtitle: { fr: "Minimalisme américain", en: "American minimalism" },
    cta: { fr: "Découvrir", en: "Discover" },
    image: img("1485125639709-a60c3a500bf1", 1200, 700),
  },
  {
    id: "car-ck",
    type: "carousel",
    title: "Calvin Klein",
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("ck", 8, { brand: "Calvin Klein", pool: BRAND_POOLS["Calvin Klein"] }),
  },
  {
    id: "hero-nike",
    type: "hero",
    brand: "Nike",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "Nike Pegasus",
    subtitle: {
      fr: "La running pour tous les terrains",
      en: "Running for every terrain",
    },
    cta: { fr: "Découvrir", en: "Discover" },
    image: img("1571945153237-4929e783af4a", 1200, 700),
  },
  {
    id: "car-nike",
    type: "carousel",
    title: "Nike Pegasus",
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("nike", 8, { brand: "Nike", pool: BRAND_POOLS.Nike }),
  },
  {
    id: "hero-puma",
    type: "hero",
    brand: "PUMA",
    label: { fr: "Sponsorisé", en: "Sponsored" },
    title: "PUMA",
    subtitle: "Forever Faster",
    cta: { fr: "Découvrir", en: "Discover" },
    image: img("1517649763962-0c623066013b", 1200, 700),
  },
  {
    id: "car-gifts",
    type: "carousel",
    title: { fr: "Cadeaux d'anniversaire", en: "Birthday gifts" },
    subtitle: { fr: "Notre sélection coup de cœur", en: "Our favorite picks" },
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("gifts"),
  },
  {
    id: "ed-looks",
    type: "editorial",
    title: { fr: "Idées de looks", en: "Outfit ideas" },
    subtitle: { fr: "Adoptez le look", en: "Get the look" },
    cta: { fr: "Voir tous les looks", en: "See all looks" },
    items: [
      { id: "l1", title: { fr: "Look soirée", en: "Evening look" }, image: img("1492447166138-50c3889fccb1", 600, 800) },
      { id: "l2", title: { fr: "Look bureau", en: "Office look" }, image: img("1487222477894-8943e31ef7b2", 600, 800) },
      { id: "l3", title: { fr: "Look weekend", en: "Weekend look" }, image: img("1490578474895-699cd4e2cf59", 600, 800) },
      { id: "l4", title: { fr: "Look sport", en: "Sport look" }, image: img("1517466787929-bc90951d0974", 600, 800) },
    ],
  },
  {
    id: "car-evening",
    type: "carousel",
    title: { fr: "Looks de soirée", en: "Evening looks" },
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("evening", 8, { pool: [15, 14, 8, 7, 12, 26, 24, 2] }),
  },
  {
    id: "car-trends",
    type: "carousel",
    title: { fr: "Petit avant-goût", en: "A little preview" },
    subtitle: { fr: "Les tendances de demain", en: "Tomorrow's trends" },
    cta: { fr: "Voir plus", en: "See more" },
    products: makeProducts("trends"),
  },
];

export const brandList = [
  "Adidas", "Nike", "Puma", "Calvin Klein", "Tommy Hilfiger", "Levi's",
  "HUGO", "BOSS", "Lacoste", "Ralph Lauren", "Carhartt WIP", "Nudie Jeans",
  "Pier One", "Hackett", "Polo Ralph Lauren", "Vans", "Converse", "New Balance",
];

export const inspirationList: Localized[] = [
  { fr: "Tenues de mariage", en: "Wedding outfits" },
  { fr: "Idées cadeaux", en: "Gift ideas" },
  { fr: "Casual chic", en: "Smart casual" },
  "Streetwear",
  { fr: "Tenues de soirée", en: "Evening outfits" },
  { fr: "Mode bureau", en: "Office fashion" },
  { fr: "Vacances", en: "Holidays" },
  { fr: "Sport", en: "Sport" },
];

export const pickupStores = [
  "ModShop Paris — Rivoli",
  "ModShop Lyon — Part-Dieu",
  "ModShop Marseille — Prado",
  "ModShop Lille — Grand Place",
  "ModShop Bordeaux — Sainte-Catherine",
];
