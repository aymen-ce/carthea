import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useI18n, type Dict } from "../lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = { key: keyof Dict["nav"]; hash?: string; to?: string };

const ITEMS: NavItem[] = [
  { key: "heritage", hash: "heritage" },
  { key: "gamme", hash: "gamme" },
  { key: "formats", hash: "formats" },
  { key: "collection", hash: "collection" },
  { key: "contact", to: "/contact" },
];

export function SiteNav({ variant = "home" }: { variant?: "home" | "page" }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(variant === "page");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant === "page") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass =
    "relative text-[11px] uppercase tracking-[0.28em] text-sand/70 transition-colors duration-300 hover:text-gold focus-visible:text-gold after:absolute after:start-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full";

  const href = (item: NavItem) =>
    variant === "home" ? `#${item.hash}` : `/#${item.hash}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-md border-b border-gold/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[88rem] items-center justify-between gap-6 px-6 lg:px-12">
        <Link
          to="/"
          dir="ltr"
          className="latin font-serif text-xl sm:text-2xl uppercase tracking-[0.42em] text-gold transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          Carthéa
        </Link>

        <div className="hidden items-center gap-10 md:flex lg:gap-12">
          <nav aria-label={t.nav.main}>
            <ul className="flex items-center gap-10">
              {ITEMS.map((item) => (
                <li key={item.key}>
                  {item.to ? (
                    <Link to={item.to} className={linkClass}>
                      {t.nav[item.key]}
                    </Link>
                  ) : (
                    <a href={href(item)} className={linkClass}>
                      {t.nav[item.key]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden className="h-4 w-px bg-white/10" />
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="md:hidden -me-2 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[7px]"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t.nav.close : t.nav.open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-sand transition-transform duration-500 ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-sand transition-transform duration-500 ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu plein écran mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className={`md:hidden fixed inset-0 top-20 overflow-y-auto bg-obsidian transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label={t.nav.mobile} className="min-h-full px-6 pt-10 pb-12">
          <ul className="flex flex-col divide-y divide-white/5 border-y border-white/5">
            {ITEMS.map((item) => (
              <li key={item.key}>
                {item.to ? (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-serif text-3xl text-sand transition-colors hover:text-gold"
                  >
                    {t.nav[item.key]}
                  </Link>
                ) : (
                  <a
                    href={href(item)}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-serif text-3xl text-sand transition-colors hover:text-gold"
                  >
                    {t.nav[item.key]}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-b border-white/5 pb-8">
            <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-gold/70">
              {t.nav.language}
            </span>
            <LanguageSwitcher size="lg" />
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-sand/35">
            {t.nav.tagline}
          </p>
        </nav>
      </div>
    </header>
  );
}
