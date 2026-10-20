<script setup lang="ts">
import {
  apiPlugin,
  renderRichText,
  storyblokEditable,
  storyblokInit,
  useStoryblokBridge,
  type ISbStoryData,
} from "@storyblok/js";
import { onMounted, ref } from "vue";

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

const story = ref<ISbStoryData | null>(null);
const error = ref("");

onMounted(async () => {
  const slug = window.location.pathname.replace(/^\/|\/$/g, "") || "a11y-checker";
  try {
    const { data } = await storyblokApi!.get(`cdn/stories/${slug}`, { version: "draft" });
    story.value = data.story;
    useStoryblokBridge(data.story.id, (updated) => (story.value = updated), {
      customParent: getParentOrigin(),
    });
  } catch (cause) {
    error.value = `Could not load the story "${slug}". Check VITE_STORYBLOK_TOKEN. ${cause}`;
  }
});
</script>

<template>
  <main>
    <p v-if="error">{{ error }}</p>
    <template v-if="story">
      <h1>{{ story.name }}</h1>
      <template v-for="blok in story.content.content ?? []" :key="blok._uid">
        <div
          v-if="blok.component === 'richText' || blok.component === 'section'"
          v-bind="storyblokEditable(blok)"
          v-html="renderRichText(blok.content)"
        />
        <div
          v-else-if="blok.component === 'blokRichtext'"
          v-bind="storyblokEditable(blok)"
          v-html="renderRichText(blok.richtext)"
        />
        <figure v-else-if="blok.component === 'image'" v-bind="storyblokEditable(blok)">
          <!-- An empty alt text in Storyblok renders no alt attribute, so axe reports it. -->
          <img :src="blok.asset?.filename" :alt="blok.asset?.alt || undefined" />
        </figure>
        <article v-else-if="blok.component === 'feature'" v-bind="storyblokEditable(blok)">
          <h2>{{ blok.name }}</h2>
          <a
            v-if="blok.link?.cached_url || blok.link?.url"
            :href="blok.link.cached_url || blok.link.url"
          >
            Read more
          </a>
        </article>
        <div v-else v-bind="storyblokEditable(blok)">Unknown component: {{ blok.component }}</div>
      </template>
    </template>

    <section>
      <h2>Image without alt text</h2>
      <img src="https://a.storyblok.com/f/1/missing-alt.jpg" width="64" height="64" />
    </section>

    <section>
      <h2>Empty button</h2>
      <button></button>
    </section>

    <section>
      <h2>Input without an associated label</h2>
      <input type="text" />
    </section>

    <section>
      <h2>Text over a background image (warning)</h2>
      <!-- axe cannot compute the contrast over an image, so it asks for a manual review. -->
      <p class="over-image">This text is on a gradient background, so its contrast needs review.</p>
    </section>

    <section>
      <h2>Low-contrast text</h2>
      <p class="low-contrast">This text is light gray on a white background.</p>
    </section>
  </main>
</template>

<style>
img {
  max-width: 100%;
  height: auto;
}

.over-image {
  padding: 24px;
  color: #777777;
  background-image: linear-gradient(90deg, #ffffff, #888888);
}

.low-contrast {
  color: #cccccc;
}
</style>
