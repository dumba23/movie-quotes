<template>
  <MovieModal v-if="isModalOpen">
    <template #header>
      <div
        id="modal"
        class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
      >
        <h1 class="text-2xl text-white font-medium">Add Quote</h1>
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
            class="w-14 h-14 rounded-full mr-3"
          />
          <div>{{ userStore.user.username }}</div>
        </div>
        <Form @submit="(values) => handleAddQuote(values)">
          <MovieTextarea
            rules="required"
            placeholder="Start create new quote"
            name="title_en"
            class="italic"
          />
          <MovieTextarea
            rules="required"
            placeholder="ახალი ციტატა"
            name="title_ka"
          />
          <MovieFileUpload class="mt-4" />
          <MovieSelect />
          <MovieSubmit name="Add quote" />
        </Form>
      </div>
    </template>
  </MovieModal>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import MovieModal from "@/components/MovieModal.vue";
import { Form } from "vee-validate";
import MovieTextarea from "@/components/ui/MovieTextarea.vue";
import MovieFileUpload from "@/components/ui/MovieFileUpload.vue";
import MovieSubmit from "@/components/ui/MovieSubmit.vue";
import MovieSelect from "@/components/ui/MovieSelect.vue";
import { addQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

defineProps({
  movie: { type: Object, required: true, default: () => {} },
});

const quotesStore = useQuotesStore();
const paginationStore = usePaginationStore();
const userStore = useUserStore();

const handleAddQuote = async (data) => {
  console.log(data);

  try {
    const res = await addQuote({ ...data, movie_id: data.movie_id });
    if (res.status === 200) {
      quotesStore.initializeAllQuotesData();
      isModalOpen.value = false;
      paginationStore.updateModalName({ name: "" });
    }
  } catch (error) {
    console.error(error);
  }
};

const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
