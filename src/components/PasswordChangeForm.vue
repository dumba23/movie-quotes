<template>
  <Form @submit="(values) => handlePasswordChange(values)">
    <FormInputField
      name="password"
      labelName="Password"
      type="password"
      placeholder="At least 8 & max.15 lower case characters"
      rules="required|min:8|max:15|lowerCaseAndNum"
      :errorMessage="errorMessage"
    />
    <FormInputField
      name="password_confirmation"
      labelName="Confirm password"
      type="password"
      placeholder="Confirm password"
      rules="required|confirmed:@password"
    />
    <FormSubmit name="Reset password" />
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import { usePaginationStore } from "@/store/pagination";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { changePassword } from "@/services/recovery";

const route = useRoute();
const router = useRouter();
const paginationStore = usePaginationStore();
const errorMessage = ref("");

const handlePasswordChange = async (data) => {
  const { token } = route.query;
  try {
    const res = await changePassword(data, token);
    if (res.status === 201) {
      paginationStore.updateModalName({ name: "success" });
      router.replace({ query: null });
    }
  } catch (error) {
    const { status, message } = error.response.data;
    if (!status) {
      errorMessage.value = message;
    }
  }
};
</script>
