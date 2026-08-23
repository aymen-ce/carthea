import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CARTHÉA, huile d'olive de Tunisie" },
      {
        name: "description",
        content:
          "Contactez CARTHÉA pour commander le millésime, une demande professionnelle ou une collaboration autour de notre huile d'olive tunisienne.",
      },
      { property: "og:title", content: "Contact — CARTHÉA" },
      {
        property: "og:description",
        content:
          "Écrivez-nous pour commander le millésime CARTHÉA ou pour une demande professionnelle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const field =
    "w-full bg-transparent border-b border-stone-800 py-3 text-sand placeholder:text-sand/30 focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="min-h-screen bg-obsidian text-sand font-sans">
      <nav className="w-full border-b border-stone-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl tracking-widest text-gold uppercase">
            CARTHÉA
          </Link>
          <Link
            to="/"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors"
          >
            Retour
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-5">
          <span className="text-gold text-sm tracking-[0.3em] uppercase block mb-6">
            Contact
          </span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-balance mb-8 font-medium italic">
            Parlons du millésime.
          </h1>
          <p className="text-sand/60 max-w-[46ch] text-pretty mb-10">
            Commandes privées, distribution, presse ou visite des vergers du Djebel Bargou —
            nous répondons sous 48 heures.
          </p>
          <div className="space-y-3 text-sm text-sand/60">
            <p>
              <span className="text-gold/80 uppercase tracking-[0.2em] text-[10px] block mb-1">
                Commandes
              </span>
              <a href="mailto:hello@carthea.tn" className="hover:text-sand transition-colors">
                hello@carthea.tn
              </a>
            </p>
            <p>
              <span className="text-gold/80 uppercase tracking-[0.2em] text-[10px] block mb-1">
                Professionnels
              </span>
              <a href="mailto:trade@carthea.tn" className="hover:text-sand transition-colors">
                trade@carthea.tn
              </a>
            </p>
            <p>
              <span className="text-gold/80 uppercase tracking-[0.2em] text-[10px] block mb-1">
                Atelier
              </span>
              Djebel Bargou, Siliana — Tunisie
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="border border-stone-900 p-10">
              <h2 className="font-serif text-2xl text-gold mb-3">Merci, {form.name || "à bientôt"}.</h2>
              <p className="text-sand/60 text-sm">
                Votre message est prêt à être envoyé depuis votre messagerie.
              </p>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Demande CARTHÉA — ${form.name}`);
                const body = encodeURIComponent(`${form.message}\n\n${form.name} · ${form.email}`);
                window.location.href = `mailto:hello@carthea.tn?subject=${subject}&body=${body}`;
                setSent(true);
              }}
            >
              <input
                required
                className={field}
                placeholder="Nom complet"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                className={field}
                placeholder="Adresse e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                required
                rows={5}
                className={field + " resize-none"}
                placeholder="Votre message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold text-obsidian text-sm uppercase tracking-widest font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
