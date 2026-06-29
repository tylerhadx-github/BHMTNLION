<template>
  <div class="filter-panel">
    <header class="filter-panel__head">
      <span class="filter-panel__title">Map Filters</span>
      <v-spacer />
      <v-btn
        icon="mdi-close"
        variant="text"
        density="comfortable"
        size="small"
        aria-label="Close filters"
        @click="$emit('close')"
      />
    </header>

    <div class="filter-panel__body">
      <section class="filter-group" aria-label="Map layers">
        <p class="filter-group__label">Layers</p>

        <v-switch
          v-model="showGfp"
          color="primary"
          density="compact"
          hide-details
          label="GFP Boundaries"
        />

        <v-switch
          v-model="showSnowDepth"
          color="primary"
          density="compact"
          hide-details
          label="Snow Depth (live)"
        />

        <div class="filter-stack">
          <v-switch
            v-model="showCachedSnowDepth"
            color="primary"
            density="compact"
            hide-details
            label="Cached Snow Depth"
          />
          <span v-if="cachedDateLabel" class="filter-caption">
            As of {{ cachedDateLabel }}
          </span>
        </div>

        <div class="filter-row">
          <v-switch
            v-model="showNfsmvum"
            color="primary"
            density="compact"
            hide-details
            label="Road Map"
          />
          <input
            type="date"
            id="date-picker"
            class="filter-row__date"
            :disabled="!showNfsmvum"
            aria-label="Road map date"
          />
        </div>

        <v-switch
          v-model="showMines"
          color="primary"
          density="compact"
          hide-details
          label="Mines"
        />

        <div v-if="showMines" class="mines-legend">
          <span class="mines-legend__item">
            <span class="legend-dot" style="background-color: orange"></span>Unknown
          </span>
          <span class="mines-legend__item">
            <span class="legend-dot" style="background-color: green"></span>Open
          </span>
          <span class="mines-legend__item">
            <span class="legend-dot" style="background-color: red"></span>Collapsed
          </span>
        </div>
      </section>

      <section class="filter-group" aria-label="Harvest data">
        <p class="filter-group__label">Harvest data</p>

        <v-switch
          v-model="showHarvestLocations"
          color="primary"
          density="compact"
          hide-details
          label="Harvest Locations"
        />

        <template v-if="showHarvestLocations">
          <v-switch
            v-model="showHeatmap"
            color="primary"
            density="compact"
            hide-details
            label="Heatmap"
          />
          <v-autocomplete
            v-model="selectedYears"
            :items="years"
            multiple
            chips
            closable-chips
            density="compact"
            hide-details
            label="Years"
          />
        </template>
      </section>

      <section class="filter-group" aria-label="Tools">
        <p class="filter-group__label">Tools</p>

        <div class="filter-tools">
          <v-btn
            variant="tonal"
            size="small"
            prepend-icon="mdi-chart-line"
            @click="showImage = !showImage"
          >
            Snow Depth Chart
          </v-btn>
          <v-btn
            variant="tonal"
            size="small"
            prepend-icon="mdi-export-variant"
            @click="$emit('export-onx')"
          >
            Export for onX
          </v-btn>
        </div>

        <img
          v-if="showImage"
          :src="legendUrl"
          alt="Snow depth chart"
          class="filter-tools__chart"
        />
      </section>
    </div>

    <footer class="filter-panel__foot">
      <v-btn variant="text" size="small" @click="$emit('reset')">Reset</v-btn>
      <v-btn color="primary" size="small" @click="$emit('close')">Done</v-btn>
    </footer>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    years: { type: Array, default: () => [] },
    snowDepthDate: { type: [String, Number, Object], default: null },
    legendUrl: { type: String, default: '' },
  })

  defineEmits(['reset', 'export-onx', 'close'])

  const cachedDateLabel = computed(() => {
    const value = props.snowDepthDate
    if (!value) return ''
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
  })

  const showGfp = defineModel('showGfp', { type: Boolean, default: false })
  const showSnowDepth = defineModel('showSnowDepth', { type: Boolean, default: false })
  const showCachedSnowDepth = defineModel('showCachedSnowDepth', { type: Boolean, default: false })
  const showNfsmvum = defineModel('showNfsmvum', { type: Boolean, default: false })
  const showMines = defineModel('showMines', { type: Boolean, default: false })
  const showHarvestLocations = defineModel('showHarvestLocations', { type: Boolean, default: false })
  const showHeatmap = defineModel('showHeatmap', { type: Boolean, default: false })
  const showImage = defineModel('showImage', { type: Boolean, default: false })
  const selectedYears = defineModel('selectedYears', { type: Array, default: () => [] })
</script>

<style scoped>
  .filter-panel {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    color: #f4f4f8;
  }

  .filter-panel__head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.5rem 0.65rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .filter-panel__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    font-size: 1.02rem;
    letter-spacing: -0.01em;
  }

  .filter-panel__body {
    overflow-y: auto;
    padding: 0.5rem 1rem 0.25rem;
  }

  .filter-group {
    padding: 0.5rem 0 0.75rem;
  }

  .filter-group + .filter-group {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .filter-group__label {
    margin: 0 0 0.15rem;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #ffb454;
    opacity: 0.85;
  }

  .filter-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .filter-row > :deep(.v-switch) {
    flex: 0 1 auto;
    min-width: 0;
  }

  .filter-stack {
    display: flex;
    flex-direction: column;
  }

  .filter-caption {
    margin: -0.45rem 0 0.35rem 3.1rem;
    font-size: 0.74rem;
    color: #a7a7b4;
  }

  .filter-row__date {
    margin-left: auto;
    flex: 0 0 auto;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    color: #f4f4f8;
    padding: 0.2rem 0.45rem;
    font-size: 0.8rem;
    color-scheme: dark;
  }

  .filter-row__date:disabled {
    opacity: 0.4;
  }

  .mines-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    padding: 0.25rem 0 0.1rem;
    font-size: 0.8rem;
    color: #cfcfd8;
  }

  .mines-legend__item {
    display: inline-flex;
    align-items: center;
  }

  .legend-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.4rem;
  }

  .filter-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-tools__chart {
    margin-top: 0.6rem;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .filter-panel__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
</style>
