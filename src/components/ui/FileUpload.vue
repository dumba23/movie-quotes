<template>
  <label
    class="absolute top-1 translate-x-[9rem] sm:translate-x-0 sm:translate-y-5 sm:translate-x-[100%] translate-y-[-6rem] text-center"
  >
    <img
      :src="
        selectedFile === null
          ? profileUrl.includes('http')
            ? profileUrl
            : apiUrl + '/storage/' + profileUrl
          : selectedFile
      "
      alt="profile"
      class="w-[12rem] max-h-[12rem] sm:w-32 sm:min-h-[5rem] rounded-full mb-2"
    />

    <Field name="avatar" v-slot="{ handleChange, handleBlur }">
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
    <span class="relative mt-10">{{ $t("upload_new_photo") }}</span></label
  >
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";

defineProps({
  profileUrl: { required: true, type: String, default: "" },
});

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const selectedFile = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = URL.createObjectURL(file);
  }
};
</script>
