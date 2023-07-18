<template>
  <div class="px-8 py-6 bg-primary-black w-[50rem] rounded-[10px]">
    <div
      class="border-b border-secondary-grey pb-6 flex sm:flex-col sm:items-start items-center relative"
    >
      <img
        :src="imageUrl"
        alt="quote"
        class="w-56 sm:w-full sm:mb-2 h-36 rounded-sm"
      />
      <p class="text-ligh-grey text-2xl italic ml-8 sm:ml-0">
        "{{ title?.[i18n.global.locale.value] }}"
      </p>
      <span
        @click="handleToggleDropdown"
        class="absolute lg:top-1 sm:bottom-0 sm:translate-y-14 right-0 h-8 cursor-pointer"
        ><IconDots
      /></span>
      <div
        v-if="isDropdownOpen"
        class="absolute lg:top-4 lg:right-0 sm:translate-x-8 sm:-translate-y-4 flex flex-col bg-secondary-black translate-x-56 rounded-xl z-10"
        ref="target"
      >
        <button
          class="flex items-center px-12 py-8 sm:py-6 sm:px-12 space-x-3"
          @click="handleOpenModal('view')"
        >
          <span><IconEye /></span><span>{{ $t("view_quote") }}</span>
        </button>
        <button
          class="flex items-center px-12 py-8 sm:py-6 sm:px-12 space-x-3"
          @click="handleOpenModal('edit')"
        >
          <span><IconEdit /></span><span>{{ $t("edit") }}</span>
        </button>
        <button
          class="flex items-center px-12 py-8 sm:py-6 sm:px-12 space-x-3"
          @click="handleDeleteQuote"
        >
          <IconTrash /><span>{{ $t("delete") }}</span>
        </button>
      </div>
      <QuoteViewModal
        v-if="paginationStore.modalName === 'view' && quoteId === modalId"
        :modalId="modalId"
        :quoteId="quoteId"
        :title="title"
        :imageUrl="imageUrl"
      />
      <QuoteEditModal
        v-if="paginationStore.modalName === 'edit' && quoteId === modalId"
        :modalId="modalId"
        :quoteId="quoteId"
        :title="title"
        :imageUrl="imageUrl"
      />
    </div>
    <div class="flex space-x-4 items-center mt-4">
      <div class="flex sm:items-center">
        <span class="mr-2">{{ totalComments }}</span
        ><IconComment class="sm:w-6 sm:h-6" />
      </div>
      <div class="flex sm:items-center">
        <span class="mr-2">{{ totalLikes }}</span
        ><IconHeart class="cursor-pointer sm:w-6 sm:h-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconDots from "@/components/icons/IconDots.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconComment from "@/components/icons/IconComment.vue";
import QuoteViewModal from "@/components/quotes/QuoteViewModal.vue";
import QuoteEditModal from "@/components/quotes/QuoteEditModal.vue";
import { useMoviesStore } from "@/store/movies";
import { deleteQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";
import i18n from "@/plugins/i18";

const props = defineProps({
  quoteId: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "" },
  imageUrl: { type: String, required: true, default: "" },
});

const route = useRoute();
const moviesStore = useMoviesStore();
const paginationStore = usePaginationStore();
const isDropdownOpen = ref(null);
const target = ref(null);
const modalId = ref(null);
const totalComments = ref(0);
const totalLikes = ref(0);

onMounted(() => {
  const quote = moviesStore.movie.quotes.find(
    (quote) => quote.id === props.quoteId
  );

  totalComments.value = quote.comments?.length;
  totalLikes.value = quote.likes?.length;
});

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const handleOpenModal = (name) => {
  paginationStore.updateModalName({ name });
  modalId.value = props.quoteId;
  isDropdownOpen.value = false;
};

onClickOutside(target, () => {
  isDropdownOpen.value = false;
  paginationStore.updateModalName({ name: "" });
});

const handleDeleteQuote = async () => {
  const {
    params: { id },
  } = route;
  try {
    const res = await deleteQuote(props.quoteId);
    if (res.status === 200) {
      moviesStore.initializeMovieData({ id });
      isDropdownOpen.value = false;
    }
  } catch (error) {
    return;
  }
};
</script>
