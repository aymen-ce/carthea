import type { ReactNode } from "react";

/** Micro-label capitales espacées, ponctué d'un filet or. */
export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gold/90 ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gold/50" />
      {children}
    </span>
  );
}
