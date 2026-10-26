<script setup lang="ts">
import { renderRichText, storyblokEditable } from "@storyblok/js";

import type { Blok, RichText } from "../../storyblok";

type FaqItem = Blok & {
  question?: string;
  answer?: RichText;
};

defineProps<{
  blok: Blok & {
    headline?: string;
    items?: FaqItem[];
    anchor?: string;
  };
}>();
</script>

<template>
  <section v-bind="storyblokEditable(blok)" :id="blok.anchor || undefined" class="section">
    <div class="container container--narrow">
      <h2 v-if="blok.headline" class="section__headline">{{ blok.headline }}</h2>
      <div class="faq">
        <details
          v-for="item in blok.items ?? []"
          :key="item._uid"
          v-bind="storyblokEditable(item)"
          class="faq__item"
        >
          <summary class="faq__question">{{ item.question }}</summary>
          <div class="prose faq__answer" v-html="renderRichText(item.answer)" />
        </details>
      </div>
    </div>
  </section>
</template>
