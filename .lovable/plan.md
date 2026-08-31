# CARTHÉA — Refonte éditoriale premium

Objectif : passer d'un bon prototype à un site de marque haut de gamme, sans toucher aux données produit, aux visuels d'emballage, ni à l'architecture des routes.

## Ce qui ne change pas

- Les 15 visuels d'emballage et les 2 photos (studio, verger) restent exactement tels quels.
- Toutes les cotes techniques, contenances, bagues, poids et sources restent identiques.
- Routes `/`, `/contact`, `/mcp`, serveur MCP et fichiers générés : inchangés.
- Palette obsidian / or / sable / vert olive, serif Cormorant + sans Instrument.
- Aucune donnée, aucun nom de produit, aucune certification ou origine inventée.

## 0. Direction artistique

Référence : les sites de grandes maisons alimentaires et de luxe méditerranéen — beaucoup de vide, peu d'éléments, chaque image traitée comme une photographie de campagne.

- Composition : grille éditoriale large, marges généreuses, sections respirantes ; jamais plus de deux idées par écran.
- Or : utilisé comme filet, micro-label et accent unique — jamais en aplat large ni en dégradé visible.
- Formes : angles droits, filets de 1 px, pas de border-radius marqué, pas de cartes SaaS, ombres quasi absentes (seulement une ombre portée douce sous les produits détourés).
- Mouvement : uniquement fondu et léger décalage vertical à l'apparition, transitions de 300–600 ms ; rien de gadget, rien de parallaxe, désactivé sous `prefers-reduced-motion`.
- Produits : toujours entourés de vide, jamais rognés ni étirés, alignés sur une ligne de sol commune, tailles cohérentes d'une section à l'autre.
- Ton : sobre, crédible, international — adapté à une clientèle export, notamment le Golfe.



## 1. Fondations design

- Ajouter dans `src/styles.css` une échelle typographique éditoriale (tailles fluides via `clamp`), des tokens de rythme vertical de section, un token vert olive déjà présent dans la gamme, et des états focus visibles en or.
- Ajouter des utilitaires d'animation discrets (fade-up au scroll, transition d'image) désactivés sous `prefers-reduced-motion`.
- Créer des petits composants réutilisables : `SectionLabel` (micro-label capitales espacées), `Reveal` (apparition au scroll via IntersectionObserver, sans librairie), `SiteNav`, `SiteFooter`.

## 2. Navigation

- Barre fixe qui passe de transparente à obsidian avec fine bordure or dès le scroll.
- Desktop : logo à gauche, liens espacés à droite avec soulignement or animé.
- Mobile : bouton menu accessible (aria-expanded), panneau plein écran avec ouverture/fermeture animée, liens L'Origine / La Gamme / Les Formats / Millésime / Contact fonctionnant en ancres et vers `/contact`.
- Même navigation réutilisée sur la page contact.

## 3. Hero

- Composition éditoriale forte : à gauche le nom CARTHÉA en lettrage serif espacé, un micro-label d'origine, un titre court, une phrase de positionnement, puis un CTA discret (filet or, remplissage au survol). À droite, `trioStudio` traité en grande photographie de campagne, avec un vide franc autour et un alignement précis sur la ligne de base du texte.
- Aucune superposition de texte sur les bouteilles, aucun recadrage serré : le trio reste le point focal.
- Mobile : nom, titre, phrase, CTA, puis l'image en pleine largeur avec ratio respecté et respiration verticale ; aucun débordement horizontal.

## 4. Héritage

- `trioVerger` traité en photographie éditoriale pleine hauteur, texte décalé avec filet or et rythme de lecture amélioré. Aucun nouveau fait ajouté.

## 5. La Gamme

- Présentation en triptyque d'une même maison plutôt qu'en trois cartes : un chapeau commun, puis trois colonnes partageant la même ligne de sol et la même hauteur de bouteille, séparées par de simples filets verticaux.
- Chaque colonne utilise le visuel Marasca réel correspondant (classique / premium / bio) déjà présent dans `src/assets`, dominant visuellement, avec en dessous le nom, la palette, la description et la mention de certification existante en petit corps.
- Mobile : empilement avec la même ligne de sol et des filets horizontaux, sans cartes ni coins arrondis.


## 6. FormatExplorer — correction du rendu

Le bug : la largeur et la hauteur affichées sont forcées depuis les millimètres avec `object-fill`, ce qui étire les PNG dont le ratio diffère (et qui contiennent des marges transparentes).

Correction :
- Mesurer le ratio intrinsèque réel de chaque PNG (à l'exécution via `naturalWidth/naturalHeight`, mis en cache par image), puis dimensionner l'image uniquement par la hauteur physique (`height = hauteur_mm × échelle`) et laisser la largeur suivre le ratio, avec `object-contain` et `width: auto`.
- Un cadre de largeur fixe accueille l'image, donc aucun saut de mise en page au changement de format ou de contenance.
- Conserver la règle graduée et l'échelle commune : la comparaison de hauteur entre formats reste physiquement exacte, sans déformation.
- Transitions : fondu croisé court sur l'image, transition douce de la hauteur, aucune image cachée superposée inutilement (une seule image montée, préchargement discret des variantes du format actif).

## 7. FormatExplorer — UX

- Conserver l'architecture liste à gauche / visuel au centre / fiche technique à droite en desktop ; en mobile : sélecteur de format défilable, visuel, puis fiche.
- Parcours lisible en quatre temps annoncés par des micro-labels : étiquette → format → contenance → dimensions. Le ton reste celui d'un catalogue de maison, pas d'un configurateur industriel : peu de bordures, beaucoup de vide, chiffres discrets.
- États actif et survol plus fins (filet or, léger décalage), sélecteur de contenance en pastilles nettes, sélecteur d'étiquette en tête de section.
- Boutons accessibles au clavier avec `aria-pressed` et focus visible.

## 8. Fiche technique

- Lignes en style sommaire éditorial : libellé à gauche, valeur alignée à droite, reliés par un filet pointillé fin, avec un interligne aéré et un petit corps typographique.

```text
Hauteur totale ....................... 274,7 mm
Section .............................. 68 × 68 mm
Poids à vide ......................... ≈ 450 g
```

- Libellé de la dimension du corps adapté au format : `Ø` pour Dorica, Biolio et PET rond, `Section` pour Marasca (carrée) et pour les bidons. Les valeurs restent exactement celles déjà présentes.


## 9. Millésime

- Quatre entrées (Origine, Cépage, Récolte, Dégustation) en grille éditoriale numérotée 01–04, filets fins, aucune donnée ajoutée.

## 10. Footer

- Bloc de marque, contacts, liens sociaux et liens légaux. Les liens `href="#"` (Confidentialité, Livraison) sont remplacés par du texte non cliquable « bientôt disponible » ou retirés — aucune fausse destination créée.

## 11. Page contact

- Mise en page alignée sur la home (même nav, même rythme, même typographie).
- Champs avec `label` réels (visibles ou associés), états focus or, bouton premium, état de succès soigné, responsive mobile. Le `mailto:` existant est conservé tel quel.

## 12. Responsive et qualité

- Vérification à 320, 375, 390, 430, 768, 1024, 1280, 1440 et 1920 px : pas de débordement horizontal, typographie fluide, grilles saines, FormatExplorer lisible.
- Métadonnées `head()` conservées, images sous la ligne de flottaison en `loading="lazy"`, aucune nouvelle dépendance.
- Contrôle final : typecheck, build, parcours des trois routes, test de chaque format / étiquette / contenance et capture des rendus mobile et desktop.

## Détails techniques

- Nouveaux fichiers : `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`, `src/components/Reveal.tsx`, `src/components/SectionLabel.tsx`.
- Fichiers modifiés : `src/routes/index.tsx`, `src/routes/contact.tsx`, `src/components/FormatExplorer.tsx`, `src/styles.css`, et `src/routes/__root.tsx` seulement si un ajout de police ou de style global est nécessaire.
- Aucun changement dans `src/lib/mcp/*`, `routeTree.gen.ts`, `src/routes/mcp.ts` ni dans `src/assets`.
