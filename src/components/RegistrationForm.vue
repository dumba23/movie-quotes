<template>
  <form @submit.prevent="handleRegister">
    <FormInputField
      name="username"
      :labelName="$t('name')"
      type="text"
      :placeholder="$t('name_placeholder')"
      rules="required|min:3|max:15|lowerCaseAndNum"
    />
    <FormInputField
      name="email"
      :labelName="$t('email')"
      type="email"
      :placeholder="$t('email_placeholder')"
      rules="required|email"
    />
    <FormInputField
      name="password"
      :labelName="$t('password')"
      type="password"
      :placeholder="$t('password_placeholder')"
      rules="required|min:8|max:15|lowerCaseAndNum"
    />
    <FormInputField
      name="password_confirmation"
      :labelName="$t('confirm_password')"
      type="password"
      :placeholder="$t('confirm_password')"
      rules="required|confirmed:@password"
    />
    <FormSubmit :name="$t('get_started')" />
  </form>
  <GoogleSignButton
    :name="$t('sign_up_with_google')"
    @click="handleGoogleLogIn"
  />
</template>

<script setup>
import { useForm } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import GoogleSignButton from "@/components/ui/buttons/GoogleSignButton.vue";
import { registerUser } from "@/services/register";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";

const paginationStore = usePaginationStore();

const { setFieldError, values } = useForm({
  initialValues: {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
});

const handleRegister = async () => {
  try {
    const res = await registerUser(values);

    if (res.status === 201) {
      paginationStore.updateModalName({ name: "confirm" });
    }
  } catch (error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      setFieldError(key, error.response.data.errors[key]);
    });
  }
};

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
