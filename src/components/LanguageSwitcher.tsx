import { LANGS, useI18n } from "../lib/i18n";

/**
 * Sélecteur de langue discret : FR · EN · العربية.
 * Boutons accessibles, langue active signalée par aria-current et un filet or.
 */
export function LanguageSwitcher({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`flex items-center ${size === "lg" ? "gap-5" : "gap-3"} ${className}`}
    >
      {LANGS.map((l, i) => {
        const active = l.code === lang;
        return (
          <span key={l.code} className="flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden className="text-[10px] text-sand/25">
                ·
              </span>
            ) : null}
            <button
              type="button"
              lang={l.code}
              dir={l.dir}
              aria-label={l.name}
              aria-current={active ? "true" : undefined}
              onClick={() => setLang(l.code)}
              className={`latin relative py-1 transition-colors duration-300 focus-visible:outline-none focus-visible:text-gold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-opacity after:duration-500 ${
                size === "lg" ? "text-sm tracking-[0.2em]" : "text-[11px] tracking-[0.22em]"
              } ${
                active
                  ? "text-gold after:opacity-100"
                  : "text-sand/50 hover:text-sand after:opacity-0"
              } ${l.code === "ar" ? "font-medium tracking-normal" : "uppercase"}`}
            >
              {l.short}
            </button>
          </span>
        );
      })}
    </div>
  );
}
