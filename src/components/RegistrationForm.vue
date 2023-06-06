<template>
  <Form @submit="(values) => handleRegister(values)">
    <FormInputField
      name="username"
      labelName="Name"
      type="text"
      placeholder="At least 3 & max.15 lower case characters"
      rules="required|min:3|max:15|lowerCaseAndNum"
    />
    <FormInputField
      name="email"
      labelName="Email"
      type="email"
      placeholder="Enter your email"
      rules="required|email"
    />
    <FormInputField
      name="password"
      labelName="Password"
      type="password"
      placeholder="At least 8 & max.15 lower case characters"
      rules="required|min:8|max:15|lowerCaseAndNum"
    />
    <FormInputField
      name="password_confirmation"
      labelName="Confirm password"
      type="password"
      placeholder="Confirm password"
      rules="required|confirmed:@password"
    />
    <FormSubmit name="Get started" />
  </Form>
  <GoogleSignButton name="Sign up with Google" @click="handleGoogleLogIn" />
</template>

<script setup>
import { Form } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import GoogleSignButton from "@/components/ui/buttons/GoogleSignButton.vue";
import { registerUser } from "@/services/register";
import { authWithGoogle } from "@/services/oauth";
import { usePaginationStore } from "@/store/pagination";

const paginationStore = usePaginationStore();

const handleRegister = async (data) => {
  const res = await registerUser(data);
  try {
    if (res.status === 201) {
      paginationStore.updateModalName({ name: "confirm" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGoogleLogIn = () => {
  authWithGoogle();
};
</script>
