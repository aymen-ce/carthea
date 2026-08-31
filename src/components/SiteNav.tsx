import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type NavItem = { label: string; hash?: string; to?: string };

const ITEMS: NavItem[] = [
  { label: "L'Origine", hash: "heritage" },
  { label: "La Gamme", hash: "gamme" },
  { label: "Les Formats", hash: "formats" },
  { label: "Millésime", hash: "collection" },
  { label: "Contact", to: "/contact" },
];

export function SiteNav({ variant = "home" }: { variant?: "home" | "page" }) {
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
    "relative text-[11px] uppercase tracking-[0.28em] text-sand/70 transition-colors duration-300 hover:text-gold focus-visible:text-gold after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full";

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
          className="font-serif text-xl sm:text-2xl uppercase tracking-[0.42em] text-gold transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          Carthéa
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {ITEMS.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={href(item)} className={linkClass}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[7px]"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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
        className={`md:hidden fixed inset-0 top-20 bg-obsidian transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Navigation mobile" className="h-full px-6 pt-10">
          <ul className="flex flex-col divide-y divide-white/5 border-y border-white/5">
            {ITEMS.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-serif text-3xl text-sand transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={href(item)}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-serif text-3xl text-sand transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-sand/35">
            Djebel Bargou, Siliana — Tunisie
          </p>
        </nav>
      </div>
    </header>
  );
}
