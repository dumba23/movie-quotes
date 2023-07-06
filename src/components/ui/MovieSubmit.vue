<template>
  <button
    type="submit"
    class="w-full mt-8 h-14 bg-light-red rounded mt-2 text-white"
  >
    {{ name }}
  </button>
</template>

<script setup>
defineProps({
  name: { type: String, required: true, default: "" },
});
</script>
