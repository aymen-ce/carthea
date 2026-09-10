/**
 * Contrôle qu'un visuel produit respecte les cotes du catalogue.
 *
 * Un visuel généré peut être joli et faux : c'est ainsi que le PET s'est
 * retrouvé affiché à 279 mm de large pour 110 mm réels. Ce script mesure la
 * vraie boîte englobante du canal alpha — sur les DEUX axes, la marge
 * transparente latérale étant précisément ce qui avait été oublié — puis
 * compare le rapport largeur/hauteur du produit à celui du catalogue.
 *
 *   bun scripts/verifie-visuel.ts <image.png> <format> [contenance]
 *
 * Exemples :
 *   bun scripts/verifie-visuel.ts src/assets/pack-marasca-classique.png marasca
 *   bun scripts/verifie-visuel.ts nouveau.png pet "5 L"
 *
 * Sort en code 1 si l'écart dépasse la tolérance, pour un usage en CI.
 */

import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

import { FORMATS, findFormat } from "../src/lib/mcp/catalog";

/** Au-delà, l'écart se voit à l'œil sur la scène produit. */
const TOLERANCE_PCT = 3;

/** Un pixel compte comme produit au-dessus de ce seuil d'alpha. */
const ALPHA_SEUIL = 16;

type Bbox = {
  fileWidth: number;
  fileHeight: number;
  width: number;
  height: number;
  padPct: number;
};

/** Boîte englobante du canal alpha d'un PNG RGBA 8 bits non entrelacé. */
function alphaBbox(file: string): Bbox {
  const d = readFileSync(file);
  if (d.readUInt32BE(0) !== 0x89504e47) {
    throw new Error(
      `${file} n'est pas un PNG. Le contrôle ne lit que le PNG (le canal alpha du WebP n'est pas décodé ici).`,
    );
  }
  const fileWidth = d.readUInt32BE(16);
  const fileHeight = d.readUInt32BE(20);
  const [depth, colorType, , , interlace] = [d[24]!, d[25]!, d[26]!, d[27]!, d[28]!];
  if (colorType !== 6 || depth !== 8 || interlace !== 0) {
    throw new Error(
      `${file} : PNG RGBA 8 bits non entrelacé attendu (reçu type ${colorType}, ${depth} bits, entrelacement ${interlace}).`,
    );
  }

  const chunks: Buffer[] = [];
  for (let i = 8; i < d.length;) {
    const len = d.readUInt32BE(i);
    if (d.toString("ascii", i + 4, i + 8) === "IDAT") chunks.push(d.subarray(i + 8, i + 8 + len));
    i += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(chunks));

  const bpp = 4;
  const stride = fileWidth * 4;
  let prev = Buffer.alloc(stride);
  let x0 = fileWidth,
    x1 = -1,
    y0 = fileHeight,
    y1 = -1;
  let pos = 0;

  for (let y = 0; y < fileHeight; y++) {
    const filter = raw[pos++]!;
    const line = Buffer.from(raw.subarray(pos, pos + stride));
    pos += stride;

    // Défiltrage PNG : chaque ligne se reconstruit depuis la précédente.
    for (let k = 0; k < stride; k++) {
      const a = k >= bpp ? line[k - bpp]! : 0;
      const b = prev[k]!;
      const c = k >= bpp ? prev[k - bpp]! : 0;
      let add = 0;
      if (filter === 1) add = a;
      else if (filter === 2) add = b;
      else if (filter === 3) add = (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a),
          pb = Math.abs(p - b),
          pc = Math.abs(p - c);
        add = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      if (add !== 0) line[k] = (line[k]! + add) & 255;
    }

    for (let x = 0; x < fileWidth; x++) {
      if (line[x * 4 + 3]! > ALPHA_SEUIL) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
    prev = line;
  }

  if (x1 < 0) throw new Error(`${file} : image entièrement transparente.`);
  const width = x1 - x0 + 1;
  const height = y1 - y0 + 1;
  return {
    fileWidth,
    fileHeight,
    width,
    height,
    padPct: ((x0 + (fileWidth - 1 - x1)) / fileWidth) * 100,
  };
}

const [image, formatId, capacityLabel] = process.argv.slice(2);

if (!image || !formatId) {
  console.error("usage : bun scripts/verifie-visuel.ts <image.png> <format> [contenance]");
  console.error(`formats : ${FORMATS.map((f) => f.id).join(", ")}`);
  process.exit(2);
}

const format = findFormat(formatId);
if (!format) {
  console.error(`format inconnu : ${formatId}`);
  console.error(`formats : ${FORMATS.map((f) => f.id).join(", ")}`);
  process.exit(2);
}

const capacity = capacityLabel
  ? format.capacities.find((c) => c.label === capacityLabel)
  : format.capacities[0];
if (!capacity) {
  console.error(`contenance inconnue pour ${format.name} : ${capacityLabel}`);
  console.error(`contenances : ${format.capacities.map((c) => c.label).join(", ")}`);
  process.exit(2);
}

let box: Bbox;
try {
  box = alphaBbox(image);
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(2);
}

const ratioImage = box.width / box.height;
const ratioPlan = capacity.width / capacity.height;
const largeurRamenee = ratioImage * capacity.height;
const ecart = ((ratioImage - ratioPlan) / ratioPlan) * 100;
const conforme = Math.abs(ecart) <= TOLERANCE_PCT;

const mm = (n: number) => n.toFixed(1).replace(".", ",");

console.log(`${format.name} — ${capacity.label}`);
console.log(`  fichier          ${box.fileWidth} × ${box.fileHeight} px`);
console.log(
  `  produit détouré  ${box.width} × ${box.height} px   (marge latérale ${box.padPct.toFixed(1)} %)`,
);
console.log(
  `  rapport l/h      image ${ratioImage.toFixed(4)}   catalogue ${ratioPlan.toFixed(4)}`,
);
console.log(`  largeur ramenée  ${mm(largeurRamenee)} mm   attendu ${mm(capacity.width)} mm`);
console.log(
  `  écart            ${ecart >= 0 ? "+" : ""}${ecart.toFixed(1)} %   →  ${conforme ? "CONFORME" : "À REFAIRE"}  (tolérance ± ${TOLERANCE_PCT} %)`,
);

if (box.padPct > 5) {
  console.log(
    `  note             ${box.padPct.toFixed(1)} % de marge transparente sur les côtés : recadrer au plus près du produit.`,
  );
}

process.exit(conforme ? 0 : 1);
