<template>
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <!-- Casa club -->
    <template v-if="name === 'casa-club'">
      <path d="M10 30V16h30v14M6 16h38M18 16v14M32 16v14" />
      <circle cx="50" cy="14" r="4" fill="currentColor" stroke="none" />
      <path d="M6 40c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0M6 52c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" />
    </template>
    <!-- Cancha polideportiva -->
    <template v-else-if="name === 'cancha'">
      <g transform="rotate(-35 32 32)">
        <rect x="14" y="8" width="36" height="48" rx="3" />
        <path d="M14 32h36" />
        <circle cx="32" cy="32" r="6" />
        <path d="M24 8v8h16V8M24 56v-8h16v8" />
      </g>
    </template>
    <!-- Parques -->
    <template v-else-if="name === 'parques'">
      <path d="M32 58V26" stroke-width="4" />
      <path d="M32 26C24 14 12 16 6 24c10-4 18 0 26 2ZM32 26c8-12 20-10 26-2-10-4-18 0-26 2ZM32 26C30 14 22 8 14 8c8 2 14 8 18 18ZM32 26c2-12 10-18 18-18-8 2-14 8-18 18Z" fill="currentColor" stroke-width="1.5" />
      <path d="M8 58h48" />
    </template>
    <!-- Churrasqueras -->
    <template v-else-if="name === 'churrasqueras'">
      <g transform="rotate(-40 32 30)">
        <ellipse cx="32" cy="30" rx="22" ry="16" />
        <path d="M14 22c8 4 28 4 36 0M11 30h42M14 38c8-4 28-4 36 0M24 15v30M32 14v32M40 15v30" stroke-width="2" />
      </g>
      <path d="M22 46l-6 12M42 46l6 12M32 48v10" />
    </template>
    <!-- Piscina -->
    <template v-else>
      <path d="M22 44V14a6 6 0 0 1 12 0M42 44V14a6 6 0 0 1 12 0M22 22h20M22 32h20" transform="translate(-8 0)" />
      <path d="M6 48c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0M6 58c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" />
    </template>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>
