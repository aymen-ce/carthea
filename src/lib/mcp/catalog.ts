// Public CARTHÉA catalogue data shared by the MCP tools.
// Mirrors the packaging data shown on the website (src/components/FormatExplorer.tsx).

export type VariantId = "classique" | "premium" | "bio";

export const VARIANTS: { id: VariantId; name: string; palette: string; certifications: string[] }[] = [
  { id: "classique", name: "Classique", palette: "Noir & Or", certifications: ["Kosher", "Halal"] },
  { id: "premium", name: "Premium", palette: "Vert & Or", certifications: ["Kosher", "Halal"] },
  { id: "bio", name: "100% Bio", palette: "Blanc & Vert", certifications: ["Ecocert", "Kosher", "Halal"] },
];

export type Capacity = {
  label: string;
  liters: number;
  /** Hauteur totale en mm */
  height: number;
  /** Diamètre ou section du corps en mm */
  width: number;
  /** Poids à vide en g */
  weight?: number;
  /** Capacité ras bord en ml */
  brimful?: number;
  extra?: string;
};

export type Format = {
  id: string;
  name: string;
  material: string;
  desc: string;
  use: string;
  source: string;
  neck: string;
  capacities: Capacity[];
};

export const FORMATS: Format[] = [
  {
    id: "dorica",
    name: "Bouteille Dorica",
    material: "Verre",
    desc: "La silhouette ronde et généreuse, typique des huiles d'olive de la Méditerranée.",
    use: "Grande distribution · Caviste · Cadeau",
    source: "Cotes indicatives — fiche technique sur demande",
    neck: "Bague 31,5 Pilferproof",
    capacities: [
      { label: "250 ml", liters: 0.25, height: 205, width: 56.6, weight: 250 },
      { label: "500 ml", liters: 0.5, height: 253, width: 68.5, weight: 400 },
      { label: "750 ml", liters: 0.75, height: 290, width: 76.5, weight: 520 },
    ],
  },
  {
    id: "marasca",
    name: "Bouteille Marasca",
    material: "Verre",
    desc: "Ligne élancée et élégante, reconnue pour son style italien raffiné.",
    use: "Coffret · Épicerie fine · Premium",
    source: "Plans STV (Société Tunisienne de Verreries)",
    neck: "Bague Pilferproof 31,5 STD · débouchage Ø 20,6 mm",
    capacities: [
      { label: "250 ml", liters: 0.25, height: 211.5, width: 46.6, weight: 250, brimful: 265, extra: "Section carrée 46,6 × 46,6 mm" },
      { label: "500 ml", liters: 0.5, height: 260, width: 57.5, weight: 390, brimful: 520, extra: "Section carrée 57,5 × 57,5 mm" },
      { label: "750 ml", liters: 0.75, height: 274.7, width: 68, weight: 450, brimful: 775, extra: "Section carrée 68 × 68 mm" },
      { label: "1 L", liters: 1, height: 300, width: 76.1, weight: 605, brimful: 1040, extra: "Section carrée 76,1 × 76,1 mm" },
    ],
  },
  {
    id: "biolio",
    name: "Bouteille Biolio DOP/T",
    material: "Verre",
    desc: "Forme moderne et distincte, adaptée aux gammes bio et coffrets découverte.",
    use: "Bio · Découverte · Échantillon · Cadeau",
    source: "Plans Vetreria Etrusca (Montelupo F.no, Italie)",
    neck: "Imboccatura BG 21 · Ø bague 30,4 mm · passage min. 16 mm",
    capacities: [
      { label: "100 ml", liters: 0.1, height: 105, width: 51.2, weight: 130, brimful: 109, extra: "Base Ø 44 mm" },
      { label: "250 ml", liters: 0.25, height: 135, width: 68.3, weight: 250, brimful: 266, extra: "Base Ø 43,3 mm" },
      { label: "500 ml", liters: 0.5, height: 178, width: 78, weight: 350, brimful: 515, extra: "Base Ø 48,2 mm" },
      { label: "750 ml", liters: 0.75, height: 202, width: 89, weight: 500, brimful: 775, extra: "Base Ø 58,2 mm" },
      { label: "1 L", liters: 1, height: 241, width: 91, weight: 600, brimful: 1030, extra: "Base Ø 56,7 mm" },
    ],
  },
  {
    id: "bidon",
    name: "Bidon Métallique",
    material: "Fer-blanc alimentaire",
    desc: "Protection optimale contre la lumière et l'oxygène.",
    use: "Restauration · Cuisine familiale · Professionnel",
    source: "Cotes indicatives — fiche technique sur demande",
    neck: "Bouchon à vis Ø 42 mm avec poignée",
    capacities: [
      { label: "2 L", liters: 2, height: 205, width: 95, extra: "Section 95 × 95 mm" },
      { label: "3 L", liters: 3, height: 240, width: 108, extra: "Section 108 × 108 mm" },
      { label: "4 L", liters: 4, height: 290, width: 108, extra: "Section 108 × 108 mm" },
      { label: "5 L", liters: 5, height: 300, width: 120, extra: "Section 120 × 120 mm" },
    ],
  },
  {
    id: "pet",
    name: "Bouteille PET",
    material: "PET alimentaire",
    desc: "Légèreté et résistance pour un usage pratique et une logistique simplifiée.",
    use: "Grande consommation · Restauration · Export",
    source: "Cotes indicatives — fiche technique sur demande",
    neck: "Bouchon à vis 38 mm · poignée intégrée",
    capacities: [
      { label: "3 L", liters: 3, height: 290, width: 110, extra: "Corps 110 × 110 mm" },
      { label: "5 L", liters: 5, height: 335, width: 145, extra: "Corps 145 × 130 mm" },
    ],
  },
];

export const BRAND = {
  name: "CARTHÉA",
  tagline: "Huile d'olive vierge extra de Tunisie",
  producer: "SARAYA NATURAL PRODUCTS",
  origin: "Djebel Bargou, Siliana — Tunisie",
  description:
    "CARTHÉA est une huile d'olive vierge extra monocultivar issue des vergers du Djebel Bargou, en Tunisie. Trois expressions : Classique, Premium et 100% Bio.",
  website: "https://carthea.lovable.app",
};

export function findFormat(id: string): Format | undefined {
  const key = id.trim().toLowerCase();
  return FORMATS.find((f) => f.id === key || f.name.toLowerCase() === key);
}
