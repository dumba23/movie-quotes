<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col pt-10 pb-6" ref="target">
      <div class="flex flex-col justify-center items-center mb-4 space-y-8">
        <IconSuccessTick />
        <div class="font-medium text-white text-3xl sm:text-xl">
          {{ $t("auth.success") }}!
        </div>
        <div class="flex flex-col justify-center items-center text-white">
          <span class="sm:text-sm">{{
            $t("auth.your_password_changed_successfully")
          }}</span>
        </div>
        <button
          class="bg-primary-red text-white w-96 sm:w-60 h-10 rounded flex justify-center items-center"
          @click="handleModalName('auth')"
        >
          {{ $t("auth.log_in") }}
        </button>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import IconSuccessTick from "@/components/icons/IconSuccessTick.vue";
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
