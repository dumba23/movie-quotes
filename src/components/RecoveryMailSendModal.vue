<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col" ref="target">
      <div class="flex flex-col justify-center items-center mb-4">
        <h1 class="text-3xl text-white mt-6 mb-2 sm:text-xl">
          {{ $t("forgot_password") }}?
        </h1>
        <div
          class="flex flex-col justify-center items-center text-secondary-grey sm:text-sm"
        >
          <div>{{ $t("enter_the_email_and_we_send_an_email_with") }}</div>
          <div>{{ $t("instructions_to_reset_your_password") }}</div>
        </div>
      </div>
      <form @submit.prevent="handleSendMail">
        <InputAuth
          name="email"
          :labelName="$t('email')"
          type="email"
          :placeholder="$t('enter_your_email')"
          rules="required|email"
          :errorMessage="errorMessage"
        />
        <ButtonSubmit name="Send instructions" />
      </form>
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
import { useForm } from "vee-validate";
import InputAuth from "@/components/ui/InputAuth.vue";
import ButtonSubmit from "@/components/ui/ButtonSubmit.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import TheModal from "@/components/shared/TheModal.vue";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { recoverByMail } from "@/services/recovery";
import i18n from "@/plugins/i18";

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    email: "",
  },
});

const paginationStore = usePaginationStore();
const isModalOpen = ref(true);
const target = ref(null);
const errorMessage = ref("");

const handleModalName = (name) => {
  isModalOpen.value = false;
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
};

const handleSendMail = handleSubmit(async () => {
  try {
    const res = await recoverByMail(values);
    if (res.status === 200) {
      paginationStore.updateModalName({ name: "recovery_mail_sent" });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      setFieldError(
        "login",
        error.response.data.message?.[i18n.global.locale.value]
      );
    } else {
      Object.keys(error.response.data.errors).forEach((key) => {
        setFieldError(key, error.response.data.errors[key]);
      });
    }
  }
});

onClickOutside(target, (event) =>
  event.target.id === "modal"
    ? handleModalName(null)
    : (isModalOpen.value = true)
);
</script>
