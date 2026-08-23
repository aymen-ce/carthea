import { createFileRoute, Link } from "@tanstack/react-router";
import trioStudio from "../assets/carthea-trio-studio.jpg.asset.json";
import trioVerger from "../assets/carthea-trio-verger.jpg.asset.json";

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

function Index() {
  return (
    <div className="min-h-screen bg-obsidian text-sand font-sans selection:bg-gold/30 selection:text-sand">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif text-2xl tracking-widest text-gold uppercase">
            CARTHÉA
          </span>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
            <a href="#heritage" className="hover:text-gold transition-colors">
              L'Origine
            </a>
            <a href="#gamme" className="hover:text-gold transition-colors">
              La Gamme
            </a>
            <a href="#formats" className="hover:text-gold transition-colors">
              Les Formats
            </a>
            <a href="#collection" className="hover:text-gold transition-colors">
              Millésime
            </a>
            <Link to="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-obsidian pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-5 z-10">
            <h1 className="font-serif text-5xl md:text-7xl leading-tight text-balance mb-8 font-medium italic">
              Liquid gold from the <span className="text-gold">Tunisian</span> sun.
            </h1>
            <p className="font-sans text-lg max-w-[48ch] text-pretty text-sand/70 mb-10">
              CARTHÉA captures the soul of ancient Carthage. A singular monocultivar extra virgin olive oil, harvested from millennia-old groves.
            </p>
            <a
              href="#collection"
              className="group relative inline-flex items-center bg-gold text-obsidian px-6 py-3 font-medium tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] ring-1 ring-gold"
            >
              <span className="text-sm uppercase tracking-widest">
                Découvrir le millésime
              </span>
            </a>
          </div>

          <div className="col-span-12 lg:col-span-7 flex justify-end">
            <div className="relative w-full max-w-2xl aspect-[16/9]">
              <img
                src={trioStudio.url}
                alt="Les trois bouteilles CARTHÉA — Classique, Premium et 100% Bio, huile d'olive vierge extra 250 ml"
                width={1376}
                height={768}
                className="w-full h-full object-cover bg-stone-900 shadow-2xl rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 backdrop-blur-3xl rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="heritage" className="bg-stone-950 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 items-start">
            <div className="col-span-12 lg:col-span-6">
              <img
                src={trioVerger.url}
                alt="Bouteilles CARTHÉA dans un verger d'oliviers tunisien"
                width={1376}
                height={768}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-center bg-stone-900 rounded-lg"
              />
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 pt-12 lg:pt-32">
              <span className="text-gold text-sm tracking-[0.3em] uppercase block mb-6">
                Notre Héritage
              </span>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight text-balance mb-8 font-medium">
                Enracinée dans la terre du Maghreb.
              </h2>
              <div className="space-y-6 text-sand/60 font-sans leading-relaxed text-pretty max-w-[48ch]">
                <p>
                  Chaque bouteille de CARTHÉA est le témoignage des oliviers Chemlali qui prospèrent dans le paysage aride tunisien depuis des siècles. Nos vergers sont entretenus à la main, dans le respect des rythmes des vents méditerranéens.
                </p>
                <p>
                  Nous croyons en la pureté de la première pression à froid. Pas d'assemblage, pas de compromis. Juste l'intensité poivrée brute et la finale beurrée du terroir le plus légendaire du monde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La Gamme */}
      <section id="gamme" className="bg-obsidian py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-gold text-sm tracking-[0.3em] uppercase block mb-6">
              La Gamme
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-balance font-medium">
              Trois expressions, un même terroir.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-900">
            {[
              {
                name: "Classique",
                palette: "Noir & Or",
                desc: "L'équilibre CARTHÉA. Fruité mûr, douceur ronde, parfaite pour la cuisine du quotidien.",
                labels: "Kosher · Halal · Produit de Tunisie",
                swatch: "bg-obsidian ring-gold/60",
              },
              {
                name: "Premium",
                palette: "Vert & Or",
                desc: "Première pression à froid sélectionnée. Fruité vert intense, amertume noble, finale poivrée.",
                labels: "Kosher · Halal · Produit de Tunisie",
                swatch: "bg-[oklch(0.28_0.06_140)] ring-gold/60",
              },
              {
                name: "100% Bio",
                palette: "Blanc & Vert",
                desc: "Issue de l'agriculture biologique certifiée Ecocert. Pureté végétale, notes d'herbe fraîche.",
                labels: "Certifié Ecocert TN-BIO-001 · Produit de Tunisie",
                swatch: "bg-sand ring-sand/40",
              },
            ].map((v) => (
              <article key={v.name} className="bg-obsidian p-10 flex flex-col gap-5">
                <span className={`h-10 w-10 rounded-full ring-1 ${v.swatch}`} />
                <div>
                  <h3 className="font-serif text-3xl text-sand">{v.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
                    {v.palette} · 250 ml
                  </span>
                </div>
                <p className="text-sm text-sand/60 text-pretty max-w-[40ch]">{v.desc}</p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-sand/35 mt-auto pt-4 border-t border-stone-900">
                  {v.labels}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Characteristics Grid */}
      <section id="collection" className="bg-obsidian py-32 px-6 border-y border-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-stone-900">
            <div className="py-12 lg:px-8 first:pl-0">
              <span className="text-[10px] font-sans text-gold uppercase tracking-[0.2em] block mb-4">
                Origine
              </span>
              <h3 className="font-serif text-2xl text-sand mb-4">Djebel Bargou</h3>
              <p className="text-sm text-sand/50 text-pretty max-w-[40ch]">
                Vergers d'altitude nichés dans les montagnes escarpées du Nord-Centrale de la Tunisie.
              </p>
            </div>
            <div className="py-12 lg:px-8">
              <span className="text-[10px] font-sans text-gold uppercase tracking-[0.2em] block mb-4">
                Cépage
              </span>
              <h3 className="font-serif text-2xl text-sand mb-4">Chemlali</h3>
              <p className="text-sm text-sand/50 text-pretty max-w-[40ch]">
                Monocépage robuste reconnu pour sa haute teneur en polyphénols et sa longévité intense.
              </p>
            </div>
            <div className="py-12 lg:px-8">
              <span className="text-[10px] font-sans text-gold uppercase tracking-[0.2em] block mb-4">
                Récolte
              </span>
              <h3 className="font-serif text-2xl text-sand mb-4">Début Novembre</h3>
              <p className="text-sm text-sand/50 text-pretty max-w-[40ch]">
                Cueillette à la main au summum de la maturité verte pour préserver le profil chlorophyllien vibrant.
              </p>
            </div>
            <div className="py-12 lg:px-8 last:pr-0">
              <span className="text-[10px] font-sans text-gold uppercase tracking-[0.2em] block mb-4">
                Dégustation
              </span>
              <h3 className="font-serif text-2xl text-sand mb-4">Artichaut & Amande</h3>
              <p className="text-sm text-sand/50 text-pretty max-w-[40ch]">
                Notes herbacées vives suivies d'une finale poivrée persistante et d'une texture soyeuse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="bg-stone-950 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="font-serif text-4xl md:text-6xl text-balance mb-12 font-medium">
              Ramenez la Méditerranée chez vous.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="mailto:hello@carthea.tn"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold text-obsidian text-sm uppercase tracking-widest font-medium transition-colors hover:bg-gold/90 ring-1 ring-gold"
              >
                Commander la collection
              </a>
              <a
                href="mailto:trade@carthea.tn"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-sand text-sm uppercase tracking-widest font-medium transition-colors hover:bg-white/5 ring-1 ring-white/10"
              >
                Demande professionnelle
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-16 border-t border-stone-900">
            <div>
              <span className="font-serif text-3xl tracking-widest text-gold uppercase block mb-4">
                CARTHÉA
              </span>
              <p className="text-xs text-sand/30 uppercase tracking-[0.1em]">
                © 2024 CARTHÉA Tunisie. Tous droits réservés.
              </p>
            </div>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] text-sand/60">
              <div className="flex flex-col gap-2">
                <span className="text-gold/80 mb-2">Social</span>
                <a href="https://instagram.com" className="hover:text-sand transition-colors">
                  Instagram
                </a>
                <a href="https://vimeo.com" className="hover:text-sand transition-colors">
                  Vimeo
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gold/80 mb-2">Légal</span>
                <a href="#" className="hover:text-sand transition-colors">
                  Confidentialité
                </a>
                <a href="#" className="hover:text-sand transition-colors">
                  Livraison
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
