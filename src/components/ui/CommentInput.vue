<template>
  <Field
    type="input"
    name="content"
    placeholder="Write a comment"
    class="px-4 py-2 bg-secondary-black rounded-lg placeholder:text-light-grey w-full"
    rules="required"
  />
</template>

<script setup>
import { Field } from "vee-validate";
</script>
