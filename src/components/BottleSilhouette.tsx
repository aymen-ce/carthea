import type { BottleProfile, ShapeFamily } from "../lib/bottle-profile";

/**
 * Silhouette tracée à l'échelle physique, en millimètres convertis en pixels.
 *
 * Rien n'est ici mis à l'échelle « au jugé » : chaque segment vertical et
 * chaque largeur sortent du profil. Changer de contenance déplace le corps,
 * jamais la bague — c'est le comportement réel du contenant.
 */

type Props = {
  profile: BottleProfile;
  family: ShapeFamily;
  /** Pixels par millimètre. */
  scale: number;
  /** Teinte de l'étiquette, pour distinguer les gammes. */
  labelFill: string;
  labelStroke: string;
  title: string;
};

/** Silhouette de bouteille : bague, col, épaule, corps, congé de base. */
function bottlePath(p: BottleProfile, k: number, cx: number) {
  const x = (mm: number) => cx + mm * k;
  const y = (mm: number) => mm * k;
  const rRing = p.ringDiameter / 2;
  const rTop = p.neckTop / 2;
  const rBot = p.neckBottom / 2;
  const rBody = p.bodyWidth / 2;
  const rBase = p.baseWidth / 2;

  const yRing = p.ringHeight;
  const yStep = yRing + p.step;
  const yNeck = yStep + p.neckHeight;
  const yShoulder = yNeck + p.shoulderHeight;
  const yBody = yShoulder + p.bodyHeight;
  const yBottom = p.height;

  // Poignées de l'épaule : tangente verticale au départ du col comme à
  // l'arrivée sur le corps, pour retrouver le double rayon du plan (R8/R25).
  const c1 = p.shoulderHeight * 0.42;
  const c2 = p.shoulderHeight * 0.48;

  return [
    `M ${x(-rRing)} ${y(0)}`,
    `L ${x(rRing)} ${y(0)}`,
    `L ${x(rRing)} ${y(yRing)}`,
    `L ${x(rTop)} ${y(yStep)}`,
    `L ${x(rBot)} ${y(yNeck)}`,
    `C ${x(rBot)} ${y(yNeck + c1)} ${x(rBody)} ${y(yShoulder - c2)} ${x(rBody)} ${y(yShoulder)}`,
    `L ${x(rBody)} ${y(yBody)}`,
    `Q ${x(rBody)} ${y(yBottom)} ${x(rBase)} ${y(yBottom)}`,
    `L ${x(-rBase)} ${y(yBottom)}`,
    `Q ${x(-rBody)} ${y(yBottom)} ${x(-rBody)} ${y(yBody)}`,
    `L ${x(-rBody)} ${y(yShoulder)}`,
    `C ${x(-rBody)} ${y(yShoulder - c2)} ${x(-rBot)} ${y(yNeck + c1)} ${x(-rBot)} ${y(yNeck)}`,
    `L ${x(-rTop)} ${y(yStep)}`,
    `L ${x(-rRing)} ${y(yRing)}`,
    "Z",
  ].join(" ");
}

/** Bidon métallique : corps parallélépipédique, épaulement court, bouchon décentré. */
function tinPath(p: BottleProfile, k: number, cx: number) {
  const x = (mm: number) => cx + mm * k;
  const y = (mm: number) => mm * k;
  const rRing = p.ringDiameter / 2;
  const rBody = p.bodyWidth / 2;
  const off = rBody * 0.45; // bouchon décalé, comme sur un bidon d'huile
  const yTop = p.ringHeight + p.step + p.neckHeight;
  const yShoulder = yTop + p.shoulderHeight;

  return [
    `M ${x(off - rRing)} ${y(0)}`,
    `L ${x(off + rRing)} ${y(0)}`,
    `L ${x(off + rRing)} ${y(yTop)}`,
    `L ${x(rBody)} ${y(yShoulder)}`,
    `L ${x(rBody)} ${y(p.height)}`,
    `L ${x(-rBody)} ${y(p.height)}`,
    `L ${x(-rBody)} ${y(yShoulder)}`,
    `L ${x(off - rRing)} ${y(yTop)}`,
    "Z",
  ].join(" ");
}

/** Bidon PET : corps large, épaule galbée, poignée moulée sur le flanc. */
function jugPath(p: BottleProfile, k: number, cx: number) {
  const x = (mm: number) => cx + mm * k;
  const y = (mm: number) => mm * k;
  const rRing = p.ringDiameter / 2;
  const rBody = p.bodyWidth / 2;
  const yRing = p.ringHeight;
  const yNeck = yRing + p.step + p.neckHeight;
  const yShoulder = yNeck + p.shoulderHeight;
  const yBody = yShoulder + p.bodyHeight;

  return [
    `M ${x(-rRing)} ${y(0)}`,
    `L ${x(rRing)} ${y(0)}`,
    `L ${x(rRing)} ${y(yNeck)}`,
    `C ${x(rRing)} ${y(yNeck + p.shoulderHeight * 0.5)} ${x(rBody)} ${y(yShoulder - p.shoulderHeight * 0.45)} ${x(rBody)} ${y(yShoulder)}`,
    `L ${x(rBody)} ${y(yBody)}`,
    `Q ${x(rBody)} ${y(p.height)} ${x(rBody * 0.9)} ${y(p.height)}`,
    `L ${x(-rBody * 0.9)} ${y(p.height)}`,
    `Q ${x(-rBody)} ${y(p.height)} ${x(-rBody)} ${y(yBody)}`,
    `L ${x(-rBody)} ${y(yShoulder)}`,
    `C ${x(-rBody)} ${y(yShoulder - p.shoulderHeight * 0.45)} ${x(-rRing)} ${y(yNeck + p.shoulderHeight * 0.5)} ${x(-rRing)} ${y(yNeck)}`,
    "Z",
  ].join(" ");
}

/** Poignée du bidon PET, tracée à part pour rester un simple filet. */
function jugHandle(p: BottleProfile, k: number, cx: number) {
  const x = (mm: number) => cx + mm * k;
  const y = (mm: number) => mm * k;
  const rBody = p.bodyWidth / 2;
  const top = p.ringHeight + p.step + p.neckHeight + p.shoulderHeight * 0.35;
  const bot = top + p.height * 0.24;
  return [
    `M ${x(rBody * 0.62)} ${y(top)}`,
    `C ${x(rBody * 1.02)} ${y(top)} ${x(rBody * 1.02)} ${y(bot)} ${x(rBody * 0.62)} ${y(bot)}`,
  ].join(" ");
}

export function BottleSilhouette({ profile, family, scale, labelFill, labelStroke, title }: Props) {
  const k = scale;
  const w = Math.max(profile.bodyWidth, profile.ringDiameter) * 1.35;
  const cx = (w / 2) * k;
  const d =
    family === "tin"
      ? tinPath(profile, k, cx)
      : family === "jug"
        ? jugPath(profile, k, cx)
        : bottlePath(profile, k, cx);

  // Bandeau d'étiquette : repère de gamme, posé sur le corps droit.
  const yBodyTop = profile.ringHeight + profile.step + profile.neckHeight + profile.shoulderHeight;
  const labelTop = yBodyTop + profile.bodyHeight * 0.12;
  const labelH = profile.bodyHeight * 0.62;
  const labelW = profile.bodyWidth * 0.84;

  return (
    <svg
      width={w * k}
      height={profile.height * k}
      viewBox={`0 0 ${w * k} ${profile.height * k}`}
      role="img"
      aria-label={title}
      className="overflow-visible"
    >
      <title>{title}</title>
      <path
        d={d}
        fill="rgba(217,177,102,0.06)"
        stroke="rgba(232,230,225,0.85)"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <rect
        x={cx - (labelW / 2) * k}
        y={labelTop * k}
        width={labelW * k}
        height={labelH * k}
        fill={labelFill}
        stroke={labelStroke}
        strokeWidth={0.8}
      />
      {family === "jug" ? (
        <path
          d={jugHandle(profile, k, cx)}
          fill="none"
          stroke="rgba(232,230,225,0.85)"
          strokeWidth={1.1}
        />
      ) : null}
      {/* Filet doré sur la bague : elle ne change jamais d'une contenance à l'autre. */}
      <line
        x1={cx - (profile.ringDiameter / 2) * k}
        y1={1}
        x2={cx + (profile.ringDiameter / 2) * k}
        y2={1}
        stroke="var(--gold)"
        strokeWidth={2}
      />
    </svg>
  );
}
