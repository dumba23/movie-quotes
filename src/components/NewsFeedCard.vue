<template>
  <div class="bg-primary-black rounded-lg w-[70%] sm:w-full py-6">
    <div class="flex items-center space-x-3 mb-2 px-4">
      <img
        :src="
          user.avatar.includes('http')
            ? user.avatar
            : apiUrl + '/storage/' + user.avatar
        "
        class="w-10 h-10 rounded-full"
      />
      <span class="sm:text-base">{{ user.username }}</span>
    </div>
    <div class="flex space-x-4 mb-8 px-4 sm:text-base">
      <p>"{{ data.title?.[i18n.global.locale.value] }}"</p>
      <h3 class="text-primary-yellow">
        {{ data.movie.director?.[i18n.global.locale.value] }}.
      </h3>
      <span>({{ data.movie.release_date }})</span>
    </div>
    <img
      alt="quote"
      :src="data.image"
      class="mb-5 rounded-xl px-4 sm:px-0 w-[91%] mx-4"
    />
    <div class="border-b border-secondary-grey flex space-x-10 pb-4 mx-4">
      <div class="flex sm:items-center">
        <span class="mr-2">{{ data.comments.length }}</span
        ><IconComment class="sm:w-6 sm:h-6" />
      </div>
      <div class="flex sm:items-center">
        <span class="mr-2">{{ data.likes.length }}</span
        ><IconHeart @click="handleLike" class="cursor-pointer sm:w-6 sm:h-6" />
      </div>
    </div>
    <div v-for="comment in data.comments" :key="comment.id">
      <QuoteCommentCard :comment="comment" />
    </div>
    <div class="flex mx-4 mt-6">
      <img
        :src="
          userStore.user.avatar.includes('http')
            ? userStore.user.avatar
            : apiUrl + '/storage/' + userStore.user.avatar
        "
        class="h-10 w-10 rounded-full mr-4"
      />
      <Form @submit="(values) => handleAddComment(values)" class="w-full">
        <InputComment />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import IconComment from "@/components/icons/IconComment.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import InputComment from "@/components/ui/InputComment.vue";
import { toggleLikeOnQuote, addCommentOnQuote } from "@/services/quotes";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import QuoteCommentCard from "@/components/QuoteCommentCard.vue";
import i18n from "../plugins/i18";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const props = defineProps({
  data: { type: Object, required: true, default: () => {} },
  user: { type: Object, required: true, defult: () => {} },
});

const quotesStore = useQuotesStore();
const userStore = useUserStore();

const handleAddComment = async (data) => {
  const {
    data: { id },
  } = props;

  try {
    const res = await addCommentOnQuote(id, data);
    if (res.status === 201) {
      quotesStore.initializeAllQuotesData();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleLike = async () => {
  const {
    data: { id },
  } = props;

  try {
    const res = await toggleLikeOnQuote(id);
    if (res.status === 200) {
      quotesStore.initializeAllQuotesData();
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
