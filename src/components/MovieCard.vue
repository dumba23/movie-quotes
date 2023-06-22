<template>
  <div
    class="flex flex-col mb-10 w-[27.5rem] space-y-4"
    @click="handleRedirectToMoviePage(movieId)"
  >
    <img :src="movieImageUrl" alt="movie" class="w-full rounded-xl h-[23rem]" />
    <p class="text-white text-2xl font-medium">
      {{ movieName.toUpperCase() }} ({{ releaseDate.slice(0, 4) }})
    </p>
    <div class="text-lg flex w-14 justify-between">
      <span>{{ quoteQuantity }}</span>
      <IconQuote />
    </div>
  </div>
</template>

<script setup>
import IconQuote from "@/components/icons/IconQuote.vue";
import { useRouter } from "vue-router";

defineProps({
  movieName: { type: String, required: true, default: "" },
  movieId: { type: String, required: true, default: "" },
  movieImageUrl: { type: String, required: true, default: "" },
  releaseDate: { type: String, required: true, default: "" },
  quoteQuantity: { type: Number, required: true, default: 0 },
});

const router = useRouter();

const handleRedirectToMoviePage = (id) => {
  router.push({ name: "movie", params: { id: id } });
};
</script>
