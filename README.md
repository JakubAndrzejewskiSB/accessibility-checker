# Accessibility checker demo

Test site for the Visual Editor's A11y tab. It uses the published
[`@storyblok/accessibility-checker`](https://www.npmjs.com/package/@storyblok/accessibility-checker)
with `allowedOrigins` open to every origin (see `src/main.ts`), so it works with every Storyfront
environment. For demos and tests only.

## Run locally

```sh
cp .env.template .env   # set VITE_STORYBLOK_TOKEN (preview token of your space)
pnpm install
pnpm dev                # https://localhost:5173/
```

## Deploy to Vercel

1. Import the repository. The Vite preset is detected (`pnpm build`, output `dist`).
2. Add the environment variable `VITE_STORYBLOK_TOKEN`. It is read at build time, so redeploy after
   changing it.

## Use in the Visual Editor

Set the space's preview URL to the Vercel URL (or `https://localhost:5173/` locally) and open the
story `a11y-checker`. The slug is the URL path, so `/some-story` loads `some-story`. Open the A11y
tab.

The page shows the story's blocks (each with an empty button) plus an image without alt text, an
empty button, an input without a label, and low-contrast text.
