<template>
  <Form @submit="(values) => handleLogin(values)">
    <FormInputField
      name="login"
      labelName="Email"
      type="text"
      placeholder="Enter your email"
      rules="required|min:3"
      @input="handleCustomErrorMessageDisplay"
      :errorMessage="errorMessage"
    />
    <FormInputField
      name="password"
      labelName="Password"
      type="password"
      placeholder="At least 8 & max.15 lower case characters"
      rules="required"
      :errorMessage="errorMessage"
    />
    <div class="flex justify-between mb-2">
      <label class="text-white"
        ><input type="checkbox" name="remember_token" class="mr-2" />Remember
        me</label
      >
      <div
        @click="handleModalName('recovery_mail_send')"
        class="text-blue-600 underline"
      >
        Forgot password
      </div>
    </div>
    <FormSubmit name="Get started" />
  </Form>
  <GoogleSignButton name="Sign up with Google" @click="handleGoogleLogIn" />
</template>

<script setup>
import { Form } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import GoogleSignButton from "@/components/ui/buttons/GoogleSignButton.vue";
import { authByDefault } from "@/services/auth";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";

const paginationStore = usePaginationStore();
const errorMessage = ref("");

const handleModalName = (name) => {
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
};

const handleLogin = async (data) => {
  try {
    const res = await authByDefault(data);
    if (res.status === 200) {
      paginationStore.updateModalName({ name: null });
    }
  } catch (error) {
    const { status, message } = error.response.data;
    if (!status) {
      errorMessage.value = message;
    }
  }
};

const handleCustomErrorMessageDisplay = (e) => {
  if (e.target.value.length > 0) {
    errorMessage.value = "";
  }
};

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
