<template>
  <form @submit.prevent="handlePasswordChange">
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
    <ButtonSubmit :name="$t('auth.reset_password')" />
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import InputAuth from "@/components/ui/InputAuth.vue";
import ButtonSubmit from "@/components/ui/ButtonSubmit.vue";
import { usePaginationStore } from "@/store/pagination";
import { useRoute, useRouter } from "vue-router";
import { changePassword } from "@/services/recovery";
import i18n from "@/plugins/i18";

const { setFieldError, values, handleSubmit } = useForm({
  initialValues: {
    password: "",
    password_confirmation: "",
  },
});

const route = useRoute();
const router = useRouter();
const paginationStore = usePaginationStore();

const handlePasswordChange = handleSubmit(async () => {
  const { token } = route.query;
  try {
    const res = await changePassword(values, token);
    if (res.status === 201) {
      paginationStore.updateModalName({ name: "success" });
      router.replace({ query: null });
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
</script>
