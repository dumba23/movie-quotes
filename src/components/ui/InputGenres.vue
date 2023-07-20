<template>
  <div ref="dropdownContainer" class="relative mb-4">
    <div
      class="flex items-center justify-between w-full text-sm font-medium cursor-pointer border border-secondary-grey w-96 h-12 rounded px-2"
      @click="
        (e) => {
          e.target.id !== 'remove-button'
            ? (isOpen = !isOpen)
            : (isOpen = false);
        }
      "
    >
      <div
        v-if="selectedGenresIds.length > 0"
        class="flex items-center overflow-x-auto space-x-1"
      >
        <template v-for="id in selectedGenresIds" :key="id">
          <span
            class="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-[#6C767D]"
          >
            {{ genres.length > 0 && displayGenreName(genres, id) }}
            <div
              class="flex items-center justify-center w-4 h-4 ml-1 text-white rounded-full focus:outline-none"
              @click="removeGenre(id)"
            >
              <IconClose class="w-2 h-2" />
            </div>
          </span>
        </template>
      </div>
      <span v-else>{{ $t("movies.select_genres") }}</span>
    </div>
    <ErrorMessage name="genreIds" class="text-primary-red" />
    <div
      :class="isOpen ? '' : 'hidden'"
      class="absolute z-10 mt-1 w-full px-4 py-2 bg-light-grey text-black rounded-md shadow-lg overflow-y-auto h-36"
    >
      <ul>
        <li v-for="genre in genres" :key="genre.id">
          <label class="inline-flex items-center">
            <Field
              rules="required"
              name="genreIds"
              type="checkbox"
              :value="genre.id"
              v-model="selectedGenresIds"
              :multiple="true"
              class="form-checkbox h-5 w-5 text-primary-600"
            />
            <span class="ml-2">{{ genre.name }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import IconClose from "@/components/icons/IconClose.vue";
import { Field } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const props = defineProps({
  genres: { type: Array, required: true, default: () => [] },
  initialValue: { type: Array, required: true, default: () => [] },
});

const selectedGenresIds = ref(props.initialValue.map((item) => item.id));
const dropdownContainer = ref(null);
const isOpen = ref(false);

const removeGenre = (id) => {
  if (!isOpen.value) {
    selectedGenresIds.value = selectedGenresIds.value.filter(
      (genreId) => genreId !== id
    );
  }
};

const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
};

const displayGenreName = (genres, id) => {
  const genreArray = genres.filter((genre) => genre.id === id);
  return genreArray[0].name;
};

onClickOutside(dropdownContainer, closeDropdown);
</script>

<style scoped>
button:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
}
</style>
