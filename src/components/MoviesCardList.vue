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
    <div
      v-if="movies.length % 2 === 0"
      class="flex flex-col mb-10 w-[27.5rem] space-y-4"
    ></div>
  </div>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";

defineProps({
  movies: { type: Array, required: true, default: () => [] },
  quotes: { type: Array, required: true, default: () => [] },
});

const countQuotes = (movieId, quotes) => {
  let count = 0;
  for (let i = 0; i <= quotes.length; i++) {
    if (movieId === quotes[i]?.movie_id) {
      count++;
    }
  }

  return count;
};
</script>
