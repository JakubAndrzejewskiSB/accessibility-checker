<script setup lang="ts">
import type { Component } from "vue";

import type { Blok } from "../storyblok";
import BlogList from "./bloks/BlogList.vue";
import Faq from "./bloks/Faq.vue";
import Hero from "./bloks/Hero.vue";
import Person from "./bloks/Person.vue";
import TextSection from "./bloks/TextSection.vue";
import UnknownBlok from "./bloks/UnknownBlok.vue";

defineProps<{ blok: Blok }>();

// Storyblok component name → Vue component. Add new components here.
const components: Record<string, Component> = {
  hero: Hero,
  text_section: TextSection,
  blog_list: BlogList,
  faq: Faq,
  person: Person,
};
</script>

<template>
  <component :is="components[blok.component] ?? UnknownBlok" :blok="blok" />
</template>
