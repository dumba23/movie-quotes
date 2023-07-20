<template>
  <div class="w-full relative mt-4">
    <IconMovie class="absolute z-10 translate-y-[85%] left-4" />
    <Field
      name="movie_id"
      as="select"
      ref="selectRef"
      class="text-white bg-black rounded-lg w-full px-16 py-8 custom-select"
    >
      <option value="" selected disabled>
        {{ $t("movies.choose_movie") }}
      </option>
      <option
        v-for="movie in moviesStore.movies"
        :key="movie.id"
        :value="movie.id"
      >
        {{ movie.title?.[i18n.global.locale.value] }}
      </option>
    </Field>
    <IconDropdownArrow
      @click="toggleSelect"
      class="absolute right-4 translate-y-[150%] top-0"
    />
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import IconMovie from "@/components/icons/IconMovie.vue";
import IconDropdownArrow from "@/components/icons/IconDropdownArrow.vue";
import { ref, onMounted } from "vue";
import i18n from "@/plugins/i18";
import { useMoviesStore } from "@/store/movies";

const selectRef = ref(null);
const moviesStore = useMoviesStore();

onMounted(() => {
  moviesStore.initializeMoviesData();
});
</script>
