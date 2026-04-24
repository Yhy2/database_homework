<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    tone?: "sun" | "sea" | "ink";
  }>(),
  {
    tone: "sun",
  },
);
</script>

<template>
  <article class="metric-card" :data-tone="tone">
    <div class="metric-card__rail" />
    <div class="metric-card__content">
      <p class="metric-card__title">{{ title }}</p>
      <strong class="metric-card__value">{{ value }}</strong>
    </div>
  </article>
</template>
