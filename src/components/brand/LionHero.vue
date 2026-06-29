<template>
  <section id="top" class="hero" ref="root">
    <div class="hero__bg" aria-hidden="true">
      <span class="orb orb--1" ref="orb1"></span>
      <span class="orb orb--2" ref="orb2"></span>
      <span class="hero__grid"></span>
    </div>

    <div class="hero__inner">
      <p class="hero__eyebrow" ref="eyebrow">
        <span class="hero__dot"></span> Black Hills · South Dakota · mountain lion scouting
      </p>

      <h1 class="hero__headline">
        <span class="line"><span class="line__inner">Years of harvest data,</span></span>
        <span class="line"><span class="line__inner">turned into a <em>scouting map</em>.</span></span>
      </h1>

      <p class="hero__intro" ref="intro">
        An interactive map that visualizes South Dakota GFP mountain lion harvest
        data alongside the terrain that matters - multi-year heatmaps, snow depth,
        roads, and mines - so you can read where lions move and plan a hunt
        before you ever leave the truck.
      </p>

      <div class="hero__cta" ref="cta">
        <router-link to="/app" class="btn btn--primary">
          Explore the map
          <i class="mdi mdi-arrow-right"></i>
        </router-link>
        <a href="#data" class="btn btn--ghost" @click="scrollTo($event, '#data')">
          What it shows
        </a>
      </div>

      <ul class="hero__hints" ref="hintsEl" aria-hidden="true">
        <li v-for="hint in hints" :key="hint">{{ hint }}</li>
      </ul>
    </div>

    <a href="#data" class="hero__scroll" @click="scrollTo($event, '#data')" aria-label="Scroll to what it shows">
      <span class="hero__scroll-line"></span>
      Scroll
    </a>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useScrollReveal } from '@/composables/useScrollReveal'

  const root = ref(null)
  const eyebrow = ref(null)
  const intro = ref(null)
  const cta = ref(null)
  const hintsEl = ref(null)
  const orb1 = ref(null)
  const orb2 = ref(null)

  const hints = [
    'Harvest heatmaps', 'Snow depth', 'USFS roads & MVUM',
    'Mines', 'Public-land boundaries', 'onX / GPX export',
  ]

  const { reduced, timeline, gsap } = useScrollReveal()

  function scrollTo (e, sel) {
    const target = document.querySelector(sel)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  onMounted(() => {
    if (reduced) return

    const lines = root.value.querySelectorAll('.line__inner')
    const tl = timeline({ defaults: { ease: 'power3.out' } })

    tl.from(eyebrow.value, { opacity: 0, y: 18, duration: 0.6 })
      .from(lines, { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.2')
      .from(intro.value, { opacity: 0, y: 22, duration: 0.7 }, '-=0.4')
      .from(cta.value.children, { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from(hintsEl.value.children, { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, '-=0.3')

    gsap.to(orb1.value, { y: 40, x: 30, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true })
    gsap.to(orb2.value, { y: -50, x: -25, duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true })
  })
</script>

<style scoped>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 6rem 1.25rem 4rem;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.55;
    will-change: transform;
  }

  .orb--1 {
    width: 38vw;
    height: 38vw;
    max-width: 560px;
    max-height: 560px;
    top: -8%;
    left: -6%;
    background: radial-gradient(circle at 30% 30%, #ffb454, transparent 70%);
  }

  .orb--2 {
    width: 32vw;
    height: 32vw;
    max-width: 460px;
    max-height: 460px;
    bottom: -10%;
    right: -4%;
    background: radial-gradient(circle at 70% 70%, #3ddc97, transparent 70%);
    opacity: 0.32;
  }

  .hero__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
  }

  .hero__inner {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    width: 100%;
  }

  .hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #c9c9d6;
    margin: 0 0 1.5rem;
    padding: 0.5rem 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(6px);
  }

  .hero__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffb454;
    box-shadow: 0 0 12px #ffb454;
  }

  .hero__headline {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(2.6rem, 9vw, 6.5rem);
    line-height: 0.98;
    letter-spacing: -0.03em;
    margin: 0;
    color: #f7f7fb;
  }

  .line {
    display: block;
    overflow: hidden;
    padding-bottom: 0.06em;
  }

  .line__inner {
    display: block;
  }

  .hero__headline em {
    font-style: normal;
    background: linear-gradient(120deg, #ffb454, #ffd28a 50%, #3ddc97);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero__intro {
    margin: 1.75rem 0 0;
    max-width: 600px;
    font-size: clamp(1.05rem, 2.2vw, 1.3rem);
    line-height: 1.6;
    color: #b3b3c0;
  }

  .hero__cta {
    display: flex;
    flex-wrap: wrap;
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
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
    cursor: pointer;
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

  .btn--primary .mdi {
    transition: transform 0.25s ease;
  }

  .btn--primary:hover .mdi {
    transform: translateX(4px);
  }

  .btn--ghost {
    color: #f4f4f8;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.02);
  }

  .btn--ghost:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 180, 84, 0.7);
  }

  .hero__hints {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
    padding: 0;
    margin: 2.75rem 0 0;
  }

  .hero__hints li {
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: #7d7d8c;
    padding: 0.3rem 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
  }

  .hero__scroll {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    z-index: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #8a8a99;
    text-decoration: none;
  }

  .hero__scroll-line {
    width: 1px;
    height: 38px;
    background: linear-gradient(#ffb454, transparent);
  }

  @media (max-width: 600px) {
    .hero__hints {
      gap: 0.4rem;
    }
    .hero__scroll {
      display: none;
    }
  }
</style>
