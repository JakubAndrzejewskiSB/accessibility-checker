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
story `a11y-checker-demo`. The slug is the URL path, so `/about` loads `about`. Open the A11y tab.

The page is a portfolio with a fixed header and footer. Everything in between comes from the story's
`content` field (content type `body`), in the order set in Storyblok:

| Storyblok component | Vue component                           |
| ------------------- | --------------------------------------- |
| `body` (content type) | `src/App.vue` renders its `content`   |
| `hero`              | `src/components/bloks/Hero.vue`         |
| `text_section`      | `src/components/bloks/TextSection.vue`  |
| `blog_list`         | `src/components/bloks/BlogList.vue`     |
| `faq`               | `src/components/bloks/Faq.vue`          |
| `person`            | `src/components/bloks/Person.vue`       |

A component without a template shows a placeholder. Register new ones in
`src/components/Blok.vue`. An image with an empty alt text in Storyblok renders without an `alt`
attribute, so the checker reports it.
