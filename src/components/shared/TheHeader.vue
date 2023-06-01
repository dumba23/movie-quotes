<template>
  <div class="flex justify-between mx-20 pt-8">
    <div class="text-primary-yellow">MOVIE QUOTES</div>
    <div class="flex justify-between w-80">
      <div class="flex justify-center items-center text-white px-3 py-2">
        <div class="mr-2.5">Eng</div>
        <div><IconCaretDown /></div>
      </div>
      <div class="flex">
        <button
          @click="handleModalName('register')"
          class="px-7 py-2 bg-primary-red rounded text-white"
        >
          Sign Up
        </button>
      </div>
      <div>
        <button
          @click="handleModalName('auth')"
          class="px-7 py-2 text-white border border-white rounded"
        >
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import { usePaginationStore } from "@/store/pagination";

const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  document.documentElement.style.overflow = "hidden";
  paginationStore.updateModalName({ name });
};
</script>
