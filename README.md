# Build Your Site

n7eb na3ml site

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://carthea.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/65dca47a-c6a4-482d-a807-5dd8c4ea3041).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Contrôler un visuel produit

Les silhouettes du comparateur sont tracées depuis les cotes du catalogue, mais
les photos, elles, doivent respecter ces mêmes cotes. Un visuel généré peut être
soigné et faux : c'est ainsi qu'un bidon PET a été affiché à 279 mm de large
pour 110 mm réels, la marge transparente latérale ayant été comptée comme du
produit.

Avant d'ajouter un visuel dans `src/assets`, mesurez-le :

```sh
bun scripts/verifie-visuel.ts src/assets/pack-marasca-classique.png marasca
bun scripts/verifie-visuel.ts nouveau-visuel.png pet "5 L"
```

Le script relève la boîte englobante du canal alpha sur les deux axes, la
compare aux cotes du catalogue et sort en code 1 si l'écart dépasse 3 %.
