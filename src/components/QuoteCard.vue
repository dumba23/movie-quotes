<template>
  <div class="px-8 py-6 bg-primary-black w-[50rem] rounded-[10px]">
    <div class="border-b border-secondary-grey pb-6 flex items-center relative">
      <img :src="imageUrl" alt="quote" class="w-56 h-36 rounded-sm" />
      <p class="text-ligh-grey text-2xl italic ml-8">"{{ title?.en }}"</p>
      <span
        @click="handleToggleDropdown"
        class="absolute top-1 right-0 h-8 cursor-pointer"
        ><IconDots
      /></span>
      <div
        v-if="isDropdownOpen"
        class="absolute top-4 right-0 flex flex-col bg-secondary-black translate-x-56 rounded-xl z-10"
        ref="target"
      >
        <button
          class="flex items-center px-12 py-8 space-x-3"
          @click="handleOpenModal('view')"
        >
          <span><IconEye /></span><span>View Quote</span>
        </button>
        <button
          class="flex items-center px-12 py-8 space-x-3"
          @click="handleOpenModal('edit')"
        >
          <span><IconEdit /></span><span>Edit</span>
        </button>
        <button
          class="flex items-center px-12 py-8 space-x-3"
          @click="handleDeleteQuote"
        >
          <IconTrash /><span>Remove Quote</span>
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
  </div>
</template>

<script setup>
import IconDots from "@/components/icons/IconDots.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import QuoteViewModal from "@/components/QuoteViewModal.vue";
import QuoteEditModal from "@/components/QuoteEditModal.vue";
import { useMoviesStore } from "@/store/movies";
import { deleteQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";

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
    console.error(error);
  }
};
</script>
