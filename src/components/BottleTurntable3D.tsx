import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * BottleTurntable3D — bouteille CARTHÉA en 3D, tournable à 360° au doigt/à la souris.
 *
 * Ce n'est pas une photo (une vraie photo ne peut pas tourner sur elle-même à partir
 * d'un seul angle), mais rien n'y est inventé : la géométrie (silhouette, largeurs,
 * hauteurs) est mesurée sur la photo studio réelle de la bouteille Marasca 250 ml, et
 * l'étiquette plaquée sur ce modèle est le fichier d'étiquette réel, approuvé pour
 * impression — pas une image générée. Seule la couleur de la capsule (et son fin
 * liseré or pour Premium/Bio) vient d'une décision de teinte déjà validée par Aymen
 * (05/09/2026) ; elle n'est pas non plus inventée ici.
 *
 * Interaction : glisser horizontalement (souris, doigt, ou flèches gauche/droite au
 * clavier) fait tourner la bouteille. Aucune rotation automatique — le mouvement ne
 * vient que d'un geste de la personne qui regarde, donc `prefers-reduced-motion` n'a
 * rien à couper ici ; on l'utilise seulement pour supprimer l'inertie de fin de geste.
 */

type Variant = "classique" | "premium" | "bio";

type BottleTurntable3DProps = {
  variant: Variant;
  /** étiquette réelle, à plat, développée sur 360° (fichier d'impression approuvé) */
  labelSrc: string;
  alt: string;
  className?: string;
};

// ---------------------------------------------------------------------------
// Géométrie réelle, relevée sur la photo studio de référence (Marasca 250 ml).
// Même flacon physique pour les 3 gammes — seules l'étiquette et la couleur de
// capsule changent. Aucune cote inventée ici (voir turntable3d.html d'origine).
// ---------------------------------------------------------------------------
const A_BODY = 23.55; // demi-largeur du corps (mm)
const RC_BODY = 3.5; // rayon d'angle du corps carré (mm)
const R_NECK = 14.05; // demi-largeur du col (mm)
const R_CAP = 15.7; // rayon de la capsule (mm)

const H_NECK_TOP = 213.0; // haut du verre, masqué par la capsule (mm)
const H_CAP_BOT = 190.6; // bas de la capsule (mm)
const H_CAP_TOP = 214.3; // sommet de la capsule (mm)

const LAB_BOT = 9.7;
const LAB_TOP = 134.7; // étiquette 125 mm, à 9,7 mm du culot
const LAB_W = 125.0; // largeur développée de l'étiquette (mm)

// [hauteur mm depuis le culot, demi-largeur mm] — relevé sur la silhouette réelle
const PROFILE: Array<[number, number]> = [
  [0.0, 20.6], [1.0, 22.4], [2.0, 23.15], [3.5, 23.45], [6.0, 23.53],
  [15, 23.55], [40, 23.57], [70, 23.58], [100, 23.58], [120, 23.55],
  [134.6, 23.45], [137.1, 23.42], [138.7, 23.35], [140.3, 23.24],
  [142.0, 23.12], [143.6, 23.06], [145.2, 22.82], [146.9, 22.35],
  [148.5, 21.89], [150.2, 21.3], [151.8, 20.72], [153.4, 19.84],
  [155.1, 19.02], [156.7, 17.97], [158.4, 16.91], [160.0, 15.98],
  [161.6, 15.16], [163.3, 14.57], [165.7, 14.28], [170.0, 14.16],
  [178.0, 14.04], [186.0, 14.0], [190.0, 14.1], [200.0, 14.2],
  [213.0, 14.25],
];

// couleur du verre relevée hauteur par hauteur sur l'axe de la photo réelle
const GLASS_STOPS: Array<[number, string]> = [
  [0, "#1e1c17"], [6, "#28251c"], [14, "#3a3419"], [30, "#4c3c0d"], [60, "#5f4708"],
  [95, "#775702"], [125, "#8a6301"], [137, "#916701"], [145, "#8f6702"],
  [152, "#88690f"], [157, "#867020"], [161, "#745c17"], [166, "#5e4402"],
  [175, "#563e02"], [195, "#523b02"], [213, "#4e3802"],
];

// Couleurs de capsule validées par Aymen le 05/09/2026 : Classique noire sans
// liseré (telle qu'à l'origine sur la vraie photo) ; Premium et Bio avec le
// même fin liseré or que l'emblème de la marque.
const CAPSULE_BY_VARIANT: Record<Variant, { color: number; liseret: boolean }> = {
  classique: { color: 0x181715, liseret: false },
  premium: { color: 0x6c6540, liseret: true },
  bio: { color: 0x606e58, liseret: true },
};
const GOLD_LISERE = 0xc4a86e;

const NSEG = 224; // segments autour de la circonférence

// ---------------------------------------------------------------------------
// Table lissée du profil (sinon on voit des anneaux sur l'épaule)
// ---------------------------------------------------------------------------
function buildLUT() {
  const step = 0.1;
  const n = Math.ceil(H_NECK_TOP / step) + 1;
  const raw = new Float64Array(n);
  for (let k = 0; k < n; k++) {
    const h = k * step;
    let v = PROFILE[PROFILE.length - 1]![1];
    if (h <= PROFILE[0]![0]) v = PROFILE[0]![1];
    else {
      for (let i = 1; i < PROFILE.length; i++) {
        if (h <= PROFILE[i]![0]) {
          const [h0, w0] = PROFILE[i - 1]!;
          const [h1, w1] = PROFILE[i]!;
          v = w0 + ((w1 - w0) * (h - h0)) / (h1 - h0);
          break;
        }
      }
    }
    raw[k] = v;
  }
  const sig = 11;
  const rad = 34;
  const ker: number[] = [];
  let sum = 0;
  for (let i = -rad; i <= rad; i++) {
    const w = Math.exp(-(i * i) / (2 * sig * sig));
    ker.push(w);
    sum += w;
  }
  const out = new Float64Array(n);
  for (let k = 0; k < n; k++) {
    let a = 0;
    for (let i = -rad; i <= rad; i++) a += raw[Math.min(n - 1, Math.max(0, k + i))]! * ker[i + rad]!;
    out[k] = a / sum;
  }
  return { step, n, out };
}
const LUT = buildLUT();

function halfWidthAt(h: number) {
  const x = Math.min(LUT.n - 1.001, Math.max(0, h / LUT.step));
  const k = Math.floor(x);
  const t = x - k;
  return LUT.out[k]! * (1 - t) + LUT.out[Math.min(LUT.n - 1, k + 1)]! * t;
}
// carré-itude : 1 = carré arrondi du corps, 0 = cercle du col
function rcAt(h: number) {
  const a = halfWidthAt(h);
  let q = (a - R_NECK) / (A_BODY - R_NECK);
  q = Math.max(0, Math.min(1, q));
  const sm = q * q * (3 - 2 * q);
  return a * (1 - sm) + RC_BODY * (a / A_BODY) * sm;
}

type Pt = [number, number, number?];
function sectionPath(a: number, rc: number) {
  const pts: Pt[] = [];
  const push = (x: number, z: number) => pts.push([x, z]);
  const arc = (cx: number, cz: number, r: number, a0: number, a1: number, n: number) => {
    for (let i = 1; i <= n; i++) {
      const t = a0 + (a1 - a0) * (i / n);
      push(cx + r * Math.sin(t), cz + r * Math.cos(t));
    }
  };
  const line = (x0: number, z0: number, x1: number, z1: number, n: number) => {
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      push(x0 + (x1 - x0) * t, z0 + (z1 - z0) * t);
    }
  };
  const s = Math.max(0, a - rc);
  const N = 48;
  push(0, a);
  line(0, a, s, a, N);
  arc(s, s, rc, 0, Math.PI / 2, N);
  line(a, s, a, -s, 2 * N);
  arc(s, -s, rc, Math.PI / 2, Math.PI, N);
  line(s, -a, -s, -a, 2 * N);
  arc(-s, -s, rc, Math.PI, 1.5 * Math.PI, N);
  line(-a, -s, -a, s, 2 * N);
  arc(-s, s, rc, 1.5 * Math.PI, 2 * Math.PI, N);
  line(-s, a, 0, a, N);
  let L = 0;
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const pi = pts[i]!;
    const pPrev = pts[i - 1]!;
    L += Math.hypot(pi[0] - pPrev[0], pi[1] - pPrev[1]);
    cum.push(L);
  }
  return { pts, cum, per: L };
}
function resample(path: ReturnType<typeof sectionPath>, N: number, s0 = 0) {
  const out: Pt[] = [];
  for (let i = 0; i < N; i++) {
    const s = (path.per * (i / N) + s0) % path.per;
    let k = 1;
    while (k < path.cum.length - 1 && path.cum[k]! < s) k++;
    const t = (s - path.cum[k - 1]!) / (path.cum[k]! - path.cum[k - 1]! || 1);
    const p0 = path.pts[k - 1]!;
    const p1 = path.pts[k]!;
    out.push([p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t, s]);
  }
  return { pt: out, per: path.per };
}

function buildShell(h0: number, h1: number, rows: number, offset: number, uvMode: "plain" | "label") {
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const hs: number[] = [];
  for (let j = 0; j <= rows; j++) {
    const t = j / rows;
    hs.push(h0 + (h1 - h0) * (0.45 * t + 0.55 * (t * t * (3 - 2 * t))));
  }
  const rings = hs.map((h) => {
    const a = halfWidthAt(h);
    const rc = Math.min(rcAt(h), a);
    const per = sectionPath(a + offset, Math.min(rc + offset, a + offset)).per;
    const r = resample(sectionPath(a + offset, Math.min(rc + offset, a + offset)), NSEG, per / 2);
    return { h, r };
  });
  for (let j = 0; j < rings.length; j++) {
    const { h, r } = rings[j]!;
    for (let i = 0; i <= NSEG; i++) {
      const p = r.pt[i % NSEG]!;
      pos.push(p[0], h, p[1] as number);
      let s = p[2] as number;
      if (s > r.per / 2) s -= r.per;
      if (i === NSEG) s = r.per / 2; // vertex de couture (arrière)
      if (uvMode === "label") uv.push(s / LAB_W + 0.5, (h - LAB_BOT) / (LAB_TOP - LAB_BOT));
      else uv.push(i / NSEG, (h - h0) / (h1 - h0));
    }
  }
  for (let j = 0; j < rings.length - 1; j++) {
    for (let i = 0; i < NSEG; i++) {
      const a = j * (NSEG + 1) + i;
      const b = a + 1;
      const c = a + NSEG + 1;
      const d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function BottleTurntable3D({ variant, labelSrc, alt, className = "" }: BottleTurntable3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  // n'initialise le WebGL que quand le composant entre dans l'écran
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const mountEl = canvasWrapRef.current;
    if (!mountEl) return;
    const mount: HTMLDivElement = mountEl;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", alt);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(10.5, 720 / 1800, 10, 6000);
    cam.position.set(0, 107, 1500);
    cam.lookAt(0, 104, 0);

    // environnement studio procédural (softbox) : reflets spéculaires du verre
    const env = (function () {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 512;
      const x = c.getContext("2d")!;
      const g = x.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, "#3a3a3e");
      g.addColorStop(0.44, "#2a2a2e");
      g.addColorStop(0.52, "#5a585d");
      g.addColorStop(1, "#d8d6da");
      x.fillStyle = g;
      x.fillRect(0, 0, 1024, 512);
      const box = (cx: number, cy: number, w: number, h: number, v: number) => {
        const r = x.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        r.addColorStop(0, `rgba(255,255,255,${v})`);
        r.addColorStop(0.55, `rgba(255,255,255,${v * 0.85})`);
        r.addColorStop(1, "rgba(255,255,255,0)");
        x.fillStyle = r;
        x.fillRect(cx - w, cy - h, 2 * w, 2 * h);
      };
      box(228, 150, 52, 128, 1.0);
      box(806, 168, 44, 112, 0.9);
      box(512, 40, 260, 38, 0.45);
      const t = new THREE.CanvasTexture(c);
      t.mapping = THREE.EquirectangularReflectionMapping;
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    scene.environment = env;

    // ombre de contact au sol (le fond de la section reste transparent — pas de
    // plan de studio derrière la bouteille, elle pose directement sur le fond
    // obsidienne du site, comme le packshot photo)
    function shadowSprite(w: number, d: number, x0: number, z0: number, stops: Array<[number, number]>) {
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(256, 256, 0, 256, 256, 256);
      stops.forEach(([p, a]) => g.addColorStop(p, `rgba(46,43,38,${a})`));
      x.fillStyle = g;
      x.fillRect(0, 0, 512, 512);
      x.filter = "blur(6px)";
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false }),
      );
      m.rotation.x = -Math.PI / 2;
      m.position.set(x0, 0.05, z0);
      m.renderOrder = 1;
      return m;
    }
    scene.add(shadowSprite(200, 86, 34, 10, [[0, 0.4], [0.3, 0.27], [0.6, 0.1], [0.85, 0.02], [1, 0]]));
    scene.add(shadowSprite(84, 52, 3, 4, [[0, 0.55], [0.34, 0.36], [0.66, 0.12], [1, 0]]));

    // lumières
    scene.add(new THREE.AmbientLight(0xffffff, 0.924));
    const key = new THREE.DirectionalLight(0xffffff, 2.86);
    key.position.set(-300, 560, 470);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 1.21);
    fill.position.set(450, 240, 400);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.87);
    rim.position.set(90, 320, -500);
    scene.add(rim);

    // verre : dégradé vertical relevé sur la vraie photo
    const glassTex = (function () {
      const c = document.createElement("canvas");
      c.width = 4;
      c.height = 1024;
      const x = c.getContext("2d")!;
      const g = x.createLinearGradient(0, 1024, 0, 0);
      GLASS_STOPS.forEach(([h, col]) => g.addColorStop(Math.min(1, h / H_NECK_TOP), col));
      x.fillStyle = g;
      x.fillRect(0, 0, 4, 1024);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      emissive: 0xffffff,
      emissiveMap: glassTex,
      emissiveIntensity: 0.82,
      roughness: 0.055,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.028,
      envMapIntensity: 0.45,
      side: THREE.FrontSide,
    });
    const bottle = new THREE.Group();
    scene.add(bottle);
    const bodyGeo = buildShell(0, H_NECK_TOP, 300, 0, "plain");
    (function (g) {
      const uvAttr = g.attributes["uv"] as THREE.BufferAttribute;
      const posAttr = g.attributes["position"] as THREE.BufferAttribute;
      for (let i = 0; i < uvAttr.count; i++) uvAttr.setY(i, posAttr.getY(i) / H_NECK_TOP);
    })(bodyGeo);
    const body = new THREE.Mesh(bodyGeo, glassMat);
    bottle.add(body);

    // culot
    const baseGeo = (function () {
      const a = halfWidthAt(0);
      const r = resample(sectionPath(a, Math.min(rcAt(0), a)), NSEG, 0);
      const pos = [0, 0, 0];
      const uv = [0.5, 0.02];
      const idx: number[] = [];
      for (let i = 0; i <= NSEG; i++) {
        const p = r.pt[i % NSEG]!;
        pos.push(p[0], 0, p[1] as number);
        uv.push(0.5, 0.02);
      }
      for (let i = 1; i <= NSEG; i++) idx.push(0, i + 1, i);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    })();
    bottle.add(new THREE.Mesh(baseGeo, new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x121009, roughness: 0.55 })));

    // capsule — couleur réelle validée par gamme, avec fin liseré or pour Premium/Bio
    const capBump = (function () {
      const c = document.createElement("canvas");
      c.width = 8;
      c.height = 512;
      const x = c.getContext("2d")!;
      x.fillStyle = "#808080";
      x.fillRect(0, 0, 8, 512);
      [0.1, 0.17, 0.235, 0.3, 0.4, 0.55, 0.72, 0.88].forEach((p, i) => {
        const y = p * 512;
        const v = 118 + (i % 2) * 22;
        const g = x.createLinearGradient(0, y - 7, 0, y + 7);
        g.addColorStop(0, "#808080");
        g.addColorStop(0.5, `rgb(${v},${v},${v})`);
        g.addColorStop(1, "#808080");
        x.fillStyle = g;
        x.fillRect(0, y - 7, 8, 14);
      });
      return new THREE.CanvasTexture(c);
    })();
    const CAPSULE = CAPSULE_BY_VARIANT[variant];
    const capMat = new THREE.MeshStandardMaterial({
      color: CAPSULE.color,
      roughness: 0.66,
      metalness: 0.04,
      envMapIntensity: 0.5,
      bumpMap: capBump,
      bumpScale: 0.55,
    });
    const capH = H_CAP_TOP - H_CAP_BOT;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(R_CAP * 0.99, R_CAP * 1.015, capH, 128, 10, true), capMat);
    cap.position.y = (H_CAP_TOP + H_CAP_BOT) / 2;
    bottle.add(cap);
    const capTop = new THREE.Mesh(
      new THREE.CircleGeometry(R_CAP * 0.99, 128),
      new THREE.MeshStandardMaterial({ color: CAPSULE.color, roughness: 0.7 }),
    );
    capTop.rotation.x = -Math.PI / 2;
    capTop.position.y = H_CAP_TOP;
    bottle.add(capTop);
    const capRingMat = CAPSULE.liseret
      ? new THREE.MeshStandardMaterial({ color: GOLD_LISERE, roughness: 0.35, metalness: 0.65, envMapIntensity: 0.9 })
      : capMat;
    const capRing = new THREE.Mesh(new THREE.TorusGeometry(R_CAP * 1.012, CAPSULE.liseret ? 0.85 : 0.5, 10, 128), capRingMat);
    capRing.rotation.x = Math.PI / 2;
    capRing.position.y = H_CAP_BOT + 0.9;
    bottle.add(capRing);

    // étiquette réelle (fichier d'impression approuvé, pas une image générée)
    let labelMesh: THREE.Mesh | null = null;
    const loader = new THREE.TextureLoader();
    loader.load(labelSrc, (labelTex) => {
      if (disposed) {
        labelTex.dispose();
        return;
      }
      labelTex.colorSpace = THREE.SRGBColorSpace;
      labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      labelTex.wrapS = labelTex.wrapT = THREE.ClampToEdgeWrapping;
      const labelMat = new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.66, metalness: 0.0, envMapIntensity: 0.7 });
      const labelGeo = buildShell(LAB_BOT, LAB_TOP, 120, 0.16, "label");
      (function trim(g) {
        const uvAttr = g.attributes["uv"] as THREE.BufferAttribute;
        const ix = g.index!.array as Uint32Array | Uint16Array;
        const keep: number[] = [];
        for (let i = 0; i < ix.length; i += 3) {
          const ia = ix[i]!;
          const ib = ix[i + 1]!;
          const ic = ix[i + 2]!;
          const us = [uvAttr.getX(ia), uvAttr.getX(ib), uvAttr.getX(ic)];
          if (Math.min(...us) >= -0.0005 && Math.max(...us) <= 1.0005) keep.push(ia, ib, ic);
        }
        g.setIndex(keep);
      })(labelGeo);
      labelMesh = new THREE.Mesh(labelGeo, labelMat);
      bottle.add(labelMesh);
      renderFrame();
      setReady(true);
    });

    function renderFrame() {
      renderer.render(scene, cam);
    }

    // ------------------------------------------------------------------
    // Taille / redimensionnement : buffer interne au ratio validé (720/1800),
    // mis à l'échelle du conteneur, capé pour la performance.
    // ------------------------------------------------------------------
    function resize() {
      const rect = mount.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, true);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderFrame();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ------------------------------------------------------------------
    // Rotation au geste — souris, doigt, clavier. Aucune rotation automatique :
    // le mouvement ne vient que d'une action de la personne qui regarde.
    // ------------------------------------------------------------------
    let dragging = false;
    let lastX = 0;
    let velocity = 0; // degrés/ms, pour l'inertie de fin de geste
    let lastT = 0;
    let momentumRAF = 0;

    function stopMomentum() {
      if (momentumRAF) cancelAnimationFrame(momentumRAF);
      momentumRAF = 0;
    }
    function runMomentum() {
      stopMomentum();
      if (reduceMotion || Math.abs(velocity) < 0.002) return;
      const step = () => {
        velocity *= 0.94;
        bottle.rotation.y += (velocity * 16) * (Math.PI / 180);
        renderFrame();
        if (Math.abs(velocity) > 0.002) momentumRAF = requestAnimationFrame(step);
      };
      momentumRAF = requestAnimationFrame(step);
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      stopMomentum();
      lastX = e.clientX;
      lastT = performance.now();
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(1, now - lastT);
      const degPerPx = 0.35;
      bottle.rotation.y += dx * degPerPx * (Math.PI / 180);
      velocity = (dx * degPerPx) / dt;
      lastX = e.clientX;
      lastT = now;
      renderFrame();
    }
    function onPointerUp(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      renderer.domElement.style.cursor = "grab";
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      runMomentum();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        stopMomentum();
        const dir = e.key === "ArrowLeft" ? -1 : 1;
        bottle.rotation.y += dir * 12 * (Math.PI / 180);
        renderFrame();
      }
    }

    const el = renderer.domElement;
    el.style.touchAction = "none";
    el.tabIndex = 0;
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      stopMomentum();
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("keydown", onKeyDown);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      env.dispose();
      glassTex.dispose();
      capBump.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, variant, labelSrc, alt]);

  return (
    <div
      ref={hostRef}
      className={`relative mx-auto aspect-[720/1800] w-[min(58vw,15.5rem)] lg:w-[min(20vw,17.5rem)] ${className}`}
    >
      <div
        ref={canvasWrapRef}
        className="h-full w-full transition-opacity duration-700 ease-out"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
