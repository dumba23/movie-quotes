<template>
  <button
    type="submit"
    class="w-96 h-10 bg-light-red rounded mt-2 text-white sm:w-80 sm:mx-8"
  >
    {{ name }}
  </button>
</template>

<script setup>
defineProps({
  name: { type: String, required: true, default: "" },
});
</script>
