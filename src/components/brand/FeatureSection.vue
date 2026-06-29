<template>
  <section :id="anchor" class="section" ref="root">
    <div class="section__inner">
      <header class="section__head" ref="head">
        <span class="section__eyebrow">{{ eyebrow }}</span>
        <h2 class="section__title">{{ title }}</h2>
        <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
      </header>

      <div class="grid" ref="grid">
        <FeatureCard
          v-for="item in items"
          :key="item.title"
          v-bind="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import FeatureCard from './FeatureCard.vue'
  import { useScrollReveal } from '@/composables/useScrollReveal'

  defineProps({
    anchor: { type: String, default: undefined },
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    items: { type: Array, default: () => [] },
  })

  const root = ref(null)
  const head = ref(null)
  const grid = ref(null)
  const { revealOne, revealStagger } = useScrollReveal()

  onMounted(() => {
    revealOne(head.value, { y: 28 })
    revealStagger(grid.value, '.card', { y: 40, stagger: 0.1 })
  })
</script>

<style scoped>
  .section {
    position: relative;
    padding: clamp(3.5rem, 8vw, 7rem) 1.25rem;
  }

  .section__inner {
    max-width: 1180px;
    margin: 0 auto;
  }

  .section__head {
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }

  .section__eyebrow {
    display: inline-block;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #ffb454;
    margin-bottom: 0.85rem;
  }

  .section__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(1.9rem, 5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin: 0;
    color: #f4f4f8;
  }

  .section__subtitle {
    margin: 1rem 0 0;
    max-width: 62ch;
    line-height: 1.6;
    color: #a7a7b4;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }
</style>
