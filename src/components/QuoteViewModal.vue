<template>
  <MovieModal v-if="isModalOpen">
    <template #header>
      <div
        id="modal"
        class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
      >
        <div class="flex absolute left-9 space-x-6">
          <span
            @click="handleToggleModal('edit')"
            class="border-r border-secondary-grey pr-6"
            ><IconEdit />
          </span>
          <span @click="handleToggleModal('remove')"><IconTrash /></span>
        </div>
        <h1 class="text-2xl text-white font-medium">View Quote</h1>
        <span
          class="absolute top-10 right-9 cursor-pointer"
          @click="handleToggleModal('close')"
          ><IconClose />
        </span>
      </div>
    </template>
    <template #form>
      <div ref="target" id="modal" class="px-8 py-8 rounded">
        <div class="flex items-center mb-8">
          <img
            :src="
              userStore.user.avatar.includes('http')
                ? userStore.user.avatar
                : apiUrl + '/storage/' + userStore.user.avatar
            "
            alt="profile"
            class="w-14 h-14 rounded-full mr-3"
          />
          <div>{{ userStore.user.username }}</div>
        </div>
        <div class="border border-secondary-grey relative py-3 rounded">
          <span class="pl-3 text-2xl">"{{ title?.en }}"</span>
          <span
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-grey text-sm"
            >Eng
          </span>
        </div>
        <div class="border border-secondary-grey relative py-3 rounded mt-4">
          <span class="pl-3 text-2xl">"{{ title?.ka }}"</span>
          <span
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-grey text-sm"
            >ქარ
          </span>
        </div>
        <img :src="imageUrl" alt="quote" class="mt-8 rounded-lg" />
      </div>
    </template>
  </MovieModal>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import MovieModal from "@/components/MovieModal.vue";
import { deleteQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useMoviesStore } from "@/store/movies";

const props = defineProps({
  title: { type: Object, required: true, default: () => {} },
  quoteId: { type: String, required: true, default: "" },
  modalId: { type: String, required: true, default: "" },
  imageUrl: { type: String, required: true, default: "" },
});

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const route = useRoute();
const paginationStore = usePaginationStore();
const moviesStore = useMoviesStore();
const userStore = useUserStore();
const isModalOpen = ref(true);
const target = ref(null);

const handleToggleModal = (action) => {
  switch (action) {
    case "close":
      paginationStore.updateModalName({ name: "" });
      break;
    case "edit":
      paginationStore.updateModalName({ name: "edit" });
      break;
    case "remove":
      handleDeleteQuote();
      break;
  }
};

onClickOutside(target, (event) => {
  event.target.id !== "modal"
    ? ((isModalOpen.value = false),
      paginationStore.updateModalName({ name: "" }))
    : (isModalOpen.value = true);
});

const handleDeleteQuote = async () => {
  const {
    params: { id },
  } = route;
  try {
    const res = await deleteQuote(props.quoteId);
    if (res.status === 200) {
      moviesStore.initializeMovieData({ id });
      isModalOpen.value = false;
      paginationStore.updateModalName({ name: "" });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
