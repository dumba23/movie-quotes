<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col pt-10 pb-6" ref="target">
      <div class="flex flex-col justify-center items-center mb-4 space-y-8">
        <IconVerify />
        <div class="font-medium text-white text-3xl">Thank you!</div>
        <div class="text-white">Your account has been activated</div>
        <button
          class="bg-primary-red text-white w-96 h-10 rounded flex justify-center items-center"
          @click="handleRedirectToLogin"
        >
          Go to my news feed
        </button>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import IconVerify from "@/components/icons/IconVerify.vue";
import { usePaginationStore } from "@/store/pagination";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const router = useRouter();
const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  isModalOpen.value = false;
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
  router.replace({ query: null });
};

const handleRedirectToLogin = () => {
  document.documentElement.style.overflow = "hidden";
  paginationStore.updateModalName({ name: "login" });
  router.replace({ query: null });
};

const isModalOpen = ref(true);
const target = ref(null);

onClickOutside(target, (event) =>
  event.target.id === "modal"
    ? handleModalName(null)
    : (isModalOpen.value = true)
);
</script>
