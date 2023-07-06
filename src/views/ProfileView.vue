<template>
  <TheLoggedInHeader />
  <div class="flex text-xl">
    <div class="max-w-1/3 ml-16 z-10">
      <ProfileSidebar
        :username="userStore.user.username"
        :imageUrl="userStore.user.avatar"
      />
    </div>
    <div class="min-w-full absolute flex items-center justify-start flex-col">
      <div class="space-y-12 mt-6 text-white">
        <h2 class="font-medium">My profile</h2>
        <div
          class="bg-primary-black px-40 py-20 pt-40 relative rounded-xl translate-y-20"
        >
          <ProfileEditForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheLoggedInHeader from "@/components/shared/TheLoggedInHeader.vue";
import ProfileSidebar from "@/components/ProfileSidebar.vue";
import ProfileEditForm from "@/components/ProfileEditForm.vue";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.initializeUserData();
});
</script>
