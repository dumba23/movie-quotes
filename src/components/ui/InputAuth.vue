<template>
  <div class="flex flex-col mb-4 sm:mx-4">
    <label :for="name" class="text-white mb-2 sm:mx-4"
      >{{ labelName
      }}<span class="text-secondary-red ml-1">{{
        requiredLabel ? "*" : ""
      }}</span></label
    >
    <Field :name="name" :rules="rules" v-slot="{ field, errors, value }">
      <div class="relative">
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="border border-light-grey bg-light-grey w-96 h-10 rounded px-2 focus:shadow-input sm:w-80 focus:outline-none sm:mx-4"
          :class="
            (!!errors.length && 'border-primary-red ',
            !errors.length &&
              value?.length > 0 &&
              errorMessage.length <= 0 &&
              'border-primary-success',
            isProfileField && 'placeholder:text-black')
          "
        />
        <IconInputError
          v-if="errors.length || errorMessage.length > 0"
          class="absolute top-3 right-3.5 sm:right-5"
        />
        <IconInputSuccess
          v-if="!errors.length && value?.length > 0 && errorMessage.length <= 0"
          class="absolute top-3 right-3.5 sm:right-5"
        />
      </div>
    </Field>
    <ErrorMessage :name="name" class="sm:ml-4 text-primary-red" />
    <ErrorMessageApi v-if="type !== 'password'">{{
      errorMessage?.[i18n?.global.locale.value]
    }}</ErrorMessageApi>
  </div>
</template>

<script setup>
import IconInputError from "@/components/icons/IconInputError.vue";
import IconInputSuccess from "@/components/icons/IconInputSuccess.vue";
import { Field, ErrorMessage } from "vee-validate";
import ErrorMessageApi from "@/components/ui/ErrorMessageApi.vue";
import i18n from "@/plugins/i18";
defineProps({
  type: { type: String, required: true, default: "" },
  name: { type: String, required: true, default: "" },
  labelName: { type: String, required: true, default: "" },
  placeholder: { type: String, required: true, default: "" },
  rules: { type: String, required: true, default: "" },
  errorMessage: { type: String, required: false, default: "" },
  requiredLabel: { type: Boolean, required: true, default: true },
  isProfileField: { type: Boolean, required: true, default: false },
});
</script>
