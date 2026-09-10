import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * BottleShowcase — met en mouvement la photo produit réelle de CARTHÉA.
 *
 * Ce composant n'ajoute AUCUNE image générée : il affiche la photo studio
 * détourée telle quelle et n'anime que sa présentation.
 *   1. apparition à l'entrée dans l'écran (montée + fondu, une seule fois) ;
 *   2. respiration : zoom très lent, en boucle, ancré sur le culot ;
 *   3. reflet qui glisse le long du verre, masqué par la silhouette réelle du
 *      flacon (canal alpha du PNG) — il ne peut donc pas déborder sur le fond ;
 *   4. parallaxe légère au défilement.
 *
 * Les visiteurs ayant activé la réduction des animations dans leur système ne
 * voient aucun mouvement : la photo s'affiche simplement, nette et immobile.
 */

type BottleShowcaseProps = {
  /** photo détournée, pleine résolution (410 px de large) */
  src: string;
  /** version allégée pour petits écrans (240 px), facultative */
  srcSmall?: string;
  alt: string;
  /** amplitude de la respiration, en % (0 = désactivée) */
  zoom?: number;
  /** durée d'un aller-retour de la respiration, en s */
  zoomDuration?: number;
  /** intensité du reflet, en % (0 = désactivé) */
  gloss?: number;
  /** période du reflet, en s */
  glossDuration?: number;
  /** montée à l'apparition, en px */
  rise?: number;
  /** durée de l'apparition, en ms */
  revealDuration?: number;
  /** amplitude de la parallaxe au défilement, en px (0 = désactivée) */
  parallax?: number;
  className?: string;
};

const KEYFRAMES = `
@keyframes carthea-breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(var(--carthea-scale)); }
}
@keyframes carthea-glide {
  0%, 14%   { background-position: 170% 0; }
  62%, 100% { background-position: -70% 0; }
}
@keyframes carthea-rise {
  from { opacity: 0; transform: translateY(var(--carthea-rise)); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export function BottleShowcase({
  src,
  srcSmall,
  alt,
  zoom = 3.2,
  zoomDuration = 16,
  gloss = 34,
  glossDuration = 7.5,
  rise = 26,
  revealDuration = 1100,
  parallax = 16,
  className = "",
}: BottleShowcaseProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [calm, setCalm] = useState(false);

  // respect de la préférence système « réduire les animations »
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // apparition : une seule fois, quand l'élément entre dans l'écran
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (calm || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);

  // parallaxe : la bouteille suit le défilement un peu moins vite que la page
  useEffect(() => {
    if (calm || parallax === 0) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const host = hostRef.current;
        const bottle = bottleRef.current;
        if (host && bottle) {
          const r = host.getBoundingClientRect();
          const p = Math.max(
            -1,
            Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight),
          );
          bottle.style.translate = `0 ${(-p * parallax).toFixed(1)}px`;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [calm, parallax]);

  const animate = !calm;

  return (
    <div
      ref={hostRef}
      className={`relative flex h-full w-full items-end justify-center ${className}`}
      style={
        {
          "--carthea-scale": 1 + zoom / 100,
          "--carthea-rise": `${rise}px`,
        } as CSSProperties
      }
    >
      <style>{KEYFRAMES}</style>

      {/* halo studio : la capsule Classique est noire, elle disparaîtrait
          sinon sur le fond obsidienne du site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 44% at 50% 46%, rgba(120,96,48,0.30) 0%, rgba(120,96,48,0) 70%)",
        }}
      />

      <div
        ref={bottleRef}
        className="relative h-full origin-bottom"
        style={{
          aspectRatio: "410 / 1894",
          maxWidth: "100%",
          opacity: revealed ? 1 : 0,
          animation: revealed
            ? `carthea-rise ${revealDuration}ms cubic-bezier(.22,.61,.36,1) both`
            : undefined,
        }}
      >
        {/* ombre au sol : celle de la photo a été retirée au détourage,
            elle n'aurait pas de sens sur un fond sombre */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-3 left-1/2 h-[8%] w-[170%] max-w-[100vw] -translate-x-1/2"
          style={{
            background: "radial-gradient(closest-side, rgba(0,0,0,0.78), rgba(0,0,0,0) 74%)",
          }}
        />

        <div
          className="relative h-full w-full"
          style={{
            animation:
              animate && zoom > 0
                ? `carthea-breathe ${zoomDuration}s ease-in-out infinite`
                : undefined,
            transformOrigin: "50% 100%",
          }}
        >
          <img
            src={src}
            srcSet={srcSmall ? `${srcSmall} 240w, ${src} 410w` : undefined}
            sizes="(min-width: 1024px) 112px, 80px"
            alt={alt}
            width={410}
            height={1894}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-contain"
          />

          {/* reflet masqué par la silhouette réelle du flacon */}
          {animate && gloss > 0 && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                mixBlendMode: "screen",
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                backgroundImage: `linear-gradient(102deg,
                  rgba(255,255,255,0) 40%,
                  rgba(255,246,224,${gloss / 100}) 47%,
                  rgba(255,246,224,${gloss / 460}) 53%,
                  rgba(255,255,255,0) 61%)`,
                backgroundSize: "280% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "170% 0",
                animation: `carthea-glide ${glossDuration}s ease-in-out infinite`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
