<template>
  <button
    type="submit"
    class="w-96 h-10 flex justify-center items-center border border-white bg-transparent rounded mt-4 text-white"
  >
    <IconGoogle class="mr-2" /> {{ name }}
  </button>
</template>

<script setup>
import IconGoogle from "@/components/icons/IconGoogle.vue";
defineProps({
  name: { type: String, required: true, default: "" },
});
</script>
