import { useState } from "react";

import { fill, useI18n } from "../lib/i18n";
import { packBox } from "../lib/pack-metrics";
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

const VARIANTS: { id: VariantId; swatch: string }[] = [
  { id: "classique", swatch: "bg-obsidian ring-gold/70" },
  { id: "premium", swatch: "bg-[oklch(0.28_0.06_140)] ring-gold/70" },
  { id: "bio", swatch: "bg-sand ring-sand/50" },
];

/** Détail complémentaire structuré (les cotes restent des nombres, jamais traduits). */
type Extra = { kind: "square" | "base" | "section" | "body"; a: number; b?: number };

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
  /** Détail complémentaire (section, base…) */
  extra?: Extra;
};

type FormatId = "dorica" | "marasca" | "biolio" | "bidon" | "pet";

type Format = {
  id: FormatId;
  images: Record<VariantId, string>;
  /** Le corps est-il rond (Ø) ou de section carrée ? */
  bodyShape: "round" | "section";
  capacities: Capacity[];
};

const FORMATS: Format[] = [
  {
    id: "dorica",
    images: { classique: doricaClassique, premium: doricaPremium, bio: doricaBio },
    bodyShape: "round",
    capacities: [
      { label: "250 ml", liters: 0.25, height: 205, width: 56.6, weight: 250 },
      { label: "500 ml", liters: 0.5, height: 253, width: 68.5, weight: 400 },
      { label: "750 ml", liters: 0.75, height: 290, width: 76.5, weight: 520 },
    ],
  },
  {
    id: "marasca",
    images: { classique: marascaClassique, premium: marascaPremium, bio: marascaBio },
    bodyShape: "section",
    capacities: [
      { label: "250 ml", liters: 0.25, height: 211.5, width: 46.6, weight: 250, brimful: 265, extra: { kind: "square", a: 46.6, b: 46.6 } },
      { label: "500 ml", liters: 0.5, height: 260, width: 57.5, weight: 390, brimful: 520, extra: { kind: "square", a: 57.5, b: 57.5 } },
      { label: "750 ml", liters: 0.75, height: 274.7, width: 68, weight: 450, brimful: 775, extra: { kind: "square", a: 68, b: 68 } },
      { label: "1 L", liters: 1, height: 300, width: 76.1, weight: 605, brimful: 1040, extra: { kind: "square", a: 76.1, b: 76.1 } },
    ],
  },
  {
    id: "biolio",
    images: { classique: biolioClassique, premium: biolioPremium, bio: biolioBio },
    bodyShape: "round",
    capacities: [
      { label: "100 ml", liters: 0.1, height: 105, width: 51.2, weight: 130, brimful: 109, extra: { kind: "base", a: 44 } },
      { label: "250 ml", liters: 0.25, height: 135, width: 68.3, weight: 250, brimful: 266, extra: { kind: "base", a: 43.3 } },
      { label: "500 ml", liters: 0.5, height: 178, width: 78, weight: 350, brimful: 515, extra: { kind: "base", a: 48.2 } },
      { label: "750 ml", liters: 0.75, height: 202, width: 89, weight: 500, brimful: 775, extra: { kind: "base", a: 58.2 } },
      { label: "1 L", liters: 1, height: 241, width: 91, weight: 600, brimful: 1030, extra: { kind: "base", a: 56.7 } },
    ],
  },
  {
    id: "bidon",
    images: { classique: bidonClassique, premium: bidonPremium, bio: bidonBio },
    bodyShape: "section",
    capacities: [
      { label: "2 L", liters: 2, height: 205, width: 95, extra: { kind: "section", a: 95, b: 95 } },
      { label: "3 L", liters: 3, height: 240, width: 108, extra: { kind: "section", a: 108, b: 108 } },
      { label: "4 L", liters: 4, height: 290, width: 108, extra: { kind: "section", a: 108, b: 108 } },
      { label: "5 L", liters: 5, height: 300, width: 120, extra: { kind: "section", a: 120, b: 120 } },
    ],
  },
  {
    id: "pet",
    images: { classique: petClassique, premium: petPremium, bio: petBio },
    bodyShape: "round",
    capacities: [
      { label: "3 L", liters: 3, height: 290, width: 110, extra: { kind: "body", a: 110, b: 110 } },
      { label: "5 L", liters: 5, height: 335, width: 145, extra: { kind: "body", a: 145, b: 130 } },
    ],
  },
];

/** Dimensions maximales toutes gammes confondues, pour une échelle physique commune. */
const MAX_HEIGHT = Math.max(
  ...FORMATS.flatMap((f) => f.capacities.map((c) => c.height)),
);

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 py-3">
      <dt className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-sand/45">
        {label}
      </dt>
      <span
        aria-hidden
        className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-white/12"
      />
      <dd className="shrink-0 font-sans text-sm text-sand/90 tabular-nums">{value}</dd>
    </div>
  );
}

export function FormatExplorer() {
  const { t, num: fmt } = useI18n();
  const ex = t.explorer;
  const initialFormat = FORMATS[0];
  const [formatId, setFormatId] = useState(initialFormat?.id ?? "dorica");
  const [variant, setVariant] = useState<VariantId>("classique");
  const [capIndex, setCapIndex] = useState(0);

  const format = FORMATS.find((f) => f.id === formatId) ?? initialFormat;
  if (!format) return null;
  const capacity =
    format.capacities[Math.min(capIndex, format.capacities.length - 1)] ??
    format.capacities[0];
  if (!capacity) return null;
  const copy = ex.formats[format.id];
  const variantName = (id: VariantId) => t.gamme.items[id].name;
  const extraText = (e: Extra) => fill(ex.extras[e.kind], { a: fmt(e.a), b: fmt(e.b ?? e.a) });

  // Échelle physique commune : seule la HAUTEUR pilote la taille affichée.
  // La largeur suit le ratio intrinsèque du PNG — aucun étirement possible.
  const STAGE_HEIGHT = 420;
  const FLOOR = 64;
  const usable = STAGE_HEIGHT - FLOOR - 24;
  const productHeightPx = (capacity.height / MAX_HEIGHT) * usable;
  const box = packBox(format.id, variant, productHeightPx);

  const bodyLabel = format.bodyShape === "round" ? ex.bodyRound : ex.bodySection;
  const bodyValue =
    format.bodyShape === "round"
      ? `Ø ${fmt(capacity.width)} ${ex.mm}`
      : `${fmt(capacity.width)} × ${fmt(capacity.width)} ${ex.mm}`;

  const chip = (active: boolean) =>
    `px-4 py-2 text-[11px] uppercase tracking-[0.2em] border transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
      active
        ? "border-gold/70 text-gold bg-gold/5"
        : "border-white/10 text-sand/60 hover:border-gold/40 hover:text-sand"
    }`;

  return (
    <div className="flex flex-col gap-12">
      {/* Étape 1 — étiquette */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <span className="mr-2 text-[10px] uppercase tracking-[0.3em] text-sand/35">
          01 — {ex.stepLabel}
        </span>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={v.id === variant}
            onClick={() => setVariant(v.id)}
            className={`${chip(v.id === variant)} flex items-center gap-3`}
          >
            <span aria-hidden className={`h-3 w-3 rounded-full ring-1 ${v.swatch}`} />
            {variantName(v.id)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        {/* Étape 2 — format */}
        <div className="min-w-0 lg:col-span-3">
          <span className="mb-5 block text-[10px] uppercase tracking-[0.3em] text-sand/35">
            02 — {ex.stepFormat}
          </span>
          <ul className="flex flex-col border-t border-white/8">
            {FORMATS.map((f) => {
              const active = f.id === format.id;
              return (
                <li key={f.id} className="border-b border-white/8">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setFormatId(f.id);
                      setCapIndex(0);
                    }}
                    className={`group w-full py-5 text-left transition-[padding,color] duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                      active ? "pl-4" : "pl-0 hover:pl-3"
                    }`}
                  >
                    <span
                      className={`block font-serif text-xl leading-tight transition-colors duration-500 sm:text-2xl ${
                        active ? "text-gold" : "text-sand/85 group-hover:text-sand"
                      }`}
                    >
                      {ex.formats[f.id].name}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-sand/35">
                      {ex.formats[f.id].material} · {fill(ex.capacityCount, { n: f.capacities.length })}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Scène produit — échelle physique, ratio intrinsèque préservé */}
        <div className="min-w-0 lg:col-span-5">
          <div
            className="relative mx-auto w-full max-w-[26rem] overflow-hidden border border-white/8"
            style={{ height: `${STAGE_HEIGHT}px` }}
          >
            {/* Ligne de sol */}
            <span
              aria-hidden
              className="absolute inset-x-8 h-px bg-white/8"
              style={{ bottom: `${FLOOR}px` }}
            />
            {/* Repère de hauteur */}
            <span
              aria-hidden
              className="absolute left-6 w-3 bg-gold/70 transition-all duration-700"
              style={{ bottom: `${FLOOR}px`, height: `${productHeightPx}px`, width: "1px" }}
            />
            <span
              className="absolute left-4 text-[9px] uppercase tracking-[0.2em] text-sand/35 transition-all duration-700"
              style={{ bottom: `${FLOOR + productHeightPx + 6}px` }}
            >
              {fmt(capacity.height)} {ex.mm}
            </span>

            <div
              className="absolute inset-x-0 flex items-end justify-center"
              style={{ bottom: `${FLOOR}px` }}
            >
              <img
                key={`${format.id}-${variant}`}
                src={format.images[variant]}
                alt={fill(ex.alt, { format: copy.name, capacity: capacity.label, label: variantName(variant) })}
                loading="lazy"
                decoding="async"
                style={{
                  height: `${box.imgHeight}px`,
                  width: `${box.imgWidth}px`,
                  marginBottom: `${-box.bottomOffset}px`,
                }}
                className="pack-fade max-w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)] transition-[height,width] duration-700 ease-out"
              />
            </div>

            <span className="absolute inset-x-0 bottom-5 text-center font-serif text-2xl tracking-wide text-gold/90">
              {capacity.label}
            </span>
          </div>
        </div>

        {/* Étapes 3 & 4 — contenance et dimensions */}
        <div className="min-w-0 lg:col-span-4">
          <h3 className="font-serif text-3xl text-sand sm:text-4xl">{copy.name}</h3>
          <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-sand/55">
            {copy.desc}
          </p>

          <span className="mt-10 mb-4 block text-[10px] uppercase tracking-[0.3em] text-sand/35">
            03 — {ex.stepCapacity}
          </span>
          <div className="flex flex-wrap gap-2">
            {format.capacities.map((c, i) => (
              <button
                key={c.label}
                type="button"
                aria-pressed={c.label === capacity.label}
                onClick={() => setCapIndex(i)}
                className={chip(c.label === capacity.label)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <span className="mt-10 mb-2 block text-[10px] uppercase tracking-[0.3em] text-sand/35">
            04 — {ex.stepDimensions}
          </span>
          <dl className="divide-y divide-white/6 border-y border-white/8">
            <SpecRow label={ex.height} value={`${fmt(capacity.height)} ${ex.mm}`} />
            <SpecRow label={bodyLabel} value={bodyValue} />
            {capacity.brimful ? (
              <SpecRow label={ex.brimful} value={`${capacity.brimful} ${ex.ml}`} />
            ) : null}
            {capacity.weight ? (
              <SpecRow label={ex.weight} value={`≈ ${capacity.weight} ${ex.g}`} />
            ) : null}
          </dl>

          <div className="mt-6 space-y-2 text-xs leading-relaxed text-sand/45">
            <p>{copy.neck}</p>
            {capacity.extra ? <p>{extraText(capacity.extra)}</p> : null}
            <p className="pt-3 text-[10px] uppercase tracking-[0.18em] text-sand/30">
              {copy.use} — {copy.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
