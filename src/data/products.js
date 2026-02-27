export const products = [
  {
    id: "noir-absolu",
    name: "Noir Absolu",
    price: 285,
    category: "oriental",
    shortDescription: "A deep, resinous oriental with oud and dark amber. Unapologetically bold.",
    fullDescription: "Noir Absolu is the house’s signature statement: a dense, nocturnal oriental built around aged oud and dark amber. Black pepper and saffron open the composition; the heart rests on rose and leather; the base settles into patchouli, sandalwood, and musk. Worn by those who prefer presence over politeness.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c8fbcd1a1c67?w=800&q=80",
    ],
    craftsmanship: "Hand-finished in Grasse. Each bottle is filled and sealed by hand, then inspected before release.",
    careInstructions: "Store in a cool, dry place away from direct light. Keep the cap tightly closed. Avoid extreme temperatures to preserve the fragrance.",
    fragranceNotes: {
      top: ["Black pepper", "Saffron", "Bergamot"],
      heart: ["Rose", "Leather", "Oud"],
      base: ["Patchouli", "Sandalwood", "Musk", "Amber"],
    },
    size: "100 ml",
    longevity: "8–12 hours",
    occasion: "Evening, formal, cold weather",
    occasions: ["evening", "formal"],
  },
  {
    id: "blanc-de-lune",
    name: "Blanc de Lune",
    price: 245,
    category: "floral",
    shortDescription: "Moonlit white florals: tuberose, gardenia, and sheer musk. Ethereal and lasting.",
    fullDescription: "Blanc de Lune captures the idea of flowers under moonlight—cool, luminous, and slightly mysterious. Tuberose and gardenia lead, supported by jasmine and orange blossom; the base is a soft blend of white musk and cedar. Elegant without being heavy; suitable for day or night.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
    ],
    craftsmanship: "Composed with natural absolutes and isolates. Bottled in our atelier to ensure consistency and longevity.",
    careInstructions: "Store away from sunlight and heat. Keep the spray mechanism clean and dry. Best used within 24 months of opening.",
    fragranceNotes: {
      top: ["Orange blossom", "Neroli"],
      heart: ["Tuberose", "Gardenia", "Jasmine"],
      base: ["White musk", "Cedar", "Vanilla"],
    },
    size: "100 ml",
    longevity: "6–8 hours",
    occasion: "Day or evening, spring and summer, occasions where subtlety matters",
    occasions: ["day", "evening"],
  },
  {
    id: "bois-sacre",
    name: "Bois Sacré",
    price: 265,
    category: "woody",
    shortDescription: "Sacred woods: incense, vetiver, and cedar. Meditative and refined.",
    fullDescription: "Bois Sacré is built around the idea of sacred space—incense, aged woods, and clean vetiver. Frankincense and myrrh open; the heart is cedar and cypress; the base is vetiver, guaiac wood, and a touch of smoke. Unisex, contemplative, and distinctly non-sweet.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c8fbcd1a1c67?w=800&q=80",
    ],
    craftsmanship: "Wood and incense notes are macerated for six weeks before filtration. Bottles are hand-labelled.",
    careInstructions: "Store in a cool, dark place. Do not refrigerate. Replace cap after each use to maintain integrity.",
    fragranceNotes: {
      top: ["Frankincense", "Myrrh", "Cardamom"],
      heart: ["Cedar", "Cypress", "Incense"],
      base: ["Vetiver", "Guaiac wood", "Smoke accord"],
    },
    size: "100 ml",
    longevity: "7–10 hours",
    occasion: "Daily wear, creative work, autumn and winter",
    occasions: ["daily", "creative"],
  },
  {
    id: "ambre-solaire",
    name: "Ambre Solaire",
    price: 255,
    category: "oriental",
    shortDescription: "Sun-warmed amber with vanilla and tonka. Warm, enveloping, timeless.",
    fullDescription: "Ambre Solaire evokes amber warmed by the sun—rich, golden, and comforting. Cinnamon and clove introduce the scent; the heart blends amber, vanilla, and tonka; the base adds benzoin and a hint of labdanum. A classic oriental with modern clarity.",
    image: "https://images.unsplash.com/photo-1595425970377-c8fbcd1a1c67?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595425970377-c8fbcd1a1c67?w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    ],
    craftsmanship: "Amber and vanilla are aged before blending. Each batch is signed and dated on the packaging.",
    careInstructions: "Keep away from windows and radiators. Store upright. The fragrance will develop nuance with time if stored correctly.",
    fragranceNotes: {
      top: ["Cinnamon", "Clove", "Lemon"],
      heart: ["Amber", "Vanilla", "Tonka bean"],
      base: ["Benzoin", "Labdanum", "Musk"],
    },
    size: "100 ml",
    longevity: "8–10 hours",
    occasion: "Evening, travel, all seasons",
    occasions: ["evening", "travel"],
  },
  {
    id: "jardin-d-ombre",
    name: "Jardin d’Ombre",
    price: 235,
    category: "floral",
    shortDescription: "A shaded garden: green fig, iris, and moss. Cool, intellectual, understated.",
    fullDescription: "Jardin d’Ombre imagines a garden in shadow—fig leaves, damp earth, iris, and moss. The opening is green and slightly tart; the heart is powdery iris and violet leaf; the base is oakmoss and cedar. Refined and gender-neutral.",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    ],
    craftsmanship: "Green and floral notes are cold-pressed where possible. Bottles are filled in small batches.",
    careInstructions: "Store in a dry place. Avoid humidity. Cap tightly to prevent evaporation. Use within 18 months for best expression.",
    fragranceNotes: {
      top: ["Fig leaf", "Green accord", "Bergamot"],
      heart: ["Iris", "Violet leaf", "Lily of the valley"],
      base: ["Oakmoss", "Cedar", "Musk"],
    },
    size: "100 ml",
    longevity: "5–7 hours",
    occasion: "Office, daytime, spring and autumn",
    occasions: ["office", "day"],
  },
  {
    id: "cuir-noir",
    name: "Cuir Noir",
    price: 275,
    category: "leather",
    shortDescription: "Polished leather with birch and iris. Bold, modern, unmistakable.",
    fullDescription: "Cuir Noir is a contemporary leather: polished, not rugged. Birch tar and saffron open; the leather note is central, flanked by iris and violet; the base is suede, musk, and a touch of smoke. For those who want leather without vintage dust.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    ],
    craftsmanship: "Leather accord is built in-house from natural and synthetic materials. Bottles are hand-checked before dispatch.",
    careInstructions: "Store away from direct light. Do not shake. Spray on pulse points for best longevity. Keep cap on when not in use.",
    fragranceNotes: {
      top: ["Saffron", "Birch tar", "Bergamot"],
      heart: ["Leather", "Iris", "Violet"],
      base: ["Suede", "Musk", "Smoke"],
    },
    size: "100 ml",
    longevity: "8–10 hours",
    occasion: "Evening, creative settings, confident daily wear",
    occasions: ["evening", "creative", "daily"],
  },
  {
    id: "rose-de-silence",
    name: "Rose de Silence",
    price: 248,
    category: "floral",
    shortDescription: "A single rose in a stone courtyard. Minimal, poetic, long-lasting.",
    fullDescription: "Rose de Silence strips the rose to its essence: dewy, slightly green, with no syrup. Bulgarian rose and rose de Mai sit at the centre; peony and lychee add lift; the base is clean musk and white woods. For rose purists who dislike sweetness.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    ],
    craftsmanship: "Rose absolutes from Grasse and Bulgaria are blended in our lab. Minimal filtration for a true expression.",
    careInstructions: "Store in a cool place. Avoid contact with jewellery and fabrics when wet. Reapply as needed for full effect.",
    fragranceNotes: {
      top: ["Lychee", "Peony", "Green accord"],
      heart: ["Bulgarian rose", "Rose de Mai"],
      base: ["White musk", "Sandalwood", "Cedar"],
    },
    size: "100 ml",
    longevity: "6–8 hours",
    occasion: "Day or evening, spring and summer, romantic occasions",
    occasions: ["day", "evening", "romantic"],
  },
  {
    id: "encens-d-ete",
    name: "Encens d’Été",
    price: 258,
    category: "woody",
    shortDescription: "Summer incense: frankincense, lemon, and dry woods. Luminous and serene.",
    fullDescription: "Encens d’Été reimagines incense for warm weather—bright, airy, and resinous. Lemon and elemi open; frankincense and olibanum form the heart; the base is dry cedar and vetiver. Unusual and memorable.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c8fbcd1a1c67?w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    ],
    craftsmanship: "Incense and citrus are balanced in a dedicated process. Each bottle is quality-checked and sealed.",
    careInstructions: "Keep away from heat and moisture. Store in original packaging if possible. Use within 24 months of first use.",
    fragranceNotes: {
      top: ["Lemon", "Elemi", "Lavender"],
      heart: ["Frankincense", "Olibanum"],
      base: ["Cedar", "Vetiver", "Musk"],
    },
    size: "100 ml",
    longevity: "6–8 hours",
    occasion: "Daytime, warm weather, meditation or focus",
    occasions: ["day", "meditation"],
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "oriental", label: "Oriental" },
  { id: "floral", label: "Floral" },
  { id: "woody", label: "Woody" },
  { id: "leather", label: "Leather" },
];

export const occasionFilters = [
  { id: "all", label: "Any occasion" },
  { id: "evening", label: "Evening" },
  { id: "day", label: "Day" },
  { id: "office", label: "Office" },
  { id: "formal", label: "Formal" },
  { id: "travel", label: "Travel" },
  { id: "romantic", label: "Romantic" },
  { id: "creative", label: "Creative" },
  { id: "daily", label: "Daily wear" },
  { id: "meditation", label: "Meditation & focus" },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getFeaturedProductIds() {
  return ["noir-absolu", "blanc-de-lune", "bois-sacre", "ambre-solaire"];
}

export function getSimilarProducts(productId, limit = 4) {
  const current = products.find((p) => p.id === productId);
  if (!current) return [];
  return products
    .filter((p) => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}
