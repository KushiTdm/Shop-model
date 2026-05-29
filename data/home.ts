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

/** Archétype produit (homme) : nom, catégorie, tags de filtrage et photo de mode. */
type Archetype = {
  name: Localized;
  category: Category;
  tags: string[];
  photo: string;
};

const ARCHETYPES: Archetype[] = [
  { name: { fr: "T-shirt imprimé", en: "Printed T-shirt" }, category: "clothing", tags: ["streetwear"], photo: "1521572163474-6864f9cf17ab" },
  { name: { fr: "Sneakers basses", en: "Low-top sneakers" }, category: "shoes", tags: ["streetwear", "sport"], photo: "1460353581641-37baddab0fa2" },
  { name: { fr: "Sweatshirt à capuche", en: "Hooded sweatshirt" }, category: "clothing", tags: ["streetwear", "sport"], photo: "1556821840-3a63f95609a7" },
  { name: { fr: "Chemise oxford", en: "Oxford shirt" }, category: "clothing", tags: ["luxury"], photo: "1596755094514-f87e34085b2c" },
  { name: { fr: "Pantalon chino", en: "Chino trousers" }, category: "clothing", tags: [], photo: "1473966968600-fa801b869a1a" },
  { name: { fr: "Veste légère", en: "Lightweight jacket" }, category: "clothing", tags: ["luxury"], photo: "1551028719-00167b16eac5" },
  { name: { fr: "Montre acier", en: "Steel watch" }, category: "accessories", tags: ["luxury"], photo: "1523275335684-37898b6baf30" },
  { name: { fr: "Polo coton piqué", en: "Piqué cotton polo" }, category: "clothing", tags: ["sport"], photo: "1586790170083-2f9ceadc732d" },
];
const BRANDS = ["HUGO", "Pier One", "Hackett", "Calvin Klein", "Nike", "PUMA", "Casio", "M&S"];
const PRICES = [29.95, 79.99, 59.0, 49.9, 69.5, 119.0, 149.0, 39.95];
const OLD_PRICES = [49.95, 99.99, 79.0, 69.9, 89.5, 149.0, 199.0, 59.95];

const makeProducts = (prefix: string, count = 8): Product[] =>
  Array.from({ length: count }).map((_, i) => {
    const a = ARCHETYPES[i % 8];
    const discounted = i % 3 === 0;
    return {
      id: `${prefix}-${i}`,
      brand: BRANDS[i % 8],
      name: a.name,
      price: PRICES[i % 8],
      oldPrice: discounted ? OLD_PRICES[i % 8] : undefined,
      discount: discounted ? 30 : undefined,
      image: img(a.photo),
      category: a.category,
      gender: "men",
      tags: a.tags,
      isNew: i % 4 < 2,
      secondhand: i % 5 === 0,
    };
  });

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
    products: makeProducts("hugo"),
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
    products: makeProducts("pierone"),
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
    products: makeProducts("hackett"),
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
    products: makeProducts("ck"),
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
    products: makeProducts("nike"),
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
    products: makeProducts("evening"),
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
