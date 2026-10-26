<script setup lang="ts">
import { storyblokEditable } from "@storyblok/js";

import {
  altText,
  formatDate,
  imageUrl,
  linkUrl,
  type Asset,
  type Blok,
  type Link,
} from "../../storyblok";

type BlogPost = Blok & {
  title?: string;
  excerpt?: string;
  image?: Asset;
  date?: string;
  link?: Link;
};

defineProps<{
  blok: Blok & {
    headline?: string;
    intro?: string;
    posts?: BlogPost[];
    anchor?: string;
  };
}>();
</script>

<template>
  <section v-bind="storyblokEditable(blok)" :id="blok.anchor || undefined" class="section">
    <div class="container">
      <header class="section__header">
        <h2 v-if="blok.headline" class="section__headline">{{ blok.headline }}</h2>
        <p v-if="blok.intro" class="section__intro">{{ blok.intro }}</p>
      </header>
      <ul class="cards">
        <li v-for="post in blok.posts ?? []" :key="post._uid" v-bind="storyblokEditable(post)">
          <article class="card">
            <img
              v-if="post.image?.filename"
              class="card__image"
              :src="imageUrl(post.image, 800)"
              :alt="altText(post.image)"
              loading="lazy"
            />
            <div class="card__body">
              <time v-if="formatDate(post.date)" class="card__date" :datetime="post.date">
                {{ formatDate(post.date) }}
              </time>
              <h3 class="card__title">
                <a v-if="linkUrl(post.link)" class="card__link" :href="linkUrl(post.link)">
                  {{ post.title }}
                </a>
                <template v-else>{{ post.title }}</template>
              </h3>
              <p v-if="post.excerpt" class="card__excerpt">{{ post.excerpt }}</p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
