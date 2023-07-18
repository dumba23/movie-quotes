<template>
  <Field
    type="input"
    name="content"
    :placeholder="$t('quotes.write_a_comment')"
    class="px-4 py-2 bg-secondary-black rounded-lg placeholder:text-light-grey w-full sm:text-sm"
    rules="required"
  />
</template>

<script setup>
import { Field } from "vee-validate";
</script>
