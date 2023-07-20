<template>
  <div>
    <img
      :src="selectedFile"
      alt="profile"
      class="object-cover w-full max-h-[34rem] sm:h-72"
    />

    <div class="relative">
      <label class="text-center" :class="selectedFile && 'translate-y-2'">
        <Field
          name="image"
          :rules="rules"
          v-slot="{ handleChange, handleBlur }"
        >
          <input
            type="file"
            @change="
              (e) => {
                handleChange(e), handleImageChange(e);
              }
            "
            @blur="handleBlur"
            class="hidden"
          />
        </Field>
        <div
          class="absolute flex flex-col items-center space-y-2 right-1/2 px-10 translate-x-28 translate-y-[-3rem] sm:translate-y-10 sm:translate-x-20 py-8 text-base not-italic rounded-xl top-[-17rem] bg-half-transparent opacity-80 max-w-max"
        >
          <span><IconImageUpload /></span>
          <span class="text-white">{{ $t("movies.change_photo") }}</span>
        </div>
      </label>
    </div>
    <ErrorMessage name="image" class="text-primary-red" />
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { ErrorMessage } from "vee-validate";
import IconImageUpload from "@/components/icons/IconImageUpload.vue";
import { ref } from "vue";

const props = defineProps({
  initialValue: { required: false, type: String, default: "" },
  rules: { required: false, type: String, default: "" },
});

const selectedFile = ref(props.initialValue);

const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = URL.createObjectURL(file);
  }
};
</script>
