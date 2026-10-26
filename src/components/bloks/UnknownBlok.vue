<script setup lang="ts">
import { storyblokEditable } from "@storyblok/js";

import type { Blok } from "../../storyblok";

defineProps<{ blok: Blok }>();
</script>

<template>
  <div v-bind="storyblokEditable(blok)" class="container unknown-blok">
    The component <code>{{ blok.component }}</code> has no template yet. Add it in
    <code>src/components/Blok.vue</code>.
  </div>
</template>
