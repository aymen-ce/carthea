import { createFileRoute } from "@tanstack/react-router";

import trioStudio from "../assets/carthea-trio-studio.jpg.asset.json";
import trioVerger from "../assets/carthea-trio-verger.jpg.asset.json";
import marascaClassique from "../assets/pack-marasca-classique.png";
import marascaPremium from "../assets/pack-marasca-premium.png";
import marascaBio from "../assets/pack-marasca-bio.png";
import { FormatExplorer } from "../components/FormatExplorer";
import { Reveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionLabel";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CARTHÉA — Huile d'olive vierge extra de Tunisie" },
      {
        name: "description",
        content:
          "CARTHÉA captures the soul of ancient Carthage. A singular monocultivar extra virgin olive oil, harvested from millennia-old Tunisian groves.",
      },
      {
        property: "og:title",
        content: "CARTHÉA — Huile d'olive vierge extra de Tunisie",
      },
      {
        property: "og:description",
        content:
          "CARTHÉA captures the soul of ancient Carthage. A singular monocultivar extra virgin olive oil, harvested from millennia-old Tunisian groves.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GAMME = [
  {
    name: "Classique",
    palette: "Noir & Or",
    image: marascaClassique,
    desc: "L'équilibre CARTHÉA. Fruité mûr, douceur ronde, parfaite pour la cuisine du quotidien.",
    labels: "Kosher · Halal · Produit de Tunisie",
  },
  {
    name: "Premium",
    palette: "Vert & Or",
    image: marascaPremium,
    desc: "Première pression à froid sélectionnée. Fruité vert intense, amertume noble, finale poivrée.",
    labels: "Kosher · Halal · Produit de Tunisie",
  },
  {
    name: "100% Bio",
    palette: "Blanc & Vert",
    image: marascaBio,
    desc: "Issue de l'agriculture biologique certifiée Ecocert. Pureté végétale, notes d'herbe fraîche.",
    labels: "Certifié Ecocert TN-BIO-001 · Produit de Tunisie",
  },
];

const MILLESIME = [
  {
    n: "01",
    label: "Origine",
    title: "Djebel Bargou",
    desc: "Vergers d'altitude nichés dans les montagnes escarpées du Nord-Centrale de la Tunisie.",
  },
  {
    n: "02",
    label: "Cépage",
    title: "Chemlali",
    desc: "Monocépage robuste reconnu pour sa haute teneur en polyphénols et sa longévité intense.",
  },
  {
    n: "03",
    label: "Récolte",
    title: "Début Novembre",
    desc: "Cueillette à la main au summum de la maturité verte pour préserver le profil chlorophyllien vibrant.",
  },
  {
    n: "04",
    label: "Dégustation",
    title: "Artichaut & Amande",
    desc: "Notes herbacées vives suivies d'une finale poivrée persistante et d'une texture soyeuse.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-obsidian font-sans text-sand selection:bg-gold/30 selection:text-sand">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 lg:px-12 lg:pt-44 lg:pb-32">
          <div className="mx-auto grid max-w-[88rem] grid-cols-12 items-center gap-y-14 lg:gap-x-16">
            <Reveal className="col-span-12 lg:col-span-5">
              <SectionLabel>Tunisie · Djebel Bargou</SectionLabel>
              <h1 className="mt-8 font-serif text-[clamp(2.6rem,7vw,4.75rem)] font-medium italic leading-[1.05] text-balance">
                Liquid gold from the <span className="text-gold">Tunisian</span> sun.
              </h1>
              <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-pretty text-sand/60">
                CARTHÉA captures the soul of ancient Carthage. A singular monocultivar
                extra virgin olive oil, harvested from millennia-old groves.
              </p>
              <a
                href="#collection"
                className="group mt-12 inline-flex items-center gap-4 border border-gold/60 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian"
              >
                Découvrir le millésime
                <span
                  aria-hidden
                  className="h-px w-6 bg-current transition-all duration-500 group-hover:w-9"
                />
              </a>
            </Reveal>

            <Reveal delay={120} className="col-span-12 lg:col-span-7">
              <img
                src={trioStudio.url}
                alt="Les trois bouteilles CARTHÉA — Classique, Premium et 100% Bio, huile d'olive vierge extra"
                width={1376}
                height={768}
                className="h-auto w-full object-contain"
              />
            </Reveal>
          </div>
        </section>

        {/* Héritage */}
        <section id="heritage" className="border-t border-white/5 px-6 py-24 lg:px-12 lg:py-36">
          <div className="mx-auto grid max-w-[88rem] grid-cols-12 gap-y-14 lg:gap-x-16">
            <Reveal className="col-span-12 lg:col-span-6">
              <img
                src={trioVerger.url}
                alt="Bouteilles CARTHÉA dans un verger d'oliviers tunisien"
                width={1376}
                height={768}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </Reveal>
            <Reveal
              delay={100}
              className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-24"
            >
              <SectionLabel>Notre Héritage</SectionLabel>
              <h2 className="mt-8 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] text-balance">
                Enracinée dans la terre du Maghreb.
              </h2>
              <div className="mt-10 max-w-[46ch] space-y-7 text-[15px] leading-[1.85] text-pretty text-sand/55">
                <p>
                  Chaque bouteille de CARTHÉA est le témoignage des oliviers Chemlali qui
                  prospèrent dans le paysage aride tunisien depuis des siècles. Nos vergers
                  sont entretenus à la main, dans le respect des rythmes des vents
                  méditerranéens.
                </p>
                <p>
                  Nous croyons en la pureté de la première pression à froid. Pas
                  d'assemblage, pas de compromis. Juste l'intensité poivrée brute et la
                  finale beurrée du terroir le plus légendaire du monde.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* La Gamme */}
        <section id="gamme" className="border-t border-white/5 px-6 py-24 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[88rem]">
            <Reveal className="max-w-2xl">
              <SectionLabel>La Gamme</SectionLabel>
              <h2 className="mt-8 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] text-balance">
                Trois expressions, un même terroir.
              </h2>
            </Reveal>

            <div className="mt-20 grid grid-cols-1 border-t border-white/8 md:grid-cols-3">
              {GAMME.map((v, i) => (
                <Reveal
                  key={v.name}
                  as="article"
                  delay={i * 110}
                  className="flex flex-col border-b border-white/8 px-0 py-14 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0 md:[&+article]:border-l md:[&+article]:border-white/8"
                >
                  <div className="flex h-[19rem] items-end justify-center sm:h-[22rem]">
                    <img
                      src={v.image}
                      alt={`Bouteille Marasca CARTHÉA — étiquette ${v.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <h3 className="mt-12 font-serif text-3xl text-sand">{v.name}</h3>
                  <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gold/80">
                    {v.palette}
                  </span>
                  <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-pretty text-sand/55">
                    {v.desc}
                  </p>
                  <span className="mt-auto pt-8 text-[10px] uppercase tracking-[0.18em] text-sand/30">
                    {v.labels}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Les Formats */}
        <section id="formats" className="border-t border-white/5 px-6 py-24 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[88rem]">
            <Reveal className="grid grid-cols-12 gap-y-8 lg:gap-x-16">
              <div className="col-span-12 lg:col-span-5">
                <SectionLabel>Les Formats</SectionLabel>
                <h2 className="mt-8 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.1] text-balance">
                  Du format d'apéritif au volume professionnel.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-6">
                <p className="max-w-[48ch] text-[15px] leading-[1.85] text-pretty text-sand/55">
                  Chaque expression de la gamme CARTHÉA est proposée dans une gamme
                  complète de conditionnements, pensée pour la table, la cuisine familiale
                  et les besoins de la restauration et de l'industrie agroalimentaire.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80} className="mt-20">
              <FormatExplorer />
            </Reveal>
          </div>
        </section>

        {/* Millésime */}
        <section
          id="collection"
          className="border-t border-white/5 px-6 py-24 lg:px-12 lg:py-36"
        >
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionLabel>Millésime</SectionLabel>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 border-t border-white/8 sm:grid-cols-2 lg:grid-cols-4">
              {MILLESIME.map((m, i) => (
                <Reveal
                  key={m.label}
                  delay={i * 90}
                  className="border-b border-white/8 py-12 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&+div]:border-l lg:[&+div]:border-white/8"
                >
                  <span className="font-serif text-sm text-gold/60">{m.n}</span>
                  <span className="mt-6 block text-[10px] uppercase tracking-[0.25em] text-sand/40">
                    {m.label}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-sand">{m.title}</h3>
                  <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-pretty text-sand/50">
                    {m.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Appel */}
        <section className="border-t border-white/5 px-6 py-28 lg:px-12 lg:py-40">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-medium leading-[1.08] text-balance">
              Ramenez la Méditerranée chez vous.
            </h2>
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="mailto:hello@carthea.tn"
                className="inline-flex w-full items-center justify-center border border-gold/60 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian sm:w-auto"
              >
                Commander la collection
              </a>
              <a
                href="mailto:trade@carthea.tn"
                className="inline-flex w-full items-center justify-center border border-white/12 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-sand/70 transition-colors duration-500 hover:border-sand/40 hover:text-sand sm:w-auto"
              >
                Demande professionnelle
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
