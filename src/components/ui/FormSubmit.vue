<template>
  <button type="submit" class="w-96 h-10 bg-[#E31221] rounded mt-2 text-white">
    {{ name }}
  </button>
</template>

<script setup>
defineProps({
  name: { type: String, required: true, default: "" },
});
</script>
