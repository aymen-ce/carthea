export function SiteFooter() {
  return (
    <footer id="contact" className="bg-obsidian border-t border-white/5">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <span className="font-serif text-3xl uppercase tracking-[0.42em] text-gold">
              Carthéa
            </span>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-sand/50">
              Huile d'olive vierge extra de Tunisie — Djebel Bargou, Siliana.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-8 text-[11px] uppercase tracking-[0.22em] text-sand/55">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] text-gold/70">Écrire</span>
              <a
                href="mailto:hello@carthea.tn"
                className="normal-case tracking-normal text-sand/70 transition-colors hover:text-gold"
              >
                hello@carthea.tn
              </a>
              <a
                href="mailto:trade@carthea.tn"
                className="normal-case tracking-normal text-sand/70 transition-colors hover:text-gold"
              >
                trade@carthea.tn
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] text-gold/70">Suivre</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-gold"
              >
                Vimeo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand/30">
            © 2024 CARTHÉA Tunisie. Tous droits réservés.
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-sand/30">
            Produit de Tunisie
          </p>
        </div>
      </div>
    </footer>
  );
}
