<script setup lang="ts">
import {
  apiPlugin,
  storyblokInit,
  useStoryblokBridge,
  type ISbStoryData,
} from "@storyblok/js";
import { computed, onMounted, ref } from "vue";

import Blok from "./components/Blok.vue";
import type { Blok as BlokData } from "./storyblok";

const { storyblokApi } = storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
});

// The bridge talks to the Visual Editor on app.storyblok.com unless told otherwise. This demo is
// also opened from other Storyfront environments (preview, local), so it uses the origin of the
// page that frames it. Without it the editor never hears from the bridge, and blocks are not
// clickable.
function getParentOrigin(): string | undefined {
  try {
    return (
      window.location.ancestorOrigins?.[0] ??
      (document.referrer ? new URL(document.referrer).origin : undefined)
    );
  } catch {
    return undefined;
  }
}

const SITE_NAME = "Alex Rivera";

const story = ref<ISbStoryData | null>(null);
const error = ref("");

// Everything in the `content` field of the story's `body` content type, in the order the editor
// arranged it.
const body = computed<BlokData[]>(() => story.value?.content.content ?? []);

function setStory(value: ISbStoryData): void {
  story.value = value;
  document.title = `${value.name} · ${SITE_NAME}`;
}

onMounted(async () => {
  const slug = window.location.pathname.replace(/^\/|\/$/g, "") || "a11y-checker-demo";
  try {
    const { data } = await storyblokApi!.get(`cdn/stories/${slug}`, { version: "draft" });
    setStory(data.story);
    useStoryblokBridge(data.story.id, setStory, { customParent: getParentOrigin() });
  } catch (cause) {
    error.value = `Could not load the story "${slug}". Check VITE_STORYBLOK_TOKEN. ${cause}`;
  }
});

const year = new Date().getFullYear();
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="container site-header__inner">
      <a class="site-header__brand" href="/">{{ SITE_NAME }}</a>
      <nav aria-label="Main">
        <ul class="site-nav">
          <li><a href="#blog">Blog</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a class="button button--small" href="mailto:hello@example.com">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <p v-if="error" class="container status status--error">{{ error }}</p>
    <p v-else-if="!story" class="container status">Loading…</p>
    <template v-else>
      <Blok v-for="blok in body" :key="blok._uid" :blok="blok" />
      <p v-if="body.length === 0" class="container status">
        This story has no blocks yet. Add some to its <code>content</code> field in Storyblok.
      </p>
    </template>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div>
        <p class="site-footer__brand">{{ SITE_NAME }}</p>
        <p class="site-footer__tagline">Product designer and front-end developer.</p>
      </div>
      <nav aria-label="Social">
        <ul class="site-footer__links">
          <li><a href="https://github.com/">GitHub</a></li>
          <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
          <li><a href="https://dribbble.com/">Dribbble</a></li>
          <li><a href="mailto:hello@example.com">hello@example.com</a></li>
        </ul>
      </nav>
    </div>
    <div class="container site-footer__legal">
      <p>© {{ year }} {{ SITE_NAME }}. Content managed with Storyblok.</p>
    </div>
  </footer>
</template>
