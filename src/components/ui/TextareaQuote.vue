<template>
  <div class="flex flex-col mb-4">
    <Field :name="name" :rules="rules" v-slot="{ field }">
      <div class="relative">
        <div class="flex border border-secondary-grey rounded px-2">
          <label class="absolute text-secondary-grey">
            {{ labelName }}
          </label>
          <div class="flex-1">
            <textarea
              v-bind="field"
              class="placeholder:text-white placeholder:italic bg-transparent rounded h-20 w-full pr-6 focus:outline-none relative overflow-scroll no-scrollbar"
              :class="
                labelName
                  ? name.includes('_en')
                    ? 'indent-28'
                    : 'indent-[5.5rem]'
                  : 'p-2'
              "
              :placeholder="placeholder"
              :name="name"
            >
            </textarea>
            <span
              v-if="name.includes('_en')"
              class="absolute right-2 top-1 text-secondary-grey text-sm"
              >Eng</span
            >
            <span
              v-if="name.includes('_ka')"
              class="absolute right-2 top-1 text-secondary-grey text-sm"
              >ქარ</span
            >
          </div>
        </div>
      </div>
    </Field>
    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { Field } from "vee-validate";
defineProps({
  name: { type: String, required: true, default: "" },
  placeholder: { type: String, required: true, default: "" },
  rules: { type: String, required: true, default: "required" },
  labelName: { type: String, required: false, default: "" },
});
</script>
