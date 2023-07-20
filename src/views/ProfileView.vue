<template>
  <TheLoggedInHeader />
  <div class="flex text-xl sm:text-sm">
    <div class="max-w-1/3 ml-16 z-10 sm:hidden">
      <ProfileSidebar
        :username="userStore.user.username"
        :imageUrl="userStore.user.avatar"
      />
    </div>
    <div
      class="min-w-full absolute overflow-y-auto min-h-screen bg-primary-profile sm:w-full sm:min-w-full flex items-center justify-start flex-col"
    >
      <div class="space-y-12 mt-6 sm:mt-0 sm:space-y-0 text-white sm:w-full">
        <h2 class="font-medium sm:hidden">{{ $t("profile.my_profile") }}</h2>
        <div class="hidden sm:block py-1">
          <IconArrowLeft
            class="w-5 h-10 ml-4"
            @click="router.push({ name: 'news' })"
          />
        </div>
        <div
          class="bg-primary-black px-40 py-20 20 sm:p-0 pt-40 relative rounded-xl translate-y-20 sm:translate-y-0"
        >
          <ProfileEditForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheLoggedInHeader from "@/components/shared/TheLoggedInHeader.vue";
import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileEditForm from "@/components/profile/ProfileEditForm.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.initializeUserData();
});
</script>
