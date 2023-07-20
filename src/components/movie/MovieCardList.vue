<template>
  <div class="flex flex-wrap mt-12 justify-between">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movieName="movie.title"
      :movieId="movie.id"
      :movieImageUrl="movie.image"
      :releaseDate="movie.release_date"
      :quoteQuantity="countQuotes(movie.id, quotes)"
    />
    <div class="flex flex-col mb-10 w-[27.5rem] space-y-4"></div>
  </div>
</template>

<script setup>
import MovieCard from "@/components/movie/MovieCard.vue";

defineProps({
  movies: { type: Array, required: true, default: () => [] },
  quotes: { type: Array, required: true, default: () => [] },
});

const countQuotes = (movieId, quotes) => {
  return quotes.reduce((count, quote) => {
    return count + (quote?.movie_id === movieId ? 1 : 0);
  }, 0);
};
</script>
