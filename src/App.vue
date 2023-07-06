<script setup>
import { RouterView, useRoute } from "vue-router";

const router = useRoute();
</script>

<template>
  <div
    class="min-h-screen"
    :class="router.path === '/' ? 'bg-primary-home' : 'bg-primary-profile'"
  >
    <RouterView />
  </div>
</template>
