<template>
  <div class="bg-primary-black rounded-lg w-[70%] py-6">
    <div class="flex items-center space-x-3 mb-2 px-4">
      <img :src="user.avatar" class="w-10 h-10 rounded-full" />
      <span>{{ user.username }}</span>
    </div>
    <div class="flex space-x-4 mb-8 px-4">
      <p>"{{ data.title?.en }}"</p>
      <h3 class="text-primary-yellow">{{ data.movie.director?.en }}.</h3>
      <span>({{ data.movie.release_date }})</span>
    </div>
    <img alt="quote" :src="data.image" class="mb-5 rounded-xl px-4" />
    <div class="border-b border-secondary-grey flex space-x-10 pb-4 mx-4">
      <div class="flex">
        <span class="mr-2">{{ data.comments.length }}</span
        ><IconComment />
      </div>
      <div class="flex">
        <span class="mr-2">{{ data.likes.length }}</span
        ><IconHeart @click="handleLike" class="cursor-pointer" />
      </div>
    </div>
    <div v-for="comment in data.comments" :key="comment.id">
      <QuoteCommentCard :comment="comment" />
    </div>
    <div class="flex mx-4 mt-6">
      <img :src="userStore.user.avatar" class="h-10 w-10 rounded-full mr-4" />
      <Form @submit="(values) => handleAddComment(values)" class="w-full">
        <CommentInput />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import IconComment from "@/components/icons/IconComment.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import CommentInput from "@/components/ui/CommentInput.vue";
import { toggleLikeOnQuote, addCommentOnQuote } from "@/services/quotes";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import QuoteCommentCard from "./QuoteCommentCard.vue";

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
    console.log(res);
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
