<template>
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Maletín -->
    <template v-if="name === 'maletin'">
      <rect x="6" y="18" width="52" height="38" rx="5" fill="currentColor" />
      <path d="M22 18v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5" />
      <path d="M6 34h52" stroke="var(--icon-cut, #b4b1b3)" stroke-width="3" />
      <rect x="27" y="30" width="10" height="9" rx="2" fill="var(--icon-cut, #b4b1b3)" stroke="none" />
    </template>
    <!-- Bolsa de dinero -->
    <template v-else-if="name === 'dinero'">
      <path d="M22 8h20l-5 11h-10Z" fill="currentColor" />
      <path d="M27 19C10 26 4 40 8 50c3 7 14 8 24 8s21-1 24-8c4-10-2-24-19-31Z" fill="currentColor" />
      <path d="M36 32c-1-3-9-3-9 1s9 3 9 7-8 5-10 1M32 28v3M32 41v3" stroke="var(--icon-cut, #b4b1b3)" stroke-width="3" />
    </template>
    <!-- Documento con sello -->
    <template v-else-if="name === 'documento'">
      <path d="M18 8h30a4 4 0 0 1 4 4v26M18 8a6 6 0 0 0-6 6v36M12 50a6 6 0 0 0 6 6h28" />
      <path d="M8 50h14v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4" />
      <path d="M22 20h12M22 28h10M22 36h8M22 44h8" />
      <circle cx="46" cy="38" r="10" fill="currentColor" />
      <path d="M41 43l5-11 5 11M43 40h6" stroke="var(--icon-cut, #b4b1b3)" stroke-width="2.5" />
    </template>
    <!-- Checklist con pluma -->
    <template v-else>
      <rect x="10" y="12" width="36" height="46" rx="4" fill="currentColor" />
      <rect x="20" y="6" width="16" height="10" rx="3" fill="currentColor" />
      <path d="M17 26l3 3 5-6M17 38l3 3 5-6M17 50l3 3 5-6M30 27h10M30 39h10M30 51h6" stroke="var(--icon-cut, #b4b1b3)" stroke-width="3" />
      <path d="M58 20 38 46l-3 7 7-3 18-27Z" fill="currentColor" stroke="var(--icon-cut, #b4b1b3)" stroke-width="2" />
    </template>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>
