<template>
  <Form
    @submit="(values) => handleUpdateUser(values)"
    enctype="multipart/form-data"
    v-slot="{ values }"
  >
    <FormUploadField :profileUrl="userStore.user.avatar" />
    <div class="flex items-center justify-center">
      <FormInputField
        name="dummy_name"
        labelName="Username"
        type="text"
        :placeholder="userStore.user.username"
        :requiredLabel="false"
        :isProfileField="true"
      />
      <div class="ml-4 text-light-grey" @click="handleToggleInputs('username')">
        Edit
      </div>
    </div>
    <FormInputField
      v-if="isUsernameOpen"
      name="username"
      labelName="New Username"
      type="text"
      class="text-black"
      :placeholder="userStore.user.username"
      rules="required|min:3|max:15|lowerCaseAndNum"
      :value="userStore.user.username"
      :requiredLabel="false"
    />
    <div :class="isUsernameOpen && 'flex items-center justify-center'">
      <FormInputField
        name="dummy_email"
        labelName="Email"
        type="email"
        :placeholder="userStore.user.email"
        :requiredLabel="false"
        :isProfileField="true"
      />
      <div
        v-if="isUsernameOpen"
        class="ml-4 text-light-grey"
        @click="handleToggleInputs('email')"
      >
        Edit
      </div>
    </div>
    <FormInputField
      v-if="isEmailOpen"
      name="email"
      labelName="Email"
      disabled
      type="email"
      :placeholder="userStore.user.email"
      rules="'required|email'"
      :requiredLabel="false"
    />
    <div :class="!isUsernameOpen && 'flex items-center justify-center'">
      <FormInputField
        name="dummy_password"
        labelName="Password"
        type="text"
        placeholder="••••••••••••"
        :requiredLabel="false"
        :isProfileField="true"
      />
      <div
        v-if="!isUsernameOpen"
        class="ml-4 text-light-grey"
        @click="handleToggleInputs('password')"
      >
        Edit
      </div>
    </div>
    <div
      v-if="isPasswordOpen"
      class="border border-stone-800 w-96 p-5 rounded space-y-4 mb-4"
    >
      <p class="text-white">Password should contain:</p>
      <div class="text-sm text-gray">
        <div
          :class="
            values.password &&
            values.password?.length > 8 &&
            'text-primary-success'
          "
        >
          <span class="mr-2">•</span>8 or more characters
        </div>
        <div
          :class="
            values.password &&
            values.password.length < 15 &&
            /^[a-z]+$/.test(values.password)
              ? 'text-primary-success'
              : ''
          "
        >
          <span class="mr-2">•</span>15 lowercase character
        </div>
      </div>
    </div>
    <FormInputField
      v-if="isPasswordOpen"
      name="password"
      labelName="New password"
      type="password"
      placeholder="New password"
      rules="required|min:8|max:15|lowerCaseAndNum"
      :requiredLabel="false"
    />
    <FormInputField
      v-if="isPasswordOpen"
      name="password_confirmation"
      labelName="Confirm new password"
      type="password"
      placeholder="Confirm password"
      rules="required|confirmed:@password"
      :requiredLabel="false"
    />
    <div
      v-if="Object.keys(values).length > 4 || values.avatar"
      class="absolute bottom-1 right-1 translate-y-24 flex justify-center items-center space-x-10"
    >
      <div class="h-10 flex items-center mt-2" @click="handleCancelEdit">
        Cancell
      </div>
      <FormSubmit name="Save changes" class="w-40" />
    </div>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import FormInputField from "@/components/ui/FormInputField.vue";
import FormUploadField from "@/components/ui/FormUploadField.vue";
import FormSubmit from "@/components/ui/FormSubmit.vue";
import { watch, ref } from "vue";
import { editUserData } from "@/services/user";
import { useUserStore } from "@/store/user";

defineProps({
  username: { required: true, type: String, default: "" },
  email: { required: true, type: String, default: "" },
  password: { required: true, type: String, default: "" },
});

const userStore = useUserStore();
const userEmail = ref(null);

const isUsernameOpen = ref(false);
const isEmailOpen = ref(false);
const isPasswordOpen = ref(false);

watch(
  () => userStore.user,
  (newValue) => {
    userEmail.value = newValue.email;
  }
);

const handleToggleInputs = (name) => {
  switch (name) {
    case "username":
      isUsernameOpen.value = !isUsernameOpen.value;
      break;
    case "email":
      isEmailOpen.value = !isUsernameOpen.value;
      break;
    case "password":
      isPasswordOpen.value = !isPasswordOpen.value;
      break;
  }
};

const handleCancelEdit = () => {
  isUsernameOpen.value = false;
  isEmailOpen.value = false;
  isPasswordOpen.value = false;
};

const handleUpdateUser = async (data) => {
  handleCancelEdit();
  try {
    const res = await editUserData({
      ...data,
      old_email: userStore.user.email,
    });
    if (res.status === 200) {
      userStore.initializeUserData();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
