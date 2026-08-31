/**
 * Métriques réelles des visuels d'emballage, mesurées sur le canal alpha des PNG.
 *
 * Les fichiers ne sont jamais modifiés : on décrit seulement, pour chaque image,
 * la part utile du produit dans le cadre. Cela permet d'afficher le produit à la
 * hauteur physique correcte sans jamais l'étirer ni le rogner.
 */
export type PackMetric = {
  /** largeur / hauteur du fichier PNG complet */
  ratio: number;
  /** hauteur du produit visible, en fraction de la hauteur du fichier */
  fh: number;
  /** marge transparente sous le produit, en fraction de la hauteur du fichier */
  fBottom: number;
};

const raw: Record<string, { w: number; h: number; y0: number; y1: number }> = {
  "dorica-classique": { w: 260, h: 880, y0: 0, y1: 880 },
  "dorica-premium": { w: 250, h: 909, y0: 0, y1: 909 },
  "dorica-bio": { w: 279, h: 904, y0: 0, y1: 904 },
  "marasca-classique": { w: 248, h: 879, y0: 0, y1: 879 },
  "marasca-premium": { w: 248, h: 907, y0: 0, y1: 907 },
  "marasca-bio": { w: 253, h: 903, y0: 0, y1: 903 },
  "biolio-classique": { w: 768, h: 1024, y0: 74, y1: 971 },
  "biolio-premium": { w: 768, h: 1024, y0: 92, y1: 940 },
  "biolio-bio": { w: 768, h: 1024, y0: 125, y1: 861 },
  "bidon-classique": { w: 768, h: 1376, y0: 0, y1: 1376 },
  "bidon-premium": { w: 835, h: 1264, y0: 0, y1: 1264 },
  "bidon-bio": { w: 768, h: 1376, y0: 0, y1: 1376 },
  "pet-classique": { w: 768, h: 1024, y0: 111, y1: 910 },
  "pet-premium": { w: 768, h: 1024, y0: 80, y1: 941 },
  "pet-bio": { w: 768, h: 1024, y0: 65, y1: 928 },
};

const FALLBACK: PackMetric = { ratio: 0.3, fh: 1, fBottom: 0 };

export const PACK_METRICS: Record<string, PackMetric> = Object.fromEntries(
  Object.entries(raw).map(([key, m]) => [
    key,
    {
      ratio: m.w / m.h,
      fh: (m.y1 - m.y0) / m.h,
      fBottom: (m.h - m.y1) / m.h,
    },
  ]),
);

export function packMetric(formatId: string, variantId: string): PackMetric {
  return PACK_METRICS[`${formatId}-${variantId}`] ?? FALLBACK;
}

/**
 * Calcule la géométrie d'affichage d'un visuel pour une hauteur produit donnée.
 * Le ratio intrinsèque du PNG est toujours conservé (aucun étirement).
 */
export function packBox(
  formatId: string,
  variantId: string,
  productHeightPx: number,
) {
  const m = packMetric(formatId, variantId);
  const imgHeight = productHeightPx / m.fh;
  return {
    imgHeight,
    imgWidth: imgHeight * m.ratio,
    /** décalage vers le bas pour poser le produit sur la ligne de sol */
    bottomOffset: m.fBottom * imgHeight,
  };
}
