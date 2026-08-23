import { useState } from "react";
import dorica from "../assets/pack-dorica.png";
import marasca from "../assets/pack-marasca.png";
import biolio from "../assets/pack-biolio.png";
import bidon from "../assets/pack-bidon.png";
import pet from "../assets/pack-pet.png";

type Format = {
  id: string;
  name: string;
  material: string;
  image: string;
  desc: string;
  use: string;
  capacities: { label: string; liters: number }[];
};

const FORMATS: Format[] = [
  {
    id: "dorica",
    name: "Bouteille Dorica",
    material: "Verre",
    image: dorica,
    desc: "La silhouette ronde et généreuse, typique des huiles d'olive de la Méditerranée. Solide et présente bien sur la table et en linéaire.",
    use: "Grande distribution · Caviste · Cadeau",
    capacities: [
      { label: "250 ml", liters: 0.25 },
      { label: "500 ml", liters: 0.5 },
      { label: "750 ml", liters: 0.75 },
    ],
  },
  {
    id: "marasca",
    name: "Bouteille Marasca",
    material: "Verre",
    image: marasca,
    desc: "Ligne élancée et élégante, reconnue pour son style italien raffiné. Idéale pour les coffrets premium et les épiceries fines.",
    use: "Coffret · Épicerie fine · Premium",
    capacities: [
      { label: "250 ml", liters: 0.25 },
      { label: "500 ml", liters: 0.5 },
      { label: "750 ml", liters: 0.75 },
      { label: "1 L", liters: 1 },
    ],
  },
  {
    id: "biolio",
    name: "Bouteille Biolio",
    material: "Verre",
    image: biolio,
    desc: "Forme moderne et distincte, parfaitement adaptée aux gammes bio et aux coffrets découverte. Le format 100 ml est idéal pour les échantillons.",
    use: "Bio · Découverte · Échantillon · Cadeau",
    capacities: [
      { label: "100 ml", liters: 0.1 },
      { label: "250 ml", liters: 0.25 },
      { label: "500 ml", liters: 0.5 },
      { label: "750 ml", liters: 0.75 },
      { label: "1 L", liters: 1 },
    ],
  },
  {
    id: "bidon",
    name: "Bidon Métallique",
    material: "Métal",
    image: bidon,
    desc: "Protection optimale contre la lumière et l'oxygène. Format robuste pour une consommation quotidienne en cuisine ou en restauration.",
    use: "Restauration · Cuisine familiale · Professionnel",
    capacities: [
      { label: "2 L", liters: 2 },
      { label: "3 L", liters: 3 },
      { label: "4 L", liters: 4 },
      { label: "5 L", liters: 5 },
    ],
  },
  {
    id: "pet",
    name: "Bouteille PET",
    material: "PET alimentaire",
    image: pet,
    desc: "Légèreté et résistance pour un usage pratique et une logistique simplifiée. Parfait pour les volumes et la grande consommation.",
    use: "Grande consommation · Restauration · Export",
    capacities: [
      { label: "3 L", liters: 3 },
      { label: "5 L", liters: 5 },
    ],
  },
];

function scaleFor(format: Format, liters: number) {
  const max = Math.max(...format.capacities.map((c) => c.liters));
  const min = Math.min(...format.capacities.map((c) => c.liters));
  if (max === min) return 1;
  const t = (Math.cbrt(liters) - Math.cbrt(min)) / (Math.cbrt(max) - Math.cbrt(min));
  return 0.68 + t * 0.32;
}

export function FormatExplorer() {
  const [formatId, setFormatId] = useState(FORMATS[0]!.id);
  const [capIndex, setCapIndex] = useState(0);

  const format = FORMATS.find((f) => f.id === formatId)!;
  const capacity = format.capacities[Math.min(capIndex, format.capacities.length - 1)]!;

  return (
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

      {/* Visual stage */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 relative bg-stone-900/40 border border-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--color-gold)_14%,transparent),transparent_65%)]" />
        <div className="relative h-[26rem] md:h-[32rem] flex items-end justify-center p-8">
          {FORMATS.map((f) => (
            <img
              key={f.id}
              src={f.image}
              alt={`Emballage CARTHÉA — ${f.name}`}
              loading="lazy"
              width={768}
              height={1024}
              style={{
                transform: `scale(${f.id === format.id ? scaleFor(f, capacity.liters) : 0.7})`,
              }}
              className={`absolute bottom-8 max-h-[85%] w-auto object-contain origin-bottom transition-all duration-700 ease-out drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] ${
                f.id === format.id
                  ? "opacity-100 blur-0"
                  : "opacity-0 blur-sm pointer-events-none"
              }`}
            />
          ))}
        </div>
        <span className="absolute bottom-4 left-0 right-0 text-center font-serif text-4xl text-gold/90 tracking-wide">
          {capacity.label}
        </span>
      </div>

      {/* Details */}
      <div key={format.id} className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
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

        <span className="text-[10px] uppercase tracking-[0.15em] text-sand/35 mt-auto pt-4 border-t border-stone-900">
          {format.use}
        </span>
      </div>
    </div>
  );
}
