<template>
  <div className="flex justify items-center px-2" href="#">
    <div className="min-w-[4rem] flex justify-center mr-2">
      <slot name="icon"></slot>
    </div>
    <slot name="text"></slot>
  </div>
</template>

<script setup>
defineProps({
  url: { required: true, type: String, default: "#" },
});
</script>
