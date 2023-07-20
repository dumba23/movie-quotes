<template>
  <form @submit.prevent="handleRegister">
    <InputAuth
      name="username"
      :labelName="$t('auth.name')"
      type="text"
      :placeholder="$t('auth.name_placeholder')"
      rules="required|min:3|max:15|lowerCaseAndNum"
    />
    <InputAuth
      name="email"
      :labelName="$t('auth.email')"
      type="email"
      :placeholder="$t('auth.email_placeholder')"
      rules="required|email"
    />
    <InputAuth
      name="password"
      :labelName="$t('auth.password')"
      type="password"
      :placeholder="$t('auth.password_placeholder')"
      rules="required|min:8|max:15|lowerCaseAndNum"
    />
    <InputAuth
      name="password_confirmation"
      :labelName="$t('auth.confirm_password')"
      type="password"
      :placeholder="$t('auth.confirm_password')"
      rules="required|confirmed:@password"
    />
    <ButtonSubmit :name="$t('landing.get_started')" />
  </form>
  <ButtonSubmitGoogle
    :name="$t('auth.sign_up_with_google')"
    @click="handleGoogleLogIn"
  />
</template>

<script setup>
import { useForm } from "vee-validate";
import InputAuth from "@/components/ui/InputAuth.vue";
import ButtonSubmit from "@/components/ui/ButtonSubmit.vue";
import ButtonSubmitGoogle from "@/components/ui/ButtonSubmitGoogle.vue";
import { register } from "@/services/register";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";

const paginationStore = usePaginationStore();

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
});

const handleRegister = handleSubmit(async () => {
  try {
    const res = await register(values);

    if (res.status === 201) {
      paginationStore.updateModalName({ name: "confirm" });
    }
  } catch (error) {
    Object.keys(error.response.data.errors).forEach((key) => {
      setFieldError(key, error.response.data.errors[key]);
    });
  }
});

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
