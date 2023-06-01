<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col" ref="target">
      <div class="flex flex-col justify-center items-center mb-4">
        <h1 class="text-3xl text-white mt-6">Create an account</h1>
        <p class="text-secondary-grey">Start your journey!</p>
      </div>
      <RegistrationForm />
      <div class="flex justify-center mt-8 mb-8">
        <p class="text-secondary-grey">
          Already have an account?<button
            @click="handleModalName('auth')"
            class="text-primary-blue underline ml-1"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  isModalOpen.value = false;
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
};

const isModalOpen = ref(true);
const target = ref(null);

onClickOutside(target, (event) =>
  event.target.id === "modal"
    ? handleModalName(null)
    : (isModalOpen.value = true)
);
</script>
