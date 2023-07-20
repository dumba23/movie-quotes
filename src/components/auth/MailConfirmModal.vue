<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col pt-10 pb-6" ref="target">
      <div class="flex flex-col justify-center items-center mb-4 space-y-8">
        <IconMailConfirm />
        <div class="font-medium text-white text-3xl sm:text-xl">
          {{ $t("auth.thank_you") }}!
        </div>
        <div
          class="flex flex-col justify-center items-center text-white sm:text-sm"
        >
          <span class="sm:w-80 sm:text-center"
            >{{
              $t("auth.please_check_your_email_and_follow_the_instructions_to")
            }}
            <span class="hidden sm:inline"
              >{{ $t("auth.activate_your_account") }}.</span
            >
          </span>
          <span class="sm:hidden">{{ $t("auth.activate_your_account") }}.</span>
        </div>
        <a
          class="bg-primary-red text-white w-96 sm:w-60 h-10 rounded flex justify-center items-center"
          href="https://www.google.com/gmail/about/"
          target="_blank"
        >
          {{ $t("auth.go_to_my_email") }}
        </a>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/shared/TheModal.vue";
import IconMailConfirm from "@/components/icons/IconMailConfirm.vue";
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
