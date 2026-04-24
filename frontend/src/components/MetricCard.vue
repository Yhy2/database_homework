<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    description?: string;
    tone?: "sun" | "sea" | "ink";
  }>(),
  {
    description: "",
    tone: "sun",
  },
);
</script>

<template>
  <article class="metric-card" :data-tone="tone">
    <p class="metric-card__title">{{ title }}</p>
    <strong class="metric-card__value">{{ value }}</strong>
    <p v-if="description" class="metric-card__description">
      {{ description }}
    </p>
  </article>
</template>
