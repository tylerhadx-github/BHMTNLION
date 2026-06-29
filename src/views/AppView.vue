<template>
  <div class="appshell">
    <header class="appbar">
      <div class="appbar__inner">
        <router-link to="/" class="appbar__back">
          <i class="mdi mdi-arrow-left"></i>
          <img :src="logo" alt="Black Hills Mountain Lion" class="appbar__logo" />
          <span class="appbar__name">Black Hills Mountain Lion Scouting Tool</span>
        </router-link>
      </div>
    </header>

    <main class="appshell__body">
      <MapView />
    </main>
  </div>
</template>

<script setup>
  import MapView from '@/components/Map.vue'

  const logo = '/img/brand-logo.png'
</script>

<style scoped>
  .appshell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    background: #0b0b10;
    overflow: hidden;
  }

  .appbar {
    flex: 0 0 auto;
    z-index: 50;
    background: rgba(11, 11, 16, 0.78);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .appbar__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0.6rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .appshell__body {
    flex: 1 1 auto;
    position: relative;
    min-height: 0;
  }

  .appbar__back {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    text-decoration: none;
    color: #f4f4f8;
  }

  .appbar__back .mdi {
    font-size: 1.2rem;
    color: #a7a7b4;
    transition: transform 0.25s ease, color 0.25s ease;
  }

  .appbar__back:hover .mdi {
    transform: translateX(-3px);
    color: #f4f4f8;
  }

  .appbar__logo {
    height: 36px;
    width: auto;
    object-fit: contain;
  }

  .appbar__name {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    font-size: 0.98rem;
  }

  @media (max-width: 560px) {
    .appbar__name {
      font-size: 0.85rem;
    }
  }
</style>
