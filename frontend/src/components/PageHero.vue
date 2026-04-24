<script setup lang="ts">
import { useSlots } from "vue";

const props = defineProps<{
  eyebrow: string;
  title: string;
}>();

const slots = useSlots();
const hasAside = Boolean(slots.aside);
const hasActions = Boolean(slots.actions);
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--single': !hasAside }">
    <div class="page-hero__copy">
      <p class="page-hero__eyebrow">{{ props.eyebrow }}</p>
      <h1 class="page-hero__title">{{ props.title }}</h1>

      <div v-if="hasActions" class="page-hero__actions">
        <slot name="actions" />
      </div>
    </div>

    <aside v-if="hasAside" class="page-hero__aside">
      <slot name="aside" />
    </aside>
  </section>
</template>
