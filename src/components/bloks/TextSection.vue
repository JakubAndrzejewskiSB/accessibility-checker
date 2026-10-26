<script setup lang="ts">
import { renderRichText, storyblokEditable } from "@storyblok/js";

import type { Blok, RichText } from "../../storyblok";

defineProps<{
  blok: Blok & {
    eyebrow?: string;
    headline?: string;
    text?: RichText;
    anchor?: string;
  };
}>();
</script>

<template>
  <section v-bind="storyblokEditable(blok)" :id="blok.anchor || undefined" class="section">
    <div class="container container--narrow">
      <p v-if="blok.eyebrow" class="eyebrow">{{ blok.eyebrow }}</p>
      <h2 v-if="blok.headline" class="section__headline">{{ blok.headline }}</h2>
      <div class="prose" v-html="renderRichText(blok.text)" />
    </div>
  </section>
</template>
