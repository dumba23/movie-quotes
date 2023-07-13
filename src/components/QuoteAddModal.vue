<template>
  <MovieModal v-if="isModalOpen">
    <template #header>
      <div
        id="modal"
        class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
      >
        <h1 class="text-2xl text-white font-medium">{{ $t("add_quote") }}</h1>
        <span
          class="absolute top-10 right-9 cursor-pointer"
          @click="handleCloseModal"
          ><IconClose />
        </span>
      </div>
    </template>
    <template #form>
      <div ref="target" id="modal" class="px-8 py-8 rounded pb-14">
        <div class="flex items-center mb-8">
          <img
            :src="
              userStore.user.avatar.includes('http')
                ? userStore.user.avatar
                : apiUrl + '/storage/' + userStore.user.avatar
            "
            alt="profile"
            class="w-14 h-14 sm:h-10 sm:w-10 rounded-full mr-3"
          />
          <div>{{ userStore.user.username }}</div>
        </div>
        <div
          class="flex space-x-10 mb-6 sm:space-x-2 sm:bg-primary-black sm:py-4"
        >
          <img
            alt="movie"
            :src="movie.image"
            class="w-72 h-40 sm:w-24 sm:h-20 object-cover rounded-xl"
          />
          <div class="space-y-4 sm:space-y-1">
            <h1 class="text-2xl font-medium text-primary-yellow sm:text-base">
              {{ movie.title?.[i18n.global.locale.value] }} ({{
                movie.release_date
              }})
            </h1>
            <div
              v-for="genre in movie.genres"
              :key="genre.id"
              class="sm:hidden text-lg sm:text-xs inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold text-white bg-secondary-grey rounded font-bold"
            >
              {{ genre.name }}
            </div>
            <div
              class="flex space-x-3 text-lg sm:text-sm sm:space-x-1 font-bold"
            >
              <h2>{{ $t("director") }}:</h2>
              <h2>{{ movie.director?.[i18n.global.locale.value] }}</h2>
            </div>
            <div class="hidden sm:flex flex-wrap">
              <div
                v-for="genre in movie.genres"
                :key="genre.id"
                class="text-lg sm:text-xs mt-1 inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold text-white bg-secondary-grey rounded font-bold"
              >
                {{ genre.name }}
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="handleAddQuote">
          <MovieFileUpload class="hidden mb-4 sm:block" />
          <MovieTextarea
            rules="required"
            placeholder="Quote in English."
            name="title_en"
            class="italic"
          />
          <MovieTextarea
            rules="required"
            placeholder="ციტატა ქართულ ენაზე"
            name="title_ka"
          />
          <MovieFileUpload class="mt-10 mb-8 sm:hidden" />
          <MovieSubmit :name="$t('add_quote')" />
        </form>
      </div>
    </template>
  </MovieModal>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import MovieModal from "@/components/MovieModal.vue";
import { useForm } from "vee-validate";
import MovieTextarea from "@/components/ui/MovieTextarea.vue";
import MovieFileUpload from "@/components/ui/MovieFileUpload.vue";
import MovieSubmit from "@/components/ui/MovieSubmit.vue";
import { addQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { useMoviesStore } from "@/store/movies";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";
import i18n from "../plugins/i18";

const props = defineProps({
  movie: { type: Object, required: true, default: () => {} },
});

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    title_en: "",
    title_ka: "",
    image: "",
  },
});

const route = useRoute();

const moviesStore = useMoviesStore();

const handleAddQuote = handleSubmit(async () => {
  const {
    params: { id },
  } = route;
  try {
    const res = await addQuote({ ...values, movie_id: props.movie.id });
    if (res.status === 200) {
      moviesStore.initializeMovieData({ id });
      isModalOpen.value = false;
      paginationStore.updateModalName({ name: "" });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      setFieldError(
        "login",
        error.response.data.message?.[i18n.global.locale.value]
      );
    } else {
      Object.keys(error.response.data.errors).forEach((key) => {
        setFieldError(key, error.response.data.errors[key]);
      });
    }
  }
});

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const paginationStore = usePaginationStore();
const userStore = useUserStore();
const isModalOpen = ref(true);
const target = ref(null);

const handleCloseModal = () => {
  paginationStore.updateModalName({ name: "" });
};

onClickOutside(target, (event) => {
  event.target.id !== "modal"
    ? ((isModalOpen.value = false),
      paginationStore.updateModalName({ name: "" }))
    : (isModalOpen.value = true);
});
</script>
