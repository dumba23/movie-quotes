<template>
  <div class="flex flex-col mb-4">
    <label :for="name" class="text-white mb-2"
      >{{ labelName }}<span class="text-secondary-red ml-1">*</span></label
    >
    <Field :name="name" :rules="rules" v-slot="{ field, errors, value }">
      <div class="relative">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="border border-light-grey bg-light-grey w-96 h-10 rounded px-2 focus:shadow-input focus:outline-none"
          :class="
            (!!errors.length && 'border-primary-red ',
            !errors.length &&
              value?.length > 0 &&
              errorMessage.length <= 0 &&
              'border-primary-success')
          "
        />
        <IconInputError
          v-if="errors.length || errorMessage.length > 0"
          class="absolute top-3 right-3.5"
        />
        <IconInputSuccess
          v-if="!errors.length && value?.length > 0 && errorMessage.length <= 0"
          class="absolute top-3 right-3.5"
        />
      </div>
    </Field>
    <FormError :name="name" />
    <FormCustomError v-if="type !== 'password'">{{
      errorMessage
    }}</FormCustomError>
  </div>
</template>

<script setup>
import IconInputError from "@/components/icons/IconInputError.vue";
import IconInputSuccess from "@/components/icons/IconInputSuccess.vue";
import FormError from "@/components/ui/FormError.vue";
import { Field } from "vee-validate";
import FormCustomError from "./FormCustomError.vue";
defineProps({
  type: { type: String, required: true, default: "" },
  name: { type: String, required: true, default: "" },
  labelName: { type: String, required: true, default: "" },
  placeholder: { type: String, required: true, default: "" },
  rules: { type: String, required: true, default: "" },
  errorMessage: { type: String, required: false, default: "" },
});
</script>
