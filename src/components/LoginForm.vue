<template>
  <form @submit.prevent="handleLogin">
    <FormInputField
      name="login"
      :labelName="$t('email')"
      type="text"
      :placeholder="$t('email_placeholder')"
      rules="required|min:3"
    />
    <FormInputField
      name="password"
      :labelName="$t('password')"
      type="password"
      :placeholder="$t('password_placeholder')"
      rules="required"
    />
    <div class="flex justify-between mb-2 sm:mx-8">
      <label class="text-white"
        ><input type="checkbox" name="remember_token" class="mr-2" />{{
          $t("remember_me")
        }}</label
      >
      <div
        @click="handleModalName('recovery_mail_send')"
        class="text-blue-600 underline"
      >
        {{ $t("forgot_password") }}
      </div>
    </div>
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
import { authByDefault } from "@/services/auth";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";
import { useRouter } from "vue-router";
import i18n from "@/plugins/i18";

const { setFieldError, values } = useForm({
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

const handleLogin = async () => {
  try {
    const res = await authByDefault(values);
    if (res.status === 200) {
      paginationStore.updateModalName({ name: null });
      router.push({ name: "profile" });
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
};

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
