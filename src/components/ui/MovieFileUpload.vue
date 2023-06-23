<template>
  <div
    class="border border-secondary-grey rounded flex px-2 py-8 pr-20"
    :class="selectedFile && 'justify-between'"
  >
    <img
      v-if="initialValue || selectedFile"
      :src="initialValue || selectedFile"
      alt="profile"
      class="w-[50%] h-36 max-h-[12rem] mx-2 object-cover"
    />

    <div
      class="flex items-center"
      :class="selectedFile && 'flex-col space-y-4'"
    >
      <span v-if="selectedFile" class="text-primary-yellow font-bold"
        >REPLACE PHOTO</span
      >
      <div class="flex">
        <span class="mr-2"><IconImageUpload /></span>
        <span>Drag & drop your image here or</span>
      </div>
      <label class="text-center" :class="selectedFile && 'translate-y-2'">
        <Field
          name="image"
          rules="required"
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
        <span class="relative ml-2.5 bg-primary-purple p-2.5">Choose file</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import IconImageUpload from "@/components/icons/IconImageUpload.vue";
import { ref } from "vue";

const props = defineProps({
  profileUrl: { required: true, type: String, default: "" },
  initialValue: { required: false, type: String, default: "" },
});

const selectedFile = ref(props.initialValue);

const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = URL.createObjectURL(file);
  }
};
</script>
