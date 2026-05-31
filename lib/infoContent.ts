import type { Localized } from "@/lib/i18n";

/** A block of content inside an info article: an optional heading, paragraphs and/or bullets. */
export type InfoBlock = {
  heading?: Localized;
  paragraphs?: Localized[];
  bullets?: Localized[];
};

export type InfoArticle = {
  /** Small category label shown above the title. */
  eyebrow: Localized;
  title: Localized;
  blocks: InfoBlock[];
  /** Optional call-to-action (internal route or mailto). */
  cta?: { label: Localized; href: string };
};

/**
 * One footer page. `match` lists every label (FR + EN + language-neutral) that
 * should resolve to this article — the footer encodes the *translated* label in
 * the URL, so both variants must be registered.
 */
type Entry = { match: string[]; article: InfoArticle };

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

const EYEBROW = {
  help: { fr: "Aide & Contact", en: "Help & Contact" },
  pickup: { fr: "Retrait en magasin", en: "In-store pickup" },
  brand: { fr: "ModShop", en: "ModShop" },
  delivery: { fr: "Modes de livraison", en: "Delivery options" },
  payment: { fr: "Moyens de paiement", en: "Payment methods" },
  services: { fr: "Nos services", en: "Our services" },
  legal: { fr: "Informations légales", en: "Legal information" },
  social: { fr: "Réseaux sociaux", en: "Social media" },
} satisfies Record<string, Localized>;

const ENTRIES: Entry[] = [
  // ── Aide & Contact ───────────────────────────────────────────────
  {
    match: ["nous contacter", "contact us"],
    article: {
      eyebrow: EYEBROW.help,
      title: { fr: "Nous contacter", en: "Contact us" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Une question sur une commande, un produit ou le retrait en magasin ? Notre service client vous répond du lundi au samedi, de 9h à 19h.",
              en: "A question about an order, a product or in-store pickup? Our customer service is available Monday to Saturday, 9am to 7pm.",
            },
          ],
          bullets: [
            { fr: "E-mail : contact@modshop.fr", en: "Email: contact@modshop.fr" },
            { fr: "Téléphone : 01 23 45 67 89 (appel non surtaxé)", en: "Phone: +33 1 23 45 67 89 (standard rate)" },
            { fr: "Chat en ligne disponible depuis votre espace personnel", en: "Live chat available from your personal area" },
          ],
        },
      ],
      cta: { label: { fr: "Écrire un e-mail", en: "Send an email" }, href: "mailto:contact@modshop.fr" },
    },
  },
  {
    match: ["suivi de commande", "order tracking"],
    article: {
      eyebrow: EYEBROW.help,
      title: { fr: "Suivi de commande", en: "Order tracking" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Suivez l'avancement de votre commande à tout moment depuis votre espace personnel, rubrique « Mes commandes ».",
              en: "Track your order at any time from your personal area, under \"My orders\".",
            },
          ],
          bullets: [
            { fr: "Confirmée — paiement validé", en: "Confirmed — payment accepted" },
            { fr: "En préparation — vos articles sont rassemblés", en: "Preparing — your items are being gathered" },
            { fr: "Expédiée ou prête en boutique — vous recevez un e-mail", en: "Shipped or ready in store — you receive an email" },
          ],
        },
      ],
      cta: { label: { fr: "Accéder à mon espace", en: "Go to my area" }, href: "/compte" },
    },
  },
  {
    match: ["livraison & retours", "delivery & returns"],
    article: {
      eyebrow: EYEBROW.help,
      title: { fr: "Livraison & retours", en: "Delivery & returns" },
      blocks: [
        {
          heading: { fr: "Livraison", en: "Delivery" },
          paragraphs: [
            {
              fr: "Livraison standard sous 2 à 4 jours ouvrés (9,90 €, offerte dès 50 € d'achats). Retrait en magasin toujours gratuit.",
              en: "Standard delivery within 2 to 4 working days (€9.90, free over €50). In-store pickup is always free.",
            },
          ],
        },
        {
          heading: { fr: "Retours", en: "Returns" },
          paragraphs: [
            {
              fr: "Vous disposez de 30 jours pour retourner un article non porté. Le remboursement intervient sous 14 jours après réception du retour.",
              en: "You have 30 days to return an unworn item. Refunds are issued within 14 days of receiving the return.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["faq"],
    article: {
      eyebrow: EYEBROW.help,
      title: "FAQ",
      blocks: [
        {
          heading: { fr: "Comment modifier ma commande ?", en: "How do I change my order?" },
          paragraphs: [
            {
              fr: "Tant que la commande n'est pas expédiée, contactez le service client : nous ferons le nécessaire.",
              en: "As long as the order hasn't shipped, contact customer service and we'll take care of it.",
            },
          ],
        },
        {
          heading: { fr: "Le retrait en magasin est-il payant ?", en: "Is in-store pickup free?" },
          paragraphs: [
            { fr: "Non, le retrait en boutique est entièrement gratuit.", en: "No, in-store pickup is completely free." },
          ],
        },
        {
          heading: { fr: "Quels moyens de paiement acceptez-vous ?", en: "Which payment methods do you accept?" },
          paragraphs: [
            { fr: "Carte bancaire, PayPal, paiement en 3x et chèques cadeaux ModShop.", en: "Credit card, PayPal, pay-in-3 and ModShop gift cards." },
          ],
        },
      ],
    },
  },

  // ── Retrait en magasin ───────────────────────────────────────────
  {
    match: ["comment ça marche", "how it works"],
    article: {
      eyebrow: EYEBROW.pickup,
      title: { fr: "Comment ça marche", en: "How it works" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Le Click & Collect ModShop vous permet de commander en ligne et de récupérer vos articles gratuitement en boutique, en trois étapes.",
              en: "ModShop Click & Collect lets you order online and collect your items for free in store, in three steps.",
            },
          ],
          bullets: [
            { fr: "1. Commandez en ligne et choisissez « Retrait en magasin » au paiement.", en: "1. Order online and choose \"In-store pickup\" at checkout." },
            { fr: "2. Recevez un e-mail dès que la commande est prête.", en: "2. Receive an email as soon as the order is ready." },
            { fr: "3. Retirez gratuitement, essayez et retournez sur place si besoin.", en: "3. Collect for free, try on and return on site if needed." },
          ],
        },
      ],
    },
  },
  {
    match: ["trouver une boutique", "find a store"],
    article: {
      eyebrow: EYEBROW.pickup,
      title: { fr: "Trouver une boutique", en: "Find a store" },
      blocks: [
        {
          paragraphs: [
            { fr: "ModShop, c'est cinq boutiques en France, toutes équipées du retrait Click & Collect :", en: "ModShop has five stores across France, all offering Click & Collect pickup:" },
          ],
          bullets: [
            "ModShop Paris — Rivoli",
            "ModShop Lyon — Part-Dieu",
            "ModShop Marseille — Prado",
            "ModShop Lille — Grand Place",
            "ModShop Bordeaux — Sainte-Catherine",
          ],
        },
      ],
      cta: { label: { fr: "Choisir ma boutique de retrait", en: "Choose my pickup store" }, href: "/compte" },
    },
  },
  {
    match: ["horaires d'ouverture", "opening hours"],
    article: {
      eyebrow: EYEBROW.pickup,
      title: { fr: "Horaires d'ouverture", en: "Opening hours" },
      blocks: [
        {
          paragraphs: [
            { fr: "Nos boutiques vous accueillent aux horaires suivants :", en: "Our stores welcome you at the following hours:" },
          ],
          bullets: [
            { fr: "Lundi au vendredi : 10h – 20h", en: "Monday to Friday: 10am – 8pm" },
            { fr: "Samedi : 10h – 21h", en: "Saturday: 10am – 9pm" },
            { fr: "Dimanche : 11h – 19h (selon la boutique)", en: "Sunday: 11am – 7pm (varies by store)" },
          ],
        },
      ],
    },
  },
  {
    match: ["click & collect"],
    article: {
      eyebrow: EYEBROW.pickup,
      title: "Click & Collect",
      blocks: [
        {
          paragraphs: [
            {
              fr: "Le Click & Collect réunit le meilleur du web et de la boutique : vous commandez en ligne et récupérez gratuitement vos articles là où c'est pratique pour vous, souvent dès le lendemain.",
              en: "Click & Collect brings together the best of web and store: order online and collect your items for free wherever it suits you, often as soon as the next day.",
            },
          ],
          bullets: [
            { fr: "Retrait gratuit, sans minimum d'achat", en: "Free pickup, no minimum spend" },
            { fr: "Essayage et retour directement en boutique", en: "Try on and return directly in store" },
            { fr: "Articles conservés 14 jours", en: "Items held for 14 days" },
          ],
        },
      ],
    },
  },

  // ── ModShop (marque) ─────────────────────────────────────────────
  {
    match: ["à propos", "about"],
    article: {
      eyebrow: EYEBROW.brand,
      title: { fr: "À propos de ModShop", en: "About ModShop" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "ModShop est une enseigne de mode masculine qui réunit grandes marques, créateurs et essentiels intemporels, en ligne comme en boutique.",
              en: "ModShop is a men's fashion retailer bringing together major brands, designers and timeless essentials, online and in store.",
            },
            {
              fr: "Notre mission : rendre le shopping plus simple et plus responsable, grâce au retrait gratuit en magasin et à notre offre de seconde main.",
              en: "Our mission: make shopping simpler and more responsible, thanks to free in-store pickup and our pre-owned offer.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["carrières", "careers"],
    article: {
      eyebrow: EYEBROW.brand,
      title: { fr: "Carrières", en: "Careers" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Envie de rejoindre ModShop ? Nous recrutons régulièrement en boutique, en logistique et au siège (tech, marketing, achats).",
              en: "Want to join ModShop? We regularly hire in stores, logistics and at head office (tech, marketing, buying).",
            },
          ],
          bullets: [
            { fr: "Conseiller·ère de vente — toutes nos boutiques", en: "Sales advisor — all our stores" },
            { fr: "Préparateur·rice de commandes — entrepôt", en: "Order picker — warehouse" },
            { fr: "Candidatures spontanées : jobs@modshop.fr", en: "Open applications: jobs@modshop.fr" },
          ],
        },
      ],
      cta: { label: { fr: "Envoyer ma candidature", en: "Send my application" }, href: "mailto:jobs@modshop.fr" },
    },
  },
  {
    match: ["presse", "press"],
    article: {
      eyebrow: EYEBROW.brand,
      title: { fr: "Presse", en: "Press" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Journalistes et partenaires médias, retrouvez ici nos communiqués, visuels et contacts presse.",
              en: "Journalists and media partners, find our press releases, visuals and contacts here.",
            },
            { fr: "Contact presse : presse@modshop.fr", en: "Press contact: press@modshop.fr" },
          ],
        },
      ],
      cta: { label: { fr: "Contacter le service presse", en: "Contact the press office" }, href: "mailto:presse@modshop.fr" },
    },
  },
  {
    match: ["développement durable", "sustainability"],
    article: {
      eyebrow: EYEBROW.brand,
      title: { fr: "Développement durable", en: "Sustainability" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Nous nous engageons pour une mode plus durable, étape par étape.",
              en: "We are committed to more sustainable fashion, step by step.",
            },
          ],
          bullets: [
            { fr: "Une plateforme de seconde main intégrée au site", en: "A pre-owned platform built into the site" },
            { fr: "Des emballages réduits et recyclables", en: "Reduced, recyclable packaging" },
            { fr: "Le retrait en magasin pour limiter les livraisons", en: "In-store pickup to limit deliveries" },
          ],
        },
      ],
    },
  },

  // ── Modes de livraison ───────────────────────────────────────────
  {
    match: ["standard"],
    article: {
      eyebrow: EYEBROW.delivery,
      title: { fr: "Livraison standard", en: "Standard delivery" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Livraison à domicile en 2 à 4 jours ouvrés. 9,90 €, offerte dès 50 € d'achats en France métropolitaine.",
              en: "Home delivery within 2 to 4 working days. €9.90, free over €50 in mainland France.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["express"],
    article: {
      eyebrow: EYEBROW.delivery,
      title: { fr: "Livraison express", en: "Express delivery" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Recevez votre commande en 24 à 48h ouvrées. 14,90 €, pour toute commande validée avant 14h.",
              en: "Get your order within 24 to 48 working hours. €14.90, for any order placed before 2pm.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["point relais", "pickup point"],
    article: {
      eyebrow: EYEBROW.delivery,
      title: { fr: "Livraison en point relais", en: "Pickup point delivery" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Faites livrer votre commande dans le point relais de votre choix sous 3 à 5 jours ouvrés. 4,90 €, offert dès 50 € d'achats.",
              en: "Have your order delivered to the pickup point of your choice within 3 to 5 working days. €4.90, free over €50.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["retrait magasin", "in-store pickup"],
    article: {
      eyebrow: EYEBROW.delivery,
      title: { fr: "Retrait en magasin", en: "In-store pickup" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Commandez en ligne et récupérez gratuitement vos articles dans la boutique de votre choix, souvent dès le lendemain. Essayage et retour sur place.",
              en: "Order online and collect your items for free in the store of your choice, often as soon as the next day. Try on and return on site.",
            },
          ],
        },
      ],
      cta: { label: { fr: "Choisir ma boutique", en: "Choose my store" }, href: "/compte" },
    },
  },

  // ── Moyens de paiement ───────────────────────────────────────────
  {
    match: ["carte bancaire", "credit card"],
    article: {
      eyebrow: EYEBROW.payment,
      title: { fr: "Paiement par carte bancaire", en: "Credit card payment" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Nous acceptons Visa, Mastercard et American Express. Vos paiements sont sécurisés par protocole 3-D Secure.",
              en: "We accept Visa, Mastercard and American Express. Your payments are secured with 3-D Secure.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["paypal"],
    article: {
      eyebrow: EYEBROW.payment,
      title: "PayPal",
      blocks: [
        {
          paragraphs: [
            {
              fr: "Réglez en quelques clics avec votre compte PayPal, sans saisir vos coordonnées bancaires sur le site.",
              en: "Pay in a few clicks with your PayPal account, without entering your card details on the site.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["paiement en 3x", "pay in 3"],
    article: {
      eyebrow: EYEBROW.payment,
      title: { fr: "Paiement en 3x", en: "Pay in 3 instalments" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Réglez vos commandes de 100 € à 2 000 € en trois mensualités, par carte bancaire. Sans frais, sous réserve d'acceptation.",
              en: "Pay for orders from €100 to €2,000 in three monthly instalments by card. Fee-free, subject to acceptance.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["chèques cadeaux", "gift cards"],
    article: {
      eyebrow: EYEBROW.payment,
      title: { fr: "Chèques cadeaux", en: "Gift cards" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Offrez la carte cadeau ModShop, valable un an en ligne et en boutique, d'un montant de 20 € à 250 €.",
              en: "Give the ModShop gift card, valid for one year online and in store, from €20 to €250.",
            },
          ],
        },
      ],
    },
  },

  // ── Nos services ─────────────────────────────────────────────────
  {
    match: ["programme fidélité", "loyalty program"],
    article: {
      eyebrow: EYEBROW.services,
      title: { fr: "Programme fidélité", en: "Loyalty program" },
      blocks: [
        {
          paragraphs: [
            { fr: "Gratuit, le programme fidélité ModShop récompense chaque achat.", en: "Free of charge, the ModShop loyalty program rewards every purchase." },
          ],
          bullets: [
            { fr: "1 € dépensé = 1 point", en: "€1 spent = 1 point" },
            { fr: "Des bons de réduction dès 100 points", en: "Discount vouchers from 100 points" },
            { fr: "Ventes privées et avant-premières réservées aux membres", en: "Members-only private sales and previews" },
          ],
        },
      ],
      cta: { label: { fr: "Rejoindre le programme", en: "Join the program" }, href: "/compte" },
    },
  },
  {
    match: ["application mobile", "mobile app", "application"],
    article: {
      eyebrow: EYEBROW.services,
      title: { fr: "Application mobile", en: "Mobile app" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "L'application ModShop met toute la boutique dans votre poche : notifications de promos, suivi de commande et retrait en magasin simplifié.",
              en: "The ModShop app puts the whole store in your pocket: promo notifications, order tracking and simplified in-store pickup.",
            },
            { fr: "Disponible sur l'App Store et Google Play.", en: "Available on the App Store and Google Play." },
          ],
        },
      ],
    },
  },
  {
    match: ["guide des tailles", "size guide"],
    article: {
      eyebrow: EYEBROW.services,
      title: { fr: "Guide des tailles", en: "Size guide" },
      blocks: [
        {
          paragraphs: [
            { fr: "Trouvez votre taille idéale grâce à nos correspondances indicatives :", en: "Find your ideal size with our indicative conversions:" },
          ],
          bullets: [
            { fr: "Hauts : S (36-38), M (40-42), L (44-46), XL (48-50)", en: "Tops: S (36-38), M (40-42), L (44-46), XL (48-50)" },
            { fr: "Pantalons : indiquez votre tour de taille en cm (W) et longueur (L)", en: "Trousers: use your waist (W) and length (L) in inches" },
            { fr: "Chaussures : du 39 au 47, demi-pointures disponibles", en: "Shoes: EU 39 to 47, half sizes available" },
          ],
        },
      ],
    },
  },
  {
    match: ["seconde main", "pre-owned"],
    article: {
      eyebrow: EYEBROW.services,
      title: { fr: "Seconde main", en: "Pre-owned" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Donnez une seconde vie à votre dressing : vendez vos articles et profitez de pièces de seconde main vérifiées, jusqu'à 40 % moins cher.",
              en: "Give your wardrobe a second life: sell your items and shop verified pre-owned pieces, up to 40% cheaper.",
            },
          ],
          bullets: [
            { fr: "Mise en vente en quelques minutes", en: "List an item in minutes" },
            { fr: "Articles contrôlés par nos équipes", en: "Items checked by our teams" },
            { fr: "Paiement à l'expédition", en: "Payment on shipping" },
          ],
        },
      ],
    },
  },

  // ── Informations légales ─────────────────────────────────────────
  {
    match: ["mentions légales", "legal notice"],
    article: {
      eyebrow: EYEBROW.legal,
      title: { fr: "Mentions légales", en: "Legal notice" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Ce site est un projet de démonstration ModShop. Les sociétés, marques, prix et visuels présentés sont fictifs et n'ont aucune valeur contractuelle.",
              en: "This site is a ModShop demo project. The companies, brands, prices and visuals shown are fictional and have no contractual value.",
            },
            {
              fr: "Éditeur : ModShop (démo). Hébergement : Netlify. Directeur de la publication : l'équipe ModShop.",
              en: "Publisher: ModShop (demo). Hosting: Netlify. Publication director: the ModShop team.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["protection des données", "data protection"],
    article: {
      eyebrow: EYEBROW.legal,
      title: { fr: "Protection des données", en: "Data protection" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Nous traitons vos données personnelles dans le respect du RGPD, uniquement pour la gestion de votre compte et de vos commandes.",
              en: "We process your personal data in compliance with GDPR, solely to manage your account and orders.",
            },
            {
              fr: "Vous disposez d'un droit d'accès, de rectification et de suppression en écrivant à privacy@modshop.fr. (Site de démonstration : aucune donnée réelle n'est collectée.)",
              en: "You have the right to access, rectify and delete your data by writing to privacy@modshop.fr. (Demo site: no real data is collected.)",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["cgv", "terms"],
    article: {
      eyebrow: EYEBROW.legal,
      title: { fr: "Conditions générales de vente", en: "Terms & conditions" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Les présentes conditions encadrent les ventes réalisées sur ModShop : commande, prix, paiement, livraison, retrait en magasin et retours.",
              en: "These terms govern sales made on ModShop: ordering, pricing, payment, delivery, in-store pickup and returns.",
            },
            {
              fr: "Délai de rétractation de 30 jours. Site de démonstration : aucune transaction réelle n'est effectuée.",
              en: "30-day right of withdrawal. Demo site: no real transaction is carried out.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["accessibilité", "accessibility"],
    article: {
      eyebrow: EYEBROW.legal,
      title: { fr: "Accessibilité", en: "Accessibility" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Nous souhaitons rendre ModShop accessible au plus grand nombre : navigation au clavier, contrastes lisibles et textes alternatifs sur les images.",
              en: "We want to make ModShop accessible to as many people as possible: keyboard navigation, readable contrasts and alt text on images.",
            },
            {
              fr: "Une difficulté d'accès ? Écrivez-nous à accessibilite@modshop.fr.",
              en: "Having trouble accessing the site? Write to us at accessibility@modshop.fr.",
            },
          ],
        },
      ],
    },
  },
  {
    match: ["cookies"],
    article: {
      eyebrow: EYEBROW.legal,
      title: { fr: "Gestion des cookies", en: "Cookie management" },
      blocks: [
        {
          paragraphs: [
            {
              fr: "Nous utilisons des cookies pour assurer le fonctionnement du site et mesurer son audience. Vous pouvez les accepter ou les refuser à tout moment.",
              en: "We use cookies to run the site and measure its audience. You can accept or refuse them at any time.",
            },
            {
              fr: "Site de démonstration : seuls des cookies techniques (langue, panier) sont utilisés.",
              en: "Demo site: only technical cookies (language, cart) are used.",
            },
          ],
        },
      ],
    },
  },
];

// Réseaux sociaux : un article partagé, le titre reprend le nom du réseau.
const SOCIALS: Record<string, { fr: string; en: string }> = {
  tiktok: { fr: "TikTok", en: "TikTok" },
  facebook: { fr: "Facebook", en: "Facebook" },
  pinterest: { fr: "Pinterest", en: "Pinterest" },
  instagram: { fr: "Instagram", en: "Instagram" },
};

const socialArticle = (name: string): InfoArticle => ({
  eyebrow: EYEBROW.social,
  title: name,
  blocks: [
    {
      paragraphs: [
        {
          fr: `Retrouvez ModShop sur ${name} : nouveautés, looks, coulisses et offres exclusives.`,
          en: `Find ModShop on ${name}: new arrivals, looks, behind-the-scenes and exclusive offers.`,
        },
        {
          fr: "Suivez @modshop pour ne rien manquer.",
          en: "Follow @modshop so you don't miss a thing.",
        },
      ],
    },
  ],
});

const LOOKUP = new Map<string, InfoArticle>();
for (const e of ENTRIES) for (const m of e.match) LOOKUP.set(norm(m), e.article);
for (const key of Object.keys(SOCIALS)) {
  const s = SOCIALS[key];
  const article = socialArticle(s.fr);
  LOOKUP.set(norm(s.fr), article);
  LOOKUP.set(norm(s.en), article);
}

/** Resolve a footer topic (the decoded URL segment) to its article, or null. */
export function getInfoArticle(topic: string): InfoArticle | null {
  return LOOKUP.get(norm(topic)) ?? null;
}
