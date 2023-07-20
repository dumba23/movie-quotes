<template>
  <div
    class="border border-secondary-grey rounded flex px-2 py-6 pr-20"
    :class="selectedFile && 'justify-between'"
  >
    <img
      v-if="initialValue || selectedFile"
      :src="selectedFile || initialValue"
      alt="profile"
      class="w-[50%] h-36 max-h-[12rem] mx-2 object-cover"
    />

    <div
      class="flex items-center sm:w-full"
      :class="selectedFile && 'flex-col space-y-4'"
    >
      <span v-if="selectedFile" class="text-primary-yellow font-bold">{{
        $t("movies.replace_photo")
      }}</span>
      <div class="flex">
        <span class="mr-2"><IconImageUpload /></span>
        <span class="sm:hidden">{{
          $t("movies.drag_&_drop_your_image_here_or")
        }}</span>
        <span class="hidden sm:block text-base min-w-max">{{
          $t("movies.upload_image")
        }}</span>
      </div>
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
          class="relative ml-2.5 bg-primary-purple p-2.5 sm:w-28 sm:text-sm sm:translate-x-10 sm:ml-0"
        >
          Choose file
        </div>
      </label>
    </div>
  </div>
  <ErrorMessage name="image" />
</template>

<script setup>
import { Field } from "vee-validate";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import IconImageUpload from "@/components/icons/IconImageUpload.vue";
import { ref } from "vue";

const props = defineProps({
  profileUrl: { required: true, type: String, default: "" },
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
