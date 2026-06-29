<template>
  <component
    :is="href ? 'a' : 'div'"
    class="card"
    :style="{ '--accent': accent }"
    :href="href || undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
  >
    <div class="card__top">
      <span class="card__icon"><i class="mdi" :class="icon"></i></span>
      <span v-if="badge" class="badge" :class="`badge--${badgeType}`">{{ badge }}</span>
    </div>

    <h3 class="card__name">{{ title }}</h3>
    <p class="card__blurb">{{ blurb }}</p>

    <ul v-if="points && points.length" class="card__points">
      <li v-for="p in points" :key="p">
        <i class="mdi mdi-check"></i> {{ p }}
      </li>
    </ul>

    <span v-if="foot" class="card__open">
      {{ foot }} <i class="mdi mdi-arrow-top-right"></i>
    </span>
  </component>
</template>

<script setup>
  defineProps({
    icon: { type: String, default: 'mdi-circle-outline' },
    title: { type: String, default: '' },
    blurb: { type: String, default: '' },
    accent: { type: String, default: '#ffb454' },
    badge: { type: String, default: '' },
    badgeType: { type: String, default: 'live' },
    points: { type: Array, default: () => [] },
    foot: { type: String, default: '' },
    href: { type: String, default: '' },
  })
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    padding: 1.5rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      radial-gradient(120% 120% at 100% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
      rgba(255, 255, 255, 0.025);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease;
    will-change: transform;
    height: 100%;
    box-sizing: border-box;
  }

  a.card:hover,
  a.card:focus-visible {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.4);
    outline: none;
  }

  .card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1.1rem;
  }

  .card__icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    font-size: 1.4rem;
    color: color-mix(in srgb, var(--accent) 85%, #fff);
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .badge {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .badge--live {
    color: #3ddc97;
    background: rgba(61, 220, 151, 0.12);
    border-color: rgba(61, 220, 151, 0.4);
  }

  .badge--open {
    color: #5ab0ff;
    background: rgba(90, 176, 255, 0.14);
    border-color: rgba(90, 176, 255, 0.45);
  }

  .badge--progress {
    color: #ffb454;
    background: rgba(255, 180, 84, 0.12);
    border-color: rgba(255, 180, 84, 0.4);
  }

  .card__name {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    color: #f4f4f8;
  }

  .card__blurb {
    font-size: 0.93rem;
    line-height: 1.55;
    color: #a7a7b4;
    margin: 0;
    flex: 1;
  }

  .card__points {
    list-style: none;
    padding: 0;
    margin: 1.1rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card__points li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.88rem;
    color: #c9c9d6;
  }

  .card__points .mdi {
    color: color-mix(in srgb, var(--accent) 80%, #fff);
    font-size: 1rem;
  }

  .card__open {
    margin-top: 1.25rem;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: color-mix(in srgb, var(--accent) 80%, #fff);
  }

  .card__open .mdi {
    transition: transform 0.3s ease;
  }

  a.card:hover .card__open .mdi {
    transform: translate(3px, -3px);
  }
</style>
