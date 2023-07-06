<template>
  <div
    class="flex justify-between items-center px-20 py-8 bg-header bg-white bg-opacity-5 relative"
  >
    <div class="text-primary-yellow">MOVIE QUOTES</div>
    <div class="flex justify-between items-center w-80">
      <div class="flex relative">
        <IconBell @click="handleToggleDropdown" />
        <span
          v-if="countUnreadNotifications() > 0"
          class="absolute text-white w-5 h-5 flex justify-center items-center rounded-full z-10 bg-primary-orange right-0 translate-x-[25%] translate-y-[-25%]"
          >{{ countUnreadNotifications() }}</span
        >
        <div
          v-if="isDropdownOpen"
          class="absolute flex flex-col bg-black text-white top-10 w-[36rem] translate-x-[-44%] p-4 py-8 z-20"
        >
          <div class="flex justify-between items-center mb-5">
            <div class="font-medium text-2xl">Notifications</div>
            <div
              @click="handleMarkAllNotificationRead"
              class="underline cursor-pointer text-lg"
            >
              Mark all as read
            </div>
          </div>
          <QuoteNotificationCard
            v-for="notification in notificationsStore.notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
      <div class="flex justify-center items-center text-white px-3 py-2">
        <div class="mr-2.5">Eng</div>
        <div><IconCaretDown /></div>
      </div>
      <div>
        <button
          @click="handleLogOut"
          class="px-7 py-2 text-white border border-white rounded"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconBell from "@/components/icons/IconBell.vue";
import IconCaretDown from "@/components/icons/IconCaretDown.vue";
import QuoteNotificationCard from "@/components/QuoteNotificationCard.vue";
import { useNotificationsStore } from "@/store/notifications";
import { markAllAsRead } from "@/services/notification";
import { logoutUser } from "@/services/auth";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();
const notificationsStore = useNotificationsStore();
const isDropdownOpen = ref(false);

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleMarkAllNotificationRead = async () => {
  try {
    const res = await markAllAsRead();
    if (res.status === 200) {
      notificationsStore.initializeNotificationsData();
    }
  } catch (error) {
    console.error();
  }
};

const countUnreadNotifications = () => {
  return notificationsStore.notifications.filter(
    (notification) => !notification.read
  ).length;
};

const handleLogOut = async () => {
  try {
    const res = await logoutUser();
    if (res.status === 200) {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  notificationsStore.initializeNotificationsData();
});
</script>
