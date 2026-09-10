/**
 * Profils de contenants — géométrie réelle, exprimée en millimètres.
 *
 * Le comparateur ne met plus une photo à l'échelle : il TRACE le contenant à
 * partir de ses cotes. La différence est de fond — mettre une photo à
 * l'échelle par sa seule hauteur suppose que toutes les contenances d'un même
 * format sont homothétiques, ce qui est faux : la bague est normalisée et ne
 * grandit jamais, alors que le corps, lui, grandit.
 *
 * Deux niveaux de fiabilité, toujours signalés à l'écran :
 *   - `plan`    : chaque cote est relevée sur le plan du verrier.
 *   - `derived` : hauteur, corps et bague viennent du catalogue ; la longueur
 *                 du col et l'épaule sont déduites du format de référence.
 */

export type ProfileSource = "plan" | "derived";

/** Famille de silhouette : le tracé diffère, pas la logique de cotation. */
export type ShapeFamily = "bottle" | "tin" | "jug";

export type BottleProfile = {
  source: ProfileSource;
  /** Référence du plan, quand il y en a un. */
  planRef?: string;
  /** Hauteur totale, mm. */
  height: number;
  /** Largeur (ou Ø) du corps, mm. */
  bodyWidth: number;
  /** Ø extérieur de la bague, mm — constant pour toutes les contenances. */
  ringDiameter: number;
  /** Hauteur de la bague, mm. */
  ringHeight: number;
  /** Décrochement sous bague, mm. */
  step: number;
  /** Hauteur du col, mm. */
  neckHeight: number;
  /** Ø du col sous la bague puis à la naissance de l'épaule, mm. */
  neckTop: number;
  neckBottom: number;
  /** Hauteur de l'épaule, mm. */
  shoulderHeight: number;
  /** Hauteur du corps droit, mm. */
  bodyHeight: number;
  /** Congé de base, mm. */
  baseHeight: number;
  /** Largeur d'appui au sol, mm. */
  baseWidth: number;
};

/**
 * Cotes relevées sur plan. Clé : `<format>-<contenance>`.
 *
 * Marasca 25 cl — plan SOTUVER (Société Tunisienne de Verreries) n° 1299,
 * indice 00, échelle 1/1, 19/11/2014. L'empilement vertical du plan
 * (15,8 + 1 + 25,5 + 23,5 + 142,2 + 3,5) retombe exactement sur les
 * 211,5 mm de hauteur totale, et 211,5 − 15,8 = 195,7 mm, cote également
 * portée au plan.
 */
const PLANS: Record<string, Omit<BottleProfile, "source">> = {
  "marasca-250 ml": {
    planRef: "SOTUVER n° 1299",
    height: 211.5,
    bodyWidth: 46.6,
    ringDiameter: 31.5,
    ringHeight: 15.8,
    step: 1,
    neckHeight: 25.5,
    neckTop: 27.5,
    neckBottom: 28.5,
    shoulderHeight: 23.5,
    bodyHeight: 142.2,
    baseHeight: 3.5,
    baseWidth: 39.6,
  },
};

/**
 * Gabarit par format, utilisé tant qu'aucun plan n'est fourni.
 * `refWidth` sert d'ancrage : l'épaule s'élargit avec le corps, le col non.
 */
type Archetype = {
  family: ShapeFamily;
  ringDiameter: number;
  ringHeight: number;
  step: number;
  neckHeight: number;
  neckTop: number;
  neckBottom: number;
  shoulderHeight: number;
  baseHeight: number;
  /** Largeur d'appui / largeur de corps. */
  baseRatio: number;
  refWidth: number;
};

const ARCHETYPES: Record<string, Archetype> = {
  // Aligné sur le plan SOTUVER : les autres contenances Marasca partagent la
  // même bague normalisée 31,5 et le même col.
  marasca: {
    family: "bottle",
    ringDiameter: 31.5,
    ringHeight: 15.8,
    step: 1,
    neckHeight: 25.5,
    neckTop: 27.5,
    neckBottom: 28.5,
    shoulderHeight: 23.5,
    baseHeight: 3.5,
    baseRatio: 39.6 / 46.6,
    refWidth: 46.6,
  },
  // Même bague Pilferproof 31,5, épaule plus ronde.
  dorica: {
    family: "bottle",
    ringDiameter: 31.5,
    ringHeight: 15.8,
    step: 1,
    neckHeight: 24,
    neckTop: 27.5,
    neckBottom: 29,
    shoulderHeight: 30,
    baseHeight: 3.5,
    baseRatio: 0.86,
    refWidth: 56.6,
  },
  // Bague BG 21, Ø 30,4 — col plus court, épaule très marquée.
  biolio: {
    family: "bottle",
    ringDiameter: 30.4,
    ringHeight: 15,
    step: 1,
    neckHeight: 20,
    neckTop: 26,
    neckBottom: 27.5,
    shoulderHeight: 26,
    baseHeight: 3,
    baseRatio: 0.9,
    refWidth: 78,
  },
  // Bidon fer-blanc : bouchon à vis Ø 42, corps rectangulaire.
  bidon: {
    family: "tin",
    ringDiameter: 42,
    ringHeight: 12,
    step: 2,
    neckHeight: 10,
    neckTop: 42,
    neckBottom: 42,
    shoulderHeight: 14,
    baseHeight: 4,
    baseRatio: 1,
    refWidth: 95,
  },
  // Bidon PET : bouchon à vis 38, poignée intégrée.
  pet: {
    family: "jug",
    ringDiameter: 38,
    ringHeight: 12,
    step: 2,
    neckHeight: 18,
    neckTop: 36,
    neckBottom: 38,
    shoulderHeight: 34,
    baseHeight: 4,
    baseRatio: 0.94,
    refWidth: 110,
  },
};

export function shapeFamily(formatId: string): ShapeFamily {
  return ARCHETYPES[formatId]?.family ?? "bottle";
}

/**
 * Profil d'une contenance. Renvoie les cotes du plan si elles existent,
 * sinon un profil déduit — la bague et le col restent constants, seuls
 * l'épaule et le corps suivent la contenance.
 */
export function bottleProfile(
  formatId: string,
  capacityLabel: string,
  height: number,
  bodyWidth: number,
): BottleProfile {
  const plan = PLANS[`${formatId}-${capacityLabel}`];
  if (plan) return { source: "plan", ...plan };

  const a = ARCHETYPES[formatId] ?? ARCHETYPES["marasca"]!;
  // L'épaule s'élargit avec le corps ; la bague et le col, normalisés, non.
  const shoulderHeight = a.shoulderHeight * Math.sqrt(bodyWidth / a.refWidth);
  const fixed = a.ringHeight + a.step + a.neckHeight + shoulderHeight + a.baseHeight;
  // Un corps ne peut pas être négatif : sur les contenants très bas (100 ml),
  // on comprime l'épaule plutôt que de produire une silhouette impossible.
  const bodyHeight = Math.max(height * 0.18, height - fixed);
  const overflow = fixed + bodyHeight - height;
  const shoulder = Math.max(4, shoulderHeight - Math.max(0, overflow));

  return {
    source: "derived",
    height,
    bodyWidth,
    ringDiameter: a.ringDiameter,
    ringHeight: a.ringHeight,
    step: a.step,
    neckHeight: a.neckHeight,
    neckTop: a.neckTop,
    neckBottom: a.neckBottom,
    shoulderHeight: shoulder,
    bodyHeight: height - (a.ringHeight + a.step + a.neckHeight + shoulder + a.baseHeight),
    baseHeight: a.baseHeight,
    baseWidth: bodyWidth * a.baseRatio,
  };
}
