<template>
  <form @submit.prevent="handleLogin">
    <InputAuth
      name="login"
      :labelName="$t('auth.email')"
      type="text"
      :placeholder="$t('auth.email_placeholder')"
      rules="required|min:3"
    />
    <InputAuth
      name="password"
      :labelName="$t('auth.password')"
      type="password"
      :placeholder="$t('auth.password_placeholder')"
      rules="required"
    />
    <div class="flex justify-between mb-2 sm:mx-8">
      <label class="text-white"
        ><input type="checkbox" name="remember_token" class="mr-2" />{{
          $t("auth.remember_me")
        }}</label
      >
      <div
        @click="handleModalName('recovery_mail_send')"
        class="text-blue-600 underline"
      >
        {{ $t("auth.forgot_password") }}
      </div>
    </div>
    <ButtonSubmit :name="$t('landing.get_started')" />
  </form>
  <GoogleSignButton
    :name="$t('auth.sign_up_with_google')"
    @click="handleGoogleLogIn"
  />
</template>

<script setup>
import { useForm } from "vee-validate";
import InputAuth from "@/components/ui/InputAuth.vue";
import ButtonSubmit from "@/components/ui/ButtonSubmit.vue";
import GoogleSignButton from "@/components/ui/buttons/GoogleSignButton.vue";
import { authByDefault } from "@/services/auth";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";
import { useRouter } from "vue-router";

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    login: "",
    password: "",
  },
  validationSchema: {
    login: "required|min:3",
    password: "required",
  },
});

const router = useRouter();
const paginationStore = usePaginationStore();

const handleModalName = (name) => {
  paginationStore.updateModalName({ name });
  document.documentElement.style.overflow = "auto";
};

const handleLogin = handleSubmit(async () => {
  try {
    const res = await authByDefault(values);
    if (res.status === 200) {
      paginationStore.updateModalName({ name: null });
      router.push({ name: "profile" });
    }
  } catch (error) {
    if (!error.response.data.errors) {
      setFieldError("login", error.response.data.message);
    } else {
      Object.keys(error.response.data.errors).forEach((key) => {
        setFieldError(key, error.response.data.errors[key]);
      });
    }
  }
});

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
