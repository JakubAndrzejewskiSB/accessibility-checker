<script setup lang="ts">
import { storyblokEditable } from "@storyblok/js";

import { altText, imageUrl, linkUrl, type Asset, type Blok, type Link } from "../../storyblok";

defineProps<{
  blok: Blok & {
    headline?: string;
    text?: string;
    image?: Asset;
    button_label?: string;
    button_link?: Link;
    anchor?: string;
  };
}>();
</script>

<template>
  <section
    v-bind="storyblokEditable(blok)"
    :id="blok.anchor || undefined"
    class="hero"
    :class="{ 'hero--with-image': blok.image?.filename }"
  >
    <img
      v-if="blok.image?.filename"
      class="hero__image"
      :src="imageUrl(blok.image, 1800)"
      :alt="altText(blok.image)"
    />
    <div class="container hero__content">
      <h1 class="hero__headline">{{ blok.headline }}</h1>
      <p v-if="blok.text" class="hero__text">{{ blok.text }}</p>
      <!-- Always rendered, also without a label or link, so the accessibility checker can
           report a button without text in the demo. -->
      <a class="button" :href="linkUrl(blok.button_link) ?? '#'">{{ blok.button_label }}</a>
    </div>
  </section>
</template>
