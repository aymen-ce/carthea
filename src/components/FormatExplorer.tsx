import { useState } from "react";

import doricaClassique from "../assets/pack-dorica-classique.png";
import doricaPremium from "../assets/pack-dorica-premium.png";
import doricaBio from "../assets/pack-dorica-bio.png";
import marascaClassique from "../assets/pack-marasca-classique.png";
import marascaPremium from "../assets/pack-marasca-premium.png";
import marascaBio from "../assets/pack-marasca-bio.png";
import biolioClassique from "../assets/pack-biolio-classique.png";
import biolioPremium from "../assets/pack-biolio-premium.png";
import biolioBio from "../assets/pack-biolio-bio.png";
import bidonClassique from "../assets/pack-bidon-classique.png";
import bidonPremium from "../assets/pack-bidon-premium.png";
import bidonBio from "../assets/pack-bidon-bio.png";
import petClassique from "../assets/pack-pet-classique.png";
import petPremium from "../assets/pack-pet-premium.png";
import petBio from "../assets/pack-pet-bio.png";

type VariantId = "classique" | "premium" | "bio";

const VARIANTS: { id: VariantId; name: string; palette: string; swatch: string }[] = [
  { id: "classique", name: "Classique", palette: "Noir & Or", swatch: "bg-obsidian ring-gold/70" },
  { id: "premium", name: "Premium", palette: "Vert & Or", swatch: "bg-[oklch(0.28_0.06_140)] ring-gold/70" },
  { id: "bio", name: "100% Bio", palette: "Blanc & Vert", swatch: "bg-sand ring-sand/50" },
];

type Capacity = {
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
  /** Détail complémentaire (bague, base…) */
  extra?: string;
};

type Format = {
  id: string;
  name: string;
  material: string;
  images: Record<VariantId, string>;
  desc: string;
  use: string;
  /** Origine des cotes */
  source: string;
  neck: string;
  capacities: Capacity[];
};

const FORMATS: Format[] = [
  {
    id: "dorica",
    name: "Bouteille Dorica",
    material: "Verre",
    images: { classique: doricaClassique, premium: doricaPremium, bio: doricaBio },
    desc: "La silhouette ronde et généreuse, typique des huiles d'olive de la Méditerranée. Solide et présente bien sur la table et en linéaire.",
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
    images: { classique: marascaClassique, premium: marascaPremium, bio: marascaBio },
    desc: "Ligne élancée et élégante, reconnue pour son style italien raffiné. Idéale pour les coffrets premium et les épiceries fines.",
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
    images: { classique: biolioClassique, premium: biolioPremium, bio: biolioBio },
    desc: "Forme moderne et distincte, parfaitement adaptée aux gammes bio et aux coffrets découverte. Le format 100 ml est idéal pour les échantillons.",
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
    images: { classique: bidonClassique, premium: bidonPremium, bio: bidonBio },
    desc: "Protection optimale contre la lumière et l'oxygène. Format robuste pour une consommation quotidienne en cuisine ou en restauration.",
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
    images: { classique: petClassique, premium: petPremium, bio: petBio },
    desc: "Légèreté et résistance pour un usage pratique et une logistique simplifiée. Parfait pour les volumes et la grande consommation.",
    use: "Grande consommation · Restauration · Export",
    source: "Cotes indicatives — fiche technique sur demande",
    neck: "Bouchon à vis 38 mm · poignée intégrée",
    capacities: [
      { label: "3 L", liters: 3, height: 290, width: 110, extra: "Corps 110 × 110 mm" },
      { label: "5 L", liters: 5, height: 335, width: 145, extra: "Corps 145 × 130 mm" },
    ],
  },
];

/** Hauteur maximale toutes gammes confondues, pour une mise à l'échelle réelle */
const MAX_HEIGHT = Math.max(
  ...FORMATS.flatMap((f) => f.capacities.map((c) => c.height)),
);
const MIN_SCALE = 0.42;

function scaleFor(height: number) {
  return MIN_SCALE + (height / MAX_HEIGHT) * (1 - MIN_SCALE);
}

function fmt(n: number) {
  return String(n).replace(".", ",");
}

export function FormatExplorer() {
  const [formatId, setFormatId] = useState(FORMATS[0]!.id);
  const [variant, setVariant] = useState<VariantId>("classique");
  const [capIndex, setCapIndex] = useState(0);

  const format = FORMATS.find((f) => f.id === formatId)!;
  const capacity = format.capacities[Math.min(capIndex, format.capacities.length - 1)]!;

  return (
    <div className="flex flex-col gap-10">
      {/* Sélecteur d'étiquette */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-sand/40 mr-2">
          Étiquette
        </span>
        {VARIANTS.map((v) => {
          const active = v.id === variant;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVariant(v.id)}
              className={`flex items-center gap-3 px-4 py-2 border transition-all duration-300 hover:-translate-y-0.5 ${
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-stone-800 bg-stone-900/40 text-sand/70 hover:border-gold/60"
              }`}
            >
              <span className={`h-4 w-4 rounded-full ring-1 ${v.swatch}`} />
              <span className="text-xs uppercase tracking-wider">{v.name}</span>
              <span className="text-[10px] tracking-[0.15em] text-sand/35">{v.palette}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-10 items-stretch">
        {/* Selector list */}
        <div className="col-span-12 lg:col-span-4 flex flex-col divide-y divide-stone-900 border-y border-stone-900">
          {FORMATS.map((f) => {
            const active = f.id === format.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFormatId(f.id);
                  setCapIndex(0);
                }}
                className={`group text-left py-5 px-4 transition-all duration-500 flex items-baseline justify-between gap-4 ${
                  active ? "bg-stone-900/60 pl-6" : "hover:bg-stone-900/30 hover:pl-6"
                }`}
              >
                <span>
                  <span
                    className={`block font-serif text-2xl transition-colors duration-300 ${
                      active ? "text-gold" : "text-sand group-hover:text-gold/80"
                    }`}
                  >
                    {f.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-sand/40">
                    {f.material} · {f.capacities.length} contenances
                  </span>
                </span>
                <span
                  className={`h-px bg-gold transition-all duration-500 ${
                    active ? "w-8 opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Visual stage — échelle réelle */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 relative bg-stone-900/40 border border-stone-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--color-gold)_14%,transparent),transparent_65%)]" />
          {/* Règle graduée */}
          <div className="absolute left-4 top-8 bottom-16 w-px bg-stone-800">
            <span className="absolute -top-6 -left-2 text-[9px] tracking-[0.15em] text-sand/35">
              {fmt(MAX_HEIGHT)} mm
            </span>
            <span
              className="absolute left-0 w-3 h-px bg-gold transition-all duration-700"
              style={{ bottom: `${(capacity.height / MAX_HEIGHT) * 100}%` }}
            />
          </div>

          <div className="relative h-[26rem] md:h-[32rem] flex items-end justify-center p-8">
            {FORMATS.map((f) => (
              <img
                key={f.id}
                src={f.images[variant]}
                alt={`Emballage CARTHÉA ${f.name} — étiquette ${variant}`}
                loading="lazy"
                width={768}
                height={1024}
                style={{
                  transform: `scale(${f.id === format.id ? scaleFor(capacity.height) : 0.5})`,
                }}
                className={`absolute bottom-14 max-h-[88%] w-auto object-contain origin-bottom transition-all duration-700 ease-out drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] ${
                  f.id === format.id ? "opacity-100 blur-0" : "opacity-0 blur-sm pointer-events-none"
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="font-serif text-4xl text-gold/90 tracking-wide block leading-none">
              {capacity.label}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-sand/40">
              H {fmt(capacity.height)} mm · Ø {fmt(capacity.width)} mm
            </span>
          </div>
        </div>

        {/* Details */}
        <div
          key={format.id}
          className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div>
            <h3 className="font-serif text-4xl text-sand mb-2">{format.name}</h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
              {format.material}
            </span>
          </div>
          <p className="text-sm text-sand/60 text-pretty max-w-[42ch] leading-relaxed">
            {format.desc}
          </p>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sand/40 block mb-3">
              Choisissez la contenance
            </span>
            <div className="flex flex-wrap gap-2">
              {format.capacities.map((c, i) => {
                const active = c.label === capacity.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setCapIndex(i)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-300 hover:-translate-y-0.5 ${
                      active
                        ? "border-gold text-obsidian bg-gold shadow-[0_8px_20px_-8px_var(--color-gold)]"
                        : "border-stone-800 text-sand/80 bg-stone-900/40 hover:border-gold/60 hover:text-gold"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche technique */}
          <dl className="grid grid-cols-2 gap-px bg-stone-900 border border-stone-900 text-sm">
            <div className="bg-obsidian p-4">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Hauteur totale</dt>
              <dd className="text-sand">{fmt(capacity.height)} mm</dd>
            </div>
            <div className="bg-obsidian p-4">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Corps</dt>
              <dd className="text-sand">Ø {fmt(capacity.width)} mm</dd>
            </div>
            {capacity.brimful ? (
              <div className="bg-obsidian p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Capacité ras bord</dt>
                <dd className="text-sand">{capacity.brimful} ml</dd>
              </div>
            ) : null}
            {capacity.weight ? (
              <div className="bg-obsidian p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Poids à vide</dt>
                <dd className="text-sand">≈ {capacity.weight} g</dd>
              </div>
            ) : null}
            <div className="bg-obsidian p-4 col-span-2">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Col / fermeture</dt>
              <dd className="text-sand/80 text-xs leading-relaxed">{format.neck}</dd>
            </div>
            {capacity.extra ? (
              <div className="bg-obsidian p-4 col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-sand/35 mb-1">Détail</dt>
                <dd className="text-sand/80 text-xs leading-relaxed">{capacity.extra}</dd>
              </div>
            ) : null}
          </dl>

          <span className="text-[10px] uppercase tracking-[0.15em] text-sand/35 mt-auto pt-4 border-t border-stone-900">
            {format.use} — {format.source}
          </span>
        </div>
      </div>
    </div>
  );
}
