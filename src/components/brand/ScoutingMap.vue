<template>
  <section id="map" class="mapsec" ref="root">
    <div class="mapsec__inner">
      <div class="mapsec__copy" ref="copy">
        <div class="mapsec__eyerow">
          <span class="mapsec__eyebrow">The map</span>
          <span class="mapsec__live">
            <span class="mapsec__livedot"></span> Live
          </span>
        </div>
        <h2 class="mapsec__title">Read the country before you hunt it</h2>
        <p class="mapsec__lead">
          The full ArcGIS map layers harvest locations on satellite imagery and lets
          you toggle every supporting layer on demand. Switch on the multi-year
          heatmap to find the hot ground, drop in snow depth and roads to plan
          access, and tap mines for details.
        </p>

        <ul class="mapsec__list">
          <li v-for="point in points" :key="point">
            <span class="mapsec__dot"></span> {{ point }}
          </li>
        </ul>

        <router-link to="/app" class="mapsec__btn">
          Open the scouting map <i class="mdi mdi-arrow-right"></i>
        </router-link>
      </div>

      <div class="mapsec__visual" ref="visual" aria-hidden="true">
        <div class="mapmock">
          <span class="mapmock__grid"></span>
          <span class="mapmock__heat mapmock__heat--a"></span>
          <span class="mapmock__heat mapmock__heat--b"></span>
          <span class="mapmock__route"></span>
          <span class="pin pin--harvest">
            <i class="mdi mdi-paw"></i>
            <em>Harvest</em>
          </span>
          <span class="pin pin--mine">
            <i class="mdi mdi-pickaxe"></i>
            <em>Mine</em>
          </span>
          <span class="mapmock__badge">
            <span class="mapmock__live"></span> Harvest heatmap · 2012-2017
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useScrollReveal } from '@/composables/useScrollReveal'

  const root = ref(null)
  const copy = ref(null)
  const visual = ref(null)

  const points = [
    'Harvest-location heatmaps spanning 2012-2017 seasons',
    'Toggle snow depth, roads, mines, and public land',
    'Satellite basemap with search and locate-me built in',
  ]

  const { revealOne } = useScrollReveal()

  onMounted(() => {
    revealOne(copy.value, { y: 32 })
    revealOne(visual.value, { y: 32, x: 0, delay: 0.1 })
  })
</script>

<style scoped>
  .mapsec {
    position: relative;
    padding: clamp(3.5rem, 8vw, 7rem) 1.25rem;
  }

  .mapsec__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  .mapsec__eyerow {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.85rem;
  }

  .mapsec__eyebrow {
    display: inline-block;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #ffb454;
  }

  .mapsec__live {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3ddc97;
    background: rgba(61, 220, 151, 0.12);
    border: 1px solid rgba(61, 220, 151, 0.4);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
  }

  .mapsec__livedot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3ddc97;
    box-shadow: 0 0 10px #3ddc97;
  }

  .mapsec__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(1.9rem, 5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin: 0;
    color: #f4f4f8;
  }

  .mapsec__lead {
    margin: 1rem 0 0;
    max-width: 54ch;
    line-height: 1.6;
    color: #a7a7b4;
  }

  .mapsec__list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .mapsec__list li {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    color: #c9c9d6;
    font-size: 0.95rem;
  }

  .mapsec__dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #ffb454;
    box-shadow: 0 0 10px #ffb454;
    flex: none;
  }

  .mapsec__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 2rem;
    padding: 0.8rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    color: #f4f4f8;
    border: 1px solid rgba(255, 180, 84, 0.55);
    background: rgba(255, 180, 84, 0.12);
    transition: transform 0.25s ease, background 0.25s ease;
  }

  .mapsec__btn:hover {
    transform: translateY(-3px);
    background: rgba(255, 180, 84, 0.22);
  }

  .mapsec__btn .mdi {
    transition: transform 0.25s ease;
  }

  .mapsec__btn:hover .mdi {
    transform: translateX(4px);
  }

  .mapmock {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      radial-gradient(80% 80% at 70% 20%, rgba(255, 180, 84, 0.18), transparent 60%),
      radial-gradient(70% 70% at 20% 80%, rgba(61, 220, 151, 0.16), transparent 60%),
      #0e0e16;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
  }

  .mapmock__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 42px 42px;
  }

  .mapmock__heat {
    position: absolute;
    border-radius: 50%;
    filter: blur(18px);
  }

  .mapmock__heat--a {
    left: 22%;
    top: 32%;
    width: 32%;
    aspect-ratio: 1;
    background: radial-gradient(circle, rgba(255, 220, 0, 0.85), rgba(255, 120, 40, 0.4) 45%, transparent 70%);
  }

  .mapmock__heat--b {
    left: 58%;
    top: 60%;
    width: 24%;
    aspect-ratio: 1;
    background: radial-gradient(circle, rgba(255, 160, 60, 0.7), rgba(124, 60, 160, 0.35) 50%, transparent 72%);
  }

  .mapmock__route {
    position: absolute;
    left: 24%;
    top: 30%;
    width: 46%;
    height: 38%;
    border-left: 2px dashed rgba(255, 180, 84, 0.7);
    border-bottom: 2px dashed rgba(255, 180, 84, 0.7);
    border-radius: 0 0 0 18px;
  }

  .pin {
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    transform: translate(-50%, -50%);
  }

  .pin .mdi {
    font-size: 1.7rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  }

  .pin em {
    font-style: normal;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    background: rgba(11, 11, 16, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f4f4f8;
  }

  .pin--harvest {
    left: 32%;
    top: 38%;
  }

  .pin--harvest .mdi {
    color: #ffb454;
  }

  .pin--mine {
    left: 68%;
    top: 64%;
  }

  .pin--mine .mdi {
    color: #5ab0ff;
  }

  .mapmock__badge {
    position: absolute;
    left: 0.9rem;
    bottom: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #d3d3dd;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: rgba(11, 11, 16, 0.66);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
  }

  .mapmock__live {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3ddc97;
    box-shadow: 0 0 10px #3ddc97;
  }

  @media (max-width: 820px) {
    .mapsec__inner {
      grid-template-columns: 1fr;
    }
  }
</style>
