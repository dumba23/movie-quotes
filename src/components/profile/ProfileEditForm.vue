<template>
  <Form
    @submit="(values) => handleUpdateUser(values)"
    enctype="multipart/form-data"
    v-slot="{ values, errors, resetField }"
  >
    <div class="sm:hidden">
      <FileUpload :profileUrl="userStore.user.avatar" />
      <div class="flex items-center justify-center sm:w-full">
        <InputAuth
          name="dummy_name"
          :labelName="$t('profile.username')"
          type="text"
          class="sm:mx-0 sm:bg-transparent"
          :placeholder="userStore.user.username"
          :requiredLabel="false"
          :isProfileField="true"
        />
        <div
          class="ml-4 text-light-grey sm:ml-0"
          @click="handleToggleInputs('username')"
        >
          {{ $t("profile.edit") }}
        </div>
      </div>
      <InputAuth
        v-if="isUsernameOpen"
        name="username"
        :labelName="$t('profile.new_username')"
        type="text"
        class="text-black"
        :placeholder="userStore.user.username"
        rules="required|min:3|max:15|lowerCaseAndNum"
        :value="userStore.user.username"
        :requiredLabel="false"
      />
      <div
        :class="!userStore.user.google_id && 'flex items-center justify-center'"
      >
        <InputAuth
          name="dummy_email"
          :labelName="$t('auth.email')"
          type="email"
          :placeholder="userStore.user.email"
          :requiredLabel="false"
          :isProfileField="true"
        />
        <div
          v-if="!userStore.user.google_id"
          class="ml-4 text-light-grey"
          @click="handleToggleInputs('email')"
        >
          {{ $t("profile.edit") }}
        </div>
        <div v-if="userStore.user.google_id" class="w-12"></div>
      </div>
      <InputAuth
        v-if="isEmailOpen"
        name="email"
        :labelName="$t('auth.email')"
        disabled
        type="email"
        :placeholder="userStore.user.email"
        rules="'required|email'"
        :requiredLabel="false"
      />
      <div
        :class="
          !userStore.user.google_id &&
          'flex items-center justify-center sm:w-full'
        "
      >
        <InputAuth
          name="dummy_password"
          :labelName="$t('auth.password')"
          type="text"
          placeholder="••••••••••••"
          class="sm:mx-0"
          :requiredLabel="false"
          :isProfileField="true"
        />
        <div
          class="ml-4 text-light-grey sm:ml-0 sm:mr-4"
          v-if="!userStore.user.google_id"
          @click="handleToggleInputs('password')"
        >
          {{ $t("profile.edit") }}
        </div>
      </div>
      <div
        v-if="isPasswordOpen"
        class="border border-stone-800 w-96 p-5 rounded space-y-4 mb-4"
      >
        <p class="text-white">{{ $t("profile.password_should_contain") }}:</p>
        <div class="text-sm text-gray">
          <div
            :class="
              values.password &&
              values.password?.length > 8 &&
              'text-primary-success'
            "
          >
            <span class="mr-2">•</span>{{ $t("profile.8_or_more_characters") }}
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
            <span class="mr-2">•</span
            >{{ $t("profile.15_lowercase_character") }}
          </div>
        </div>
      </div>
      <InputAuth
        v-if="isPasswordOpen"
        name="password"
        :labelName="$t('profile.new_password')"
        type="password"
        placeholder="New password"
        rules="required|min:8|max:15|lowerCaseAndNum"
        :requiredLabel="false"
      />
      <InputAuth
        v-if="isPasswordOpen"
        name="password_confirmation"
        :labelName="$t('profile.confirm_new_password')"
        type="password"
        placeholder="Confirm password"
        rules="required|confirmed:@password"
        :requiredLabel="false"
      />
      <div
        v-if="Object.keys(values).length > 4 || values.avatar"
        class="absolute bottom-1 right-1 translate-y-24 flex justify-center items-center space-x-10 pb-10"
      >
        <div class="h-10 flex items-center mt-2" @click="handleCancelEdit">
          {{ $t("profile.cancell") }}
        </div>
        <ButtonSubmit :name="$t('profile.save_changes')" class="w-48" />
      </div>
    </div>
    <div class="hidden sm:block bg-secondary-black h-screen relative">
      <FileUpload :profileUrl="userStore.user.avatar" />
      <div class="pt-60 mx-4 space-y-6">
        <div
          class="flex flex-col border-b border-secondary-grey pb-2 space-y-2"
        >
          <div>{{ $t("profile.username") }}</div>
          <div class="flex justify-between w-full">
            <div>{{ userStore.user.username }}</div>
            <div class="cursor-pointer" @click="handleToggleInputs('username')">
              {{ $t("profile.edit") }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-col border-b border-secondary-grey pb-2 space-y-2"
        >
          <div>{{ $t("auth.email") }}</div>
          <div class="flex justify-between w-full">
            <div>{{ userStore.user.email }}</div>
            <div v-if="!userStore.user.google_id" class="cursor-pointer">
              {{ $t("profile.edit") }}
            </div>
          </div>
        </div>
        <div
          class="flex flex-col border-b border-secondary-grey pb-2 space-y-2"
        >
          <div>{{ $t("auth.password") }}</div>
          <div class="flex justify-between w-full">
            <div class="text-light-grey text-xl">••••••••••••</div>
            <div
              v-if="!userStore.user.google_id"
              class="cursor-pointer"
              @click="handleToggleInputs('password')"
            >
              {{ $t("profile.edit") }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isUsernameOpen"
        class="absolute bg-primary-black bg-opacity-90 z-40 top-0 w-full h-full"
      >
        <div
          class="bg-secondary-black h-52 rounded-2xl flex sm:w-full justify-center items-center text-xs"
        >
          <InputAuth
            name="username"
            :labelName="$t('profile.enter_new_username')"
            type="text"
            class="text-black sm:mx-0"
            :placeholder="userStore.user.username"
            rules="required|min:3|max:15|lowerCaseAndNum"
            :value="userStore.user.username"
            :requiredLabel="false"
          />
        </div>
        <div class="flex justify-between items-center pb-10 mx-4">
          <button
            type="reset"
            class="h-10 flex items-center mt-2"
            @click="
              () => {
                isConfirmOpen = false;
                handleToggleInputs('username');
              }
            "
          >
            {{ $t("profile.cancell") }}
          </button>
          <div
            @click="handleToggleConfirm"
            class="w-14 h-8 bg-light-red rounded mt-2 text-white flex justify-center items-center"
          >
            {{ $t("profile.edit") }}
          </div>
        </div>
      </div>
      <div
        v-if="isEmailOpen"
        class="absolute bg-primary-black bg-opacity-90 z-40 top-0 w-full h-full"
      >
        <div
          class="bg-secondary-black h-52 rounded-2xl flex sm:w-full justify-center items-center text-xs"
        >
          <InputAuth
            v-if="isEmailOpen"
            name="email"
            :labelName="$t('profile.email')"
            disabled
            type="email"
            :placeholder="userStore.user.email"
            rules="'required|email'"
            :requiredLabel="false"
          />
        </div>
        <div class="flex justify-between items-center pb-10 mx-4">
          <div
            class="h-10 flex items-center mt-2"
            @click="handleToggleInputs('email')"
          >
            {{ $t("profile.cancell") }}
          </div>
          <div
            @click="handleToggleConfirm"
            class="w-14 h-8 bg-light-red rounded mt-2 text-white flex justify-center items-center"
          >
            {{ $t("profile.edit") }}
          </div>
        </div>
      </div>
      <div
        v-if="isPasswordOpen"
        class="absolute bg-primary-black bg-opacity-90 z-40 top-0 w-full h-full"
      >
        <div
          class="bg-secondary-black h-52 rounded-2xl flex sm:w-full flex-col justify-center items-center text-xs"
        >
          <InputAuth
            v-if="isPasswordOpen"
            name="password"
            :labelName="$t('profile.new_password')"
            type="password"
            placeholder="New password"
            rules="required|min:8|max:15|lowerCaseAndNum"
            :requiredLabel="false"
          />
          <InputAuth
            v-if="isPasswordOpen"
            name="password_confirmation"
            :labelName="$t('profile.confirm_new_password')"
            type="password"
            placeholder="Confirm password"
            rules="required|confirmed:@password"
            :requiredLabel="false"
          />
        </div>
        <div class="flex justify-between items-center pb-10 mx-4">
          <button
            type="reset"
            class="h-10 flex items-center mt-2"
            @click="
              () => {
                isConfirmOpen = false;
                isPasswordOpen = false;
              }
            "
          >
            {{ $t("profile.cancell") }}
          </button>
          <div
            @click="handleToggleConfirm"
            class="w-14 h-8 bg-light-red rounded mt-2 text-white flex justify-center items-center"
          >
            {{ $t("profile.edit") }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popupSuccessMessage"
      class="absolute bg-primary-black bg-opacity-70 -translate-y-10 z-40 top-0 w-full h-full hidden sm:inline"
    >
      <div
        class="flex justify-between items-center mt-10 w-[90%] bg-green-100 rounded text-primary-success font-semibold text-sm p-4 mx-auto delay-1000"
      >
        <IconAlertSuccess />
        {{ $t("profile.popup_success_message") }}
        <span
          class="text-secondary-grey ml-2"
          @click="popupSuccessMessage = false"
          >X</span
        >
      </div>
    </div>
    <div
      class="absolute bg-primary-black bg-opacity-70 -translate-y-10 z-40 top-0 w-full h-full hidden sm:inline"
      v-if="popupErrorMessage.length > 0"
    >
      <div
        class="flex justify-between items-center mt-10 w-[90%] bg-red-200 text-primary-red text-sm p-4 mx-auto delay-1000"
      >
        <IconInputError />
        {{ popupErrorMessage }}
        <span class="text-secondary-grey ml-2" @click="popupErrorMessage = ''"
          >X</span
        >
      </div>
    </div>
    <div
      v-if="isConfirmOpen && Object.keys(errors).length === 0"
      class="absolute bg-primary-black bg-opacity-90 z-40 top-0 w-full h-full hidden sm:flex justify-center"
    >
      <div
        class="bg-secondary-black h-52 rounded-2xl flex sm:w-[80%] flex-col justify-center items-center text-xs"
      >
        <div class="h-36 flex justify-center items-center">
          {{ $t("profile.are_you_sure_to_make_changes") }} ?
        </div>
        <div class="w-full">
          <div class="border w-full border-light-grey border-opacity-20"></div>
          <div class="flex justify-between items-center mx-4">
            <div
              class="h-10 flex items-center justfiy-center mt-1"
              @click="
                () => {
                  handleToggleConfirm();
                  isPasswordOpen = false;
                  isUsernameOpen = false;
                  isEmailOpen = false;
                }
              "
            >
              {{ $t("profile.cancell") }}
            </div>
            <button
              @click="
                () => {
                  handleUpdateUser(values);
                  resetField('username');
                  resetField('password');
                  resetField('password_confirmation');
                  resetField('email');
                }
              "
              class="py-1 px-1 bg-light-red rounded-sm mt-2 text-white"
            >
              {{ $t("profile.confirm") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup>
import IconInputError from "@/components/icons/IconInputError.vue";
import IconAlertSuccess from "@/components/icons/IconAlertSuccess.vue";
import { Form } from "vee-validate";
import InputAuth from "@/components/ui/InputAuth.vue";
import FileUpload from "@/components/ui/FileUpload.vue";
import ButtonSubmit from "@/components/ui/ButtonSubmit.vue";
import { watch, ref } from "vue";
import { updateUserData } from "@/services/user";
import { useUserStore } from "@/store/user";
import i18n from "@/plugins/i18";

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
const isConfirmOpen = ref(false);
const popupErrorMessage = ref("");
const popupSuccessMessage = ref(false);

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
      isEmailOpen.value = !isEmailOpen.value;
      break;
    case "password":
      isPasswordOpen.value = !isPasswordOpen.value;
      break;
  }
};

const handleToggleConfirm = () => {
  isConfirmOpen.value = !isConfirmOpen.value;
};

const handleCancelEdit = () => {
  isUsernameOpen.value = false;
  isEmailOpen.value = false;
  isPasswordOpen.value = false;
};

const handleUpdateUser = async (data) => {
  handleToggleConfirm();
  handleCancelEdit();
  try {
    const res = await updateUserData({
      ...data,
      old_email: userStore.user.email,
    });
    if (res.status === 200) {
      popupSuccessMessage.value = true;
      setTimeout(() => {
        popupSuccessMessage.value = false;
      }, 5000);
      userStore.initializeUserData();
    }
  } catch (error) {
    if (error.response.data) {
      popupErrorMessage.value = error.response.data.message;
      setTimeout(() => {
        popupErrorMessage.value = "";
      }, 5000);
    }
  }
};
</script>
