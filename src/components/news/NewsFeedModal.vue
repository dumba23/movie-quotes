<template>
  <MovieModal v-if="isModalOpen">
    <template #header>
      <div
        id="modal"
        class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
      >
        <h1 class="text-2xl text-white font-medium">
          {{ $t("quotes.add_quote") }}
        </h1>
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
        <form @submit="(values) => handleAddQuote(values)">
          <TextareaMovie
            rules="required|english"
            placeholder="Start create new quote"
            name="title_en"
            class="italic"
          />
          <TextareaMovie
            rules="required|georgian"
            placeholder="ახალი ციტატა"
            name="title_ka"
          />
          <FileUploadMovie class="mt-4" rules="required" />
          <SelectMovie />
          <SubmitMovie :name="$t('quotes.add_quote')" />
        </form>
      </div>
    </template>
  </MovieModal>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import MovieModal from "@/components/movies/MovieModal.vue";
import { useForm } from "vee-validate";
import TextareaMovie from "@/components/ui/TextareaMovie.vue";
import FileUploadMovie from "@/components/ui/FileUploadMovie.vue";
import SubmitMovie from "@/components/ui/SubmitMovie.vue";
import SelectMovie from "@/components/ui/SelectMovie.vue";
import { addQuote } from "@/services/quotes";
import { usePaginationStore } from "@/store/pagination";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import i18n from "@/plugins/i18";

defineProps({
  movie: { type: Object, required: true, default: () => {} },
});

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    title_en: "",
    title_ka: "",
  },
});

const quotesStore = useQuotesStore();
const paginationStore = usePaginationStore();
const userStore = useUserStore();

const handleAddQuote = handleSubmit(async () => {
  try {
    const res = await addQuote({ ...values, movie_id: values.movie_id });
    if (res.status === 201) {
      quotesStore.initializeAllQuotesData();
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
