<template>
  <ErrorMessage :name="name" class="text-primary-red" />
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
defineProps({
  name: { type: String, required: true, default: "" },
});
</script>
