<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col" ref="target">
      <div class="flex flex-col justify-center items-center mb-4">
        <h1 class="text-3xl text-white mt-6 mb-2 sm:text-xl">
          {{ $t("auth.log_in_to_your_account") }}
        </h1>
        <p class="text-secondary-grey sm:text-sm">
          {{ $t("auth.welcome_back_please_enter_your_details") }}.
        </p>
      </div>
      <FormLogin />
      <div class="flex justify-center mt-8 mb-8">
        <p class="text-secondary-grey">
          {{ $t("auth.dont_have_an_account") }}?<button
            @click="handleModalName('register')"
            class="text-primary-blue underline ml-1"
          >
            {{ $t("landing.sign_up") }}
          </button>
        </p>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import FormLogin from "@/components/auth/FormLogin.vue";
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
