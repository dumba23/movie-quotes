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
        {{ data.movie.title?.[i18n.global.locale.value] }}.
      </h3>
      <span>({{ data.movie.release_date }})</span>
    </div>
    <img
      alt="quote"
      :src="data.image"
      class="mb-5 rounded-xl sm:px-0 w-[97%] mx-4 sm:mx-0 sm:w-full sm:rounded-none"
    />
    <div class="border-b border-secondary-grey flex space-x-10 pb-4 mx-4">
      <div class="flex sm:items-center">
        <span class="mr-2">{{ data.comments.length }}</span
        ><IconComment class="sm:w-6 sm:h-6" />
      </div>
      <div class="flex sm:items-center">
        <span class="mr-2">{{ data.likes.length }}</span>
        <IconHeart
          v-if="!checkIfIdExists(userStore.user.id)"
          @click="handleLike"
          class="cursor-pointer sm:w-6 sm:h-6"
        />
        <IconPinkHeart
          v-else
          @click="handleLike"
          class="cursor-pointer w-8 h-8 sm:w-6 sm:h-6"
        />
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
      <form @submit.prevent="handleAddComment" class="w-full">
        <InputComment />
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import IconComment from "@/components/icons/IconComment.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconPinkHeart from "@/components/icons/IconPinkHeart.vue";
import InputComment from "@/components/ui/InputComment.vue";
import { toggleLikeOnQuote, addCommentOnQuote } from "@/services/quotes";
import { useQuotesStore } from "@/store/quotes";
import { useUserStore } from "@/store/user";
import QuoteCommentCard from "@/components/quote/QuoteCommentCard.vue";
import i18n from "@/plugins/i18";
import { watch, ref } from "vue";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const props = defineProps({
  data: { type: Object, required: true, default: () => {} },
  user: { type: Object, required: true, defult: () => {} },
  index: { type: Number, required: true, default: 0 },
});
const { resetField, values } = useForm();

const quotesStore = useQuotesStore();
const userStore = useUserStore();

const userIds = ref(props.data.likes.map((obj) => obj.id));

watch(
  () => props.data.likes.length,
  () => {
    userIds.value = props.data.likes.map((obj) => obj.id);
  }
);

const checkIfIdExists = (id) => {
  return userIds.value.includes(id);
};

const handleAddComment = async () => {
  const {
    data: { id },
  } = props;

  try {
    const res = await addCommentOnQuote(id, values);
    if (res.status === 201) {
      resetField("content");
      quotesStore.initializeAllQuotesData();
    }
  } catch (error) {
    return;
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
    return;
  }
};
</script>
