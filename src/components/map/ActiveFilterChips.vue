<template>
  <div v-if="chips.length" class="active-chips" role="list" aria-label="Active filters">
    <v-chip
      v-for="chip in chips"
      :key="chip.key"
      class="active-chips__chip"
      role="listitem"
      size="small"
      variant="flat"
      closable
      :close-label="`Remove ${chip.label}`"
      @click:close="$emit('remove', chip.key)"
    >
      {{ chip.label }}
    </v-chip>
  </div>
</template>

<script setup>
  defineProps({
    chips: { type: Array, default: () => [] },
  })

  defineEmits(['remove'])
</script>

<style scoped>
  .active-chips {
    display: flex;
    gap: 0.4rem;
    overflow-x: auto;
    padding: 0.1rem 0.1rem 0.35rem;
    scrollbar-width: none;
  }

  .active-chips::-webkit-scrollbar {
    display: none;
  }

  .active-chips__chip {
    flex: 0 0 auto;
    background: rgba(17, 17, 24, 0.82) !important;
    color: #f4f4f8 !important;
    border: 1px solid rgba(255, 180, 84, 0.35);
    backdrop-filter: blur(10px);
    font-weight: 500;
  }
</style>
