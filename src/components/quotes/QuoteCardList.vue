<template>
  <div class="flex flex-wrap mt-12 mb-20 justify-between space-y-8">
    <QuoteCard
      v-for="quote in quotes"
      :key="quote.id"
      :quoteId="quote.id"
      :title="quote.title"
      :imageUrl="quote.image"
    />
  </div>
</template>

<script setup>
import QuoteCard from "@/components/quotes/QuoteCard.vue";

defineProps({
  quotes: { type: Array, required: true, default: () => [] },
});
</script>
