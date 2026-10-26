<script setup lang="ts">
import { renderRichText, storyblokEditable } from "@storyblok/js";

import { altText, imageUrl, type Asset, type Blok, type RichText } from "../../storyblok";

defineProps<{
  blok: Blok & {
    name?: string;
    role?: string;
    photo?: Asset;
    bio?: RichText;
    anchor?: string;
  };
}>();
</script>

<template>
  <section v-bind="storyblokEditable(blok)" :id="blok.anchor || undefined" class="section">
    <div class="container person">
      <img
        v-if="blok.photo?.filename"
        class="person__photo"
        :src="imageUrl(blok.photo, 640)"
        :alt="altText(blok.photo)"
        loading="lazy"
      />
      <div class="person__text">
        <p v-if="blok.role" class="eyebrow">{{ blok.role }}</p>
        <h2 class="section__headline">{{ blok.name }}</h2>
        <div class="prose" v-html="renderRichText(blok.bio)" />
      </div>
    </div>
  </section>
</template>
