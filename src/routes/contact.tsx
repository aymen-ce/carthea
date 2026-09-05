import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionLabel";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { fill, useDocumentMeta, useI18n } from "../lib/i18n";

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
  const { t } = useI18n();
  useDocumentMeta((dict) => dict.meta.contact);

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const field =
    "w-full border-b border-white/12 bg-transparent py-3 text-sand placeholder:text-sand/30 transition-colors duration-500 focus:border-gold focus:outline-none";

  return (
    <div className="min-h-screen bg-obsidian font-sans text-sand">
      <SiteNav variant="page" />

      <main className="mx-auto grid max-w-[88rem] grid-cols-12 gap-y-16 px-6 pt-36 pb-24 lg:gap-x-16 lg:px-12 lg:pt-44 lg:pb-36">
        <Reveal className="col-span-12 lg:col-span-5">
          <SectionLabel>{t.contact.label}</SectionLabel>
          <h1 className="mt-8 mb-8 font-serif text-[clamp(2.4rem,5.5vw,4rem)] font-medium italic leading-[1.08] text-balance">
            {t.contact.title}
          </h1>
          <p className="mb-12 max-w-[46ch] text-[15px] leading-[1.85] text-pretty text-sand/55">
            {t.contact.lead}
          </p>
          <div className="space-y-6 border-t border-white/8 pt-10 text-sm text-sand/60">
            <p>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {t.contact.orders}
              </span>
              <a href="mailto:hello@carthea.tn" className="hover:text-sand transition-colors">
                hello@carthea.tn
              </a>
            </p>
            <p>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {t.contact.trade}
              </span>
              <a href="mailto:trade@carthea.tn" className="hover:text-sand transition-colors">
                trade@carthea.tn
              </a>
            </p>
            <p>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-gold/80">
                {t.contact.atelier}
              </span>
              {t.contact.atelierValue}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="col-span-12 lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="border border-white/10 p-10">
              <h2 className="mb-3 font-serif text-3xl text-gold">
                {fill(t.contact.thanks, { name: form.name || t.contact.thanksFallback })}
              </h2>
              <p className="text-sm leading-relaxed text-sand/55">{t.contact.sentNote}</p>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(fill(t.contact.subject, { name: form.name }));
                const body = encodeURIComponent(`${form.message}\n\n${form.name} · ${form.email}`);
                window.location.href = `mailto:hello@carthea.tn?subject=${subject}&body=${body}`;
                setSent(true);
              }}
            >
              <input
                required
                className={field}
                placeholder={t.contact.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                className={field}
                placeholder={t.contact.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                required
                rows={5}
                className={field + " resize-none"}
                placeholder={t.contact.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center border border-gold/60 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian"
              >
                {t.contact.send}
              </button>
            </form>
          )}
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
