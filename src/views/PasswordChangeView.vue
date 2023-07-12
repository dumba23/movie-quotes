<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col" ref="target">
      <div class="flex flex-col justify-center items-center mb-4">
        <h1 class="text-3xl text-white mt-6 mb-2 sm:text-xl">
          {{ $t("create_new_password") }}
        </h1>
        <div
          class="flex flex-col justify-center items-center text-secondary-grey sm:text-sm"
        >
          <span>{{ $t("your_new_password_must_be_different") }}</span>
          <span>{{ $t("from_previous_used_passwords") }}</span>
        </div>
      </div>
      <PasswordChangeForm />
      <div
        @click="handleModalName('auth')"
        class="flex justify-center items-center mt-8 mb-2"
      >
        <IconArrowLeft />
        <span class="text-secondary-grey ml-2">{{ $t("back_to_log_in") }}</span>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import PasswordChangeForm from "@/components/PasswordChangeForm.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";

const router = useRouter();
const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  isModalOpen.value = false;
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
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
