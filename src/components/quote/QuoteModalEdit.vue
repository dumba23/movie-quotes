<template>
  <MovieModalBase v-if="isModalOpen">
    <template #header>
      <div
        id="modal"
        class="border-b border-medium-gray flex items-center justify-center h-16 py-12"
      >
        <div class="flex absolute left-9 space-x-3 items-center">
          <span @click="handleToggleModal('remove')"><IconTrash /> </span>
          <span class="text-light-grey sm:hidden">{{
            $t("movies.delete")
          }}</span>
        </div>
        <h1 class="text-2xl text-white font-medium">
          {{ $t("quotes.edit_quote") }}
        </h1>
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
            class="w-14 h-14 rounded-full mr-3 sm:w-10 sm:h-10"
          />
          <div>{{ userStore.user.username }}</div>
        </div>
        <form @submit.prevent="handleUpdateQuote">
          <TextareaQuote
            rules="required|english"
            placeholder="Title in English"
            name="title_en"
            class="italic"
          />
          <TextareaQuote
            rules="required|georgian"
            placeholder="ციტატა ქართულად"
            name="title_ka"
          />
          <InputFileUploadQuote :initialValue="imageUrl" />
          <ButtonSubmitMovie type="submit" :name="$t('profile.save_changes')" />
        </form>
      </div>
    </template>
  </MovieModalBase>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import MovieModalBase from "@/components/movie/MovieModalBase.vue";
import { useForm } from "vee-validate";
import TextareaQuote from "@/components/ui/TextareaQuote.vue";
import InputFileUploadQuote from "@/components/ui/InputFileUploadQuote.vue";
import ButtonSubmitMovie from "@/components/ui/ButtonSubmitMovie.vue";
import { deleteQuote, updateQuote } from "@/services/quotes";
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

const formValues = {
  title_en: props.title.en,
  title_ka: props.title.ka,
};

const { values, handleSubmit } = useForm({ initialValues: formValues });

const handleUpdateQuote = handleSubmit(async () => {
  const {
    params: { id },
  } = route;

  const data = values;

  if (data.image == undefined) {
    delete data.image;
  }

  try {
    const res = await updateQuote(data, props.quoteId);
    if (res.status === 200) {
      isModalOpen.value = false;
      paginationStore.updateModalName({ name: "" });
      moviesStore.initializeMovieData({ id });
    }
  } catch (error) {
    return;
  }
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
    return;
  }
};
</script>
