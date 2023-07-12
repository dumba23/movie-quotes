<template>
  <TheLoggedInHeader />
  <div
    class="flex justify-between text-xl text-white px-20 sm:px-4 sm:py-6"
    :key="$route.params.id"
  >
    <div class="translate-x-[-1rem] w-[30%] sm:hidden">
      <ProfileSidebar
        :username="userStore.user.username"
        :imageUrl="userStore.user.avatar"
      />
    </div>
    <div class="relative w-full">
      <h1 class="text-2xl font-medium my-8 sm:hidden">
        {{ $t("movie_description") }}
      </h1>
      <div class="flex flex-row justify-between sm:flex-col">
        <img
          alt="movie"
          :src="moviesStore.movie.image"
          class="w-[50rem] h-[27.5rem] sm:w-full sm:h-60 object-cover rounded-xl"
        />
        <div class="max-w-[36rem] space-y-4 sm:space-y-3 sm:mt-6">
          <div class="flex flex-row justify-between">
            <h2 class="text-primary-yellow text-2xl">
              {{ moviesStore.movie.title?.[i18n.global.locale.value] }} ({{
                moviesStore.movie.release_date
              }})
            </h2>
            <div
              class="flex items-center py-1 bg-secondary-black text-secondary-grey rounded-lg sm:hidden"
            >
              <button class="px-6" @click="handleModalToggle(true)">
                <IconEdit /></button
              >|<button @click="handleRemoveMovie" class="px-6">
                <IconTrash />
              </button>
            </div>
          </div>
          <div
            v-for="genre in moviesStore.movie.genres"
            :key="genre.id"
            class="inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold text-white bg-secondary-grey rounded"
          >
            {{ genre.name }}
          </div>
          <div class="text-lg">
            <span class="font-bold text-light-grey mr-3 sm:text-base"
              >{{ $t("director") }}:</span
            >
            <span class="font-medium text-white sm:text-base">{{
              moviesStore.movie.director?.[i18n.global?.locale.value]
            }}</span>
          </div>
          <div class="text-lg">
            {{ moviesStore.movie.description?.[i18n.global?.locale.value] }}
          </div>
        </div>
      </div>
      <div class="flex items-center mt-8 sm:hidden">
        <div class="text-2xl border-r border-secondary-grey pr-4">
          {{ $t("quotes") }} ({{ $t("total") }}
          {{ moviesStore.movie.quotes?.length }})
        </div>
        <button
          @click="true"
          class="flex items-center ml-4 bg-primary-red py-2 px-4 rounded"
        >
          <IconPlus />
          <span
            class="ml-2"
            @click="paginationStore.updateModalName({ name: 'add-quote' })"
            >{{ $t("add_quote") }}</span
          >
        </button>
      </div>
      <div class="hidden sm:flex flex-col items-start mt-8">
        <button
          @click="true"
          class="flex items-center text-sm bg-primary-red py-2 px-4 mb-8 rounded"
        >
          <IconPlus />
          <span
            class="text-base ml-2"
            @click="paginationStore.updateModalName({ name: 'add-quote' })"
            >{{ $t("add_quote") }}</span
          >
        </button>
        <div class="border-t border-secondary-grey w-full pt-12 flex flex-col">
          <span class="text-md">{{ $t("all_quotes") }}</span>
          <span class="text-base"
            >({{ $t("total") }} {{ moviesStore.movie.quotes?.length }})</span
          >
        </div>
      </div>
      <QuoteCardList :quotes="moviesStore.movie.quotes" />
    </div>
    <QuoteAddModal
      v-if="paginationStore.modalName === 'add-quote'"
      :movie="moviesStore.movie"
    />
    <MovieModal v-if="isModalOpen">
      <template #header>
        <div
          id="modal"
          class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
        >
          <h1 class="text-2xl text-white font-medium">
            {{ $t("edit_movie") }}
          </h1>
          <span
            class="absolute top-10 right-4 cursor-pointer"
            @click="handleModalToggle(false)"
            ><IconClose
          /></span>
        </div>
      </template>
      <template #form>
        <div ref="target">
          <MovieEdit
            :movie="moviesStore.movie"
            :username="userStore.user.username"
            :profileImageUrl="userStore.user.avatar"
          />
        </div>
      </template>
    </MovieModal>
  </div>
</template>

<script setup>
import TheLoggedInHeader from "@/components/shared/TheLoggedInHeader.vue";
import ProfileSidebar from "@/components/ProfileSidebar.vue";
import MovieModal from "@/components/MovieModal.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconClose from "@/components/icons/IconClose.vue";
import MovieEdit from "@/components/MovieEdit.vue";
import QuoteAddModal from "@/components/QuoteAddModal.vue";
import { useMoviesStore } from "@/store/movies";
import { usePaginationStore } from "@/store/pagination";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";
import { ref, onBeforeUnmount } from "vue";
import { onClickOutside } from "@vueuse/core";
import { deleteMovie } from "@/services/movies";
import { useRouter } from "vue-router";
import QuoteCardList from "@/components/QuoteCardList.vue";
import i18n from "../plugins/i18";

const props = defineProps(["id"]);

const router = useRouter();
const userStore = useUserStore();
const paginationStore = usePaginationStore();
const moviesStore = useMoviesStore();

const isModalOpen = ref(false);
const target = ref(null);

onClickOutside(
  target,
  (event) => event.target.id !== "modal" && (isModalOpen.value = false)
);

const handleModalToggle = (value) => {
  isModalOpen.value = value;
};

const handleRemoveMovie = async () => {
  try {
    const res = await deleteMovie(props.id);
    if (res.status === 200) {
      router.push({ name: "movies" });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  userStore.initializeUserData();
  moviesStore.initializeMovieData({ id: props.id });
});

onBeforeUnmount(() => {
  moviesStore.clearMovieData();
});
</script>
