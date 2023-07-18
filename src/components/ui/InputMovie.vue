<template>
  <div class="flex flex-col mb-4">
    <Field :name="name" :rules="rules" v-slot="{ field, errors, value }">
      <div class="relative">
        <div
          class="flex items-center border border-secondary-grey rounded px-2"
        >
          <label class="mr-2 text-secondary-grey min-w-max">
            {{ labelName }}
          </label>
          <input
            v-bind="field"
            :type="type"
            :placeholder="placeholder"
            class="placeholder:text-white bg-primary-black h-12 rounded w-full focus:outline-none"
            :class="
              (!!errors.length && 'border-primary-red ',
              !errors.length &&
                value?.length > 0 &&
                errorMessage.length <= 0 &&
                'border-primary-success')
            "
          />
        </div>
        <IconInputError
          v-if="errors.length || errorMessage.length > 0"
          class="absolute top-3 right-3.5"
        />
        <IconInputSuccess
          v-if="!errors.length && value?.length > 0 && errorMessage.length <= 0"
          class="absolute top-3 right-3.5"
        />
        <span
          v-if="
            errors.length <= 0 &&
            !(!errors.length && value?.length > 0 && errorMessage.length <= 0)
          "
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-grey text-sm"
          >{{ name.includes("_en") ? "Eng" : "ქარ" }}
        </span>
      </div>
    </Field>
    <ErrorMessage :name="name" />
    <ErrorMessageApi v-if="type !== 'password'">{{
      errorMessage
    }}</ErrorMessageApi>
  </div>
</template>

<script setup>
import IconInputError from "@/components/icons/IconInputError.vue";
import IconInputSuccess from "@/components/icons/IconInputSuccess.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { Field } from "vee-validate";
import ErrorMessageApi from "@/components/ui/ErrorMessageApi.vue";
defineProps({
  type: { type: String, required: true, default: "" },
  name: { type: String, required: true, default: "" },
  placeholder: { type: String, required: true, default: "" },
  rules: { type: String, required: true, default: "" },
  errorMessage: { type: String, required: false, default: "" },
  labelName: { type: String, required: false, default: "" },
});
</script>
