/**
 * Dictionnaires centralisés — FR (référence), EN, AR.
 * Aucune valeur technique (cotes, capacités, poids, e-mails) n'y figure :
 * seules les chaînes d'interface et de contenu éditorial sont traduites.
 */

export type Lang = "fr" | "en" | "ar";

export const LANGS: { code: Lang; short: string; name: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", short: "FR", name: "Français", dir: "ltr" },
  { code: "en", short: "EN", name: "English", dir: "ltr" },
  { code: "ar", short: "العربية", name: "العربية", dir: "rtl" },
];

export const DEFAULT_LANG: Lang = "fr";

type FormatCopy = {
  name: string;
  material: string;
  desc: string;
  use: string;
  source: string;
  neck: string;
};

const fr = {
  meta: {
    home: {
      title: "CARTHÉA — Huile d'olive vierge extra de Tunisie",
      description:
        "CARTHÉA capture l'âme de l'antique Carthage. Une huile d'olive vierge extra monovariétale, récoltée dans des vergers tunisiens millénaires.",
    },
    contact: {
      title: "Contact — CARTHÉA, huile d'olive de Tunisie",
      description:
        "Contactez CARTHÉA pour commander le millésime, une demande professionnelle ou une collaboration autour de notre huile d'olive tunisienne.",
    },
  },
  nav: {
    heritage: "L'Origine",
    gamme: "La Gamme",
    formats: "Les Formats",
    collection: "Millésime",
    contact: "Contact",
    main: "Navigation principale",
    mobile: "Navigation mobile",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    tagline: "Djebel Bargou, Siliana — Tunisie",
    language: "Langue",
  },
  hero: {
    label: "Tunisie · Djebel Bargou",
    title: ["L'or liquide du soleil ", "tunisien", "."] as [string, string, string],
    lead: "CARTHÉA capture l'âme de l'antique Carthage. Une huile d'olive vierge extra monovariétale, récoltée dans des vergers millénaires.",
    cta: "Découvrir le millésime",
    alt: "Les trois bouteilles CARTHÉA — Classique, Premium et 100% Bio, huile d'olive vierge extra",
  },
  heritage: {
    label: "Notre Héritage",
    title: "Enracinée dans la terre du Maghreb.",
    p1: "Chaque bouteille de CARTHÉA est le témoignage des oliviers Chemlali qui prospèrent dans le paysage aride tunisien depuis des siècles. Nos vergers sont entretenus à la main, dans le respect des rythmes des vents méditerranéens.",
    p2: "Nous croyons en la pureté de la première pression à froid. Pas d'assemblage, pas de compromis. Juste l'intensité poivrée brute et la finale beurrée du terroir le plus légendaire du monde.",
    alt: "Bouteilles CARTHÉA dans un verger d'oliviers tunisien",
  },
  gamme: {
    label: "La Gamme",
    title: "Trois expressions, un même terroir.",
    alt: "Bouteille Marasca CARTHÉA — étiquette {name}",
    items: {
      classique: {
        name: "Classique",
        palette: "Noir & Or",
        desc: "L'équilibre CARTHÉA. Fruité mûr, douceur ronde, parfaite pour la cuisine du quotidien.",
        labels: "Kosher · Halal · Produit de Tunisie",
      },
      premium: {
        name: "Premium",
        palette: "Vert & Or",
        desc: "Première pression à froid sélectionnée. Fruité vert intense, amertume noble, finale poivrée.",
        labels: "Kosher · Halal · Produit de Tunisie",
      },
      bio: {
        name: "100% Bio",
        palette: "Blanc & Vert",
        desc: "Issue de l'agriculture biologique certifiée Ecocert. Pureté végétale, notes d'herbe fraîche.",
        labels: "Certifié Ecocert TN-BIO-001 · Produit de Tunisie",
      },
    },
  },
  formats: {
    label: "Les Formats",
    title: "Du format d'apéritif au volume professionnel.",
    lead: "Chaque expression de la gamme CARTHÉA est proposée dans une gamme complète de conditionnements, pensée pour la table, la cuisine familiale et les besoins de la restauration et de l'industrie agroalimentaire.",
  },
  explorer: {
    stepLabel: "Étiquette",
    stepFormat: "Format",
    stepCapacity: "Contenance",
    stepDimensions: "Dimensions",
    capacityCount: "{n} contenances",
    bodyRound: "Corps",
    bodySection: "Section",
    height: "Hauteur totale",
    brimful: "Capacité ras bord",
    weight: "Poids à vide",
    mm: "mm",
    ml: "ml",
    g: "g",
    alt: "Emballage CARTHÉA {format} {capacity} — étiquette {label}",
    extras: {
      square: "Section carrée {a} × {b} mm",
      base: "Base Ø {a} mm",
      section: "Section {a} × {b} mm",
      body: "Corps {a} × {b} mm",
    },
    formats: {
      dorica: {
        name: "Bouteille Dorica",
        material: "Verre",
        desc: "La silhouette ronde et généreuse, typique des huiles d'olive de la Méditerranée. Solide et présente bien sur la table et en linéaire.",
        use: "Grande distribution · Caviste · Cadeau",
        source: "Cotes indicatives — fiche technique sur demande",
        neck: "Bague 31,5 Pilferproof",
      },
      marasca: {
        name: "Bouteille Marasca",
        material: "Verre",
        desc: "Ligne élancée et élégante, reconnue pour son style italien raffiné. Idéale pour les coffrets premium et les épiceries fines.",
        use: "Coffret · Épicerie fine · Premium",
        source: "Plans STV (Société Tunisienne de Verreries)",
        neck: "Bague Pilferproof 31,5 STD · débouchage Ø 20,6 mm",
      },
      biolio: {
        name: "Bouteille Biolio DOP/T",
        material: "Verre",
        desc: "Forme moderne et distincte, parfaitement adaptée aux gammes bio et aux coffrets découverte. Le format 100 ml est idéal pour les échantillons.",
        use: "Bio · Découverte · Échantillon · Cadeau",
        source: "Plans Vetreria Etrusca (Montelupo F.no, Italie)",
        neck: "Imboccatura BG 21 · Ø bague 30,4 mm · passage min. 16 mm",
      },
      bidon: {
        name: "Bidon Métallique",
        material: "Fer-blanc alimentaire",
        desc: "Protection optimale contre la lumière et l'oxygène. Format robuste pour une consommation quotidienne en cuisine ou en restauration.",
        use: "Restauration · Cuisine familiale · Professionnel",
        source: "Cotes indicatives — fiche technique sur demande",
        neck: "Bouchon à vis Ø 42 mm avec poignée",
      },
      pet: {
        name: "Bouteille PET",
        material: "PET alimentaire",
        desc: "Légèreté et résistance pour un usage pratique et une logistique simplifiée. Parfait pour les volumes et la grande consommation.",
        use: "Grande consommation · Restauration · Export",
        source: "Cotes indicatives — fiche technique sur demande",
        neck: "Bouchon à vis 38 mm · poignée intégrée",
      },
    } as Record<"dorica" | "marasca" | "biolio" | "bidon" | "pet", FormatCopy>,
  },
  millesime: {
    label: "Millésime",
    items: [
      {
        label: "Origine",
        title: "Djebel Bargou",
        desc: "Vergers d'altitude nichés dans les montagnes escarpées du Nord-Centrale de la Tunisie.",
      },
      {
        label: "Cépage",
        title: "Chemlali",
        desc: "Monocépage robuste reconnu pour sa haute teneur en polyphénols et sa longévité intense.",
      },
      {
        label: "Récolte",
        title: "Début Novembre",
        desc: "Cueillette à la main au summum de la maturité verte pour préserver le profil chlorophyllien vibrant.",
      },
      {
        label: "Dégustation",
        title: "Artichaut & Amande",
        desc: "Notes herbacées vives suivies d'une finale poivrée persistante et d'une texture soyeuse.",
      },
    ],
  },
  cta: {
    title: "Ramenez la Méditerranée chez vous.",
    order: "Commander la collection",
    trade: "Demande professionnelle",
  },
  footer: {
    tagline: "Huile d'olive vierge extra de Tunisie — Djebel Bargou, Siliana.",
    write: "Écrire",
    follow: "Suivre",
    rights: "© 2024 CARTHÉA Tunisie. Tous droits réservés.",
    origin: "Produit de Tunisie",
  },
  contact: {
    label: "Contact",
    title: "Parlons du millésime.",
    lead: "Commandes privées, distribution, presse ou visite des vergers du Djebel Bargou — nous répondons sous 48 heures.",
    orders: "Commandes",
    trade: "Professionnels",
    atelier: "Atelier",
    atelierValue: "Djebel Bargou, Siliana — Tunisie",
    thanks: "Merci, {name}.",
    thanksFallback: "à bientôt",
    sentNote: "Votre message est prêt à être envoyé depuis votre messagerie.",
    name: "Nom complet",
    email: "Adresse e-mail",
    message: "Votre message",
    send: "Envoyer",
    subject: "Demande CARTHÉA — {name}",
  },
};

export type Dict = typeof fr;

const en: Dict = {
  meta: {
    home: {
      title: "CARTHÉA — Extra Virgin Olive Oil from Tunisia",
      description:
        "CARTHÉA captures the soul of ancient Carthage. A single-varietal extra virgin olive oil, harvested from millennia-old Tunisian groves.",
    },
    contact: {
      title: "Contact — CARTHÉA, Olive Oil from Tunisia",
      description:
        "Contact CARTHÉA to order the vintage, for trade and distribution enquiries, or to discuss a collaboration around our Tunisian olive oil.",
    },
  },
  nav: {
    heritage: "Origin",
    gamme: "The Range",
    formats: "Formats",
    collection: "Vintage",
    contact: "Contact",
    main: "Main navigation",
    mobile: "Mobile navigation",
    open: "Open menu",
    close: "Close menu",
    tagline: "Djebel Bargou, Siliana — Tunisia",
    language: "Language",
  },
  hero: {
    label: "Tunisia · Djebel Bargou",
    title: ["Liquid gold from the ", "Tunisian", " sun."],
    lead: "CARTHÉA captures the soul of ancient Carthage. A single-varietal extra virgin olive oil, harvested from millennia-old groves.",
    cta: "Discover the vintage",
    alt: "The three CARTHÉA bottles — Classique, Premium and 100% Bio, extra virgin olive oil",
  },
  heritage: {
    label: "Our Heritage",
    title: "Rooted in the soil of the Maghreb.",
    p1: "Every bottle of CARTHÉA bears witness to the Chemlali olive trees that have thrived in Tunisia's arid landscape for centuries. Our groves are tended by hand, in step with the rhythms of the Mediterranean winds.",
    p2: "We believe in the purity of the first cold pressing. No blending, no compromise. Only the raw, peppery intensity and buttery finish of the world's most legendary terroir.",
    alt: "CARTHÉA bottles in a Tunisian olive grove",
  },
  gamme: {
    label: "The Range",
    title: "Three expressions, one terroir.",
    alt: "CARTHÉA Marasca bottle — {name} label",
    items: {
      classique: {
        name: "Classique",
        palette: "Black & Gold",
        desc: "The CARTHÉA balance. Ripe fruitiness and a rounded softness, ideal for everyday cooking.",
        labels: "Kosher · Halal · Product of Tunisia",
      },
      premium: {
        name: "Premium",
        palette: "Green & Gold",
        desc: "A selected first cold pressing. Intense green fruitiness, noble bitterness and a peppery finish.",
        labels: "Kosher · Halal · Product of Tunisia",
      },
      bio: {
        name: "100% Bio",
        palette: "White & Green",
        desc: "From Ecocert-certified organic farming. Vegetal purity with notes of fresh-cut grass.",
        labels: "Ecocert certified TN-BIO-001 · Product of Tunisia",
      },
    },
  },
  formats: {
    label: "Formats",
    title: "From tasting size to professional volume.",
    lead: "Every expression in the CARTHÉA range is available in a complete selection of packaging formats, designed for the table, family kitchens and the needs of foodservice and the food industry.",
  },
  explorer: {
    stepLabel: "Label",
    stepFormat: "Format",
    stepCapacity: "Capacity",
    stepDimensions: "Dimensions",
    capacityCount: "{n} sizes",
    bodyRound: "Body",
    bodySection: "Section",
    height: "Overall height",
    brimful: "Brimful capacity",
    weight: "Empty weight",
    mm: "mm",
    ml: "ml",
    g: "g",
    alt: "CARTHÉA packaging {format} {capacity} — {label} label",
    extras: {
      square: "Square section {a} × {b} mm",
      base: "Base Ø {a} mm",
      section: "Section {a} × {b} mm",
      body: "Body {a} × {b} mm",
    },
    formats: {
      dorica: {
        name: "Dorica Bottle",
        material: "Glass",
        desc: "The round, generous silhouette typical of Mediterranean olive oils. Sturdy, with strong presence on the table and on shelf.",
        use: "Retail · Specialist stores · Gifting",
        source: "Indicative dimensions — technical sheet on request",
        neck: "31.5 Pilferproof neck finish",
      },
      marasca: {
        name: "Marasca Bottle",
        material: "Glass",
        desc: "A slender, elegant line known for its refined Italian style. Ideal for premium gift boxes and fine food stores.",
        use: "Gift box · Fine foods · Premium",
        source: "STV drawings (Société Tunisienne de Verreries)",
        neck: "Pilferproof 31.5 STD neck finish · bore Ø 20.6 mm",
      },
      biolio: {
        name: "Biolio DOP/T Bottle",
        material: "Glass",
        desc: "A modern, distinctive shape perfectly suited to organic ranges and discovery sets. The 100 ml size is ideal for samples.",
        use: "Organic · Discovery · Sample · Gifting",
        source: "Vetreria Etrusca drawings (Montelupo F.no, Italy)",
        neck: "BG 21 finish · ring Ø 30.4 mm · min. bore 16 mm",
      },
      bidon: {
        name: "Metal Tin",
        material: "Food-grade tinplate",
        desc: "Optimal protection against light and oxygen. A robust format for everyday use in the kitchen or in foodservice.",
        use: "Foodservice · Family kitchen · Professional",
        source: "Indicative dimensions — technical sheet on request",
        neck: "Ø 42 mm screw cap with handle",
      },
      pet: {
        name: "PET Bottle",
        material: "Food-grade PET",
        desc: "Light and resistant, for practical use and simplified logistics. Ideal for volume and mass-market needs.",
        use: "Mass market · Foodservice · Export",
        source: "Indicative dimensions — technical sheet on request",
        neck: "38 mm screw cap · integrated handle",
      },
    },
  },
  millesime: {
    label: "Vintage",
    items: [
      {
        label: "Origin",
        title: "Djebel Bargou",
        desc: "High-altitude groves nestled in the rugged mountains of north-central Tunisia.",
      },
      {
        label: "Cultivar",
        title: "Chemlali",
        desc: "A robust single cultivar renowned for its high polyphenol content and remarkable longevity.",
      },
      {
        label: "Harvest",
        title: "Early November",
        desc: "Hand-picked at the peak of green ripeness to preserve a vibrant, chlorophyll-rich profile.",
      },
      {
        label: "Tasting",
        title: "Artichoke & Almond",
        desc: "Lively herbaceous notes followed by a lingering peppery finish and a silky texture.",
      },
    ],
  },
  cta: {
    title: "Bring the Mediterranean home.",
    order: "Order the collection",
    trade: "Trade enquiries",
  },
  footer: {
    tagline: "Extra virgin olive oil from Tunisia — Djebel Bargou, Siliana.",
    write: "Write",
    follow: "Follow",
    rights: "© 2024 CARTHÉA Tunisia. All rights reserved.",
    origin: "Product of Tunisia",
  },
  contact: {
    label: "Contact",
    title: "Let's talk about the vintage.",
    lead: "Private orders, distribution, press or a visit to the Djebel Bargou groves — we reply within 48 hours.",
    orders: "Orders",
    trade: "Trade",
    atelier: "Estate",
    atelierValue: "Djebel Bargou, Siliana — Tunisia",
    thanks: "Thank you, {name}.",
    thanksFallback: "see you soon",
    sentNote: "Your message is ready to send from your email client.",
    name: "Full name",
    email: "Email address",
    message: "Your message",
    send: "Send",
    subject: "CARTHÉA enquiry — {name}",
  },
};

const ar: Dict = {
  meta: {
    home: {
      title: "CARTHÉA — زيت زيتون بكر ممتاز من تونس",
      description:
        "تلتقط CARTHÉA روح قرطاج العريقة. زيت زيتون بكر ممتاز أحادي الصنف، يُقطف من بساتين تونسية عمرها آلاف السنين.",
    },
    contact: {
      title: "اتصل بنا — CARTHÉA، زيت زيتون من تونس",
      description:
        "تواصلوا مع CARTHÉA لطلب المحصول، أو لطلبات التوزيع والمحترفين، أو لبحث تعاون حول زيت الزيتون التونسي.",
    },
  },
  nav: {
    heritage: "الأصل",
    gamme: "التشكيلة",
    formats: "العبوات",
    collection: "المحصول",
    contact: "اتصل بنا",
    main: "التنقل الرئيسي",
    mobile: "قائمة الجوال",
    open: "فتح القائمة",
    close: "إغلاق القائمة",
    tagline: "جبل برقو، سليانة — تونس",
    language: "اللغة",
  },
  hero: {
    label: "تونس · جبل برقو",
    title: ["الذهب السائل من شمس ", "تونس", "."],
    lead: "تلتقط CARTHÉA روح قرطاج العريقة. زيت زيتون بكر ممتاز أحادي الصنف، يُقطف من بساتين عمرها آلاف السنين.",
    cta: "اكتشف المحصول",
    alt: "زجاجات CARTHÉA الثلاث — Classique وPremium و100% Bio، زيت زيتون بكر ممتاز",
  },
  heritage: {
    label: "إرثنا",
    title: "متجذّرة في أرض المغرب الكبير.",
    p1: "كل زجاجة من CARTHÉA شهادة على أشجار زيتون الشملالي التي تزدهر في المشهد التونسي القاحل منذ قرون. تُعتنى بساتيننا يدويًا، في احترام لإيقاع رياح المتوسط.",
    p2: "نؤمن بنقاء العصرة الأولى على البارد. لا مزج ولا تنازلات. فقط الحدّة الفلفلية الخام والقفلة الزبدية لأعرق أرضٍ في العالم.",
    alt: "زجاجات CARTHÉA في بستان زيتون تونسي",
  },
  gamme: {
    label: "التشكيلة",
    title: "ثلاثة تعابير، أرضٌ واحدة.",
    alt: "زجاجة ماراسكا CARTHÉA — ملصق {name}",
    items: {
      classique: {
        name: "Classique",
        palette: "أسود وذهبي",
        desc: "توازن CARTHÉA. فاكهية ناضجة ونعومة مستديرة، مثالية للمطبخ اليومي.",
        labels: "كوشير · حلال · منتج تونسي",
      },
      premium: {
        name: "Premium",
        palette: "أخضر وذهبي",
        desc: "عصرة أولى على البارد منتقاة. فاكهية خضراء مكثّفة، مرارة نبيلة وقفلة فلفلية.",
        labels: "كوشير · حلال · منتج تونسي",
      },
      bio: {
        name: "100% Bio",
        palette: "أبيض وأخضر",
        desc: "من زراعة عضوية معتمدة من Ecocert. نقاء نباتي مع نفحات العشب الطازج.",
        labels: "معتمد Ecocert TN-BIO-001 · منتج تونسي",
      },
    },
  },
  formats: {
    label: "العبوات",
    title: "من عبوة التذوّق إلى الحجم الاحترافي.",
    lead: "يتوفر كل تعبير من تشكيلة CARTHÉA في مجموعة كاملة من العبوات، صُمّمت للمائدة والمطبخ العائلي واحتياجات قطاع المطاعم والصناعات الغذائية.",
  },
  explorer: {
    stepLabel: "الملصق",
    stepFormat: "العبوة",
    stepCapacity: "السعة",
    stepDimensions: "الأبعاد",
    capacityCount: "{n} سعات",
    bodyRound: "القطر",
    bodySection: "المقطع",
    height: "الارتفاع الكلي",
    brimful: "السعة حتى الحافة",
    weight: "الوزن فارغًا",
    mm: "مم",
    ml: "مل",
    g: "غ",
    alt: "عبوة CARTHÉA {format} {capacity} — ملصق {label}",
    extras: {
      square: "مقطع مربّع {a} × {b} مم",
      base: "القاعدة Ø {a} مم",
      section: "المقطع {a} × {b} مم",
      body: "الجسم {a} × {b} مم",
    },
    formats: {
      dorica: {
        name: "زجاجة دوريكا",
        material: "زجاج",
        desc: "الشكل المستدير والسخي المميّز لزيوت الزيتون المتوسطية. متينة وذات حضور قوي على المائدة وفي الرفوف.",
        use: "التوزيع الكبير · المتاجر المتخصصة · الهدايا",
        source: "أبعاد إرشادية — البطاقة التقنية عند الطلب",
        neck: "عنق 31,5 Pilferproof",
      },
      marasca: {
        name: "زجاجة ماراسكا",
        material: "زجاج",
        desc: "خطّ رشيق وأنيق يُعرف بأسلوبه الإيطالي الراقي. مثالية لعلب الهدايا الفاخرة ومتاجر الأطعمة الراقية.",
        use: "علب الهدايا · الأطعمة الراقية · فاخر",
        source: "مخططات STV (الشركة التونسية للزجاج)",
        neck: "عنق Pilferproof 31,5 STD · فتحة Ø 20,6 مم",
      },
      biolio: {
        name: "زجاجة بيوليو DOP/T",
        material: "زجاج",
        desc: "شكل عصري ومميّز يناسب تمامًا التشكيلات العضوية وعلب الاكتشاف. حجم 100 مل مثالي للعينات.",
        use: "عضوي · اكتشاف · عيّنة · هدايا",
        source: "مخططات Vetreria Etrusca (مونتيلوبو فيورنتينو، إيطاليا)",
        neck: "فوهة BG 21 · قطر الحلقة Ø 30,4 مم · فتحة دنيا 16 مم",
      },
      bidon: {
        name: "عبوة معدنية",
        material: "صفيح غذائي",
        desc: "حماية مثلى من الضوء والأكسجين. عبوة متينة للاستعمال اليومي في المطبخ أو المطاعم.",
        use: "المطاعم · المطبخ العائلي · الاستعمال المهني",
        source: "أبعاد إرشادية — البطاقة التقنية عند الطلب",
        neck: "غطاء لولبي Ø 42 مم مع مقبض",
      },
      pet: {
        name: "زجاجة PET",
        material: "PET غذائي",
        desc: "خفيفة ومقاومة، لاستعمال عملي ولوجستيك مبسّط. مثالية للكميات الكبيرة والاستهلاك الواسع.",
        use: "الاستهلاك الواسع · المطاعم · التصدير",
        source: "أبعاد إرشادية — البطاقة التقنية عند الطلب",
        neck: "غطاء لولبي 38 مم · مقبض مدمج",
      },
    },
  },
  millesime: {
    label: "المحصول",
    items: [
      {
        label: "الأصل",
        title: "جبل برقو",
        desc: "بساتين مرتفعة تحتضنها الجبال الوعرة في الشمال الأوسط لتونس.",
      },
      {
        label: "الصنف",
        title: "شملالي",
        desc: "صنف أحادي متين يشتهر بمحتواه العالي من البوليفينول وثباته الاستثنائي.",
      },
      {
        label: "القطاف",
        title: "مطلع نوفمبر",
        desc: "قطاف يدوي في ذروة النضج الأخضر للحفاظ على نكهة نابضة غنية بالكلوروفيل.",
      },
      {
        label: "التذوّق",
        title: "خرشوف ولوز",
        desc: "نفحات عشبية حيوية تليها قفلة فلفلية طويلة وقوام حريري.",
      },
    ],
  },
  cta: {
    title: "أحضِر المتوسط إلى بيتك.",
    order: "اطلب المجموعة",
    trade: "طلبات المحترفين",
  },
  footer: {
    tagline: "زيت زيتون بكر ممتاز من تونس — جبل برقو، سليانة.",
    write: "راسلنا",
    follow: "تابعنا",
    rights: "© 2024 CARTHÉA تونس. جميع الحقوق محفوظة.",
    origin: "منتج تونسي",
  },
  contact: {
    label: "اتصل بنا",
    title: "لنتحدث عن المحصول.",
    lead: "طلبات خاصة، توزيع، صحافة أو زيارة بساتين جبل برقو — نردّ خلال 48 ساعة.",
    orders: "الطلبات",
    trade: "المحترفون",
    atelier: "الضيعة",
    atelierValue: "جبل برقو، سليانة — تونس",
    thanks: "شكرًا، {name}.",
    thanksFallback: "إلى اللقاء",
    sentNote: "رسالتك جاهزة للإرسال من تطبيق البريد الخاص بك.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    message: "رسالتك",
    send: "إرسال",
    subject: "طلب CARTHÉA — {name}",
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { fr, en, ar };

/** Remplace les {jetons} d'une chaîne. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
