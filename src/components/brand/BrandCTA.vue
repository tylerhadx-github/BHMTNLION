<template>
  <section id="cta" class="cta" ref="root">
    <div class="cta__bg" aria-hidden="true">
      <span class="cta__orb"></span>
    </div>

    <div class="cta__inner" ref="inner">
      <span class="cta__eyebrow">Free &amp; open</span>
      <h2 class="cta__title">
        Open the map and start <em>scouting</em>.
      </h2>
      <p class="cta__lead">
        No account, no download - the Black Hills Mountain Lion scouting map runs
        right in your browser. Toggle the layers, find the hot ground, and export
        mines straight to onX for the field.
      </p>

      <div class="cta__actions">
        <router-link to="/app" class="btn btn--primary">
          <i class="mdi mdi-map-search"></i> Explore the map
        </router-link>
        <a
          class="btn btn--ghost"
          href="https://github.com/tylerhadx-github/BHMTNLION"
          target="_blank"
          rel="noopener"
        >
          <i class="mdi mdi-github"></i> Source on GitHub
        </a>
      </div>

      <p class="cta__foot">Black Hills Mountain Lion - part of Paintbrush Outdoors. Build. Explore. Create.</p>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useScrollReveal } from '@/composables/useScrollReveal'

  const root = ref(null)
  const inner = ref(null)

  const { revealStagger } = useScrollReveal()

  onMounted(() => {
    revealStagger(inner.value, ':scope > *', { y: 30, stagger: 0.1 })
  })
</script>

<style scoped>
  .cta {
    position: relative;
    padding: clamp(5rem, 12vw, 9rem) 1.25rem;
    overflow: hidden;
    text-align: center;
  }

  .cta__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .cta__orb {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70vw;
    max-width: 760px;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 180, 84, 0.28), transparent 65%);
    filter: blur(40px);
  }

  .cta__inner {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
  }

  .cta__eyebrow {
    display: inline-block;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #ffb454;
    margin-bottom: 1rem;
  }

  .cta__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(2.1rem, 6vw, 4rem);
    line-height: 1.04;
    letter-spacing: -0.02em;
    margin: 0;
    color: #f7f7fb;
  }

  .cta__title em {
    font-style: normal;
    background: linear-gradient(120deg, #ffb454, #ffd28a 50%, #3ddc97);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .cta__lead {
    margin: 1.5rem auto 0;
    max-width: 56ch;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
    color: #b3b3c0;
  }

  .cta__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.9rem;
    margin-top: 2.25rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.5rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .btn--primary {
    background: linear-gradient(120deg, #ffb454, #e89a3c);
    color: #1a1206;
    box-shadow: 0 12px 36px rgba(255, 180, 84, 0.4);
  }

  .btn--primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 48px rgba(255, 180, 84, 0.55);
  }

  .btn--ghost {
    color: #f4f4f8;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .btn--ghost:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 180, 84, 0.7);
  }

  .cta__foot {
    margin-top: 2.5rem;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    color: #6f6f7e;
  }
</style>
