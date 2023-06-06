<template>
  <TheModal v-if="isModalOpen">
    <div class="flex flex-col" ref="target">
      <div class="flex flex-col justify-center items-center mb-4">
        <h1 class="text-3xl text-white mt-6 mb-2">Forgot password?</h1>
        <div
          class="flex flex-col justify-center items-center text-secondary-grey"
        >
          <div>Enter the email and we'll send an email with</div>
          <div>instructions to reset your password</div>
        </div>
      </div>
      <Form @submit="(values) => handleSubmit(values)">
        <FormInputField
          name="email"
          labelName="Email"
          type="email"
          placeholder="Enter your email"
          rules="required|email"
          :errorMessage="errorMessage"
        />
        <FormSubmit name="Send instructions" />
      </Form>
      <div
        @click="handleModalName('auth')"
        class="flex justify-center items-center mt-8 mb-2"
      >
        <IconArrowLeft />
        <span class="text-secondary-grey ml-2">Back to log in</span>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import { Form } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import TheModal from "@/components/shared/TheModal.vue";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { recoverByMail } from "@/services/recovery";

const paginationStore = usePaginationStore();
const isModalOpen = ref(true);
const target = ref(null);
const errorMessage = ref("");

const handleModalName = (name) => {
  isModalOpen.value = false;
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
};

const handleSubmit = async (data) => {
  await recoverByMail(data)
    .then((res) => {
      if (res.status === 200) {
        paginationStore.updateModalName({ name: "recovery_mail_sent" });
      }
    })
    .catch((error) => {
      const { status, message, errors } = error.response.data;
      if (!status || errors) {
        errorMessage.value = message;
      }
    });
};

onClickOutside(target, (event) =>
  event.target.id === "modal"
    ? handleModalName(null)
    : (isModalOpen.value = true)
);
</script>
