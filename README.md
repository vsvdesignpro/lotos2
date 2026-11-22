# LOTOS Educational Site

This is a separate static study edition of the LOTOS website for the public `vsvdesignpro/lotos2` GitHub Pages repository. It contains no booking form, administration interface, request endpoint, database connection, Telegram integration, or live price fetch. The owner approved the current concept images for this educational edition; the page identifies them as concepts rather than verified property photographs.

## Build

Use Node.js 24+ and pnpm 11+:

```bash
pnpm install
pnpm typograph
pnpm typecheck
pnpm build
```

For a local browser review, run `node scripts/serve-export.mjs` after `pnpm build` in one terminal and `node scripts/check-preview.mjs` in another. The check uses the locally installed Microsoft Edge path in that script and saves ignored screenshots to `.preview/`.

The static output is in `out/` and uses the `/lotos2` project path. The public Russian strings are authored in `content/copy.ru.json`; `pnpm typograph` generates `src/content/copy.ru.json` before the build.

## GitHub Pages

The site is live at [`https://vsvdesignpro.github.io/lotos2/`](https://vsvdesignpro.github.io/lotos2/). The owner selected **Settings → Pages → Build and deployment → GitHub Actions** and successfully ran the first deployment manually; the live page was opened and visually checked on a phone-sized viewport. The repository contains `.github/workflows/pages.yml`. Every push to `main` now starts a build and deployment automatically; changes in other branches do not publish. The workflow installs pinned dependencies, checks TypeScript, builds the static `out/` directory, and deploys that directory. The project path is `/lotos2`. Check the **Actions** tab for the result of each deployment.

## Publication checks

- Review every public statement, image, and link. Most current images are concept material and do not depict verified property features; their use in this educational edition was approved by the owner.
- The educational edition uses the MIT-licensed Typograf package for its copy pipeline. Review the generated Russian typesetting after dependency updates.
- Inspect the complete public source tree and the generated `out/` for secrets, internal files, personal data, server requests, and broken `/lotos2` paths.
- Review the page on phone and desktop, including reduced motion and keyboard access.
- The independent local Git repository tracks `vsvdesignpro/lotos2`. Never push the private application's Git history or source tree here.
