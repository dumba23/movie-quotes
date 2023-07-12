<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col pt-10 pb-6" ref="target">
      <div class="flex flex-col justify-center items-center mb-4 space-y-8">
        <IconExpired />
        <div class="font-medium text-white text-3xl sm:text-xl">
          {{ $t("link_expired") }}!
        </div>
        <div class="text-white sm:text-sm">
          {{ $t("login_link_has_expired_because_you_have_not_used_it") }}
        </div>
        <button
          class="bg-primary-red text-white w-96 sm:w-60 h-10 rounded flex justify-center items-center"
          @click="handleModalName('recovery_mail_send')"
        >
          {{ $t("request_another_link") }}
        </button>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import IconExpired from "@/components/icons/IconExpired.vue";
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
