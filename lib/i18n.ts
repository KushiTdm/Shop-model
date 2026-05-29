export type Lang = "fr" | "en";

export const LANGS: Lang[] = ["fr", "en"];

/**
 * A piece of content that can be displayed in either language.
 * A plain string is treated as language-neutral (returned as-is by `tx`).
 */
export type Localized = string | { fr: string; en: string };

/** Pick the right variant of a Localized value for the active language. */
export function tx(value: Localized, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.fr ?? value.en ?? "";
}

/** Currency formatter aligned with the active language. */
export function formatPrice(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

type Dict = Record<string, string>;

const fr: Dict = {
  // Header
  "nav.language": "Choisir la langue",
  "nav.account": "Mon compte",
  "nav.favorites": "Mes favoris",
  "nav.cart": "Mon panier",
  "nav.admin": "Admin",
  "category.women": "Femme",
  "category.men": "Homme",
  "category.kids": "Enfant",
  "category.aria": "Catégories",
  "search.placeholder": "Rechercher",
  "search.run": "Lancer la recherche",
  "menu.open": "Ouvrir le menu",

  // Burger menu
  "menu.title": "Menu",
  "menu.close": "Fermer le menu",
  "menu.new": "Nouveautés",
  "menu.clothing": "Vêtements",
  "menu.shoes": "Chaussures",
  "menu.accessories": "Accessoires",
  "menu.streetwear": "Streetwear",
  "menu.luxury": "Luxe & Créateurs",
  "menu.sport": "Sport",
  "menu.care": "Soin",
  "menu.secondhand": "Seconde main",
  "menu.bargains": "Petits prix",
  "menu.accountLink": "Mon espace personnel",
  "menu.adminLink": "Espace admin",

  // Pickup
  "pickup.title": "Retrait en magasin",
  "pickup.menuText": "Commandez en ligne, récupérez vos articles en boutique gratuitement.",

  // Cart drawer
  "cart.title": "Votre panier",
  "cart.empty": "Votre panier est vide",
  "cart.emptyHint": "Parcourez nos catégories et trouvez votre prochain coup de cœur.",
  "cart.continue": "Continuer mes achats",
  "cart.pickupTitle": "Retrait gratuit en magasin",
  "cart.pickupHint": "Choisissez la livraison en point de retrait lors du paiement.",

  // Countdown
  "countdown.endsIn": "Finit dans",
  "countdown.days": "J",
  "countdown.hours": "H",
  "countdown.minutes": "Min",
  "countdown.seconds": "Sec",

  // Product
  "product.refPrice": "Prix de référence",
  "product.addFav": "Ajouter aux favoris",
  "product.removeFav": "Retirer des favoris",
  "carousel.prev": "Précédent",
  "carousel.next": "Suivant",

  // Product detail page
  "product.back": "Retour",
  "product.size": "Taille",
  "product.pickSize": "Veuillez sélectionner une taille.",
  "product.addToCart": "Ajouter au panier",
  "product.added": "Article ajouté au panier",
  "product.pickupDesc": "Récupérez cet article gratuitement dans la boutique de votre choix.",
  "product.related": "Vous aimerez aussi",
  "product.notFound": "Article introuvable",
  "product.notFoundHint": "Cet article n'existe pas ou n'est plus disponible.",

  // Category / listing page
  "category.items": "articles",
  "category.empty": "Pas d'articles disponibles pour le moment.",
  "category.filter": "Filtrer",
  "category.filterAll": "Tout",

  // Info placeholder page
  "info.demoTitle": "Page de démonstration",
  "info.demoBody": "Cette page fait partie d'un projet de démonstration ModShop. Le contenu de cette section n'est pas encore disponible, mais la navigation reste cohérente.",
  "info.back": "Retour à l'accueil",

  // Store pickup banner
  "store.title": "Retrait en magasin gratuit",
  "store.subtitle": "Commandez en ligne, récupérez vos articles dans la boutique de votre choix.",
  "store.step1Title": "1. Commandez en ligne",
  "store.step1Text": "Ajoutez vos articles au panier et sélectionnez « Retrait en magasin » au paiement.",
  "store.step2Title": "2. On vous prévient",
  "store.step2Text": "Vous recevez un e-mail dès que votre commande est prête à être retirée.",
  "store.step3Title": "3. Retirez gratuitement",
  "store.step3Text": "Présentez-vous en boutique avec votre confirmation. Essayage et retour sur place.",
  "store.cta": "Trouver une boutique près de chez moi",

  // SEO
  "seo.title": "La mode homme en ligne avec retrait en magasin",
  "seo.body": "Découvrez une sélection pointue de vêtements, chaussures et accessoires pour homme. Commandez en ligne et choisissez le retrait gratuit dans l'une de nos boutiques : vos articles vous attendent, prêts à essayer. Profitez des dernières tendances streetwear, des essentiels intemporels et des grandes marques au meilleur prix.",
  "seo.brands": "Plus de marques",
  "seo.inspiration": "Plus d'inspiration",

  // App promo
  "app.title": "Vous avez essayé notre appli ?",
  "app.text": "Notifications de promos, suivi de commande et retrait en magasin simplifié.",
  "app.download": "Télécharger l'appli",

  // Footer
  "footer.help": "Aide & Contact",
  "footer.pickup": "Retrait en magasin",
  "footer.brand": "ModShop",
  "footer.delivery": "Modes de livraison",
  "footer.payment": "Moyens de paiement",
  "footer.services": "Nos services",
  "footer.appTitle": "Téléchargez l'appli ModShop",
  "footer.legalNote": "Projet de démonstration. Marques et visuels fictifs.",

  // Newsletter
  "news.title": "Inscrivez-vous à la newsletter",
  "news.subtitle": "Recevez nos nouveautés, promos et conseils mode.",
  "news.success": "Merci ! Votre inscription a bien été prise en compte.",
  "news.email": "Votre adresse e-mail",
  "news.interestedIn": "Je suis intéressé(e) par",
  "news.modeWomen": "Mode femme",
  "news.modeMen": "Mode homme",
  "news.prefs": "Mes préférences",
  "news.submit": "Inscrivez-moi",
  "news.legal1": "En vous inscrivant, vous acceptez notre",
  "news.legal2": "politique de confidentialité",
  "news.legal3": ". Vous pouvez vous désinscrire à tout moment.",
  "news.pref.articles": "Alertes articles",
  "news.pref.new": "Nouveautés mode",
  "news.pref.brands": "Mes marques",
  "news.pref.reco": "Recommandations",
  "news.pref.stories": "Stories",
  "news.pref.promos": "Promos",
  "news.pref.surveys": "Sondages",

  // Back to top
  "backToTop": "Retour en haut",

  // Account
  "account.title": "Mon espace personnel",
  "account.subtitle": "Connectez-vous pour gérer votre livraison et le retrait en magasin.",
  "account.email": "Adresse e-mail",
  "account.password": "Mot de passe",
  "account.login": "Se connecter",
  "account.logout": "Se déconnecter",
  "account.hint": "Démo : mot de passe « 123456 ». Utilisez admin@modshop.fr pour l'accès admin.",
  "account.wrong": "Mot de passe incorrect. (Indice : 123456)",
  "account.welcome": "Bonjour",
  "account.deliveryTitle": "Livraison & retrait",
  "account.deliverySubtitle": "Choisissez comment recevoir vos commandes.",
  "account.optHome": "Livraison à domicile",
  "account.optHomeDesc": "Recevez vos articles chez vous sous 2 à 4 jours ouvrés.",
  "account.optPickup": "Retrait en magasin",
  "account.optPickupDesc": "Retrait gratuit en boutique dès que votre commande est prête.",
  "account.storeLabel": "Boutique de retrait",
  "account.save": "Enregistrer mes préférences",
  "account.saved": "Préférences enregistrées.",
  "account.adminCta": "Accéder à l'espace admin",

  // Admin
  "admin.title": "Espace administration",
  "admin.subtitle": "Gérez les promos flash, les articles et les prix de la boutique.",
  "admin.denied": "Accès réservé aux administrateurs.",
  "admin.goLogin": "Se connecter en admin",
  "admin.tabPromo": "Promo flash",
  "admin.tabArticles": "Articles & prix",
  "admin.tabReset": "Réinitialiser",
  "admin.promoHeading": "Bannière promo & compte à rebours",
  "admin.promoTitle": "Titre de la bannière",
  "admin.promoSubtitle": "Sous-titre",
  "admin.promoCta": "Texte du bouton",
  "admin.countdownHours": "Durée du compte à rebours (heures)",
  "admin.articlesHeading": "Articles en ligne",
  "admin.addArticle": "Ajouter un article",
  "admin.colBrand": "Marque",
  "admin.colName": "Nom",
  "admin.colPrice": "Prix",
  "admin.colOldPrice": "Prix barré",
  "admin.colDiscount": "Remise %",
  "admin.colActions": "Actions",
  "admin.delete": "Supprimer",
  "admin.save": "Enregistrer",
  "admin.saved": "Modifications enregistrées.",
  "admin.resetHeading": "Réinitialiser le catalogue",
  "admin.resetText": "Restaure les promos et articles d'origine (efface vos modifications).",
  "admin.resetBtn": "Tout réinitialiser",
  "admin.backHome": "Retour à la boutique",

  // Favoris
  "fav.title": "Mes coups de cœur",
  "fav.empty": "Votre liste de coups de cœur est vide",
  "fav.emptyHint": "Touchez le cœur d'un article pour l'ajouter ici.",
  "fav.count": "coup(s) de cœur",

  // Recherche
  "search.title": "Recherche",
  "search.resultsFor": "Résultats pour",
  "search.results": "résultat(s)",
  "search.noResults": "Aucun résultat pour votre recherche.",
  "search.noResultsHint": "Essayez un autre mot-clé ou parcourez nos catégories.",

  // Panier détaillé
  "cart.subtotal": "Sous-total",
  "cart.viewCart": "Voir le panier",
  "cart.checkout": "Finaliser ma commande",
  "cart.size": "Taille",
  "cart.qty": "Quantité",
  "cart.remove": "Retirer",
  "cart.added": "Ajouté au panier",

  // Page panier / commande
  "checkout.title": "Mon panier",
  "checkout.loginTitle": "Connexion",
  "checkout.loginHint": "Connectez-vous pour finaliser votre commande (démo : mot de passe 123456).",
  "checkout.loginCta": "Se connecter & continuer",
  "checkout.loggedAs": "Connecté en tant que",
  "checkout.deliveryTitle": "Mode de livraison",
  "checkout.home": "Livraison à domicile",
  "checkout.homeDesc": "9,90 € — réception sous 2 à 4 jours ouvrés.",
  "checkout.pickup": "Retrait en magasin",
  "checkout.pickupDesc": "Retrait gratuit dès que la commande est prête.",
  "checkout.addressTitle": "Adresse de livraison",
  "checkout.fullName": "Nom complet",
  "checkout.address": "Adresse",
  "checkout.zip": "Code postal",
  "checkout.city": "Ville",
  "checkout.storeLabel": "Boutique de retrait",
  "checkout.summary": "Récapitulatif",
  "checkout.shipping": "Livraison",
  "checkout.free": "Offerte",
  "checkout.pickupFree": "Gratuit",
  "checkout.freeOver": "Livraison gratuite en France métropolitaine dès 50 € d'achats.",
  "checkout.total": "Total",
  "checkout.confirm": "Confirmer la commande",
  "checkout.confirmedTitle": "Commande confirmée !",
  "checkout.confirmedHome": "Votre commande sera livrée à l'adresse indiquée.",
  "checkout.confirmedPickup": "Votre commande vous attendra en boutique :",
  "checkout.continueShopping": "Continuer mes achats",
};

const en: Dict = {
  "nav.language": "Choose language",
  "nav.account": "My account",
  "nav.favorites": "My favorites",
  "nav.cart": "My cart",
  "nav.admin": "Admin",
  "category.women": "Women",
  "category.men": "Men",
  "category.kids": "Kids",
  "category.aria": "Categories",
  "search.placeholder": "Search",
  "search.run": "Run search",
  "menu.open": "Open menu",

  "menu.title": "Menu",
  "menu.close": "Close menu",
  "menu.new": "New in",
  "menu.clothing": "Clothing",
  "menu.shoes": "Shoes",
  "menu.accessories": "Accessories",
  "menu.streetwear": "Streetwear",
  "menu.luxury": "Luxury & Designers",
  "menu.sport": "Sport",
  "menu.care": "Care",
  "menu.secondhand": "Pre-owned",
  "menu.bargains": "Bargains",
  "menu.accountLink": "My personal area",
  "menu.adminLink": "Admin area",

  "pickup.title": "In-store pickup",
  "pickup.menuText": "Order online, collect your items in store for free.",

  "cart.title": "Your cart",
  "cart.empty": "Your cart is empty",
  "cart.emptyHint": "Browse our categories and find your next favorite.",
  "cart.continue": "Continue shopping",
  "cart.pickupTitle": "Free in-store pickup",
  "cart.pickupHint": "Choose pickup-point delivery at checkout.",

  "countdown.endsIn": "Ends in",
  "countdown.days": "D",
  "countdown.hours": "H",
  "countdown.minutes": "Min",
  "countdown.seconds": "Sec",

  "product.refPrice": "Reference price",
  "product.addFav": "Add to favorites",
  "product.removeFav": "Remove from favorites",
  "carousel.prev": "Previous",
  "carousel.next": "Next",

  "product.back": "Back",
  "product.size": "Size",
  "product.pickSize": "Please select a size.",
  "product.addToCart": "Add to cart",
  "product.added": "Added to cart",
  "product.pickupDesc": "Collect this item for free in the store of your choice.",
  "product.related": "You may also like",
  "product.notFound": "Item not found",
  "product.notFoundHint": "This item doesn't exist or is no longer available.",

  "category.items": "items",
  "category.empty": "No items available right now.",
  "category.filter": "Filter",
  "category.filterAll": "All",

  "info.demoTitle": "Demo page",
  "info.demoBody": "This page is part of a ModShop demo project. This section's content isn't available yet, but navigation stays coherent.",
  "info.back": "Back to home",

  "store.title": "Free in-store pickup",
  "store.subtitle": "Order online, collect your items in the store of your choice.",
  "store.step1Title": "1. Order online",
  "store.step1Text": "Add your items to the cart and select \"In-store pickup\" at checkout.",
  "store.step2Title": "2. We notify you",
  "store.step2Text": "You get an email as soon as your order is ready for collection.",
  "store.step3Title": "3. Collect for free",
  "store.step3Text": "Come to the store with your confirmation. Try on and return on site.",
  "store.cta": "Find a store near me",

  "seo.title": "Men's fashion online with in-store pickup",
  "seo.body": "Discover a sharp selection of men's clothing, shoes and accessories. Order online and choose free pickup in one of our stores: your items are waiting, ready to try on. Enjoy the latest streetwear trends, timeless essentials and major brands at the best price.",
  "seo.brands": "More brands",
  "seo.inspiration": "More inspiration",

  "app.title": "Have you tried our app?",
  "app.text": "Promo notifications, order tracking and simplified in-store pickup.",
  "app.download": "Download the app",

  "footer.help": "Help & Contact",
  "footer.pickup": "In-store pickup",
  "footer.brand": "ModShop",
  "footer.delivery": "Delivery options",
  "footer.payment": "Payment methods",
  "footer.services": "Our services",
  "footer.appTitle": "Download the ModShop app",
  "footer.legalNote": "Demo project. Fictional brands and visuals.",

  "news.title": "Sign up to the newsletter",
  "news.subtitle": "Get our new arrivals, deals and style tips.",
  "news.success": "Thank you! Your subscription has been registered.",
  "news.email": "Your email address",
  "news.interestedIn": "I'm interested in",
  "news.modeWomen": "Women's fashion",
  "news.modeMen": "Men's fashion",
  "news.prefs": "My preferences",
  "news.submit": "Sign me up",
  "news.legal1": "By signing up, you accept our",
  "news.legal2": "privacy policy",
  "news.legal3": ". You can unsubscribe at any time.",
  "news.pref.articles": "Item alerts",
  "news.pref.new": "New in fashion",
  "news.pref.brands": "My brands",
  "news.pref.reco": "Recommendations",
  "news.pref.stories": "Stories",
  "news.pref.promos": "Deals",
  "news.pref.surveys": "Surveys",

  "backToTop": "Back to top",

  "account.title": "My personal area",
  "account.subtitle": "Sign in to manage your delivery and in-store pickup.",
  "account.email": "Email address",
  "account.password": "Password",
  "account.login": "Sign in",
  "account.logout": "Sign out",
  "account.hint": "Demo: password \"123456\". Use admin@modshop.fr for admin access.",
  "account.wrong": "Wrong password. (Hint: 123456)",
  "account.welcome": "Hello",
  "account.deliveryTitle": "Delivery & pickup",
  "account.deliverySubtitle": "Choose how to receive your orders.",
  "account.optHome": "Home delivery",
  "account.optHomeDesc": "Get your items at home within 2 to 4 working days.",
  "account.optPickup": "In-store pickup",
  "account.optPickupDesc": "Free in-store collection as soon as your order is ready.",
  "account.storeLabel": "Pickup store",
  "account.save": "Save my preferences",
  "account.saved": "Preferences saved.",
  "account.adminCta": "Go to admin area",

  "admin.title": "Administration area",
  "admin.subtitle": "Manage flash deals, articles and store prices.",
  "admin.denied": "Admin access only.",
  "admin.goLogin": "Sign in as admin",
  "admin.tabPromo": "Flash deal",
  "admin.tabArticles": "Articles & prices",
  "admin.tabReset": "Reset",
  "admin.promoHeading": "Promo banner & countdown",
  "admin.promoTitle": "Banner title",
  "admin.promoSubtitle": "Subtitle",
  "admin.promoCta": "Button text",
  "admin.countdownHours": "Countdown duration (hours)",
  "admin.articlesHeading": "Online articles",
  "admin.addArticle": "Add an article",
  "admin.colBrand": "Brand",
  "admin.colName": "Name",
  "admin.colPrice": "Price",
  "admin.colOldPrice": "Old price",
  "admin.colDiscount": "Discount %",
  "admin.colActions": "Actions",
  "admin.delete": "Delete",
  "admin.save": "Save",
  "admin.saved": "Changes saved.",
  "admin.resetHeading": "Reset catalog",
  "admin.resetText": "Restores the original deals and articles (clears your changes).",
  "admin.resetBtn": "Reset everything",
  "admin.backHome": "Back to shop",

  // Favorites
  "fav.title": "My favorites",
  "fav.empty": "Your favorites list is empty",
  "fav.emptyHint": "Tap the heart on an item to add it here.",
  "fav.count": "favorite(s)",

  // Search
  "search.title": "Search",
  "search.resultsFor": "Results for",
  "search.results": "result(s)",
  "search.noResults": "No results for your search.",
  "search.noResultsHint": "Try another keyword or browse our categories.",

  // Detailed cart
  "cart.subtotal": "Subtotal",
  "cart.viewCart": "View cart",
  "cart.checkout": "Checkout",
  "cart.size": "Size",
  "cart.qty": "Quantity",
  "cart.remove": "Remove",
  "cart.added": "Added to cart",

  // Cart / checkout page
  "checkout.title": "My cart",
  "checkout.loginTitle": "Sign in",
  "checkout.loginHint": "Sign in to complete your order (demo: password 123456).",
  "checkout.loginCta": "Sign in & continue",
  "checkout.loggedAs": "Signed in as",
  "checkout.deliveryTitle": "Delivery method",
  "checkout.home": "Home delivery",
  "checkout.homeDesc": "€9.90 — delivered within 2 to 4 working days.",
  "checkout.pickup": "In-store pickup",
  "checkout.pickupDesc": "Free collection as soon as your order is ready.",
  "checkout.addressTitle": "Delivery address",
  "checkout.fullName": "Full name",
  "checkout.address": "Address",
  "checkout.zip": "Postcode",
  "checkout.city": "City",
  "checkout.storeLabel": "Pickup store",
  "checkout.summary": "Summary",
  "checkout.shipping": "Shipping",
  "checkout.free": "Free",
  "checkout.pickupFree": "Free",
  "checkout.freeOver": "Free shipping in mainland France over €50.",
  "checkout.total": "Total",
  "checkout.confirm": "Confirm order",
  "checkout.confirmedTitle": "Order confirmed!",
  "checkout.confirmedHome": "Your order will be delivered to the address provided.",
  "checkout.confirmedPickup": "Your order will be waiting for you in store:",
  "checkout.continueShopping": "Continue shopping",
};

export const dictionaries: Record<Lang, Dict> = { fr, en };

export function translate(lang: Lang, key: string): string {
  return dictionaries[lang][key] ?? dictionaries.fr[key] ?? key;
}
