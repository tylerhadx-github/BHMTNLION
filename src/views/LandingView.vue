<template>
  <div class="landing">
    <BrandNav />

    <main>
      <LionHero />

      <FeatureSection
        anchor="data"
        eyebrow="The idea"
        title="Public harvest data, turned into a map you can hunt"
        subtitle="South Dakota GFP publishes years of mountain lion harvest data, but it's locked in tables nobody reads. This tool plots it on the map and surrounds it with the terrain and access context that actually helps you plan."
        :items="ideaItems"
      />

      <FeatureSection
        anchor="layers"
        eyebrow="Map layers"
        title="Toggle the layers that matter"
        subtitle="Every layer loads on demand so you can build the picture you need - from where lions have been killed to how you'll physically get in there."
        :items="layerItems"
      />

      <ScoutingMap />

      <FeatureSection
        anchor="export"
        eyebrow="In the field"
        title="From the browser to your GPS"
        subtitle="The map is built to leave the desk with you - export your context and rely on cached data when service gets thin."
        :items="fieldItems"
      />

      <BrandCTA />
    </main>
  </div>
</template>

<script setup>
  import BrandNav from '@/components/brand/BrandNav.vue'
  import LionHero from '@/components/brand/LionHero.vue'
  import FeatureSection from '@/components/brand/FeatureSection.vue'
  import ScoutingMap from '@/components/brand/ScoutingMap.vue'
  import BrandCTA from '@/components/brand/BrandCTA.vue'

  const ideaItems = [
    {
      icon: 'mdi-chart-scatter-plot',
      title: 'Years of GFP harvest data',
      blurb: 'Mountain lion harvest locations from multiple South Dakota seasons, mapped instead of buried in a spreadsheet.',
      accent: '#ffb454',
    },
    {
      icon: 'mdi-image-filter-hdr',
      title: 'Terrain & access context',
      blurb: 'Snow depth, roads, mines, and public-land boundaries layered together so the data has somewhere to live.',
      accent: '#3ddc97',
    },
    {
      icon: 'mdi-map-marker-path',
      title: 'Built to plan a hunt',
      blurb: 'Read where lions move, where you can legally hunt, and how you will get there - before you leave the truck.',
      accent: '#5ab0ff',
    },
  ]

  const layerItems = [
    {
      icon: 'mdi-fire',
      title: 'Harvest heatmaps',
      blurb: 'Multi-year harvest-location heatmaps (2012-2017) that reveal the consistently productive ground at a glance.',
      accent: '#ffb454',
      badge: '2012-2017',
      badgeType: 'progress',
    },
    {
      icon: 'mdi-snowflake',
      title: 'Snow depth',
      blurb: 'Live NOHRSC snow analysis plus a cached daily snapshot so depth is there even when the service is slow.',
      accent: '#5ab0ff',
      badge: 'Live + cached',
      badgeType: 'open',
    },
    {
      icon: 'mdi-road-variant',
      title: 'Roads & seasonal access',
      blurb: 'USFS MVUM road data styled by type, with a date picker that filters roads down to what is actually open.',
      accent: '#3ddc97',
      badge: 'Live',
      badgeType: 'live',
    },
    {
      icon: 'mdi-pickaxe',
      title: 'Mines',
      blurb: 'Mine locations color-coded open, collapsed, or unknown, each with a popup of type and notes.',
      accent: '#ffb454',
    },
    {
      icon: 'mdi-map-legend',
      title: 'Public-land boundaries',
      blurb: 'GFP public-land layer so you always know exactly where you can legally set up.',
      accent: '#5ab0ff',
    },
  ]

  const fieldItems = [
    {
      icon: 'mdi-export-variant',
      title: 'onX / GPX export',
      blurb: 'One click exports mines to GPX so they drop straight into onX and the GPS units you already use.',
      accent: '#ffb454',
      foot: 'Built in',
    },
    {
      icon: 'mdi-cloud-check-outline',
      title: 'Cached for reliability',
      blurb: 'Snow-depth imagery and road data are cached locally for fast, dependable loads on a static host.',
      accent: '#3ddc97',
    },
    {
      icon: 'mdi-crosshairs-gps',
      title: 'Search & locate',
      blurb: 'Built-in place search, locate-me, and a basemap gallery so you can jump straight to your unit.',
      accent: '#5ab0ff',
    },
  ]
</script>

<style scoped>
  .landing {
    width: 100%;
    overflow-x: hidden;
  }
</style>
