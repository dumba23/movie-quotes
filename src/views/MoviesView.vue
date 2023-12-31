<template>
  <TheLoggedInHeader />
  <div class="flex justify-between text-xl text-white px-20 sm:px-4">
    <div class="translate-x-[-1rem] w-[30%] sm:hidden">
      <ProfileSidebar
        :username="userStore.user.username"
        :imageUrl="userStore.user.avatar"
      />
    </div>
    <div class="relative w-full">
      <div class="flex flex-row justify-between max-h-16 pt-4">
        <div
          class="flex items-center text-2xl sm:text-lg font-medium sm:flex-col sm:items-start"
        >
          {{ $t("movies.my_list_of_movies") }}
          <span class="ml-1 sm:ml-0 sm:text-xs"
            >({{ $t("movies.total") }}
            {{
              searchTerm.length === 0
                ? moviesStore.movies?.length
                : searchedMovies.length
            }})</span
          >
        </div>
        <div class="flex justify-center items-center text-lg">
          <div class="text-light-grey flex items-center sm:hidden">
            <button><IconSearch /></button>
            <input
              class="ml-2 bg-transparent w-16 outline-none"
              type="text"
              @input="handleSearchInput"
              :placeholder="$t('movies.search')"
            />
          </div>
          <button
            @click="handleModalToggle(true)"
            class="flex items-center ml-7 bg-primary-red py-2 px-4 rounded"
          >
            <IconPlus />
            <span class="ml-2 sm:text-sm">{{ $t("movies.add_movie") }}</span>
          </button>
        </div>
      </div>
      <MovieCardList
        :movies="searchTerm.length === 0 ? moviesStore.movies : searchedMovies"
        :quotes="quotesStore.quotes"
      />
    </div>
    <MovieModalBase v-if="isModalOpen">
      <template #header>
        <div
          id="modal"
          class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
        >
          <h1 class="text-2xl text-white font-medium">Add Movie</h1>
          <span
            class="absolute top-10 right-4 cursor-pointer"
            @click="handleModalToggle(false)"
            ><IconClose
          /></span>
        </div>
      </template>
      <template #form>
        <div ref="target">
          <MovieAddForm
            :username="userStore.user.username"
            :profileImageUrl="userStore.user.avatar"
            @closeModal="isModalOpen = false"
          />
        </div>
      </template>
    </MovieModalBase>
  </div>
</template>

<script setup>
import TheLoggedInHeader from "@/components/shared/TheLoggedInHeader.vue";
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import MovieModalBase from "@/components/movie/MovieModalBase.vue";
import MovieCardList from "@/components/movie/MovieCardList.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconClose from "@/components/icons/IconClose.vue";
import MovieAddForm from "@/components/movie/MovieAddForm.vue";
import { useMoviesStore } from "@/store/movies";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import i18n from "@/plugins/i18";

defineProps(["id"]);

const userStore = useUserStore();
const moviesStore = useMoviesStore();
const quotesStore = useQuotesStore();

const isModalOpen = ref(false);
const target = ref(null);
const searchTerm = ref("");
const searchedMovies = ref([]);

onClickOutside(
  target,
  (event) => event.target.id !== "modal" && (isModalOpen.value = false)
);

const search = (input) => {
  let filteredMovies = [];
  moviesStore.movies.forEach((movie) => {
    if (
      movie.title[i18n.global.locale.value]
        .toLowerCase()
        .includes(input.toLowerCase())
    ) {
      filteredMovies = [...filteredMovies, movie];
    }
  });
  return filteredMovies;
};

const handleSearchInput = (event) => {
  const input = event.target.value;
  searchTerm.value = input;

  searchedMovies.value = [...search(input)];
};

const handleModalToggle = (value) => {
  isModalOpen.value = value;
};

onMounted(() => {
  userStore.initializeUserData();
  moviesStore.initializeMoviesData();
  quotesStore.initializeQuotesData();
});
</script>
